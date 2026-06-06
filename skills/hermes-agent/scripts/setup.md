# Setup

Hermes Agent の初期設定・プロバイダー設定・診断。

## 対話式セットアップウィザード

```bash
hermes setup
```

## セクション別セットアップ

```bash
hermes setup model
hermes setup terminal
hermes setup gateway
hermes setup tools
hermes setup agent
```

## 非インタラクティブ（デフォルト値を使用）

```bash
hermes setup --non-interactive
```

## 設定を初期化してセットアップし直す

```bash
hermes setup --reset
```

## プロバイダー・モデルの選択

```bash
hermes model
```

## 設定の表示

```bash
hermes config show
```

## 設定ファイルをエディタで開く

```bash
hermes config edit
```

## 設定値の個別変更

```bash
hermes config set KEY VAL
```

## 設定ファイルのパスを表示

```bash
hermes config path
```

## .env ファイルのパスを表示

```bash
hermes config env-path
```

## 設定の検証

```bash
hermes config check
```

## 新しいオプションをデフォルト値で追加

```bash
hermes config migrate
```

## 診断の実行

```bash
hermes doctor
```

## 自動修復を試みる診断

```bash
hermes doctor --fix
```

## システム・プラットフォームステータスの表示

```bash
hermes status
hermes status --all
hermes status --deep
```

## API キーファイルのパーミッション設定

```bash
chmod 600 ~/.hermes/.env
```

> **警告**: `~/.hermes/.env` に API キーを保存する。バージョン管理には絶対にコミットしない。
