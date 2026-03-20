# Mocking Network Requests

Intercepts HTTP/GraphQL requests in stories using Mock Service Worker (MSW) so components can be tested without real APIs.

## Overview / Signature

Powered by the `msw` and `msw-storybook-addon` packages. Handlers are defined per story via `parameters.msw.handlers`.

## Setup

### Installation

```bash
npm install msw msw-storybook-addon --save-dev
npx msw init public/
```

### `.storybook/main.ts`

```typescript
const config: StorybookConfig = {
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public', '../static'],
};
```

### `.storybook/preview.ts`

```typescript
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize();

const preview: Preview = {
  loaders: [mswLoader],
};
export default preview;
```

## Usage

### REST API

```typescript
import { http, HttpResponse, delay } from 'msw';

export const MockedSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://your-api-endpoint/', () => {
          return HttpResponse.json({ user, document, subdocuments });
        }),
      ],
    },
  },
};

export const MockedError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('https://your-api-endpoint', async () => {
          await delay(800);
          return new HttpResponse(null, { status: 403 });
        }),
      ],
    },
  },
};
```

### GraphQL

```typescript
import { graphql, HttpResponse } from 'msw';

export const MockedSuccess: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('AllInfoQuery', () => {
          return HttpResponse.json({
            data: { allInfo: { user, document, subdocuments } },
          });
        }),
      ],
    },
  },
};

export const MockedError: Story = {
  parameters: {
    msw: {
      handlers: [
        graphql.query('AllInfoQuery', () => {
          return HttpResponse.json({
            errors: [{ message: 'Access denied' }],
          });
        }),
      ],
    },
  },
};
```

## Notes

- Handlers defined in `parameters.msw` follow the standard parameters merge order (story > component > global).
- Compatible with fetch, axios, Apollo Client, URQL, and React Query.
- Use `delay()` from `msw` to simulate latency or loading states.

## Related

- [Mocking Modules](./mocking-modules.md)
- [Mocking Providers](./mocking-providers.md)
- [Loaders](./loaders.md)
