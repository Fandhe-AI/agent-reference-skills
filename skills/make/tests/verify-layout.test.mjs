import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, mkdirSync, symlinkSync } from "node:fs";
import { join } from "node:path";
import { runCli, runCliJson, makeTmpDir, cleanupTmpDir } from "./helpers.mjs";

test("verify-layout: --root なしは引数エラー（exit 2）", () => {
  const r = runCli("verify-layout.mjs", []);
  assert.equal(r.status, 2);
});

test("verify-layout: Makefile が無い場合は NOT_APPLICABLE（exit 0）", () => {
  const dir = makeTmpDir();
  try {
    const r = runCliJson("verify-layout.mjs", ["--root", dir]);
    assert.equal(r.status, 0);
    assert.equal(r.json.status, "NOT_APPLICABLE");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("verify-layout: Makefile が無い場合でも --json なしでは JSON を stdout に出さない（出力形式は --json のみに依存する）", () => {
  const dir = makeTmpDir();
  try {
    const rHuman = runCli("verify-layout.mjs", ["--root", dir]);
    assert.equal(rHuman.status, 0);
    assert.throws(() => JSON.parse(rHuman.stdout), "human 出力は JSON としてパースできないこと");
    assert.ok(rHuman.stdout.includes("verify-layout:"), "人間向けサマリーの先頭ラベルを含むこと");

    const rJson = runCliJson("verify-layout.mjs", ["--root", dir]);
    assert.equal(rJson.status, 0);
    assert.ok(rJson.json, "--json 指定時は JSON としてパースできること");
    assert.equal(rJson.json.status, "NOT_APPLICABLE");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("verify-layout: help エントリと実在 target が一致すれば PASS", () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(
      join(dir, "Makefile"),
      [".PHONY: help check", "help: ## show help", "\t@echo help", "check: ## run checks", "\t@echo ok", ""].join("\n"),
    );
    const r = runCliJson("verify-layout.mjs", ["--root", dir]);
    assert.equal(r.status, 0);
    assert.equal(r.json.status, "PASS");
  } finally {
    cleanupTmpDir(dir);
  }
});

test("verify-layout: help エントリの target がすべて実在すれば target 数と help 数が一致する", () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(
      join(dir, "Makefile"),
      [".PHONY: a b", "a: ## a target", "\t@echo a", "b: a ## b target (depends on a)", "\t@echo b", ""].join("\n"),
    );
    const r = runCliJson("verify-layout.mjs", ["--root", dir]);
    assert.equal(r.status, 0);
    assert.equal(r.json.helpEntryCount, 2);
    assert.equal(r.json.findings.filter((f) => f.id.startsWith("help:") && f.status === "PASS").length, 2);
  } finally {
    cleanupTmpDir(dir);
  }
});

test("verify-layout: Skill 自身の設置パスへの依存を検出する", () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(
      join(dir, "Makefile"),
      [
        ".PHONY: check",
        "check: ## run checks",
        "\t@node skills/make/scripts/bin/run-checks.mjs --plan plan.json",
        "",
      ].join("\n"),
    );
    const r = runCliJson("verify-layout.mjs", ["--root", dir]);
    assert.equal(r.status, 1);
    assert.ok(r.json.findings.some((f) => f.id === "skill-path-dependency" && f.status === "FAIL"));
  } finally {
    cleanupTmpDir(dir);
  }
});

test("verify-layout: ファイル成果物ターゲット（.PHONY 非列挙）だけの正常な Makefile は全体 PASS のままになる", () => {
  const dir = makeTmpDir();
  try {
    // build はファイル成果物ターゲットなので意図的に .PHONY に含めない（正しい書き方）。
    // これが .PHONY 注記の混入で全体 status を SKIPPED に丸めてしまわないことを確認する。
    writeFileSync(
      join(dir, "Makefile"),
      [".PHONY: help", "help: ## show help", "\t@echo help", "build: src/main.o ## build artifact", "\t@echo build", ""].join(
        "\n",
      ),
    );
    const r = runCliJson("verify-layout.mjs", ["--root", dir]);
    assert.equal(r.json.status, "PASS", "ファイル成果物ターゲットの非 .PHONY は FAIL/SKIPPED に丸めない");
    assert.equal(r.status, 0);
    assert.ok(r.json.unresolved.some((u) => u.includes(".PHONY") && u.includes("build")));
  } finally {
    cleanupTmpDir(dir);
  }
});

test("verify-layout: recipe 内部の shell 解析は未確認として明示する", () => {
  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, "Makefile"), [".PHONY: check", "check: ## run checks", "\t@echo ok", ""].join("\n"));
    const r = runCliJson("verify-layout.mjs", ["--root", dir]);
    assert.ok(r.json.unresolved.some((u) => u.includes("shell")));
  } finally {
    cleanupTmpDir(dir);
  }
});

test("verify-layout: --makefile で root 外（`..`・絶対パス・symlink）を指す値は引数エラー（exit 2）", () => {
  const parent = makeTmpDir();
  try {
    const root = join(parent, "proj");
    mkdirSync(root);
    writeFileSync(join(parent, "Makefile"), "all: ## outside\n\t@true\n");
    symlinkSync(join(parent, "Makefile"), join(root, "Linked.mk"));
    for (const bad of ["../Makefile", join(parent, "Makefile"), "Linked.mk"]) {
      const r = runCli("verify-layout.mjs", ["--root", root, "--makefile", bad, "--json"]);
      assert.equal(r.status, 2, `--makefile ${bad} は拒否される`);
      assert.equal(r.stdout, "", "引数エラー時は stdout に JSON を出さない");
    }
  } finally {
    cleanupTmpDir(parent);
  }
});
