# @commitlint/load

共有設定や inline ルールを解決し、最終的な Config オブジェクトを返す。

> https://commitlint.js.org/api/load

## インストール

```sh
npm install --save @commitlint/load
```

## 型定義

```typescript
type RuleLevel = 0 | 1 | 2;

type RuleCondition = 'always' | 'never';

type RuleOption = any;

type PrimitiveRule = [RuleLevel, RuleCondition, RuleOption?];

type AsyncRule = Promise<PrimitiveRule>;

type FunctionRule = () => PrimitiveRule;

type AsyncFunctionRule = () => Promise<PrimitiveRule>;

type Rule = PrimitiveRule | FunctionRule | AsyncFunctionRule;

type ParserPreset = {
  name: string;
  path: string;
  opts: any;
};

type Seed = {
  extends?: string[];
  parserPreset?: string;
  rules?: {[ruleName: string]: Rule};
  helpUrl?: string;
};

type Config = {
  extends: string[];
  parserPreset?: ParserPreset;
  rules: {[ruleName: string]: Rule};
  helpUrl?: string;
};

type LoadOptions = {
  file?: string;
  cwd: string;
};
```

## 関数シグネチャ

```typescript
load(seed: Seed = {}, options?: LoadOptions = {cwd: process.cwd()}) => Promise<Config>;
```

## インポート

```javascript
import load from "@commitlint/load";
```

## 使用例

### インラインルール

```javascript
const config = await load({
  rules: {
    "body-leading-blank": [2, "always"],
  },
});
console.log(config);
// => { extends: [], rules: { 'body-leading-blank': [ 2, 'always' ] } }
```

### ファイル参照（extends）

```javascript
const config = await load({ extends: ["./package"] });
console.log(config);
// => { extends: ['./package', './package-b'], rules: {} }
```

### インライン parserPreset

```javascript
const config = await load({ parserPreset: "./parser-preset.js" });
console.log(config);
/*
{
  extends: [],
  rules: {},
  parserPreset: {
    name: './parser-preset.js',
    path: './parser-preset.js',
    opts: {}
  }
}
*/
```

### 設定ファイルの読み込み

```javascript
const config = await load(
  {},
  { file: ".commitlintrc.yml", cwd: process.cwd() },
);
console.log(config);
/*
{
  extends: [],
  rules: {
    'body-leading-blank': [ 1, 'always' ]
  },
  formatter: '@commitlint/format',
  plugins: {}
}
*/
```
