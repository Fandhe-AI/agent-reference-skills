# Code Connect — React Component Setup

Install the CLI, create a `.figma.ts` connection file for a React component, and publish it to Figma Dev Mode.

```bash
# Install CLI
npm install --global @figma/code-connect@latest

# Set personal access token (Code Connect: Write, File content: Read)
export FIGMA_ACCESS_TOKEN=<your-personal-access-token>
```

```json
// figma.config.json — project root
{
  "codeConnect": {
    "include": ["**/*.figma.ts"],
    "label": "React",
    "language": "jsx"
  }
}
```

```typescript
// Button.figma.ts
import figma from "@figma/code-connect";
import { Button } from "./Button"; // your actual component

figma.connect(Button, "https://www.figma.com/file/FILEID/DesignSystem?node-id=12%3A34", {
  props: {
    label:    figma.string("Label"),
    disabled: figma.boolean("Disabled"),
    variant:  figma.enum("Type", {
      Primary:   "primary",
      Secondary: "secondary",
    }),
  },
  example: ({ label, disabled, variant }) => (
    <Button disabled={disabled} variant={variant}>
      {label}
    </Button>
  ),
});
```

```bash
# Preview what will be published (dry run)
npx figma connect publish --dry-run

# Publish connections to Figma
npx figma connect publish
```

## Notes

- The Figma node URL is found by right-clicking a component in the canvas and choosing "Copy link to selection".
- Code Connect files (`.figma.ts`) are not executed at runtime; the CLI treats them as static strings.
- Use the `variant` option in `figma.connect()` to create separate connections for different component variants.
- After publishing, connections appear in Dev Mode's Code panel when that component is selected.
