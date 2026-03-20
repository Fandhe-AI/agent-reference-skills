# タスクの実行

## 3つの実行方法

1. `package.json` スクリプト（頻繁に使うタスク）
2. グローバル `turbo` CLI（オンデマンド）
3. `--filter` でスコープを絞る

## package.json スクリプト

```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint"
  }
}
```

## 複数タスクの同時実行

```bash
turbo run build test lint check-types
```

自動並列化される。

## フィルタリング

| フィルター | 例 |
|---|---|
| パッケージ名 | `turbo build --filter=@acme/web` |
| ディレクトリ | `turbo lint --filter="./packages/utilities/*"` |
| 依存元を含む | `turbo build --filter=...ui` |
| 依存先を含む | `turbo dev --filter=web...` |
| Git 差分 | `turbo build --filter=[HEAD^1]` |

複数フィルターは OR（和集合）として動作。

## ショートハンド構文（v2.2.4+）

```bash
turbo run web#build docs#lint
```

## 注意点

- `turbo` コマンドはルートの `package.json` にのみ書く（パッケージ内に書くと再帰実行）
- タスク実行順序は CLI 引数の順ではなく `turbo.json` の設定で制御
