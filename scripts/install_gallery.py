#!/usr/bin/env python3
"""Install user-provided Barut Gaming gallery screenshots safely from one ZIP."""
from pathlib import Path
import zipfile
import shutil

ARCHIVE=Path("barut-gallery.zip")
OUT=Path("assets/gallery").resolve()
ALLOWED_PREFIXES=("cj/","panels/","vehicles/")
MAX_FILES=30
MAX_FILE_BYTES=4_000_000

if not ARCHIVE.is_file():
    raise SystemExit("The uploaded barut-gallery.zip file is missing")
OUT.mkdir(parents=True,exist_ok=True)
with zipfile.ZipFile(ARCHIVE) as z:
    members=[m for m in z.infolist() if not m.is_dir()]
    if not members or len(members)>MAX_FILES:
        raise SystemExit("Invalid number of gallery files")
    for member in members:
        name=member.filename
        destination=(OUT/name).resolve()
        if not name.startswith(ALLOWED_PREFIXES) or not name.endswith(".webp"):
            raise SystemExit(f"Unrecognized gallery file: {name}")
        if not destination.is_relative_to(OUT) or member.file_size>MAX_FILE_BYTES:
            raise SystemExit(f"Unsafe gallery file: {name}")
        destination.parent.mkdir(parents=True,exist_ok=True)
        with z.open(member) as source, destination.open("wb") as target:
            shutil.copyfileobj(source,target)
        print(f"Added {name} ({member.file_size} bytes)")
print(f"Gallery uploaded successfully: {len(members)} images")
