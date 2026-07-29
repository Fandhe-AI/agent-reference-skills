# mlx-install

Installing MLX from PyPI or building it from source (Python and C++ APIs) on Apple Silicon. Source: MLX Installation

## PyPI からインストールする

```sh
pip install mlx
```

Linux で CUDA を使う場合はエクストラを指定する。

```sh
pip install 'mlx[cuda12]'
pip install 'mlx[cuda13]'
```

Linux で CPU のみを使う場合。

```sh
pip install 'mlx[cpu]'
```

## ソースからビルドする（Python API）

```sh
git clone https://github.com/ml-explore/mlx.git mlx && cd mlx
```

```sh
pip install .
```

開発用（編集可能インストール）。

```sh
pip install -e ".[dev]"
```

C++ 側のみ再ビルドして高速反復する場合。

```sh
python setup.py build_ext --inplace
```

テストを実行する。

```sh
python -m unittest discover python/tests
```

## ソースからビルドする（C++ API）

```sh
mkdir -p build && cd build
cmake .. && make -j
```

```sh
make test
```

```sh
make install
```

## Linux の前提パッケージ

```sh
sudo apt-get update -y
sudo apt-get install libblas-dev liblapack-dev liblapacke-dev -y
```

## Linux で CUDA ビルドを行う場合

> **注記**: MLX は Apple Silicon 以外に Linux/CUDA バックエンドもサポートしており、以下は MLX 公式ドキュメントに
> 記載された Linux 側のビルド手順（NVIDIA CUDA toolkit のセットアップ含む）。CUDA 自体の詳細な使い方は
> nvidia-cuda スキルを参照。

```sh
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update -y
sudo apt-get -y install cuda-toolkit-12-9
sudo apt-get install libblas-dev liblapack-dev liblapacke-dev libcudnn9-dev-cuda-12 -y
CMAKE_ARGS="-DMLX_BUILD_CUDA=ON" pip install -e ".[dev]"
```
