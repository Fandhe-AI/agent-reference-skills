# @kubb/plugin-redoc

OpenAPI 仕様を Redoc で文書化する単一 HTML ページを生成するプラグイン（plugin-redoc 5.0.12 の docs に準拠）。

仕様全体がページに埋め込まれるため、ビルド不要で任意の静的ホストに公開できる。表示にはネットワークが必要（jsDelivr から SRI ハッシュ検証付きの固定 Redoc バンドル、Google Fonts からフォントを読み込む）。

## インストール

```bash
npm install --save-dev @kubb/plugin-redoc
```

他のプラグイン・パッケージは不要。仕様は既定の OpenAPI アダプター `adapterOas` 経由で読まれ、他のアダプターでは失敗する。

## 設定オプション

`pluginRedoc()` のオプションは `output` のみ。[共通プラグインオプション](https://kubb.dev/docs/5.x/reference/plugin-options)は受け付けない。

| オプション | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `output` | `{ path: string }` | `{ path: 'docs.html' }` | 生成される Redoc HTML ファイルの出力先 |
| `output.path` | `string` | `'docs.html'` | HTML のファイルパス。グローバル `output.path` からの相対。多くのプラグインと異なりディレクトリではなく単一ファイルを指す。`.html` で終えること（無いと拡張子なしの正確なパスに書かれる） |

## 設定例

```typescript
import { defineConfig } from 'kubb/config'
import { pluginRedoc } from '@kubb/plugin-redoc'

export default defineConfig({
  input: './petStore.yaml',
  output: { path: './src/gen' },
  plugins: [
    pluginRedoc({ output: { path: 'docs.html' } }),
  ],
})
```

`src/gen/docs.html` に 1 ファイルが書き出される。

## Notes

- `output.path` はグローバル `output.path` に対して解決される（上の例では `src/gen/docs.html`）。旧版の例のようにルートからの `./docs/index.html` ではない

## Related

- [@kubb/plugin-ts](./plugin-ts.md)
- [adapter-oas](../adapters/adapter-oas.md)
