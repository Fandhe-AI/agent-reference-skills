# Configuration

> Source: https://commitlint.js.org/reference/configuration

commitlint の設定ファイル形式と全オプション。

## 設定ファイル形式

commitlint は cosmiconfig を使用して設定ファイルを解決する。以下の形式をサポート:

- `.commitlintrc`（JSON / YAML）
- `.commitlintrc.json`
- `.commitlintrc.yaml`
- `.commitlintrc.yml`
- `.commitlintrc.js`
- `.commitlintrc.cjs`
- `.commitlintrc.mjs`
- `.commitlintrc.ts`
- `.commitlintrc.cts`
- `.commitlintrc.mts`
- `commitlint.config.js`
- `commitlint.config.cjs`
- `commitlint.config.mjs`
- `commitlint.config.ts`
- `commitlint.config.cts`
- `commitlint.config.mts`

### package.json での定義

```json
{
  "commitlint": {
    "extends": ["@commitlint/config-conventional"]
  }
}
```

### CLI オプションで指定

```bash
commitlint --config commitlint.config.js
```

## 設定オブジェクト（全オプション）

### JavaScript (ESM)

```javascript
const Configuration = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-atom",
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [2, "always", ["foo"]],
  },
  ignores: [(commit) => commit === ""],
  defaultIgnores: true,
  helpUrl:
    "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
  prompt: {
    messages: {},
    questions: {
      type: {
        description: "please input type:",
      },
    },
  },
};

export default Configuration;
```

### CommonJS

```javascript
module.exports = Configuration;
```

### TypeScript

```typescript
import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-atom",
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [RuleConfigSeverity.Error, "always", ["foo"]],
  },
};

export default Configuration;
```

## 各プロパティの詳細

### extends

共有設定を解決して読み込む。参照するパッケージはインストール済みである必要がある。

```javascript
export default {
  extends: [
    "lerna",
    "@commitlint/config-conventional"
  ]
};
```

複数の設定を指定した場合、後のものが前のものを上書きする。

### parserPreset

コミットメッセージのパースに使用する設定プリセット。node で解決可能なパッケージ ID を指定する。

```javascript
export default {
  parserPreset: "conventional-changelog-atom",
};
```

### formatter

検証結果の出力フォーマットを指定する。

```javascript
export default {
  formatter: "@commitlint/format",
};
```

### rules

ルールの定義。`extends` で読み込んだルールを上書きできる。

```javascript
export default {
  rules: {
    "type-enum": [2, "always", ["foo"]],
  },
};
```

詳細は [rules-configuration.md](./rules-configuration.md) および [rules.md](./rules.md) を参照。

### ignores

commitlint がメッセージをスキップすべきかどうかを判定する関数の配列。

```javascript
export default {
  ignores: [(commit) => commit === ""],
};
```

### defaultIgnores

デフォルトの無視パターンを適用するかどうかを制御する boolean 値。デフォルトの無視パターンには、マージコミット、リバート、semver バージョンが含まれる。

```javascript
export default {
  defaultIgnores: true,
};
```

### helpUrl

失敗時に表示するカスタム URL。

```javascript
export default {
  helpUrl: "https://github.com/conventional-changelog/commitlint/#what-is-commitlint",
};
```

### prompt

`@commitlint/cz-commitlint` のコマンドラインインタラクションを設定するオブジェクト。

詳細は [prompt.md](./prompt.md) を参照。

## 共有設定 (Shareable Configuration)

共有設定は以下のルールに従う:

- npm パッケージとして公開可能
- `commitlint-config-` プレフィックス（例: `commitlint-config-lerna`）
- スコープ付きパッケージ: `@scope/commitlint-config-name`
- `extends` で参照する際はプレフィックスを省略可能（例: `"lerna"` → `commitlint-config-lerna`）
