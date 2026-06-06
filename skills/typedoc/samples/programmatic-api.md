# Programmatic API

Generate documentation from Node.js using the TypeDoc `Application` class.

```typescript
import * as td from "typedoc";

async function main() {
  // Bootstrap with plugins (recommended)
  const app = await td.Application.bootstrapWithPlugins({
    entryPoints: ["src/index.ts"],
    out: "docs",
    excludePrivate: true,
    excludeNotDocumented: true,
  });

  const project = await app.convert();

  if (!project) {
    console.error("TypeDoc conversion failed.");
    process.exit(1);
  }

  // Generate HTML docs and JSON model
  await app.generateDocs(project, "docs");
  await app.generateJson(project, "docs/api.json");
}

main().catch(console.error);
```

## Notes

- Always check that `app.convert()` returns a non-null value before generating output.
- Use `Application.bootstrap` instead of `bootstrapWithPlugins` when you need to control which plugins load.
- `generateOutputs(project)` respects all configured outputs in one call, while `generateDocs` and `generateJson` target a specific format directly.
- Options passed to `bootstrapWithPlugins` mirror CLI flags without the `--` prefix.
