import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync, mkdirSync, writeFileSync, copyFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { BIN_DIR, makeTmpDir, cleanupTmpDir } from "./helpers.mjs";

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

test("sample-projects: recipe でグロブ付きの rm -r を使わない（途中の symlink を辿るため scripts/ の検査付き削除へ委譲する）", () => {
  const globRemovals = recipeLines().filter((r) => /\brm\s+-[a-zA-Z]*r[a-zA-Z]*\b.*[*?[]/.test(r.line));
  assert.deepEqual(globRemovals, []);
});

// samples/projects 直下で Cargo.toml を持つサンプル（= Cargo プロジェクトの root）
function cargoSamples() {
  return readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(PROJECTS_DIR, d.name, "Cargo.toml")))
    .map((d) => d.name);
}

test("sample-projects: Cargo サンプルは自身を workspace root にする（取り込み先の親 workspace に属さない）", () => {
  const samples = cargoSamples();
  assert.ok(samples.length > 0);
  for (const name of samples) {
    const manifest = readFileSync(join(PROJECTS_DIR, name, "Cargo.toml"), "utf8");
    assert.match(manifest, /^\[workspace\]$/m, `${name}/Cargo.toml に [workspace] があること`);
  }
});

test("sample-projects: Cargo.lock は同梱し、親の .gitignore が Cargo.lock を除外しても再包含される", (t) => {
  if (spawnSync("git", ["--version"]).status !== 0) {
    t.skip("git が無い環境では検証できない");
    return;
  }
  const tmp = makeTmpDir();
  try {
    assert.equal(spawnSync("git", ["init", "-q", tmp]).status, 0);
    // 取り込み先リポジトリが root で Cargo.lock を除外している状況を再現する
    writeFileSync(join(tmp, ".gitignore"), "Cargo.lock\n");
    for (const name of cargoSamples()) {
      assert.ok(existsSync(join(PROJECTS_DIR, name, "Cargo.lock")), `${name}/Cargo.lock を同梱すること`);
      const dest = join(tmp, "vendored", name);
      mkdirSync(dest, { recursive: true });
      copyFileSync(join(PROJECTS_DIR, name, ".gitignore"), join(dest, ".gitignore"));
      writeFileSync(join(dest, "Cargo.lock"), "");
      const r = spawnSync("git", ["-C", tmp, "check-ignore", "-q", join("vendored", name, "Cargo.lock")]);
      // check-ignore は「無視される」なら 0、「無視されない」なら 1
      assert.equal(r.status, 1, `${name}/Cargo.lock が親の .gitignore で除外されないこと`);
    }
  } finally {
    cleanupTmpDir(tmp);
  }
});
