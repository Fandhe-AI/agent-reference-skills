# Tamper Protection (Package Integrity Check)

Runtime check on the entire contents of an MSIX package; if Windows detects a tampered or corrupt package it initiates a remediation/repair workflow before launching the app.

## Signature / Usage

```xml
<uap10:PackageIntegrity>
  <uap10:Content Enforcement="on" />
</uap10:PackageIntegrity>
```

## Options / Props

| Value | Description |
| --- | --- |
| `on` | Windows enforces runtime package integrity checks on the entire contents of the package. |
| `off` | No runtime integrity check. |
| `default` | Same behavior as `off`. |

## Notes

- Add the `<uap10:PackageIntegrity>` element to the package manifest.
- When tampering is detected, apps from the Microsoft Store direct the user to the Store app to resolve it; apps from outside the Store show a generic dialog prompting the user to **Repair** or **Reset** via the Settings app.

## Related

- [Choose a distribution path](./choose-distribution-path.md)
