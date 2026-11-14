---
source: https://docs.expo.dev/eas/workflows/limitations/
---

# Expo Workflows limitations

Current limitations of Expo Workflows that could affect a workflow automation strategy.

## Signature / Usage

Custom functions reuse sequences of custom steps across jobs or hooks (not whole jobs or workflows), called with `uses` and a relative path.

From [Custom functions in Expo Workflows](./workflows-custom-functions.md) (official snippet, verbatim):

```yaml
jobs:
  build_ios:
    type: build
    params:
      platform: ios
    hooks:
      before_install_node_modules:
        - uses: ./.eas/functions/setup
```

## Notes

- No matrix support: multiple variations of the same workflow cannot run in parallel with different configurations.
- Distinct from GitHub Actions: these limitations apply to Expo Workflows only. See github-docs for GitHub Actions.
- Reusing whole jobs across files is now possible with reusable workflows; the former "No shared workflow configurations" limitation was removed from the official page. Custom functions reuse sequences of steps only.
- The official page points to the Expo newsletter on expo.dev/services for progress notifications.
- Source modificationDate: September 07, 2026 (fetched 2026-10-17). The snippet above is taken from the custom functions page, not from the limitations page itself.
- Source: https://docs.expo.dev/eas/workflows/limitations/ (docs/pages/eas/workflows/limitations.mdx at tag expo@58.0.25).

## Related

- [Custom functions in Expo Workflows](./workflows-custom-functions.md)
- [Introduction to Expo Workflows](./workflows-introduction.md)
- [Syntax for Expo Workflows](./workflows-syntax.md)
- [Reusable workflows in Expo Workflows](./workflows-reusable-workflows.md)
