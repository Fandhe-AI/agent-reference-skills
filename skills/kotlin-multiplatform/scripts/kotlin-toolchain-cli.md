---
source: https://kotlinlang.org/docs/multiplatform/kotlin-toolchain.html
---

# Kotlin Toolchain CLI

Kotlin Toolchain（Alpha、`kotlinToolchainVersion` 0.13）の CLI によるインストール・プロジェクト作成・実行コマンド。

> **警告**: インストーラースクリプトは `curl ... | sh` / `irm ... | iex` でリモートスクリプトを直接実行する。内容を確認できる環境・使い捨て環境で実行する。

## SDKMAN! によるインストール

```sh
sdk install kotlintoolchain
```

## インストーラースクリプトによるインストール（macOS / Linux）

```sh
curl -fsSL https://kotl.in/install.sh | sh

# Restart your terminal or run this command
# to make 'kotlin' available
exec $SHELL
```

## インストーラースクリプトによるインストール（Windows）

```sh
powershell -ExecutionPolicy ByPass -c "irm 'https://kotl.in/install.ps1' | iex"
```

## CLI の確認

```sh
kotlin --version
```

## プロジェクトの作成

```sh
kotlin new
```

対話形式でプロジェクトパス・テンプレート（**Compose Multiplatform application** 等）・ターゲット・プロジェクト ID を指定する。

## プロジェクトの実行

```sh
kotlin run
```

実行可能なモジュールの一覧が表示される。

## モジュールを指定した実行

```sh
# Build and run the desktop JVM app
kotlin run -m desktopApp
```

`-m`（`--module`）でモジュールを直接指定する。
