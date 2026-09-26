import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync, symlinkSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { runCli, runCliJson, makeTmpDir, cleanupTmpDir } from "./helpers.mjs";

function sha256Of(text) {
  return `sha256:${createHash("sha256").update(text).digest("hex")}`;
}

function writePlan(dir, plan) {
  const planPath = join(dir, "plan.json");
  writeFileSync(planPath, JSON.stringify(plan, null, 2));
  return planPath;
}

test("validate-plan: --plan なしは引数エラー（exit 2）", () => {
  const r = runCli("validate-plan.mjs", []);
  assert.equal(r.status, 2);
});

test("validate-plan: 存在しない計画ファイルは exit 1", () => {
  const r = runCli("validate-plan.mjs", ["--plan", "/no/such/plan.json"]);
  assert.equal(r.status, 1);
});

test("validate-plan: 壊れた JSON は exit 1", () => {
  const dir = makeTmpDir();
  try {
    const planPath = join(dir, "broken.json");
    writeFileSync(planPath, "{ not valid json");
    const r = runCli("validate-plan.mjs", ["--plan", planPath]);
    assert.equal(r.status, 1);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("validate-plan: 正常な計画は PASS（exit 0）", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [{ path: "NEW.txt", action: "create", expectedState: "absent" }],
      checks: [],
    });
    const r = runCliJson("validate-plan.mjs", ["--plan", planPath]);
    assert.equal(r.status, 0);
    assert.equal(r.json.status, "PASS");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("validate-plan: create 指定で既存ファイルがあれば衝突検出（FAIL, exit 1）", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    writeFileSync(join(root, "EXIST.txt"), "already here");
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [{ path: "EXIST.txt", action: "create", expectedState: "absent" }],
      checks: [],
    });
    const r = runCliJson("validate-plan.mjs", ["--plan", planPath]);
    assert.equal(r.status, 1);
    assert.equal(r.json.status, "FAIL");
    assert.ok(r.json.findings.some((f) => f.detail.includes("衝突")));
  } finally {
    cleanupTmpDir(dir);
  }
});

test("validate-plan: `..` による root 外への明示的な逸脱を検出する", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [{ path: "../../etc/escape.txt", action: "create", expectedState: "absent" }],
      checks: [],
    });
    const r = runCliJson("validate-plan.mjs", ["--plan", planPath]);
    assert.equal(r.status, 1);
    assert.ok(r.json.findings.some((f) => f.detail.includes("逸脱")));
  } finally {
    cleanupTmpDir(dir);
  }
});

test("validate-plan: symlink 経由の root 外への逸脱を検出する（必須ケース）", () => {
  const dir = makeTmpDir();
  const outside = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    writeFileSync(join(outside, "secret-outside.txt"), "outside content");
    // root 配下に、root 外を指す symlink ディレクトリを作る
    symlinkSync(outside, join(root, "escape-dir"));
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [{ path: "escape-dir/secret-outside.txt", action: "modify", expectedState: "present" }],
      checks: [],
    });
    const r = runCliJson("validate-plan.mjs", ["--plan", planPath]);
    assert.equal(r.status, 1);
    assert.ok(
      r.json.findings.some((f) => f.detail.includes("逸脱") && f.detail.includes("symlink-escape")),
      `symlink-escape を検出すること: ${JSON.stringify(r.json.findings)}`,
    );
  } finally {
    cleanupTmpDir(dir);
    cleanupTmpDir(outside);
  }
});

test("validate-plan: 絶対パス指定は許可しない", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [{ path: "/etc/passwd", action: "modify", expectedState: "present" }],
      checks: [],
    });
    const r = runCliJson("validate-plan.mjs", ["--plan", planPath]);
    assert.equal(r.status, 1);
    assert.ok(r.json.findings.some((f) => f.detail.includes("absolute-path-not-allowed")));
  } finally {
    cleanupTmpDir(dir);
  }
});

