---
source: https://react.dev/reference/dev-tools/react-devtools-cdt-mcp
---

# React DevTools for agents

`react-devtools-cdt-mcp` gives AI coding agents the same view of your app that React DevTools gives you: the component tree, props, hooks, owners, source locations, and render timing.

## Signature / Usage

```js
import 'react-devtools-cdt-mcp/register';
```

Install the package:

```bash
npm install --save-dev react-devtools-cdt-mcp
```

Import the `register` entry point at the very top of your app's entry file, before anything imports `react-dom`:

```js
import 'react-devtools-cdt-mcp/register';

import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(<App />);
```

`react-devtools-cdt-mcp` has to load before React does. If you import it after React, the tools won't see your components.

Your agent also needs Chrome DevTools MCP with third-party developer tools enabled (see the Chrome DevTools MCP docs). Once your agent opens a page that imports `react-devtools-cdt-mcp/register`, it can list and call the React tools.

`register(target?)` installs the React DevTools hook and registers the React tools with Chrome DevTools MCP yourself, instead of importing `react-devtools-cdt-mcp/register`.

```js
import { register } from 'react-devtools-cdt-mcp';

register();
```

## Options / Props

`register(target?)`

| Name | Type | Description |
| --- | --- | --- |
| `target` (optional) | object | The global object to install the hook on. Defaults to `globalThis`. |

`register` returns an object with two properties:

| Name | Type | Description |
| --- | --- | --- |
| `facade` | object | The installed React DevTools hook and the state the tools read from. |
| `unregister` | function | A function that stops registering the React tools with Chrome DevTools MCP. |

### Tools

`react-devtools-cdt-mcp` registers a tool group called `react`. Your agent calls these tools through Chrome DevTools MCP.

| Tool | Description |
| --- | --- |
| `react_get_component_tree` | Returns a snapshot of the component tree. |
| `react_find_components` | Finds components by name. |
| `react_get_component_by_uid` | Returns a component's props and Hooks. |
| `react_get_component_by_dom_element` | Returns the React host component for a DOM element. |
| `react_get_parent_stack` | Returns where a component is mounted in the tree. |
| `react_get_owner_stack` | Returns the components that created a component in their JSX. |
| `react_get_owner_stack_trace` | Returns the owner stack of a component as a stack trace. |
| `react_get_component_source` | Returns where a component is defined. |
| `react_start_profiling` | Starts recording render timing. |
| `react_stop_profiling` | Stops recording render timing. |
| `react_get_trace_overview` | Returns a summary of every commit in a recording. |
| `react_get_commit_report` | Returns which components rendered in a commit and how long each took. |

Components are identified by short, stable uids like `"r5"`. A uid stays the same across every tool and across re-renders, but not across page reloads. Every tool returns a plain, serializable object. If a tool fails, it returns an object with an `error` message instead.

## Notes

- Source: https://react.dev/reference/dev-tools/react-devtools-cdt-mcp (react.dev commit `46a54e0592729712b7640308b53268e84fdc7c9f`, fetched 2026-11-14). The page is new since commit `046f17d` and is marked experimental upstream; both the tools and their output may change between releases. The interactive sandbox on the official page is not reproduced here.
- `react-devtools-cdt-mcp` is built on the experimental third-party developer tools API in Chrome DevTools MCP. It is not an MCP server and does not go in your MCP client config; it runs inside your page. The only MCP server you configure is Chrome DevTools MCP.
- It connects to React the same way the React DevTools extension does and makes React report every commit to it. This slows down your app, so only include it in development builds.
- `register` must be called before React initializes, or React won't connect to the hook. Calling it again for the same `target` returns the existing registration.
- Troubleshooting: if the agent sees no React tools, check that third-party developer tools are enabled in your Chrome DevTools MCP setup and that the selected page imports `react-devtools-cdt-mcp/register` (tools are discovered per page, when the page loads or is selected). If the component tree is empty, the import came after React initialized; move it to the first line of the entry file. `react-devtools-cdt-mcp/register` throws if imported outside a browser (for example during server rendering or in tests); import it only from client-side code or call `register()` from the package root where it is safe. Source locations and owner stacks only exist in development builds of React. Uids don't survive page reloads; get fresh ones with `react_get_component_tree` or `react_find_components`.
- Distinct from the React DevTools browser extension (see the React Developer Tools page) and from React Performance tracks, which render in the browser Performance panel.

## Related

- [React Developer Tools](./react-developer-tools.md)
- [React Performance tracks](./react-performance-tracks.md)
