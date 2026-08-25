---
source: https://raw.githubusercontent.com/Fandhe-AI/rust-ai-library/main/crates/self-repair/src/cli.rs, https://raw.githubusercontent.com/Fandhe-AI/rust-ai-library/main/docs/guardrail-self-repair-cli.md
---

# self-repair CLI

検出（detection）→修正候補の検証（verification）→取り込み判断（adoption）までの 1 ループを実行する CLI。`guardrail` をライブラリとして呼び出し（サブプロセスではない）、`guardrail::decision::decide` を判定の唯一の経路とする。

## Signature / Usage

```bash
self-repair run \
  --kind bug-fix \
  --log repair.jsonl \
  --candidates candidates.json \
  --bench-bin my-bench \
  --workload-source benches/workload.rs \
  --allow-candidate-exec

self-repair verify-log --log repair.jsonl
```

## Options / Props

### `self-repair run`

| Name | Type / Default | Description |
| --- | --- | --- |
| `--kind <bug-fix\|feature-addition>` | 必須 | 修復カテゴリ。この 2 値のみ受理。`perf-regression` は `RepairKind` 型には存在するが CLI では受理せず usage error（exit `2`）で拒否される |
| `--repo <path>` | `.` | 対象リポジトリルート。ループは隔離された sandbox 上で実行し、`Adopted` 判定のみ `--repo` へ反映される |
| `--max-attempts <N>` | `5`（`NonZeroU32`） | 修復試行回数の上限 |
| `--log <path>` | 必須 | JSON Lines ログの出力先。append モードで、末尾状態を読んで再開する |
| `--config <guardrail.toml>` | 省略可 | 判定しきい値（guardrail と共有） |
| `--output <path>` | 省略可 | `LoopReport` / `LoopFailure` JSON の書き込み先。未指定時は要約をテキストで stdout に出力 |
| `--candidates <path>` | 必須 | 事前生成済み修正候補（JSON 配列） |
| `--bench-bin <name>` | 必須 | 候補の bench 計測に使うワークロードバイナリ名 |
| `--workload-source <path>` | 必須（1 個以上、複数指定可） | gaming 防止のため固定するワークロードソースパス（リポジトリ相対） |
| `--policy-exclusion <path>` | 省略可（既定: sandbox root） | 除外ルールファイル |
| `--allow-candidate-exec` | 必須フラグ（既定 `false`） | 候補コードをホスト権限で実行することへの明示的承認。省略時は usage error（exit `2`） |
| `--isolate-network` | 省略可フラグ（既定 `false`） | `unshare --user --map-current-user --net` によるネットワーク名前空間分離を適用。事前に利用可否を probe し、利用不可なら fail-closed で失敗 |

### `self-repair verify-log`

| Name | Type / Default | Description |
| --- | --- | --- |
| `--log <path>` | 必須 | 検証対象のログファイル |
| `--allow-empty-log` | 省略可フラグ（既定 `false`） | 0 レコードのログを許容する。省略時は空ログで exit code `1` |

### Exit code

`self-repair run`（guardrail の 3 分岐判定と整合）:

| Exit Code | 意味 |
| --- | --- |
| `0` | auto_apply が完了し、かつ diff が `--repo` へ反映成功 |
| `10` | escalate（人手承認待ち） |
| `20` | reject |
| `1` | `LoopFailure`、sandbox ビルドエラー、`--log` 書き込み失敗、`--output` 書き込み失敗（`--log` 成功時）、diff 反映失敗、`Exhausted` / `NoActionNeeded` |
| `2` | usage error（`--kind` 欠落・不正値、`--log` 欠落、`--max-attempts 0`、未知フラグ） |

`self-repair verify-log`:

| Exit Code | 意味 |
| --- | --- |
| `0` | ハッシュチェーン有効（改ざんなし）。レコード数・最終 seq・最終ハッシュを出力 |
| `1` | チェーン違反・I/O エラー・パース失敗、または `--allow-empty-log` なしの空ログ |
| `2` | usage error（`--log` 欠落・未知フラグ） |

## Notes

- ここでの guardrail 連携は CI changeset 判定であり、`openai-agents` / `anthropic-prompt-eval` の LLM 出力 guardrail とは別物（詳細は `guardrail.md` の Notes を参照）
- `--log` / `--output` 書き込み失敗時: `--log` が主記録のため、`--log` 書き込み成功時のみ diff 反映へ進む。`--log` 成功後に `--output` のみ失敗した場合も diff は反映されるが exit code は `1` を返す
- `Adopted` diff 反映失敗時: `--repo` に対する `git apply --check` が失敗した場合、`--repo` は変更せず exit `1` を返し、`--log` / `--output` はそのまま保持、sandbox も保持される
- 候補コード実行の多層防御（`crates/self-repair/src/isolation.rs`）: 環境変数スクラビング（既定 on、`PATH` / `CARGO_HOME` / `RUSTUP_HOME` / `TERM` / `LANG` / `LC_ALL` のみ allowlist）、`HOME` / `TMPDIR` の sandbox 外部リダイレクト（既定 on）、`--isolate-network` によるネットワーク隔離（opt-in）。sandbox clone 自体はファイルシステム上の作業ツリー分離のみで、プロセス・権限・ネットワークは隔離しない
- `policy-exclusion.toml` は sandbox 初期化時に一度だけ不変ロードされ、候補コードが `policy-exclusion.toml` / `guardrail.toml` を変更対象に含む場合は適用前に拒否される（判定バイパス防止）
- JSON Lines ログは 1 レコード 1 行・UTF-8・末尾改行・append-only。フィールドは `seq` / `recorded_at_unix_ms` / `stage` / `payload` / `prev_hash` / `hash`。ステージは `loop_start → detection → attempt ×n → loop_outcome`（成功時）または `attempt ×n → loop_failure`（失敗時）で SHA-256 ハッシュチェーンにより改ざん検出する
- `--log` の値自体は UTF-8 検証されない（`std::env::args_os()` を使用し非 UTF-8 パスでもパニックしない）。UTF-8 検証はサブコマンド名・フラグ名のみに限定される
- 引数パーサは clap ではなく自前実装（依存ポリシー上、subcommand・flag の解析に外部クレートを使わない方針）

## Related

- [guardrail](./guardrail.md)
- [config](./config.md)
