#!/usr/bin/env bash
# Direct, Make-independent entry point that lists every operation this
# sample defines and how to run it without Make. `make help` (see the
# Makefile) is generated mechanically from that Makefile's own `##`
# recipe comments, so it always matches the Makefile's real target
# names. This file is a separate, hand-maintained list describing the
# same operations without Make; there is no automated check tying the
# two together, so when a target is added/renamed/removed in the
# Makefile, update this file's listing in the same change.
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./lib.sh
source "${DIR}/lib.sh"

reject_args "$(basename "$0")" "$@"

cat <<'EOF'
Operations in this sample crate, and how to run each directly (without
Make):

  doctor   scripts/doctor.sh    diagnose the environment only; never installs or repairs anything
  check    scripts/check.sh     cargo fmt --check + cargo clippy; never modifies source
  verify   scripts/verify.sh    cargo test --all-targets + cargo test --doc (required verification suite)
  build    cargo build          compile the crate
  test     cargo test           unit + integration tests only (verify.sh also runs doctests separately)
  clean    cargo clean          remove target/ only (destructive but scoped to build artifacts)

`make <target>` runs the same command shown above; Make is a thin,
optional front door, not a second definition of these operations.
EOF
