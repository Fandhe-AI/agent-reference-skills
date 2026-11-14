---
source: https://docs.cloud.google.com/iam/docs/troubleshooting-withcond
---

# Troubleshooting `withcond` Role Names in Allow Policies

Role names such as `roles/iam.serviceAccountAdmin_withcond_2b17cc25d2cd9e2c54d8` appear in version 1 allow policies when a role binding is conditional. Version 1 policies do not show the condition. Always specify policy version 3 when getting or setting an allow policy.

## Signature / Usage

A version 1 allow policy containing a hidden conditional binding:

```json
{
  "bindings": [
    {
      "members": [
        "user:dana@example.com"
      ],
      "role": "roles/iam.serviceAccountAdmin_withcond_2b17cc25d2cd9e2c54d8"
    }
  ],
  "etag": "BwUjMhCsNvY=",
  "version": 1
}
```

Fix: always request version 3 on get and set `"version": 3` plus the `etag` on set.

### Where to apply the fix

| Component | Action |
|---|---|
| Google Cloud CLI | Update with `gcloud components update` if the version (`gcloud version`) is below 263.0.0; later versions specify a conditions-capable version automatically |
| Client libraries | Use a version that supports allow policy versions, or add another library that does, or call the IAM REST API directly |
| REST / application code | Specify version `3` when getting; set `version` to `3` and include `etag` when setting |
| Policy management tools (e.g. version-controlled policies as code) | Must request version 3 and send `etag`; must preserve conditional bindings |

### Management tool pitfall

If a tool reads a version 1 policy it sees only `roles/iam.serviceAccountCreator_withcond_a75dc089e6fa084bd379` for user `mahan@example.com`. It may then re-add an unconditional binding for `roles/iam.serviceAccountCreator`, which grants the role regardless of the condition and makes the conditional binding pointless. Reject such changes and update the tool to request version 3.

## Notes

- If you omit `etag` on set, IAM lets you overwrite the old policy even if this causes data loss.
- Adapted note: the official page's condition example (`request.time.getDayOfWeek('Europe/Berlin')` work-week condition) and its unconditional-duplicate counter-example contain corrupted backslash escapes in the retrieved text, so those two code blocks are not reproduced here.
- Source: https://docs.cloud.google.com/iam/docs/troubleshooting-withcond
- Retrieved 2026-11-14. Text CC BY 4.0, code samples Apache 2.0.

## Related

- [troubleshoot-policies.md](./troubleshoot-policies.md)
