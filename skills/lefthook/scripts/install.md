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
# Step 1 - download to an exclusive temp file and print it for review. Nothing is executed here;
# if any step fails the temp file is removed and the chain stops.
setup="$(mktemp "${TMPDIR:-/tmp}/lefthook-setup.alpine.XXXXXX")" \
  && curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.alpine.sh' -o "${setup}" \
  && cat "${setup}" \
  || { rm -f -- "${setup:-}"; unset setup; echo "download failed; nothing was executed" >&2; false; }
```

Read the script printed above. Run the next block only if you have reviewed it and decided to proceed — it is a separate step so that copying the block above never executes anything.

```sh
# Step 2 - only after you have read the script above and decided to proceed, run it as root yourself.
# The temp file is removed afterwards; the final status is the setup script's own exit status;
# the package install below runs only if the repository setup succeeded.
if [ -s "${setup:-}" ]; then
  sudo -E bash "${setup}"; status=$?; rm -f -- "${setup}"; unset setup
else
  echo "no downloaded setup script to run (Step 1 failed or was not run)" >&2; status=1
fi
(exit "${status}") && sudo apk add lefthook
```

## Debian / Ubuntu (apt)

```sh
# Step 1 - download to an exclusive temp file and print it for review. Nothing is executed here;
# if any step fails the temp file is removed and the chain stops.
setup="$(mktemp "${TMPDIR:-/tmp}/lefthook-setup.deb.XXXXXX")" \
  && curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.deb.sh' -o "${setup}" \
  && cat "${setup}" \
  || { rm -f -- "${setup:-}"; unset setup; echo "download failed; nothing was executed" >&2; false; }
```

Read the script printed above. Run the next block only if you have reviewed it and decided to proceed — it is a separate step so that copying the block above never executes anything.

```sh
# Step 2 - only after you have read the script above and decided to proceed, run it as root yourself.
# The temp file is removed afterwards; the final status is the setup script's own exit status;
# the package install below runs only if the repository setup succeeded.
if [ -s "${setup:-}" ]; then
  sudo -E bash "${setup}"; status=$?; rm -f -- "${setup}"; unset setup
else
  echo "no downloaded setup script to run (Step 1 failed or was not run)" >&2; status=1
fi
(exit "${status}") && sudo apt install lefthook
```

## CentOS / Fedora (yum)

```sh
# Step 1 - download to an exclusive temp file and print it for review. Nothing is executed here;
# if any step fails the temp file is removed and the chain stops.
setup="$(mktemp "${TMPDIR:-/tmp}/lefthook-setup.rpm.XXXXXX")" \
  && curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.rpm.sh' -o "${setup}" \
  && cat "${setup}" \
  || { rm -f -- "${setup:-}"; unset setup; echo "download failed; nothing was executed" >&2; false; }
```

Read the script printed above. Run the next block only if you have reviewed it and decided to proceed — it is a separate step so that copying the block above never executes anything.

```sh
# Step 2 - only after you have read the script above and decided to proceed, run it as root yourself.
# The temp file is removed afterwards; the final status is the setup script's own exit status;
# the package install below runs only if the repository setup succeeded.
if [ -s "${setup:-}" ]; then
  sudo -E bash "${setup}"; status=$?; rm -f -- "${setup}"; unset setup
else
  echo "no downloaded setup script to run (Step 1 failed or was not run)" >&2; status=1
fi
(exit "${status}") && sudo yum install lefthook
```

## Mise

```sh
mise use lefthook@latest
```

## Devbox

```sh
devbox add lefthook@latest
```
