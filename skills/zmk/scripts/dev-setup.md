# Dev Setup

ZMK ローカル開発環境のセットアップコマンド（ネイティブ環境・コンテナ環境）。

## ネイティブセットアップ

### ZMK リポジトリのクローン

```sh
git clone https://github.com/zmkfirmware/zmk.git
cd zmk
```

### Python 仮想環境の作成（Linux / macOS）

```sh
python3 -m venv .venv
source .venv/bin/activate
```

### Python 仮想環境の作成（Ubuntu/Linux、venv 未インストール時）

```sh
sudo apt install python3-venv
python3 -m venv .venv
source .venv/bin/activate
```

### Python 仮想環境の作成（Windows PowerShell）

```sh
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### west のインストールと Zephyr ワークスペースの初期化

```sh
pip install west
west init -l app
west update
west zephyr-export
west packages pip --install
```

### west のグローバルインストール（macOS）

```sh
pip3 install -U west
```

### west のグローバルインストール（Linux）

```sh
pip3 install --user -U west
```

### Raspberry Pi OS 向けクロスコンパイラのインストール

```sh
sudo apt install gcc-arm-none-eabi
```

Zephyr SDK の追加インストール手順は https://docs.zephyrproject.org/latest/develop/getting_started/index.html を参照する。

---

## コンテナセットアップ

### ZMK リポジトリのクローン

```sh
git clone https://github.com/zmkfirmware/zmk.git
```

### zmk-config 用 Docker ボリュームの作成

```sh
docker volume create --driver local -o o=bind -o type=none \
  -o device="/absolute/path/to/zmk-config/" zmk-config
```

### モジュール用 Docker ボリュームの作成

```sh
docker volume create --driver local -o o=bind -o type=none \
  -o device="/absolute/path/to/zmk-modules/parent/" zmk-modules
```

### 実行中コンテナへの接続

```sh
docker ps
docker exec -w /workspaces/zmk -it <container_id> /bin/bash
```

### devcontainer CLI を使用したコンテナ起動

```sh
devcontainer up --workspace-folder "/absolute/path/to/zmk"
```

### Podman でのコンテナビルドと起動

```sh
podman build -t <container-name> -f Dockerfile /path/to/.devcontainer
```

```sh
podman run -it --rm \
  --security-opt label=disable \
  --workdir /workspaces/zmk \
  -v /path/to/zmk:/workspaces/zmk \
  -v /path/to/zmk-config:/workspaces/zmk-config \
  -v /path/to/zmk-modules:/workspaces/zmk-modules \
  -p 3000:3000 \
  <container-name> /bin/bash
```

### コンテナ内での Zephyr ワークスペース更新

```sh
west init -l app/
west update
```
