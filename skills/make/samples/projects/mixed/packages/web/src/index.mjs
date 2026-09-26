// make skill sample (mixed): @make-sample/web
//
// Reads the one artifact the Rust side hands off to the Node side
// (generated/version.json, written by `cargo run -p codegen`). This is
// the explicit cross-ecosystem dependency edge described in the skill's
// node/package-scripts-and-mixed-repos.md reference: the Makefile's
// `build`/`test` targets depend on `generate` (which runs codegen)
// before this package's own build/test run, rather than each ecosystem
// re-discovering the other's outputs implicitly.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const DEFAULT_GENERATED_PATH = join(here, "..", "generated", "version.json");

export function describeVersion(generatedPath = DEFAULT_GENERATED_PATH) {
  let raw;
  try {
    raw = readFileSync(generatedPath, "utf8");
  } catch (err) {
    throw new Error(
      `describeVersion: could not read ${generatedPath} -- run \`make generate\` ` +
        `(or \`cargo run -p codegen -- ${generatedPath}\`) first: ${err.message}`,
    );
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    throw new Error(`describeVersion: ${generatedPath} is not valid JSON: ${err.message}`);
  }

  if (typeof data.version !== "string" || typeof data.generatedBy !== "string") {
    throw new Error(`describeVersion: ${generatedPath} is missing version/generatedBy fields`);
  }

  return `web build against ${data.generatedBy} v${data.version}`;
}
