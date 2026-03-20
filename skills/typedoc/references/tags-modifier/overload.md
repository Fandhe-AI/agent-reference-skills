# @overload

JavaScript プロジェクトで関数のオーバーロードを宣言するためのモディファイアタグ。TypeScript 5.0 以降で認識される。

## 構文

```
/**
 * @overload
 * @param {型} パラメータ名 説明
 * @return {戻り値型}
 */
```

## 詳細説明

`@overload` タグは、JavaScript プロジェクトにおいて関数の複数のシグネチャ（オーバーロード）を定義するために使用される。TypeScript 5.0 で導入された JSDoc オーバーロードサポートに対応している。

このタグは生成されるドキュメントから自動的に除去され、各オーバーロードの `@param` と `@return` 情報のみが関数のシグネチャとして表示される。

## コード例

```javascript
/**
 * @overload
 * @param {string} value 文字列値
 * @return {void}
 */
/**
 * @overload
 * @param {number} value 数値
 * @param {number} [maximumFractionDigits] 最大小数桁数
 * @return {void}
 */
/**
 * @param {string | number} value
 * @param {number} [maximumFractionDigits]
 */
function printValue(value, maximumFractionDigits) {
    if (typeof value === "number") {
        console.log(value.toFixed(maximumFractionDigits));
    } else {
        console.log(value);
    }
}
```

上記の例では、`printValue` 関数に2つのオーバーロードシグネチャが定義される:
1. `printValue(value: string): void`
2. `printValue(value: number, maximumFractionDigits?: number): void`

## 注意点

- JavaScript プロジェクト向けのタグ（TypeScript ではネイティブのオーバーロード構文を使用）
- TypeScript 5.0 以降で認識される
- 生成されるドキュメントからは自動的に除去される
- `--excludeTags` オプションで除外可能

## 関連

- [@param](../tags-block/param.md)
- [@returns](../tags-block/returns.md)
