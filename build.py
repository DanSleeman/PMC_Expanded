import os
import shutil
import zipfile
import subprocess
from pathlib import Path
import rcssmin
import htmlmin
SRC_DIR = os.getcwd()
DIST_DIR = os.path.join(SRC_DIR, 'dist')
BUILD_DIR = os.path.join(SRC_DIR, 'build')
ZIP_NAME = os.path.join(DIST_DIR, "PMC_Expanded.zip")
INCLUDE_FILES = [
    "manifest.json",
    "background.js",
    "config.js",
    "options.html",
    "options.js",
    "options.css",
    "icon-16.png",
    "icon-32.png",
    "icon-64.png",
    "icon-128.png",
    "ux",
    "ux/src",
    "classic",
    "classic/src",
    "util"
]


def min_js(in_file,dest):
    in_file = f'"{in_file}"'
    dest = f'"{dest}"'
    result = subprocess.run(
        f"terser {str(in_file)} --config-file terser.config.json -o {str(dest)}",
         shell=True,
         check=True,
         capture_output=True,
         text=True
    )
    return result


def min_css(in_file, out_file):
    with open(in_file, 'r', encoding='utf-8') as f:
        css = f.read()
    m_css = rcssmin.cssmin(css)
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(m_css)


def min_html(in_file, out_file):
    with open(in_file, 'r', encoding='utf-8') as f:
        html = f.read()
    m_html = htmlmin.minify(html, remove_comments=True, remove_empty_space=True)
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(m_html)


def clean_build():
    if os.path.exists(ZIP_NAME):
        os.remove(ZIP_NAME)
    if os.path.exists(BUILD_DIR):
        shutil.rmtree(BUILD_DIR,ignore_errors=True)
    os.makedirs(BUILD_DIR, exist_ok=True)


def copy_files():
    minifiers = {
        '.js': lambda src, dest: min_js(src, dest) if 'jquery' not in src.stem else shutil.copy2(src, dest),
        '.css': min_css,
        '.html': min_html
    }
    for file in INCLUDE_FILES:
        src_path = Path(SRC_DIR) / file
        dest_path = Path(BUILD_DIR) / file
        
        if not src_path.exists():
            continue
        dest_path.parent.mkdir(parents=True, exist_ok=True)

        if src_path.is_dir():
            for x in src_path.iterdir():
                if x.is_file():
                    minify_or_copy(x, dest_path / x.name, minifiers)
        else:
            minify_or_copy(src_path, dest_path, minifiers)


def minify_or_copy(src, dest, minifiers):
    min_func = minifiers.get(src.suffix, shutil.copy2)
    min_func(src, dest)


def create_zip():
    os.makedirs(DIST_DIR, exist_ok=True)
    with zipfile.ZipFile(ZIP_NAME, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, _, files in os.walk(BUILD_DIR):
            for file in files:
                file_path = os.path.join(root, file)
                zipf.write(file_path, os.path.relpath(file_path, BUILD_DIR))

def main():
    print("Cleaning old build...")
    clean_build()

    print("Copying necessary files...")
    copy_files()

    print("Creating ZIP archive...")
    create_zip()

    print("Build complete! Extension is in the 'build' folder.")
    print(f"'{ZIP_NAME}' created for upload.")


if __name__ == "__main__":
    main()
