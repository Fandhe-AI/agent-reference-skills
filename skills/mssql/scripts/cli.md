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

> **Warning**: `.mssql.json` stores the database password in plain text. Protect it as you would any other credential.

Add `.mssql.json` to `.gitignore` so credentials never enter source control:

```sh
echo '.mssql.json' >> .gitignore
```

Restrict the file to the owner:

```sh
chmod 600 .mssql.json
```

For CI, prefer a secret manager or a short-lived config file written at runtime instead of committing or persisting `.mssql.json`. Avoid passing `--password` on the command line: process arguments are visible to other users on the same machine (for example via `ps`) — use the config file or an environment variable instead.

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
