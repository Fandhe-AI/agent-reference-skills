---
source: https://ai-sdk.dev/cookbook/guides/agent-skills
---

# Add Agent Skills to a ToolLoopAgent (loadSkill tool)

Discover `SKILL.md` folders at startup, list them in the instructions, and load a skill's body on demand with a `loadSkill` tool.

```ts
interface Sandbox {
  readFile(path: string, encoding: 'utf-8'): Promise<string>;
  readdir(
    path: string,
    opts: { withFileTypes: true },
  ): Promise<{ name: string }[]>;
  exec(command: string): Promise<{ stdout: string; stderr: string }>;
}
```

```ts
interface SkillMetadata {
  name: string;
  description: string;
  path: string;
}

async function discoverSkills(
  sandbox: Sandbox,
  directories: string[],
): Promise<SkillMetadata[]> {
  const skills: SkillMetadata[] = [];
  const seenNames = new Set<string>();

  for (const dir of directories) {
    let entries;
    try {
      entries = await sandbox.readdir(dir, { withFileTypes: true });
    } catch {
      continue; // Skip directories that don't exist
    }

    for (const entry of entries) {
      const skillDir = `${dir}/${entry.name}`;
      const skillFile = `${skillDir}/SKILL.md`;

      try {
        const content = await sandbox.readFile(skillFile, 'utf-8');
        const frontmatter = parseFrontmatter(content);

        // First skill with a given name wins (allows project overrides)
        if (seenNames.has(frontmatter.name)) continue;
        seenNames.add(frontmatter.name);

        skills.push({
          name: frontmatter.name,
          description: frontmatter.description,
          path: skillDir,
        });
      } catch {
        continue; // Skip skills without valid SKILL.md
      }
    }
  }
  return skills;
}

function parseFrontmatter(content: string) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match?.[1]) throw new Error('No frontmatter found');
  // Parse YAML using your preferred library
  return yaml.parse(match[1]);
}
```

```ts
function buildSkillsPrompt(skills: SkillMetadata[]): string {
  const skillsList = skills
    .map(s => `- ${s.name}: ${s.description}`)
    .join('\n');

  return `
## Skills

Use the \`loadSkill\` tool to load a skill when the user's request
would benefit from specialized instructions.

Available skills:
${skillsList}
`;
}
```

```ts
function stripFrontmatter(content: string): string {
  const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return match ? content.slice(match[0].length).trim() : content.trim();
}

const loadSkillTool = tool({
  description: 'Load a skill to get specialized instructions',
  inputSchema: z.object({
    name: z.string().describe('The skill name to load'),
  }),
  contextSchema: z.object({
    sandbox: z.custom<Sandbox>(),
    skills: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        path: z.string(),
      }),
    ),
  }),
  execute: async ({ name }, { context: { sandbox, skills } }) => {
    const skill = skills.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (!skill) {
      return { error: `Skill '${name}' not found` };
    }

    const skillFile = `${skill.path}/SKILL.md`;
    const content = await sandbox.readFile(skillFile, 'utf-8');
    const body = stripFrontmatter(content);

    return {
      skillDirectory: skill.path,
      content: body,
    };
  },
});
```

```ts
const callOptionsSchema = z.object({
  sandbox: z.custom<Sandbox>(),
  skills: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      path: z.string(),
    }),
  ),
});

const readFileTool = tool({
  description: 'Read a file from the filesystem',
  inputSchema: z.object({ path: z.string() }),
  contextSchema: z.object({ sandbox: z.custom<Sandbox>() }),
  execute: async ({ path }, { context: { sandbox } }) => {
    return sandbox.readFile(path, 'utf-8');
  },
});

const bashTool = tool({
  description: 'Execute a bash command',
  inputSchema: z.object({ command: z.string() }),
  contextSchema: z.object({ sandbox: z.custom<Sandbox>() }),
  execute: async ({ command }, { context: { sandbox } }) => {
    return sandbox.exec(command);
  },
});

const agent = new ToolLoopAgent({
  model: yourModel,
  tools: {
    loadSkill: loadSkillTool,
    readFile: readFileTool,
    bash: bashTool,
  },
  callOptionsSchema,
  prepareCall: ({ options, ...settings }) => ({
    ...settings,
    instructions: `${settings.instructions}\n\n${buildSkillsPrompt(options.skills)}`,
    toolsContext: {
      loadSkill: { sandbox: options.sandbox, skills: options.skills },
      readFile: { sandbox: options.sandbox },
      bash: { sandbox: options.sandbox },
    },
  }),
});
```

```ts
import { homedir } from 'node:os';
import { join } from 'node:path';

// Create sandbox (your filesystem/execution abstraction)
const sandbox = createSandbox({ workingDirectory: process.cwd() });

// Discover skills at startup
const skills = await discoverSkills(sandbox, [
  '.agents/skills',
  join(homedir(), '.config/agent/skills'),
]);

// Run the agent
const result = await agent.generate({
  prompt: userMessage,
  options: { sandbox, skills },
});
```

## Notes

- This sample implements Agent Skills (`SKILL.md` folders, progressive disclosure) inside an AI SDK agent at runtime. It is not the Skills API (anthropic-api-tools-mcp) and not Claude Code's skill system (anthropic-claude-code-extend); it is also a different distribution path from the official `npx skills add vercel/ai` skill.
- `loadSkill` is a standard AI SDK tool, so `execute` can read from any source (filesystem, bundled assets, API, registry). `Sandbox` is the page's generic abstraction (Node.js `fs/promises` and `child_process` work directly); `createSandbox`, `yaml`, `yourModel` and `userMessage` are placeholders.
- Modified from the official page for v7: the page calls `agent.run`, but `ToolLoopAgent` exposes `generate` / `stream` (`references/agents/tool-loop-agent.md`), so this uses `agent.generate`. The page also passes one shared `context` from `prepareCall` and casts it inside each tool; in v7 each tool declares `contextSchema` and receives its own value from `toolsContext` keyed by tool name.
- The official page filters entries with `isDirectory()`, but a `Dirent` returns false for a symlink to a directory (the default install mode of `npx skills add`), so the filter is removed and entries without a readable `SKILL.md` are skipped by the existing `catch`.
- The official page passes `~/.config/agent/skills` as-is, but Node.js fs APIs do not expand `~`, so it is resolved to an absolute path with `homedir()`.
- Skills load progressively: names and descriptions at startup, full `SKILL.md` on activation, bundled files via the agent's existing `readFile` / `bash` tools. See `references/agents/tool-loop-agent.md` and `references/workflow-harnesses/harness-skills.md`.
