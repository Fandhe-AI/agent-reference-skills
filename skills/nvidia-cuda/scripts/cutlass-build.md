# cutlass-build

CUTLASS CMake build, unit tests, and cutlass_profiler invocations. Source: cutlass quickstart / profiler

## リポジトリの取得

```sh
git clone https://github.com/NVIDIA/cutlass.git
cd cutlass
```

## ビルド環境の設定

```sh
export CUDACXX=/usr/local/cuda/bin/nvcc
mkdir build && cd build
```

`CUDACXX` は使用する `nvcc` のパスを指す。`/usr/local/cuda` は多くの環境で最新導入バージョンへの symlink になっている。

## CMake 構成（Blackwell SM100 の例）

```sh
cmake .. -DCUTLASS_NVCC_ARCHS=100a -DCUTLASS_LIBRARY_KERNELS=all -DCUTLASS_UNITY_BUILD_ENABLED=ON
```

`-DCUTLASS_NVCC_ARCHS` はターゲットアーキテクチャ（`100a` = Blackwell SM100、`90a` = Hopper 等）を指定する。`-DCUTLASS_LIBRARY_KERNELS=all` は全カーネルをビルド対象にし、`-DCUTLASS_UNITY_BUILD_ENABLED=ON` はユニティビルドでコンパイル時間を短縮する。

## cutlass_profiler のビルド

```sh
make cutlass_profiler -j12
```

`-j` の並列数は環境のコア数に合わせて調整する。

## ユニットテストのビルド・実行

```sh
make test_unit -j12
```

## cutlass_profiler による GEMM プロファイリング

```sh
./tools/profiler/cutlass_profiler --kernels=cutlass_simt_sgemm_128x128_nn --m=3456 --n=4096 --k=8:4096:8 --output=report.csv
```

`--kernels` はプロファイル対象カーネル名（ワイルドカード可）、`--m`/`--n`/`--k` は問題サイズ（`start:end:increment` のレンジ指定可）、`--output` は結果 CSV のパスを指定する。

`report.csv` にはビルド環境・カーネル名・実行時間が記録されるため、リポジトリにコミットしない。

## Python DSL のインストール

```sh
pip install nvidia-cutlass-dsl
```

CUDA Toolkit 12.9 向け。CUDA Toolkit 13.1 環境では `pip install "nvidia-cutlass-dsl[cu13]"` を使う。
