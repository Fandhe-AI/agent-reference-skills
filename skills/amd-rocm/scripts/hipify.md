# hipify

hipify-perl one-shot CUDA-to-HIP conversion, in-place migration, and translation statistics. Source: HIPIFY/hipify-perl

## ワンショット変換

```sh
hipify-perl mykernel.cu -o mykernel.hip.cpp
```

CUDA ソース `mykernel.cu` を HIP ソースへ変換し、`-o` で出力先ファイル名を指定する。

## インプレース変換

```sh
hipify-perl -inplace mykernel.cu
```

`-inplace` は変換前のファイルを `.prehip` としてバックアップし、入力ファイル自体を HIP コードへ書き換える。

## 変換統計の表示

```sh
hipify-perl -print-stats mykernel.cu -o mykernel.hip.cpp
```

`-print-stats` は変換されなかった CUDA API の一覧など、変換統計を表示する。

## hipify-clang による変換

```sh
hipify-clang cpp17.cu --cuda-path=/usr/local/cuda-12.9 -- -std=c++17
```

`hipify-clang` は AST ベースで変換するため、`--cuda-path` で CUDA インストール先を指定し、`--` 以降に元のコンパイルオプション（C++ 標準指定等）を渡す必要がある。複雑な CUDA コードでは `hipify-perl` より高精度。
