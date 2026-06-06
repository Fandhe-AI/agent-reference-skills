# Grouping and Categories

Organize exported symbols into named groups and categories in the generated docs.

```typescript
/**
 * Initializes the application.
 *
 * @group Lifecycle
 */
export function init(): void {}

/**
 * Tears down the application.
 *
 * @group Lifecycle
 */
export function destroy(): void {}

/**
 * Application configuration shape.
 *
 * @category Configuration
 */
export interface Config {
  port: number;
  debug: boolean;
}

/**
 * Connect to the database.
 *
 * @category Database
 * @group Connections
 */
export function connectDb(url: string): Promise<void> {
  return Promise.resolve();
}
```

Enable category and group navigation in `typedoc.json`:

```json
{
  "categorizeByGroup": true,
  "navigation": {
    "includeCategories": true,
    "includeGroups": true
  },
  "categoryOrder": ["Configuration", "Database", "*"],
  "groupOrder": ["Lifecycle", "Connections", "*"]
}
```

## Notes

- `@group` organizes symbols within a module; `@category` organizes across the whole project.
- The `"*"` entry in `categoryOrder` / `groupOrder` positions all unlisted items.
- `categorizeByGroup: true` applies category organization at the group level rather than globally.
- Use `@defaultCategory` in `typedoc.json` to assign uncategorized symbols a fallback category name.
