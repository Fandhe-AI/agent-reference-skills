# Install

Hermes Agent のインストールと依存パッケージ（PM 管理）の操作。対象は v0.22.2 の公式ドキュメント。

## クイックインストール（Linux / macOS / WSL2）

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

事前に必要なのは Git、curl、tar、SHA-256 ユーティリティ。Python 3.14、Node.js、npm、ripgrep、FFmpeg は PM（package management）が pin したバージョンを供給する（システムの Node は採用されない）。ソースインストールは Python extra `all` を選択する。

## クイックインストール（Windows ネイティブ）

```powershell
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

PowerShell で実行する。Git が無い場合は pin 済みの Git for Windows アーカイブが自動で取得される。

## インストーラーのオプション

| 用途 | POSIX | Windows |
| --- | --- | --- |
| ブラウザツールを除外 | `--skip-browser` | `-SkipBrowser` |
| computer-use ドライバーを除外 | `--skip-computer-use` | `-SkipComputerUse` |
| 入力を要するステージを省略 | `--non-interactive` | `-NonInteractive` |
| デスクトップをソースからビルド | `--include-desktop` | `-IncludeDesktop` |
| 詳細ログを出力 | `--verbose` | `-Verbose` |

既定では `agent-browser`（pin 済み Chromium 付き）と `cua-driver` も PM がインストールする。除外した選択は記憶され、以降のインストールや `hermes update` でも再追加されない。オプションの渡し方（引数の与え方）は公式に例示がないため、各スクリプトの `--help` 等で確認する（要確認）。

## 除外したツールの後付けインストール

```bash
hermes pm install agent-browser
hermes pm install cua-driver
```

名前を指定すると、以前に除外した選択が取り消される。

## インストール後の確認

```bash
hermes doctor
```

設定・依存関係・インストール由来（provenance）を診断する。

## シェルのリロード（hermes コマンドが見つからない場合）

```bash
source ~/.bashrc
# または
source ~/.zshrc
```

## オプション機能（Python extra）の追加

```bash
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['<extra>'], explicit=True)"
```

公式ドキュメントに登場する extra 名: `messaging`（Telegram / Discord / Slack 等の共通依存）、`voice`（ローカル STT の faster-whisper）、`mcp`、`acp`、`anthropic`、`bedrock`、`otlp`、`tts-premium`、`edge-tts`、`azure-identity`。複数指定は `['voice', 'messaging']` のようにリストへ並べる。

> **警告**: 生の `pip` / `uv` コマンドで Hermes の環境を直接変更しない（PM が世代管理するため）。Docker はオンデマンド依存インストールが無効。

## MCP サポートのみ追加

```bash
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['mcp'], explicit=True)"
```

## ACP サポートのみ追加

```bash
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['acp'], explicit=True)"
```

標準の `[all]` に ACP は含まれるため、通常は追加不要。

## ローカル音声処理（faster-whisper）

```bash
cd ~/.hermes/hermes-agent && python -c "import pm; pm.sync_venv(['voice'], explicit=True)"
```

`voice` extra がローカル STT（faster-whisper）に対応する。

## PM の診断・修復

```bash
hermes pm doctor
hermes pm status
hermes pm repair
```

`doctor` は固定済みツールの状態を lock と照合し、`status` は直近の sync / update レシートを JSON で表示し、`repair` は記録済みの Python 依存セットを新しい世代として再構築する。

## Android / Termux

```bash
pkg update
pkg install hermes-agent
```

> **警告**: 公式ドキュメント（v0.22.2）は「Termux パッケージは現在動作しない」と明記している（修正作業中）。事前に署名付き APT リポジトリの設定（公開鍵の取得とフィンガープリント検証、`hermes-agent.list` の作成）が必要で、手順は公式の Android / Termux ページを参照する。`install.sh` は Termux では使わない。

## アップデート

```bash
hermes update
hermes update --set-channel main      # main の全コミットを追従
hermes update --set-channel stable    # リリースのみに戻す
hermes update --channel main          # 今回のみ main を対象（設定は保存されない）
```

> **警告**: `--set-channel stable` はチェックアウトを最新リリースのコミットに pin する。現在のチェックアウトが新しくても古いリリースへ戻る場合がある。

## アンインストール

```bash
hermes uninstall --dry-run
hermes uninstall
```

ソースインストールでは `--dry-run` で事前確認する。MSIX / Store は Windows の設定 → アプリ、macOS はアプリを削除、Docker / Nix / Termux はインストール元のマネージャーで削除する。

> **警告**: `--full` は設定・メモリ・セッションを含むデータも削除する。`--data` はコード本体を残してユーザーデータのみ削除する。いずれも破壊的なため、事前に `hermes backup` を取る。`--yes` は確認プロンプトをスキップする。
