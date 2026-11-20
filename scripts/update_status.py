#!/usr/bin/env python3
"""Refresh the public Barut Gaming MTA:SA server status (no invented player counts)."""
import datetime as dt
import json
import pathlib
import urllib.error
import urllib.request

IP = "185.158.151.103"
PORT = 22003
HTTP_PORT = 22005
PLAYERS_URL = f"http://{IP}:{HTTP_PORT}/barut_website_bridge/players"
API_URL = "https://mtasa.com/api/"
OUT = pathlib.Path("data/status.json")

def main():
    status = {
        "ip": IP,
        "port": PORT,
        "online": None,
        "players": None,
        "maxPlayers": None,
        "playerNames": [],
        "playerNamesAvailable": False,
        "serverName": None,
        "source": "MTA master server list (https://mtasa.com/api/)",
        "checkedAt": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
    }
    try:
        request = urllib.request.Request(API_URL, headers={
            "User-Agent": "BarutGaming-SiteStatus/1.0 (+https://github.com/ecerci555-spec/barut-gaming-freeroam)",
            "Accept": "application/json",
        })
        with urllib.request.urlopen(request, timeout=25) as response:
            entries = json.load(response)
        if not isinstance(entries, list):
            raise ValueError("Unexpected MTA master server response")
        for server in entries:
            if not isinstance(server, dict):
                continue
            if str(server.get("ip", "")).strip() != IP or str(server.get("port", "")) != str(PORT):
                continue
            players = server.get("players")
            max_players = server.get("maxplayers")
            if not isinstance(players, int) or isinstance(players, bool):
                raise ValueError("Invalid player count")
            if not isinstance(max_players, int) or isinstance(max_players, bool):
                raise ValueError("Invalid player slots")
            if not (0 <= players <= max_players):
                raise ValueError("Inconsistent player counts")
            status["online"] = True
            status["players"] = players
            status["maxPlayers"] = max_players
            status["serverName"] = str(server.get("name", ""))[:160]
            break
        if status["online"] is None:
            print("Server not present in master list. Showing unknown, not offline.")
        else:
            print(f"Barut Gaming: {status['players']}/{status['maxPlayers']} online")
    except (urllib.error.URLError, TimeoutError, OSError, ValueError, json.JSONDecodeError) as exc:
        print(f"Could not query MTA server status: {exc}; marking unavailable.")
    # Optional nicknames: only available after the MTA Lua bridge is installed.
    # This endpoint contains public in-game nicknames ONLY (no IPs, serials, accounts).
    if status["online"] is True:
        try:
            request = urllib.request.Request(
                PLAYERS_URL,
                headers={"User-Agent": "BarutGamingWebsite/1.0", "Accept": "application/json"},
            )
            with urllib.request.urlopen(request, timeout=8) as response:
                body = response.read(64 * 1024)
            names_json = json.loads(body)
            # MTA toJSON can wrap tables in a top-level array.
            if isinstance(names_json, list) and len(names_json) == 1:
                names_json = names_json[0]
            if not isinstance(names_json, dict):
                raise ValueError("Unexpected MTA roster response")
            raw_names = names_json.get("players")
            if not isinstance(raw_names, list):
                raise ValueError("Expected players array")
            names = []
            for name in raw_names[:100]:
                if isinstance(name, str):
                    name = name.strip()
                    if name and len(name) <= 64:
                        names.append(name)
            status["playerNames"] = names
            status["playerNamesAvailable"] = True
            print(f"Roster bridge returned {len(names)} public nicknames")
        except (urllib.error.URLError, TimeoutError, OSError, ValueError, json.JSONDecodeError) as exc:
            print(f"Roster bridge unavailable (this is optional): {exc}")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(status, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

if __name__ == "__main__":
    main()
