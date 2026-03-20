# @commitlint/format

lint 結果の Report を人間が読める文字列にフォーマットする。

> https://commitlint.js.org/api/format

## インストール

```sh
npm install --save @commitlint/format
```

## 型定義

```typescript
type Problem = {
  level: 0 | 1 | 2;
  name: string;
  message: string;
};

type Report = {
  results: ReportResult[];
};

type ReportResult = {
  errors: Problem[];
  warnings: Problem[];
};

type formatOptions = {
  /** ANSI カラー出力を有効にする */
  color?: boolean; // default: true
  /** レベル 0, 1, 2 に対応する記号 */
  signs?: readonly [string, string, string]; // default: [' ', '⚠', '✖']
  /** レベル 0, 1, 2 に対応する色名 */
  colors?: readonly [string, string, string]; // default: ['white', 'yellow', 'red']
  /** 詳細出力を有効にする */
  verbose?: boolean; // default: false
  /** ヘルプ URL を付与する */
  helpUrl?: string;
};
```

## 関数シグネチャ

```typescript
format(report?: Report = {}, options?: formatOptions = {}) => string[];
```

## インポート

```javascript
import format from "@commitlint/format";
```

## 使用例

### 空の呼び出し（問題なし）

```javascript
format();
/*
[
  '\u001b[1m\u001b[32m✔\u001b[39m   found 0 problems, 0 warnings\u001b[22m'
]
*/
```

### カラーなしで出力

```javascript
format(
  {
    results: [
      {
        warnings: [
          {
            level: 0,
            name: "some-hint",
            message: "This will not show up as it has level 0",
          },
          {
            level: 1,
            name: "some-warning",
            message: "This will show up yellow as it has level 1",
          },
        ],
        errors: [
          {
            level: 2,
            name: "some-error",
            message: "This will show up red as it has level 2",
          },
        ],
      },
    ],
  },
  {
    color: false,
  },
);
/*
[
  '✖   This will show up red as it has level 2 [some-error]',
  '    This will not show up as it has level 0 [some-hint]',
  '⚠   This will show up yellow as it has level 1 [some-warning]',
  '✖   found 1 problems, 2 warnings'
]
*/
```
