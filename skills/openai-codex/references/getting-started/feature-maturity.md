# Feature Maturity

Maturity labels on ChatGPT and Codex features describe how reliable a feature is, what might change, and what level of support to expect.

## Signature / Usage

```text
Under development | Experimental | Beta | Stable | Deprecated
```

Label order as listed on the official page (not a stated lifecycle sequence).

## Options / Props

| Maturity | What it means | Guidance |
|----------|---------------|----------|
| Under development | Not ready for use. | Don't use. |
| Experimental | Unstable and OpenAI may remove or change it. | Use at your own risk. |
| Beta | Ready for broad testing; complete in most respects, but some aspects may change based on user feedback. | OK for most evaluation and pilots; expect small changes. |
| Stable | Fully supported, documented, and ready for broad use; behavior and configuration remain consistent over time. | Safe for production use; removals typically go through a deprecation process. |
| Deprecated | Still available for compatibility, but no longer recommended; OpenAI may remove it in a future release. | Avoid new use and plan to migrate. |

## Notes

- Check a feature's label before depending on it in production; Beta and Experimental features can change.
- Source: https://learn.chatgpt.com/docs/feature-maturity (retrieved 2026-11-14).

## Related

- [Models](./models.md)
- [Browser](../extend/browser.md)
