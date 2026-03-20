# JavaScript/TypeScript ルールのソース

Biome ルールと外部ルールの対応関係。

## Biome 独自ルール

約 35 個の独自ルール。例: `noDelete`, `noEnum`, `useStrictMode`

## ESLint 対応

約 100 以上のルールが ESLint から対応:

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
| useExplicitType | explicit-function-return-type |
| noExplicitAny | no-explicit-any |
| useNamingConvention | naming-convention |

## eslint-plugin-react 対応

| Biome ルール | plugin-react ルール |
|-------------|-------------------|
| useButtonType | button-has-type |
| useJsxKeyInIterable | jsx-key |

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

## 注意

一部の Biome ルールは元のルールと比べてオプションを持たない場合がある。
