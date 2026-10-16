# install

ROCm 10.1.0 (TheRock) repository setup, amdrocm meta-package installation, PATH configuration, and verification on Linux. These are AMD ROCm commands (apt, amd-smi), not the same-named NVIDIA CUDA toolchain; the NVIDIA equivalent is covered by the separate nvidia-cuda skill. Source: install/include/200-install.rst, 300-post-install.rst, 400-uninstall.rst (ROCm/rocm-docs)

> **注意**: ROCm 7.2.4 以前がインストール済みの場合は、先にアンインストールしてから進める（公式 note）。

## リポジトリ登録（Ubuntu 24.04 の例）

```sh
# Download and install GPG key
sudo mkdir --parents --mode=0755 /etc/apt/keyrings
wget https://stable.repo.amd.com/rocm/gpg/packages.gpg -O - | \
    gpg --dearmor | sudo tee /etc/apt/keyrings/amdrocm.gpg > /dev/null

sudo tee /etc/apt/sources.list.d/amdrocm-stable.sources << EOF
X-Repo-Id: amdrocm-stable
Types: deb
URIs: https://stable.repo.amd.com/rocm/core/packages/ubuntu2404/
Suites: stable
Components: main
Architectures: amd64
Signed-By: /etc/apt/keyrings/amdrocm.gpg
Enabled: yes
EOF

sudo apt update
```

`URIs` の `ubuntu2404` はディストリビューションに応じて読み替える（公式は `ubuntu2204` / `ubuntu2604` / `debian12` / `debian13` も記載）。

## カーネルドライバーの導入

AMD GPU Driver (amdgpu) は ROCm パッケージとは別に、AMD GPU Driver のドキュメント（Ubuntu native installation 等）の手順で導入する。互換性は Compatibility matrix を参照。

Ryzen APU 向けは Ubuntu の inbox カーネルドライバーを使用する。`amdgpu-install` 31.60.316000 は Radeon / Ryzen 向けの手順でのみ記載されている。

## ROCm パッケージの導入

```sh
sudo apt install amdrocm10.1
```

アーキテクチャ別のメタパッケージを使う場合は `amdrocm10.1-gfx942` のように gfx 名を付ける。

```sh
sudo apt install amdrocm10.1-gfx942
```

開発環境（ビルド用）は `amdrocm-core-dev10.1`、プロファイラーは `amdrocm-developer-tools10.1`、全部入りは `amdrocm-core-sdk10.1`（いずれも gfx 別は `-gfx942` 等を付与。RHEL 系の開発パッケージは `amdrocm-core-devel10.1`）。

## PATH の設定

```sh
export ROCM_PATH=/opt/rocm/core-10.1
export PATH=$PATH:$ROCM_PATH/bin
export LD_LIBRARY_PATH=$ROCM_PATH/lib
```

パッケージ版のインストール先は `/opt/rocm/core-10.1`（ASAN 版は `/opt/rocm/core-asan-10.1`）で、`/opt/rocm` 配下に後方互換の symlink が作成される（transition guide 記載）。公式 post-install の `ROCM_PATH` 例は tarball 展開先を指すため、パッケージ版では上記のとおり読み替える。

## インストール検証

```sh
rocminfo
amd-smi version
```

GPU agent が列挙され、`amd-smi version` に ROCm version 10.1.0 が表示されることを確認する。

## pip による導入（任意）

```sh
python -m pip install --index-url https://stable.repo.amd.com/rocm/whl-next/ "rocm[libraries,device-all]==10.1.0"
```

仮想環境（例: Ubuntu 24.04 では `python3.12 -m venv .venv` と `source .venv/bin/activate`）内で実行する。特定アーキのみの場合は `device-gfx950` / `device-gfx942` 等を指定する。`devel` パッケージを入れた場合は `rocm-sdk init`、確認は `rocm-sdk targets` と `rocm-sdk test`。

## アンインストール

> **警告**: 以下はインストール済みの ROCm スタック全体を削除する。稼働中のワークロードが依存していないことを確認してから実行すること。

```sh
sudo apt autoremove amdrocm10.1
```

アーキ別にインストールした場合は `amdrocm10.1-gfx942` のようにインストール時のパッケージ名を指定する。リポジトリ定義の削除は `sudo rm -f /etc/apt/sources.list.d/amdrocm-stable.sources`（公式手順）。
