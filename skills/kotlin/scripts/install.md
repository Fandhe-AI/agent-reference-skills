---
source: https://kotlinlang.org/docs/command-line.html
---

# Install

Kotlin コマンドラインコンパイラのインストール手順。IDE 利用時はコンパイラ単体のインストールは不要（取得日 2026-10-16、Kotlin 2.4.21）。

## IDE での利用

Kotlin is included in each IntelliJ IDEA and Android Studio release. Download and install one of these IDEs to start using Kotlin.

```sh
# IDE にはコマンドは不要。公式の入口: https://kotlinlang.org/docs/getting-started.html
```

Installing the command-line compiler is not an essential step to use Kotlin. IDE ダウンロード先は https://www.jetbrains.com/idea/download/ と https://developer.android.com/studio。

## コンパイラの手動インストール

```sh
# 1. GitHub Releases から kotlin-compiler-2.4.21.zip をダウンロード
#    https://github.com/JetBrains/kotlin/releases/tag/v2.4.21
# 2. 任意のディレクトリへ展開し、必要なら kotlinc/bin をシステムパスへ追加
```

`bin` ディレクトリに Windows / macOS / Linux 用のスクリプトが含まれる。Windows でコマンドラインコンパイラを使う場合は手動インストールが推奨されている。

## SDKMAN! でのインストール

```sh
sdk install kotlin
```

UNIX 系（macOS / Linux / Cygwin / FreeBSD / Solaris）、Bash・ZSH 向け。事前に SDKMAN! 自体のインストールが必要（https://sdkman.io/install）。

## Homebrew でのインストール

```sh
brew update
brew install kotlin
```

macOS 向け。

## Snap でのインストール

> **警告**: `sudo` でシステムへパッケージをインストールする。使い捨て環境（コンテナ・VM）での実行を前提とする。

```sh
sudo snap install --classic kotlin
```

Ubuntu 16.04 以降で Snap を使う場合。
