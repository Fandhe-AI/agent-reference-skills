# incremental-build sample
#
# Demonstrates GNU Make as the source of truth for file dependencies and
# incremental builds: plain-text fragments in src/ are transformed with
# sed into build/*.processed, then concatenated into build/manual.md.
#
# Verified with GNU Make 3.81. No 3.82+ features are used (no
# .RECIPEPREFIX, no .ONESHELL).
#
# Targets:
#   make / make all   - build build/manual.md (default goal)
#   make clean        - remove build/ (destructive: deletes all generated
#                        output under build/, nothing outside it)

SRC_DIR := src
BUILD_DIR := build

# Discover fragments and keep them in a stable (sorted) order so the
# assembled manual.md has a deterministic fragment order regardless of
# filesystem readdir order.
#
# Note: $(wildcard) is evaluated once, when Make reads this Makefile.
# If you delete a src/*.txt after a previous build, its stale
# build/*.processed is simply dropped from this run's prerequisite
# list (not deleted), and build/manual.md will not be considered
# out-of-date on that basis alone. `make clean` before a full rebuild
# avoids relying on stale fragments.
SRCS := $(sort $(wildcard $(SRC_DIR)/*.txt))
PROCESSED := $(patsubst $(SRC_DIR)/%.txt,$(BUILD_DIR)/%.processed,$(SRCS))

.DEFAULT_GOAL := all

# clean is the only target with no corresponding file; everything else
# below is a real file target so Make's timestamp-based dependency
# checking governs rebuilds.
.PHONY: all clean

# Without this, a recipe that opens `$@` for writing and then fails
# partway (e.g. `sed ... $< > $@ && false`) leaves a truncated-but-freshly
# -timestamped $@ behind; the next `make` sees it as up to date and
# treats the failed run as if it had succeeded. .DELETE_ON_ERROR makes
# Make delete a target's file when its recipe exits non-zero, so a
# failure cannot masquerade as success on the next invocation. Supported
# since GNU Make 3.81 (verified: skills/make samples target 3.81+).
.DELETE_ON_ERROR:

all: $(BUILD_DIR)/manual.md

# manual.md depends on every processed fragment. Changing one src/*.txt
# only touches its own build/*.processed (pattern rule below), which in
# turn is the only thing that makes manual.md's prerequisite set
# out-of-date, so only the affected fragment is reprocessed before
# manual.md is reassembled. With no src/*.txt at all, $(PROCESSED) is
# empty and a bare `cat > $@` would block reading stdin, so the recipe
# fails explicitly instead.
$(BUILD_DIR)/manual.md: $(PROCESSED) | $(BUILD_DIR)
	@if [ -z "$(strip $(PROCESSED))" ]; then echo "error: no $(SRC_DIR)/*.txt fragments found" >&2; exit 1; fi
	@echo "assembling $@ from $(words $(PROCESSED)) fragment(s)"
	cat $(PROCESSED) > $@

# Pattern rule: one src/<name>.txt produces exactly one
# build/<name>.processed. $< is the single prerequisite (the source
# fragment), $@ is the target. The build directory is an order-only
# prerequisite (after the `|`): its existence is required, but its
# mtime must not force reprocessing of already up-to-date fragments.
$(BUILD_DIR)/%.processed: $(SRC_DIR)/%.txt | $(BUILD_DIR)
	@echo "processing $< -> $@"
	sed 's/^/    /' $< > $@

$(BUILD_DIR):
	mkdir -p $@

clean:
	rm -rf $(BUILD_DIR)
