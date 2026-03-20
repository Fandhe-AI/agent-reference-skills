# useKeyPress

指定したキーコードが現在押下されているかどうかを返すフック。

## Signature

```ts
useKeyPress(
  keyCode: KeyCode | KeyCode[] | null,
  options?: {
    target?: Window | Document | HTMLElement | ShadowRoot | null;
    actInsideInputWithModifier?: boolean;
    preventDefault?: boolean;
  }
): boolean
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `keyCode` | `KeyCode \| KeyCode[] \| null` | — | 監視するキー。単一キー (`'a'`)、`+` 区切りの組み合わせ (`'Meta+s'`)、または配列 (`['a', 'd+s']`) を指定 |
| `options.target` | `Window \| Document \| HTMLElement \| ShadowRoot \| null` | `document` | キーイベントを監視する対象要素 |
| `options.actInsideInputWithModifier` | `boolean` | `true` | input フォーカス中にフックを動作させるか |
| `options.preventDefault` | `boolean` | — | デフォルトのキーボード動作を抑制するか |

## Returns

`boolean` — 指定したキー（の組み合わせ）が現在押されていれば `true`

## 使用例

```tsx
import { useKeyPress } from '@xyflow/react';

export default function Demo() {
  const spacePressed = useKeyPress('Space');
  const savePressed = useKeyPress(['Meta+s', 'Strg+s']);

  return (
    <div>
      {spacePressed && <p>Space is pressed!</p>}
      {savePressed && <p>Cmd/Ctrl + S pressed!</p>}
    </div>
  );
}
```

## 注意点

- `ReactFlowInstance` に依存しないため、フロー外の任意のコンポーネントで使用可能
- キー組み合わせは `+` で区切る（例: `'Shift+a'`、`'Meta+Shift+z'`）
- 配列を渡すと「いずれかのキー/組み合わせが押された場合」を検出できる

## 関連

- [useReactFlow.md](./useReactFlow.md)
