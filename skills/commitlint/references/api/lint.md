# @commitlint/lint

コミットメッセージをルールに基づいて検証する。

> https://commitlint.js.org/api/lint

## インストール

```sh
npm install --save @commitlint/lint
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

type Problem = {
  level: number;
  valid: boolean;
  name: string;
  message: string;
};

type Report = {
  valid: boolean;
  errors: Problem[];
  warnings: Problem[];
};

type Options = {
  parserOpts?: any;
};
```

## 関数シグネチャ

```typescript
lint(message: string, rules: {[ruleName: string]: Rule}, opts?: Options) => Promise<Report>;
```

## インポート

```javascript
import lint from "@commitlint/lint";
```

## 使用例

### 基本呼び出し

```javascript
const report = await lint("foo: bar");
console.log(report);
// => { valid: true, errors: [], warnings: [] }
```

### ルール検証（valid）

```javascript
const report = await lint("foo: bar", { "type-enum": [1, "always", ["foo"]] });
console.log(report);
// => { valid: true, errors: [], warnings: [] }
```

### ルール検証（invalid）

```javascript
const report = await lint("foo: bar", { "type-enum": [1, "always", ["bar"]] });
console.log(report);
// => { valid: true, errors: [], warnings: [{ level: 1, valid: false, name: 'type-enum', message: '...' }] }
```

### カスタムパーサーオプション

```javascript
const opts = {
  parserOpts: {
    headerPattern: /^(\w*)-(\w*)/,
    headerCorrespondence: ["type", "scope"],
  },
};

const report = await lint(
  "foo-bar",
  { "type-enum": [2, "always", ["foo"]] },
  opts,
);
```

### 設定読み込みとの併用

```javascript
import load from "@commitlint/load";
import lint from "@commitlint/lint";

const CONFIG = {
  extends: ["@commitlint/config-conventional"],
};

const opts = await load(CONFIG);
const report = await lint(
  "foo: bar",
  opts.rules,
  opts.parserPreset ? { parserOpts: opts.parserPreset.parserOpts } : {},
);
```

### Git 履歴の確認

```javascript
import lint from "@commitlint/lint";
import read from "@commitlint/read";

const RULES = {
  "type-enum": [2, "always", ["foo"]],
};

const commits = await read({ to: "HEAD", from: "HEAD~2" });
console.info(commits.map((commit) => lint(commit, RULES)));
```

### 直近コミットのチェック

```javascript
import load from "@commitlint/load";
import read from "@commitlint/read";
import lint from "@commitlint/lint";

const { rules, parserPreset } = await load();
const [commit] = await read({ from: "HEAD~1" });

const report = await lint(
  commit,
  rules,
  parserPreset ? { parserOpts: parserPreset.parserOpts } : {},
);

console.log(JSON.stringify(report.valid));
```
