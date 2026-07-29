# install

CUDA Toolkit installation, PATH/LD_LIBRARY_PATH setup, and verification on Linux. Source: cuda-installation-guide-linux

## 事前確認

```sh
lspci | grep -i nvidia
hostnamectl
gcc --version
```

CUDA 対応 GPU の有無、ディストリビューション、ホストコンパイラのバージョンを確認する。

## apt ネットワークリポジトリの導入（Ubuntu 24.04 / arm64・SBSA の例）

```sh
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/sbsa/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt update
sudo apt install cuda-toolkit
```

x86_64 の場合はリポジトリパスを `ubuntu2404/x86_64` に読み替える。GB10 / DGX Spark など aarch64 環境では `ubuntu2404/sbsa` を使う。

## runfile によるインストール

> **警告**: runfile インストールは既存の NVIDIA ドライバーを置換する。既存環境で実行する前にドライバーの互換性・稼働中プロセスへの影響を確認すること。

```sh
sudo sh cuda_13.3.0_580.65.06_linux.run
```

ファイル名は `cuda_<toolkit-version>_<driver-version>_linux.run` の形式。ダウンロードした runfile の実際のファイル名に読み替える。

## PATH / LD_LIBRARY_PATH の設定

```sh
export PATH=/usr/local/cuda-13.3/bin${PATH:+:${PATH}}
export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:/usr/local/cuda-13.3/lib64
```

`/usr/local/cuda-13.3` はインストールしたバージョンに応じて読み替える。多くの環境では `/usr/local/cuda`（symlink）も利用できる。

## インストール検証

```sh
nvcc --version
```

`nvcc` が PATH 上で解決でき、期待するバージョンが表示されることを確認する。
