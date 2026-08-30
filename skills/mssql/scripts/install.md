---
source: https://tediousjs.github.io/node-mssql/#installation
---

# Installation

Install commands for the mssql (node-mssql) package. There are two supported TDS drivers: Tedious (default) and MSNodeSQLv8 (optional).

## Install the Tedious driver (default)

```sh
npm install mssql
```

Tedious is a pure JavaScript implementation supporting Windows / macOS / Linux, and is included by default.

## Install the MSNodeSQLv8 driver (optional)

```sh
npm install mssql msnodesqlv8
```

MSNodeSQLv8 is a Node V8 native driver (v2-v5) by Microsoft / Contributors, supporting only Windows or Linux/macOS 64bit.

## SQL Server prerequisites

This package requires TCP/IP to connect to SQL Server, and you may need to enable this in your installation.
