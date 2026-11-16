---
source: https://docs.cloud.google.com/memorystore/docs/valkey/deletion-protection
---

# Deletion protection

Instance deletion protection prevents accidental deletion of new and existing Memorystore for Valkey instances. When enabled, an attempt to delete the instance fails. It is disabled by default unless you use Terraform to create the instance.

## Signature / Usage

### Enable on a new instance

Add `--deletion-protection-enabled` to the create command (see the create-instances page for the full command).

Adapted (not in the official docs): removed the trailing line-continuation backslash after the last flag, which would otherwise continue into the next line.

```bash
gcloud memorystore instances create INSTANCE \
  --deletion-protection-enabled \
  --location=REGION_ID
```

### Enable on an existing instance

Adapted (not in the official docs): removed the trailing line-continuation backslash after the last flag.

```bash
gcloud memorystore instances update INSTANCE \
  --deletion-protection-enabled \
  --location=REGION_ID
```

### Disable on an existing instance

Adapted (not in the official docs): removed the trailing line-continuation backslash after the last flag.

```bash
gcloud memorystore instances update INSTANCE \
  --no-deletion-protection-enabled \
  --location=REGION_ID
```

Replace `INSTANCE` with the ID of your instance and `REGION_ID` with its region.

## Options / Props

| Item | Value |
|---|---|
| Required permission | `memorystore.instances.update` |
| Default | Disabled (unless created with Terraform) |

Deletion protection does not prevent: editing the instance; suspending the instance due to billing issues; deleting the suspended instance due to billing issues; deleting the instance due to a project deletion.

## Notes

- Before deleting an instance, confirm it is safe to delete and that deletion protection is disabled (edit the instance if needed). Disabling protection and deleting are destructive; try them on a disposable instance first.
- The first command shows only the added flag; a real create call also needs the other flags shown on the create-instances page (such as `--endpoints`).
- Corrected from the official docs: the source shows each command ending with `--location=REGION_ID \` (trailing backslash).
- The source also shows Console and Terraform forms.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/deletion-protection (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-instances.md](./create-instances.md)
- [configure-instances.md](./configure-instances.md)
