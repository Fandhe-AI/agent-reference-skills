---
source: https://reactnative.dev/docs/0.87/the-new-architecture/what-is-codegen
---

# What is Codegen?

Codegen is a tool to avoid writing a lot of repetitive code. Using Codegen is not mandatory: all the generated code can be written manually, but Codegen generates scaffolding code that could save a lot of time.

## Signature / Usage

```text
Codegen crawls the folders in your project, starting from a directory you specify in your `package.json`,
looking for some specific JS files that contain the specification (or specs) for your custom modules and components.
Spec files are JS files written in a typed dialect: React Native currently supports Flow and TypeScript.
```

## Notes

- React Native invokes Codegen automatically every time an iOS or Android app is built. Occasionally you may want to run the Codegen scripts manually to know which types and files are actually generated, a common scenario when developing Turbo Native Modules and Fabric Native Components.
- Codegen is tightly coupled with a React Native app. The scripts live inside the `react-native` NPM package and the apps call them at build time.
- Every time Codegen finds a spec file it generates boilerplate code: some C++ glue-code, then platform-specific code, using Java for Android and Objective-C++ for iOS.

## Related

- [Using Codegen](./using-codegen.md)
- [The Codegen CLI](./codegen-cli.md)
- [Native Modules: Introduction](./turbo-native-modules-introduction.md)
- [Fabric Native Components Introduction](./fabric-native-components-introduction.md)
