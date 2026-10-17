---
source: https://docs.expo.dev/eas/workflows/limitations/
---

# EAS Workflows limitations

Current limitations of EAS Workflows that could affect a workflow automation strategy.

## Signature / Usage

Custom functions reuse sequences of custom steps across jobs or hooks (not whole jobs or workflows), called with `uses` and a relative path:

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

- No shared workflow configurations: an entire job or workflow configuration cannot be shared across files. Custom functions only reuse sequences of custom steps in jobs or hooks.
- No matrix support: multiple variations of the same workflow cannot run in parallel with different configurations.
- Distinct from GitHub Actions: these limitations apply to EAS Workflows only. See github-docs for GitHub Actions.
- The official page points to the EAS newsletter on expo.dev/services for progress notifications.
- Source modificationDate: September 07, 2026 (fetched 2026-10-17). The snippet above is taken from the custom functions page, not from the limitations page itself.

## Related

- [Custom functions in EAS Workflows](./workflows-custom-functions.md)
- [Introduction to EAS Workflows](./workflows-introduction.md)
- [Syntax for EAS Workflows](./workflows-syntax.md)
