---
source: https://reactnative.dev/docs/0.87/viewtoken
---

# ViewToken Object Type

`ViewToken` object is returned as one of the properties in the `onViewableItemsChanged` callback (for example, in the `FlatList` component). It is exported by `ViewabilityHelper.js` in the React Native repository (`packages/react-native/Libraries/Lists/ViewabilityHelper.js`).

## Signature / Usage

```js
{
  item: {key: "key-12"},
  key: "key-12",
  index: 11,
  isViewable: true
}
```

## Options / Props

| Name | Type | Optional | Description |
| --- | --- | --- | --- |
| `index` | number | Yes | Unique numeric identifier assigned to the data element. May be `null` when the viewable element is not an item from the data array, for example when a section header or section footer becomes viewable in `SectionList`. |
| `isViewable` | boolean | No | Specifies if at least some part of list element is visible in the viewport. |
| `item` | any | No | Item data |
| `key` | string | No | Key identifier assigned to the data element extracted to the top level. |
| `section` | any | Yes | Item section data when used with `SectionList`. |

## Notes

- Used by `FlatList`, `SectionList`, `VirtualizedList`.

## Related

- [FlatList](../components/flatlist.md)
- [SectionList](../components/sectionlist.md)
- [VirtualizedList](../components/virtualizedlist.md)
