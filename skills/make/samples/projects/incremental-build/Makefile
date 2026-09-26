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
# `override` keeps a command-line assignment such as
# `make clean BUILD_DIR=/some/where` from redirecting where the clean
# recipe deletes; the clean recipe below also names the directory
# literally for the same reason.
override BUILD_DIR := build

# Discover fragments and keep them in a stable (sorted) order so the
# assembled manual.md has a deterministic fragment order regardless of
# filesystem readdir order.
#
# Note: $(wildcard) is evaluated once, when Make reads this Makefile.
# Deleting a src/*.txt removes it from the prerequisite list, and the
# remaining fragments may all be older than build/manual.md, so
# timestamps alone would never rebuild it. build/sources.list records
# the fragment list of the last build; when the current list differs,
# it is forced out of date, which in turn rebuilds manual.md.
SRCS := $(sort $(wildcard $(SRC_DIR)/*.txt))

# File names from src/ are expanded into shell recipes ($(SRCS),
# $(PROCESSED), $<, $@). Make cannot quote them safely, so names that
# contain whitespace or shell metacharacters are rejected before any
# recipe runs; only [A-Za-z0-9._-] names are supported. A name with
# whitespace splits into several words, so every word must still match
# $(SRC_DIR)/%.txt. `make clean` skips the check so a bad tree can
# still be cleaned.
lparen := (
rparen := )
comma := ,
UNSAFE_CHARS := ' " ` $$ ; & | < > \ * ? [ ] ! { } ~ = \# $(lparen) $(rparen) $(comma)
ifneq ($(MAKECMDGOALS),clean)
UNSAFE_SRCS := $(strip $(filter-out $(SRC_DIR)/%.txt,$(SRCS)) \
  $(foreach c,$(UNSAFE_CHARS),$(findstring $(c),$(SRCS))))
ifneq ($(UNSAFE_SRCS),)
$(error $(SRC_DIR)/ has file names with whitespace or shell metacharacters; rename them to [A-Za-z0-9._-] only)
endif
endif
PROCESSED := $(patsubst $(SRC_DIR)/%.txt,$(BUILD_DIR)/%.processed,$(SRCS))
SOURCES_LIST := $(BUILD_DIR)/sources.list
RECORDED_SRCS := $(strip $(shell cat $(SOURCES_LIST) 2>/dev/null))

.DEFAULT_GOAL := all

# all, clean and FORCE have no corresponding file; everything else
# below is a real file target so Make's timestamp-based dependency
# checking governs rebuilds.
.PHONY: all clean FORCE

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
ifneq ($(RECORDED_SRCS),$(strip $(SRCS)))
$(SOURCES_LIST): FORCE
endif

$(SOURCES_LIST): | $(BUILD_DIR)
	echo '$(SRCS)' > $@

$(BUILD_DIR)/manual.md: $(PROCESSED) $(SOURCES_LIST) | $(BUILD_DIR)
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

FORCE:

clean:
	rm -rf build
