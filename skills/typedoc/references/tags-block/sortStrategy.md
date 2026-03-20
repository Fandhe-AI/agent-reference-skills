# @sortStrategy

宣言レベルでグローバルなソート設定をオーバーライドするブロックタグ。

## 構文

```
@sortStrategy ソート戦略名
```

## 詳細説明

`@sortStrategy` タグはモジュール、名前空間、クラス、またはインターフェースに対して `sort` オプションをローカルにオーバーライドするために使用できる。

ソートはタグが配置された宣言の直接の子要素に適用される。ただし、子要素がさらに子要素を持つ場合（例: ネストされた名前空間）、孫要素は `@sortStrategy` タグに従ってソートされない。

## コード例

```typescript
/**
 * @sortStrategy source-order
 */
export class Class {
    commonMethod(): void;
    commonMethod2(): void;
    lessCommonMethod(): void;
    uncommonMethod(): void;
}
```

上記の例では、メソッドがアルファベット順にソートされるのではなく、ソースコードの記述順で表示される。

## 注意点

- 直接の子要素にのみ適用される（孫要素には適用されない）
- モジュール、名前空間、クラス、インターフェースに使用可能
- ソート戦略名は `--sort` オプションで使用可能な値と同じ（例: `source-order`, `alphabetical`）

## 関連

- `--sort` オプション -- グローバルなソート設定
