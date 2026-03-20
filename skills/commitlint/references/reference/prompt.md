# Prompt

> Source: https://commitlint.js.org/reference/prompt

`@commitlint/cz-commitlint` のプロンプト設定。`settings`、`messages`、`questions` の 3 つのフィールドで構成される。

## 完全な設定例

```javascript
export default {
  parserPreset: "conventional-changelog-conventionalcommits",
  rules: {
    // ...
  },
  prompt: {
    settings: {},
    messages: {
      skip: ":skip",
      max: "upper %d chars",
      min: "%d chars at least",
      emptyWarning: "can not be empty",
      upperLimitWarning: "over limit",
      lowerLimitWarning: "below limit",
    },
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: "A new feature",
            title: "Features",
            emoji: "✨",
          },
          fix: {
            description: "A bug fix",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          docs: {
            description: "Documentation only changes",
            title: "Documentation",
            emoji: "📚",
          },
          style: {
            description:
              "Changes that do not affect the meaning of the code",
            title: "Styles",
            emoji: "💎",
          },
          refactor: {
            description:
              "A code change that neither fixes a bug nor adds a feature",
            title: "Code Refactoring",
            emoji: "📦",
          },
          perf: {
            description: "A code change that improves performance",
            title: "Performance Improvements",
            emoji: "🚀",
          },
          test: {
            description:
              "Adding missing tests or correcting existing tests",
            title: "Tests",
            emoji: "🚨",
          },
          build: {
            description: "Changes affecting build or dependencies",
            title: "Builds",
            emoji: "🛠",
          },
          ci: {
            description:
              "Changes to CI configuration files and scripts",
            title: "Continuous Integrations",
            emoji: "⚙️",
          },
          chore: {
            description:
              "Other changes that don't modify src or test files",
            title: "Chores",
            emoji: "♻️",
          },
          revert: {
            description: "Reverts a previous commit",
            title: "Reverts",
            emoji: "🗑",
          },
        },
      },
      scope: {
        description: "What is the scope of this change",
      },
      subject: {
        description: "Write a short, imperative tense description",
      },
      body: {
        description: "Provide a longer description of the change",
      },
      isBreaking: {
        description: "Are there any breaking changes?",
      },
      breakingBody: {
        description: "A BREAKING CHANGE requires a body",
      },
      breaking: {
        description: "Describe the breaking changes",
      },
      isIssueAffected: {
        description: "Does this change affect any open issues?",
      },
      issuesBody: {
        description: "Closed issues require a body",
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123")',
      },
    },
  },
};
```

## settings

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `enableMultipleScopes` | boolean | `false` | 複数 scope のラジオリスト選択を有効にする |
| `scopeEnumSeparator` | string | - | `enableMultipleScopes` が `true` の場合の複数 scope のデリミタ |
| `useExclamationMark` | boolean | `false` | breaking change 時に type/scope の後に `!` を付加する |

## messages

プロンプトのヒントメッセージ。ローカライズに使用可能。

| プロパティ | デフォルト値 | 説明 |
|-----------|------------|------|
| `skip` | `":skip"` | フィールドをスキップできることを示すメッセージ |
| `max` | `"upper %d chars"` | 最大文字数のメッセージ（`%d` が文字数に置換される） |
| `min` | `"%d chars at least"` | 最小文字数のメッセージ（`%d` が文字数に置換される） |
| `emptyWarning` | `"can not be empty"` | フィールドが空の場合の警告 |
| `upperLimitWarning` | `"over limit"` | 文字数上限を超えた場合の警告 |
| `lowerLimitWarning` | `"below limit"` | 文字数下限を下回った場合の警告 |

## questions

各対話ステップの設定。

### 設定可能なステップ

| ステップ | 説明 |
|---------|------|
| `header` | header 全体 |
| `type` | コミットタイプの選択 |
| `scope` | 変更スコープの入力 |
| `subject` | 短い説明の入力 |
| `body` | 詳細な説明の入力 |
| `footer` | footer の入力 |
| `isBreaking` | breaking change があるかの確認 |
| `breaking` | breaking change の説明 |
| `breakingBody` | breaking change の body（必須） |
| `isIssueAffected` | issue に影響があるかの確認 |
| `issues` | issue 参照の入力 |
| `issuesBody` | クローズする issue がある場合の body |

### type の enum 設定

各 type に対して以下のプロパティを設定可能:

| プロパティ | 説明 |
|-----------|------|
| `description` | type の説明文 |
| `title` | type のタイトル |
| `emoji` | type に対応する絵文字 |
