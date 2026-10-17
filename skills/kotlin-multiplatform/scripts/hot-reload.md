---
source: https://kotlinlang.org/docs/multiplatform/compose-hot-reload.html
---

# Hot Reload

Gradle-related commands for Compose Hot Reload. From Compose Multiplatform 1.10.0, the plugin is bundled and enabled by default in projects with a desktop target.

## Start the MCP server

```sh
./gradlew --no-daemon --quiet --console=plain hotMcpServer
```

MCP server built into Compose Hot Reload from Compose Multiplatform 1.12.0 (Experimental). An MCP client starts this task by setting `command` to `./gradlew` and `args` to the options above plus `hotMcpServer` in `.mcp.json`.

## Start the MCP server for a specific target

```sh
./gradlew :<module>:hotMcpServer<Target>
```

In modules with multiple JVM targets, use the fully qualified name to avoid ambiguity. The official examples are `:app:hotMcpServerDesktop` and `:composeApp:hotMcpServerJvm`.

## Notes

- Running Hot Reload itself is documented only as the IDE action **Run 'desktopApp' with Compose Hot Reload**; no matching Gradle command line is given, so none is included.
