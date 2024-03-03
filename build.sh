#!/usr/bin/env bash
set -e
rm -rf dist
./version.sh
npm run build
