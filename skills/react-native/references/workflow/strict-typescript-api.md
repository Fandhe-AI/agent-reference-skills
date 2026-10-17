---
source: https://reactnative.dev/docs/0.87/strict-typescript-api
---

# Strict TypeScript API

The Strict TypeScript API is React Native's modern TypeScript API, replacing the previous hand-maintained TypeScript definitions from earlier versions.

## Signature / Usage

Opting out (Since 0.87) — revert to the previous manual types via `tsconfig.json`:

```diff
  {
    "extends": "@react-native/typescript-config",
    "compilerOptions": {
      ...
+     "customConditions": ["react-native", "react-native-legacy-deep-imports"]
    }
  }
```

Refs now use `*Instance` types (Since 0.87):

```tsx
import {useRef} from 'react';
import {
  TextInput,
  View,
  type TextInputInstance,
  type ViewInstance,
} from 'react-native';

function MyComponent() {
  const viewRef = useRef<ViewInstance>(null);
  const inputRef = useRef<TextInputInstance>(null);

  return (
    <>
      <View ref={viewRef} />
      <TextInput ref={inputRef} />
    </>
  );
}
```

### Key changes (breaking)

1. **No deep imports.** The API is restricted to `react-native`'s index file. This is a tighter and more intentional public API contract. It also ensures that internal file path changes in React Native's source code won't be breaking.
2. **Generated directly from source.** Previously, React Native used separately maintained manual types. Generating from source now means we improve coverage, correctness, and compatibility guarantees.

### Migration guide

