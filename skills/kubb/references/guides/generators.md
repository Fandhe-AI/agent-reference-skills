# Generators（概念）

Generator は Plugin がコードを生成する場所。Plugin がオプション・ライフサイクル・配線を担当する一方、Generator は [AST](./ast.md) のノードを読み取り、そのノードが変換されるファイル群を返す。Generator を持たない Plugin は何も出力しない。

## なぜ Generator に分割するのか

1 つの大きな関数で書くこともできるが、多くの Plugin は同じ仕様から複数種類の出力を生成する。`@kubb/plugin-react-query` は operation ごとにフックを、operation ごとに query key を書き、最後に barrel を 1 回書く。これを名前付き Generator に分割することで各 Generator を小さく保ち、エンジンがノードごとに適切な Generator を呼び出せるようになる（1 つの関数がすべてを分岐処理するより優れる）。

Plugin は [Plugin setup](./concepts-plugins.md) 時に Generator を登録する。以降はエンジンがスケジュールを所有し、AST を 1 度走査しながら対応するノードが出現するたびに各 Generator のメソッドを呼び出す。

## 各メソッドが扱うもの

Generator は最大 3 つのメソッドを実装する。それぞれ仕様の異なる部分を担当する:

- `schema` — 1 つの data schema ごと
- `operation` — 1 つの API operation ごと
- `operations` — operation セット全体を 1 度だけ。index やルーターのように、書き込む前に全体を見る必要がある出力向け

各メソッドは Generator context を受け取り、そのノードが変換されるファイル群を返す。`FileNode` を直接返す・renderer element を返す・context 経由で書き込んで何も返さない、のいずれも可能。各フィールドの詳細は Kit API の Generator リファレンスを参照。

## `match` によるスコープ限定

同じノード種別に対して複数の Generator を登録し、ノードごとに 1 つだけ実行させたい場合（例: query variant ごとに 1 つのフック Generator）がある。Generator に `match(node, ctx)` 述語を与えるとこのスコープを宣言できる。`false` を返すと、そのノードに対する `schema` または `operation` の呼び出し自体をエンジンがスキップする（Generator を呼んでから自分でノードを判定して抜けるより効率的）。

## Notes

- Generator の実装手順は [creating-plugins.md](./creating-plugins.md) の「Generators」セクションを参照
- Generator が出力する `FileNode` の命名・パスは [resolvers.md](./resolvers.md) が決定する

## Related

- [architecture](./architecture.md)
- [concepts-plugins](./concepts-plugins.md)
- [ast](./ast.md)
- [renderers](./renderers.md)
