# @group

Tags controlling the grouping and display of documentation items. This page covers `@group`, `@groupDescription`, `@showGroups`, `@hideGroups`, and `@disableGroups`.

## Signature / Usage

```
@group Group Name
```

```
@groupDescription Group Name
Description text for the group
```

```
@showGroups
@hideGroups
@disableGroups
```

### @group (block tag)

Places related API items under a common heading in the page index.

- Specify it multiple times to display a single reflection under multiple headings
- Unlike `@category`, if `@group` is not specified, reflections are automatically grouped by kind
- Custom member type simulation is possible
- `@event` is equivalent to `@group Events`; `@eventProperty` is also placed in the Events group

### @groupDescription (block tag)

Provides additional context for a reflection group. The first line is used as the group name, and the following lines are used as the description. Place it on the comment of the parent reflection that contains the group.

### @showGroups / @hideGroups (modifier tags)

Modifier tags that selectively control the visibility of groups in the navigation tree. They work together with the `navigation.includeGroups` option. They affect only navigation, not page content.

### @disableGroups (modifier tag)

Disables TypeDoc's automatic grouping on a per-parent basis. Recommended only for documentation with few members.

```typescript
/**
 * @groupDescription Hooks
 * Custom React hooks for state management.
 */
export class MyComponent {
    /**
     * @group Hooks
     */
    useState(): void;

    /**
     * @group Hooks
     */
    useEffect(): void;

    /**
     * @group Lifecycle
     */
    componentDidMount(): void;
}
```

## Notes

- If `@group` is not specified, reflections are automatically grouped by kind (methods, properties, etc.)
- There is no `@disableCategories` tag (categories are only created when explicitly requested via `@category`)
- `@showGroups` and `@hideGroups` affect only the navigation tree
- `@event` is a shortcut for `@group Events`

## Related

- [@category](./category.md) -- an alternative categorization mechanism
- `--searchGroupBoosts` option
- `--navigation.includeGroups` option
