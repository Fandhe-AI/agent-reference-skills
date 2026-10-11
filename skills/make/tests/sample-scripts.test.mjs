// samples/projects の Node 製補助スクリプト（scripts/clean.mjs・scripts/build.mjs）の回帰テスト。
// pnpm / cargo / ネットワークを要求しないよう、スクリプトだけを一時ディレクトリの疑似サンプルへ
// 複製して node で直接起動する（clean.mjs はサンプル root を自身の設置位置から導くため、複製先の
// 親ディレクトリがそのままサンプル root になる）。
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { BIN_DIR, makeTmpDir, cleanupTmpDir } from "./helpers.mjs";

const PROJECTS_DIR = join(BIN_DIR, "..", "..", "samples", "projects");
const NODE_SAMPLES = ["node-pnpm", "mixed"];

function runNode(script, args = [], cwd = undefined) {
  const r = spawnSync(process.execPath, [script, ...args], { encoding: "utf8", timeout: 15000, ...(cwd ? { cwd } : {}) });
  return { status: r.status, stdout: r.stdout ?? "", stderr: r.stderr ?? "" };
}

// 一時ディレクトリに <tmp>/sample/scripts/<name> を複製し、サンプル root（<tmp>/sample）を返す
function stageScript(tmp, sample, name) {
  const root = join(tmp, "sample");
  mkdirSync(join(root, "scripts"), { recursive: true });
  copyFileSync(join(PROJECTS_DIR, sample, "scripts", name), join(root, "scripts", name));
  return root;
}

function touch(path) {
  mkdirSync(join(path, ".."), { recursive: true });
  writeFileSync(path, "x\n");
}

