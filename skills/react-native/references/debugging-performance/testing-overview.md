---
source: https://reactnative.dev/docs/0.87/testing-overview
---

# Testing

Guide to static analysis, unit / integration / component / end-to-end testing for React Native apps (Jest, React Native Testing Library, Detox, Appium, Maestro).

## Signature / Usage

```js
it('given a date in the past, colorForDueDate() returns red', () => {
  expect(colorForDueDate('2000-10-20')).toBe('red');
});
```

Component test with React Native Testing Library:

```tsx
test('given empty GroceryShoppingList, user can add an item to it', () => {
  const {getByPlaceholderText, getByText, getAllByText} = render(
    <GroceryShoppingList />,
  );

  fireEvent.changeText(
    getByPlaceholderText('Enter grocery item'),
    'banana',
  );
  fireEvent.press(getByText('Add the item to list'));

  const bananaElements = getAllByText('banana');
  expect(bananaElements).toHaveLength(1); // expect 'banana' to be on the list
});
```

Snapshot of rendered output:

```tsx
<Text
  style={
    Object {
      "fontSize": 20,
      "textAlign": "center",
    }
  }>
  Welcome to React Native!
</Text>
```

## Notes

- Static analysis: React Native comes with ESLint (linting) and TypeScript (type checking) configured out of the box.
- The default template ships with Jest and a preset tailored to React Native. Since 0.85: the Jest preset moved from `react-native` to the new `@react-native/jest-preset` package; update `jest.config.js` with `preset: '@react-native/jest-preset'` instead of `preset: 'react-native'`.
- Separate the view (React components) from business logic and app state to make code testable.
- Structure tests as Given / When / Then (AAA: Arrange, Act, Assert); use `describe`, `beforeEach`, `beforeAll`; tests must be independent of each other.
- Unit tests cover individual functions or classes; mock external dependencies (e.g. JS unit tests relying on a native module written in Java or Objective-C). Generally real objects are better than mocks when possible.
- Integration tests combine real units; terminology is not always consistent.
- Component tests run only JavaScript in a Node.js environment; they do not exercise iOS / Android platform code and cannot give 100% confidence.
- React Native Testing Library builds on React's test renderer and adds `fireEvent` and `query` APIs. React's Test Renderer is marked [Deprecated].
- Prefer assertions on rendered text or accessibility helpers; avoid assertions on component props or state, and testID queries.
- Snapshot testing: keep snapshots small (`no-large-snapshots` rule), use `snapshot-diff` for state changes, avoid blindly running `--updateSnapshot`.
- End-to-end tests run against a release-configuration build; trade-offs are slower writing, slower runs and flakiness. Tools named: Detox, Appium, Maestro.
- Web test runners (vitest, playwright) are different tools; this guide covers Jest-based React Native testing and mobile E2E.

## Related

- [Debugging Basics](./debugging.md)
