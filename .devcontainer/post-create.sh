#!/bin/bash

set -o errexit
set -o pipefail
set -o xtrace

yarn install
ops/bin/replace-console-error.sh
