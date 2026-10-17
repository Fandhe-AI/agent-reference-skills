# getting-started

| Name | Description | Path |
|------|-------------|------|
| App Size | Tips for reducing Tauri binary size: a Cargo release profile and the `removeUnusedCommands` build option. | [app-size.md](./app-size.md) |
| Tauri Architecture | Tauri is a polyglot, composable toolkit for building desktop (and mobile) apps from Rust tools and HTML rendered in a Webview; this page covers the core crates, tooling, upstream crates (TAO, WRY), and how plugins fit in. | [architecture.md](./architecture.md) |
| Brownfield Pattern | The default IPC pattern: as compatible as possible with existing frontend projects, requiring nothing beyond what a web frontend uses in a browser. | [brownfield-pattern.md](./brownfield-pattern.md) |
| Create a Project | Create a Tauri app with the `create-tauri-app` utility (official framework templates), or add Tauri to an existing frontend with the Tauri CLI. | [create-project.md](./create-project.md) |
| Frontend Configuration | Tauri is frontend agnostic and supports most frontend frameworks out of the box; some frameworks need extra configuration to integrate. | [frontend-configuration.md](./frontend-configuration.md) |
| Leptos | Leptos is a Rust based web framework. This guide is accurate as of Leptos version 0.6. | [frontend-leptos.md](./frontend-leptos.md) |
| Next.js | Next.js is a meta framework for React. This guide is accurate as of Next.js 14.2.3. | [frontend-nextjs.md](./frontend-nextjs.md) |
| Nuxt | Nuxt is a meta framework for Vue. This guide is accurate as of Nuxt 4.2. | [frontend-nuxt.md](./frontend-nuxt.md) |
| Qwik | Create a Tauri app using the Qwik web framework. | [frontend-qwik.md](./frontend-qwik.md) |
| SvelteKit | SvelteKit is a meta framework for Svelte. This guide is accurate as of SvelteKit 2.20.4 / Svelte 5.25.8. | [frontend-sveltekit.md](./frontend-sveltekit.md) |
| Trunk | Trunk is a WASM web application bundler for Rust. This guide is accurate as of Trunk 0.17.5. | [frontend-trunk.md](./frontend-trunk.md) |
| Vite | Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. This guide is accurate as of Vite 8. | [frontend-vite.md](./frontend-vite.md) |
| Inter-Process Communication | Tauri IPC is Asynchronous Message Passing: processes exchange requests and responses serialized with a simple data representation, using two primitives, Events and Commands. | [inter-process-communication.md](./inter-process-communication.md) |
| Isolation Pattern | Intercept and modify Tauri API messages sent by the frontend before they reach Tauri Core, using a secure JavaScript "Isolation application" injected in a sandboxed iframe. | [isolation-pattern.md](./isolation-pattern.md) |
| Upgrade from Tauri 1.0 | Guide for upgrading a Tauri 1.0 application to Tauri 2.0: mobile-ready crate layout, the `migrate` CLI command, renamed/removed config keys, Cargo features, and Rust and JavaScript API changes with per-API migration steps. | [migrate-from-tauri-1.md](./migrate-from-tauri-1.md) |
| Upgrade from Tauri 2.0 Beta | Guide for upgrading a Tauri 2.0 beta application to the Tauri 2.0 release candidate: core plugin permission identifiers and the dev server network exposure change. | [migrate-from-tauri-2-beta.md](./migrate-from-tauri-2-beta.md) |
| What is Tauri? | Tauri is a framework for building tiny, fast binaries for all major desktop and mobile platforms; any frontend framework that compiles to HTML, JavaScript, and CSS can be integrated, with Rust, Swift, or Kotlin for backend logic. | [overview.md](./overview.md) |
| Prerequisites | To build with Tauri you need system dependencies, Rust, and (only for mobile targets) the mobile toolchains; Node.js is needed only for a JavaScript frontend. | [prerequisites.md](./prerequisites.md) |
| Process Model | Tauri uses a multi-process architecture: one Core process with full OS access, and one or more WebView processes that render the UI. | [process-model.md](./process-model.md) |
| Project Structure | A Tauri project is usually made of 2 parts, a Rust project and a JavaScript project (optional). | [project-structure.md](./project-structure.md) |
| Updating Dependencies | How to update the npm packages and Cargo crates of a Tauri app, and keep their versions in sync. | [updating-dependencies.md](./updating-dependencies.md) |
| Webview Versions | Which system webview Tauri uses on each platform and how to map OS versions to WebKit / Safari versions. | [webview-versions.md](./webview-versions.md) |
