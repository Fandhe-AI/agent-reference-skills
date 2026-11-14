# Install

EditorConfig コアライブラリおよびチェックツールのインストール。

## Signature / Usage

### editorconfig-core-js のインストール（npm）

```sh
npm install editorconfig
```

### editorconfig-core-js のグローバルインストール（npm）

```sh
npm install -g editorconfig
```

### editorconfig-checker のインストール（npm・開発依存）

```sh
npm install --save-dev editorconfig-checker
```

### editorconfig-checker のインストール（Yarn・開発依存）

```sh
yarn add --dev editorconfig-checker
```

### editorconfig-checker のインストール（Go）

```sh
go install github.com/editorconfig-checker/editorconfig-checker/v4/cmd/editorconfig-checker@latest
```

### editorconfig-checker のインストール（Homebrew）

```sh
brew install editorconfig-checker
```

### editorconfig-checker のインストール（Nix）

```sh
nix-env -iA nixpkgs.editorconfig-checker
```

### editorconfig-checker のインストール（Arch Linux）

```sh
pacman -S editorconfig-checker
```

### editorconfig-checker のインストール（mise）

```sh
mise use -g editorconfig-checker@latest
```

### editorconfig-checker のインストール（PHP Composer・開発依存）

```sh
composer require --dev editorconfig-checker
```

### editorconfig-checker（Python・pip）

```sh
pip install editorconfig-checker
```

## Notes

- Based on the READMEs of editorconfig-checker v4.0.2 (`0adfdb0`, latest release) and editorconfig-core-js v4.0.0 (`63b38ab`), fetched 2026-11-14.
- Migration (v3 → v4): the editorconfig-checker Go module path changed from `/v3/` to `/v4/`; the old path `.../v3/cmd/editorconfig-checker@latest` refers to the v3 module line.
- The README gives Docker images with a version tag (`ghcr.io/editorconfig-checker/editorconfig-checker:4.0.2` or `mstruebing/editorconfig-checker:4.0.2`).
- npm / Yarn / PHP Composer / pip are the README's language-specific wrappers (npm package / PyPI package / Composer package); see each package's documentation.
- Source: https://github.com/editorconfig-checker/editorconfig-checker/blob/v4.0.2/README.md (fetched 2026-11-14)
- Source: https://github.com/editorconfig/editorconfig-core-js/blob/v4.0.0/README.md (fetched 2026-11-14)

## Related

- [validate](./validate.md) — Running editorconfig-checker
