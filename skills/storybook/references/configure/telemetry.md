# Telemetry

Configure Storybook's anonymous usage data collection.

## Overview

Storybook collects completely anonymous telemetry data to help the development team prioritize improvements and stay aligned with ecosystem trends. No personally identifiable information is collected.

## What Is Tracked

- Commands executed (`init`, `dev`, `build`, etc.)
- Framework and builder information (React, Vue, Webpack, Vite)
- Addon usage and testing tools
- Story counts and project metadata
- Package manager and monorepo configuration
- One-way hash of IP address (for spam detection only)

## Opting Out

Three methods to disable telemetry:

### Configuration File

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },
};

export default config;
```

### CLI Flag

```bash
storybook dev --disable-telemetry
storybook build --disable-telemetry
```

### Environment Variable

```bash
STORYBOOK_DISABLE_TELEMETRY=1 storybook dev
```

## Crash Reporting

Crash reports are disabled by default. Enable via:

```typescript
core: {
  enableCrashReports: true,
}
```

Or per-command:

```bash
storybook dev --enable-crash-reports
```

## Notes

- Telemetry applies to all CLI commands unless opted out
- Crash reports send sanitized error data alongside telemetry events
- Data is anonymized and cannot be traced back to individual users or projects

## Related

- [core](../api/main-config/core.md)
- [Environment Variables](./environment-variables.md)
