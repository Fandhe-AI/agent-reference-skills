import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, readFileSync, existsSync, symlinkSync, mkdirSync, rmSync, readdirSync, chmodSync } from "node:fs";
import { join, relative } from "node:path";
import { createHash } from "node:crypto";
import { runCli, runCliJson, makeTmpDir, cleanupTmpDir, BIN_DIR } from "./helpers.mjs";

const PROJECTS_DIR = join(BIN_DIR, "..", "..", "samples", "projects");

function listFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? listFiles(join(dir, d.name)) : [join(dir, d.name)],
  );
}

// サンプルの全ファイルを changes に列挙した --apply 用の計画を planDir に書く。
// skip のファイルは計画から外し、modify のファイルは現在の内容の hash で modify として載せる。
function writeApplyPlan(planDir, root, sample, { skip = [], modify = [] } = {}) {
  const sampleDir = join(PROJECTS_DIR, sample);
  const changes = listFiles(sampleDir)
    .map((f) => relative(sampleDir, f))
    .filter((rel) => !skip.includes(rel))
    .map((rel) =>
      modify.includes(rel)
        ? {
            path: rel,
            action: "modify",
            expectedState: "matches-hash",
            contentHash: `sha256:${createHash("sha256").update(readFileSync(join(root, rel))).digest("hex")}`,
          }
        : { path: rel, action: "create", expectedState: "absent" },
    );
  const planPath = join(planDir, "apply-plan.json");
  writeFileSync(planPath, JSON.stringify({ schemaVersion: "1.0.0", root, changes, checks: [] }, null, 2));
  return planPath;
}

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

