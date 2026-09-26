import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, readFileSync, existsSync, symlinkSync } from "node:fs";
import { join } from "node:path";
import { runCli, runCliJson, makeTmpDir, cleanupTmpDir } from "./helpers.mjs";

test("preview-sample: --sample / --root なしは引数エラー（exit 2）", () => {
  const r = runCli("preview-sample.mjs", []);
  assert.equal(r.status, 2);
});

test("preview-sample: 存在しないサンプル名は exit 1", () => {
  const dir = makeTmpDir();
  try {
    const r = runCli("preview-sample.mjs", ["--sample", "no-such-sample-xyz", "--root", dir]);
    assert.equal(r.status, 1);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("preview-sample: 既定では対象 root を書き換えない", () => {
  const dir = makeTmpDir();
  try {
    const r = runCliJson("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir]);
    assert.equal(r.status, 0);
    assert.equal(r.json.mode, "plan");
    assert.equal(existsSync(join(dir, "Makefile")), false, "--apply なしでは書き込まれない");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("preview-sample: 既存ファイルとの内容差分を競合として表示する", () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, "Makefile"), "this is not the sample makefile\n");
    const r = runCliJson("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir]);
    assert.equal(r.json.status, "FAIL");
    const conflict = r.json.findings.find((f) => f.evidence === "Makefile");
    assert.ok(conflict);
    assert.equal(conflict.status, "FAIL");
    assert.ok(conflict.detail.includes("競合"));
  } finally {
    cleanupTmpDir(dir);
  }
});

test("preview-sample: --apply で新規ファイルのみ書き込み、競合はスキップする", () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, "Makefile"), "existing different content\n");
    const r = runCliJson("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir, "--apply"]);
    assert.ok(existsSync(join(dir, "src", "01-intro.txt")), "競合していない新規ファイルは書き込まれる");
    assert.equal(readFileSync(join(dir, "Makefile"), "utf8"), "existing different content\n", "競合ファイルは --force なしでは上書きしない");
    assert.ok(r.json.skippedConflicts.includes("Makefile"));
  } finally {
    cleanupTmpDir(dir);
  }
});

test("preview-sample: --sample に `..` や区切り文字を含む値は引数エラー（exit 2）", () => {
  const dir = makeTmpDir();
  try {
    for (const bad of ["../plans", "..", "incremental-build/../../plans", "/etc"]) {
      const r = runCli("preview-sample.mjs", ["--sample", bad, "--root", dir]);
      assert.equal(r.status, 2, `--sample ${bad} は拒否される`);
    }
  } finally {
    cleanupTmpDir(dir);
  }
});

test("preview-sample: root 内の symlink を経由した root 外への書き込みを拒否する（--apply --force でも）", () => {
  const dir = makeTmpDir();
  const outside = makeTmpDir();
  try {
    // root/src → root 外ディレクトリ への symlink を置く
    symlinkSync(outside, join(dir, "src"));
    const r = runCliJson("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir, "--apply", "--force"]);
    assert.equal(r.status, 1);
    assert.equal(existsSync(join(outside, "01-intro.txt")), false, "root 外には書き込まない");
    const escaped = r.json.findings.find((f) => f.evidence === join("src", "01-intro.txt"));
    assert.ok(escaped);
    assert.equal(escaped.status, "FAIL");
    assert.ok(!r.json.applied.includes(join("src", "01-intro.txt")));
    assert.ok(existsSync(join(dir, "Makefile")), "逸脱しないファイルは書き込まれる");
  } finally {
    cleanupTmpDir(dir);
    cleanupTmpDir(outside);
  }
});

test("preview-sample: --apply --force で競合を上書きした場合は実態どおり PASS（exit 0）を返す", () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, "Makefile"), "existing different content\n");
    const r = runCliJson("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir, "--apply", "--force"]);
    assert.equal(r.status, 0);
    assert.equal(r.json.status, "PASS");
    assert.ok(r.json.applied.includes("Makefile"));
    assert.notEqual(readFileSync(join(dir, "Makefile"), "utf8"), "existing different content\n");
    const overwritten = r.json.findings.find((f) => f.evidence === "Makefile");
    assert.ok(overwritten.detail.includes("--force"));
  } finally {
    cleanupTmpDir(dir);
  }
});
