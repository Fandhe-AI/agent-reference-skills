# @commitlint/read

Git リポジトリからコミットメッセージを読み取る。

> https://commitlint.js.org/api/read

## インストール

```sh
npm install --save @commitlint/read
```

## 型定義

```typescript
type Range = {
  /** Lower end of the commit range to read */
  from?: string;
  /** Upper end of the commit range to read */
  to?: string;
  /** Read from ./.git/COMMIT_EDITMSG or custom path */
  edit?: boolean | string;
};
```

## 関数シグネチャ

```typescript
read(range: Range) => Promise<string[]>;
```

## インポート

```javascript
import read from "@commitlint/read";
```

## 使用例

### edit フラグ（COMMIT_EDITMSG から読み取り）

```javascript
const result = await read({ edit: true });
console.info(result);
// => ['I did something\n\n']
```

### 直近 2 コミットの読み取り

```javascript
const result = await read({ from: "HEAD~2" });
console.info(result);
// => ['I did something\n\n', 'Initial commit\n\n']
```

### 範囲指定

```javascript
const result = await read({ from: "HEAD~2", to: "HEAD~1" });
console.info(result);
// => ['Initial commit\n\n']
```

### カスタムファイルからの読み取り

```javascript
const result = await read({ edit: "./git/GITGUI_EDITMESSAGE" });
console.info(result);
// => ['I did something via git gui\n\n']
```
