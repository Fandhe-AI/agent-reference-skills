# Install

ZMK CLI および依存ツールのインストール手順。

## 前提ツールの確認（Git）

```sh
git --version
```

Git が未インストールの場合は https://git-scm.com/install/ からインストールする。

## GitHub CLI 認証

```sh
gh auth login
```

GitHub CLI は https://cli.github.com/ から入手する。

## uv パッケージマネージャーのインストール（Linux / macOS）

```sh
curl -LsSf https://astral.sh/uv/install.sh | sh
```

curl が使用できない Linux 環境では以下を使用する:

```sh
wget -qO- https://astral.sh/uv/install.sh | sh
```

## uv パッケージマネージャーのインストール（Windows）

```sh
winget install --id astral-sh.uv -e --source winget
```

## ZMK CLI のインストール

```sh
uv tool install zmk
```

## ZMK CLI バージョン確認

```sh
zmk --version
```

## ZMK CLI のアップグレード

```sh
uv tool upgrade zmk
```

## pipx から uv への移行

```sh
python3 -m pipx uninstall zmk
uv tool install zmk
uv tool update-shell
```
