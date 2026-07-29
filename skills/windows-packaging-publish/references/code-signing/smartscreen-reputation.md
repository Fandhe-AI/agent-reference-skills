# SmartScreen Reputation Mechanics

Microsoft Defender SmartScreen evaluates two signals before allowing a downloaded file to run: **publisher reputation** (is the file signed, and by a known/trusted certificate) and **file hash reputation** (has this exact file been downloaded by other users without indications of malicious behavior). A negative or unknown reputation on either signal triggers a warning, even for signed files, until sufficient positive evidence accumulates.

## Signature / Usage

There is no API/CLI surface for SmartScreen reputation — it is a passive cloud evaluation triggered on download/execution. The only developer-facing lever is which certificate (if any) signs the release:

```console
:: Consistent signing identity across releases lets publisher reputation carry forward
signtool sign /fd SHA256 /a /f cert.pfx /p password MyApp.exe
```

## Options / Props

| Certificate type | First-download SmartScreen behavior |
| --- | --- |
| Microsoft Store | No warning — Store re-signs with Microsoft's certificate, immune to SmartScreen download checks. |
| OV/EV certificate (non-Store) | Warning until reputation accumulates; verified publisher name is shown in the prompt. |
| Azure Artifact Signing (Trusted Signing) | Same reputation-building model as OV — no instant trust. |
| Self-signed certificate | Same warning behavior as unsigned. |
| No signature | Strongest warning ("Windows protected your PC"); enterprise policy may block continuation entirely. |

## Notes

- Reputation does not transfer between unsigned file versions — each new unsigned build starts from zero. Reputation **can** carry forward across versions signed with the same publisher certificate identity.
- EV certificates no longer bypass SmartScreen instantly; that behavior was removed and EV now follows the same accumulation model as OV (see `certificate-types.md`).
- There is no submission mechanism for consumer-facing reputation review — it builds organically from download volume, typically over several weeks and hundreds of clean installs from a varied audience. Enterprise IT admins can separately submit files for internal review via the Microsoft Security Intelligence portal, which does not affect public consumer reputation.
- Changing signing certificates resets the publisher-reputation signal — keep a consistent signing identity across releases.
- Modifying a file after signing can break the signature depending on client configuration, which forces reputation to rebuild from zero.
- On Windows 11, **Smart App Control** can supersede SmartScreen Application Reputation: it blocks execution of any unsigned file lacking positive reputation, and applies to all executables, not just internet downloads.
- Publishing through the Microsoft Store remains the only way to avoid SmartScreen download warnings entirely, since the Store's own signature replaces the developer's.

## Related

- [Certificate Types](./certificate-types.md)
- [Azure Trusted Signing (Azure Artifact Signing)](./azure-trusted-signing.md)
- [Signing with a Certificate in Azure Key Vault](./azure-key-vault-signing.md)
