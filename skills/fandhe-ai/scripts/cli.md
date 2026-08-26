---
source: https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/main/crates/guardrail/src/cli.rs, https://raw.githubusercontent.com/Fandhe-AI/fandhe-ai/main/crates/self-repair/src/cli.rs, https://fandhe-ai.github.io/fandhe-ai/api/cli/
---

# cli

`guardrail` / `self-repair` バイナリのコマンド集。両 crate は crates.io 未公開のため、フラグ名は `crates/guardrail/src/cli.rs` / `crates/self-repair/src/cli.rs`（`std::env::args` ベースの自作パーサ、clap 不使用）と `crates/guardrail/src/main.rs` / `crates/self-repair/src/main.rs` のソースから確認した。公式ドキュメント（`/api/cli/`）には exit code とフラグの概要のみ記載され、個別コマンド例は掲載されていない。

> **Notes**: ここでの `guardrail` / `eval` は変更セットの自動適用可否判定・修正候補の評価を指し、`openai-agents` / `anthropic-prompt-eval` / `openai-evals-tuning` にある LLM の guardrail（応答フィルタリング）や eval（モデル評価）とは別物。

## guardrail check — 変更セットの自動適用可否判定

```sh
guardrail check --repo . --preset default
```

主なオプション（全て任意、ソース既定値）:

| フラグ | 既定値 | 説明 |
| --- | --- | --- |
| `--repo` | `.` | 対象リポジトリのパス |
| `--preset` | `default` | 判定プリセット名 |
| `--config` | なし | `guardrail.toml` へのパス |
| `--baseline` | `baseline` | 比較対象ベースライン |
| `--change-id` | なし | 変更セット ID |
| `--signals` | なし | 追加シグナル入力パス（`GUARDRAIL_ALLOW_INJECTED_SIGNALS=1` 環境変数がない場合は無視される） |
| `--format` | `text` | `text` または `json` |
| `--output` | なし | 結果出力先パス |

exit code:

| コード | 意味 |
| --- | --- |
| `0` | auto_apply（自動適用可） |
| `10` | escalate（人間承認へエスカレーション） |
| `20` | reject（却下） |
| `1` | 内部エラー |

## guardrail eval — ラベル付きデータセットでの一括評価

```sh
guardrail eval --dataset crates/guardrail/tests/fixtures/labeled-changes --preset default --format json
```

主なオプション（全て任意）:

| フラグ | 既定値 | 説明 |
| --- | --- | --- |
| `--dataset` | `crates/guardrail/tests/fixtures/labeled-changes` | ラベル付きデータセットのパス |
| `--repo` | `.` | 対象リポジトリのパス |
| `--preset` | `default` | 判定プリセット名 |
| `--config` | なし | `guardrail.toml` へのパス |
| `--format` | `text` | `text` または `json` |
| `--output` | なし | 結果出力先パス |

exit code: `0`（内部エラーなし）/ `1`（内部エラー）/ `30`（評価指標が閾値未達、CI fail 用）。

## self-repair run — 検出から取り込み判断までの1ループ実行

> **警告**: `self-repair run` は `--allow-candidate-exec` により信頼できない修正候補コードを**ホスト権限で**実行する。CLI が内部で作る sandbox clone はファイルシステム上の作業ツリー・index の分離のみで、プロセス・権限・ファイルシステム全体の隔離は行わない（`crates/self-repair/src/cli.rs` / `sandbox.rs` の注記）。`--isolate-network` はネットワーク namespace の分離だけで、単独では sandbox にならない。**必ず使い捨てコンテナまたは専用 VM の中で、秘密情報（`~/.ssh`、`~/.cargo/credentials.toml`、`.env` 等）を持たない一時 clone に対して実行する**。ホストの作業リポジトリ（`--repo .` を実運用ツリーで指定）や本番リポジトリでの実行は避け、ネットワーク隔離が利用できない環境では実行を中止する（CLI 自体も `unshare` の利用可否を事前 probe し、利用不可なら fail-closed で失敗する）。

```sh
# 使い捨てコンテナ / 専用 VM の中で実行する前提。ホストの作業リポジトリでは実行しない
git clone --depth 1 https://github.com/<org>/<repo>.git /tmp/self-repair-work
cd /tmp/self-repair-work

self-repair run \
  --repo . \
  --kind bug-fix \
  --log repair.jsonl \
  --candidates candidates.json \
  --bench-bin ./bench-runner \
  --workload-source workload-a \
  --isolate-network \
  --allow-candidate-exec
```

`--allow-candidate-exec` を指定しない場合、他の必須引数を満たしていても usage エラー（exit code `2`）になる。

主なオプション:

| フラグ | 必須/任意 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `--kind` | 必須 | なし | `bug-fix` または `feature-addition`（`perf-regression` は値域から除外され usage エラー） |
| `--log` | 必須 | なし | ハッシュチェーン付きログの出力先 |
| `--candidates` | 必須 | なし | 修正候補コードの入力パス |
| `--bench-bin` | 必須 | なし | ベンチマーク実行バイナリ |
| `--workload-source` | 必須（1回以上指定可） | なし | ワークロードソース識別子 |
| `--allow-candidate-exec` | 必須（フラグ） | `false` | 候補コード実行の明示承認 |
| `--repo` | 任意 | `.` | 対象リポジトリのパス |
| `--max-attempts` | 任意 | `5` | 最大試行回数 |
| `--config` | 任意 | なし | 設定ファイルパス |
| `--output` | 任意 | なし | JSON 結果の出力先 |
| `--policy-exclusion` | 任意 | なし | ポリシー除外設定パス |
| `--isolate-network` | 任意（フラグ） | `false` | 候補実行をネットワーク namespace で隔離 |

> **警告**: `--isolate-network` を指定しない場合、候補コード実行時にネットワークアクセスが隔離されない。`--allow-candidate-exec` と併用する場合は原則 `--isolate-network` も指定する。

exit code:

| コード | 意味 |
| --- | --- |
| `0` | 自動適用で完走、repo への差分反映まで成功 |
| `10` | エスカレーション |
| `20` | 却下 |
| `1` | 内部エラー・ログ書き込み失敗・repo 反映失敗 |
| `2` | usage エラー（`--allow-candidate-exec` 未指定を含む） |

## self-repair verify-log — ログのハッシュチェーン検証

```sh
self-repair verify-log --log repair.jsonl
```

主なオプション:

| フラグ | 必須/任意 | 既定値 | 説明 |
| --- | --- | --- | --- |
| `--log` | 必須 | なし | 検証対象の JSON Lines ログパス |
| `--allow-empty-log` | 任意（フラグ） | `false` | 空ログを許容する |

exit code: `0`（チェーン整合、改竄なし）/ `1`（検証不合格・内部エラー）/ `2`（usage エラー）。
