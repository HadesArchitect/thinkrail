#!/usr/bin/env bash
# Builds the docs site and force-pushes dist/ to the `gh-pages` branch of `origin`.
# Uses a throwaway temp clone so the working tree and branches here are never touched.
# Usage: scripts/deploy-gh-pages.sh   (env: DOCS_SITE, DOCS_BASE, DOCS_REMOTE, DOCS_PAGES_BRANCH)
set -euo pipefail

site_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
remote="${DOCS_REMOTE:-origin}"
branch="${DOCS_PAGES_BRANCH:-gh-pages}"
remote_url="$(git -C "$site_dir" remote get-url "$remote")"

cd "$site_dir"
npm ci
npm run build
touch dist/.nojekyll

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

cp -R dist/. "$tmp/"
cd "$tmp"
git init --quiet
git checkout --quiet -b "$branch"
git add -A
git commit --quiet -m "Deploy docs preview $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push --force "$remote_url" "$branch"

echo "Pushed docs-site/dist to $remote_url ($branch)."
