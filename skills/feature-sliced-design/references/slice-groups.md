# Slice Groups

An optional structure that places related slices close together within the same layer so the structure is easier to navigate. Not a required part of FSD.

## Signature / Usage

Entities without a group:

```text
entities/
  invoice/
    model/
    ui/
  receipt/
    model/
    ui/
  transaction/
    model/
    ui/
  user/
    model/
    ui/
  product/
    model/
    ui/
  ...
```

Entities with a group (payment-related slices gathered under `payment/`):

```text
entities/
  payment/
    invoice/
      model/
      ui/
    receipt/
      model/
      ui/
    transaction/
      model/
      ui/
  user/
    model/
    ui/
  product/
    model/
    ui/
  ...
```

Pages (one possible example, not the default structure for the pages layer; useful for several pages on the same topic such as list, detail, create, and edit):

```text
pages/
  order/
    create/
      ui/
    detail/
      ui/
    list/
      ui/
  customer/
    detail/
      ui/
    list/
      ui/
  settings/
    ui/
  ...
```

## Notes

- Slice groups only improve readability and navigation; they do not affect dependency rules between slices.
- A slice group is not a slice: it has no segments such as `model`, `ui`, or `api`, and no public API such as `index.ts`.
- Shared code used across multiple slices must not be placed in a slice group.
- Each slice remains independent even when it belongs to a group; isolation and dependency rules between slices do not change.
- Not every slice needs to belong to a group. A slice like `user/`, whose meaning is clear on its own, can remain ungrouped.
- Consider a group when several slices share the same business context and are scattered across a layer, the slice names clearly suggest the same topic, or the number of slices in a layer is hard to take in at a glance.
- It may not be needed when names alone are enough for navigation, there is no natural grouping criterion, or too few slices would end up in the group.
- Features layer: groups can be applied, but a feature often spans multiple entities, so a natural grouping criterion is harder to find. A group like `features/cart/` without a clear criterion tends to accumulate cart-related DTOs and mappers in addition to `add-to-cart` / `remove-from-cart`, becoming a home for the whole domain and weakening the principle that features are split by use case.
- Before grouping in features, check that there are enough slices to warrant a group (two or three are likely fine flat) and that the group contains only feature slices, not code that belongs in entities.
- Source: https://fsd.how/docs/reference/slice-groups (documentation repository commit 3a5a3a3). The official References section cites Russian Telegram FSD community discussions and a KakaoPay article on slice grouping in the pages layer.

## Related

- [Slices & Segments](./slices-segments.md)
- [Layers](./layers.md)
