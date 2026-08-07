# App-V vs. MSIX Feature Comparison

Side-by-side comparison of Microsoft Application Virtualization (App-V) and MSIX to help choose between them, with Azure Virtual Desktop MSIX App Attach recommended as the App-V replacement.

## Options / Props

| Feature | App-V | MSIX |
|---------|-------|------|
| Sharing across apps | Connection group feature groups packages into a virtual environment so apps within the group can interact | Shared package containers create a shared runtime container with a merged virtual file system/registry view |
| Development focus | End-of-life April 2026 | Introduced 2018, actively developed |
| How updates are handled | App divided into 64KB blocks, but the complete app must still be downloaded to apply updates | Only the delta (differential updates) is downloaded |
| Single copy of a file across apps/users | File duplication across apps is not avoided | A single copy of any file is kept |
| Signing | Not required | Required |

## Notes

- App-V reached end-of-life in April 2026 (Microsoft Desktop Optimization Pack support extension); Microsoft recommends Azure Virtual Desktop with MSIX App Attach as the replacement.
- This is a feature comparison for choosing a virtualization/packaging technology, distinct from the MSIX Packaging Tool's App-V 5.1 conversion support (which converts an existing App-V package into MSIX rather than comparing the two formats).

## Related

- [MSIX App Attach](./msix-app-attach.md)
- [MSIX Packaging Tool](./msix-packaging-tool.md)
- [What is MSIX?](./msix-overview.md)
