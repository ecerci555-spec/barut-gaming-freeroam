#!/usr/bin/env python3
"""Generate approved Barut Gaming weekly videos from PUBLIC GitHub Issues.

Only issues carrying the editor-only "vitrin-onaylandi" label are published
to the site's public JSON feed. Pending issues are still public ON GITHUB.
Run by GitHub Actions; no credentials are ever shipped to the browser.
"""
import datetime as dt
import json
import os
import pathlib
import re
import urllib.error
import urllib.parse
import urllib.request
from zoneinfo import ZoneInfo

REPO = "ecerci555-spec/barut-gaming-freeroam"
APPROVED = "vitrin-onaylandi"
PENDING = "video-basvuru"
ROOT = "https://api.github.com/repos/" + REPO
OUT = pathlib.Path("data/weekly-videos.json")
ISTANBUL = ZoneInfo("Europe/Istanbul")
TOKEN = os.environ.get("GH_TOKEN", "")
MAX_ITEMS = 12
LINK_PATTERN = re.compile(r"https?://[^\s<>()\]\[\"']+", re.I)
YOUTUBE_ID = re.compile(r"^[A-Za-z0-9_-]{11}$")
ISSUE_PREFIX = "[Haftanın Videosu]"


def api(path, method="GET", payload=None):
    url = ROOT + path
    body = json.dumps(payload).encode("utf-8") if payload is not None else None
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "barut-gaming-weekly-videos",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if TOKEN:
        headers["Authorization"] = "Bearer " + TOKEN
    if body is not None:
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=25) as res:
        data = res.read(1024 * 1024)
    return json.loads(data.decode("utf-8")) if data else None


def create_labels_if_missing():
    """Create manager labels once; only GitHub write-permission holders may approve."""
    if not TOKEN:
        print("No GH_TOKEN: skipping label provisioning")
        return
    for name, color, description in [
        (PENDING, "6f42c1", "Video yollandi; yayin icin onay bekliyor"),
        (APPROVED, "2da44e", "Yonetici tarafindan haftanin vitrinine onaylandi"),
    ]:
        try:
            api("/labels/" + urllib.parse.quote(name, safe=""))
        except urllib.error.HTTPError as exc:
            if exc.code != 404:
                raise
            api("/labels", "POST", {"name": name, "color": color, "description": description})
            print("Created label:", name)


def sections(body):
    """Parse GitHub Issue Form's ### section headings into safe plain strings."""
    parts = re.split(r"(?m)^###\s+(.+?)\s*$", body or "")
    return {parts[i].strip().casefold(): parts[i+1].strip()
            for i in range(1, len(parts)-1, 2)}


def section_value(info, prefix):
    for name, value in info.items():
        if name.startswith(prefix.casefold()):
            return value.strip()
    return ""


def links(value):
    return [m.group(0).rstrip(".,;") for m in LINK_PATTERN.finditer(value or "")]


def youtube_video_id(value):
    for link in links(value):
        try:
            parsed = urllib.parse.urlparse(link)
            host = (parsed.hostname or "").lower()
            path = parsed.path.strip("/").split("/")
            candidate = ""
            if host in ("youtu.be", "www.youtu.be") and path:
                candidate = path[0]
            elif host in ("youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"):
                if path and path[0] == "watch":
                    candidate = urllib.parse.parse_qs(parsed.query).get("v", [""])[0]
                elif len(path) >= 2 and path[0] in ("shorts", "live", "embed"):
                    candidate = path[1]
            if YOUTUBE_ID.fullmatch(candidate):
                return candidate
        except ValueError:
            continue
    return ""


def trusted_asset(value):
    for link in links(value):
        try:
            u = urllib.parse.urlparse(link)
            if u.scheme != "https" or u.username or u.password:
                continue
            host = (u.hostname or "").lower()
            if host == "github.com" and u.path.startswith("/user-attachments/assets/"):
                return link
            if host in ("user-images.githubusercontent.com", "githubusercontent.com") or host.endswith(".githubusercontent.com"):
                return link
        except ValueError:
            pass
    return ""


def cleanup_text(value, limit):
    plain = re.sub(r"!\[[^]]*\]\([^)]*\)", "", value or "")
    plain = re.sub(r"\[[^]]*\]\([^)]*\)", "", plain)
    plain = re.sub(r"https?://\S+", "", plain)
    plain = re.sub(r"[#*_\x60<>]", "", plain)
    plain = re.sub(r"\s+", " ", plain).strip()
    return plain[:limit]


def build_video(issue, monday):
    if not issue.get("title", "").startswith(ISSUE_PREFIX) or "pull_request" in issue:
        return None
    if not any(label.get("name") == APPROVED for label in issue.get("labels", [])):
        return None
    created = dt.datetime.fromisoformat(issue["created_at"].replace("Z", "+00:00")).astimezone(ISTANBUL)
    if created.date() < monday:
        return None

    info = sections(issue.get("body") or "")
    title = cleanup_text(section_value(info, "video başlığı"), 96)
    if not title:
        title = cleanup_text(issue["title"][len(ISSUE_PREFIX):], 96)
    if not title:
        return None
    player = cleanup_text(section_value(info, "oyun içi nick"), 44) or issue.get("user", {}).get("login", "Oyuncu")
    description = cleanup_text(section_value(info, "video açıklaması"), 220)
    if not description:
        description = "Barut Gaming Freeroam sunucusundan bir oyun anı."
    youtube = youtube_video_id(section_value(info, "youtube bağlantısı"))
    github_media = trusted_asset(section_value(info, "video dosyası"))
    if not youtube and not github_media:
        return None
    cover = trusted_asset(section_value(info, "kapak fotoğrafı"))
    expected_url = f"https://github.com/{REPO}/issues/{issue['number']}"
    if issue.get("html_url") != expected_url:
        return None
    return {
        "issue": issue["number"],
        "title": title,
        "player": player,
        "description": description,
        "submittedAt": issue["created_at"],
        "pageUrl": expected_url,
        "type": "youtube" if youtube else "github",
        "youtubeId": youtube or None,
        "videoUrl": github_media if not youtube else None,
        "coverUrl": cover or None,
    }


def fetch_approved():
    rows = []
    for page in range(1, 6):
        params = urllib.parse.urlencode({
            "state": "all", "labels": APPROVED, "per_page": 100, "page": page,
        })
        page_data = api("/issues?" + params)
        if not isinstance(page_data, list):
            raise ValueError("Unexpected issues API response")
        rows.extend(page_data)
        if len(page_data) < 100:
            break
    return rows


def main():
    create_labels_if_missing()
    now = dt.datetime.now(ISTANBUL)
    monday = now.date() - dt.timedelta(days=now.weekday())
    cards = []
    for issue in fetch_approved():
        item = build_video(issue, monday)
        if item is not None:
            cards.append(item)
    cards.sort(key=lambda x: x["submittedAt"], reverse=True)
    obj = {
        "weekStart": monday.isoformat(),
        "generatedAt": now.isoformat(timespec="seconds"),
        "videos": cards[:MAX_ITEMS],
    }
    OUT.parent.mkdir(parents=True, exist_ok=True)
    prev = {}
    if OUT.exists():
        try:
            prev = json.loads(OUT.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            pass
    if prev.get("weekStart") == obj["weekStart"] and prev.get("videos") == obj["videos"]:
        print(f"No content change, {len(cards)} approved weekly videos")
        return
    OUT.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Published {len(obj['videos'])} approved weekly videos for {monday}")


if __name__ == "__main__":
    main()
