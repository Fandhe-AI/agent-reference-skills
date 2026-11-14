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

- 取得日: 2026-11-14。editorconfig-checker は最新リリース v4.0.2（`0adfdb0`）、editorconfig-core-js は v4.0.0（`63b38ab`）の README に基づく。
- Migration (v3 → v4): editorconfig-checker の Go モジュールパスは `/v3/` から `/v4/` に変わった。旧パス `.../v3/cmd/editorconfig-checker@latest` は v3 系列のモジュールを指す。
- Docker イメージは README がバージョン付きタグを案内している（`ghcr.io/editorconfig-checker/editorconfig-checker:4.0.2` または `mstruebing/editorconfig-checker:4.0.2`）。
- npm / Yarn / PHP Composer / pip は README の言語別ラッパー（npm package / PyPI package / Composer package）で、各パッケージのドキュメントを参照する。
- Source: https://github.com/editorconfig-checker/editorconfig-checker/blob/v4.0.2/README.md （取得日 2026-11-14）
- Source: https://github.com/editorconfig/editorconfig-core-js/blob/v4.0.0/README.md （取得日 2026-11-14）

## Related

- [validate](./validate.md) — editorconfig-checker の実行
