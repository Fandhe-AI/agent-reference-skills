# install

パッケージマネージャー別の Lefthook インストールコマンド。

## Node.js (npm)

```sh
npm install --save-dev lefthook
```

## Node.js (yarn)

```sh
yarn add --dev lefthook
```

## Node.js (pnpm)

```sh
pnpm add -D lefthook
```

pnpm を使う場合は `pnpm-workspace.yaml` の `onlyBuiltDependencies` または `package.json` の `pnpm.onlyBuiltDependencies` に `lefthook` を追加し、postinstall が正しく動作するよう設定すること。

## Homebrew (macOS / Linux)

```sh
brew install lefthook
```

## Ruby (gem)

```sh
gem install lefthook
```

Gemfile 経由でプロジェクトに追加する場合:

```sh
bundle add lefthook --group development
```

## Go

```sh
go install github.com/evilmartians/lefthook/v2@latest
```

Go ツール依存としてプロジェクトに追加する場合:

```sh
go get -tool github.com/evilmartians/lefthook/v2
```

## Python (pip)

```sh
python -m pip install --user lefthook
```

## Python (uv)

```sh
uv add --dev lefthook
```

## Python (pipx)

```sh
pipx install lefthook
```

## Winget (Windows)

```sh
winget install evilmartians.lefthook
```

## Scoop (Windows)

```sh
scoop install lefthook
```

## Snap (Linux)

```sh
snap install --classic lefthook
```

## Alpine Linux (apk)

```sh
sudo apk add --no-cache bash curl
curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.alpine.sh' | sudo -E bash
sudo apk add lefthook
```

## Debian / Ubuntu (apt)

```sh
curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.deb.sh' | sudo -E bash
sudo apt install lefthook
```

## CentOS / Fedora (yum)

```sh
curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.rpm.sh' | sudo -E bash
sudo yum install lefthook
```

## Mise

```sh
mise use lefthook@latest
```

## Devbox

```sh
devbox add lefthook@latest
```