for (const sample of NODE_SAMPLES) {
  test(`${sample}/scripts/clean.mjs: 再生成可能なパスだけを削除し src は残す`, () => {
    const tmp = makeTmpDir();
    try {
      const root = stageScript(tmp, sample, "clean.mjs");
      touch(join(root, "node_modules", "dep", "index.js"));
      touch(join(root, "packages", "core", "dist", "index.mjs"));
      touch(join(root, "packages", "core", "node_modules", "x", "index.js"));
      touch(join(root, "packages", "core", "src", "index.mjs"));
      const r = runNode(join(root, "scripts", "clean.mjs"), [], tmp);
      assert.equal(r.status, 0, r.stderr);
      assert.equal(existsSync(join(root, "node_modules")), false);
      assert.equal(existsSync(join(root, "packages", "core", "dist")), false);
      assert.equal(existsSync(join(root, "packages", "core", "node_modules")), false);
      assert.equal(existsSync(join(root, "packages", "core", "src", "index.mjs")), true, "src は削除しない");
    } finally {
      cleanupTmpDir(tmp);
    }
  });

  test(`${sample}/scripts/clean.mjs: packages/<name> が root 外への symlink なら全体を中止し何も削除しない`, () => {
    const tmp = makeTmpDir();
    try {
      const root = stageScript(tmp, sample, "clean.mjs");
      const outside = join(tmp, "other-checkout");
      touch(join(outside, "dist", "keep.mjs"));
      touch(join(outside, "node_modules", "keep.js"));
      touch(join(root, "node_modules", "dep", "index.js"));
      touch(join(root, "packages", "core", "dist", "index.mjs"));
      symlinkSync(outside, join(root, "packages", "linked"), "dir");
      const r = runNode(join(root, "scripts", "clean.mjs"));
      assert.equal(r.status, 1, `stdout=${r.stdout} stderr=${r.stderr}`);
      assert.match(r.stderr, /packages\/linked is a symlink/);
      assert.equal(existsSync(join(outside, "dist", "keep.mjs")), true, "リンク先の dist を削除しない");
      assert.equal(existsSync(join(outside, "node_modules", "keep.js")), true, "リンク先の node_modules を削除しない");
      // 逸脱が 1 件でもあれば正当な対象も含めて何も削除しない（一部だけ消した状態を残さない）
      assert.equal(existsSync(join(root, "node_modules", "dep", "index.js")), true);
      assert.equal(existsSync(join(root, "packages", "core", "dist", "index.mjs")), true);
    } finally {
      cleanupTmpDir(tmp);
    }
  });

  test(`${sample}/scripts/clean.mjs: packages 自体や削除対象自体が symlink でも中止する`, () => {
    const tmp = makeTmpDir();
    try {
      const root = stageScript(tmp, sample, "clean.mjs");
      const outside = join(tmp, "elsewhere");
      touch(join(outside, "core", "dist", "keep.mjs"));
      symlinkSync(outside, join(root, "packages"), "dir");
      const r1 = runNode(join(root, "scripts", "clean.mjs"));
      assert.equal(r1.status, 1, r1.stderr);
      assert.equal(existsSync(join(outside, "core", "dist", "keep.mjs")), true);

      unlinkSync(join(root, "packages"));
      mkdirSync(join(root, "packages", "core"), { recursive: true });
      symlinkSync(join(outside, "core", "dist"), join(root, "packages", "core", "dist"), "dir");
      const r2 = runNode(join(root, "scripts", "clean.mjs"));
      assert.equal(r2.status, 1, r2.stderr);
      assert.equal(existsSync(join(outside, "core", "dist", "keep.mjs")), true);
    } finally {
      cleanupTmpDir(tmp);
    }
  });

  test(`${sample}/scripts/clean.mjs: 引数は受け付けない（exit 2）`, () => {
    const tmp = makeTmpDir();
    try {
      const root = stageScript(tmp, sample, "clean.mjs");
      touch(join(root, "node_modules", "dep", "index.js"));
      const r = runNode(join(root, "scripts", "clean.mjs"), ["packages"]);
      assert.equal(r.status, 2);
      assert.equal(existsSync(join(root, "node_modules", "dep", "index.js")), true);
    } finally {
      cleanupTmpDir(tmp);
    }
  });

  test(`${sample}/scripts/build.mjs: 削除したソースの古い成果物を dist に残さない`, () => {
    const tmp = makeTmpDir();
    try {
      const root = stageScript(tmp, sample, "build.mjs");
      const pkg = join(root, "packages", "core");
      touch(join(pkg, "src", "index.mjs"));
      touch(join(pkg, "src", "old.mjs"));
      assert.equal(runNode(join(root, "scripts", "build.mjs"), [pkg]).status, 0);
      assert.equal(existsSync(join(pkg, "dist", "old.mjs")), true);
      rmSync(join(pkg, "src", "old.mjs"));
      const r = runNode(join(root, "scripts", "build.mjs"), [pkg]);
      assert.equal(r.status, 0, r.stderr);
      assert.equal(existsSync(join(pkg, "dist", "old.mjs")), false, "削除済みソースの成果物が残らない");
      assert.equal(existsSync(join(pkg, "dist", "index.mjs")), true);
    } finally {
      cleanupTmpDir(tmp);
    }
  });

  test(`${sample}/scripts/build.mjs: root 外への symlink の package では dist を削除せず拒否する`, () => {
    const tmp = makeTmpDir();
    try {
      const root = stageScript(tmp, sample, "build.mjs");
      const outside = join(tmp, "other-checkout");
      touch(join(outside, "src", "index.mjs"));
      touch(join(outside, "dist", "keep.mjs"));
      mkdirSync(join(root, "packages"), { recursive: true });
      symlinkSync(outside, join(root, "packages", "linked"), "dir");
      const r = runNode(join(root, "scripts", "build.mjs"), [join(root, "packages", "linked")]);
      assert.equal(r.status, 2, r.stderr);
      assert.equal(existsSync(join(outside, "dist", "keep.mjs")), true, "リンク先の dist を削除しない");
    } finally {
      cleanupTmpDir(tmp);
    }
  });

  test(`${sample}/scripts/build.mjs: symlink の dist は置き換えずに拒否する`, () => {
    const tmp = makeTmpDir();
    try {
      const root = stageScript(tmp, sample, "build.mjs");
      const pkg = join(root, "packages", "core");
      touch(join(pkg, "src", "index.mjs"));
      const outside = join(tmp, "outside-dist");
      touch(join(outside, "keep.mjs"));
      symlinkSync(outside, join(pkg, "dist"), "dir");
      const r = runNode(join(root, "scripts", "build.mjs"), [pkg]);
      assert.equal(r.status, 2);
      assert.equal(existsSync(join(outside, "keep.mjs")), true);
    } finally {
      cleanupTmpDir(tmp);
    }
  });
}

test("mixed/scripts/clean.mjs: target/ が symlink なら（cargo clean の前に）全体を中止する", () => {
  const tmp = makeTmpDir();
  try {
    const root = stageScript(tmp, "mixed", "clean.mjs");
    const shared = join(tmp, "shared-target");
    touch(join(shared, "debug", "keep"));
    touch(join(root, "node_modules", "dep", "index.js"));
    symlinkSync(shared, join(root, "target"), "dir");
    const r = runNode(join(root, "scripts", "clean.mjs"));
    assert.equal(r.status, 1, r.stderr);
    assert.match(r.stderr, /target is a symlink/);
    assert.equal(existsSync(join(root, "node_modules", "dep", "index.js")), true);
    assert.equal(existsSync(join(shared, "debug", "keep")), true);
  } finally {
    cleanupTmpDir(tmp);
  }
});

test("node-pnpm: turbo:check はルートの lint を実行し、共有 build script をキャッシュ入力に含める", () => {
  const pkg = JSON.parse(readFileSync(join(PROJECTS_DIR, "node-pnpm", "package.json"), "utf8"));
  // lint はルートにしかないため、turbo run lint ではどの package にも一致せず実行されない
  assert.match(pkg.scripts["turbo:check"], /^pnpm run lint && turbo run test$/);
  const turbo = JSON.parse(readFileSync(join(PROJECTS_DIR, "node-pnpm", "turbo.json"), "utf8"));
  assert.ok(turbo.globalDependencies?.includes("scripts/build.mjs"));
});
