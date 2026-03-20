# Snapshot Testing

Capture a component's rendered DOM/HTML and compare it against a previous snapshot to detect unintended changes.

## Overview

Snapshot testing renders a component in a given state, takes a snapshot of the rendered DOM or HTML, and compares it against the previous snapshot. For UI components, **visual tests or interaction tests are typically better choices** due to easier review and maintenance.

The recommended approach uses the **Portable Stories API** (`composeStories`). The deprecated Storyshots addon is no longer recommended.

## Usage

### Vitest (recommended)

```javascript
import { composeStories } from '@storybook/your-framework';
import * as stories from '../stories/Button.stories';

const { Primary } = composeStories(stories);

test('Button snapshot', async () => {
  await Primary.run();
  expect(document.body.firstChild).toMatchSnapshot();
});
```

Replace `your-framework` with your actual framework (e.g., `react-vite`, `nextjs`).

### Verifying error handling

```javascript
test('Button throws error', async () => {
  await expect(ThrowError.run()).rejects.toThrowError('Expected message');
});
```

## Notes

- Prefer visual tests or interaction tests over snapshot tests for UI components
- The Storyshots addon is deprecated — use the Portable Stories API instead
- Portable Stories API works with Jest, Vitest, and Playwright CT
- If Portable Stories cannot be used, the test-runner also supports snapshot testing

## Related

- [Portable Stories / Stories in Unit Tests](./portable-stories.md)
- [Visual Testing](./visual-testing.md)
- [Interaction Testing](./interaction-testing.md)
