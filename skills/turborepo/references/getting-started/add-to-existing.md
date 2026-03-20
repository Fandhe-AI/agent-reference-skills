# 既存リポジトリへの追加

## 対応するリポジトリタイプ

| タイプ | 説明 |
|---|---|
| Single-Package Workspace | `create-next-app` 等で作成した単一パッケージ。事前準備不要 |
| Multi-Package Workspace（モノレポ） | パッケージマネージャーのワークスペース機能を使った複数パッケージ |

## 導入手順

### Step 1: Turborepo のインストール

```bash
pnpm add turbo --global
pnpm add turbo --save-dev --workspace-root
```

### Step 2: turbo.json の作成

```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "dev": {
      "persistent": true,
      "cache": false
    }
  }
}
```

### Step 3: .gitignore への追加

```
.turbo
```

### Step 4: packageManager フィールドの追加

```json
{
  "packageManager": "pnpm@10.0.0"
}
```

### Step 5: ワークスペース構造の設定（モノレポのみ）

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

### Step 6: タスクの実行

```bash
turbo build check-types
```

## キャッシュの効果確認

再実行時の期待される出力:
```
Cached: 2 cached, 2 total
Time: 185ms >>> FULL TURBO
```
