---
source: https://reactnative.dev/docs/0.87/appendix
---

# Appendix

Terminology for the New Architecture native development guides and the Codegen type mapping table (Flow / TypeScript to Java / Objective-C).

## Signature / Usage

Codegen typings:

| Flow | TypeScript | Flow Nullable Support | TypeScript Nullable Support | Android (Java) | iOS (ObjC) |
| --- | --- | --- | --- | --- | --- |
| `string` | `string` | `?string` | `string \| null` | `string` | `NSString` |
| `boolean` | `boolean` | `?boolean` | `boolean \| null` | `Boolean` | `NSNumber` |
| Object Literal `{\| foo: string, ...\|}` | `{ foo: string }` | `?{\| foo: string, ...\|}` | `{ foo: string } \| null` | - | - |
| Object [1] | Object [1] | `?Object` | `Object \| null` | `ReadableMap` | `@` (untyped dictionary) |
| `Array<T>` | `Array<T>` | `?Array<T>` | `Array<T> \| null` | `ReadableArray` | `NSArray` (or `RCTConvertVecToArray` when used inside objects) |
| `Function` | `Function` | `?Function` | `Function \| null` | - | - |
| `Promise<T>` | `Promise<T>` | `?Promise<T>` | `Promise<T> \| null` | `com.facebook.react.bridge.Promise` | `RCTPromiseResolve` and `RCTPromiseRejectBlock` |
| Type Unions `'SUCCESS'\|'FAIL'` | Type Unions `'SUCCESS'\|'FAIL'` | Only as callbacks | | - | - |
| Callbacks `() =>` | Callbacks `() =>` | Yes | | `com.facebook.react.bridge.Callback` | `RCTResponseSenderBlock` |
| `number` | `number` | No | | `double` | `NSNumber` |

## Notes

- Deviation from the official page: the official table lists "{ foo: string, ...} as const" for TypeScript, which is not a valid type; valid TypeScript type forms are shown instead.
- Terminology:
  - Spec: TypeScript or Flow code that describes the API for a Turbo Native Module or Fabric Native component. Used by Codegen to generate boilerplate code.
  - Native Modules: native libraries that have no User Interface (UI) for the user. Examples would be persistent storage, notifications, network events. These are accessible to your JavaScript application code as functions and objects.
  - Native Component: native platform views that are available to your application JavaScript code through React Components.
  - Legacy Native Components: components which are running on the old React Native architecture.
  - Legacy Native Modules: modules which are running on the old React Native architecture.
- [1] "We strongly recommend using Object literals instead of Objects."
- The JavaScript specifications for the core modules in React Native, located inside the `Libraries/` directory in the React Native repository, are also a useful reference.

## Related

- [What is Codegen?](./what-is-codegen.md)
- [Native Modules: Introduction](./turbo-native-modules-introduction.md)
- [Fabric Native Components Introduction](./fabric-native-components-introduction.md)
- [Advanced: Custom C++ Types](./custom-cxx-types.md)
