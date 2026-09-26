import { test } from "node:test";
import assert from "node:assert/strict";
import { sum, formatGreeting } from "../src/index.mjs";

test("sum adds two finite numbers", () => {
  assert.equal(sum(2, 3), 5);
  assert.equal(sum(-1, 1), 0);
});

test("sum rejects non-finite input", () => {
  assert.throws(() => sum(NaN, 1), TypeError);
  assert.throws(() => sum(1, Infinity), TypeError);
});

test("formatGreeting trims and formats a name", () => {
  assert.equal(formatGreeting("  Ada  "), "Hello, Ada!");
});

test("formatGreeting rejects an empty name", () => {
  assert.throws(() => formatGreeting("   "), RangeError);
});
