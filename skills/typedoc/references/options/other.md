# Options: Other

TypeDoc の Other オプション一覧。

## watch

**Type:** `boolean`
**Default:** `false`
**CLI:** `--watch`

TypeScript のインクリメンタルコンパイラを使用してソースファイルの変更を監視し、変更時にドキュメントをビルドする。ソースファイル、プロジェクトドキュメント、readme、カスタムアセット、設定ファイル、および `@include`/`@includeCode` でインポートされたファイルの変更を検出する。`entryPointStrategy` が `packages` または `merge` に設定されている場合は互換性がない。

```json
{
  "watch": true
}
```

## preserveWatchOutput

**Type:** `boolean`
**Default:** `false`
**CLI:** `--preserveWatchOutput`

デフォルトでは `--watch` はコンパイルステップ間で画面をクリアする。`--preserveWatchOutput` が指定されている場合、この動作は無効になる。

```json
{
  "preserveWatchOutput": true
}
```

## help

**Type:** `boolean`
**Default:** `false`
**CLI:** `--help`

利用可能なすべてのオプションとその短い説明を出力する。サポートされているハイライト言語のリストも出力する。

```sh
typedoc --help
```

## version

**Type:** `boolean`
**Default:** `false`
**CLI:** `--version`

TypeDoc のバージョンを出力する。

```sh
typedoc --version
```

## showConfig

**Type:** `boolean`
**Default:** `false`
**CLI:** `--showConfig`

TypeDoc の設定を出力して終了する。どのオプションが設定されているかをデバッグするのに便利。

```sh
typedoc --showConfig
```

## logLevel

**Type:** `"Verbose" | "Info" | "Warn" | "Error" | "None"`
**Default:** `"Info"`
**CLI:** `--logLevel <level>`

コンソールに出力されるログレベルを指定する。

利用可能なレベル:
- `Verbose` - すべてのメッセージを出力
- `Info` - 情報メッセージ以上を出力
- `Warn` - 警告以上を出力
- `Error` - エラーのみ出力
- `None` - 出力なし

```json
{
  "logLevel": "Warn"
}
```

## skipErrorChecking

**Type:** `boolean`
**Default:** `false`
**CLI:** `--skipErrorChecking`

TypeDoc にプロジェクト変換前の型チェックを実行しないよう指示する。生成時間を改善する可能性があるが、コードに型エラーが含まれている場合はクラッシュを引き起こす可能性がある。

```json
{
  "skipErrorChecking": true
}
```

## 関連

- [Options: Configuration](./configuration.md)
- [Options: Input](./input.md)
- [Options: Output](./output.md)
- [Options: Comments](./comments.md)
- [Options: Organization](./organization.md)
- [Options: Validation](./validation.md)
