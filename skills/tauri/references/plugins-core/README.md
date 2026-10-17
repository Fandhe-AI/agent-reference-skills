# plugins-core

| Name | Description | Path |
|------|-------------|------|
| Command Line Interface (CLI) plugin | Gives your Tauri app a command line interface through clap. | [cli.md](./cli.md) |
| File System | Access the file system from the frontend (`@tauri-apps/plugin-fs`) with path-traversal protection and scope-based permissions. | [file-system.md](./file-system.md) |
| HTTP Client | Make HTTP requests with the http plugin: a `fetch` API in JavaScript and a `reqwest` re-export in Rust. | [http-client.md](./http-client.md) |
| Localhost | Expose your app's assets through a localhost server instead of the default custom protocol. | [localhost.md](./localhost.md) |
| Logging | Configurable logging for your Tauri app, from Rust (the `log` crate) and from the frontend. | [logging.md](./logging.md) |
| Opener | Open files and URLs in a specified, or the default, application. Also supports "revealing" files in the system's file explorer. | [opener.md](./opener.md) |
| OS Information | Read information about the operating system using the OS Information plugin. | [os-info.md](./os-info.md) |
| Features & Recipes (plugin index) | Lists the official plugins (built-in features), community resources, and the platform support table. | [overview.md](./overview.md) |
| Persisted Scope | Save filesystem and asset scopes and restore them when the app is reopened. | [persisted-scope.md](./persisted-scope.md) |
| Process | APIs to access the current process: exit and restart the application. | [process.md](./process.md) |
| Shell | Access the system shell. Allows you to spawn child processes. | [shell.md](./shell.md) |
| SQL | Plugin providing an interface for the frontend to communicate with SQL databases through sqlx. | [sql.md](./sql.md) |
| Store | Persistent key-value store that saves state to a file, between app restarts. | [store.md](./store.md) |
| Stronghold | Store secrets and keys using the IOTA Stronghold secret management engine. | [stronghold.md](./stronghold.md) |
| Upload | Upload files from disk to a remote server over HTTP. | [upload.md](./upload.md) |
| Websocket | Open a WebSocket connection using a Rust client in JavaScript. | [websocket.md](./websocket.md) |
