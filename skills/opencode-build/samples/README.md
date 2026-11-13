# samples

| Name | Description | Path |
| --- | --- | --- |
| Minimal Server Plugin | Define a server plugin with `Plugin.define`, use `ctx.storage`, and return a cleanup function from `setup`. | [minimal-server-plugin.md](./minimal-server-plugin.md) |
| Plugin Options | Pass options to a plugin from `opencode.json(c)` and read them from `ctx.options` during `setup`. | [plugin-options.md](./plugin-options.md) |
| Add a Custom Tool | Register a model-callable tool with a synchronous `ctx.tool.transform` editor. | [add-tool-plugin.md](./add-tool-plugin.md) |
| Model Request Hooks | Adjust the system prompt, generation options, and request headers of every agent model request with session hooks. | [model-request-hooks.md](./model-request-hooks.md) |
| Tool and Shell Guard Hooks | Block reads of `.env` files before a tool runs and inject an environment variable into every shell. | [tool-and-shell-guard-hooks.md](./tool-and-shell-guard-hooks.md) |
| Register a Command from a Plugin | Add a command with `ctx.command.transform` whose executor sends a prompt to the session. | [register-command-plugin.md](./register-command-plugin.md) |
| TUI Plugin with a Command | Add a TUI part that shows a toast on load and registers a palette, slash, and keyboard command. | [tui-plugin-command.md](./tui-plugin-command.md) |
| GUI Plugin Command | Register a command in OpenCode Desktop from the `./gui-experimental` part and call the server part over RPC. | [gui-plugin-command.md](./gui-plugin-command.md) |
| Plugin RPC | Define a typed RPC contract, implement it in the server part, and call it from an HTTP client. | [plugin-rpc.md](./plugin-rpc.md) |
| Drive a Session with @opencode/client | Connect to a running OpenCode server, create a session, send a prompt, and stream events. | [client-session-prompt.md](./client-session-prompt.md) |
| Embed OpenCode with @opencode/sdk | Host OpenCode in-process, with no HTTP listener, and customize it with a plugin. | [sdk-embedded-host.md](./sdk-embedded-host.md) |
| OpenCode in a Cloudflare Durable Object | Hold one workerd-profile OpenCode host for the lifetime of a Durable Object. | [sdk-cloudflare-durable-object.md](./sdk-cloudflare-durable-object.md) |
| Effect Plugin | Write a server plugin with the Effect-native API, where lifetime is a `Scope`. | [effect-plugin.md](./effect-plugin.md) |
| Package, Load, and Publish a Plugin | Lay out a plugin package with server, TUI, GUI, and RPC parts, load it from config, and publish it. | [plugin-package-and-publish.md](./plugin-package-and-publish.md) |
| Migrate a V1 Plugin | Port V1 plugin configuration and entrypoint to V2, or support both from one package. | [migrate-v1-plugin.md](./migrate-v1-plugin.md) |
