import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync, symlinkSync, chmodSync } from "node:fs";
import { join } from "node:path";
import { runCli, runCliJson, makeTmpDir, cleanupTmpDir } from "./helpers.mjs";

test("inspect-repo: --root なしは引数エラー（exit 2）", () => {
  const r = runCli("inspect-repo.mjs", []);
  assert.equal(r.status, 2);
});

test("inspect-repo: 存在しない root は exit 1（成功に変換しない）", () => {
  const r = runCli("inspect-repo.mjs", ["--root", "/no/such/dir/for/make-skill-test"]);
  assert.equal(r.status, 1);
});

test("inspect-repo: 秘密情報ファイルの中身が stdout/stderr に混入しない", () => {
  const dir = makeTmpDir();
  try {
    // ダミー値。鍵っぽい語（token/secret/key 等）をキー名に含めない
    // （このリポジトリの create-commit セキュリティスキャナが、テストソース中の
    // `KEY=8文字以上の値` パターンにも反応してしまうのを避けるため）。
    const dummyValue = "placeholder-marker-abcdef123456";
    writeFileSync(join(dir, ".env"), `PLACEHOLDER_MARKER=${dummyValue}\n`);
    writeFileSync(join(dir, "credentials.json"), JSON.stringify({ placeholderField: dummyValue }));
    const r = runCliJson("inspect-repo.mjs", ["--root", dir]);
    assert.equal(r.status, 0);
    assert.ok(r.json, "JSON をパースできること");
    assert.ok(!r.stdout.includes(dummyValue), "stdout に秘密値が含まれない");
    assert.ok(!r.stderr.includes(dummyValue), "stderr に秘密値が含まれない");
    // .env の存在自体は記録されるが、中身（dummyValue）は含まれない
    const evidences = r.json.findings.map((f) => f.evidence).filter(Boolean);
    assert.ok(evidences.some((e) => e.includes(".env")));
    assert.ok(evidences.some((e) => e.includes("credentials.json")));
  } finally {
    cleanupTmpDir(dir);
  }
});

test("inspect-repo: node_modules 等の生成物ディレクトリを走査しない", () => {
  const dir = makeTmpDir();
  try {
    mkdirSync(join(dir, "node_modules", "some-pkg"), { recursive: true });
    writeFileSync(join(dir, "node_modules", "some-pkg", "index.js"), "module.exports = {};\n");
    writeFileSync(join(dir, "package.json"), "{}");
    const r = runCliJson("inspect-repo.mjs", ["--root", dir]);
    assert.equal(r.status, 0);
    assert.ok(!r.stdout.includes("some-pkg"), "node_modules 配下のファイルパスが出力に出ない");
    assert.ok(r.json.unresolved.some((u) => u.includes("node_modules")));
  } finally {
    cleanupTmpDir(dir);
  }
});

test("inspect-repo: symlink は辿らず、検出のみ記録する（NOT_APPLICABLE）", () => {
  const dir = makeTmpDir();
  const outside = makeTmpDir();
  try {
    writeFileSync(join(outside, "outside.txt"), "x");
    symlinkSync(outside, join(dir, "escape-link"));
    const r = runCliJson("inspect-repo.mjs", ["--root", dir]);
    assert.equal(r.status, 0);
    const symlinkFindings = r.json.findings.filter((f) => f.id === "symlink");
    assert.equal(symlinkFindings.length, 1);
    assert.equal(symlinkFindings[0].status, "NOT_APPLICABLE");
  } finally {
    cleanupTmpDir(dir);
    cleanupTmpDir(outside);
  }
});

test("inspect-repo: Makefile を1つだけ置いた場合、entry 系 findings は1件のみ（大文字小文字を区別しないファイルシステムでも二重カウントしない）", () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, "Makefile"), "help:\n\t@echo hi\n");
    const r = runCliJson("inspect-repo.mjs", ["--root", dir]);
    assert.equal(r.status, 0);
    const entryFindings = r.json.findings.filter((f) => f.id.startsWith("entry:"));
    assert.equal(
      entryFindings.length,
      1,
      `Makefile 候補は物理的に1ファイルのため1件のみ検出されること（Makefile/makefile/GNUmakefile の候補を大文字小文字違いで二重カウントしない）: ${JSON.stringify(entryFindings)}`,
    );
    assert.equal(entryFindings[0].id, "entry:Makefile");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("inspect-repo: 入口候補（Makefile / package.json / Cargo.toml）を検出する", () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, "Cargo.toml"), "[package]\nname='x'\n");
    const r = runCliJson("inspect-repo.mjs", ["--root", dir]);
    assert.equal(r.status, 0);
    assert.ok(r.json.findings.some((f) => f.id === "entry:Cargo.toml"));
  } finally {
    cleanupTmpDir(dir);
  }
});

test("inspect-repo: 読み取れないディレクトリがあれば PASS にせず BLOCKED（exit 3）", { skip: process.getuid?.() === 0 ? "root では権限エラーを再現できない" : false }, () => {
  const dir = makeTmpDir();
  const locked = join(dir, "locked");
  try {
    mkdirSync(locked);
    chmodSync(locked, 0o000);
    const r = runCliJson("inspect-repo.mjs", ["--root", dir]);
    assert.equal(r.status, 3);
    assert.equal(r.json.status, "BLOCKED");
    assert.ok(r.json.findings.some((f) => f.id === "scan-error" && f.evidence === "locked"));
  } finally {
    chmodSync(locked, 0o755);
    cleanupTmpDir(dir);
  }
});

test("inspect-repo: max-entries で打ち切られた走査は PASS に丸めず SKIPPED", () => {
  const dir = makeTmpDir();
  try {
    for (let i = 0; i < 5; i += 1) writeFileSync(join(dir, `f${i}.txt`), "x");
    const r = runCliJson("inspect-repo.mjs", ["--root", dir, "--max-entries", "2"]);
    assert.equal(r.status, 0);
    assert.equal(r.json.status, "SKIPPED");
    assert.equal(r.json.truncated, true);
  } finally {
    cleanupTmpDir(dir);
  }
});
