---
source: https://www.typescriptlang.org/docs/handbook/mixins.html
---

# Mixins

Building classes from reusable partial classes. TypeScript's best mixin support is the class expression pattern: generics with class inheritance extending a base class.

## Signature / Usage

```ts
type Constructor = new (...args: any[]) => {};

// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:

function Scale<TBase extends Constructor>(Base: TBase) {
  return class Scaling extends Base {
    // Mixins may not declare private/protected properties
    // however, you can use ES2020 private fields
    _scale = 1;

    setScale(scale: number) {
      this._scale = scale;
    }

    get scale(): number {
      return this._scale;
    }
  };
}

// Compose a new class from the Sprite class,
// with the Mixin Scale applier:
const EightBitSprite = Scale(Sprite);
```

## Notes

- Constrained mixins: use a generic constructor type to restrict which base classes a mixin applies to.

```ts
type GConstructor<T = {}> = new (...args: any[]) => T;

type Positionable = GConstructor<{ setPos: (x: number, y: number) => void }>;

function Jumpable<TBase extends Positionable>(Base: TBase) {
  return class Jumpable extends Base {
    jump() {
      // This mixin will only work if it is passed a base
      // class which has setPos defined because of the
      // Positionable constraint.
      this.setPos(0, 20);
    }
  };
}
```

- Alternative pattern (recommended by previous versions of the document): write runtime and type hierarchies separately, merge with an interface of the same name as the base class, and apply with an `applyMixins` helper. It relies less on the compiler and more on the codebase keeping runtime and type system in sync.

```ts
interface Sprite extends Jumpable, Duckable {}
// Apply the mixins into the base class via
// the JS at runtime
applyMixins(Sprite, [Jumpable, Duckable]);
```

- Constraint: decorators cannot provide mixins via code flow analysis (the decorated class does not have the decorator's type merged; issue #4881). Replicate manually via type composition or interface merging.
- Constraint: static property mixins (issue #17829) — class expressions create singletons, so they cannot be mapped to different variable types; work around by using functions that return classes differing by a generic:

```ts
function base<T>() {
  class Base {
    static prop: T;
  }
  return Base;
}

function derived<T>() {
  class Derived extends base<T>() {
    static anotherProp: T;
  }
  return Derived;
}

class Spec extends derived<string>() {}
```

## Related

- [Declaration Merging](./declaration-merging.md)
- [Decorators](./decorators.md)
