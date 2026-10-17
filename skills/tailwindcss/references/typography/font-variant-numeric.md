---
source: https://tailwindcss.com/docs/font-variant-numeric
---

# font-variant-numeric

Utilities for controlling the variant of numbers.

## Signature / Usage

```html
<dl class="...">
  <dt class="...">Subtotal</dt>
  <dd class="text-right slashed-zero tabular-nums ...">$100.00</dd>
  <dt class="...">Tax</dt>
  <dd class="text-right slashed-zero tabular-nums ...">$14.50</dd>
  <dt class="...">Total</dt>
  <dd class="text-right slashed-zero tabular-nums ...">$114.50</dd>
</dl>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `normal-nums` | `font-variant-numeric: normal;` |
| `ordinal` | `font-variant-numeric: ordinal;` |
| `slashed-zero` | `font-variant-numeric: slashed-zero;` |
| `lining-nums` | `font-variant-numeric: lining-nums;` |
| `oldstyle-nums` | `font-variant-numeric: oldstyle-nums;` |
| `proportional-nums` | `font-variant-numeric: proportional-nums;` |
| `tabular-nums` | `font-variant-numeric: tabular-nums;` |
| `diagonal-fractions` | `font-variant-numeric: diagonal-fractions;` |
| `stacked-fractions` | `font-variant-numeric: stacked-fractions;` |

## Notes

- The variants only take effect in fonts that support them.
- `ordinal` enables special glyphs for the ordinal markers:

  ```html
  <p class="ordinal ...">1st</p>
  ```

- `slashed-zero` forces a zero with a slash:

  ```html
  <p class="slashed-zero ...">0</p>
  ```

- `lining-nums` uses numeric glyphs aligned by their baseline; `oldstyle-nums` uses numeric glyphs where some numbers have descenders:

  ```html
  <p class="lining-nums ...">1234567890</p>
  <p class="oldstyle-nums ...">1234567890</p>
  ```

- `proportional-nums` uses glyphs with proportional widths; `tabular-nums` uses glyphs with uniform/tabular widths:

  ```html
  <p class="proportional-nums ...">12121</p>
  <p class="tabular-nums ...">12121</p>
  ```

- `diagonal-fractions` and `stacked-fractions` replace numbers separated by a slash with common diagonal / stacked fractions:

  ```html
  <p class="diagonal-fractions ...">1/2 3/4 5/6</p>
  <p class="stacked-fractions ...">1/2 3/4 5/6</p>
  ```

- Stacking multiple utilities: the `font-variant-numeric` utilities are composable so you can enable multiple variants by combining them (see Signature / Usage).
- Resetting numeric font variants: use the `normal-nums` property to reset numeric font variants.

  ```html
  <p class="slashed-zero tabular-nums md:normal-nums ...">
    <!-- ... -->
  </p>
  ```

- Responsive design: prefix a `font-variant-numeric` utility with a breakpoint variant like `md:` to only apply the utility at medium screen sizes and above.

  ```html
  <p class="proportional-nums md:tabular-nums ...">
    Lorem ipsum dolor sit amet...
  </p>
  ```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/font-variant-numeric.mdx` (fetched 2026-10-16)

## Related

- [font-feature-settings](./font-feature-settings.md)
- [font-family](./font-family.md)
