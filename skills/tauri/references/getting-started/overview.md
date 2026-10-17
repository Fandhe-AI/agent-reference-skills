---
source: https://v2.tauri.app/start/
---

# What is Tauri?

Tauri is a framework for building tiny, fast binaries for all major desktop and mobile platforms. Developers can integrate any frontend framework that compiles to HTML, JavaScript, and CSS for building their user experience while leveraging languages such as Rust, Swift, and Kotlin for backend logic when needed.

## Signature / Usage

Get started with `create-tauri-app` (follow the prerequisites guide first):

```sh
npm create tauri-app@latest
```

After creating the app, see Project Structure to understand what each file does.

### Why Tauri?

- Secure foundation for building apps
- Smaller bundle size by using the system's native webview
- Flexibility for developers to use any frontend and bindings for multiple languages

### Secure Foundation

By being built on Rust, Tauri is able to take advantage of the memory, thread, and type-safety offered by Rust. Apps built on Tauri can automatically get those benefits even without needing to be developed by Rust experts.

Tauri also undergoes a security audit for major and minor releases. This not only covers code in the Tauri organization, but also for upstream dependencies that Tauri relies on.

### Smaller App Size

Tauri apps take advantage of the web view already available on every user's system. A Tauri app only contains the code and assets specific for that app and doesn't need to bundle a browser engine with every app. This means that a minimal Tauri app can be less than 600KB in size.

### Flexible Architecture

Since Tauri uses web technologies that means that virtually any frontend framework is compatible with Tauri.

Bindings between JavaScript and Rust are available to developers using the `invoke` function in JavaScript and Swift and Kotlin bindings are available for Tauri Plugins.

[TAO](https://github.com/tauri-apps/tao) is responsible for Tauri window creation and [WRY](https://github.com/tauri-apps/wry) is responsible for web view rendering. These are libraries maintained by Tauri and can be consumed directly if deeper system integration is required outside of what Tauri exposes.

## Notes

- Tauri (Rust core + system WebView) is a different framework from Electron; see the electron skill for Electron.
- The command above is the npm tab of the shared `create-tauri-app` call-to-action fragment (`_fragments/cta.mdx`); the full command list is in create-project.md.

## Related

- [Prerequisites](./prerequisites.md)
- [Create a Project](./create-project.md)
- [Project Structure](./project-structure.md)
- [Frontend Configuration](./frontend-configuration.md)
- [App Size](./app-size.md)
