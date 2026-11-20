#!/usr/bin/env python3
"""Zero-dependency quality checks for the public Barut Gaming website."""
from __future__ import annotations

import json
import pathlib
import re
import sys
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = ("index.html", "gizlilik.html", "kullanim-kosullari.html")
ERRORS: list[str] = []


class AssetParser(HTMLParser):
    def __init__(self, page: str):
        super().__init__(convert_charrefs=True)
        self.page = page
        self.ids: set[str] = set()
        self.links: list[tuple[str, str, str]] = []
        self.duplicate_ids: list[str] = []
        self.images_missing_alt = 0

    def handle_starttag(self, tag, attrs):
        props = dict(attrs)
        elem_id = props.get("id")
        if elem_id:
            if elem_id in self.ids:
                self.duplicate_ids.append(elem_id)
            self.ids.add(elem_id)
        if tag == "img" and "alt" not in props:
            self.images_missing_alt += 1
        for attr in ("href", "src"):
            value = props.get(attr)
            if value:
                self.links.append((tag, attr, value))


def validate_html(page: str):
    data = (ROOT / page).read_text(encoding="utf-8")
    parser = AssetParser(page)
    parser.feed(data)
    if parser.duplicate_ids:
        ERRORS.append(f"{page}: duplicate IDs {parser.duplicate_ids}")
    if parser.images_missing_alt:
        ERRORS.append(f"{page}: {parser.images_missing_alt} images lack alt")
    if page == "index.html":
        must_exist = [
            "mainContent", "top", "galeri", "haftanin-kareleri",
            "nasil-katilirim", "oyun-vitrini", "oyuncu-merkezi",
            "connect", "features", "rules", "faq", "reports", "suggestions",
            "weeklyVideoForm", "reportForm", "ideaForm", "accountDialog",
        ]
        for element in must_exist:
            if element not in parser.ids:
                ERRORS.append(f"{page}: required ID missing: {element}")
        if '<meta name="google-site-verification"' not in data:
            ERRORS.append("index.html: Google verification tag missing")
        if re.search(r'href=["\']admin\.html["\']', data):
            ERRORS.append("index.html: do not expose removed admin page")
        if "assets/js/pro-v6.js" not in data or "assets/css/pro-v6.css" not in data:
            ERRORS.append("index.html: V6 resources not linked")
    for tag, attr, raw in parser.links:
        parts = urlsplit(raw)
        if parts.scheme in ("http", "https", "mailto", "mtasa", "data") or raw.startswith("//"):
            continue
        if parts.scheme:
            continue
        path_part = unquote(parts.path)
        if path_part.startswith("/"):
            continue
        target_page = (ROOT / page).parent / path_part if path_part else ROOT / page
        if not target_page.is_file():
            ERRORS.append(f"{page}: {tag}[{attr}] missing target {raw}")
            continue
        if parts.fragment and tag == "a" and path_part == "":
            if parts.fragment not in parser.ids:
                ERRORS.append(f"{page}: broken internal hash {raw}")
    return parser


def main():
    for page in PAGES:
        validate_html(page)
    for path in ("data/status.json", "data/weekly-videos.json"):
        try:
            json.loads((ROOT / path).read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            ERRORS.append(f"{path}: invalid JSON: {exc}")
    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    for p in PAGES:
        expected = "https://ecerci555-spec.github.io/barut-gaming-freeroam/" + ("" if p == "index.html" else p)
        if expected not in sitemap:
            ERRORS.append(f"sitemap.xml: {expected} missing")
    for asset in (
        "assets/gallery/panels/f1-panel.webp",
        "assets/gallery/panels/f2-market.webp",
        "assets/gallery/panels/f3-klan.webp",
        "assets/gallery/cj/cj-siyah-arka.webp",
        "assets/gallery/vehicles/barut-motor-2.webp",
    ):
        if not (ROOT / asset).is_file():
            ERRORS.append(f"missing screenshot: {asset}")
    for error in ERRORS:
        print("ERROR:", error)
    if ERRORS:
        print(f"Validation failed: {len(ERRORS)} issue(s)")
        return 1
    print("Barut Gaming V6 quality checks passed: HTML, anchors, local assets, JSON and sitemap")
    return 0


if __name__ == "__main__":
    sys.exit(main())
