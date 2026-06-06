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

## バイナリを直接ダウンロード（macOS ARM64）

```sh
curl -L https://github.com/biomejs/biome/releases/download/@biomejs/biome@2.4.16/biome-darwin-arm64 -o biome
chmod +x biome
```

## バイナリを直接ダウンロード（Linux x86_64）

```sh
curl -L https://github.com/biomejs/biome/releases/download/@biomejs/biome@2.4.16/biome-linux-x64 -o biome
chmod +x biome
```

## バイナリを直接ダウンロード（Windows x86_64、PowerShell）

```powershell
Invoke-WebRequest -Uri "https://github.com/biomejs/biome/releases/download/@biomejs/biome@2.4.16/biome-win32-x64.exe" -OutFile "biome.exe"
```
