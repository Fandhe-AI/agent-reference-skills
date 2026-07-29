# metal-dynamic-libraries

Compiling a Metal dynamic library and linking a shader library against it. Source: Compiling and linking Metal dynamic libraries

Metal Toolchain 未導入の場合は先に [toolchain-setup.md](./toolchain-setup.md) を参照。

## `.metal` から動的ライブラリをコンパイルする

```sh
xcrun -sdk macosx metal -dynamiclib utilities.metal -o libUtility.ir.metallib -install_name libUtility.metallib
```

## アーカイブを配布用の動的ライブラリへまとめる

> **注記**: 公式ドキュメント内でも入力ファイル名が前段の出力（`libUtility.ir.metallib`）と一致しておらず
> `libUtility.metalir.metallib` と表記されている。原文どおり掲載するため、自環境で実行する際はファイル名を揃えること。

```sh
xcrun -sdk macosx metal-tt libUtility.metalir.metallib -o libUtility.metallib $(xcrun -sdk macosx metal-config --native-arch-flags --gpu-family=metal3)
```

## シェーダーライブラリを動的ライブラリにリンクする

```sh
xcrun -sdk macosx metal shaders.ir -o shaders.metallib -lUtility -L ./
```

設定項目の一覧は `man` で確認できる。

```sh
man metal-config
```
