---
source: https://ai-sdk.dev/docs/ai-sdk-core/tools
---

# First-party Tools

The AI SDK provides first-party tools for agents and applications (Bash tool and Web Fetch tool). Each tool includes its input schema, model-facing description, and execution logic, ready to use with `generateText`, `streamText`, or `ToolLoopAgent`. They work with any model that supports function calling. Install them from their individual `@ai-sdk/tool-*` packages. For defining your own tools, see Tool Calling.

## Signature / Usage

### Bash Tool

`experimental_createBashTool` lets agents run Bash commands to search, analyze, and transform files. Supply an `Experimental_SandboxSession` to choose where commands run: `@ai-sdk/sandbox-just-bash` for an in-memory environment, `@ai-sdk/sandbox-vercel` for Vercel Sandbox, or your own implementation. The tool has no direct dependency on either runtime. Requires Node.js 22.13 or newer.

Adapted (not in the official docs): the official `<InstallPackages>` component rendered as an `npm install` command.

```bash
npm install ai @ai-sdk/tool-bash @ai-sdk/sandbox-just-bash
```

```ts
import { createJustBashNetworkSandboxSession } from '@ai-sdk/sandbox-just-bash';
import { experimental_createBashTool as createBashTool } from '@ai-sdk/tool-bash';
import { generateText, isStepCount } from 'ai';

const session = await createJustBashNetworkSandboxSession();

try {
  const sandbox = session.restricted();
  await sandbox.writeTextFile({
    path: 'notes.txt',
    content: 'Apples: 10\nPears: 20\n',
  });
  const bash = await createBashTool({ sandbox });

  const result = await generateText({
    model, // Your configured model with function calling support.
    tools: { bash },
    stopWhen: isStepCount(5),
    prompt: 'Read notes.txt and write a summary to summary.txt.',
  });

  console.log(result.text);
  console.log(await sandbox.readTextFile({ path: 'summary.txt' }));
} finally {
  await session.destroy();
}
```

Vercel Sandbox: install `@ai-sdk/sandbox-vercel` and `@vercel/sandbox` to use an existing native Vercel Sandbox, and wrap it with the adapter before passing it to the tool.

```ts
import { createVercelSandboxSessionFromNativeSandbox } from '@ai-sdk/sandbox-vercel';
import { experimental_createBashTool as createBashTool } from '@ai-sdk/tool-bash';
import { Sandbox } from '@vercel/sandbox';

const nativeSandbox = await Sandbox.create();

try {
  const sandbox = createVercelSandboxSessionFromNativeSandbox(nativeSandbox);
  await sandbox.writeTextFile({
    path: 'notes.txt',
    content: 'Hello from Vercel Sandbox',
  });
  const bash = await createBashTool({ sandbox });

  // Use bash with generateText, streamText, or ToolLoopAgent here.
} finally {
  await nativeSandbox.stop();
}
```

You can also create a managed session with `createVercelNetworkSandboxSession()` from `@ai-sdk/sandbox-vercel` and pass `session.restricted()`. For an existing native just-bash `Sandbox`, use `createJustBashSandboxSessionFromNativeSandbox()` from `@ai-sdk/sandbox-just-bash`. Raw runtime instances need their respective adapters; a custom `Experimental_SandboxSession` can be passed directly.

Command timeout: set `timeout` to cancel commands that run longer than the configured duration.

```ts
const bash = await createBashTool({
  sandbox,
  timeout: 10_000,
});
```

### Web Fetch Tool

`experimental_createWebFetchTool` lets agents read web pages and documents by URL. Requires Node.js 22.13 or newer.

Adapted (not in the official docs): the official `<InstallPackages>` component rendered as an `npm install` command.

```bash
npm install ai @ai-sdk/tool-web-fetch
```

```ts
import { experimental_createWebFetchTool as createWebFetchTool } from '@ai-sdk/tool-web-fetch';
import { generateText, isStepCount } from 'ai';

const result = await generateText({
  model, // Your configured model with function calling support.
  tools: { webFetch: createWebFetchTool() },
  stopWhen: isStepCount(5),
  prompt: 'Summarize https://ai-sdk.dev/docs/introduction.',
});
```

Choose the main content element for pages with a known structure:

```ts
const webFetch = createWebFetchTool({
  defuddleOptions: { contentSelector: 'article' },
});
```

On Node.js, inject `guarded-fetch` to block hostnames resolving to private addresses and DNS rebinding:

```ts
import { createGuardedFetch } from 'guarded-fetch';
import { experimental_createWebFetchTool as createWebFetchTool } from '@ai-sdk/tool-web-fetch';

const fetch = createGuardedFetch();
const webFetch = createWebFetchTool({ fetch });
// Reuse the transport and call await fetch.close() at application shutdown.
```

## Options / Props

### `experimental_createBashTool()` options (required object)

| Name | Type | Description |
| --- | --- | --- |
| sandbox | `Experimental_SandboxSession` | Session for command execution and file operations. |
| workingDirectory | `string` (Optional) | Absolute starting directory for each command, created if needed. When omitted, uses the sandbox's default directory. |
| maxOutputLength | `number` (Optional) | Positive integer limiting characters retained from each output stream before a truncation notice. Defaults to `30000`. |
| timeout | `number` (Optional) | Timeout per command execution, in milliseconds (integer from `1` to `2147483647`). No tool-level timeout by default. |

