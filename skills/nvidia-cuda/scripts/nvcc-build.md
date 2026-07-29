# nvcc-build

nvcc compiler invocations for object/PTX/cubin output, separate compilation, multi-architecture code generation, and Tile compilation. Source: cuda-compiler-driver-nvcc

## オブジェクトファイルへのコンパイル

```sh
nvcc -c kernel.cu -o kernel.o
```

`.cu` を通常のオブジェクトファイルへコンパイルする。

## PTX / cubin の生成

```sh
nvcc -ptx kernel.cu
nvcc -cubin kernel.cu
```

`-ptx` はデバイスオンリーの PTX テキストを、`-cubin` はデバイスオンリーの cubin バイナリを生成する。

## 分離コンパイル（relocatable device code）

```sh
nvcc -dc a.cu -o a.o
nvcc -dc b.cu -o b.o
nvcc -dlink a.o b.o -o link.o
g++ a.o b.o link.o -o app -lcudart
```

`-dc` は `--relocatable-device-code=true --compile` と等価で、複数の翻訳単位にまたがるデバイスコードを含むオブジェクトファイルを生成する。`-dlink`（`--device-link`）はそれらを実行可能なデバイスコードを含む単一のオブジェクトファイルへリンクし、ホストリンカーに渡す。

## マルチアーキテクチャ指定

```sh
nvcc -arch=native -c kernel.cu
nvcc -arch=all -c kernel.cu
nvcc -gencode arch=compute_100,code=sm_100 -gencode arch=compute_90,code=sm_90 kernel.cu -o app
```

`-arch=native` は実行環境で検出した GPU 向けにのみ生成する。`-arch=all` は対応する全アーキテクチャ分のコードと最上位仮想アーキテクチャの PTX を埋め込む。`-gencode` は複数の実アーキテクチャ・仮想アーキテクチャの組を個別に指定する。

## デバッグ情報・開発補助オプション

```sh
nvcc -lineinfo -c kernel.cu
nvcc -keep -c kernel.cu
nvcc -v -c kernel.cu
```

`-lineinfo` は最適化を保ったままデバイスコードに行番号情報を付与する。`-keep` は中間生成物を保持する。`-v` はコンパイルの各サブコマンドを表示する。

## Tile compilation

```sh
nvcc -enable-tile -std=c++20 -c kernel.cu
nvcc -tilefatbin kernel.cu
```

`-enable-tile` は Tile 拡張を有効にし `__CUDACC_TILE__` マクロを定義する。`-tilefatbin` は `-tile-only` を暗黙に有効化し `.tile.fatbin` を生成する。SIMT コード生成のみ・Tile コード生成のみに絞る場合はそれぞれ `-simt-only` / `-tile-only` を使う。
