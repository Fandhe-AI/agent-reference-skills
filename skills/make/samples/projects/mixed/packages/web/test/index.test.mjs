import { test } from "node:test";
import assert from "node:assert/strict";
import { describeVersion } from "../src/index.mjs";

// This test depends on generated/version.json existing, which the
// Makefile's `generate` target (cargo run -p codegen) must have produced
// before `make test` runs -- see the Makefile's `test: generate` edge.
test("describeVersion reads the codegen-produced artifact", () => {
  const description = describeVersion();
  assert.match(description, /^web build against codegen v\d+\.\d+\.\d+$/);
});

test("describeVersion reports a clear error for a missing artifact", () => {
  assert.throws(() => describeVersion("/nonexistent/version.json"), /could not read/);
});
