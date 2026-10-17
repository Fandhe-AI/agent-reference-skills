---
source: https://docs.expo.dev/guides/dom-components/
---

# Using React DOM in Expo native apps

DOM components render web (React DOM) code inside a native app via the `'use dom'` directive, enabling per-component migration of a website to a universal app.

## Signature / Usage

```tsx
// my-component.tsx (web)
'use dom';

export default function DOMComponent({ name }: { name: string }) {
  return (
    <div>
      <h1>Hello, {name}</h1>
    </div>
  );
}
```

```tsx
// App.tsx (native)
import DOMComponent from './my-component.tsx';

export default function App() {
  return <DOMComponent name="Europa" />;
}
```

Native actions (top-level async function props) and refs:

```tsx
'use dom';

import { useDOMImperativeHandle, type DOMImperativeFactory } from 'expo/dom';
import { Ref, useRef } from 'react';

export interface DOMRef extends DOMImperativeFactory {
  focus: () => void;
}

export default function MyComponent(props: { ref: Ref<DOMRef>; dom?: import('expo/dom').DOMProps }) {
  const inputRef = useRef<HTMLInputElement>(null);
  useDOMImperativeHandle(props.ref, () => ({ focus: () => inputRef.current?.focus() }), []);
  return <input ref={inputRef} />;
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `dom` | object | Built into every DOM component; accepts WebView props (for example `scrollEnabled`, `style`, `containerStyle`). Type it with `import('expo/dom').DOMProps`. |
| `dom.useExpoDOMWebView` | boolean | `false` opts out of `@expo/dom-webview` and uses `react-native-webview` (SDK 56 and later). |
| `dom.matchContents` | boolean | Measures the DOM component and resizes the native view. |
| `IS_DOM` | const (`expo/dom`) | Detects running inside a DOM component. |
| `process.env.EXPO_DOM_HOST_OS` | `ios` \| `android` \| `undefined` | Top native platform; `undefined` on web. `process.env.EXPO_OS` is always `web` in a DOM component. |

## Notes

- SDK 56 and later use `@expo/dom-webview` by default with no extra install; SDK 55 and earlier need `react-native-webview`. Non-Expo-Router projects need `@expo/metro-runtime react-dom react-native-web`.
- Marshalled props must be serializable (`number`, `string`, `boolean`, `null`, `undefined`, `Array`, `Object`), travel over an asynchronous bridge and re-render the whole React tree. Functions must be top-level props, asynchronous, with serializable arguments. `children` cannot be passed.
- SDK 53 and later (React 19) pass `ref` as a prop; SDK 52 and earlier use `forwardRef`. Refs are flaky; prefer native actions.
- Routing: `<Link />` (`expo-router/link`) and `useRouter` work. `useLocalSearchParams`, `useGlobalSearchParams`, `usePathname`, `useSegments`, `useRootNavigation`, `useRootNavigationState`, `router.canGoBack()` and `router.canDismiss()` are not supported automatically; read them natively and pass as props. Layout routes (`_layout`) can never be DOM components. Avoid `<a />` for navigation.
- Public assets: root **public** is copied into the native binary; reference with `process.env.EXPO_BASE_URL`. Not supported in EAS Update (use `require()`).
- Only single-page rendering (no SSR / SSG). With React Server Components, `'use dom'` behaves like `'use client'`; Server Functions cannot be used inside DOM components.
- Secure context: release builds (`file://`) are secure; debug builds can tunnel over HTTPS with `npx expo start --tunnel`.
- Limitations: no native views inside DOM components, no shared global state across JS engines, DOM components are slower to start than Hermes bytecode; prefer truly native views when possible.
- The Expo "Skills" mentioned in the source (expo-dom, expo-web-to-native) are Expo's AI agent skills, not this repository's skills.
- Pinned: documentation fetched 2026-10-17, Expo SDK 58.

## Related

- [Server components](./server-components.md)
- [Develop websites with Expo](./web.md)
