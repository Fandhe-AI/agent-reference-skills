---
source: https://tailwindcss.com/docs/flex-basis
---

# flex-basis

Utilities for controlling the initial size of flex items.

## Signature / Usage

```html
<div class="flex flex-row">
  <div class="basis-64">01</div>
  <div class="basis-64">02</div>
  <div class="basis-128">03</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `basis-<number>` | `flex-basis: calc(var(--spacing) * <number>);` |
| `basis-<fraction>` | `flex-basis: calc(<fraction> * 100%);` |
| `basis-full` | `flex-basis: 100%;` |
| `basis-auto` | `flex-basis: auto;` |
| `basis-px` | `flex-basis: 1px;` |
| `basis-3xs` | `flex-basis: var(--container-3xs); /* 16rem (256px) */` |
| `basis-2xs` | `flex-basis: var(--container-2xs); /* 18rem (288px) */` |
| `basis-xs` | `flex-basis: var(--container-xs); /* 20rem (320px) */` |
| `basis-sm` | `flex-basis: var(--container-sm); /* 24rem (384px) */` |
| `basis-md` | `flex-basis: var(--container-md); /* 28rem (448px) */` |
| `basis-lg` | `flex-basis: var(--container-lg); /* 32rem (512px) */` |
| `basis-xl` | `flex-basis: var(--container-xl); /* 36rem (576px) */` |
| `basis-2xl` | `flex-basis: var(--container-2xl); /* 42rem (672px) */` |
| `basis-3xl` | `flex-basis: var(--container-3xl); /* 48rem (768px) */` |
| `basis-4xl` | `flex-basis: var(--container-4xl); /* 56rem (896px) */` |
| `basis-5xl` | `flex-basis: var(--container-5xl); /* 64rem (1024px) */` |
| `basis-6xl` | `flex-basis: var(--container-6xl); /* 72rem (1152px) */` |
| `basis-7xl` | `flex-basis: var(--container-7xl); /* 80rem (1280px) */` |
| `basis-(<custom-property>)` | `flex-basis: var(<custom-property>);` |
| `basis-[<value>]` | `flex-basis: <value>;` |

## Notes

- Spacing scale: `basis-<number>` utilities like `basis-64` and `basis-128` set the initial size of flex items based on the spacing scale.
- Container scale: utilities like `basis-xs` and `basis-sm` set the initial size based on the container scale.

```html
<div class="flex flex-row">
  <div class="basis-3xs">01</div>
  <div class="basis-2xs">02</div>
  <div class="basis-xs">03</div>
  <div class="basis-sm">04</div>
</div>
```

- Percentages: `basis-<fraction>` utilities like `basis-1/2` and `basis-2/3` set the initial size as a fraction.

```html
<div class="flex flex-row">
  <div class="basis-1/3">01</div>
  <div class="basis-2/3">02</div>
</div>
```

- Custom value: use the `basis-[<value>]` syntax to set the flex-basis based on a completely custom value:

```html
<div class="basis-[30vw] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `basis-(<custom-property>)` syntax, which is just a shorthand for `basis-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="basis-(--my-basis) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `flex-basis` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="flex flex-row">
  <div class="basis-1/4 md:basis-1/3">01</div>
  <div class="basis-1/4 md:basis-1/3">02</div>
  <div class="basis-1/2 md:basis-1/3">03</div>
</div>
```

- Customizing the theme: use the `--container-*` theme variables to customize the fixed-width basis utilities.

```css
@theme {
  --container-4xs: 14rem;
}
```

Now the `basis-4xs` utility can be used in your markup. The `basis-<number>` utilities are driven by the `--spacing` theme variable, which you can also customize:

```css
@theme {
  --spacing: 1px;
}
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/flex-basis.mdx` (fetched 2026-10-16).

## Related

- [flex](./flex.md)
- [flex-grow](./flex-grow.md)
- [flex-shrink](./flex-shrink.md)
