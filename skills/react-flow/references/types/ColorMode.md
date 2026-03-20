# ColorMode

Union type controlling the color theme of the React Flow diagram.

## 型定義

```typescript
type ColorMode = 'light' | 'dark' | 'system';
```

## 値一覧

| Value | Description |
|-------|-------------|
| `'light'` | Light theme |
| `'dark'` | Dark theme |
| `'system'` | Respects the user's OS/browser color scheme preference |

## 使用例

```tsx
import { ReactFlow, ColorMode } from '@xyflow/react';

const colorMode: ColorMode = 'system';

<ReactFlow
  nodes={nodes}
  edges={edges}
  colorMode={colorMode}
/>
```

## 注意点

- `'system'` を指定すると `prefers-color-scheme` メディアクエリを自動で参照する
- CSS カスタムプロパティを使ってテーマをカスタマイズできる

## 関連

- [BackgroundVariant](./BackgroundVariant.md)
