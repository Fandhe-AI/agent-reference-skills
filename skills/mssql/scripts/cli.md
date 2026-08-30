---
source: https://tediousjs.github.io/node-mssql/#cli
---

# CLI

Setup and usage examples for the mssql CLI tool (the `mssql` command).

## Install the CLI tool globally

```sh
npm install -g mssql
```

If you want to add the `mssql` command to your path, you must install it globally.

## Create a configuration file (`.mssql.json`)

Create a `.mssql.json` configuration file (anywhere). Structure of the file is the same as the standard configuration object.

```json
{
    "user": "...",
    "password": "...",
    "server": "localhost",
    "database": "..."
}
```

## Run a query

```sh
echo "select * from mytable" | mssql /path/to/config
```

Results in:

```json
[[{"username":"patriksimek","password":"tooeasy"}]]
```

You can also query for multiple recordsets.

```sh
echo "select * from mytable; select * from myothertable" | mssql
```

Results in:

```json
[[{"username":"patriksimek","password":"tooeasy"}],[{"id":15,"name":"Product name"}]]
```

If you omit the config path argument, mssql will try to load it from the current working directory.

## Overriding config settings

You can override some config settings via CLI options: `--user`, `--password`, `--server`, `--database`, `--port`

```sh
echo "select * from mytable" | mssql /path/to/config --database anotherdatabase
```

Results in:

```json
[[{"username":"onotheruser","password":"quiteeasy"}]]
```
