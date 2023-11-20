#!/usr/bin/env bash
rm -rf dist
./version.sh
npm run build
