# Web Server

The `webServer` config option launches a local development server before tests and shuts it down afterward. This eliminates the need to start a server manually or rely on external environments during testing.

## Basic Configuration

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3000',
  },
});
```

Playwright waits for the `url` to return an acceptable status code (2xx, 3xx, 400, 401, 402, or 403) before running tests.

## All Options

### command

The shell command to start the server.

```typescript
webServer: {
  command: 'npm run dev',
}
```

### url

The URL to poll until the server is ready.

```typescript
webServer: {
  command: 'npm run start',
  url: 'http://127.0.0.1:3000/health',
}
```

### reuseExistingServer

When `true`, reuses an already-running server at the `url` instead of launching a new one. Set to `false` in CI to guarantee a clean server.

```typescript
webServer: {
  command: 'npm run start',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
}
```

### timeout

Maximum time in milliseconds to wait for the server to start. Defaults to 60,000 (1 minute).

```typescript
webServer: {
  command: 'npm run build && npm run start',
  url: 'http://localhost:3000',
  timeout: 120_000, // 2 minutes
}
```

### cwd

Working directory for the spawned server process. Defaults to the config file directory.

```typescript
webServer: {
  command: 'npm run start',
  url: 'http://localhost:3000',
  cwd: './apps/web',
}
```

### env

Environment variables for the server process. Inherits `process.env` with `PLAYWRIGHT_TEST=1` added automatically.

```typescript
webServer: {
  command: 'npm run start',
  url: 'http://localhost:3000',
  env: {
    PORT: '3000',
    NODE_ENV: 'test',
    DATABASE_URL: 'postgres://localhost/test_db',
  },
}
```

### stdout

Control server stdout output. `'pipe'` displays it in the terminal; `'ignore'` suppresses it.

```typescript
webServer: {
  command: 'npm run start',
  url: 'http://localhost:3000',
  stdout: 'ignore',
}
```

### stderr

Control server stderr output. `'pipe'` displays it in the terminal; `'ignore'` suppresses it.

```typescript
webServer: {
  command: 'npm run start',
  url: 'http://localhost:3000',
  stderr: 'pipe',
}
```

### gracefulShutdown

Send a signal before force-killing the server process. Ignored on Windows.

```typescript
webServer: {
  command: 'npm run start',
  url: 'http://localhost:3000',
  gracefulShutdown: {
    signal: 'SIGTERM',
    timeout: 500, // Wait 500ms, then send SIGKILL
  },
}
```

### name

A custom label prefixed to log messages from this server.

```typescript
webServer: {
  command: 'npm run start',
  url: 'http://localhost:3000',
  name: 'Frontend',
}
```

### wait

An output pattern (regex) to detect server readiness instead of polling the URL.

```typescript
webServer: {
  command: 'npm run start',
  wait: /ready on port (\d+)/,
}
```

## baseURL Integration

Combine `webServer` with `baseURL` in `use` to enable relative URL navigation in tests.

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3000',
  },
});
```

```typescript
import { test, expect } from '@playwright/test';

test('navigate with relative URL', async ({ page }) => {
  // Navigates to http://localhost:3000/login
  await page.goto('/login');

  // Also supports relative paths
  await page.goto('./dashboard');
});
```

## Multiple Web Servers

Launch multiple services by passing an array.

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: [
    {
      command: 'npm run start:frontend',
      url: 'http://localhost:3000',
      name: 'Frontend',
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run start:api',
      url: 'http://localhost:3333',
      name: 'API',
      timeout: 120_000,
      reuseExistingServer: !process.env.CI,
    },
  ],
  use: {
    baseURL: 'http://localhost:3000',
  },
});
```

Both servers start before tests and shut down after all tests complete. Playwright waits for both URLs to be ready.

## Complete Example

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
    env: {
      NODE_ENV: 'test',
    },
    gracefulShutdown: {
      signal: 'SIGTERM',
      timeout: 1000,
    },
  },

  use: {
    baseURL: 'http://localhost:4173',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
```
