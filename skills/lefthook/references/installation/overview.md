# インストール概要

Source: https://lefthook.dev/install

## Lefthook について

Lefthook はスタンドアロンで依存関係のないバイナリとして配布される Git フックマネージャーです。Evil Martians によってメンテナンスされており、MIT ライセンスで配布されています。

## インストール方法一覧

### パッケージマネージャー経由

以下のパッケージマネージャーからインストールできます。

- **Ruby** (gem)
- **NPM** (Node.js)
- **Go**
- **Python** (pip / uv / pipx)
- **Swift** (SwiftPM / Mint)
- **Homebrew** (macOS / Linux)
- **Winget** (Windows)
- **Scoop** (Windows)
- **deb** (Debian / Ubuntu)
- **RPM** (CentOS / Fedora)
- **Alpine** (APK)
- **Arch Linux** (AUR)
- **Snap**
- **Devbox**
- **Mise**

### 手動インストール

パッケージマネージャーを使わずに直接インストールする場合は、[リリースページ](https://github.com/evilmartians/lefthook/releases/latest) からお使いの OS・アーキテクチャに対応したバイナリをダウンロードし、`$PATH` の通ったディレクトリに配置してください。

## セルフアップデート

インストール済みの Lefthook を最新版に更新するには、以下のコマンドを実行します。

```
lefthook self-update
```

## 主な機能

- フックの管理と実行戦略
- ファイルフィルタリングと glob パターン
- コマンドのパイプ処理と並列実行
- インストール・検証・管理のための CLI コマンド
- 環境変数によるカスタマイズ
- リモート設定のサポート

## リンク

- リポジトリ: https://github.com/evilmartians/lefthook
