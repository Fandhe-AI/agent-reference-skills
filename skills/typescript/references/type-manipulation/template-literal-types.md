---
source: https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
---

# Template Literal Types

Generating mapping types which change properties via template literal strings.

## Signature / Usage

Template literal types build on string literal types and expand into many strings via unions. They use JavaScript template literal syntax in type positions.

```ts
type World = "world";
type Greeting = `hello ${World}`; // "hello world"

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

// unions in each interpolated position are cross multiplied
type Lang = "en" | "ja" | "pt";
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
```

### String Unions in Types

```ts
type PropEventSource<Type> = {
    on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;
```

### Inference with Template Literals

Make `on` generic so the callback argument type follows the attribute:

```ts
type PropEventSource<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({ firstName: "Saoirse", lastName: "Ronan", age: 26 });

person.on("firstNameChanged", newName => {
    console.log(`new name is ${newName.toUpperCase()}`);
});
```

### Intrinsic String Manipulation Types

| Type | Description |
|------|-------------|
| `Uppercase<StringType>` | Converts each character in the string to the uppercase version. |
| `Lowercase<StringType>` | Converts each character in the string to the lowercase equivalent. |
| `Capitalize<StringType>` | Converts the first character in the string to an uppercase equivalent. |
| `Uncapitalize<StringType>` | Converts the first character in the string to a lowercase equivalent. |

```ts
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>

type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">
```

## Notes

- Ahead-of-time generation is generally recommended for large string unions; template literal unions suit smaller cases.
- The intrinsic types are built into the compiler for performance and cannot be found in the `.d.ts` files included with TypeScript. As of TypeScript 4.1 they use the JavaScript string runtime functions directly and are not locale aware.
- Changed (7.0): template literal inference with empty placeholders consumes a full Unicode code point instead of a single UTF-16 code unit. `HeadTail<"😀abc">` is `["😀", "abc"]` in 7.0 (previously `["\ud83d", "\ude00abc"]`). This is a breaking change for type-level string utilities that intentionally modeled UTF-16 code units (e.g. some string `Length` utilities). Sources: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/ and https://github.com/microsoft/typescript-go/blob/typescript/v7.0.2/CHANGES.md

```ts
type HeadTail<S> = S extends `${infer Head}${infer Tail}` ? [Head, Tail] : never;
type Result = HeadTail<"😀abc">; // 7.0: ["😀", "abc"]
```

## Related

- [Mapped Types](./mapped-types.md)
- [Utility Types](./utility-types.md)
- [Conditional Types](./conditional-types.md)
