# Manual Installation

Source: https://biomejs.dev/guides/manual-installation

## Node.js/npm なしでのインストール方法

npm を使わずに Biome をインストールする方法。

### Homebrew

```bash
brew install biome
```

### Docker

```bash
docker run -v $(pwd):/code ghcr.io/biomejs/biome lint
```

### バイナリ直接ダウンロード

GitHub Releases からプラットフォームに合ったバイナリを直接ダウンロードできる。

https://github.com/biomejs/biome/releases

## サポートプラットフォーム

| CPU   | Windows      | macOS        | Linux       | Linux (musl)     |
|-------|--------------|--------------|-------------|------------------|
| arm64 | win32-arm64  | darwin-arm64 | linux-arm64 | linux-arm64-musl |
| x64   | win32-x64    | darwin-x64   | linux-x64   | linux-x64-musl   |
