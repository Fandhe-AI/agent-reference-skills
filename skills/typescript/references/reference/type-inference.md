---
source: https://www.typescriptlang.org/docs/handbook/type-inference.html
---

# Type Inference

Where TypeScript infers types without explicit annotations: initializing variables and members, setting parameter default values, and determining function return types.

## Signature / Usage

```ts
let x = 3; // inferred as number
```

## Notes

- Best common type: when inferring from several expressions, the candidate type compatible with all the others is chosen. When no candidate is a supertype of all, the result is the union array type, e.g. `(Rhino | Elephant | Snake)[]`; annotate explicitly to get a supertype.

```ts
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
```

- Contextual typing: the type of an expression is implied by its location (function call arguments, right hand sides of assignments, type assertions, members of object and array literals, return statements). The contextual type also acts as a candidate type in best common type.

```ts
window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button);
  console.log(mouseEvent.kangaroo); // error: no 'kangaroo' on MouseEvent
};
```

- Outside a contextually typed position, a function's parameter implicitly has type `any` with no error unless `noImplicitAny` is on. An explicit annotation overrides the contextual type:

```ts
window.onscroll = function (uiEvent: any) {
  console.log(uiEvent.button); // <- Now, no error is given
};
```

## Related

- [Type Compatibility](./type-compatibility.md)
- [Advanced Types](./advanced-types.md)
