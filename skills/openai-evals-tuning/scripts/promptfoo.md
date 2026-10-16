# promptfoo

Evals platform の移行先 Promptfoo の CLI コマンド集。Evals dashboard / API は 2026-11-30 にシャットダウン予定。`OPENAI_API_KEY` の設定が前提。

## サンプルの初期化 (npx)

```bash
npx promptfoo@latest init --example getting-started
cd getting-started
```

Node.js 22.22.0 以上が必要。

## サンプルの初期化 (pip)

```bash
pip install promptfoo
promptfoo init --example getting-started
cd getting-started
```

有効な Python 3.10+ 仮想環境が必要。pip wrapper も Node.js 22.22.0 以上を要求する。

## API キーの設定

```bash
export OPENAI_API_KEY="<your-api-key>"
```

## eval の実行と結果表示 (npx)

> **警告**: eval はモデル呼び出しを行うため API 課金が発生する。

```bash
npx promptfoo@latest eval
npx promptfoo@latest view
```

## eval の実行と結果表示 (pip インストール版)

```bash
promptfoo eval
promptfoo view
```

## キャッシュなしで再実行

```bash
promptfoo eval -c promptfooconfig.yaml --no-cache
promptfoo view
```

`eval` は新しい Promptfoo の run を作成し、過去の OpenAI Evals の run とは別になる。

## 設定ファイルの検証

```bash
promptfoo validate config -c promptfooconfig.yaml
```

設定変更後やエラー発生時に再実行前の確認として使う。
