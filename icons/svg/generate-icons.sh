#!/bin/bash

set -x

cd "$(dirname "$0")"

# Inkscape v1.0+
inkscape -w  16 -h  16 icon16x16.svg   -o ../icon16x16.png
inkscape -w  48 -h  48 icon48x48.svg   -o ../icon48x48.png
inkscape -w 128 -h 128 icon128x128.svg -o ../icon128x128.png
inkscape -w 256 -h 256 icon256x256.svg -o ../icon256x256.png
