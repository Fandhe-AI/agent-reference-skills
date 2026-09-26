#!/usr/bin/env bash
# Shared helpers for scripts/*.sh in this sample.
#
# Meant to be sourced, not executed directly:
#   DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
#   source "${DIR}/lib.sh"
#
# Every caller inherits `set -euo pipefail` from here, so an unset
# variable, a failing command, or a failing stage in a pipeline aborts
# the calling script immediately and its exit code becomes the caller's
# exit code (Bash's normal `set -e` propagation) unless the caller
# explicitly wraps a command to inspect its status.
set -euo pipefail

# Resolves the crate root as the parent of the directory this file
# (lib.sh) lives in, independent of the caller's current working
# directory. This is what makes `scripts/check.sh` and `make check`
# (invoked from the crate root by Make) behave identically regardless
# of the shell's cwd when the script is launched.
sample_root() {
  local lib_dir
  lib_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  (cd "${lib_dir}/.." && pwd)
}

ROOT_DIR="$(sample_root)"
readonly ROOT_DIR

# require_cmd <name> - fails with a clear message if <name> is not on
# PATH. Never attempts to install anything (doctor.sh is diagnosis-only
# by design; check.sh/verify.sh assume the environment already has the
# required toolchain).
require_cmd() {
  local cmd="$1"
  if ! command -v "${cmd}" >/dev/null 2>&1; then
    echo "error: required command not found on PATH: ${cmd}" >&2
    return 1
  fi
}

# reject_args <script-name> "$@" - these sample scripts take no
# positional arguments; fail fast with usage output (exit 2, the
# conventional "bad usage" code) instead of silently ignoring unknown
# input.
reject_args() {
  local script_name="$1"
  shift
  if [ "$#" -ne 0 ]; then
    echo "usage: ${script_name} (no arguments)" >&2
    exit 2
  fi
}

log() {
  echo "[$(basename "$0")] $*" >&2
}
