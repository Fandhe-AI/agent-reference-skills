# Generate

`@feature-sliced/cli` を使ったレイヤー・スライス・セグメントのコード生成コマンド集。

## 複数ページスライスの一括生成

```sh
npx fsd pages feed sign-in article-read article-edit profile settings --segments ui
```

`pages/feed/ui/`、`pages/sign-in/ui/` 等のフォルダと各 index ファイルが作成される。

## Entities レイヤーへのスライス生成

```sh
fsd entities client --segments ui api
```

```sh
fsd e client -s ui,api
```

`--segments`（`-s`）でセグメントをカンマまたはスペース区切りで指定する。

## Widgets レイヤーへのスライス生成（ルート指定あり）

```sh
fsd w bottom-bar -s ui api -r src
```

```sh
fsd widgets bottom-bar --segments ui,api --root src
```

`--root`（`-r`）で生成先ルートディレクトリを指定する。

## Features レイヤーへのネストスライス生成

```sh
fsd f employee/employee-record
```

```sh
fsd feat employee/employee-record
```

スラッシュ区切りでネストしたスライスパスを指定できる。

## Entities レイヤーへのカスタムルート指定

```sh
fsd e user -r ./src/lib
```

```sh
fsd entity user --root ./src/lib
```

## Pages レイヤーへの複数スライス生成

```sh
fsd p edit-note note-list -s ui api
```

```sh
fsd page edit-note,note-list -s ui api
```

## Shared レイヤーへのセグメント生成

```sh
fsd shared --segments api config
```

```sh
fsd s ui api
```

```sh
fsd shared ui -s api
```

## レイヤー省略エイリアス一覧

| 省略形 | フルネーム |
| --- | --- |
| `e` / `entity` | `entities` |
| `w` / `widget` | `widgets` |
| `f` / `feat` | `features` |
| `p` / `page` | `pages` |
| `s` | `shared` |
