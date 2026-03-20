# ESLint

## ESLint v9（Flat Config）— 推奨

設定パッケージ構成:
```
packages/eslint-config/
  package.json
  base.js
  next.js
  react-internal.js
```

ESLint プラグインや依存関係を `@repo/eslint-config` パッケージに一元管理する。

## lint タスク設定

```json
{ "tasks": { "lint": { "dependsOn": ["^lint"] } } }
```

`^lint` により設定パッケージ変更時に依存パッケージのキャッシュが自動無効化される。

## 注意

ESLint v8 は 2024年10月5日に EOL。新規プロジェクトでは必ず v9 Flat Config を使用する。
