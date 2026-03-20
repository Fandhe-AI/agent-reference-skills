# @param / @this

関数やメソッドのパラメータを文書化するブロックタグ。このページでは `@param` と `@this` を扱う。

## 構文

```
@param パラメータ名 - 説明
```

```
@param パラメータ名.プロパティ名 - 説明
```

```
@this 型名
```

## 詳細説明

### @param（ブロックタグ）

関数やメソッドのパラメータを文書化する。TSDocの仕様に準拠している。

**基本的な使用法**: `@param name - description` の形式でパラメータ名と説明を記述する。

**オブジェクトリテラルのサポート**: オブジェクト型のパラメータの場合、ドット記法（例: `@param options.value`）を使用してネストされたプロパティを文書化できる。ただし、サポートされるのは1レベルの深さまで。

**分割代入パラメータ**: TypeDocは `@param` タグから分割代入パラメータ名を自動推論する。推論を成功させるにはすべてのパラメータを文書化する必要がある。文書化されていない場合、パラメータは `__namedParameters` として表示される。

**JSDoc互換性**: TypeDocは互換性向上のため柔軟な構文バリエーションをサポートする。型注釈の有無やハイフン区切りの有無に関わらず、すべてのバリアントを同じように処理する。

以下の形式はすべて同一に処理される：
- `@param test - description`
- `@param test description`
- `@param {string} test - description`
- `@param {string} test description`

### @this（ブロックタグ）

JavaScriptで `this` を使用する関数の `this` の型を指定する。TypeDocはこの情報をパラメータの説明に組み込む。

## コード例

### 基本的な @param の使用

```typescript
/**
 * @param a - the first number
 * @param b - the second number
 */
export function sum(a: number, b: number): number;
```

### オブジェクトプロパティの文書化

```typescript
/**
 * @param options - Configuration options
 * @param options.value - The value to set
 * @param options.name - The name to use
 */
export function configure(options: { value: number; name: string }): void;
```

### 分割代入パラメータ

```typescript
/**
 * @param value - The value
 * @param name - The name
 */
export function configure({ value, name }: { value: number; name: string }): void;
```

### @this の使用

```javascript
/**
 * @this {Response}
 * @param {Request} req
 */
function handler(req) {
    this.send("OK");
}
```

## 注意点

- オブジェクトプロパティのドット記法は1レベルの深さまでサポート
- 分割代入パラメータの自動推論にはすべてのパラメータの文書化が必要
- TypeDocはJSDoc互換の柔軟な構文をサポート
- `@this` は主にJavaScriptプロジェクトで使用される

## 関連

- [@returns](./returns.md) -- 戻り値の文書化
- [@typeParam](./typeParam.md) -- 型パラメータの文書化
- [@expand](./expand.md) -- パラメータ型の展開制御
- [TSDoc @param](https://tsdoc.org/pages/tags/param/)
