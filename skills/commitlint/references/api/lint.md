# @commitlint/lint

Lint a commit message against rules.

> https://commitlint.js.org/api/lint

## Install

```sh
npm install --save @commitlint/lint
```

## Types

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

type Parser = (message: string, options: ParserOptions) => Omit<Commit, "raw">;

type Options = {
  parserOpts?: any;
  /** A custom parser function, used instead of the default conventional-commits-parser */
  parser?: Parser;
};
```

## Function signature

```typescript
lint(message: string, rules: {[ruleName: string]: Rule}, opts?: Options) => Promise<Report>;
```

## Import

```javascript
import lint from "@commitlint/lint";
```

## Examples

### Basic call

```javascript
const report = await lint("foo: bar");
console.log(report);
// => { valid: true, errors: [], warnings: [] }
```

### Rule check (valid)

```javascript
const report = await lint("foo: bar", { "type-enum": [1, "always", ["foo"]] });
console.log(report);
// => { valid: true, errors: [], warnings: [] }
```

### Rule check (invalid)

```javascript
const report = await lint("foo: bar", { "type-enum": [1, "always", ["bar"]] });
console.log(report);
// => { valid: true, errors: [], warnings: [{ level: 1, valid: false, name: 'type-enum', message: '...' }] }
```

### Custom parser options

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

### Using with config loading

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

### Linting Git history

```javascript
import lint from "@commitlint/lint";
import read from "@commitlint/read";

const RULES = {
  "type-enum": [2, "always", ["foo"]],
};

const commits = await read({ to: "HEAD", from: "HEAD~2" });
console.info(commits.map((commit) => lint(commit, RULES)));
```

### Checking the latest commit

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

## Notes

- The `parser` option was added in v21.1.0 (`feat(lint): allow for custom commit parser function`, #4829). It is not in docs/api/lint.md at v21.2.3; sources are `@commitlint/types/src/lint.ts` and `parse.ts` at the same tag
- `Commit` / `ParserOptions` are types from `conventional-commits-parser`
