---
source: https://ai-sdk.dev/cookbook/guides/computer-use
---

# Computer Use with Anthropic Tools

Define the Anthropic computer, bash and text editor tools through `@ai-sdk/anthropic` and run them in a multi-step `streamText` call.

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { getScreenshot, executeComputerAction } from '@/utils/computer-use';

const computerTool = anthropic.tools.computer_20250124({
  displayWidthPx: 1920,
  displayHeightPx: 1080,
  execute: async ({ action, coordinate, text }) => {
    switch (action) {
      case 'screenshot': {
        return {
          type: 'image',
          data: getScreenshot(),
        };
      }
      default: {
        return executeComputerAction(action, coordinate, text);
      }
    }
  },
  toModelOutput({ output }) {
    return {
      type: 'content',
      value:
        typeof output === 'string'
          ? [{ type: 'text', text: output }]
          : [
              {
                type: 'file',
                mediaType: 'image/png',
                data: { type: 'data', data: output.data },
              },
            ],
    };
  },
});
```

```ts
import { isStepCount } from 'ai';

const stream = streamText({
  model: 'anthropic/claude-sonnet-4-20250514',
  prompt: 'Open the browser and navigate to vercel.com',
  tools: { computer: computerTool },
  stopWhen: isStepCount(10), // experiment with this value based on your use case
});
```

```ts
const computerTool = anthropic.tools.computer_20250124({
  // ...
});

const bashTool = anthropic.tools.bash_20250124({
  execute: async ({ command, restart }) => execSync(command).toString()
});

const response = await generateText({
  model: 'anthropic/claude-sonnet-4-20250514',
  prompt: "Create a new file called example.txt, write 'Hello World' to it, and run 'cat example.txt' in the terminal",
  tools: {
    computer: computerTool,
    bash: bashTool,
    str_replace_editor: textEditorTool,
  },
});
```

## Notes

- The tools are predefined interfaces only: `getScreenshot` and `executeComputerAction` (and the text editor `execute` implementation, `anthropic.tools.textEditor_20250728`) are yours to implement. Anthropic's reference implementation is `anthropics/anthropic-quickstarts` (`computer-use-demo`).
- The cookbook page returns a bare array from `toModelOutput` (old form); this sample uses the `{ type: 'content', value: [...] }` form from `docs/ai-sdk-core/tools-and-tool-calling`.
- The official page marks Computer Use as beta and recommends a dedicated VM or container with minimal privileges, no sensitive data, an internet allowlist and human confirmation for consequential actions.
- Tool versions (`computer_20250124`, `bash_20250124`, `textEditor_20250728`) and the model ID are copied as written on the page and may be stale; check `references/providers/anthropic.md` for current provider tools. The third snippet's `// ...` replaces an elision in the original.
- This is the AI SDK provider-tool wrapper. The raw Anthropic computer-use tool protocol belongs to anthropic-api-tools-mcp.
