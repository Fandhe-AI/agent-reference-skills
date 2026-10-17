---
source: https://kotlinlang.org/docs/multiplatform/compose-hot-reload.html
---

# Hot Reload

Compose Hot Reload の Gradle 関連コマンド。Compose Multiplatform 1.10.0 以降は desktop ターゲットを持つプロジェクトでプラグインが同梱・既定有効。

## MCP サーバーの起動

```sh
./gradlew --no-daemon --quiet --console=plain hotMcpServer
```

Compose Multiplatform 1.12.0 以降で Compose Hot Reload に組み込まれた MCP サーバー（Experimental）。MCP クライアントは `.mcp.json` の `command` に `./gradlew`、`args` に上記オプションと `hotMcpServer` を指定してこのタスクを起動する。

## ターゲットを限定した MCP サーバーの起動

```sh
./gradlew :<module>:hotMcpServer<Target>
```

複数の JVM ターゲットを持つモジュールでは完全修飾名で曖昧さを避ける。原文の例は `:app:hotMcpServerDesktop` と `:composeApp:hotMcpServerJvm`。

## 補足

- Hot Reload の実行自体は IDE の **Run 'desktopApp' with Compose Hot Reload** で行う手順のみが原文にあり、対応する Gradle コマンド行は記載が無いため収録しない。
