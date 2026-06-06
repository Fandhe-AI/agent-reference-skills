# Shareable Config

Create a reusable commitlint configuration as an npm package and consume it across projects.

**Package structure (`commitlint-config-myorg/index.js`):**

```javascript
// commitlint-config-myorg/index.js
export default {
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'chore', 'ci', 'refactor', 'test']],
    'header-max-length': [2, 'always', 100],
    'scope-case': [2, 'always', 'lower-case'],
  },
};
```

**Consuming project:**

```javascript
// commitlint.config.js
export default {
  extends: ['myorg'], // resolves to commitlint-config-myorg
};
```

**Using a local relative config (monorepo):**

```javascript
// packages/app/commitlint.config.js
export default {
  extends: ['../../commitlint-config'], // loads ../../commitlint-config.js
};
```

**Using a scoped package:**

```javascript
// resolves to @myorg/commitlint-config
export default {
  extends: ['@myorg'],
};
```

## Notes

- Package name must follow the pattern `commitlint-config-<name>` for short-hand resolution
- Multiple configs can be chained: `extends: ['@commitlint/config-conventional', 'myorg']`; later entries override earlier ones
- A shareable config can itself extend other configs, forming an indefinite chain
- Publish to npm or reference via local path for monorepo sharing
