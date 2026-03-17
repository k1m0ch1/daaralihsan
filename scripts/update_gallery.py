#!/usr/bin/env python3
"""
Update Galeri.js with the latest 6 posts from @daar_al_ihsan Instagram.

Strategy:
  1. Try instaloader (fast, no browser)
  2. If that fails, fall back to Playwright (headless Chromium)
  3. If both fail, exit 0 so the workflow doesn't error out
  4. If posts are unchanged, exit 0 (nothing to commit)
  5. If posts changed: download images, update gallery_posts.json + Galeri.js
"""

import json
import os
import sys
import time
from pathlib import Path

import requests

INSTAGRAM_USERNAME = "daar_al_ihsan"
GALLERY_COUNT = 6

SCRIPT_DIR = Path(__file__).parent
ROOT_DIR = SCRIPT_DIR.parent
PUBLIC_GALERI = ROOT_DIR / "public" / "galeri"
GALERI_JS = ROOT_DIR / "app" / "components" / "Galeri.js"
POSTS_JSON = SCRIPT_DIR / "gallery_posts.json"

INSTAGRAM_ICON_PATH = (
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 "
    "1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 "
    "4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-"
    "3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-"
    "3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 "
    "4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 "
    "6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 "
    "2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 "
    "4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 "
    "0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-"
    "1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 "
    "6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 "
    "10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 "
    "4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 "
    "0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
)


# ---------------------------------------------------------------------------
# Fetch posts via instaloader
# ---------------------------------------------------------------------------

def fetch_via_instaloader() -> list[dict]:
    import instaloader

    L = instaloader.Instaloader(
        download_pictures=False,
        download_videos=False,
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        quiet=True,
    )
    profile = instaloader.Profile.from_username(L.context, INSTAGRAM_USERNAME)
    posts = []
    for post in profile.get_posts():
        if len(posts) >= GALLERY_COUNT:
            break
        posts.append(
            {
                "shortcode": post.shortcode,
                "url": f"https://www.instagram.com/p/{post.shortcode}/",
                "img_url": post.url,
                "filename": f"g{len(posts) + 1}.jpg",
            }
        )
        time.sleep(1)

    return posts


# ---------------------------------------------------------------------------
# Fetch posts via Playwright (fallback)
# ---------------------------------------------------------------------------

def fetch_via_playwright() -> list[dict]:
    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
            viewport={"width": 1280, "height": 900},
        )
        page = ctx.new_page()
        page.goto(
            f"https://www.instagram.com/{INSTAGRAM_USERNAME}/",
            wait_until="networkidle",
            timeout=60_000,
        )
        time.sleep(3)

        raw = page.evaluate(
            """() => {
                const links = Array.from(document.querySelectorAll('a[href*="/p/"]'));
                return links.slice(0, 12).map(a => ({
                    href: a.href,
                    img: a.querySelector('img')?.src || ''
                }));
            }"""
        )
        browser.close()

    posts = []
    seen = set()
    for item in raw:
        href = item["href"].rstrip("/")
        shortcode = href.split("/p/")[-1].rstrip("/")
        if not shortcode or shortcode in seen or not item["img"]:
            continue
        seen.add(shortcode)
        posts.append(
            {
                "shortcode": shortcode,
                "url": f"https://www.instagram.com/p/{shortcode}/",
                "img_url": item["img"],
                "filename": f"g{len(posts) + 1}.jpg",
            }
        )
        if len(posts) >= GALLERY_COUNT:
            break

    return posts


# ---------------------------------------------------------------------------
# Core logic
# ---------------------------------------------------------------------------

def load_existing_shortcodes() -> list[str]:
    if POSTS_JSON.exists():
        data = json.loads(POSTS_JSON.read_text())
        return [p["shortcode"] for p in data]
    return []


def download_images(posts: list[dict]) -> None:
    PUBLIC_GALERI.mkdir(parents=True, exist_ok=True)
    session = requests.Session()
    session.headers.update(
        {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
            "Referer": "https://www.instagram.com/",
        }
    )
    for post in posts:
        dest = PUBLIC_GALERI / post["filename"]
        print(f"  Downloading {post['shortcode']} → {dest.name} ...", end=" ", flush=True)
        r = session.get(post["img_url"], timeout=30)
        r.raise_for_status()
        dest.write_bytes(r.content)
        print(f"{len(r.content) // 1024} KB")
        time.sleep(0.5)


def write_galeri_js(posts: list[dict]) -> None:
    items_lines = []
    for post in posts:
        items_lines.append(
            f"  {{ src: '/galeri/{post['filename']}', "
            f"alt: 'Kegiatan Masjid Daar Al-Ihsan', "
            f"href: '{post['url']}' }}"
        )
    items_str = ",\n".join(items_lines)

    content = f"""import Image from 'next/image'

const galleryItems = [
{items_str},
]

export default function Galeri() {{
  return (
    <section id="galeri" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-emerald-600 text-sm font-semibold uppercase tracking-widest">
            Dokumentasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">Galeri</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Sekilas dokumentasi kegiatan dan suasana Masjid Daar Al-Ihsan.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {{galleryItems.map((item, i) => (
            <a
              key={{i}}
              href={{item.href}}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-2xl overflow-hidden group block"
            >
              <Image
                src={{item.src}}
                alt={{item.alt}}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="{INSTAGRAM_ICON_PATH}"/>
                </svg>
              </div>
            </a>
          ))}}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/daar_al_ihsan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-emerald-600 text-emerald-700 font-semibold rounded-full hover:bg-emerald-700 hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="{INSTAGRAM_ICON_PATH}"/>
            </svg>
            Lihat Semua di Instagram @daar_al_ihsan
          </a>
        </div>
      </div>
    </section>
  )
}}
"""
    GALERI_JS.write_text(content, encoding="utf-8")
    print(f"  Written {GALERI_JS.relative_to(ROOT_DIR)}")


def main() -> None:
    print(f"=== Checking @{INSTAGRAM_USERNAME} for new posts ===")

    # --- fetch ---
    posts: list[dict] = []

    # Try instaloader first
    try:
        import instaloader  # noqa: F401

        print("Trying instaloader...")
        posts = fetch_via_instaloader()
        print(f"  instaloader: got {len(posts)} posts")
    except Exception as exc:
        print(f"  instaloader failed: {exc}")

    # Fall back to Playwright
    if not posts:
        try:
            import playwright  # noqa: F401

            print("Trying Playwright fallback...")
            posts = fetch_via_playwright()
            print(f"  Playwright: got {len(posts)} posts")
        except Exception as exc:
            print(f"  Playwright failed: {exc}")

    if not posts:
        print("Could not fetch posts from either method — skipping update.")
        sys.exit(0)

    # --- compare ---
    new_codes = [p["shortcode"] for p in posts]
    old_codes = load_existing_shortcodes()
    print(f"New  : {new_codes}")
    print(f"Saved: {old_codes}")

    if new_codes == old_codes:
        print("No changes — gallery is up to date.")
        sys.exit(0)

    # --- update ---
    print("Changes detected! Updating gallery...")
    download_images(posts)

    state = [{"shortcode": p["shortcode"], "url": p["url"], "filename": p["filename"]} for p in posts]
    POSTS_JSON.write_text(json.dumps(state, indent=2, ensure_ascii=False))
    print(f"  Written {POSTS_JSON.relative_to(ROOT_DIR)}")

    write_galeri_js(posts)
    print("Done.")


if __name__ == "__main__":
    main()
