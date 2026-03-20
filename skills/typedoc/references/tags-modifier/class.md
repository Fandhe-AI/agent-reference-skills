# @class

変数宣言をクラスとしてドキュメント化するモディファイアタグ。「動的」プロパティを実際のプロパティに展開する。

## 構文

```
/** @class */
```

## 詳細説明

`@class` タグを変数に付与すると、TypeDoc はその変数をクラスとして変換する。このとき、以下の処理が行われる:

1. **プロパティの展開**: すべての「動的」プロパティが実際のプロパティとして展開される
2. **名前の解決**: `@class` アノテーションが付けられた変数と同じ名前で宣言された型やインターフェースは無視される
3. **オーバーロードの処理**: コンストラクタ関数に複数のオーバーロードがある場合、最初のオーバーロードの戻り値の型がクラスの形状を決定するために使用される
4. **ジェネリクスのサポート**: コンストラクタ関数がジェネリックな場合、型パラメータはコンストラクタ関数からクラスの型パラメータに昇格する

主に JavaScript プロジェクトで、クラス構文を使わずにコンストラクタ関数パターンで定義されたクラスをドキュメント化する場合に有用。

## コード例

```javascript
/** @class */
export function ClassLike() {
    if (new.target) {
        //
    }
}
```

```javascript
/**
 * ユーザーオブジェクトを生成する。
 * @class
 */
export function User(name, email) {
    if (!(this instanceof User)) {
        return new User(name, email);
    }
    this.name = name;
    this.email = email;
}

User.prototype.greet = function () {
    return `Hello, ${this.name}`;
};
```

## 注意点

- 主に JavaScript のコンストラクタ関数パターンで使用される
- 同名の型/インターフェース宣言は TypeDoc により無視される
- コンストラクタ関数のオーバーロードがある場合、最初のオーバーロードの戻り値型がクラス形状となる
- ジェネリックなコンストラクタ関数では、型パラメータがクラスレベルに昇格する

## 関連

- [@interface](./interface.md)
- [@function](./function.md)
- [@namespace](./namespace.md)
