// テスト共通ヘルパー。scripts/bin/*.mjs を子プロセスとして起動し、stdout/stderr/exitCode を返す。
// 一時ディレクトリは os.tmpdir() 配下に作成し、各テストで確実に後始末する。
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const BIN_DIR = join(HERE, "..", "scripts", "bin");

export function runCli(scriptName, args, opts = {}) {
  const scriptPath = join(BIN_DIR, scriptName);
  const result = spawnSync(process.execPath, [scriptPath, ...args], {
    encoding: "utf8",
    timeout: opts.timeout ?? 15000,
    env: { ...process.env, ...(opts.env ?? {}) },
    ...(opts.cwd ? { cwd: opts.cwd } : {}),
  });
  return {
    status: result.status,
    signal: result.signal,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
  };
}

export function runCliJson(scriptName, args, opts = {}) {
  const r = runCli(scriptName, [...args, "--json"], opts);
  let json = null;
  try {
    json = JSON.parse(r.stdout);
  } catch {
    // json が壊れている場合は null のまま返し、呼び出し側でアサートさせる
  }
  return { ...r, json };
}

export function makeTmpDir(prefix = "make-skill-test-") {
  return mkdtempSync(join(tmpdir(), prefix));
}

export function cleanupTmpDir(dir) {
  rmSync(dir, { recursive: true, force: true });
}
