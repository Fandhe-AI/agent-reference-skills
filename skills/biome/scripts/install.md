# install

Biome をプロジェクトまたはシステムにインストールするコマンド集。

## npm でのインストール

```sh
npm install -D -E @biomejs/biome
```

`-E` フラグでバージョンを固定することを推奨。

## pnpm でのインストール

```sh
pnpm add -D -E @biomejs/biome
```

## yarn でのインストール

```sh
yarn add -D -E @biomejs/biome
```

## bun でのインストール

```sh
bun add -D -E @biomejs/biome
```

## deno でのインストール

```sh
deno add -D npm:@biomejs/biome
```

## Homebrew でのインストール（macOS / Linux）

```sh
brew install biome
```

## winget でのインストール（Windows）

```sh
winget install biomejs.biome
```

## Arch Linux でのインストール

```sh
pacman -S biome
```

## Docker イメージのタグ

```text
ghcr.io/biomejs/biome:{major}
ghcr.io/biomejs/biome:{major}.{minor}
ghcr.io/biomejs/biome:{major}.{minor}.{patch}
```

`amd64` / `arm64` 対応。メジャー・マイナー・パッチ各バージョンのタグが存在する。実行例は docker.md を参照。

## パッケージマネージャーでのアップグレード

```sh
npm i -D -E @biomejs/biome@latest
```

pnpm / yarn / bun は `add -D -E @biomejs/biome@latest`、deno は `deno add -D npm:@biomejs/biome@latest`。メジャーアップグレード後は `biome migrate` で設定変更を確認し、`--write` で適用する。

## スタンドアロンバイナリのアップグレード

```sh
biome upgrade
```

Homebrew 経由かスタンドアロンかを自動判定する。誤判定時は環境変数 `BIOME_DISTRIBUTION`（`npm` / `homebrew` / `standalone`）で上書きする。Winget・pacman でインストールした場合は各ツールで更新する。

## バイナリを直接ダウンロード（macOS ARM64）

```sh
curl -L https://github.com/biomejs/biome/releases/download/@biomejs/biome@2.5.15/biome-darwin-arm64 -o biome
chmod +x biome
```

## バイナリを直接ダウンロード（Linux x86_64）

```sh
curl -L https://github.com/biomejs/biome/releases/download/@biomejs/biome@2.5.15/biome-linux-x64 -o biome
chmod +x biome
```

## バイナリを直接ダウンロード（Windows x86_64、PowerShell）

```powershell
Invoke-WebRequest -Uri "https://github.com/biomejs/biome/releases/download/@biomejs/biome@2.5.15/biome-win32-x64.exe" -OutFile "biome.exe"
```

URL 中のバージョン（`2.5.15`）は取得時点の最新 stable。他プラットフォームは `darwin-x64` / `linux-arm64` / `linux-x64-musl` / `linux-arm64-musl` / `win32-arm64` が存在する。
