# Rules Configuration

> Source: https://commitlint.js.org/reference/rules-configuration

ルール設定の形式、レベル、適用モードの詳細。

## ルール設定の構造

ルール設定は 3 つの要素で構成される配列:

```
[Level, Applicable, Value]
```

### Level `[0..2]`

| レベル | 意味 |
|--------|------|
| `0` | ルールを無効化 |
| `1` | warning（警告） |
| `2` | error（エラー） |

### Applicable `always | never`

| 値 | 意味 |
|-----|------|
| `always` | ルールをそのまま適用 |
| `never` | ルールを反転して適用 |

### Value

各ルール固有のパラメータ値。

## 設定形式

ルール設定は以下の 3 つの形式で定義できる。

### 形式 1: プレーン配列

直接配列として定義する。

```javascript
export default {
  rules: {
    "header-max-length": [0, "always", 72],
  },
};
```

### 形式 2: 関数（同期）

同期関数として定義し、配列を返す。

```javascript
export default {
  rules: {
    "header-max-length": () => [0, "always", 72],
  },
};
```

### 形式 3: 非同期関数

非同期関数として定義し、Promise<配列> を返す。

```javascript
export default {
  rules: {
    "header-max-length": async () => [0, "always", 72],
  },
};
```

## 原則

> Rule configurations are either of type `array` residing on a key with the rule's name as key on the `rules` object, or of type `function` returning type `array` or `Promise<array>`.

ルール設定は、`rules` オブジェクト上でルール名をキーとする `array` 型、または `array` もしくは `Promise<array>` を返す `function` 型のいずれかである。

## 使用例

### warning レベルで header の最大長を制限

```javascript
export default {
  rules: {
    "header-max-length": [1, "always", 100],
  },
};
```

### error レベルで type を必須にする

```javascript
export default {
  rules: {
    "type-empty": [2, "never"],
  },
};
```

### ルールを無効化する

```javascript
export default {
  rules: {
    "body-leading-blank": [0],
  },
};
```

### 非同期で外部からルール値を取得

```javascript
export default {
  rules: {
    "scope-enum": async () => {
      const scopes = await fetchScopesFromAPI();
      return [2, "always", scopes];
    },
  },
};
```
