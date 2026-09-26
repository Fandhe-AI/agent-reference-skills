import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { BIN_DIR } from "./helpers.mjs";

const PROJECTS_DIR = join(BIN_DIR, "..", "..", "samples", "projects");

// samples/projects の各 Makefile の recipe 行（タブ始まり）
function recipeLines() {
  return readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(PROJECTS_DIR, d.name, "Makefile")))
    .flatMap((d) =>
      readFileSync(join(PROJECTS_DIR, d.name, "Makefile"), "utf8")
        .split("\n")
        .filter((line) => line.startsWith("\t"))
        .map((line) => ({ sample: d.name, line: line.trim() })),
    );
}

test("sample-projects: cargo clean は --target-dir で自プロジェクトの target に限定する（共有 CARGO_TARGET_DIR を消さない）", () => {
  const cleans = recipeLines().filter((r) => /\bcargo\s+clean\b/.test(r.line));
  assert.ok(cleans.length > 0, "cargo clean を使うサンプルが存在する前提");
  for (const r of cleans) {
    assert.match(r.line, /--target-dir\s+target\b/, `${r.sample}: ${r.line}`);
  }
});

test("sample-projects: GitHub Actions テンプレートは action を commit SHA に固定し権限を contents: read に限定する", () => {
  const text = readFileSync(join(BIN_DIR, "..", "..", "samples", "ci", "github-actions.yml.example"), "utf8");
  const uses = [...text.matchAll(/^\s*-?\s*uses:\s*(\S+)/gm)].map((m) => m[1]);
  assert.ok(uses.length > 0);
  for (const u of uses) {
    assert.match(u, /@[0-9a-f]{40}$/, `可変参照ではなく SHA 固定: ${u}`);
  }
  assert.match(text, /^permissions:\n {2}contents: read\n/m);
  assert.match(text, /persist-credentials: false/);
});
