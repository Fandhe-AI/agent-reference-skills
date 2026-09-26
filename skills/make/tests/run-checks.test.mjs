import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { runCli, runCliJson, makeTmpDir, cleanupTmpDir, approveArgs } from "./helpers.mjs";

function writePlan(dir, plan) {
  const planPath = join(dir, "plan.json");
  writeFileSync(planPath, JSON.stringify(plan, null, 2));
  return planPath;
}

const markerCheck = (root, approved) => ({
  name: "create-marker",
  // touch はほぼ全プラットフォームの POSIX 環境に存在するが、CI での可搬性のため node 自身を使う
  command: process.execPath,
  args: ["-e", `require('fs').writeFileSync(${JSON.stringify(join(root, "MARKER.txt"))}, 'executed')`],
  approved,
  timeoutMs: 5000,
});

test("run-checks: --plan なしは引数エラー（exit 2）", () => {
  const r = runCli("run-checks.mjs", []);
  assert.equal(r.status, 2);
});

test("run-checks: 既定は dry-run で、--execute なしでは実コマンドを起動しない", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [],
      checks: [markerCheck(root, true)],
    });
    const r = runCliJson("run-checks.mjs", ["--plan", planPath]);
    assert.equal(r.json.profile, "dry-run");
    assert.equal(r.json.checks[0].status, "SKIPPED");
    assert.equal(r.json.checks[0].executed, false);
    assert.equal(existsSync(join(root, "MARKER.txt")), false, "dry-run では marker ファイルが作られない");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("run-checks: --execute でも approved:true がない check は BLOCKED のまま実行しない", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [],
      checks: [markerCheck(root, false)],
    });
    const r = runCliJson("run-checks.mjs", ["--plan", planPath, "--execute", ...approveArgs(planPath)]);
    assert.equal(r.json.status, "BLOCKED");
    assert.equal(r.status, 3);
    assert.equal(r.json.checks[0].status, "BLOCKED");
    assert.equal(r.json.checks[0].executed, false);
    assert.equal(existsSync(join(root, "MARKER.txt")), false, "承認のない check は実行されない");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("run-checks: --execute かつ approved:true なら実行され PASS になる", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [],
      checks: [markerCheck(root, true)],
    });
    const r = runCliJson("run-checks.mjs", ["--plan", planPath, "--execute", ...approveArgs(planPath)]);
    assert.equal(r.json.status, "PASS");
    assert.equal(r.json.checks[0].executed, true);
    assert.equal(existsSync(join(root, "MARKER.txt")), true);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("run-checks: コマンド失敗は成功に変換されない（FAIL のまま）", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [],
      checks: [
        {
          name: "failing-check",
          command: process.execPath,
          args: ["-e", "process.exit(7)"],
          approved: true,
          timeoutMs: 5000,
        },
      ],
    });
    const r = runCliJson("run-checks.mjs", ["--plan", planPath, "--execute", ...approveArgs(planPath)]);
    assert.equal(r.json.status, "FAIL");
    assert.equal(r.status, 1);
    assert.equal(r.json.checks[0].status, "FAIL");
    assert.equal(r.json.checks[0].exitCode, 7);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("run-checks: timeout したコマンドは FAIL のまま成功に変換されない", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [],
      checks: [
        {
          name: "sleeper",
          command: process.execPath,
          args: ["-e", "setTimeout(()=>{}, 5000)"],
          approved: true,
          timeoutMs: 300,
        },
      ],
    });
    const r = runCliJson("run-checks.mjs", ["--plan", planPath, "--execute", ...approveArgs(planPath)]);
    assert.equal(r.json.status, "FAIL");
    assert.equal(r.json.checks[0].timedOut, true);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("run-checks: 不正な計画（root 不在）は checks を一切実行せず BLOCKED にする", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "does-not-exist");
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [],
      checks: [markerCheck(dir, true)],
    });
    const r = runCliJson("run-checks.mjs", ["--plan", planPath, "--execute", ...approveArgs(planPath)]);
    assert.equal(r.json.status, "BLOCKED");
    assert.equal(r.status, 3);
    assert.equal(existsSync(join(dir, "MARKER.txt")), false);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("run-checks: 再検証が失敗する計画（checks[].name 欠落）は --json なしでは JSON を stdout に出さない（出力形式は --json のみに依存する）", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [],
      // name 欠落 → validatePlanShape の再検証で FAIL finding が出て BLOCKED になる経路
      checks: [{ command: process.execPath, args: [], approved: true }],
    });

    const rHuman = runCli("run-checks.mjs", ["--plan", planPath]);
    assert.equal(rHuman.status, 3, "計画の再検証失敗は BLOCKED（exit 3）");
    assert.throws(() => JSON.parse(rHuman.stdout), "human 出力は JSON としてパースできないこと");
    assert.ok(rHuman.stdout.includes("run-checks:"), "人間向けサマリーの先頭ラベルを含むこと");

    const rJson = runCliJson("run-checks.mjs", ["--plan", planPath]);
    assert.equal(rJson.status, 3);
    assert.ok(rJson.json, "--json 指定時は JSON としてパースできること");
    assert.equal(rJson.json.status, "BLOCKED");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("run-checks: checks が空の計画は NOT_APPLICABLE（exit 0、失敗に変換しない）", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, { schemaVersion: "1.0.0", root, changes: [], checks: [] });
    const r = runCliJson("run-checks.mjs", ["--plan", planPath, "--execute", ...approveArgs(planPath)]);
    assert.equal(r.json.status, "NOT_APPLICABLE");
    assert.equal(r.status, 0);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("run-checks: 未対応の schemaVersion の計画は --execute + approved:true でも実行しない（BLOCKED）", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const marker = join(root, "ran.txt");
    const planPath = writePlan(dir, {
      schemaVersion: "9.9.9",
      root,
      changes: [],
      checks: [{ name: "write-marker", command: process.execPath, args: ["-e", `require("fs").writeFileSync(${JSON.stringify(marker)}, "x")`], approved: true }],
    });
    const r = runCliJson("run-checks.mjs", ["--plan", planPath, "--execute", ...approveArgs(planPath)]);
    assert.equal(r.status, 3);
    assert.equal(r.json.status, "BLOCKED");
    assert.equal(existsSync(marker), false, "コマンドは起動されない");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("run-checks: 実行したコマンドの stdout / stderr を結果 JSON に含めない（秘密情報の混入防止）", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const marker = "PLACEHOLDER_OUTPUT_MARKER_not_a_secret";
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [],
      checks: [
        // marker は子プロセス内で連結して作る（args の値が出力に現れたのか、コマンド出力なのかを区別するため）
        { name: "prints", command: process.execPath, args: ["-e", `const m = ${JSON.stringify(marker.slice(0, 11))} + ${JSON.stringify(marker.slice(11))}; console.log(m); console.error(m); process.exit(3)`], approved: true },
      ],
    });
    const r = runCliJson("run-checks.mjs", ["--plan", planPath, "--execute", ...approveArgs(planPath)]);
    assert.equal(r.status, 1);
    assert.equal(r.json.checks[0].exitCode, 3);
    assert.equal(r.stdout.includes(marker), false, "stdout（JSON）にコマンド出力を含めない");
    assert.equal(r.stderr.includes(marker), false, "診断出力にもコマンド出力を流さない");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("run-checks: 計画の command / args / cwd を結果へ転記しない（dry-run・承認不足・実行済みの全経路）", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(join(root, "sub"), { recursive: true });
    const marker = "PLACEHOLDER_ARG_MARKER_not_a_secret";
    const planPath = writePlan(dir, {
      schemaVersion: "1.0.0",
      root,
      changes: [],
      checks: [
        { name: "approved", command: process.execPath, args: ["-e", "process.exit(0)", marker], cwd: "sub", approved: true },
        { name: "unapproved", command: process.execPath, args: ["-e", "process.exit(0)", marker] },
      ],
    });
    for (const extra of [[], ["--execute", ...approveArgs(planPath)]]) {
      const r = runCliJson("run-checks.mjs", ["--plan", planPath, ...extra]);
      assert.equal(r.stdout.includes(marker), false, `引数の値を出力しない（${extra.join(" ") || "dry-run"}）`);
      assert.equal(r.stderr.includes(marker), false);
      for (const c of r.json.checks) {
        assert.equal("args" in c || "command" in c || "cwd" in c, false, `${c.name} に計画側の値を載せない`);
      }
    }
    const executed = runCliJson("run-checks.mjs", ["--plan", planPath, "--execute", ...approveArgs(planPath)]);
    assert.equal(executed.json.checks.find((c) => c.name === "approved").status, "PASS");
    assert.equal(executed.json.checks.find((c) => c.name === "unapproved").status, "BLOCKED");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("run-checks: JSON として壊れた計画でも入力の断片を診断へ出さない", () => {
  const dir = makeTmpDir();
  try {
    const planPath = join(dir, "plan.json");
    writeFileSync(planPath, '{"checks": [{"args": ["PLACEHOLDER_BROKEN_MARKER" oops]}]}');
    const r = runCli("run-checks.mjs", ["--plan", planPath]);
    assert.equal(r.status, 1);
    assert.equal(r.stderr.includes("PLACEHOLDER_BROKEN_MARKER"), false);
    assert.equal(r.stdout.includes("PLACEHOLDER_BROKEN_MARKER"), false);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("run-checks: --execute に --approve がなければ引数エラー（exit 2）で何も起動しない", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, { schemaVersion: "1.0.0", root, changes: [], checks: [markerCheck(root, true)] });
    assert.equal(runCli("run-checks.mjs", ["--plan", planPath, "--execute"]).status, 2);
    assert.equal(runCli("run-checks.mjs", ["--plan", planPath, "--execute", "--approve", "yes"]).status, 2, "形式不正も拒否");
    assert.equal(existsSync(join(root, "MARKER.txt")), false);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("run-checks: 承認後に計画の検証コマンドを変更したら approved:true が残っていても実行しない（BLOCKED, exit 3）", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const approvedCheck = { name: "check", command: process.execPath, args: ["-e", "process.exit(0)"], approved: true };
    const planPath = writePlan(dir, { schemaVersion: "1.0.0", root, changes: [], checks: [approvedCheck] });
    const dryRun = runCliJson("run-checks.mjs", ["--plan", planPath]);
    const approval = approveArgs(planPath);
    assert.equal(dryRun.json.planDigest, approval[1], "dry-run が承認用の planDigest を示す");
    // 承認後に args を差し替える（approved:true は残したまま）
    writePlan(dir, { schemaVersion: "1.0.0", root, changes: [], checks: [{ ...markerCheck(root, true), name: "check" }] });
    const r = runCliJson("run-checks.mjs", ["--plan", planPath, "--execute", ...approval]);
    assert.equal(r.status, 3);
    assert.equal(r.json.status, "BLOCKED");
    assert.equal(r.json.checks[0].executed, false);
    assert.equal(existsSync(join(root, "MARKER.txt")), false, "変更後のコマンドは起動しない");
    assert.equal("planDigest" in r.json, false, "不一致時は再承認用の値を出さない");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("validate-plan: 承認に使う planDigest（計画ファイルの sha256）を結果に含める", () => {
  const dir = makeTmpDir();
  try {
    const root = join(dir, "proj");
    mkdirSync(root);
    const planPath = writePlan(dir, { schemaVersion: "1.0.0", root, changes: [], checks: [] });
    const r = runCliJson("validate-plan.mjs", ["--plan", planPath]);
    assert.equal(r.json.planDigest, approveArgs(planPath)[1]);
  } finally {
    cleanupTmpDir(dir);
  }
});
