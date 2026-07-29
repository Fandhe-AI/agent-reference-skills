# install

ROCm repository setup, amdgpu-dkms/rocm meta-package installation, and PATH/group verification on Linux. These are AMD ROCm commands (amdgpu-install, amd-smi), not the same-named NVIDIA CUDA toolchain; the NVIDIA equivalent is covered by the separate nvidia-cuda skill. Source: install-on-linux/quick-start

## リポジトリ登録（Ubuntu 24.04 の例）

```sh
wget https://repo.radeon.com/amdgpu-install/7.2.4/ubuntu/noble/amdgpu-install_7.2.4.70204-1_all.deb
sudo apt install ./amdgpu-install_7.2.4.70204-1_all.deb
sudo apt update
```

バージョン・codename はディストリビューションに応じて読み替える。`noble` は Ubuntu 24.04 の codename。

## カーネルドライバー・ROCm メタパッケージの導入

```sh
sudo apt install "linux-headers-$(uname -r)" "linux-modules-extra-$(uname -r)"
sudo apt install amdgpu-dkms
sudo apt install python3-setuptools python3-wheel
sudo apt install rocm
```

## GPU アクセス権の設定

```sh
sudo usermod -a -G render,video $LOGNAME
```

現在のユーザーを `render` / `video` グループに追加する。反映にはログアウト・再ログイン、または再起動が必要。

## PATH の設定

```sh
export PATH=$PATH:/opt/rocm-7.2.4/bin
export LD_LIBRARY_PATH=/opt/rocm-7.2.4/lib
```

`/opt/rocm-7.2.4` はインストールしたバージョンに応じて読み替える。多くの環境では `/opt/rocm`（symlink）も利用できる。

## インストール検証

```sh
rocminfo
rocminfo | grep -i "Marketing Name:"
amd-smi version
```

再起動後にこれらを実行し、GPU agent が列挙されバージョン情報が表示されることを確認する。

## アンインストール

> **警告**: 以下はインストール済みの ROCm スタック全体を削除する。稼働中のワークロードが依存していないことを確認してから実行すること。

```sh
sudo apt purge rocm amdgpu-dkms
sudo apt autoremove
```

`apt purge` にはインストール時に指定したパッケージ名（`rocm` / `amdgpu-dkms`）をそのまま渡す。
