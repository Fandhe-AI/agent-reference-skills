---
source: https://reactnative.dev/docs/0.87/javascript-environment
---

# JavaScript Environment

When using React Native, your JavaScript code runs in up to three environments, with Babel syntax transformers and a set of polyfills available on all supported runtimes.

## Signature / Usage

Polyfills listed in the original page (Specific section):

```text
__DEV__
```

### JavaScript Runtime

- In most cases, React Native will use Hermes, an open-source JavaScript engine optimized for React Native.
- If Hermes is disabled, React Native will use [JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore), the JavaScript engine that powers Safari. Note that on iOS, JavaScriptCore does not use JIT due to the absence of writable executable memory in iOS apps.
- When using Chrome debugging, all JavaScript code runs within Chrome itself, communicating with native code via WebSockets. Chrome uses [V8](https://v8.dev/) as its JavaScript engine.

While these environments are very similar, you may end up hitting some inconsistencies. It is best to avoid relying on specifics of any runtime.

### JavaScript Syntax Transformers

Syntax transformers make writing code more enjoyable by allowing you to use new JavaScript syntax without having to wait for support on all interpreters. React Native ships with the [Babel JavaScript compiler](https://babeljs.io). A full list of React Native's enabled transformations can be found in [@react-native/babel-preset](https://github.com/react/react-native/tree/main/packages/react-native-babel-preset).

| Group | Transformation | Code |
| --- | --- | --- |
| ECMAScript 5 | Reserved Words | `promise.catch(function() {...});` |
| ES2015 (ES6) | Arrow functions | `<C onPress={() => this.setState({pressed: true})} />` |
| ES2015 (ES6) | Block scoping | `let greeting = 'hi';` |
| ES2015 (ES6) | Call spread | `Math.max(...array);` |
| ES2015 (ES6) | Classes | `class C extends React.Component {render() { return <View />; }}` |
| ES2015 (ES6) | Computed Properties | `const key = 'abc'; const obj = {[key]: 10};` |
| ES2015 (ES6) | Constants | `const answer = 42;` |
| ES2015 (ES6) | Destructuring | `const {isActive, style} = this.props;` |
| ES2015 (ES6) | for…of | `for (var num of [1, 2, 3]) {...};` |
| ES2015 (ES6) | Function Name | `let number = x => x;` |
| ES2015 (ES6) | Literals | `const b = 0b11; const o = 0o7; const u = 'Hello\u{000A}\u{0009}!';` |
| ES2015 (ES6) | Modules | `import {Component} from 'react';` |
| ES2015 (ES6) | Object Concise Method | `const obj = {method() { return 10; }};` |
| ES2015 (ES6) | Object Short Notation | `const name = 'vjeux'; const obj = {name};` |
| ES2015 (ES6) | Parameters | `function test(x = 'hello', {a, b}, ...args) {}` |
| ES2015 (ES6) | Rest Params | `function(type, ...args) {};` |
| ES2015 (ES6) | Shorthand Properties | `const o = {a, b, c};` |
| ES2015 (ES6) | Sticky Regex | `const a = /o+/y;` |
| ES2015 (ES6) | Template Literals | ``const who = 'world'; const str = `Hello ${who}`;`` |
| ES2015 (ES6) | Unicode Regex | `const string = 'foo💩bar'; const match = string.match(/foo(.)bar/u);` |
| ES2016 (ES7) | Exponentiation Operator | `let x = 10 ** 2;` |
| ES2017 (ES8) | Async Functions | `async function doStuffAsync() {const foo = await doOtherStuffAsync();};` |
| ES2017 (ES8) | Function Trailing Comma | `function f(a, b, c,) {};` |
| ES2018 (ES9) | Object Spread | `const extended = {...obj, a: 10};` |
| ES2019 (ES10) | Optional Catch Binding | `try {throw 0; } catch { doSomethingWhichDoesNotCareAboutTheValueThrown();}` |
| ES2020 (ES11) | Dynamic Imports | `const package = await import('package'); package.function()` |
| ES2020 (ES11) | Nullish Coalescing Operator | `const foo = object.foo ?? 'default';` |
| ES2020 (ES11) | Optional Chaining | `const name = obj.user?.name;` |
| ES2022 (ES13) | Class Fields | `class Bork {static a = 'foo'; static b; x = 'bar'; y;}` |
| Stage 1 Proposal | Export Default From | `export v from 'mod';` |
| Miscellaneous | Babel Template | ``template(`const %%importName%% = require(%%source%%);`);`` |
| Miscellaneous | Flow | `function foo(x: ?number): string {};` |
| Miscellaneous | ESM to CJS | `export default 42;` |
| Miscellaneous | JSX | `<View style={{color: 'red'}} />` |
| Miscellaneous | Object Assign | `Object.assign(a, b);` |
| Miscellaneous | React Display Name | `const bar = createReactClass({});` |
| Miscellaneous | TypeScript | `function foo(x: {hello: true, target: 'react native!'}): string {};` |

### Polyfills

Many standard functions are also available on all the supported JavaScript runtimes.

- **Browser:** CommonJS `require`; `console.{log, warn, error, info, debug, trace, table, group, groupCollapsed, groupEnd}`; `XMLHttpRequest`, `fetch`; `{set, clear}{Timeout, Interval, Immediate}`, `{request, cancel}AnimationFrame`.
- **ECMAScript 2015 (ES6):** `Array.from`; `Array.prototype.{find, findIndex}`; `Object.assign`; `String.prototype.{startsWith, endsWith, repeat, includes}`.
- **ECMAScript 2016 (ES7):** `Array.prototype.includes`.
- **ECMAScript 2017 (ES8):** `Object.{entries, values}`.
- **Specific:** `__DEV__`.

## Notes

- Since 0.84: Hermes V1 is the default engine (see the Hermes page). The "Chrome debugging" environment is the original wording of the 0.87 docs; Remote JavaScript Debugging was removed as of React Native 0.79 (see other-debugging-methods.md), so on 0.87 code runs in Hermes (or JavaScriptCore via the community package).

## Related

- [hermes.md](./hermes.md)
- [timers.md](./timers.md)
- [typescript.md](./typescript.md)
