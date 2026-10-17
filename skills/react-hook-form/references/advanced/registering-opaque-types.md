# Registering Opaque Types

Advanced Usage: https://react-hook-form.com/advanced-usage#RegisteringOpaqueTypes

Forms often store richer values than plain strings and numbers — a date picker backed by [Day.js](https://day.js.org/)'s `Dayjs`, a price field backed by [Decimal.js](https://mikemcl.github.io/decimal.js/)'s `Decimal`, or a range backed by Luxon's `DateTime`. React Hook Form's type helpers (`Path`, `DeepPartial`, `FieldErrors`, and others) walk every property of `TFieldValues` to build up field-path inference, and by default that walk recurses into those classes too — their internal properties, getters, and methods included.

For a small form this is harmless. For a large form, or one nested a few levels deep, that extra recursion can be expensive enough to slow down editor type-checking, and in the worst case trip TypeScript's "Type instantiation is excessively deep and possibly infinite" diagnostic.

## Signature / Usage

Register `Dayjs` as an opaque type once, in a `.d.ts` file that's part of your program (or any file the module augmentation can reach):

```tsx
import type { Dayjs } from "dayjs"

declare module "react-hook-form" {
  interface OpaqueTypes {
    dayjs: Dayjs
  }
}
```

With that in place, `stay.checkIn` and `stay.checkOut` are treated as single leaf values — the same way `Date` already is — instead of objects to traverse:

```tsx
const { register, control } = useForm<BookingForm>()

// "stay.checkIn" and "stay.checkOut" are valid, fully-inferred field
// paths; TypeScript no longer descends into Dayjs's own properties
// to compute them.
register("stay.checkIn")
register("guest.address.city")
```

## Notes

- The registration is global to your project (declaration merging on `OpaqueTypes` applies wherever `react-hook-form`'s types are used), so it only needs to happen once — typically alongside your other global type declarations — even if `Dayjs`, `Decimal`, or similar rich value types show up in many different forms.
- See the `OpaqueTypes` TypeScript reference (https://react-hook-form.com/ts#OpaqueTypes) for the type definition and further details.

## Related

- [useform](../api/useform.md)
