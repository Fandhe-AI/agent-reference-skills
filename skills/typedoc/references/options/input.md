# Options: Input

TypeDoc の Input オプション一覧。

## entryPoints

**Type:** `string[]`（glob パターン）
**Default:** `package.json` の `"exports"` または `"main"` フィールドから自動検出
**CLI:** `--entryPoints <paths>`

ドキュメントのエントリポイント glob を指定する。TypeDoc はエクスポートを調べ、それに応じてドキュメントを作成する。複数のファイルやパターン（例: `src/multiple/*.ts`）を扱える。`"typedoc"` 条件付きエクスポートが存在する場合、`"import"` よりも優先される。

```json
{
  "entryPoints": ["src/index.ts", "src/secondary.ts"]
}
```

## entryPointStrategy

**Type:** `"resolve" | "expand" | "packages" | "merge"`
**Default:** `"resolve"`
**CLI:** `--entryPointStrategy <strategy>`

エントリポイントの処理方法を制御する。

- **resolve:** ルート tsconfig のエントリポイントを含む。ディレクトリには `<directory>/index` を含む
- **expand:** ディレクトリの内容をエントリポイントとして再帰的に展開する（v0.22.0 以前のデフォルト）
- **packages:** ディレクトリを別々のプロジェクトとして扱い、JSON モデルをマージする。各パッケージが独自の TypeDoc 設定を持てる
- **merge:** 事前の TypeDoc 実行（`--json` オプション付き）からの `.json` ファイルをマージする

```json
{
  "entryPointStrategy": "packages"
}
```

## packageOptions

**Type:** `object`
**Default:** なし
**CLI:** なし

`"packages"` ストラテジー使用時の個別パッケージの設定。パスはパッケージディレクトリからの相対パスとして解釈される。`entryPointStrategy` が `"packages"` でない場合は効果がない。

```json
{
  "entryPointStrategy": "packages",
  "packageOptions": {
    "entryPoints": ["src/index.ts"]
  }
}
```

## alwaysCreateEntryPointModule

**Type:** `boolean`
**Default:** `false`（`projectDocuments` 使用時は `true`）
**CLI:** `--alwaysCreateEntryPointModule`

単一のエントリポイントに対して、エクスポートをプロジェクトルートに直接配置する代わりに、モジュールラッパーの作成を強制する。

```json
{
  "alwaysCreateEntryPointModule": true
}
```

## projectDocuments

**Type:** `string[]`（ファイルパス）
**Default:** なし
**CLI:** なし

生成されるドキュメントサイトに追加する Markdown ドキュメントを指定する。

```json
{
  "projectDocuments": ["docs/guide.md", "docs/api-overview.md"]
}
```

## exclude

**Type:** `string[]`（minimatch パターン）
**Default:** なし
**CLI:** `--exclude <pattern>`（繰り返し可）

エントリポイントの検討からファイルを除外する。コンパイルを妨げるものではない。完全な除外には TypeScript の tsconfig.json の `exclude` を使用する。除外されたファイル内のエクスポートされたメンバーはドキュメントから除外される。

```json
{
  "exclude": ["**/node_modules/**", "**/*.spec.ts"]
}
```

## externalPattern

**Type:** `string[]`（パターン）
**Default:** なし
**CLI:** `--externalPattern <pattern>`（繰り返し可）

外部と見なされるファイルのパターンを定義する。`excludeExternals` と組み合わせて使用し、外部モジュールをドキュメントから削除する。

```json
{
  "externalPattern": ["**/node_modules/**"]
}
```

## excludeExternals

**Type:** `boolean`
**Default:** `false`
**CLI:** `--excludeExternals`

外部として解決された TypeScript ファイルがドキュメント化されるのを防ぐ。

```json
{
  "excludeExternals": true
}
```

## excludeNotDocumented

**Type:** `boolean`
**Default:** `false`
**CLI:** `--excludeNotDocumented`

`excludeNotDocumentedKinds` に一致する場合、ドキュメントコメントのないシンボルを削除する。

```json
{
  "excludeNotDocumented": true
}
```

## excludeNotDocumentedKinds

**Type:** `string[]`
**Default:** `["Module", "Namespace", "Enum", "Variable", "Function", "Class", "Interface", "Constructor", "Property", "Method", "CallSignature", "IndexSignature", "ConstructorSignature", "Accessor", "GetSignature", "SetSignature", "TypeAlias", "Reference"]`
**CLI:** なし

`excludeNotDocumented` で削除できるシンボルの種類を指定する。

```json
{
  "excludeNotDocumentedKinds": ["Variable", "Function", "Class"]
}
```

## excludeInternal

**Type:** `boolean`
**Default:** `stripInternal` コンパイラオプションが有効な場合 `true`、それ以外は `false`
**CLI:** `--excludeInternal`

