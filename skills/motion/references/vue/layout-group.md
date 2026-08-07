# LayoutGroup

Coordinates layout animations between Motion components that don't render together but affect each other's state, and namespaces `layoutId` values.

## Signature / Usage

```vue
<template>
  <LayoutGroup>
    <ToggleContent />
    <ToggleContent />
  </LayoutGroup>
</template>
```

```vue
<!-- namespaced across multiple groups -->
<template>
  <LayoutGroup :id="id">
    <Tab v-for="item in items" :key="item.id" v-bind="item"/>
  </LayoutGroup>
</template>
```

## Options / Props

| Name | Description |
|------|-------------|
| `id` | Namespaces `layoutId` values within this group |
| `layout` | Applied to motion components to detect and animate layout changes |
| `layoutId` | Identifies elements performing shared layout animations |
| `layoutDependency` | Triggers layout animations on prop changes |

## Notes

- `layoutId` is globally scoped across the application without a `LayoutGroup` namespace.
- Components must be grouped with `LayoutGroup` when sharing `layoutId` values to prevent conflicts.

## Related

- [layout-animations](./layout-animations.md)
- [motion](./motion.md)
