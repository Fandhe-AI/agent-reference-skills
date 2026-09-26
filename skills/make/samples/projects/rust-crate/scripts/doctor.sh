#!/usr/bin/env bash
# Environment diagnosis only. Never installs, upgrades, or repairs
# anything - it only reports what it finds and exits non-zero if a
# required tool is missing, so the caller (a human or `make doctor`)
# decides what to do next.
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=./lib.sh
source "${DIR}/lib.sh"

reject_args "$(basename "$0")" "$@"

status=0

check_tool() {
  local name="$1"
  shift
  if command -v "${name}" >/dev/null 2>&1; then
    echo "ok   ${name}: $("$@" 2>&1 | head -n1)"
  else
    echo "miss ${name}: not found on PATH"
    status=1
  fi
}

echo "environment diagnosis for ${ROOT_DIR} (read-only, no changes made)"
check_tool cargo cargo --version
check_tool rustc rustc --version

# check.sh needs the rustfmt and clippy cargo subcommands (installed as
# rustup components, not part of a bare cargo/rustc). Diagnose them
# here too so `make doctor` catches a missing component before
# `make check` fails on it. This never runs `rustup component add`.
if command -v cargo >/dev/null 2>&1; then
  if cargo fmt --version >/dev/null 2>&1; then
    echo "ok   cargo-fmt: $(cargo fmt --version 2>&1 | head -n1)"
  else
    echo "miss cargo-fmt: \`cargo fmt --version\` failed (rustfmt component likely not installed)"
    status=1
  fi
  if cargo clippy --version >/dev/null 2>&1; then
    echo "ok   cargo-clippy: $(cargo clippy --version 2>&1 | head -n1)"
  else
    echo "miss cargo-clippy: \`cargo clippy --version\` failed (clippy component likely not installed)"
    status=1
  fi
else
  echo "skip cargo-fmt/cargo-clippy: cargo itself is missing (see above)"
fi

if [ -f "${ROOT_DIR}/rust-toolchain.toml" ]; then
  echo "note: rust-toolchain.toml present -> cargo selects/downloads that toolchain itself,"
  echo "      this script does not read or enforce it"
else
  echo "note: no rust-toolchain.toml in this sample; whatever \`cargo\`/\`rustc\` resolve to on PATH is used"
fi

exit "${status}"
