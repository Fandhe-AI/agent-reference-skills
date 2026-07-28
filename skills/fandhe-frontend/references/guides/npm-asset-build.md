# NPM アセットビルドパイプライン

`--ignore-scripts` を既定としたサプライチェーン対策付きの、NPM 互換（ビルド時静的アセット限定・実行時スコープ外）の静的アセット取り込みパイプライン。

## Signature / Usage

```sh
# 入口: --ignore-scripts を迂回不能に強制してインストール + npm audit
install.sh --dir <project-dir> [<package-spec>...] \
           [--no-audit] [--audit-level <low|moderate|high|critical>] \
           [--no-check] [--allowlist <path>]

# 後段ゲート: 静的アセット限定を機械検証（install.sh から自動連携で起動）
check_static_only.py (--node-modules <path> | --dir <project-dir>) \
                      [--allowlist <allowlist.toml>] [--suggest-exempt]

# allowlist 半自動追記（人間レビュー後）
apply_exempt.py --suggestions <reviewed.toml> --allowlist <allowlist.toml> [--dry-run]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--dir <project-dir>` | install.sh option | 必須。`package.json` が存在するディレクトリ |
| `--no-audit` | install.sh option | install/ci 成功後の `npm audit` ステップをスキップ（警告出力。オフライン向け） |
| `--audit-level <level>` | install.sh option | `npm audit` のしきい値。`low`/`moderate`/`high`/`critical` の完全一致のみ受理（既定 `high`） |
| `--no-check` | install.sh option | 自動連携された `check_static_only.py` をスキップ（警告出力） |
| `--allowlist <path>` | install.sh option | `check_static_only.py` に渡す allowlist.toml を明示指定 |
| `--suggest-exempt` | check_static_only.py option | 違反検出時に `allowlist.toml` の `[[exempt]]` 雛形を stdout へ出力（自動書き込みはしない） |
| `--dry-run` | apply_exempt.py option | 検証・適用予定の内容を出力するのみでファイルは変更しない |

## Notes

- パイプライン全体像: `install.sh`（`npm install`/`ci --ignore-scripts --no-audit`）→ `npm audit`（既定有効）→ `check_static_only.py`（後段ゲート、install.sh から自動起動）→ 配布物への取り込み
- `install.sh` は `--ignore-scripts` をフラグと `npm_config_ignore_scripts=true` 環境変数の二重で強制し、`--ignore-scripts=false` 等の迂回フラグ・未知フラグを拒否する
- `check_static_only.py` は allowlist 方式（既定拒否）で実行可能コード（`.js`/`.mjs`/`.cjs`/`.node`/`.wasm` 等）・実行ビット・shebang・lifecycle スクリプトの混入を検出する。終了コード契約: `0`=全合格 / `1`=違反あり / `2`=実行エラー
- allowlist 解決順は `--allowlist <path>` 明示 → `<project-dir>/allowlist.toml` → 標準雛形 `tools/npm-asset-build/allowlist.toml` の 2 段のみ（それ以上の暗黙探索はしない）
- `allowlist.toml` はパッケージ + ルール単位の免除機構。ワイルドカード不可・`reason` 必須という fail-closed な設計
- `apply_exempt.py` は `--suggest-exempt` が出力した雛形を人間がレビュー・編集して保存したファイルのみ受理し、allowlist.toml へ半自動追記する（`check_static_only.py`/`install.sh` からは呼び出されない）
- 2 層防御の限界: `install.sh`（`--ignore-scripts`）はインストール時暗黙実行を防ぐが、パッケージ内の明示的な `require()` 呼び出しは防がない。`npm audit` は既知 advisory のみ検出し未知・0-day は検出できない
- `templates/default/tools/npm-asset-build/` に正本 4 ファイル（`install.sh`/`check_static_only.py`/`apply_exempt.py`/`allowlist.toml`）がバイト同一でコピー同梱されており、ドリフトは CI で機械検証される

## Related

- [クイックスタート](../getting-started/quickstart.md)
