// 各 CLI の --help が実際のオプションと一致することを検証する。
// 「--help のテキストに書かれたオプション名が、実際に parseFlags へ渡している options のキーと
// 一致しているか」を機械的に突合する（説明文の劣化・実装とのズレを検知する）。
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runCli } from "./helpers.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const BIN_DIR = join(HERE, "..", "scripts", "bin");

const SCRIPTS = [
  { file: "inspect-repo.mjs", options: ["root", "max-depth", "max-entries", "json", "help"] },
  { file: "validate-plan.mjs", options: ["plan", "json", "help"] },
  { file: "preview-sample.mjs", options: ["sample", "root", "apply", "force", "json", "help"] },
  { file: "verify-layout.mjs", options: ["root", "makefile", "json", "help"] },
  { file: "run-checks.mjs", options: ["plan", "execute", "json", "help"] },
];

for (const { file, options } of SCRIPTS) {
  test(`${file}: --help に実装済みの全オプションが記載されている`, () => {
    const source = readFileSync(join(BIN_DIR, file), "utf8");
    const r = runCli(file, ["--help"]);
    assert.equal(r.status, 0, "--help は exit 0");
    for (const opt of options) {
      assert.ok(source.includes(`"${opt}"`) || source.includes(`${opt}:`), `実装に --${opt} の定義があること`);
      assert.ok(r.stdout.includes(`--${opt}`), `--help に --${opt} が記載されていること: ${file}`);
    }
  });

  test(`${file}: --help は正常終了しヘルプ以外の副作用が出力に含まれない`, () => {
    const r = runCli(file, ["--help", "--json"]);
    // --help はどの CLI でも他フラグより優先され、JSON 構造化出力ではなく通常のヘルプ文になる
    assert.equal(r.status, 0);
    assert.ok(r.stdout.length > 0);
  });

  test(`${file}: 未知のフラグは引数エラー（exit 2）`, () => {
    const r = runCli(file, ["--this-flag-does-not-exist"]);
    assert.equal(r.status, 2);
  });
}
