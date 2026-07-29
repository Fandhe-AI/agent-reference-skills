# metal-binary-archives

Extracting per-architecture executables from a multi-architecture Metal binary archive and repacking them by vendor. Source: Manipulating Metal binary archives

Metal Toolchain 未導入の場合は先に [toolchain-setup.md](./toolchain-setup.md) を参照。

## アーカイブに含まれるアーキテクチャを列挙する

```sh
xcrun metal-lipo -archs render.binary.metallib
```

## ファイルサイズを比較する

`render.metallib` はバイナリアーカイブ化する前の通常の Metal ライブラリ。
手元にない場合はこのセクションを飛ばす。

```sh
du -h render.binary.metallib
du -h render.metallib
```

## アーキテクチャ毎に薄いバイナリへ分離する

```sh
mkdir -p shaders/macos
xcrun metal-lipo -archs render.binary.metallib | tr ' ' '\n' | grep -v '^$' | xargs -I{} xcrun metal-lipo -thin {} -output shaders/macos/{}.binary.metallib render.binary.metallib
```

```sh
ls shaders/macos
```

## ベンダー毎に再結合する

アーカイブに含まれないベンダーはスキップされる。
薄いバイナリは `xargs -0` 経由で個別の引数として渡す
（`ls vendor*` 直書きは zsh で `no matches found` になり、
変数へ入れて未クォート展開する方法は zsh が単語分割しないため 1 引数に潰れる）。

```sh
mkdir -p shaders/macos/lib
for vendor in applegpu intelgpu amdgpu; do
  find shaders/macos -maxdepth 1 -name "${vendor}*.binary.metallib" -print0 |
    xargs -0 sh -c '[ "$#" -gt 0 ] || exit 0; xcrun -sdk macosx metal-lipo "$@" -create -output "$0"' \
      "shaders/macos/lib/${vendor}.binary.metallib"
done
```

```sh
du -h shaders/macos/lib/*
```

設定項目の一覧は `man` で確認できる。

```sh
man metal-lipo
```
