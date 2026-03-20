# @document

外部ファイルを生成されるサイト内のドキュメントとして含めることを指示するブロックタグ。

## 構文

```
@document ファイルパス
```

## 詳細説明

`@document` タグは、タグ内容で指定されたパスのファイルを生成されるサイト内のドキュメントとして含めるようTypeDocに指示する。これにより、外部のマークダウンファイルなどをAPIドキュメントに統合できる。

## コード例

```typescript
/**
 * @document promise-tutorial.md
 */
export class Promise<T> {
    // ...
}
```

## 注意点

- 指定するパスは相対パスまたは絶対パスが使用可能
- 外部ドキュメントの詳細な使用方法については「External Documents」ガイドを参照
- `projectDocuments` オプションと関連する設定がある

## 関連

- `projectDocuments` オプション -- プロジェクト内のドキュメント管理