Use the [/migrate-to-strict-api](https://www.skills.sh/react-native-community/skills/migrate-to-strict-api) skill to migrate your codebase via an agent:

```sh
npx skills add react-native-community/skills --skill migrate-to-strict-api
```

#### Before you start

Enabling the Strict API — by upgrading to 0.87, or by opting in on an earlier release — affects TypeScript analysis of your own project only, scoped by its `tsconfig.json`. In most cases, codebases can migrate independently.

- **Keep `skipLibCheck` enabled.** `@react-native/typescript-config` enables it by default. If your project overrides it, turn it back on before you start — otherwise you will see errors in dependencies that you can't fix.
- **Update your dependencies.** Whenever type errors involve a library, check for and update to a fixed release first. Some libraries ship raw TypeScript source that your project imports, e.g. Jest setup files; these are typechecked as part of your project. Fixed: `@expensify/react-native-live-markdown` in 0.1.335; `react-native-safe-area-context` in 5.8.1.
- **Advanced: Excluding an incompatible library.** If an incompatible library is producing errors under `node_modules` (typically `TS2307: Cannot find module 'react-native/Libraries/...'`), exclude it as a local fix by redirecting the imported subpath to an untyped stub:

```json
{
  "compilerOptions": {
    "paths": {
      "some-library/jest/mock": ["./untyped-module.d.ts"]
    }
  }
}
```

```ts
declare const anyExport: unknown;
export default anyExport;
```

#### New `CodegenTypes` namespace

Types used for codegen, like `Int32`, `Double`, `WithDefault` etc. are now available under a single `CodegenTypes` namespace. Similarly, `codegenNativeComponent` and `codegenNativeCommands` are now available to import from the react-native package instead of using the deep import. Namespaced `CodegenTypes` as well as `codegenNativeCommands` and `codegenNativeComponent` are also available from `react-native` when the Strict API is not enabled to make the adoption easier for third-party libraries.

Before:

```ts
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {
  Int32,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';
import type {ViewProps} from 'react-native';

interface NativeProps extends ViewProps {
  enabled?: WithDefault<boolean, true>;
  size?: Int32;
}

export default codegenNativeComponent<NativeProps>(
  'RNCustomComponent',
);
```

After:

```ts
import {
  CodegenTypes,
  codegenNativeComponent,
  type ViewProps,
} from 'react-native';

interface NativeProps extends ViewProps {
  enabled?: CodegenTypes.WithDefault<boolean, true>;
  size?: CodegenTypes.Int32;
}

export default codegenNativeComponent<NativeProps>(
  'RNCustomComponent',
);
```

#### Refs now use `*Instance` types (Since 0.87)

Each built-in component now has a dedicated `*Instance` type for use with refs — for example, `ViewInstance`, `TextInputInstance`, `ScrollViewInstance`. These are the **recommended way to type refs** under the Strict TypeScript API. Previously, `useRef<View>` worked because `View` and other components were typed as a class. Under the Strict API, built-in components are typed as functions, so `View` refers to the function itself — **component type names no longer work as ref types**.

Before:

```tsx
const viewRef = useRef<View>(null);
const inputRef = useRef<TextInput>(null);
```

`*Instance` types also work transparently with `Animated` variants — no separate type is needed:

```tsx
const viewRef = useRef<ViewInstance>(null);

<View ref={viewRef} />
<Animated.View ref={viewRef} />
```

This also replaces the removed `Animated.LegacyRef` type. Code using `ref={ref as React.Ref<Animated.LegacyRef<View>>}` can be simplified to `ref={ref}` with a `ViewInstance`-typed ref.

| Component | Instance type |
| --- | --- |
| `ActivityIndicator` | `ActivityIndicatorInstance` |
| `Button` | `ButtonInstance` |
| `DrawerLayoutAndroid` | `DrawerLayoutAndroidInstance` |
| `FlatList` | `FlatListInstance` |
| `Image` | `ImageInstance` |
| `ImageBackground` | `ImageBackgroundInstance` |
| `KeyboardAvoidingView` | `KeyboardAvoidingViewInstance` |
| `Modal` | `ModalInstance` |
| `Pressable` | `PressableInstance` |
| `ProgressBarAndroid` | `ProgressBarAndroidInstance` |
| `RefreshControl` | `RefreshControlInstance` |
| `SafeAreaView` | `SafeAreaViewInstance` |
| `ScrollView` | `ScrollViewInstance` |
| `SectionList` | `SectionListInstance` |
| `StatusBar` | `StatusBarInstance` |
| `Switch` | `SwitchInstance` |
| `Text` | `TextInstance` |
| `TextInput` | `TextInputInstance` |
| `TouchableHighlight` | `TouchableHighlightInstance` |
| `TouchableNativeFeedback` | `TouchableNativeFeedbackInstance` |
| `TouchableOpacity` | `TouchableOpacityInstance` |
| `View` | `ViewInstance` |
| `VirtualizedList` | `VirtualizedListInstance` |
| `VirtualizedSectionList` | `VirtualizedSectionListInstance` |

Components without ref support (`InputAccessoryView`, `TouchableWithoutFeedback`, `experimental_LayoutConformance`) do not have instance types.

| Before | After |
| --- | --- |
| `useRef<View>(null)` | `useRef<ViewInstance>(null)` |
| `useRef<React.ComponentRef<typeof View>>(null)` | `useRef<ViewInstance>(null)` |
| `useRef<HostInstance>(null)` (for a specific component) | `useRef<ViewInstance>(null)` |
| `Ref<Animated.LegacyRef<View>>` | `Ref<ViewInstance>` |

`React.ComponentRef<typeof View>` remains valid and produces the same type as `ViewInstance`. The `*Instance` types are convenient aliases — both approaches work.

#### Removal of `*Static` types

Before:

```tsx
import {Linking, LinkingStatic} from 'react-native';

function foo(linking: LinkingStatic) {}
foo(Linking);
```

After:

```tsx
import {Linking} from 'react-native';

function foo(linking: Linking) {}
foo(Linking);
```

The following APIs were previously named as `*Static` plus a variable declaration of said type. In most cases there was an alias so that value and the type were exported under the same identifier, but some were missing: `AlertStatic`, `ActionSheetIOSStatic`, `ToastAndroidStatic`, `InteractionManagerStatic` (no `InteractionManager` type alias), `UIManagerStatic`, `PlatformStatic`, `SectionListStatic`, `PixelRatioStatic` (no `PixelRatio` alias), `AppStateStatic`, `AccessibilityInfoStatic`, `ImageResizeModeStatic`, `BackHandlerStatic`, `DevMenuStatic` (no `DevMenu` alias), `ClipboardStatic`, `PermissionsAndroidStatic`, `ShareStatic`, `DeviceEventEmitterStatic`, `LayoutAnimationStatic`, `KeyboardStatic` (no `Keyboard` alias), `DevSettingsStatic` (no `DevSettings` alias), `I18nManagerStatic`, `EasingStatic`, `PanResponderStatic`, `NativeModulesStatic` (no `NativeModules` alias), `LogBoxStatic`, `PushNotificationIOSStatic`, `SettingsStatic`, `VibrationStatic`.

#### Updating test mocks

In most projects, no changes are needed here. Existing `jest.mock()` calls against `react-native/*` paths keep working — the Strict API doesn't change how module paths resolve in Jest or Metro, and a `jest.mock()` path string isn't type-checked. If a test file imports a deep path as a module (for example, to wrap the real implementation from `jest.requireActual()`), TypeScript will report the import as untyped. Where no root export covers the use case, you can keep the import and quiet the error:

```ts
// @ts-expect-error - React Native internal, untyped under the Strict API
import NativeAppState from 'react-native/Libraries/AppState/NativeAppState';
```

### Other breaking changes

#### `InitializeCore` is now `react-native/setup-env` (Since 0.87)

Unlike other deep imports, this module is a side-effect entry point with no root `react-native` equivalent. `InitializeCore` is deprecated since 0.87. Most apps never import this directly — it's typically found in Jest setup files and custom entry points.

```diff
- import 'react-native/Libraries/Core/InitializeCore';
+ import 'react-native/setup-env';
```

#### Changes to Animated types

Animated nodes were previously generic types based on their interpolation output. Now, they are non-generic types with a generic `interpolate` method. `Animated.LegacyRef` is no longer available. Use the appropriate `*Instance` type instead (e.g. `ViewInstance` for `Animated.View`).

#### Unified types for optional props

In the new types, every optional prop will be typed as `type | undefined`.

#### Removal of some deprecated types

The long-deprecated `*Properties` aliases are inaccessible under the Strict API. Each alias has a direct replacement: `ViewProperties` becomes `ViewProps`, `TextInputProperties` becomes `TextInputProps`, and so on (plus `ImagePropertiesSourceOptions`, which becomes `ImageSourcePropType`). The full list is in `packages/react-native/types/public/DeprecatedPropertiesAlias.d.ts` in the React Native repository.

#### Removal of leftover component props

Some properties that were defined in type definitions but were not used by the component or were lacking a definition were removed (for example: `lineBreakMode` on `Text`, `scrollWithoutAnimationTo` on `ScrollView`, transform styles defined outside of transform array).

#### Removal of internal-only helper types

Due to the configuration of the previous type definitions, every defined type was accessible from the `react-native` package, including helper types only supposed to be used internally. Notable examples: StyleSheet-related types (`RecursiveArray`, `RegisteredStyle`, `Falsy`) and Animated types (`WithAnimatedArray`, `WithAnimatedObject`).

### FAQs

- **Does this change anything at runtime?** No. The Strict API changes which type definitions TypeScript resolves — both modes resolve the same JavaScript, and your bundle is unaffected. Note that 0.87 separately removes `react-native/src/private/*` from the package's exports, which does affect runtime. That change is independent of the Strict API.
- **I maintain a library. Do I need to migrate before my users can upgrade?** No — libraries and apps should be able to migrate independently. The Strict API is enabled per project, through each project's own `tsconfig.json`. Any raw TypeScript source you ship for consumers to import (such as a Jest mock entry point) is typechecked inside their projects, so it must not rely on deep imports — ship compiled output with `.d.ts` files instead. You should still plan to migrate your own source: the legacy types opt-out is temporary.
- **An API I use isn't exported from `react-native`. Is that a bug?** In most cases this is intentional. The RFC scoped the public API to what `react-native`'s index file exports. If you depend on something with no root equivalent, tell the maintainers in the [discussion thread](https://github.com/react-native-community/discussions-and-proposals/discussions/1015).
- **Why were React Native's manual types replaced?** React Native is authored in Flow, not TypeScript. Its TypeScript types were previously community-contributed and hand-maintained (originating from `@types/react-native` on DefinitelyTyped), leaving correctness gaps — generating them from source code ensures the types always match the implementation.

## Notes

- New in 0.87: **The Strict API is now enabled by default** (previously an opt-in from 0.80+). This is a **breaking change**.
- The opt-out will be removed in a future release (original: "in a future release we will remove this opt out").
- The 0.87 rollout of the Strict API by default is an ecosystem-wide change; if you opt out in 0.87 or later, the maintainers ask for feedback in the discussion thread above.
- Deviation from official docs: View and TextInput are imported as values (the official "After" snippet uses `import type` and then renders them as JSX, which TypeScript rejects with TS1361); only the `*Instance` types use the `type` modifier. `ViewProps` is also imported in the CodegenTypes before/after snippets, which omit it.
- This page is about React Native's own type definitions; the TypeScript language itself is out of scope.

## Related

- [typescript.md](./typescript.md)
