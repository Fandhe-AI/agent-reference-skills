import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, readFileSync, existsSync, realpathSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { writeAll } from "../scripts/bin/lib/apply.mjs";
import { makeTmpDir, cleanupTmpDir } from "./helpers.mjs";

const hashOf = (text) => `sha256:${createHash("sha256").update(text).digest("hex")}`;
const item = (root, rel, text, extra = {}) => ({ dest: join(root, rel), rel, data: Buffer.from(text), mode: 0o644, ...extra });

test("apply: 照合後に上書き対象が変わっていれば書き込み直前に中止し、この実行の書き込みを巻き戻す", () => {
  const root = realpathSync(makeTmpDir());
  try {
    writeFileSync(join(root, "a.txt"), "changed after approval\n");
    const applied = [];
    const failure = writeAll(
      root,
      [item(root, "new.txt", "new\n"), item(root, "a.txt", "sample\n", { expectedHash: hashOf("approved original\n") })],
      applied,
    );
    assert.ok(failure);
    assert.equal(failure.rel, "a.txt");
    assert.ok(failure.detail.includes("contentHash"));
    assert.equal(readFileSync(join(root, "a.txt"), "utf8"), "changed after approval\n", "承認時と異なる内容を上書きしない");
    assert.equal(existsSync(join(root, "new.txt")), false, "先に作成したファイルは巻き戻す");
    assert.deepEqual(applied, []);
  } finally {
    cleanupTmpDir(root);
  }
});

test("apply: 照合後に新規作成先へファイルが現れていれば上書きも削除もせず中止する", () => {
  const root = realpathSync(makeTmpDir());
  try {
    writeFileSync(join(root, "late.txt"), "created by someone else\n");
    const applied = [];
    const failure = writeAll(root, [item(root, "first.txt", "1\n"), item(root, "late.txt", "sample\n")], applied);
    assert.ok(failure);
    assert.equal(failure.rel, "late.txt");
    assert.equal(readFileSync(join(root, "late.txt"), "utf8"), "created by someone else\n", "他者のファイルを巻き戻しで消さない");
    assert.equal(existsSync(join(root, "first.txt")), false);
  } finally {
    cleanupTmpDir(root);
  }
});

test("apply: 前提が変わっていなければ新規作成と上書きの両方を書き込む", () => {
  const root = realpathSync(makeTmpDir());
  try {
    writeFileSync(join(root, "a.txt"), "approved original\n");
    const applied = [];
    const failure = writeAll(
      root,
      [item(root, "dir/new.txt", "new\n", { dest: join(root, "dir", "new.txt") }), item(root, "a.txt", "sample\n", { expectedHash: hashOf("approved original\n") })],
      applied,
    );
    assert.equal(failure, null);
    assert.deepEqual(applied, ["dir/new.txt", "a.txt"]);
    assert.equal(readFileSync(join(root, "a.txt"), "utf8"), "sample\n");
    assert.equal(readFileSync(join(root, "dir", "new.txt"), "utf8"), "new\n");
  } finally {
    cleanupTmpDir(root);
  }
});
