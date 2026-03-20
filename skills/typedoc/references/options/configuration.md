# Options: Configuration

TypeDoc の Configuration オプション一覧。

## options

**Type:** `string`
**Default:** 自動検出（`typedoc.json`, `typedoc.jsonc`, `typedoc.config.js`, `typedoc.config.cjs`, `typedoc.config.mjs`, `.config/typedoc.*` など）
**CLI:** `--options <filename>`

コマンドラインオプションに対応するエントリを含む設定ファイルを指定する。`extends` キーを使用して、現在のオプションをインポートする前に追加ファイルを読み込むことができる。

サポートされるファイル形式:
- **JSON ファイル:** JSONC として解析される（末尾カンマとコメントを許可）。`$schema` キーを含めることを推奨: `"https://typedoc.org/schema.json"`
- **JavaScript ファイル:** オプションキーを持つオブジェクトをエクスポートする

```json
{
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": ["./src/index.ts"],
  "out": "docs"
}
```

## tsconfig

**Type:** `string`
**Default:** カレントディレクトリと親ディレクトリを検索（`tsc` と同様）
**CLI:** `--tsconfig <path>`

オプションを読み取るための `tsconfig.json` ファイルを指定する。TypeDoc は `"typedocOptions"` キーを読み取り、同じディレクトリ内の `tsdoc.json` を探す。

```json
{
  "tsconfig": "./tsconfig.json"
}
```

## compilerOptions

**Type:** `object`
**Default:** なし
**CLI:** なし（設定ファイル専用）

ドキュメント生成のために TypeScript コンパイラオプションを選択的にオーバーライドする。値は `tsconfig.json` のものをオーバーライドする。

```json
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "node"
  }
}
```

## plugin

**Type:** `string[]`
**Default:** なし（プラグインは読み込まれない）
**CLI:** `--plugin <name>`（繰り返し可）

読み込むプラグインを指定する。npm パッケージまたはローカルファイルを参照できる。JavaScript 設定ファイルでは関数を直接指定することもできる。

```json
{
  "plugin": ["typedoc-plugin-markdown", "./my-plugin.js"]
}
```

## 関連

- [Options: Input](./input.md)
- [Options: Output](./output.md)
- [Options: Comments](./comments.md)
- [Options: Organization](./organization.md)
- [Options: Validation](./validation.md)
- [Options: Other](./other.md)
