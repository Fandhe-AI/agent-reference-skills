# turbo boundaries

ワークスペース間の依存関係違反を検査する実験的機能。

```bash
turbo boundaries
```

## 検出する違反

1. パッケージディレクトリ外のファイルインポート
2. `package.json` の `dependencies` に未宣言のパッケージのインポート

## タグ設定

各パッケージの `turbo.json` でタグを付与:

```json
{ "tags": ["internal"] }
```

## ルール設定（ルートの turbo.json）

### allow ルール

```json
{
  "boundaries": {
    "tags": {
      "public": { "dependencies": { "allow": ["public"] } }
    }
  }
}
```

### deny ルール

```json
{
  "boundaries": {
    "tags": {
      "public": { "dependencies": { "deny": ["internal"] } }
    }
  }
}
```

### dependents ルール

```json
{
  "boundaries": {
    "tags": {
      "private": { "dependents": { "deny": ["public"] } }
    }
  }
}
```

ルールは依存チェーンを通じて推移的に適用される。パッケージ名も使用可能。
