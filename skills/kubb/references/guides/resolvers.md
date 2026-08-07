# Resolvers（概念）

Resolver は Plugin が出力する各ファイルについて「名前」と「パス」の 2 つの問いに答える。すべての Plugin が 1 つの Resolver を持つ。Generator がファイル名や import パスを必要とするとき、自分で文字列を組み立てず Resolver に問い合わせるため、Plugin の出力全体で名前とパスの一貫性が保たれる。

命名を実際にカスタマイズする手順は [resolver-customization.md](./resolver-customization.md) を参照。

## なぜ命名を一箇所に集約するのか

Plugin は互いの出力に依存する。React Query のフックは `@kubb/plugin-ts` から型を、`@kubb/plugin-zod` から schema を import する。各 Plugin がインラインでファイル名を発明していたら、一方が casing ルールを変えた瞬間にこの結合は壊れる。Resolver がこの推測を排除する。ある Plugin は `ctx.getResolver('plugin-ts')` で他の Plugin の Resolver を読み取り、その Plugin が実際に出力する正確な名前を取得できるため、import は常に正しいファイルを指す。

命名を一箇所に集約することで、上書きする場所も一箇所になる。ある Plugin の Resolver のルールを変更すれば、その Plugin が書き出すすべてのファイルが新ルールに従う（Generator 側には触れない）。

## Resolver が制御するもの

Resolver は次の 2 つの問いを支配するルールを持つ:

- 生成される各識別子の casing
- 出力されるファイル名
- ファイルが置かれるフォルダ（タグや operation パスごとのサブディレクトリを含む、任意設定）

同じルールがファイル間の import 名も決定するため、生成された 1 つのファイルは常に、そのファイルを所有する Plugin が付けた名前で他のファイルを参照する。

Kubb はこれらすべてにデフォルトを用意しているため、Plugin は関心のあるルールのみを上書きし、残りは継承する。デフォルト値・`imports` ビルダー・上書き API は Kit API の Resolver リファレンスに記載される。

## Notes

- 実際に Resolver をカスタマイズする方法（`resolver` オプション、`name`・`file.baseName`・`file.path`・namespaced メソッド）は [resolver-customization.md](./resolver-customization.md) を参照
- Resolver の実装（`createResolver`）は [creating-plugins.md](./creating-plugins.md) の「Resolvers」セクションを参照

## Related

- [resolver-customization](./resolver-customization.md)
- [concepts-plugins](./concepts-plugins.md)
- [generators](./generators.md)
