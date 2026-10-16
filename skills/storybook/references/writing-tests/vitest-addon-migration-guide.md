# Migrating from test-runner to the Vitest addon

Steps to move a project from `@storybook/test-runner` (Jest + Playwright) to `@storybook/addon-vitest`. Story-writing does not change.

## Signature / Usage

Replace the `package.json` script:

```diff
{
  "scripts": {
-    "test-storybook": "test-storybook"
+    "test-storybook": "vitest --project=storybook"
  }
}
```

Steps:

1. Remove `@storybook/test-runner` and `@storybook/addon-coverage` (if present).
2. Remove `test-runner-jest.config.js` and `.storybook/test-runner.ts` (if present). Accessibility testing is built in; for image snapshots see the FAQ; for advanced hooks such as `prepare`, ask on Discord or GitHub Discussions.
3. Run the addon setup command (`addon-test` install snippet; see the Vitest addon page), then update the script above.
4. Update CI: drop build / serve / wait-on steps and run the single Vitest script (`npm run test-storybook`); add `-- --coverage` for coverage reports.

CI diff (GitHub Actions), replacing the build-and-serve flow:

```diff
-      - name: Build Storybook
-        run: npm run build-storybook --quiet
-      - name: Serve Storybook and run tests
-        run: |
-          npx concurrently -k -s first -n "SB,TEST" -c "magenta,blue" \
-            "npx http-server storybook-static --port 6006 --silent" \
-            "npx wait-on tcp:127.0.0.1:6006 && npm run test-storybook --coverage"
+      - name: Run storybook tests
+        run: |
+          npm run test-storybook
```

## Notes

- Eligibility: supported for React, Preact, Vue, Svelte, and Web Components with the Vite builder (or Next.js via `@storybook/nextjs-vite`). Renderers such as Angular (the Webpack-based `@storybook/angular`) or Webpack / RsPack builders should keep using the test runner. `@storybook/angular-vite` (10.6 preview, Angular >= 21 / Vite >= 8) supports the Vitest addon, and standalone runs use `storybookAngularVitest` from `@storybook/angular-vite/vitest` (source: get-started/frameworks/angular-vite).
- Benefits: Vitest instead of Jest, no need to build and run Storybook to test, Vitest browser mode (Playwright), built-in accessibility and coverage (no `@storybook/addon-coverage` instrumentation).
- Webpack projects without complex configuration can often migrate to Vite first.
- Jest for unit tests does not block migration; keeping the test runner is acceptable if Vitest brings no benefit.
- Image snapshot testing options that integrate with the testing widget: the Visual tests addon (cloud) or `storybook-addon-vis` (local).
- Source: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon/migration-guide (Storybook v10.6.2).

## Related

- [Vitest addon](./vitest-addon.md)
- [Test runner](./test-runner.md)
- [Testing in CI](./in-ci.md)
- [Visual testing](./visual-testing.md)