The model calls the tool with `{ command: string }` and receives `{ stdout, stderr, exitCode }`. Nonzero exit codes are returned so the model can inspect failures and recover. AI SDK cancellation is forwarded to the session. Output truncation happens after execution and does not limit execution memory or duration.

### `experimental_createWebFetchTool()` options (optional object)

| Name | Type | Description |
| --- | --- | --- |
| allowedDomains | `string[]` (Optional) | Only fetch from these domains and their subdomains, e.g. `['example.com']`. List a subdomain such as `docs.example.com` to allow only that subdomain. Also applies to redirects. Cannot be combined with `blockedDomains`. |
| blockedDomains | `string[]` (Optional) | Never fetch from these domains or their subdomains. Also applies to redirects. |
| requireUrlInUserMessage | `boolean` (Optional) | Only fetch URLs that appear in user messages. URLs in instructions, system messages, assistant messages, and tool results are not included. Defaults to `false`. |
| maxLength | `number` (Optional) | Maximum characters returned per call. Longer content can be read with `offset`. Defaults to `50000`. |
| maxBytes | `number` (Optional) | Maximum response size in bytes. Defaults to 10 MiB. |
| timeout | `number` (Optional) | Timeout in milliseconds for fetching each URL, including redirects. Defaults to `30000`. |
| fetch | `FetchFunction` (Optional) | Custom fetch implementation, for example to route requests through a proxy. It must validate resolved addresses itself. |
| defuddleOptions | `DefuddleOptions` (Optional) | Options for the defuddle HTML content extractor (https://github.com/kepano/defuddle), such as `contentSelector`. |

The model calls the tool with `{ url: string, offset?: number }` and receives one of:

- `{ type: 'document', url, finalUrl, contentType, title?, content, offset, totalLength, nextOffset? }` for HTML and text.
- `{ type: 'error', url, errorCode, message, statusCode? }` when fetching fails.

Errors are returned so the model can recover, for example by trying another URL. The model receives documents as text with the URL, title, and content type, followed by the content. AI SDK cancellation aborts the request. `experimental_createWebFetchTool()` returns the tool directly, ready to use as `tools: { webFetch }`.

## Notes

- Source: https://ai-sdk.dev/docs/ai-sdk-core/tools (ai@7.0.173). New page in 7.0.173; both tools are experimental (`experimental_` prefix) and install from separate `@ai-sdk/tool-*` packages.
- Distinct from `tool.md` (the `tool()` helper for defining your own tools) and Tool Calling.
- Bash tool files and lifecycle: commands use the sandbox's default working directory unless `workingDirectory` is provided. Without an override, creating the tool runs no setup commands. Seed files through `sandbox.writeTextFile({ path, content })` before running the tool; with an explicit working directory, use absolute paths. The sandbox controls which files commands can access; available programs, network access, shell state, and persistence depend on the supplied sandbox, and its description is included in the tool's instructions. Tools using the same session share files; creating a tool does not reset existing files or create a new sandbox. Use separate sessions for independent workflows. The caller creates, reconnects, and destroys the sandbox. `readTextFile({ path })` returns `null` if the file is missing; relative read paths depend on the sandbox adapter (just-bash resolves them against its default directory).
- Bash command timeout: each command gets a fresh timeout starting when its execution begins, excluding tool initialization and time waiting for model output or approval. It is combined with the caller's abort signal; either can cancel the command. The sandbox must honor cancellation and its result or error is passed through (just-bash returns exit code `124` when a running command is cancelled). SDK and sandbox timeouts still apply when the option is omitted.
- Web Fetch content handling: requests prefer markdown via `Accept: text/markdown`; otherwise HTML is converted to markdown with defuddle (removing navigation, footers, boilerplate). Plain text, JSON, XML, and CSV are returned as is. PDFs, images, audio, video, and other binary formats are not supported. JavaScript is not executed, so pages that render in the browser may return little or no content. Content longer than `maxLength` is truncated and the model is told to call again with `offset`; converted documents are cached for a few minutes per tool instance. The extractor sometimes selects the wrong part of a page; set `defuddleOptions.contentSelector` for known structures.
- Web Fetch security: GET requests without cookies or credentials; URLs containing credentials are rejected. Each request and redirect is validated against private and reserved addresses such as `localhost` and cloud metadata endpoints when they appear as IP literals or blocked local hostnames. The default transport does not validate DNS results. On Node.js, inject `guarded-fetch` unless your application controls the destinations or already enforces equivalent SSRF protection through its fetch implementation or network egress policy. URLs selected by a model remain untrusted. Restrict network egress at the platform level (see https://ai-sdk.dev/docs/advanced/secure-url-fetching).
- Fetched content is untrusted and can contain prompt injections. When an agent has access to private data, a model could be instructed to send it to another site, for example in a URL query string. Restrict fetching with `allowedDomains`, enable `requireUrlInUserMessage` so only URLs from user messages can be fetched, or require tool approval. `requireUrlInUserMessage` ignores URLs in tool results because the model can place arbitrary text there, so the model cannot follow links from search results or fetched pages in this mode.
- Adapted (not in the official docs): the install commands are shown as `npm install` commands for the official `<InstallPackages>` component's package lists (`ai @ai-sdk/tool-bash @ai-sdk/sandbox-just-bash` and `ai @ai-sdk/tool-web-fetch`).

## Related

- [Tool Calling](./tools-and-tool-calling.md)
- [tool](./tool.md)
- [Model Context Protocol (MCP)](./mcp-tools.md)
