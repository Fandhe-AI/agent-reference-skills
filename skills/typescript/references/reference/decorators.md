---
source: https://www.typescriptlang.org/docs/handbook/decorators.html
---

# Decorators

Annotating and modifying classes and class members with `@expression`. This page documents the experimental (stage 2) implementation enabled by `experimentalDecorators`; stage 3 decorator support is available since TypeScript 5.0.

## Signature / Usage

```shell
tsc --target ES5 --experimentalDecorators
```

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

```ts
function sealed(target) {
  // do something with 'target' ...
}
```

## Options / Props

| Decorator | Arguments | Return value |
| --- | --- | --- |
| Class | constructor of the class | if a value is returned, replaces the class declaration with the provided constructor function |
| Method | (target: constructor for static member / prototype for instance member, member name, Property Descriptor) | used as the Property Descriptor of the method |
| Accessor | (target, member name, Property Descriptor) | used as the Property Descriptor of the member |
| Property | (target, member name) | ignored |
| Parameter | (target, member name, ordinal index of the parameter) | ignored |

## Notes

- The table above lists the arguments the decorator expression receives at runtime.
- The Property Descriptor is `undefined` and a method/accessor decorator's return value is ignored if the script target is less than `ES5`.
- Decorators cannot be used in a declaration file or any ambient context (such as a `declare` class). Method and parameter decorators also cannot be used on an overload.
- TypeScript disallows decorating both the `get` and `set` accessor of a single member; apply all decorators to the first accessor in document order.
- A property decorator has no Property Descriptor; it can only be used to observe that a property of a specific name was declared (e.g. record metadata).
- A class decorator that returns a new constructor must maintain the original prototype; the decorator does not change the TypeScript type, so added properties are not known to the type system.
- Decorator factory: a function that returns the decorator.

```ts
function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}
```

- Composition: expressions are evaluated top-to-bottom, then the results are called as functions bottom-to-top.

```shell
first(): factory evaluated
second(): factory evaluated
second(): called
first(): called
```

- Application order inside a class: (1) parameter decorators then method / accessor / property decorators for each instance member, (2) the same for each static member, (3) parameter decorators for the constructor, (4) class decorators for the class.
- Class decorator example:

```ts
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}
```

- Method decorator example:

```ts
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}
```

- Metadata: examples use the `reflect-metadata` library (`npm i reflect-metadata --save`, a polyfill for an experimental metadata API not part of ECMAScript). With `emitDecoratorMetadata` enabled and `reflect-metadata` imported, design-time type information is exposed at runtime (e.g. `Reflect.getMetadata("design:type", target, propertyKey)`). Decorator metadata is experimental and may introduce breaking changes.

```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

- Deprecated (6.0) / Removed (7.0): `target: es5`, used in this page's examples, is deprecated in 6.0 and no longer supported in 7.0 (6.0 release notes, 7.0 announcement); the page's own tsconfig snippets still show it. The page does not state a 6.0 / 7.0 change for `experimentalDecorators` itself.

## Related

- [Mixins](./mixins.md)
- [Declaration Merging](./declaration-merging.md)
