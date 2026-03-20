# Examples

> Source: https://commitlint.js.org/reference/examples

commitlint の一般的な設定例集。

## 例 1: Issue / チケット番号の検証

コミットメッセージにチケット番号（例: `PROJ-123`）の参照を必須にする。

### package.json での設定

```json
{
  "commitlint": {
    "rules": {
      "references-empty": [2, "never"]
    },
    "parserPreset": {
      "parserOpts": {
        "issuePrefixes": ["PROJ-"]
      }
    }
  }
}
```

`parserOpts.issuePrefixes` でチケット番号のプレフィックスパターンを指定する。`references-empty` を `[2, "never"]` に設定することで、references が空でないことを error レベルで強制する。

### 結果

```bash
# 成功
echo "feat: add login PROJ-123" | commitlint

# 失敗（チケット番号なし）
echo "feat: add login" | commitlint
# => references may not be empty
```

## 例 2: VS Code での絵文字配置の調整

### 問題

一部のターミナルでは Unicode 絵文字の幅計算が正しく行われず、絵文字の後にスペースが欠落してテキストの配置がずれることがある。

### 解決策

絵文字の後にトレーリングスペースを追加する。

```typescript
import { type UserConfig } from "@commitlint/types";

export default {
  extends: ["@commitlint/config-conventional"],
  prompt: {
    questions: {
      type: {
        enum: {
          build: { emoji: "🛠️ " },
          chore: { emoji: "♻️ " },
          ci: { emoji: "⚙️ " },
          revert: { emoji: "🗑️ " },
        },
      },
    },
  },
} satisfies UserConfig;
```

絵文字文字列の末尾にスペースを追加することで、プロンプトインターフェースでの配置の問題を修正する。

## 例 3: コミットメッセージに絵文字を含める

実際のコミットメッセージに絵文字を含め、かつ commitlint の検証をパスさせるための設定。`headerWithEmoji: true` を使用し、カスタムパーサープリセットで絵文字プレフィックス付きの header を検証する。

### 完全な設定 (commitlint.config.ts)

```typescript
import type { ParserPreset, UserConfig } from "@commitlint/types";
import config from "@commitlint/config-conventional";
import createPreset from "conventional-changelog-conventionalcommits";
import { merge } from "lodash-es";

async function createEmojiParser(): Promise<ParserPreset> {
  const emojiRegexPart = Object.values(config.prompt.questions.type.enum)
    .map((value) => value.emoji.trim())
    .join("|");

  const parserOpts = {
    breakingHeaderPattern: new RegExp(
      `^(?:${emojiRegexPart})\\s+(\\w*)(?:\\((.*)\\))?!:\\s+(.*)$`
    ),
    headerPattern: new RegExp(
      `^(?:${emojiRegexPart})\\s+(\\w*)(?:\\((.*)\\))?!?:\\s+(.*)$`
    ),
  };

  const emojiParser = merge({}, await createPreset(), {
    conventionalChangelog: { parserOpts },
    parserOpts,
    recommendedBumpOpts: { parserOpts },
  });

  return emojiParser;
}

const emojiParser = await createEmojiParser();

export default {
  extends: ["@commitlint/config-conventional"],
  parserPreset: emojiParser,
  prompt: {
    questions: {
      type: {
        enum: {
          build: { emoji: "🛠️ " },
          chore: { emoji: "♻️ " },
          ci: { emoji: "⚙️ " },
          revert: { emoji: "🗑️ " },
        },
        headerWithEmoji: true,
      },
    },
  },
} satisfies UserConfig;
```

### 仕組み

1. `@commitlint/config-conventional` の `prompt.questions.type.enum` から全絵文字を取得
2. 絵文字を正規表現パターンに変換し、カスタム `headerPattern` と `breakingHeaderPattern` を生成
3. `conventional-changelog-conventionalcommits` プリセットとマージしてカスタムパーサーを作成
4. `headerWithEmoji: true` により、`@commitlint/cz-commitlint` がコミットメッセージに絵文字を挿入

### 出力例

```
⚙️ ci(scope): short description
🛠 build(scope): short description
🐛 fix(scope): short description
✨ feat(scope): short description
```
