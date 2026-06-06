# Code Generation

Scaffold new packages or files using `turbo gen` with built-in or custom generators.

Built-in workspace generator:

```bash
# Add a new empty package
turbo gen workspace

# Copy an existing package as a template
turbo gen workspace --copy

# Copy from a remote repository
turbo gen workspace --copy https://github.com/org/repo
```

Custom generator — `turbo/generators/config.ts` at the monorepo root:

```ts
import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("react-component", {
    description: "Add a new React component",
    prompts: [
      { type: "input", name: "name", message: "Component name?" },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}.tsx",
        templateFile: "templates/component.hbs",
      },
    ],
  });
}
```

Run a custom generator:

```bash
turbo gen react-component

# Pass answers directly (non-interactive)
turbo gen react-component --args MyButton
```

## Notes

- Generators use [Plop](https://plopjs.com/) configuration format internally
- Place generator configs either at the monorepo root (`turbo/generators/config.ts`) or inside any workspace (`{workspace}/turbo/generators/config.ts`)
- Install `@turbo/gen` as a devDependency when using TypeScript configs
- ESM-only dependencies are not currently supported inside generator configs
