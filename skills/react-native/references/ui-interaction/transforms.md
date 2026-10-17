---
source: https://reactnative.dev/docs/0.87/transforms
---

# Transforms

Transforms are style properties that help you modify the appearance and position of your components using 2D or 3D transformations.

## Signature / Usage

```js
{
  transform: [{rotateX: '45deg'}, {rotateZ: '0.785398rad'}],
}
```

The same could also be achieved using a space-separated string:

```js
{
  transform: 'rotateX(45deg) rotateZ(0.785398rad)',
}
```

Translate with a percentage (New Architecture):

```js
{
  transform: [{translateX: '50%'}, {translateY: 100}],
}
```

Matrix transform (4x4, column-major order, array of 16 numbers):

```js
{
  transform: [
    {
      matrix: [
        scaleX,
        skewY,
        0,
        0,
        skewX,
        scaleY,
        0,
        0,
        0,
        0,
        1,
        0,
        translateX,
        translateY,
        0,
        1,
      ],
    },
  ],
}
```

Transform origin:

```js
{
  transformOrigin: '2px 30% 10px',
}
// or
{
  transformOrigin: 'right bottom 20px',
}
// or, array syntax
{
  transformOrigin: [10, '20%', 0],
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `transform` | array of objects: `{matrix: number[]}`, `{perspective: number}`, `{rotate: string}`, `{rotateX: string}`, `{rotateY: string}`, `{rotateZ: string}`, `{scale: number}`, `{scaleX: number}`, `{scaleY: number}`, `{translateX: number \| string}`, `{translateY: number \| string}`, `{skewX: string}`, `{skewY: string}` or string | No | Accepts an array of transformation objects or space-separated string values. Use a single key/value pair per object. |
| `transformOrigin` | string (one to three values) or array | No | Origin for a view's transformations. Default origin is `center`. Supports `px`, percentage and keywords `top`, `left`, `right`, `bottom`, `center`. |

`transformOrigin` syntax: one value (a `px`, a `percentage`, or one of `left`, `center`, `right`, `top`, `bottom`); two values (x-offset: `px`, `percentage`, `left`, `center`, `right`; y-offset: `px`, `percentage`, `top`, `center`, `bottom`); three values (the third, z-offset, must be a `px`); or array syntax, convenient with Animated APIs and avoids string parsing, so should be more efficient.

## Notes

- Once you apply transforms, the layouts remain the same around the transformed component, so it might overlap with nearby components. Apply margin to the transformed component, the nearby components, or padding to the container to prevent overlaps.
- Rotate transformations require a string so the transform may be expressed in degrees (`deg`) or radians (`rad`). Skew transformations require a string in degrees (`deg`).
- `translateX` and `translateY` accept numbers (points) or percentage strings (relative to the element's width for `translateX`, height for `translateY`). Percentage translation is supported on the New Architecture.
- Matrix transforms are useful for pre-calculated matrices, such as those from animation libraries or UI editor applications. For basic transformations, individual transform properties are more readable.
- The 0.87 docs matrix snippet ends the transform array with `];` inside the object literal (a syntax error); this page uses `],`.
- Deprecated: `decomposedMatrix`, `rotation`, `scaleX`, `scaleY`, `transformMatrix`, `translateX`, `translateY` as separate style props. Use the `transform` prop instead.
- A transform affects the containing block of absolutely positioned descendants (see Layout with Flexbox).
- Distinct from Motion for React (motion), Jetpack Compose graphicsLayer transforms (android-compose-graphics-animation) and SwiftUI view modifiers (apple-swiftui); these are React Native style properties.

## Related

- [Layout with Flexbox](./flexbox.md)
- [Animated](./animated.md)
