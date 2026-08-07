# Windows ML EPs vs. bring your own

Comparison of the two ways to obtain execution providers (EPs) in Windows ML — the Windows ML EPs (via `ExecutionProviderCatalog`, recommended) versus bring-your-own EPs (bundled NuGet packages/binaries) — to help choose the right strategy per app.

## Options / Props

| | Windows ML EPs (recommended) | Bring your own (alternative) |
|------|------|------|
| How | `ExecutionProviderCatalog` APIs | NuGet packages or standalone EP binaries |
| Setup complexity | Low — one API call | Medium — manual NuGet reference per EP |
| Certification | Yes — Windows-certified, rigorous regression testing | Depends on the EP |
| Version compatibility validation | Microsoft validates the Windows ML/ORT/EP combination | You validate the Windows ML/ORT/EP combination |
| App size impact | Low — EPs downloaded to system, not bundled | High — EPs bundled with app (~80 MB each) |
| EP updates | Automatic via Windows Update | Manual — you update when you choose |
| OS requirement | Win 11 24H2 for EPs acquired via `ExecutionProviderCatalog` (DirectML and CPU EP need no download on any supported OS) | Depends on EP |
| Network required on first run | Yes, if EP not already installed | Depends on your implementation |
| Managed device support | IT policy must permit Windows Update | Depends on your implementation |

## Notes

- Use Windows ML EPs when app size matters, you want automatic performance improvements without shipping a new release, and target users are on consumer/unmanaged Windows 11 24H2+ devices.
- Bring your own EPs when users may be on managed devices with restricted Windows Update, you need strict EP version control, or you're deploying to offline environments.
- The two approaches can be mixed: prefer the Windows ML EP path and fall back to a bundled EP for the same hardware target when the catalog path fails (e.g., restricted Windows Update, offline device).

## Related

- [Windows ML execution providers](./supported-execution-providers.md)
- [Bring your own execution providers](./bring-your-own-eps.md)
- [Select execution providers](./select-execution-providers.md)
