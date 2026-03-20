# @eventProperty

リフレクションを「Events」グループに分類するモディファイアタグ。`@group Events` を指定するのと同等。TSDoc 仕様に準拠。

## 構文

```
/** @eventProperty */
```

## 詳細説明

`@eventProperty` タグは、`@event` と同様に、ドキュメント対象のメンバーを「Events」グループに配置する。TSDoc 仕様で定義されたタグであり、`@group Events` のショートハンドとして機能する。

`@event` タグと機能的には同等だが、TSDoc 標準に準拠するプロジェクトではこちらを使用することがある。

## コード例

```typescript
export class App extends EventEmitter {
    /**
     * リクエスト受信時に発火するイベント。
     * @eventProperty
     */
    static ON_REQUEST = "request";
}
```

```typescript
import { EventEmitter } from "events";

export class WebSocket extends EventEmitter {
    /**
     * メッセージ受信イベント。
     * @eventProperty
     */
    static MESSAGE = "message";

    /**
     * 接続クローズイベント。
     * @eventProperty
     */
    static CLOSE = "close";
}
```

## 注意点

- TSDoc 仕様に準拠したタグ
- `@event` と機能的に同等
- `@group Events` のショートハンドとして動作する

## 関連

- [@event](./event.md)
- [@group](../tags-block/group.md)
