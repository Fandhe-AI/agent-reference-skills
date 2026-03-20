# Go でのインストール

Source: https://lefthook.dev/installation/go

## 前提条件

Go でのインストールには、Go バージョン 1.26 以上が必要です。

## インストール方法

### グローバルインストール

Go パッケージとしてシステム全体にインストールする場合は、以下のコマンドを実行します。

```
go install github.com/evilmartians/lefthook/v2@v2.1.4
```

この方法では、どのプロジェクトからでもツールを使用できるようになります。

### プロジェクトレベルのツールインストール

特定のプロジェクト内にツール依存として追加する場合は、以下のコマンドを使用します。

```
go get -tool github.com/evilmartians/lefthook/v2
```

この方法では、プロジェクトのツールチェーンにスコープが限定されます。

## バージョン情報

上記のインストール例では Lefthook v2.1.4 を参照しています。最新バージョンについては [GitHub リリースページ](https://github.com/evilmartians/lefthook/releases/latest) を確認してください。
