---
source: https://ai-sdk.dev/docs/reference/ai-sdk-core/sandbox
---

# Experimental_SandboxSession

Describes an execution environment that tools can use to run commands. Pass it via the `experimental_sandbox` option to `generateText`, `streamText`, `ToolLoopAgent.generate`, `ToolLoopAgent.stream`, or agent UI stream helpers to make it available to tool description functions and tool execution.

## Signature / Usage

```ts
import type { Experimental_SandboxSession } from 'ai';
```

```ts
type Experimental_SandboxSession = {
  readonly description: string;
  readonly run: (options: {
    command: string;
    workingDirectory?: string;
    env?: Record<string, string>;
    abortSignal?: AbortSignal;
  }) => PromiseLike<{
    exitCode: number;
    stdout: string;
    stderr: string;
  }>;
};
```

Inside a tool, read it from the second `execute` argument:

```ts
const shell = tool({
  inputSchema: z.object({
    command: z.string(),
    workingDirectory: z.string().optional(),
  }),
  execute: async (
    { command, workingDirectory },
    { abortSignal, experimental_sandbox },
  ) => {
    if (!experimental_sandbox) {
      throw new Error('Experimental sandbox is not available');
    }

    return experimental_sandbox.run({
      command,
      workingDirectory,
      abortSignal,
    });
  },
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `description` | `string` | — | Description of the experimental sandbox environment. Include this in your prompt or instructions when the model needs to know details such as the root directory, exposed ports, public hostname, or other environment constraints. The AI SDK does not add it to the prompt automatically. |
| `run` | `(options) => PromiseLike<{ exitCode: number; stdout: string; stderr: string }>` | — | Executes a command in the experimental sandbox and resolves with the command exit code, standard output, and standard error. |
| `run` options: `command` | `string` | — | The command to execute in the experimental sandbox. |
| `run` options: `workingDirectory` | `string \| undefined` | — | Optional working directory. If omitted, the implementation uses its default working directory. |
| `run` options: `env` | `Record<string, string> \| undefined` | — | Optional environment variables for the command. Merged with the sandbox default environment, with these values taking precedence. Passing secrets here instead of inlining them into the command avoids leaking them in logs. Implementations that cannot set environment variables reject this option. |
| `run` options: `abortSignal` | `AbortSignal \| undefined` | — | Optional abort signal the implementation can use to cancel the command. |

Passing it to a call:

```ts
const result = await generateText({
  model,
  tools: { shell },
  experimental_sandbox,
  prompt: 'Run the test suite.',
});
```

## Notes

- This API is experimental and can change in patch releases.
- Passing an experimental sandbox does not sandbox the tool itself. Tool code still runs in your application process unless the tool explicitly delegates work to the experimental sandbox.

## Related

- [ToolLoopAgent](./tool-loop-agent.md)
- [Building Agents](./building-agents.md)
- [Loop Control](./loop-control.md)
