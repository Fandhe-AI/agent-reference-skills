# @summary

Block tag for customizing the description shown for a function or module on the module page.

## Signature / Usage

```
@summary
Description text for the module page
```

When rendering a module, TypeDoc uses the first paragraph of the comment's summary text. This is not always suitable for standalone display, so when the `@summary` tag is present, TypeDoc renders the content of that block instead.

If `@summary` is omitted but the `--useFirstParagraphOfCommentAsSummary` flag is enabled, TypeDoc falls back to using the first paragraph.

**Overloaded functions**: the tag can be placed on the comment of either the first signature or the function implementation.

```typescript
/**
 * Description for member page
 * @summary
 * Description for module page
 */
export function forkProcess(): void;
```

In this example, the member page shows "Description for member page", while the module page shows "Description for module page".

## Notes

- Useful for showing different descriptions on the module page versus the member page
- For overloaded functions, can be placed on the comment of the first signature or the implementation
- Interacts with the `--useFirstParagraphOfCommentAsSummary` flag

## Related

- [@remarks](./remarks.md) -- separating summary and details
- `--useFirstParagraphOfCommentAsSummary` option
- [JSDoc @summary](https://jsdoc.app/tags-summary)
