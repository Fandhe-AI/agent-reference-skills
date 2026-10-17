# ipc-preload

| Name | Description | Path |
|------|-------------|------|
| contextBridge | Create a safe, bi-directional, synchronous bridge across isolated contexts. Process: Renderer. | [context-bridge.md](./context-bridge.md) |
| Context Isolation | Context Isolation ensures that both your `preload` scripts and Electron's internal logic run in a separate context from the website loaded in a `webContents`, preventing the website from accessing Electron internals or the powerful APIs the preload script can reach. | [context-isolation.md](./context-isolation.md) |
| IPC event structures | Event objects passed to IPC listeners and handlers. All extend `Event`. | [ipc-event-structures.md](./ipc-event-structures.md) |
| IpcMainServiceWorker | Communicate asynchronously from the main process to service workers. Process: Main. | [ipc-main-service-worker.md](./ipc-main-service-worker.md) |
| ipcMain | Communicate asynchronously from the main process to renderer processes. Process: Main. | [ipc-main.md](./ipc-main.md) |
| ipcRenderer | Communicate asynchronously from a renderer process to the main process. Process: Renderer. | [ipc-renderer.md](./ipc-renderer.md) |
| Inter-Process Communication guide | Processes communicate by passing messages through developer-defined "channels" with the `ipcMain` and `ipcRenderer` modules. Channels are **arbitrary** (any name) and **bidirectional** (the same channel name can be used on both modules). Because the main and renderer processes have different responsibilities, IPC is the only way to perform many common tasks, such as calling a native API from the UI or triggering changes in web contents from native menus. | [ipc.md](./ipc.md) |
| MessageChannelMain | The main-process-side equivalent of the DOM `MessageChannel`. Its singular function is to create a pair of connected `MessagePortMain` objects. Process: Main. | [message-channel-main.md](./message-channel-main.md) |
| MessagePortMain | Port interface for channel messaging in the main process; the main-process-side equivalent of the DOM `MessagePort`. It is an EventEmitter and uses the Node.js event system rather than DOM `EventTarget`: use `port.on('message', ...)` instead of `port.onmessage = ...` or `port.addEventListener('message', ...)`. Process: Main. | [message-port-main.md](./message-port-main.md) |
| MessagePorts in Electron | `MessagePort`s are a web feature for passing messages between contexts (like `window.postMessage`, but on different channels). This guide describes how Electron extends the Channel Messaging model. | [message-ports.md](./message-ports.md) |
| Multithreading (Web Workers with Node.js) | With Web Workers, it is possible to run JavaScript in OS-level threads. Node.js features can be used in Electron's Web Workers. | [multithreading.md](./multithreading.md) |
| parentPort | Interface for communication with the parent process. Process: Utility. | [parent-port.md](./parent-port.md) |
| utilityProcess | `utilityProcess` creates a child process with Node.js and Message ports enabled. It is the equivalent of Node.js `child_process.fork` but uses the Chromium Services API to launch the child process. Process: Main. | [utility-process.md](./utility-process.md) |
| webUtils | A utility layer to interact with Web API objects (Files, Blobs, etc.). Process: Renderer. | [web-utils.md](./web-utils.md) |
