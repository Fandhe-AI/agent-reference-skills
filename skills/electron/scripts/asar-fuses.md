---
source: https://www.electronjs.org/docs/latest/tutorial/asar-archives
---

# ASAR and Fuses

ASAR アーカイブの操作と Fuses の確認。出典は asar-archives と fuses（`https://www.electronjs.org/docs/latest/tutorial/fuses`）。

## ASAR アーカイブの内容一覧

```sh
asar list /path/to/example.asar
```

`asar` CLI は公式 `electron/asar` のツール（インストール方法は asar-archives ページに記載なし）。

## ASAR アーカイブの作成（ネイティブモジュールを unpack）

```sh
asar pack app app.asar --unpack *.node
```

`app.asar.unpacked` フォルダーが `app.asar` と同時に生成され、同梱して配布する。

## Fuses の状態確認

```sh
npx @electron/fuses read --app /Applications/Foo.app
```

任意の Electron アプリの Fuse 状態を確認する。読み取りのみで書き換えは行わない。Fuses を反転する場合は `@electron/fuses` の `flipFuses` をパッケージング時に呼ぶ（fuses ページ記載）。署名前に行うこと。
