---
source: https://tediousjs.github.io/node-mssql/#installation
---

# Installation

mssql (node-mssql) パッケージのインストールコマンド集。TDS ドライバーは Tedious（デフォルト）と MSNodeSQLv8（任意）の 2 種類。

## Tedious driver (default) のインストール

```sh
npm install mssql
```

Tedious は純 JavaScript 実装で Windows / macOS / Linux をサポートする。デフォルトで同梱される。

## MSNodeSQLv8 driver (optional) のインストール

```sh
npm install mssql msnodesqlv8
```

MSNodeSQLv8 は Microsoft / Contributors 製の Node V8 ネイティブドライバー（v2-v5）で、Windows または Linux/macOS 64bit のみをサポートする。

## SQL Server prerequisites

This package requires TCP/IP to connect to SQL Server, and you may need to enable this in your installation.

接続先 SQL Server 側で TCP/IP が有効化されている必要がある（インストーラーの設定で無効になっている場合がある）。
