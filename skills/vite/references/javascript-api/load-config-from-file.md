---
source: https://vite.dev/guide/api-javascript#loadconfigfromfile
---

# loadConfigFromFile

Loads a Vite config file manually with Rolldown.

## Signature / Usage

```ts
async function loadConfigFromFile(
  configEnv: ConfigEnv,
  configFile?: string,
  configRoot: string = process.cwd(),
  logLevel?: LogLevel,
  customLogger?: Logger,
): Promise<{
  path: string
  config: UserConfig
  dependencies: string[]
} | null>
```

## Related

- [Configuring Vite](../config-shared/configuring-vite.md)
- [resolveConfig](./resolve-config.md)
