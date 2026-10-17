# install

CUDA Toolkit installation, PATH/LD_LIBRARY_PATH setup, and verification on Linux. Source: cuda-installation-guide-linux (CUDA 13.4.2), cuda-toolkit-release-notes

## 事前確認

```sh
lspci | grep -i nvidia
hostnamectl
gcc --version
```

CUDA 対応 GPU の有無、ディストリビューション、ホストコンパイラのバージョンを確認する。

## ドライバーブランチと toolkit の対応

| CUDA Toolkit | ドライバーブランチ |
| --- | --- |
| CUDA 13.4 | R615 |
| CUDA 13.3 | R610 |
| CUDA 13.2 | R595 |
| CUDA 13.1 | R590 |
| CUDA 13.0 | R580 |

CUDA 13.4 から Linux でも NVIDIA ドライバーは toolkit に同梱されない（Windows は 13.1 から）。toolkit とドライバーは独立してインストール・バージョン管理される。既存の CUDA 13.x アプリケーションは minor version compatibility によりドライバー >=580 で動作する。CUDA 13.4 の新機能・新規対応プラットフォームには R615 以降のドライバーが必要。

## ドライバーの別途インストール

CUDA 13.4 以降は toolkit のインストール後に、Driver Installation Guide for Linux に従って互換ドライバーを別途インストールする。手順は本ファイルでは扱わない（要確認: 公式 Driver Installation Guide を参照）。

## apt ネットワークリポジトリの導入（Ubuntu 24.04 / arm64・SBSA の例）

```sh
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2404/sbsa/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt update
sudo apt install cuda-toolkit
```

x86_64 の場合はリポジトリパスを `ubuntu2404/x86_64` に読み替える。GB10 / DGX Spark など aarch64 環境では `ubuntu2404/sbsa` を使う。CUDA 13.4 以降、`cuda-toolkit` meta package を含むすべての meta package はドライバーをインストールせず、依存もしない。特定バージョンに固定する場合は `cuda-toolkit-X-Y` を使う。

## runfile によるインストール

> **注意**: CUDA 13.4 以降、runfile は toolkit のみをインストールし、NVIDIA ドライバーは含まない。既存ドライバーを置換することもない。ドライバーは Driver Installation Guide に従って別途インストールする。

```sh
sudo sh cuda_<version>_linux.run
```

ファイル名は `cuda_<version>_linux.run` の形式。ダウンロードした runfile の実際のファイル名に読み替える。toolkit の既定のインストール先は `/usr/local/cuda-13.4`。

## PATH / LD_LIBRARY_PATH の設定

```sh
export PATH=/usr/local/cuda-13.4/bin${PATH:+:${PATH}}
export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:/usr/local/cuda-13.4/lib64
```

`/usr/local/cuda-13.4` はインストールしたバージョンに応じて読み替える。`LD_LIBRARY_PATH` の設定は runfile インストールの場合に必要。runfile でカスタムインストール先を指定した場合はパスも変わる。`/usr/local/cuda` は最後にインストールした toolkit を指す symlink。

## インストール検証

```sh
nvcc --version
```

`nvcc` が PATH 上で解決でき、期待するバージョンが表示されることを確認する。

## アンインストール前のドライバー保護（Debian / Ubuntu）

> **警告**: CUDA 13.3 以前の `cuda` meta package の依存として自動インストールされたドライバーは、13.4 以降にアップグレードすると、どのパッケージからも必要とされない状態になる。この状態で `apt autoremove` を実行すると NVIDIA ドライバースタック全体が削除され、GPU にアクセスできなくなる場合がある。ドライバーを残す場合は、クリーンアップ前に explicit install（手動インストール扱い）にマークする。

```sh
# Step 1: インストール済みのドライバー meta package を確認
dpkg -l nvidia-open cuda-drivers
# Step 2: explicit install にマーク
sudo apt-mark manual <package>
# Step 3: 削除対象にドライバーが含まれないことを確認
sudo apt autoremove --dry-run
```

`<package>` は Step 1 で確認したパッケージ名に読み替える。dnf / tdnf 系は `sudo dnf mark install <package>`（RHEL 10 の dnf5 は `sudo dnf mark user <package>`）、`sudo tdnf mark install <package>` を使い、`autoremove --assumeno` で確認する。ユーザーが明示的にインストールしたドライバー、またはスタンドアロンのドライバーインストールで入れたものは影響を受けない。
