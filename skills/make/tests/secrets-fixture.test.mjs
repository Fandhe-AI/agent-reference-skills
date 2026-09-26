// fixtures/dummy-secrets/dot-env.fixture に置いたダミー値を .env としてコピーし、
// inspect-repo の出力・ログに秘密情報が混入しないことを固定フィクスチャ経由でも確認する
// （inspect-repo.test.mjs の動的生成版とは別に、リポジトリに残るフィクスチャでの回帰確認として維持する）。
//
// フィクスチャのファイル名をそのまま `.env` にしない理由: リポジトリの `.gitignore` は
// `.env*` を無視するため、`.env` という名前のままではフィクスチャがコミットされず、
// クローン直後・CI 上でこのテストが ENOENT で失敗する。拡張子を変えたファイルとして保持し、
// テスト実行時に一時ディレクトリへ `.env` としてコピーする。
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runCliJson, makeTmpDir, cleanupTmpDir } from "./helpers.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURE_DIR = join(HERE, "fixtures", "dummy-secrets");

test("secrets fixture: dummy .env の中身が inspect-repo の出力に含まれない", () => {
  const dummyEnvContent = readFileSync(join(FIXTURE_DIR, "dot-env.fixture"), "utf8");
  const dummyValue = dummyEnvContent.trim().split("=")[1];
  assert.ok(dummyValue && dummyValue.length > 0, "フィクスチャに値が存在すること（前提条件）");

  const dir = makeTmpDir();
  try {
    writeFileSync(join(dir, ".env"), dummyEnvContent);
    const r = runCliJson("inspect-repo.mjs", ["--root", dir]);
    assert.equal(r.status, 0);
    assert.ok(!r.stdout.includes(dummyValue), "stdout に .env の値が含まれない");
    assert.ok(!r.stderr.includes(dummyValue), "stderr に .env の値が含まれない");
    assert.ok(r.json.findings.some((f) => f.id === "secret-like-file" && f.evidence === ".env"));
  } finally {
    cleanupTmpDir(dir);
  }
});
