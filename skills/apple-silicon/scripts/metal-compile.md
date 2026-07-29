# metal-compile

Compiling `.metal` source files to intermediate representation, archiving, and linking into a `.metallib`. Source: Building a shader library by precompiling source files

Metal Toolchain 未導入の場合は先に [toolchain-setup.md](./toolchain-setup.md) を参照。

## `.metal` を `.ir` にコンパイルする

```sh
xcrun -sdk macosx metal -o Shadow.ir -c Shadow.metal
xcrun -sdk macosx metal -o PointLights.ir -c PointLights.metal
xcrun -sdk macosx metal -o DirectionalLight.ir -c DirectionalLight.metal
```

## 複数の `.ir` を `.metalar` にアーカイブする

```sh
xcrun -sdk macosx metal-ar -q Lights.metalar DirectionalLight.ir PointLights.ir
```

## `.metalar` と `.ir` から `.metallib` を生成する

```sh
xcrun -sdk macosx metal -o LightsAndShadow.metallib Lights.metalar Shadow.ir
```
