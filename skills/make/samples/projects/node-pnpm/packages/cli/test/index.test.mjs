import { test } from "node:test";
import assert from "node:assert/strict";
import { main } from "../src/index.mjs";

test("main greets and sums numeric args", () => {
  assert.equal(main(["Ada", "1", "2", "3"]), "Hello, Ada! total=6");
});

test("main defaults the name to world", () => {
  assert.equal(main([]), "Hello, world! total=0");
});
