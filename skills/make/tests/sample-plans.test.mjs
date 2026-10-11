// samples/plans/*.json が validate-plan.mjs のスキーマに適合することを保証する回帰テスト。
// 各サンプルは root に "<TARGET_ROOT>" というプレースホルダを持つため、オリジナルのままでは
// 常に FAIL する（意図どおり）。一時ディレクトリへ root を差し替えたコピーを作り、
// modify 対象のダミーファイルを用意した上で PASS になることを確認する。
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { runCliJson, makeTmpDir, cleanupTmpDir } from "./helpers.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const PLANS_DIR = join(HERE, "..", "samples", "plans");

const SAMPLE_PLANS = ["rust-crate-thin-makefile.json", "mixed-repo-verify-delegation.json"];

for (const sampleName of SAMPLE_PLANS) {
  test(`sample plan ${sampleName}: root プレースホルダのままでは FAIL（意図どおり）`, () => {
    const planPath = join(PLANS_DIR, sampleName);
    const r = runCliJson("validate-plan.mjs", ["--plan", planPath]);
    assert.equal(r.status, 1);
    assert.equal(r.json.status, "FAIL");
    assert.ok(
      r.json.findings.some((f) => f.id === "root" && f.status === "FAIL"),
      `root プレースホルダにより root FAIL を検出すること: ${JSON.stringify(r.json.findings)}`,
    );
  });

  test(`sample plan ${sampleName}: root を実在ディレクトリに差し替えると PASS になる`, () => {
    const tmp = makeTmpDir();
    try {
      const planPath = join(PLANS_DIR, sampleName);
      const plan = JSON.parse(readFileSync(planPath, "utf8"));

      // modify 対象は元ファイルが存在する前提のため、一時 root 配下にダミーとして作成する。
      // create 対象は作らない（作ってしまうと "既存ファイルがある" 衝突で FAIL になる）。
      for (const change of plan.changes) {
        if (change.action === "modify") {
          const full = join(tmp, change.path);
          mkdirSync(dirname(full), { recursive: true });
          writeFileSync(full, "dummy content for regression test\n");
        }
      }

      plan.root = tmp;
      if (plan.target && typeof plan.target === "object") {
        plan.target.root = tmp;
      }

      const tmpPlanPath = join(tmp, "plan.json");
      writeFileSync(tmpPlanPath, JSON.stringify(plan, null, 2));

      const r = runCliJson("validate-plan.mjs", ["--plan", tmpPlanPath]);
      assert.equal(r.status, 0, `stdout=${JSON.stringify(r.json)} stderr=${r.stderr}`);
      assert.equal(r.json.status, "PASS");
    } finally {
      cleanupTmpDir(tmp);
    }
  });
}

test("sample plan mixed-repo-verify-delegation.json: 移行手順は兄弟 prerequisite ではなく依存鎖で Rust→JS の順序を保証する", () => {
  const plan = JSON.parse(readFileSync(join(PLANS_DIR, "mixed-repo-verify-delegation.json"), "utf8"));
  const step = plan.migrationSteps.find((s) => s.order === 2);
  // verify: rust-verify js-verify は make -j で並行実行され得るため、依存辺を明示していること
  assert.match(step.action, /`js-verify: rust-verify`/);
  assert.match(step.action, /`verify: js-verify`/);
  assert.doesNotMatch(step.action, /^Add `verify: rust-verify js-verify`/);
});
