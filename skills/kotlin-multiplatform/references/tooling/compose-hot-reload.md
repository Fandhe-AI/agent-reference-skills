---
source: https://kotlinlang.org/docs/multiplatform/compose-hot-reload.html
---

# Compose Hot Reload

Compose Hot Reload applies code changes directly to the running Compose Multiplatform application, unlike Compose previews, which show isolated components with test data.

## Signature / Usage

For projects on Compose Multiplatform earlier than 1.10.0, add the plugin explicitly. Version catalog (`gradle/libs.versions.toml`):

```toml
composeHotReload = { id = "org.jetbrains.compose.hot-reload", version.ref = "composeHotReload"}
```

Parent project `build.gradle.kts`:

```kotlin
plugins {
    alias(libs.plugins.composeHotReload) apply false
}
```

Subproject containing the multiplatform application:

```kotlin
plugins { 
    alias(libs.plugins.composeHotReload)
}
```

Automatic JetBrains Runtime (JBR) provisioning, in `settings.gradle.kts`:

```kotlin
plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "1.2.0"
}
```

Desktop entry point used to try it out:

```kotlin
fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        alwaysOnTop = true,
        title = "composedemo",
    ) {
        App()
    }
}
```

## Options / Props

MCP server tools (Experimental, Compose Multiplatform 1.12.0+):

| Tool | Description |
|------|-------------|
| `reload` | Recompiles the project and hot-reloads the changed classes |
| `take_screenshot` | Captures the current state of an application window |
| `get_semantic_tree` | Returns the Compose semantic tree |
| `get_logs` | Returns recent log output from the running application, including runtime exceptions |
| `click`, `type_text`, `scroll` | Simulate user input |

The list is "including"; the full list of tools and parameters is in the Compose Hot Reload README on GitHub.

MCP client configuration (`.mcp.json`) running the `hotMcpServer` Gradle task:

```json
{
  "mcpServers": {
    "compose-hot-reload": {
      "command": "./gradlew",
      "args": [
        "--no-daemon",
        "--quiet",
        "--console=plain",
        "hotMcpServer"
      ]
    }
  }
}
```

## Notes

- Experimental: the MCP server for AI agents (built in since Compose Multiplatform 1.12.0).
- The bundled Compose Hot Reload Gradle plugin requires Kotlin 2.1.20+ and a JVM target compatible with Java 21 or earlier. Currently the desktop app is the sandbox; support for other targets is being explored.
- Since Compose Multiplatform 1.10.0 the plugin is bundled and enabled by default for all projects with a desktop target. You may still declare the plugin explicitly to use a specific older version.
- For full functionality install the Kotlin Multiplatform IDE plugin (IntelliJ IDEA 2025.2.2+ / Android Studio Otter 2025.2.1+).
- Creating a new project in the IDE with the Desktop target adds Compose Hot Reload automatically.
- The project must run on JetBrains Runtime (JBR), an OpenJDK fork with enhanced class redefinition. The latest JBR supports only Java 21: a project compatible only with Java 22 or newer fails with a linkage error.
- Run via the gutter action "Run 'desktopApp' with Compose Hot Reload". Saving all files reloads the UI; you can also use the assigned shortcut or the Reload UI button, and change the trigger in Settings | Tools | Compose Hot Reload.
- In `hotMcpServer`, Gradle matches the short name to variants such as `hotMcpServerJvm` or `hotMcpServerDesktop`. With multiple JVM targets use the fully qualified name `:<module>:hotMcpServer<Target>`, for example `:app:hotMcpServerDesktop` or `:composeApp:hotMcpServerJvm`.
- This MCP server is for coding agents working on your Compose app. It is unrelated to the MCP skills of the `openai-*` and `anthropic-*` families.

## Related

- [Build and run](./build-and-run.md)
- [Kotlin Toolchain](./kotlin-toolchain.md)
