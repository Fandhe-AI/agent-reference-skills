# Renderers（概念）

Renderer は、Generator が返すものとエンジンが書き込む `FileNode` との間のステップ。Generator は出力を 2 通りの方法で生成する: `ast.factory` のノードビルダーで `FileNode` を直接構築するか、要素を返して Renderer にそれを `FileNode` へ変換させるか。Renderer は後者の経路にあたる。

## なぜレンダリングを別ステップにするのか

`ast.factory` で手動でファイルを組み立てるのは正確だが、import・複数の宣言・JSDoc を含むファイルになると冗長になる。JSX はその点で読みやすく、Generator が出力を `create*` 呼び出しのフラットな列ではなく、コンポーネントとネストとして記述できる。Renderer を独立させておくことで、Generator はどちらのスタイルで生成されたかを気にする必要がなくなる。エンジンはいずれにせよ `FileNode` を受け取るだけ。

Kubb は JSX 経路として `kubb/jsx` を標準搭載する。Generator ごとの `renderer` フィールドで有効化する。React なしで動作する理由は `jsxRenderer`（Kit API リファレンス）を参照。

## 独自 Renderer を書くとき

ほとんどの Plugin はカスタム Renderer を必要としない。Generator が他のテンプレート形式で出力し、それを `FileNode` へ変換する必要がある場合にのみ `createRenderer` を使う。ファイルを直接構築するか JSX を使う場合、標準搭載のツールで十分カバーされる。

## Notes

- `createRenderer` の正確なシグネチャは Kit API リファレンス（[kit-api.md](../reference/kit-api.md)）を参照

## Related

- [generators](./generators.md)
- [concepts-plugins](./concepts-plugins.md)
- [ast](./ast.md)
