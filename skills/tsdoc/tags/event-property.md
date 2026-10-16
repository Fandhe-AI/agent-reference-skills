# @eventProperty

クラス・インターフェースのプロパティが、イベントハンドラーをアタッチできるイベントオブジェクトを返すことを示すモディファイアタグ。

## 構文

```
@eventProperty
```

## 使用例

```typescript
class MyClass {
  /**
   * This event is fired whenever the application navigates to a new page.
   * @eventProperty
   */
  public readonly navigatedEvent: FrameworkEvent<NavigatedEventArgs>;
}
```

## 注意

- 標準化区分: Extended、構文種別: Modifier
- イベント処理 API は実装依存。通常は `addHandler()` / `removeHandler()` を持つクラスを返す
- ドキュメントツールは該当プロパティを "Properties" ではなく "Events" 見出しで表示できる
- TypeDoc では `@group Events` 指定と等価で、reflection を "Events" グループへ入れる
- 提案経緯: microsoft/tsdoc の RFC #30（`@eventClass` / `@eventProperty`）

## 関連

- [@internal](./internal.md)
