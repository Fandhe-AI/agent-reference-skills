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

アーカイブに含まれないベンダーは `find` の結果が空になるためスキップされる
（`ls vendor*` 直書きだと zsh で `no matches found` になり中断する）。

```sh
mkdir -p shaders/macos/lib
for vendor in applegpu intelgpu amdgpu; do
  thin=$(find shaders/macos -maxdepth 1 -name "${vendor}*.binary.metallib")
  [ -n "${thin}" ] || continue
  xcrun -sdk macosx metal-lipo ${thin} -create -output "shaders/macos/lib/${vendor}.binary.metallib"
done
```

```sh
du -h shaders/macos/lib/*
```

設定項目の一覧は `man` で確認できる。

```sh
man metal-lipo
```
