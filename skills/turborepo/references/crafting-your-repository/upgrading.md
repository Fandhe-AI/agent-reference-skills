# アップグレード

## codemod による自動移行

```bash
# pnpm
pnpm dlx @turbo/codemod migrate

# yarn
yarn dlx @turbo/codemod migrate

# npm
npx @turbo/codemod migrate

# bun
bunx @turbo/codemod migrate
```

`turbo.json` の自動更新と、ワークスペース `package.json` への `name` フィールド追加を行う。

## v2.0 での主な変更点

### packageManager フィールドの必須化

ルート `package.json` に `packageManager` フィールドを追加する:

```json
{
  "packageManager": "pnpm@9.2.0"
}
```

### 環境変数モードの変更

Strict Mode がデフォルトになった。段階的移行には `--env-mode=loose` フラグか、`turbo.json` の `envMode` キーを使う。

### 削除されたフラグ

| 削除フラグ | 代替 |
|---|---|
| `--ignore` | `--filter` |
| `--scope` | `--filter` |

### フィルタリングの変更

- 名前空間の自動推論が削除された
- マッチしないパッケージ指定はエラーになる
- `--only` はパッケージ依存ではなくタスク依存を制限するようになった

### キャッシュハッシュの変更

ルート `package.json` の `engines` フィールドがキャッシュハッシュに含まれるようになった。

## eslint-config-turbo の更新

`eslint-config-turbo` を使用している場合、メジャーバージョンを合わせて更新する。

## Related

- [configuring-tasks](../crafting-your-repository/tasks.md)
- [environment-variables](../crafting-your-repository/environment-variables.md)