`@internal` doc タグが付けられたシンボルを削除する。

```json
{
  "excludeInternal": true
}
```

## excludePrivate

**Type:** `boolean`
**Default:** `true`
**CLI:** `--excludePrivate`

`private` および `#private` クラスフィールドをドキュメントから削除する。`#private` フィールドを含めるには、これと `excludePrivateClassFields` の両方を `false` にする必要がある。

```json
{
  "excludePrivate": false
}
```

## excludePrivateClassFields

**Type:** `boolean`
**Default:** `true`
**CLI:** `--excludePrivateClassFields`

`#private` クラスフィールドを生成されるドキュメントから削除する。

```json
{
  "excludePrivateClassFields": false
}
```

## excludeProtected

**Type:** `boolean`
**Default:** `false`
**CLI:** `--excludeProtected`

protected クラスメンバーをドキュメントから削除する。

```json
{
  "excludeProtected": true
}
```

## excludeReferences

**Type:** `boolean`
**Default:** `false`
**CLI:** `--excludeReferences`

既にドキュメントに含まれているシンボルの再エクスポートを削除する。

```json
{
  "excludeReferences": true
}
```

## excludeCategories

**Type:** `string[]`
**Default:** なし
**CLI:** `--excludeCategories <category>`（繰り返し可）

指定されたカテゴリに関連付けられたリフレクションを削除する。

```json
{
  "excludeCategories": ["Internal", "Deprecated"]
}
```

## maxTypeConversionDepth

**Type:** `number`
**Default:** `10`
**CLI:** `--maxTypeConversionDepth <number>`

型を変換する際の最大再帰深度を指定する。

```json
{
  "maxTypeConversionDepth": 10
}
```

## name

**Type:** `string`
**Default:** `package.json` のパッケージ名
**CLI:** `--name <name>`

ドキュメントヘッダーのプロジェクト名を設定する。

```json
{
  "name": "My Library"
}
```

## includeVersion

**Type:** `boolean`
**Default:** `false`
**CLI:** `--includeVersion`

生成されるドキュメントに `package.json` のバージョンを含める。

```json
{
  "includeVersion": true
}
```

## disableSources

**Type:** `boolean`
**Default:** `false`
**CLI:** `--disableSources`

変換中の宣言位置のキャプチャを無効にする。

```json
{
  "disableSources": true
}
```

## sourceLinkTemplate

**Type:** `string`（URL テンプレート）
**Default:** GitHub、GitLab、BitBucket 向けに自動生成
**CLI:** `--sourceLinkTemplate <template>`

ソース URL のリンクテンプレート。`{path}`、`{line}`、`{gitRevision}` プレースホルダーをサポートする。`disableSources` が設定されている場合は効果がない。

```json
{
  "sourceLinkTemplate": "https://github.com/user/repo/blob/{gitRevision}/{path}#L{line}"
}
```

## gitRevision

**Type:** `string`
**Default:** 最後のコミット
**CLI:** `--gitRevision <revision>`

ソースリンクのリビジョン/ブランチを指定する。現在のブランチには特別な値 `{branch}` を受け入れる。`disableSources` が設定されている場合は効果がない。

```json
{
  "gitRevision": "main"
}
```

## gitRemote

**Type:** `string`
**Default:** `"origin"`
**CLI:** `--gitRemote <remote>`

GitHub、Bitbucket、または GitLab でのソースファイルリンク用の Git リモート。`disableSources` が設定されている場合は効果がない。

```json
{
  "gitRemote": "origin"
}
```

## disableGit

**Type:** `boolean`
**Default:** `false`
**CLI:** `--disableGit`

TypeDoc が Git を使用してソースのリンク可能性を判断するのを防ぐ。有効にすると、Git リポジトリ外でもソースは常にリンクされる。

```json
{
  "disableGit": true
}
```

## readme

**Type:** `string`（ファイルパスまたは `"none"`）
**Default:** 自動検出
**CLI:** `--readme <path|none>`

インデックスページに表示する readme ファイルへのパス。`"none"` に設定するとインデックスページを無効にする。

```json
{
  "readme": "README.md"
}
```

## basePath

**Type:** `string`（ディレクトリパス）
**Default:** なし
**CLI:** `--basePath <path>`

ドキュメントコメントおよび外部ドキュメント内の相対パスを解決するためのアセットファイルを含むディレクトリ。`displayBasePath` オプションのデフォルトとしても使用される。

```json
{
  "basePath": "./src"
}
```

## 関連

- [Options: Configuration](./configuration.md)
- [Options: Output](./output.md)
- [Options: Comments](./comments.md)
- [Options: Organization](./organization.md)
- [Options: Validation](./validation.md)
- [Options: Other](./other.md)
