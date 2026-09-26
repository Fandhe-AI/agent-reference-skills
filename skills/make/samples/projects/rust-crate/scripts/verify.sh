#!/usr/bin/env bash
# The required verification suite for this sample's "default" profile:
# unit + integration tests, and doctests run as a separate step.
#
# `cargo test --all-targets` does NOT run doctests (this is a
# documented cargo behavior, not an oversight) - `--doc` is excluded
# from `--all-targets`. This script therefore runs both explicitly so
# neither is silently skipped.
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./lib.sh
source "${DIR}/lib.sh"

reject_args "$(basename "$0")" "$@"
require_cmd cargo

cd "${ROOT_DIR}"

log "cargo test --all-targets (unit + integration tests; excludes doctests)"
cargo test --all-targets

log "cargo test --doc (doctests; not covered by --all-targets)"
cargo test --doc
