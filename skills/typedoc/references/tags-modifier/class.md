# @class

Modifier tag that documents a variable declaration as a class, expanding "dynamic" properties into actual properties.

## Signature / Usage

```
/** @class */
```

Applying `@class` to a variable causes TypeDoc to convert it into a class. This performs:

1. **Property expansion**: all "dynamic" properties are expanded into actual properties
2. **Name resolution**: a type or interface declared with the same name as the `@class`-annotated variable is ignored
3. **Overload handling**: if the constructor function has multiple overloads, the return type of the first overload determines the class shape
4. **Generics support**: if the constructor function is generic, its type parameters are promoted to the class's type parameters

Mainly useful for JavaScript projects that document classes defined via the constructor-function pattern instead of class syntax.

```javascript
/** @class */
export function ClassLike() {
    if (new.target) {
        //
    }
}
```

```javascript
/**
 * Creates a user object.
 * @class
 */
export function User(name, email) {
    if (!(this instanceof User)) {
        return new User(name, email);
    }
    this.name = name;
    this.email = email;
}

User.prototype.greet = function () {
    return `Hello, ${this.name}`;
};
```

## Notes

- Mainly used for the JavaScript constructor-function pattern
- A type/interface declaration with the same name is ignored by TypeDoc
- With constructor function overloads, the first overload's return type becomes the class shape
- For generic constructor functions, type parameters are promoted to the class level

## Related

- [@interface](./interface.md)
- [@function](./function.md)
- [@namespace](./namespace.md)
