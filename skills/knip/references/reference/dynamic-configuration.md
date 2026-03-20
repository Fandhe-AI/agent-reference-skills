# Dynamic Configuration

Source: https://knip.dev/reference/dynamic-configuration

## TypeScript

```typescript
import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['src/index.ts'],
  project: ['src/**/*.ts'],
};

export default config;
```

## JavaScript

```javascript
/** @type {import('knip').KnipConfig} */
const config = {
  entry: ['src/index.ts'],
  project: ['src/**/*.ts'],
};

export default config;
```

## Function-Based

### TypeScript

```typescript
import type { KnipConfig } from 'knip';

const config = async (): Promise<KnipConfig> => {
  const items = await fetchRepoInfo();
  return {
    entry: ['src/index.ts', ...items],
    project: ['src/**/*.ts'],
  };
};

export default config;
```

### JavaScript

```javascript
const config = async () => ({
  entry: ['src/index.ts'],
  project: ['src/**/*.ts'],
});

export default config;
```
