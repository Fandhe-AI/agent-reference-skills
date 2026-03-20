# Biome

高速フォーマッター兼リンター。ルートタスクとして運用が推奨。

## 設定

```json
{
  "scripts": {
    "format-and-lint": "biome check .",
    "format-and-lint:fix": "biome check . --write"
  }
}
```

```json
{
  "tasks": {
    "//#format-and-lint": {},
    "//#format-and-lint:fix": { "cache": false }
  }
}
```

## 注意

ルートタスクのため、バージョンアップや設定変更時に全タスクのキャッシュミスが発生する。
