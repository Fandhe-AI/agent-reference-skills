# MSI/EXE Manual Package Validation

Local, pre-submission tests a developer can run to reproduce the automated Store package-validation checks for MSI/EXE apps and diagnose or preempt validation failures.

## Signature / Usage

```
<installer>.msi /qn         rem MSI silent-install parameter
```

Run the installer from a command prompt with its silent-install parameter (`/qn` for MSI; for an EXE installer, use whatever silent parameter that specific installer defines, if any), then inspect the results in **Control Panel → Programs → Programs and Features**.

## Options / Props

| Test | Procedure | Pass criteria |
|---|---|---|
| Silent install | Run the installer with its silent parameter (`/qn` for MSI) from a command prompt | Installs with no user interaction (UAC prompts are allowed) |
| Entry in Add or Remove Programs | After a silent install, open Programs and Features | Entry shows the correct app name, publisher name, and version — not blank or unrelated |
| Bundleware check | After a silent install, open Programs and Features | Exactly one entry is added; more than one indicates the installer is bundling additional software |

## Notes

- Use the exact installer binary intended for submission; a different build can produce different validation results.
- These checks mirror the Partner Center **Package validation pre-check** (Manage Packages page) run against Store Policy section 10.2 Security, letting the same checks be reproduced locally before uploading.

## Related

- [MSI/EXE App Publishing](./msi-exe-publishing.md)
- [App Certification Process](./app-certification-process.md)
- [Store Policies](./store-policies.md)
