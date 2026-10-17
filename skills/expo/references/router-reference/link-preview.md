---
source: https://docs.expo.dev/router/reference/link-preview/
---

# Link preview

Link preview (also known as "Peek and Pop") shows a preview popup of the screen for a link on iOS. It is an iOS-only feature available in SDK 54 and later.

## Signature / Usage

Replace the link's content with `Link.Trigger` and add `Link.Preview`:

```tsx
import { Link } from 'expo-router';

export default function Page() {
  return (
    <Link href="/about">
      <Link.Trigger>About</Link.Trigger>
      <Link.Preview />
    </Link>
  );
}
```

Custom size (a preferred size; the system may override it):

```tsx
<Link href="...">
  <Link.Trigger>Content</Link.Trigger>
  <Link.Preview style={{ width: 300, height: 200 }} />
</Link>
```

Custom preview content replaces the default preview of the link target:

```tsx
import { useState } from 'react';
import { Image, useWindowDimensions, type ImageSourcePropType } from 'react-native';
import { Link } from 'expo-router';

const source: ImageSourcePropType = { uri: 'https://example.com/photo.jpg' };

export default function Page() {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const { width } = useWindowDimensions();
  const previewHeight = (width / imageSize.width) * imageSize.height;

  return (
    <Link href="/about">
      <Link.Trigger>About</Link.Trigger>
      <Link.Preview style={{ width, height: previewHeight }}>
        <Image
          onLoad={e => setImageSize(e.nativeEvent.source)}
          source={source}
          style={{ width: '100%', height: '100%' }}
        />
      </Link.Preview>
    </Link>
  );
}
```

Context menu with SF Symbols icons:

```tsx
<Link href="/about">
  <Link.Trigger>About</Link.Trigger>
  <Link.Menu>
    <Link.MenuAction title="Share" icon="square.and.arrow.up" onPress={handleSharePress} />
    <Link.MenuAction title="Block" icon="nosign" destructive onPress={handleBlockPress} />
  </Link.Menu>
</Link>
```

Nested menus:

```jsx
<Link href="...">
  <Link.Trigger>About</Link.Trigger>
  <Link.Menu>
    <Link.MenuAction title="Share" icon="square.and.arrow.up" onPress={() => {}} />
    <Link.Menu title="More" icon="ellipsis">
      <Link.MenuAction title="Copy" icon="doc.on.doc" onPress={() => {}} />
      <Link.MenuAction title="Delete" icon="trash" destructive onPress={() => {}} />
    </Link.Menu>
  </Link.Menu>
</Link>
```

Corner radius with `asChild`: iOS lifts the direct child of `Link.Trigger` and applies rounded corners. Set `borderRadius` on that child to preserve the radius (a child with `borderRadius: 0` still gets rounded corners):

```tsx
<Link href="/about" asChild>
  <Link.Trigger>
    <Pressable style={{ width: 100, height: 100, borderRadius: 16, backgroundColor: '#ff6a00' }} />
  </Link.Trigger>
  <Link.Menu>
    <Link.MenuAction title="Share" icon="square.and.arrow.up" onPress={handleSharePress} />
  </Link.Menu>
</Link>
```

If a nested view has a `borderRadius`, set the same value on the `Pressable`.

Detect rendering inside a preview with `useIsPreview()`:

```jsx
function MyComponent() {
  // This will be true if component/screen is being rendered inside a preview
  const isInsidePreview = useIsPreview();

  return isInsidePreview ? <Text>From within preview</Text> : <Text>I am outside of preview</Text>;
}
```

## Notes

- By default the preview is rendered as a full-sized page snapshot.
- Known limitations:
  - `replace` mode is not supported; previews work only with the default `push` navigation mode.
  - In JavaScript tabs or `Slot`, preview transition animations may appear clunky (React delayed rendering vs the immediate native animation). Use native tabs and stack navigators.
  - Rendering a `Link` with a preview or context menu without a `Link.Trigger` throws an exception; so does placing any non-`Link.*` component directly inside `Link` in preview mode.
  - With `asChild`, `Link.Trigger` may have only one child; `onPress` is forwarded to that child only.
  - Changing the `href` path dynamically while the preview is open is not supported; only query parameters may be changed.
- The official custom preview snippet has no import statements and leaves `source` undefined; the imports and the placeholder `source` above were added here so the example compiles.
- All `Link.MenuAction` customization options are in the Router Link API page.
- Source: https://docs.expo.dev/router/reference/link-preview/ (unversioned guide, fetched 2026-10-17, modificationDate October 15, 2026).

## Related

- [Router Link](./router-link.md)
