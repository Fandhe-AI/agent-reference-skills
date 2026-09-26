// resolveExecutionTarget（Windows .cmd/.bat 専用処理の判定ロジック）のユニットテスト。
// 実 Windows 環境がなくても、platform を差し替えることでロジック単体を検証できる。
// 注意: ここで検証できるのは「どの実行ターゲットに委譲するかの判定」までであり、
// 実際に Windows 上で cmd.exe が起動できること自体は未検証（このリポジトリの実行環境は macOS）。
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveExecutionTarget } from "../scripts/bin/lib/exec-safe.mjs";

test("exec-safe: win32 以外では command をそのまま実行ファイルとして使う", () => {
  const t = resolveExecutionTarget("darwin", "make", ["check"]);
  assert.equal(t.file, "make");
  assert.deepEqual(t.args, ["check"]);
  assert.equal(t.viaShellWrapper, false);
});

test("exec-safe: win32 かつ .exe 等の通常実行ファイルはそのまま使う", () => {
  const t = resolveExecutionTarget("win32", "cargo.exe", ["test"]);
  assert.equal(t.file, "cargo.exe");
  assert.equal(t.viaShellWrapper, false);
});

test("exec-safe: win32 かつ .cmd は cmd.exe 経由の専用処理になる", () => {
  const t = resolveExecutionTarget("win32", "pnpm.cmd", ["run", "build"]);
  assert.equal(t.file, "cmd.exe");
  assert.equal(t.viaShellWrapper, true);
  assert.deepEqual(t.args, ["/d", "/s", "/c", "pnpm.cmd", "run", "build"]);
});

test("exec-safe: win32 かつ .bat も cmd.exe 経由の専用処理になる（大文字拡張子も検出）", () => {
  const t = resolveExecutionTarget("win32", "SETUP.BAT", []);
  assert.equal(t.file, "cmd.exe");
  assert.equal(t.viaShellWrapper, true);
});

test("exec-safe: shell:true を無条件には使わない（file が直接 cmd.exe か元コマンドのいずれかであること）", () => {
  const notCmd = resolveExecutionTarget("win32", "node", ["-e", "1"]);
  assert.equal(notCmd.file, "node");
  const isCmd = resolveExecutionTarget("win32", "run.cmd", []);
  assert.equal(isCmd.file, "cmd.exe");
});

test("exec-safe: win32 の .cmd/.bat 経由で cmd.exe メタ文字を含む引数は実行せず BLOCKED にする", async () => {
  const { runCheckCommand } = await import("../scripts/bin/lib/exec-safe.mjs");
  for (const bad of ["a&calc", "x|y", "%PATH%", "!v!", "q\"uote", "(g)", "a^b", "a>b"]) {
    const t = resolveExecutionTarget("win32", "pnpm.cmd", ["run", bad]);
    assert.ok(t.unsafeReason, `${bad} は拒否される`);
    const r = runCheckCommand({ platform: "win32", command: "pnpm.cmd", args: ["run", bad] });
    assert.equal(r.status, "BLOCKED");
    assert.equal(r.executed, false);
  }
  assert.equal(resolveExecutionTarget("win32", "pnpm.cmd", ["run", "build"]).unsafeReason, undefined);
  assert.equal(resolveExecutionTarget("darwin", "make", ["a&b"]).unsafeReason, undefined, "cmd.exe を経由しない場合は対象外");
});

test("exec-safe: win32 の .cmd/.bat 経由で空白を含む引数・空の引数は分割され得るため BLOCKED にする", () => {
  for (const bad of ["foo bar", "tab\there", ""]) {
    const t = resolveExecutionTarget("win32", "pnpm.cmd", ["run", bad]);
    assert.ok(t.unsafeReason, `${JSON.stringify(bad)} は拒否される`);
  }
});

test("exec-safe: BLOCKED の理由には引数の値ではなく位置だけを書く", () => {
  const t = resolveExecutionTarget("win32", "pnpm.cmd", ["ok", "PLACEHOLDER&MARKER"]);
  assert.ok(t.unsafeReason.includes("args[1]"));
  assert.equal(t.unsafeReason.includes("MARKER"), false);
  assert.ok(resolveExecutionTarget("win32", "my tool.cmd", []).unsafeReason.includes("command"));
});
