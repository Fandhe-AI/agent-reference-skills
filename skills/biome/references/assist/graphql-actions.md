# GraphQL Actions + Sources

## Signature / Usage

Enable a GraphQL action under `assist.actions.source` in `biome.json`.

```json
{
  "assist": {
    "actions": {
      "source": {
        "useSortedEnumMembers": "on"
      }
    }
  }
}
```

## Actions

| Action | Recommended | Fix | Description |
|--------|-------------|-----|-------------|
| useSortedEnumMembers | — | safe | Sort GraphQL enum values in natural order. |
| useSortedSelectionSet | — | unsafe | Sort selections inside GraphQL operations and fragments. |
| useSortedTypeFields | — | safe | Sort fields in GraphQL type definitions by name. |

### Documentation paths

```text
/assist/actions/use-sorted-enum-members/graphql
/assist/actions/use-sorted-selection-set/graphql
/assist/actions/use-sorted-type-fields/graphql
```

### Sources

Only `alphabetize` appears in the official sources table for other tools (no mapping is listed for useSortedSelectionSet or useSortedTypeFields).

#### GraphQL-ESLint

| GraphQL-ESLint action | Biome action |
|-----------------------|--------------|
| alphabetize | useSortedEnumMembers (inspired) |

## Notes

- Some Biome rules might not have options, compared to the original rule.
- Source: https://biomejs.dev/assist/graphql/actions/ and https://biomejs.dev/assist/graphql/sources/ (biomejs/website, release 2.5.15 and commit 49293f2)

## Related

- [Assist introduction](./introduction.md)
- [JavaScript Actions](./javascript-actions.md)
- [CSS Actions](./css-actions.md)
