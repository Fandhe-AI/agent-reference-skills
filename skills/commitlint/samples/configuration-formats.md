# Configuration Formats

commitlint supports multiple config file formats; choose based on project toolchain.

**TypeScript (recommended for type safety):**

```typescript
// commitlint.config.ts
import { type UserConfig } from '@commitlint/types';

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
  },
} satisfies UserConfig;
```

**JavaScript ESM:**

```javascript
// commitlint.config.js (requires "type": "module" in package.json)
export default {
  extends: ['@commitlint/config-conventional'],
};
```

**JSON:**

```json
// .commitlintrc.json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "header-max-length": [2, "always", 100]
  }
}
```

**YAML:**

```yaml
# .commitlintrc.yml
extends:
  - '@commitlint/config-conventional'
rules:
  header-max-length:
    - 2
    - always
    - 100
```

**package.json field:**

```json
{
  "commitlint": {
    "extends": ["@commitlint/config-conventional"]
  }
}
```

## Notes

- commitlint searches for config files in the order: `.commitlintrc`, `.commitlintrc.{json,yaml,yml,js,cjs,mjs,ts,cts,mts}`, `commitlint.config.{js,...}`, then `package.json`
- TypeScript config requires `@commitlint/types` for the `UserConfig` type
- Use `--config <path>` CLI flag to specify a non-standard config location
- Run `npx commitlint --print-config` to verify the resolved configuration regardless of format
