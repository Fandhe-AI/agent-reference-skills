# Custom Fixtures

Extend the base `test` object with reusable setup/teardown logic.

```typescript
// fixtures.ts
import { test as base } from '@playwright/test';
import { TodoPage } from './models/todo-page';

type MyFixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<MyFixtures>({
  todoPage: async ({ page }, use) => {
    // Setup: instantiate and navigate
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo('item1');

    // Provide to test
    await use(todoPage);

    // Teardown: runs after test body completes
    await todoPage.removeAll();
  },
});

export { expect } from '@playwright/test';
```

```typescript
// tests/todo.spec.ts
import { test, expect } from '../fixtures';

test('add a todo item', async ({ todoPage, page }) => {
  await todoPage.addToDo('something nice');
  await expect(page.getByTestId('todo-title')).toContainText(['something nice']);
});
```

## Notes

- `use()` separates setup (before) from teardown (after); teardown always runs even if the test fails
- Only fixtures declared as test parameters are instantiated — unused fixtures have zero overhead
- Re-export `expect` from the same file so tests import from a single location
- Fixture names must start with a letter or underscore and contain only letters, numbers, and underscores