test("validate-plan: checks[].command に空白・shell メタ文字を含む場合は不正とする", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [],
      checks: [{ name: "bad", command: "rm -rf /", args: [], approved: true }],
    });
    const r = runCliJson("validate-plan.mjs", ["--plan", planPath]);
    assert.equal(r.status, 1);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("validate-plan: expectedState: matches-hash は元ファイルの実際の内容と contentHash を突き合わせる（一致で PASS）", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const content = "original file content\n";
    writeFileSync(join(root, "TARGET.txt"), content);
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [{ path: "TARGET.txt", action: "modify", expectedState: "matches-hash", contentHash: sha256Of(content) }],
      checks: [],
    });
    const r = runCliJson("validate-plan.mjs", ["--plan", planPath]);
    assert.equal(r.status, 0);
    assert.equal(r.json.status, "PASS");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("validate-plan: matches-hash は元ファイルが計画作成後に変更されていれば FAIL にする（古い承認を再利用しない）", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    writeFileSync(join(root, "TARGET.txt"), "content at plan time\n");
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [
        { path: "TARGET.txt", action: "modify", expectedState: "matches-hash", contentHash: sha256Of("content at plan time\n") },
      ],
      checks: [],
    });
    // 計画作成後にファイルが変わった状況を再現
    writeFileSync(join(root, "TARGET.txt"), "content changed after planning\n");
    const r = runCliJson("validate-plan.mjs", ["--plan", planPath]);
    assert.equal(r.status, 1);
    assert.equal(r.json.status, "FAIL");
    assert.ok(r.json.findings.some((f) => f.detail.includes("contentHash 不一致")));
  } finally {
    cleanupTmpDir(dir);
  }
});

test("validate-plan: matches-hash 指定なのに contentHash が不正な形式なら FAIL", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    writeFileSync(join(root, "TARGET.txt"), "x");
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [{ path: "TARGET.txt", action: "modify", expectedState: "matches-hash", contentHash: "not-a-valid-hash" }],
      checks: [],
    });
    const r = runCliJson("validate-plan.mjs", ["--plan", planPath]);
    assert.equal(r.status, 1);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("validate-plan: 相対 root は計画ファイルのディレクトリを基準に解決し、起動時の cwd に依存しない", () => {
  const dir = makeTmpDir();
  try {
    const target = join(dir, "target");
    mkdirSync(target);
    const planDir = join(dir, "plans");
    mkdirSync(planDir);
    const planPath = writePlan(planDir, {
      schemaVersion: "1.0.0",
      root: "../target",
      changes: [],
      checks: [],
    });

    // 計画ファイル・対象 root いずれとも異なる2つの cwd から起動し、結果が一致することを確認する。
    const fromDir = runCliJson("validate-plan.mjs", ["--plan", planPath], { cwd: dir });
    const fromTarget = runCliJson("validate-plan.mjs", ["--plan", planPath], { cwd: target });

    assert.ok(fromDir.json, `JSON をパースできること: stdout=${fromDir.stdout} stderr=${fromDir.stderr}`);
    assert.ok(fromTarget.json, `JSON をパースできること: stdout=${fromTarget.stdout} stderr=${fromTarget.stderr}`);
    assert.equal(fromDir.json.status, "PASS");
    assert.equal(fromTarget.json.status, "PASS");
    assert.equal(fromDir.json.scope.root, fromTarget.json.scope.root, "cwd が違っても解決済み root は同じであること");
    assert.equal(fromDir.json.scope.root, target);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("validate-plan: 計画ファイルを受け取っただけでは何も実行しない（副作用なし）", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [{ path: "SHOULD_NOT_EXIST.txt", action: "create", expectedState: "absent" }],
      checks: [{ name: "marker", command: "touch", args: [join(root, "MARKER_IF_EXECUTED.txt")], approved: true }],
    });
    runCliJson("validate-plan.mjs", ["--plan", planPath]);
    assert.ok(!existsSync(join(root, "MARKER_IF_EXECUTED.txt")));
    assert.ok(!existsSync(join(root, "SHOULD_NOT_EXIST.txt")));
  } finally {
    cleanupTmpDir(dir);
  }
});