test("preview-sample: --apply で --force なしの競合が 1 件でもあれば何も書き込まない（全件か無しか）", () => {
  const dir = makeTmpDir();
  const planDir = makeTmpDir();
  try {
    writeFileSync(join(dir, "Makefile"), "existing different content\n");
    const planPath = writeApplyPlan(planDir, dir, "incremental-build", { skip: ["Makefile"] });
    const r = runCliJson("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir, "--apply", "--plan", planPath]);
    assert.equal(r.status, 1);
    assert.equal(existsSync(join(dir, "src")), false, "競合していない新規ファイルも書き込まない");
    assert.equal(readFileSync(join(dir, "Makefile"), "utf8"), "existing different content\n", "競合ファイルは --force なしでは上書きしない");
    assert.ok(r.json.skippedConflicts.includes("Makefile"));
    assert.deepEqual(r.json.applied, []);
    assert.ok(r.json.findings.some((f) => f.id === "apply" && f.detail.includes("何も書き込んでいません")));
  } finally {
    cleanupTmpDir(dir);
    cleanupTmpDir(planDir);
  }
});

test("preview-sample: 書き込めない対象（同名ディレクトリ）が 1 件でもあれば計画外でも残りを書き込まない", () => {
  const dir = makeTmpDir();
  const planDir = makeTmpDir();
  try {
    mkdirSync(join(dir, "Makefile"));
    const planPath = writeApplyPlan(planDir, dir, "incremental-build", { skip: ["Makefile"] });
    const r = runCliJson("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir, "--apply", "--force", "--plan", planPath]);
    assert.equal(r.status, 1);
    assert.equal(existsSync(join(dir, "src")), false, "サンプルの一部だけを導入しない");
    assert.deepEqual(r.json.applied, []);
    assert.ok(r.json.findings.some((f) => f.id === "apply" && f.detail.includes("書き込めない対象")));
  } finally {
    cleanupTmpDir(dir);
    cleanupTmpDir(planDir);
  }
});

test("preview-sample: 書き込み途中で失敗したら、この実行で書いたファイルを元に戻し原因を報告する", { skip: process.platform === "win32" || process.getuid?.() === 0 }, () => {
  const dir = makeTmpDir();
  const planDir = makeTmpDir();
  try {
    const original = "original makefile\n";
    writeFileSync(join(dir, "Makefile"), original);
    mkdirSync(join(dir, "src"));
    const planPath = writeApplyPlan(planDir, dir, "incremental-build", { modify: ["Makefile"] });
    chmodSync(join(dir, "src"), 0o555);
    const r = runCliJson("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir, "--apply", "--force", "--plan", planPath]);
    chmodSync(join(dir, "src"), 0o755);
    assert.equal(r.status, 1);
    assert.deepEqual(r.json.applied, []);
    assert.equal(readFileSync(join(dir, "Makefile"), "utf8"), original, "上書きした Makefile は元の内容に戻す");
    assert.equal(existsSync(join(dir, ".gitignore")), false, "この実行で新規作成したファイルは削除する");
    assert.deepEqual(readdirSync(join(dir, "src")), []);
    const failure = r.json.findings.find((f) => f.id.startsWith("write:"));
    assert.ok(failure.detail.includes("EACCES"));
    assert.ok(failure.detail.includes("元に戻しました"));
  } finally {
    try { chmodSync(join(dir, "src"), 0o755); } catch {}
    cleanupTmpDir(dir);
    cleanupTmpDir(planDir);
  }
});

test("preview-sample: --apply に --plan がなければ引数エラー（exit 2）で何も書き込まない", () => {
  const dir = makeTmpDir();
  try {
    const r = runCli("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir, "--apply"]);
    assert.equal(r.status, 2);
    assert.equal(existsSync(join(dir, "Makefile")), false);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("preview-sample: 計画に含まれないファイルが 1 件でもあれば何も書き込まない（exit 1）", () => {
  const dir = makeTmpDir();
  const planDir = makeTmpDir();
  try {
    const planPath = writeApplyPlan(planDir, dir, "incremental-build", { skip: ["Makefile"] });
    const r = runCliJson("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir, "--apply", "--plan", planPath]);
    assert.equal(r.status, 1);
    assert.ok(r.json.findings.some((f) => f.id === "plan" && f.detail.includes("計画に含まれないファイル: Makefile")));
    assert.deepEqual(r.json.applied, []);
    assert.equal(existsSync(join(dir, "src", "01-intro.txt")), false, "一部だけを書き込まない");
  } finally {
    cleanupTmpDir(dir);
    cleanupTmpDir(planDir);
  }
});

test("preview-sample: 計画の root が --root と異なれば何も書き込まない（exit 1）", () => {
  const dir = makeTmpDir();
  const other = makeTmpDir();
  const planDir = makeTmpDir();
  try {
    const planPath = writeApplyPlan(planDir, other, "incremental-build");
    const r = runCliJson("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir, "--apply", "--plan", planPath]);
    assert.equal(r.status, 1);
    assert.ok(r.json.findings.some((f) => f.id === "plan" && f.detail.includes("一致しません")));
    assert.equal(existsSync(join(dir, "Makefile")), false);
  } finally {
    cleanupTmpDir(dir);
    cleanupTmpDir(other);
    cleanupTmpDir(planDir);
  }
});

test("preview-sample: 上書き対象が計画作成後に変更されていれば（matches-hash 不一致）何も書き込まない", () => {
  const dir = makeTmpDir();
  const planDir = makeTmpDir();
  try {
    writeFileSync(join(dir, "Makefile"), "approved content\n");
    const planPath = writeApplyPlan(planDir, dir, "incremental-build", { modify: ["Makefile"] });
    writeFileSync(join(dir, "Makefile"), "changed after approval\n");
    const r = runCliJson("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir, "--apply", "--force", "--plan", planPath]);
    assert.equal(r.status, 1);
    assert.equal(readFileSync(join(dir, "Makefile"), "utf8"), "changed after approval\n");
    assert.equal(existsSync(join(dir, "src", "01-intro.txt")), false);
  } finally {
    cleanupTmpDir(dir);
    cleanupTmpDir(planDir);
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
  const planDir = makeTmpDir();
  try {
    // root/src → root 外ディレクトリ への symlink を置く
    symlinkSync(outside, join(dir, "src"));
    const planPath = writeApplyPlan(planDir, dir, "incremental-build");
    const r = runCliJson("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir, "--apply", "--force", "--plan", planPath]);
    assert.equal(r.status, 1);
    assert.equal(existsSync(join(outside, "01-intro.txt")), false, "root 外には書き込まない");
    const escaped = r.json.findings.find((f) => f.evidence === join("src", "01-intro.txt"));
    assert.ok(escaped);
    assert.equal(escaped.status, "FAIL");
    assert.ok(!r.json.applied.includes(join("src", "01-intro.txt")));
    assert.equal(existsSync(join(dir, "Makefile")), false, "計画の再検証が逸脱で失敗するため、ほかのファイルも書き込まない");
  } finally {
    cleanupTmpDir(dir);
    cleanupTmpDir(outside);
    cleanupTmpDir(planDir);
  }
});

test("preview-sample: --apply --force で競合を上書きした場合は実態どおり PASS（exit 0）を返す", () => {
  const dir = makeTmpDir();
  const planDir = makeTmpDir();
  try {
    writeFileSync(join(dir, "Makefile"), "existing different content\n");
    const planPath = writeApplyPlan(planDir, dir, "incremental-build", { modify: ["Makefile"] });
    const r = runCliJson("preview-sample.mjs", ["--sample", "incremental-build", "--root", dir, "--apply", "--force", "--plan", planPath]);
    assert.equal(r.status, 0);
    assert.equal(r.json.status, "PASS");
    assert.ok(r.json.applied.includes("Makefile"));
    assert.notEqual(readFileSync(join(dir, "Makefile"), "utf8"), "existing different content\n");
    const overwritten = r.json.findings.find((f) => f.evidence === "Makefile");
    assert.ok(overwritten.detail.includes("--force"));
  } finally {
    cleanupTmpDir(dir);
    cleanupTmpDir(planDir);
  }
});

test("preview-sample: 走査対象外ディレクトリ（build 等）を含むサンプルは欠けたまま適用せず exit 1", () => {
  const dir = makeTmpDir();
  const sampleName = `tmp-skipdir-${process.pid}`;
  const sampleDir = join(BIN_DIR, "..", "..", "samples", "projects", sampleName);
  try {
    mkdirSync(join(sampleDir, "build"), { recursive: true });
    writeFileSync(join(sampleDir, "Makefile"), "all:\n");
    writeFileSync(join(sampleDir, "build", "keep.txt"), "x\n");
    const r = runCli("preview-sample.mjs", ["--sample", sampleName, "--root", dir]);
    assert.equal(r.status, 1);
    assert.ok(r.stderr.includes("走査対象外"));
    assert.equal(existsSync(join(dir, "Makefile")), false, "一部だけを適用しない");
  } finally {
    rmSync(sampleDir, { recursive: true, force: true });
    cleanupTmpDir(dir);
  }
});

test("preview-sample: symlink を含むサンプルはリンク先を欠いたまま適用せず exit 1", () => {
  const dir = makeTmpDir();
  const sampleName = `tmp-symlink-${process.pid}`;
  const sampleDir = join(PROJECTS_DIR, sampleName);
  try {
    mkdirSync(sampleDir, { recursive: true });
    writeFileSync(join(sampleDir, "Makefile"), "all:\n");
    symlinkSync("Makefile", join(sampleDir, "GNUmakefile"));
    const r = runCli("preview-sample.mjs", ["--sample", sampleName, "--root", dir]);
    assert.equal(r.status, 1);
    assert.ok(r.stderr.includes("symlink"));
    assert.equal(existsSync(join(dir, "Makefile")), false, "一部だけを適用しない");
  } finally {
    rmSync(sampleDir, { recursive: true, force: true });
    cleanupTmpDir(dir);
  }
});
