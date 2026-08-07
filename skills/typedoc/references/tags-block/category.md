# @category

Block tag for organizing related API items under a common heading. This page covers `@category`, `@categoryDescription`, `@showCategories`, and `@hideCategories`.

## Signature / Usage

```
@category Category Name
```

```
@categoryDescription Category Name
Description text for the category
```

### @category (block tag)

Places an API item into a logical group within the page index. Specify it multiple times to display a single reflection under multiple category headings.

### @categoryDescription (block tag)

Provides supplementary context for a category. The first line of `@categoryDescription` is used as the category name, and the following lines are used as the description. This tag must be placed on the comment block of the parent reflection that contains the categorized children.

### @showCategories / @hideCategories (modifier tags)

Modifier tags that selectively customize the visibility of categories in the navigation tree. They work together with the `navigation.includeCategories` option.

```typescript
/**
 * @categoryDescription Advanced Use
 * These functions are intended for advanced users who need fine-grained control.
 */

/**
 * @category General Use
 */
export function basicFunction(): void;

/**
 * @category General Use
 * @category Advanced Use
 */
export function dualPurposeFunction(): void;

/**
 * @category Advanced Use
 */
export function advancedFunction(): void;
```

## Notes

- A single reflection can specify multiple `@category` tags
- `@categoryDescription` must be placed on the parent comment of the children
- `@showCategories` and `@hideCategories` affect only the navigation tree

## Related

- [@group](./group.md) -- an alternative grouping mechanism
- `--categorizeByGroup` option
- `--defaultCategory` option
- `--categoryOrder` option
- `--searchCategoryBoosts` option
- `--navigation.includeCategories` option
