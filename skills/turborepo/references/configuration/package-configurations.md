# パッケージ固有 turbo.json

## extends

ルートの `turbo.json` 設定を継承する。パッケージレベルの `turbo.json` にのみ使用。

```json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

`"extends": ["//"]` はルートワークスペースを意味する。

## パッケージレベルでのオーバーライド

パッケージの `turbo.json` ではルートの同名タスクの設定を上書きできる:
- `outputs`, `inputs`, `env`, `passThroughEnv` は上書き
- `dependsOn` はルート設定とマージ

## 使用例

```
apps/web/turbo.json      ← Next.js 用の outputs を定義
packages/ui/turbo.json   ← UI ライブラリ用の outputs を定義
```
