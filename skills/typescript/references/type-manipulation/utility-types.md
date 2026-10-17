---
source: https://www.typescriptlang.org/docs/handbook/utility-types.html
---

# Utility Types

Types which are globally included in TypeScript, to facilitate common type transformations.

## Signature / Usage

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;
type Updatable = Partial<Todo>;
type Fn = ReturnType<typeof setTimeout>;
```

## Options / Props

| Utility | Released | Description |
|---------|----------|-------------|
| `Awaited<Type>` | 4.5 | Models `await` / `.then()`: recursively unwraps `Promise`s. `Awaited<boolean \| Promise<number>>` |
| `Partial<Type>` | 2.1 | All properties of `Type` set to optional; represents all subsets of a given type. |
| `Required<Type>` | 2.8 | All properties of `Type` set to required. The opposite of `Partial`. |
| `Readonly<Type>` | 2.1 | All properties set to `readonly` (cannot be reassigned). `Object.freeze` is typed `function freeze<Type>(obj: Type): Readonly<Type>`. |
| `Record<Keys, Type>` | 2.1 | Object type whose property keys are `Keys` and whose values are `Type`. |
| `Pick<Type, Keys>` | 2.1 | Picks the set of properties `Keys` (string literal or union of string literals) from `Type`. |
| `Omit<Type, Keys>` | 3.5 | Picks all properties from `Type` then removes `Keys`. The opposite of `Pick`. |
| `Exclude<UnionType, ExcludedMembers>` | 2.8 | Excludes from `UnionType` all union members assignable to `ExcludedMembers`. |
| `Extract<Type, Union>` | 2.8 | Extracts from `Type` all union members assignable to `Union`. |
| `NonNullable<Type>` | 2.8 | Excludes `null` and `undefined` from `Type`. |
| `Parameters<Type>` | 3.1 | Tuple type from the parameter types of function type `Type`. |
| `ConstructorParameters<Type>` | 3.1 | Tuple or array type from the parameter types of a constructor function type (`never` if `Type` is not a function). |
| `ReturnType<Type>` | 2.8 | Return type of function `Type`. |
| `InstanceType<Type>` | 2.8 | Instance type of a constructor function in `Type`. |
| `NoInfer<Type>` | 5.4 | Blocks inferences to the contained type; otherwise identical to `Type`. |
| `ThisParameterType<Type>` | 3.3 | Type of the `this` parameter of a function type, or `unknown` if there is none. |
| `OmitThisParameter<Type>` | 3.3 | Removes the `this` parameter from `Type`; generics are erased and only the last overload signature is propagated. |
| `ThisType<Type>` | 2.3 | Marker for a contextual `this` type; does not return a transformed type. Requires `noImplicitThis`. |
| `Uppercase` / `Lowercase` / `Capitalize` / `Uncapitalize` | — | Intrinsic string manipulation types; see Template Literal Types. |

### Examples

```ts
// Exclude / Extract on a discriminated union
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

type T3 = Exclude<Shape, { kind: "circle" }>;
type T2 = Extract<Shape, { kind: "circle" }>;

// Record
type CatName = "miffy" | "boris" | "mordred";
interface CatInfo { age: number; breed: string }
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

// NoInfer
function createStreetLight<C extends string>(
  colors: C[],
  defaultColor?: NoInfer<C>,
) {
  // ...
}
createStreetLight(["red", "yellow", "green"], "red");  // OK
createStreetLight(["red", "yellow", "green"], "blue");  // Error

// ThisType
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};
```

## Notes

- `Parameters` and `ReturnType` on overloaded functions use the _last_ signature.
- Passing a non-function type such as `string` or `Function` to `Parameters` / `ReturnType` / `ConstructorParameters` / `InstanceType` is shown in the official examples with error TS2344 (see the official page for the exact results).
- `ThisType<T>` is an empty interface declared in `lib.d.ts`; beyond being recognized in the contextual type of an object literal it acts like any empty interface.
- Runtime schema validation with inferred static types (`z.infer`) is the separate zod skill.

## Related

- [Mapped Types](./mapped-types.md)
- [Conditional Types](./conditional-types.md)
- [Template Literal Types](./template-literal-types.md)
- [Typeof Type Operator](./typeof-type-operator.md)
