---
source: https://tediousjs.github.io/node-mssql/#cli
---

# CLI

mssql CLI ツール（`mssql` コマンド）のセットアップと実行例。

## CLI ツールのグローバルインストール

```sh
npm install -g mssql
```

パスに `mssql` コマンドを追加したい場合はグローバルインストールが必要。

## 設定ファイル (`.mssql.json`) の作成

`.mssql.json` という設定ファイルを任意の場所に作成する。構造は標準の configuration object と同じ。

```json
{
    "user": "...",
    "password": "...",
    "server": "localhost",
    "database": "..."
}
```

## クエリの実行例

```sh
echo "select * from mytable" | mssql /path/to/config
```

Results in:

```json
[[{"username":"patriksimek","password":"tooeasy"}]]
```

複数の recordset をまとめてクエリすることもできる。

```sh
echo "select * from mytable; select * from myothertable" | mssql
```

Results in:

```json
[[{"username":"patriksimek","password":"tooeasy"}],[{"id":15,"name":"Product name"}]]
```

config path 引数を省略した場合、mssql はカレントワーキングディレクトリから読み込みを試みる。

## 設定値の上書き (Overriding config settings)

以下の CLI オプションで一部の設定値を上書きできる: `--user`, `--password`, `--server`, `--database`, `--port`

```sh
echo "select * from mytable" | mssql /path/to/config --database anotherdatabase
```

Results in:

```json
[[{"username":"onotheruser","password":"quiteeasy"}]]
```
