# Mocking Classes

Mock an entire class with a single `vi.fn` call (or `vi.spyOn().mockImplementation()`).

## Signature / Usage

Example class used on the official page. `greet` is a class field (each instance gets its own copy as an own property); `speak`, `isHungry`, `feed` are prototype methods stored once on `Dog.prototype` and shared by all instances.

```ts
class Dog {
  name: string

  constructor(name: string) {
    this.name = name
  }

  static getType(): string {
    return 'animal'
  }

  greet = (): string => {
    return `Hi! My name is ${this.name}!`
  }

  speak(): string {
    return 'bark!'
  }

  isHungry() {}
  feed() {}
}
```

Re-create it with `vi.fn`. Defining every method as a class field gives each instance its own separate mock:

```ts
const Dog = vi.fn(class {
  static getType = vi.fn(() => 'mocked animal')

  constructor(name) {
    this.name = name
  }

  greet = vi.fn(() => `Hi! My name is ${this.name}!`)
  speak = vi.fn(() => 'loud bark!')
  feed = vi.fn()
})
```

```ts
const Cooper = new Dog('Cooper')
Cooper.speak() // loud bark!
Cooper.greet() // Hi! My name is Cooper!

// you can use built-in assertions to check the validity of the call
expect(Cooper.speak).toHaveBeenCalled()
expect(Cooper.greet).toHaveBeenCalled()

const Max = new Dog('Max')

// methods are not shared between instances if you assigned them directly
expect(Max.speak).not.toHaveBeenCalled()
expect(Max.greet).not.toHaveBeenCalled()
```

Constructor return value pitfall (prefer class syntax over functions):

```ts
const CorrectDogClass = vi.fn(function (name) {
  this.name = name
})

const IncorrectDogClass = vi.fn(name => ({
  name
}))

const Marti = new CorrectDogClass('Marti')
const Newt = new IncorrectDogClass('Newt')

Marti instanceof CorrectDogClass // true
Newt instanceof IncorrectDogClass // false!
```

Re-creating a class inside a module factory (when the class is re-exported from another module):

```ts
import { Dog } from './dog.js'

vi.mock(import('./dog.js'), () => {
  const Dog = vi.fn(class {
    feed = vi.fn()
    // ... other mocks
  })
  return { Dog }
})
```

Passing a mocked instance to a function accepting the same interface:

```ts
// src/feed.ts
function feed(dog: Dog) {
  // ...
}
```

```ts
// tests/dog.test.ts
import { expect, test, vi } from 'vitest'
import { feed } from '../src/feed.js'

const Dog = vi.fn(class {
  feed = vi.fn()
  isHungry = vi.fn(() => false)
})

test('can feed dogs', () => {
  const dogMax = new Dog('Max')

  feed(dogMax)

  expect(dogMax.feed).toHaveBeenCalled()
  expect(dogMax.isHungry()).toBe(false)
})
```

Keeping the prototype chain: instances keep the prototype chain of the class passed to `vi.fn`, and pass `instanceof` checks against that class.

```ts
class OriginalDog {
  constructor(name) {
    this.name = name
  }

  speak() {
    return 'bark!'
  }
}

const MockedDog = vi.fn(OriginalDog)
const dog = new MockedDog('Cooper')

dog.speak() // bark!
dog instanceof MockedDog // true
dog instanceof OriginalDog // true
```

Nothing is mocked in that example: `dog.speak` refers to the original class method (`dog.speak === MockedDog.prototype.speak`), so call assertions throw:

```ts
expect(dog.speak).toHaveBeenCalled()
// TypeError: [Function speak] is not a spy or a call to a spy!
```

Mock a prototype method for all instances at once by assigning on `MockedDog.prototype`:

```ts
MockedDog.prototype.speak = vi.fn(() => 'woof!')

const cooper = new MockedDog('Cooper')
const max = new MockedDog('Max')

cooper.speak() // woof!
max.speak() // woof!

// calls from both instances are recorded by the same mock
expect(MockedDog.prototype.speak).toHaveBeenCalledTimes(2)
// `mock.contexts` keeps the instance of every call
expect(vi.mocked(MockedDog.prototype.speak).mock.contexts).toEqual([cooper, max])
```

Mock one instance only with `vi.spyOn` (defines the mock directly on that instance, shadowing the prototype method):

```ts
const cooper = new MockedDog('Cooper')
const max = new MockedDog('Max')

vi.spyOn(cooper, 'speak').mockReturnValue('meow!')

cooper.speak() // meow!
max.speak() // bark!, still the original method

expect(cooper.speak).toHaveBeenCalledTimes(1)
```

When methods are class fields, reassign the return value for a specific instance directly:

```ts
const dog = new Dog('Cooper')

// "vi.mocked" is a type helper, since
// TypeScript doesn't know that Dog is a mocked class,
// it wraps any function in a Mock<T> type
// without validating if the function is a mock
vi.mocked(dog.speak).mockReturnValue('woof woof')

dog.speak() // woof woof
```

Mock a non-function property such as `name` with a getter spy:

```ts
const dog = new Dog('Cooper')

const nameSpy = vi.spyOn(dog, 'name', 'get').mockReturnValue('Max')

expect(dog.name).toBe('Max')
expect(nameSpy).toHaveBeenCalledTimes(1)
```

## Notes

- Source: https://vitest.dev/guide/mocking/classes (docs at tag `v5.0.5`).
- If a non-primitive is returned from the constructor function, that value becomes the result of the `new` expression and `[[Prototype]]` may not be correctly bound. Prefer the class syntax over the function.
- Assigning on `MockedDog.prototype` (not `OriginalDog.prototype`) leaves the original class untouched; lookup order is instance, `MockedDog.prototype`, `OriginalDog.prototype`. Instances created before the assignment also see the mock, but all share a single call history (class fields give each instance its own mock).
- The mock's `prototype` always follows the current implementation: it is re-pointed when a new implementation is set, when a queued `mockImplementationOnce` class is constructed, and when the mock is reset. If one mock uses different class implementations, instances created by earlier implementations lose access to their prototype methods once a newer implementation takes over. Own properties assigned in the constructor or via class fields are not affected.
- Getters and setters can be spied on with the same `vi.spyOn(obj, prop, 'get' | 'set')` form.
- Using classes with `vi.fn()` was introduced in Vitest 4; previously `function` and `prototype` inheritance had to be used directly (see the v3 guide at https://v3.vitest.dev/guide/mocking.html#classes).

## Related

- [Mocking Patterns](./mocking.md)
- [Mocking Globals](./mocking-globals.md)
