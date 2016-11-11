#!/bin/sh

WATCH_DIR_ABS_PATH=$(cd "$(dirname "$(pwd)")/../src"; pwd)

sed "s|~~~WATCH_DIR_ABS_PATH~~~|$WATCH_DIR_ABS_PATH|" script-template > watchman-update-example-src.sh
