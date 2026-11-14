# Install

KiCad をプラットフォーム別にインストールする。

## Ubuntu へのインストール

```sh
sudo add-apt-repository ppa:kicad/kicad-10.0-releases
sudo apt update
sudo apt install kicad
```

PPA から KiCad 10.0 系の最新リリースをインストールする。Linux Mint でも同じコマンドが利用できる。

## Debian へのインストール

```sh
sudo apt install kicad
```

## Fedora へのインストール

```sh
dnf install kicad kicad-packages3d kicad-doc
```

3D パッケージとドキュメントを同時にインストールする。

## Fedora (Copr リポジトリ経由)

```sh
dnf install dnf-plugins-core
dnf copr enable @kicad/kicad-stable
dnf install kicad kicad-packages3d kicad-doc
```

## Arch Linux へのインストール

```sh
sudo pacman -Syu kicad
sudo pacman -Syu --asdeps kicad-library kicad-library-3d
```

非公式サポート。ライブラリは任意だが推奨。

## Flatpak でのインストール

```sh
flatpak install --from https://flathub.org/repo/appstream/org.kicad.KiCad.flatpakref
```

ディストリビューション非依存のインストール方法。

## openSUSE へのインストール

```sh
zypper install kicad
```

## FreeBSD へのインストール

```sh
pkg install kicad
```

## Gentoo へのインストール

```sh
emerge sci-electronics/kicad
```

## Guix へのインストール

```sh
guix install kicad
```

## macOS・Windows

インストーラーを公式ダウンロードページから取得してインストールする。
参照: https://www.kicad.org/download/
