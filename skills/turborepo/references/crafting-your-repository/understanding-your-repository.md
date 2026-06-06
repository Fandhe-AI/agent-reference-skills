# リポジトリの把握

## turbo devtools

ブラウザベースのパッケージグラフ可視化ツール。タスクグラフの問題診断に使う。

```bash
turbo devtools
```

## turbo ls

パッケージとそのディレクトリ位置を一覧表示。`turbo run` と同じフィルタリングオプションが使用できる。

```bash
turbo ls
turbo ls --filter ...ui
```

## turbo run（引数なし）

タスクを指定せずに `turbo run` を実行すると、モノレポ内で利用可能な全タスクとそれが定義されているパッケージを表示する。

```bash
turbo run
```

## turbo query（v2.2.0+）

GraphQL インターフェースでリポジトリを深く調査できる。

### 使用例

```bash
# build タスクを持つパッケージを検索
turbo query "query { packages(filter: { has: { field: TASK_NAME, value: \"build\"}}) { items { name } } }"

# 10以上のパッケージから依存されているパッケージを検索
turbo query "query { packages(filter: { greaterThan: { field: DIRECT_DEPENDENT_COUNT, value: 10 } }) { items { name } } }"

# 直近の変更で影響を受けたパッケージと理由を確認
turbo query "query { affectedPackages(base: \"HEAD^\", head: \"HEAD\") { items { reason { __typename } } } }"
```

### 主なユースケース

- キャッシュミスの多発パッケージ（頻繁にインポートされるパッケージ）の特定
- `--affected` フラグ使用時の影響範囲の把握
- 肥大化パッケージの分割判断

## Related

- [running-tasks](./running-tasks.md)
- [caching](./caching.md)
- [cli/query](../cli/query.md)
