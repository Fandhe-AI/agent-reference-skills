# metal-binary-archives

Extracting per-architecture executables from a multi-architecture Metal binary archive and repacking them by vendor. Source: Manipulating Metal binary archives

Metal Toolchain 未導入の場合は先に [toolchain-setup.md](./toolchain-setup.md) を参照。

## アーカイブに含まれるアーキテクチャを列挙する

```sh
xcrun metal-lipo -archs render.binary.metallib
```

## ファイルサイズを比較する

```sh
du -h render.binary.metallib
du -h render.metallib
```

## アーキテクチャ毎に薄いバイナリへ分離する

```sh
mkdir -p shaders/macos
xcrun metal-lipo -archs render.binary.metallib | tr ' ' '\n' | xargs -n 1 -I{} xcrun metal-lipo -thin {} -output shaders/macos/{}.binary.metallib render.binary.metallib
```

```sh
ls shaders/macos
```

## ベンダー毎に再結合する

```sh
mkdir -p shaders/macos/lib
xcrun -sdk macosx metal-lipo $(ls shaders/macos/applegpu*) -create -output shaders/macos/lib/applegpu.binary.metallib
xcrun -sdk macosx metal-lipo $(ls shaders/macos/intelgpu*) -create -output shaders/macos/lib/intelgpu.binary.metallib
xcrun -sdk macosx metal-lipo $(ls shaders/macos/amdgpu*) -create -output shaders/macos/lib/amdgpu.binary.metallib
```

```sh
du -h shaders/macos/lib/*
```

設定項目の一覧は `man` で確認できる。

```sh
man metal-pack
```
