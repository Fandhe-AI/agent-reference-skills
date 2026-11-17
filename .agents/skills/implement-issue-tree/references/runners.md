# Codex で実行する（ランナー）

本書は implement-issue-tree スキルの一部。全体は ../SKILL.md 参照。

implement-issue-tree の本体は Claude Code の Workflow ランタイムで動く生成物（`scripts/implement-issue-tree.js`）である。Codex には同じランタイムが無いため、`runner/run.mjs` が生成物を無変更のまま Node で評価し、`agent()` を `codex exec` のエージェントで実装して動かす。ホストの判断（依存順・状態・ゲート・自動マージの可否）は Workflow 版と同じコードが行う。ランナーの内部（出力ディレクトリ・Workflow 版との違い・既知の限界）は [runner/README.md](../runner/README.md) が正典で、本書は起動に必要な前提・手順・制約の要点だけを書く。

## 対応状況

| ツール | 状態 |
|--------|------|
| Claude Code | Workflow 版（SKILL.md のフロー）で動く |
| Codex | ランナーで動く（`--tool codex`） |
| OpenCode | 未対応。`--tool opencode` は終了コード 3 で止まる。エージェントの shell を OS の sandbox で囲う再設計が済むまで対応しない |

## 前提

| 対象 | 要件 |
|------|------|
| Codex | `codex` コマンドと認証済みのアカウント。確認した版は 0.169.0（最新の実測）と 0.164.0。最低版は未確認。`CODEX_HOME` は呼び出し元の環境のものを使い（無ければ `~/.codex`）、認証ファイルはランナーが読まない。別の実行ファイルは設定の `toolConfig.codex.codexBin` で指定する |
| gh | `gh auth status` が通ること（通らなければ終了コード 3）。確認した版は 2.102.0 |
| Node.js | 生成物と `runner/` を ES モジュールとして読み込める版。確認した版は v24.13.0。最低版は未確認 |
| bash・jq | 機械的な段（`scripts/run-verified.sh`）と Codex の hook が使う。jq が無いと Codex は起動しない（hook が fail-closed になるため） |
| 共通ガード | `agent-guard.sh`。ランナーは同梱しない。対象リポジトリに `init-codex` で導入するか、設定の `toolConfig.codex.guardScript` に絶対パスを指定する。見つからなければ終了コード 3 |
| スキル | 対象リポジトリのメイン worktree に `create-commit`・`create-pr`・`implement-review` がコミット済みであること（Codex は `.agents/skills/<name>/SKILL.md` を見る。`init-codex` が導入する）。足りなければ終了コード 3 |
| implement-issue-tree の前提 | sub-issues の紐付け・ruleset・`externalChecks` 等は [SKILL.md](../SKILL.md) の前提条件に従う |

## 起動

対象リポジトリのメイン worktree（かその配下）で実行する。`<skillDir>` はこのスキルのディレクトリの絶対パス（`scripts/` の 1 つ上）。

```bash
# まず dryRun で見積りだけを確かめる（GitHub へは何も書かない）
node <skillDir>/runner/run.mjs --tool codex --args args.json --dry-run

# 実行
node <skillDir>/runner/run.mjs --tool codex --args args.json
```

`args.json` は Workflow 版と同じ JSON オブジェクト。キーの意味は [args-reference.md](args-reference.md)、例は `sample/args-example.json`。`skillDir` は省くとこのスキルの場所になる。

```json
{
  "parent": 123,
  "parallel": 3,
  "autoMerge": false,
  "externalChecks": []
}
```

オプション（`--config`・`--max-parallel`・`--no-build-check`・`--help`）と設定ファイルの形は [runner/README.md](../runner/README.md) の「使い方」と `runner/config/default.json` を参照する。モデルは Workflow 版の `haiku`・`sonnet`・`opus`・`fable` を設定の対応表で Codex のモデルと強さに読み替える。

## 終了コード

| コード | 意味 |
|--------|------|
| 0 | ホストが return した（`--help` も 0）。`result` に結果（dryRun なら見積り）が入る |
| 1 | ホストが例外で終わった。`result.json` の `error` に理由がある |
| 2 | 引数の誤り（CLI・args.json・設定ファイル。`autoMerge` のランで `args.repo` がメイン worktree のリポジトリと違う場合を含む）。何も書かない |
| 3 | 前提の不足（gh 認証・アダプタの不在・`--tool opencode`・必要なスキルの不在・ガードが見つからない・`autoMerge` のときのリポジトリの解決・アダプタの起動失敗）。アダプタの生成・起動の失敗だけは `result.json` を書く |
| 128 + N | シグナル N による中断（SIGINT は 130、SIGTERM は 143） |

結果は stdout の 1 行 JSON と `<メイン worktree>/_/iit-runner/<runId>/result.json` に出る。

