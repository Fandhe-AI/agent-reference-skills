# JavaScript/TypeScript ルールのソース

Biome ルールと外部ルールの対応関係（Biome 2.5.15 の公式 Rules sources ページ）。

## Biome 独自ルール

45 個の独自ルール。例: `noDelete`, `noEnum`, `useStrictMode`, `noAccumulatingSpread`, `useReactCompiler`, `useTopLevelRegex`

## 他ソースからのルール

ソースセクション: `@e18e/eslint-plugin`, `@eslint-react/eslint-plugin`, `@html-eslint/eslint-plugin`, `@mysticatea/eslint-plugin`, `@next/eslint-plugin-next`, `@react-native/eslint-plugin`, `@shadcn/lint`, `@stylistic/eslint-plugin`, `@vitest/eslint-plugin`, Clippy, Deno Lint, ESLint, `eslint-plugin-astro` / `-barrel-files` / `-better-tailwindcss` / `-drizzle` / `-import` / `-import-access` / `-jest` / `-jsdoc` / `-jsx-a11y` / `-n` / `-no-secrets` / `-playwright` / `-promise` / `-qwik` / `-react` / `-react-dom` / `-react-hooks` / `-react-jsx` / `-react-naming-convention` / `-react-native` / `-react-prefer-function-component` / `-react-refresh` / `-react-rsc` / `-react-x` / `-regexp` / `-solid` / `-sonarjs` / `-svelte` / `-tailwindcss` / `-turbo` / `-unicorn` / `-unused-imports` / `-vue`, typescript-eslint。

## ESLint 対応

| Biome ルール | ESLint ルール |
|-------------|-------------|
| noDoubleEquals | eqeqeq |
| noDebugger | no-debugger |
| noConsole | no-console |
| noUnusedVariables | no-unused-vars |
| useConst | prefer-const |
| useTemplate | prefer-template |
| noVar | no-var |

## typescript-eslint 対応

| Biome ルール | typescript-eslint ルール |
|-------------|------------------------|
| useExplicitReturnType (inspired) | explicit-function-return-type |
| useExplicitType (inspired) | explicit-module-boundary-types |
| noExplicitAny | no-explicit-any |
| noFloatingPromises | no-floating-promises |
| noMisusedPromises | no-misused-promises |
| useNamingConvention (inspired) | naming-convention |

## eslint-plugin-react 対応

| Biome ルール | plugin-react ルール |
|-------------|-------------------|
| useButtonType | button-has-type |
| useJsxKeyInIterable | jsx-key |
| useFragmentSyntax | jsx-fragments |
| noRestrictedElements | forbid-elements |

## eslint-plugin-jsx-a11y 対応

| Biome ルール | jsx-a11y ルール |
|-------------|----------------|
| useAltText | alt-text |
| useValidAriaRole | aria-role |
| noAccessKey | no-access-key |

## eslint-plugin-unicorn 対応

| Biome ルール | unicorn ルール |
|-------------|---------------|
| useDateNow | prefer-date-now |
| useForOf | no-for-loop |
| useGlobalThis | prefer-global-this |

## その他のソース（代表）

| Biome ルール | ソース |
|-------------|-------|
| noRestrictedDependencies | @e18e/eslint-plugin `ban-dependencies` |
| noComponentHookFactories | @eslint-react `component-hook-factories` |
| useExpect | @vitest/eslint-plugin `expect-expect` / eslint-plugin-playwright `expect-expect` |
| noDrizzleDeleteWithoutWhere | eslint-plugin-drizzle `enforce-delete-with-where` |
| noPlaywrightWaitForTimeout | eslint-plugin-playwright `no-wait-for-timeout` |
| noReturnInFinally (inspired) | eslint-plugin-promise `no-return-in-finally` |
| noUselessRegexBackrefs | eslint-plugin-regexp `no-useless-backreference` |
| useWhile | eslint-plugin-sonarjs `prefer-while` |
| noUndeclaredEnvVars | eslint-plugin-turbo `no-undeclared-env-vars` |
| noVueRefAsOperand | eslint-plugin-vue `no-ref-as-operand` |
| noNoninteractiveElementToInteractiveRole 等 a11y | @html-eslint / eslint-plugin-jsx-a11y |
| useMaxParams | Clippy `too_many_arguments` |
| noProcessGlobal | Deno Lint `no-process-global` |

## 注意

- 一部の Biome ルールは元のルールと比べてオプションを持たない場合がある
- (inspired) 表記のルールは元ルールから着想を得たもので、挙動が完全一致しない
- 2.5.x で `@e18e/eslint-plugin` / `@eslint-react/eslint-plugin` / `@vitest/eslint-plugin` / Deno Lint / Clippy / `eslint-plugin-drizzle` / `-playwright` / `-promise` / `-regexp` / `-sonarjs` / `-svelte` / `-vue` / `-astro` / `-turbo` / `-react-native` 等のソース対応が追加されている
