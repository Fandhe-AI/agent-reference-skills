#!/usr/bin/env bash
# Non-destructive static checks: cargo fmt --check + cargo clippy.
# Neither step is allowed to rewrite source; a formatting or lint
# failure is reported and this script exits non-zero (propagated by
# `set -e` from the failing cargo subcommand) rather than being
# auto-fixed.
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./lib.sh
source "${DIR}/lib.sh"

reject_args "$(basename "$0")" "$@"
require_cmd cargo

cd "${ROOT_DIR}"

log "cargo fmt --check (source is not modified)"
cargo fmt --all -- --check

log "cargo clippy (source is not modified; warnings are denied)"
cargo clippy --all-targets -- -D warnings