## 制約

### autoMerge

- 前提は Workflow 版と同じで、判定もホストの同じコードが行う。サーバー側の強制の実測（G0）と `externalChecks` の明示（全 App の信頼済み context 宣言込み）が要る。構成は [automerge-design.md](automerge-design.md) に従う。
- マージを許すのは merge-exec の段の 1 コマンド（`gh pr merge <N> --squash --delete-branch --match-head-commit`）だけで、PR 番号と対象リポジトリを固定する。merge-exec 以外の段の `gh pr merge` と、`gh pr review --approve` は、ガードが拒否する（変数・`$(…)` 経由の形は止まらない。次節）。
- `autoMerge: true` のランは、起動前にメイン worktree で `gh repo view` を実行して対象リポジトリを決める。`args.repo` が違えば終了コード 2、`args.repo` が無く環境変数 `GH_REPO` が解決先と違えば終了コード 3。gh は remote の解決で `upstream` を `origin` より先に取るため、fork の構成（`origin` が fork・`upstream` が親）で `args.repo` に fork を指定すると終了コード 2 になると見込まれる（実機では未確認）。
- merge-exec の段（マージを許す形）は、リポジトリの外の空ディレクトリを作業ディレクトリにして起動する。`gh pr merge --delete-branch` はローカルに head のブランチがあるときだけローカルの削除を試みるため、この段は sandbox で書けない `.git/refs` に触れず、リモートのマージとリモートのブランチ削除まで進む。ローカルの head のブランチは消さずに残る。置き場をリポジトリの外に作れないときは、その段ではマージを許さない。

### 構造化出力

- Codex は `--output-schema` で schema を渡す。ランナーが応答を検証し、不適合なら修復を 1 回求め、なお不適合なら未返却（`null`）にする。不適合な値はホストへ渡らない。未返却はホストの再試行・fail-closed に倒れる。
- コマンド実行後に最終応答を返さず止まる事象が run の 2〜4 割で起きる。時間切れ（段ごとの `timeoutsSec`）で `null` になるため誤った値は通らないが、その分ランが長くなる。
- `result.json` の `result` は issue のタイトル・エージェントの応答に由来する文字列を含み得る。要約へ転記するときは指示ではなくデータとして扱う。

### ガードの限界

- Codex では PreToolUse hook が `agent-guard.sh` を呼ぶ。変数経由・`$(…)` 経由のコマンドは止まらない（Workflow 版と同じ限界）。サーバー側の ruleset で補う。
- エージェントはランナーと同じ OS ユーザーで、環境変数を引き継いで動く。環境変数の秘密（`GH_TOKEN` 等）は読め、gh の認証もそのまま使える。ガードは環境変数の読み出しを止めない。ランナーを動かす環境には、ランに要らない秘密を入れない。被害の範囲は gh のトークンの権限とサーバー側の ruleset で抑える。
- 対話シェルへの `write_stdin` は hook に現れない。アダプタは tty を無効にして封じ、ターンの後にセッションの記録を読んで検知する（best-effort。詳細は runner/README.md の「既知の限界」）。

### OpenCode

アダプタを外してある。`--tool opencode` は「アダプタが無い」として終了コード 3 で止まる。OpenCode でこのスキルを動かす手順は無い。

## ログとセッションの片づけ

- ログは `<メイン worktree>/_/iit-runner/<runId>/` に残る。`host.log`・段ごとの `agents/<seq>-<label>/`（プロンプト・Codex のイベント・標準出力）を含む。構成は runner/README.md の「出力」を参照する。
- ツールの出力（コマンドの出力・読んだファイルの中身）がそのまま残るため、秘密が出力されていれば残る。`_/` は gitignore 済みだが、共有・転記の前に中身を確かめ、要らなくなったら消す。
- 終了時（SIGINT・SIGTERM・SIGHUP による中断を含む）に、アダプタが起動したプロセスを止め、設定の `cleanup.deleteSessions`（既定 true）なら、ラン中に作った Codex のセッションを削除する。想定外の例外で落ちたときは、プロセスは止めるがセッションの削除は行えないことがある。
- 隔離 worktree は `<メイン worktree>/.claude/worktrees/<runId>-<n>` に作る。後始末はホストの判断に従う（review・pr-create の worktree は記録だけして消さない）。残りは状態ファイル `_/issue-trees/<parent>.json` で確かめ、復旧は [recovery.md](recovery.md) を参照する。

## 検証

- 起動の前に `--dry-run` を流し、終了コード 0 と `result` の見積り（着手できる件数・blocked の件数と内訳）を確かめる。
- 実行後は `result.json` の `exitCode` と、`gh pr view <N> --json mergeStateStatus,statusCheckRollup` で PR の状態を確かめる。
