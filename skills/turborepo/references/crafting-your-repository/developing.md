# アプリケーション開発

## dev タスク設定

```json
{
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

- `"cache": false`: 頻繁に変化する開発コードにはキャッシュ不要
- `"persistent": true`: 終了しないタスクに誤って依存するのを防ぐ

## セットアップスクリプト付き dev

```json
{
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["//#dev:setup"]
    },
    "//#dev:setup": {
      "outputs": [".codegen/**"]
    }
  }
}
```

## コマンド

```bash
turbo dev                      # 全 dev タスクを実行
turbo dev --filter=web         # web とその依存パッケージのみ
turbo watch dev lint           # ウォッチモード
```

## ターミナル UI キーバインド

| キー | 機能 |
|---|---|
| `m` | キーバインドメニューの表示切替 |
| `↑`/`↓` or `j`/`k` | タスクリストのナビゲーション |
| `p` | 選択タスクのピン留め切替 |
| `h` | タスクリストの表示切替 |
| `c` | ハイライトされたログをコピー |
| `u`/`d` | ログのスクロール上下 |
| `i` | タスクとのインタラクション開始 |
| `Ctrl+z` | インタラクションの停止 |

## Watch Mode

`turbo watch` はパッケージ A を変更すると、それに依存するパッケージ B のタスクも自動的に再実行する。

## 制限事項

ティアダウンタスク: Turborepo はティアダウンスクリプトを自動実行できない。`turbo dev:teardown` で手動実行する。
