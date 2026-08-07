# Sandboxed Inline Code Execution

Run inline JavaScript, TypeScript, and Python snippets inside an Upstash Box without an agent, including error handling for a failing script.

```typescript
import { Box } from "@upstash/box";

const box = await Box.create({
  apiKey: process.env.UPSTASH_BOX_API_KEY!,
  baseUrl: process.env.UPSTASH_BOX_BASE_URL,
  runtime: "node",
});

// Run JavaScript
const jsRun = await box.exec.code({
  code: `
    const data = [1, 2, 3, 4, 5];
    const sum = data.reduce((a, b) => a + b, 0);
    console.log(JSON.stringify({ sum, avg: sum / data.length }));
  `,
  lang: "js",
});
console.log("Output:", jsRun.result.trim());
console.log("Exit code:", jsRun.exitCode);

// Run TypeScript
const tsRun = await box.exec.code({
  code: `
    interface User { name: string; age: number }
    const users: User[] = [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }];
    const oldest = users.reduce((a, b) => (a.age > b.age ? a : b));
    console.log(\`Oldest user: \${oldest.name} (age \${oldest.age})\`);
  `,
  lang: "ts",
});
console.log("Output:", tsRun.result.trim());

// Error handling — non-zero exit code, error captured in result
const errRun = await box.exec.code({
  code: `throw new Error("something went wrong")`,
  lang: "js",
});
console.log("Exit code:", errRun.exitCode);
console.log("Error:", errRun.result.split("\n").slice(0, 3).join("\n"));

await box.delete();
```

```env
UPSTASH_BOX_API_KEY=abx_...
```

## Notes

- `box.exec.code()` executes an inline snippet without writing a file first; `lang` accepts `"js"`, `"ts"`, `"python"`, and other runtime-supported languages
- Running a language not matching the box's `runtime` (e.g. `lang: "python"` on a `runtime: "node"` box) fails—create the box with the matching runtime for that language
- `exitCode` is `0` on success and non-zero on a thrown error; `result` contains stdout on success or the stack trace on failure
- Unlike `box.agent.run()`, `exec.code()` has no agent/model cost—use it for deterministic scripted transformations rather than open-ended tasks
