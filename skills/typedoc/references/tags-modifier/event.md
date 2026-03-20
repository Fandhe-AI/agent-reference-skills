# @event

リフレクションを「Events」グループに分類するモディファイアタグ。`@group Events` を指定するのと同等。

## 構文

```
/** @event */
```

## 詳細説明

`@event` タグは、クラスのプロパティやメソッドをイベント関連のメンバーとしてマークし、生成されるドキュメントの「Events」グループに自動的に配置する。`@group Events` のショートハンドとして機能する。

イベント駆動型のクラス（特に `EventEmitter` を継承するクラス）で、イベント関連のメンバーをドキュメント上で明確に分類するために使用する。

## コード例

```typescript
export class App extends EventEmitter {
    /**
     * リクエスト受信時に発火するイベント。
     * @event
     */
    static ON_REQUEST = "request";
}
```

```typescript
import { EventEmitter } from "events";

export class Server extends EventEmitter {
    /**
     * サーバー起動時のイベント。
     * @event
     */
    static STARTED = "started";

    /**
     * 接続時のイベント。
     * @event
     */
    static CONNECTION = "connection";

    /**
     * エラー発生時のイベント。
     * @event
     */
    static ERROR = "error";
}
```

## 注意点

- `@group Events` と同等の効果を持つショートハンド
- ドキュメントの「Events」セクションにメンバーが自動的にグループ化される

## 関連

- [@eventProperty](./eventProperty.md)
- [@group](../tags-block/group.md)
