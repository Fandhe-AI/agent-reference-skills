# Manual Installation

Source: https://biomejs.dev/installation/install-biome

Biome は npm パッケージと standalone 実行ファイルで配布される。プロジェクトに package manager があるならそれでインストールし、Node.js を使わない場合（または Biome のためだけに `package.json` が必要になる場合）は standalone を使う。

## Package manager

`@biomejs/biome` を開発依存としてインストール。`-E` で exact version を固定（全員と CI が同じ版を使うため）。

```bash
npm i -D -E @biomejs/biome
pnpm add -D -E @biomejs/biome
yarn add -D -E @biomejs/biome
bun add -D -E @biomejs/biome
deno add -D npm:@biomejs/biome
```

## Standalone executable

Node.js 不要。インストール後は `biome` として直接実行する。

### サポートプラットフォーム

| Platform     | `arm64`                        | `x64`            |
|--------------|--------------------------------|------------------|
| Windows      | `win32-arm64`                  | `win32-x64`      |
| macOS        | `darwin-arm64` (Apple silicon) | `darwin-x64`     |
| Linux        | `linux-arm64`                  | `linux-x64`      |
| Linux (musl) | `linux-arm64-musl`             | `linux-x64-musl` |

WSL 内では Linux 版を使う。

### Homebrew（macOS / Linux）

```bash
brew install biome
```

### Winget（Windows、コミュニティ保守）

```bash
winget install biomejs.biome
```

### Arch Linux（pacman、extra リポジトリ、コミュニティ保守）

```bash
pacman -S biome
```

`extra` は `/etc/pacman.conf` で既定有効。無効なら `[extra]` と `Include = /etc/pacman.d/mirrorlist` のコメントを外す。

### Docker

公式イメージは `amd64` / `arm64`。タグはメジャー・マイナー・パッチごとに存在: `ghcr.io/biomejs/biome:{major}` / `:{major}.{minor}` / `:{major}.{minor}.{patch}`。作業ディレクトリは `/code`。

```bash
docker run -v $(pwd):/code ghcr.io/biomejs/biome check
docker run -v $(pwd):/code ghcr.io/biomejs/biome check --write
```

### GitHub release

GitHub の [latest release](https://github.com/biomejs/biome/releases) からプラットフォーム用バイナリをダウンロードし、実行権限を付与する（URL 形式: `https://github.com/biomejs/biome/releases/download/@biomejs/biome@<version>/biome-<platform>`、Windows は `.exe`）。

```bash
# macOS (Apple silicon)
curl -L https://github.com/biomejs/biome/releases/download/@biomejs/biome@2.5.15/biome-darwin-arm64 -o biome
chmod +x biome
```

`./biome` として実行するか、`PATH` 上のディレクトリへ移動して `biome` として実行する。

## Upgrade Biome

- package manager でインストールした場合: 同じ package manager で最新版を、版を固定して入れる

```bash
npm i -D -E @biomejs/biome@latest
```

- standalone の場合: `biome upgrade`（Homebrew か単体バイナリかを自動検出）。検出が誤る場合は環境変数 `BIOME_DISTRIBUTION`（`npm` / `homebrew` / `standalone`）を設定
- Winget / pacman でインストールした場合は、そのツールで更新する
- メジャーアップグレード後は `biome migrate` で必要な設定変更を確認し、`biome migrate --write` で適用

## Notes

- 公式の `/guides/manual-installation` は `/installation/install-biome` へリダイレクトされる
