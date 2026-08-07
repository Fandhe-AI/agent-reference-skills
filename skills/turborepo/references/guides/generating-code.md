# Generating Code

## Signature / Usage

Built-in generator commands:

```bash
turbo gen workspace              # Add an empty package
turbo gen workspace --copy       # Duplicate an existing package as a template
turbo gen workspace --copy https://github.com/...  # Duplicate from a remote source
```

Custom generators use the Plop configuration format internally. Config file locations:
- Monorepo root: `turbo/generators/config.ts`
- Any workspace: `{workspace}/turbo/generators/config.ts`

```ts
import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("Generator name", {
    description: "Generator description",
    prompts: [
      { type: "input", name: "name", message: "What is the name?" },
    ],
    actions: [
      { type: "add", path: "src/{{name}}.ts", templateFile: "templates/component.hbs" },
    ],
  });
}
```

Running a generator:

```bash
turbo gen [generator-name]
turbo gen [generator-name] --args answer1 answer2
```

## Notes

- ESM dependencies are not currently supported.
- When using TypeScript, install `@turbo/gen` as a devDependency.
