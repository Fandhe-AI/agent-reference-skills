# Install

Hermes Agent のインストールと依存パッケージの管理。

## クイックインストール（Linux / macOS / WSL2）

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

Git のみが事前に必要。Python 3.11、Node.js v22、ripgrep、ffmpeg は自動検出・インストールされる。

## インストール後の確認

```bash
hermes doctor
```

設定に問題がないか診断する。

## シェルのリロード（hermes コマンドが見つからない場合）

```bash
source ~/.bashrc
# または
source ~/.zshrc
```

## オプション機能付きインストール

```bash
uv pip install -e ".[messaging,voice]"
```

利用可能なオプション: `messaging`、`cron`、`voice`、`homeassistant`、`slack`、`all`

## 全オプション込みインストール

```bash
uv pip install -e ".[all]"
```

## MCP サポートのみ追加

```bash
cd ~/.hermes/hermes-agent
uv pip install -e ".[mcp]"
```

## ACP サポートのみ追加

```bash
pip install -e '.[acp]'
```

## ローカル音声処理（faster-whisper）

```bash
pip install faster-whisper
```

約 150 MB のモデルダウンロードが発生する。

## ブラウザ・WhatsApp ツール（オプション）

```bash
npm install
```

`~/.hermes/hermes-agent` ディレクトリで実行する。

## アップデート

```bash
hermes update
```

## アンインストール

```bash
hermes uninstall
```

> **警告**: `hermes uninstall --full` を指定すると、設定・メモリ・セッションデータを含む `~/.hermes/` ディレクトリも削除される。`--yes` フラグを付けると確認プロンプトをスキップする。
