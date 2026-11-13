# plugins-gui

| Name | Description | Path |
| --- | --- | --- |
| GUI | GUI plugin overview and `Plugin.define` entry point | [overview.md](./overview.md) |
| Package | `./gui-experimental` export, one file evaluated in two processes | [package.md](./package.md) |
| Build the bundle | Vite preset `gui()`, shared modules | [build-bundle.md](./build-bundle.md) |
| Loading and reload | Where GUI entries load, reload and updates | [loading-and-reload.md](./loading-and-reload.md) |
| Define the GUI plugin | `os`, `stores`, `i18n`, splitting across files | [define-plugin.md](./define-plugin.md) |
| Shared context | `ctx.options`, `ctx.client`, `ctx.app` | [shared-context.md](./shared-context.md) |
| Contracts and tokens | `Contract`, `Ipc`, `Registry` tokens, `ctx.provide` / `ctx.use` | [contracts-and-tokens.md](./contracts-and-tokens.md) |
| The window and components | Window `setup`, `usePlugin()` | [window-and-components.md](./window-and-components.md) |
| Registries | `ctx.add` contributions to the window shell | [registries.md](./registries.md) |
| Command | Command palette, shortcuts, `/` menu actions | [command.md](./command.md) |
| Panel | Side-region tabs, panel width, reopen closed tabs | [panel.md](./panel.md) |
| Settings pages | `SettingsPage` and `SettingEntry` | [settings-page.md](./settings-page.md) |
| Slot | `window.bottom`, `session.header`, and other window slots | [slot.md](./slot.md) |
| MenuItem | Side panel `+`, Add server, and server row menu items | [menu-item.md](./menu-item.md) |
| TitlebarItem | Pill button in the titlebar | [titlebar-item.md](./titlebar-item.md) |
| ComposerPill | Pills above the session composer | [composer-pill.md](./composer-pill.md) |
| CodeBlock | Custom rendering and actions for fenced code blocks | [code-block.md](./code-block.md) |
| LinkHandler | Opens file or custom links | [link-handler.md](./link-handler.md) |
| Server | Contributed server connections | [server.md](./server.md) |
| Style | Injects CSS | [style.md](./style.md) |
| Theme | Adds a color theme | [theme.md](./theme.md) |
| Host APIs | `Context` interface and host API overview | [host-apis.md](./host-apis.md) |
| Layout | `ctx.layout` panel and side region control | [layout.md](./layout.md) |
| Sessions and screen | `ctx.sessions`, `ctx.screen`, files, comments | [sessions-screen.md](./sessions-screen.md) |
| Composer | Attach parts, read and write the prompt, choose the model | [composer.md](./composer.md) |
| Servers and server events | `ctx.servers`, `data.on` | [servers-events.md](./servers-events.md) |
| Dialogs | `ctx.dialogs` open, confirm, alert, prompt, select | [dialogs.md](./dialogs.md) |
| App components | `ctx.ui` components and settings components | [ui-components.md](./ui-components.md) |
| Toasts | `ctx.toast.show` | [toasts.md](./toasts.md) |
| Notifications | `ctx.attention.notify` | [notifications.md](./notifications.md) |
| Usage data | Token, cost and plan figures from server data | [usage-data.md](./usage-data.md) |
| Tabs | `ctx.tabs` shell tab strip | [tabs.md](./tabs.md) |
| Keybinds | `ctx.keybinds` | [keybinds.md](./keybinds.md) |
| Run commands | `ctx.commands.run` | [run-commands.md](./run-commands.md) |
| System and environment | `ctx.system`, `ctx.desktop`, appearance, locale | [system-environment.md](./system-environment.md) |
| Stored state | `Store.global`, `Store.session`, runtime stores | [stored-state.md](./stored-state.md) |
| Reactive primitives | `createKeyed`, `createLatest`, `createVisitState`, `usePanel` | [reactive-primitives.md](./reactive-primitives.md) |
| App contracts: Files | `FileTree`, `OpenInApp`, `FileViewer` | [app-contract-files.md](./app-contract-files.md) |
| Review changes | `Changes` and `ChangeKind` | [review-changes.md](./review-changes.md) |
| Browser | `Browser` contract | [browser.md](./browser.md) |
| The main process | `main` setup in the Electron main process | [main-process.md](./main-process.md) |
| Main context | `MainContext` fields | [main-context.md](./main-context.md) |
| Define and provide an Ipc | `Ipc.define`, provider, window client | [ipc.md](./ipc.md) |
| Native app menu | `MenubarItem` | [menubar-item.md](./menubar-item.md) |
| Embedded web views | `WebContentsView` embeds | [embeds.md](./embeds.md) |
| Live dependencies | `Live<T>` states and failure handling | [live-dependencies.md](./live-dependencies.md) |
| Lifetimes and cleanup | Cleanup of registrations and resources | [lifetimes.md](./lifetimes.md) |
