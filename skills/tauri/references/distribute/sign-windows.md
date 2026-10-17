---
source: https://v2.tauri.app/distribute/sign/windows/
---

# Windows Code Signing

Code signing is required on Windows to list your app in the Microsoft Store and to prevent a SmartScreen warning when downloaded from the browser. It is not required to execute the app. This guide covers OV (Organization Validated) certificates, Azure Key Vault and Azure Artifact Signing; for other mechanisms (e.g. EV certificates) use your issuer's documentation and the custom sign command.

## Signature / Usage

OV certificate fields in `tauri.conf.json > bundle > windows`:

```json
"windows": {
        "certificateThumbprint": "A1B1A2B2A3B3A4B4A5B5A6B6A7B7A8B8A9B9A0B0",
        "digestAlgorithm": "sha256",
        "timestampUrl": "http://timestamp.comodoca.com"
}
```

Custom sign command (any tool that can sign Windows executables; `%1` is the file):

```json
{
  "bundle": {
    "windows": {
      "signCommand": "relic sign --file %1 --key azure --config relic.conf"
    }
  }
}
```

### OV Certificates

Applies only to OV code signing certificates acquired before June 1st 2023. For EV certificates and OV certificates received after that date, consult your certificate issuer's documentation.

Prerequisites: Windows (the tutorial uses PowerShell native features), a working Tauri app, and a **code signing** certificate (SSL certificates do not work).

1. Convert `.cer` to `.pfx` (you need the certificate and the private key; remember the export password):

```sh
openssl pkcs12 -export -in cert.cer -inkey private-key.key -out certificate.pfx
```

2. Import the `.pfx`:

```powershell
$WINDOWS_PFX_PASSWORD = 'MYPASSWORD'
Import-PfxCertificate -FilePath certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $WINDOWS_PFX_PASSWORD -Force -AsPlainText)
```

3. Prepare variables: open `certmgr.msc`, Personal/Certificates, double-click the imported certificate, Details tab. The Signature hash algorithm is `digestAlgorithm` (likely `sha256`); the Thumbprint is `certificateThumbprint`; also pick a timestamp URL (`timestampUrl`).
4. Set the three values in `tauri.conf.json` (above) and run `tauri build`. Expected console output:

```
info: signing app
info: running signtool "C:\\Program Files (x86)\\Windows Kits\\10\\bin\\10.0.19041.0\\x64\\signtool.exe"
info: "Done Adding Additional Store\r\nSuccessfully signed: APPLICATION FILE PATH HERE
```

### GitHub Actions

Secrets: `WINDOWS_CERTIFICATE` (base64 `.pfx`, e.g. `certutil -encode certificate.pfx base64cert.txt`) and `WINDOWS_CERTIFICATE_PASSWORD` (export password). Add this step right above the "install app dependencies and build it" step of the `tauri-action` publish template:

```yml
- name: import windows certificate
  if: matrix.platform == 'windows-latest'
  env:
    WINDOWS_CERTIFICATE: ${{ secrets.WINDOWS_CERTIFICATE }}
    WINDOWS_CERTIFICATE_PASSWORD: ${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}
  run: |
    New-Item -ItemType directory -Path certificate
    Set-Content -Path certificate/tempCert.txt -Value $env:WINDOWS_CERTIFICATE
    certutil -decode certificate/tempCert.txt certificate/certificate.pfx
    Remove-Item -path certificate -include tempCert.txt
    Import-PfxCertificate -FilePath certificate/certificate.pfx -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String $env:WINDOWS_CERTIFICATE_PASSWORD -Force -AsPlainText)
```

The step assigns secrets to env variables, creates a `certificate` directory, writes the secret to `tempCert.txt`, decodes it with `certutil` into a `.pfx`, removes `tempCert.txt`, and imports the `.pfx` into the Windows cert store with the password as a secure string.

### Azure Key Vault

Uses `relic` (supports secret-based authentication; download from its releases page or `go install github.com/sassoftware/relic/v8@latest`); other tools can be configured.

1. In the Azure Portal create a Key vault (remember the "Key vault name").
2. In "Objects > Certificates" Generate/Import a certificate (remember the "Certificate name").
3. Create `src-tauri/relic.conf` (replace `<KEY_VAULT_NAME>` and `<CERTIFICATE_NAME>`) and point `signCommand` at it:

```yml
tokens:
  azure:
    type: azure

keys:
  azure:
    token: azure
    id: https://<KEY_VAULT_NAME>.vault.azure.net/certificates/<CERTIFICATE_NAME>
```

4. Credentials: in Microsoft Entra ID > Manage > App registrations create a new registration; set "Application (client) ID" as `AZURE_CLIENT_ID` and "Directory (tenant) ID" as `AZURE_TENANT_ID`. In "Manage > Certificates & secrets" create a new client secret and set its "Value" as `AZURE_CLIENT_SECRET`. In the key vault "Access control (IAM)" assign the "Key Vault Certificate User" and "Key Vault Crypto User" roles to the new application.

`tauri build` then produces signed Windows installers.

### Azure Artifact Signing

Azure Artifact Signing (previously Azure Code Signing / Azure Trusted Signing). Prerequisites (preinstalled for GitHub Actions): an Artifact Signing Account with permissions configured, .NET (8 recommended), Azure CLI, Signtool (Windows 11 SDK 10.0.26100.0 or later recommended).

```sh
cargo install artifact-signing-cli
```

Set `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` and `AZURE_TENANT_ID` (from your App Registration; add as GitHub Actions secrets too). Then configure `signCommand` in `tauri.conf.json` or a Windows-specific config file:

```json
{
  "bundle": {
    "windows": {
      "signCommand": "artifact-signing-cli -e https://wus2.codesigning.azure.net -a MyAccount -c MyProfile -d MyApp %1"
    }
  }
}
```

| Flag | Description |
| --- | --- |
| `-e` | Endpoint of your Azure Artifact Signing account |
| `-a` | Name of your Azure Artifact Signing Account |
| `-c` | Name of the Certificate profile inside your account |
| `-d` | Description of the signed content (optional). When signing an `.msi`, this appears as the installer name in the UAC prompt, or a random string if unset |

## Notes

- Since 2024 an EV certificate no longer gives immediate SmartScreen reputation (Microsoft removed the special treatment from its Trusted Root Program); EV and OV certificates build reputation the same way and a newly signed release can show a warning with either. Signing every release with the same certificate lets reputation carry across releases; you may also submit the app to Microsoft for manual review (not guaranteed).
- When cross compiling Windows installers from Linux and macOS you **must** use a custom sign command, as the default implementation only works on Windows.
- The source's `tauri.conf.json` instructions say to look for `tauri` -> `bundle` -> `windows`; in Tauri v2 the section is `bundle > windows` at the top level of the config.
- The OV GitHub Actions template in the source uses old action versions (`actions/checkout@v2`, `actions/setup-node@v1`, `actions-rs/toolchain@v1`) and `webkit2gtk-4.0`; adapt them to the current workflow in the GitHub pipelines page.
- Tauri bundler side only; Windows signing and Microsoft Store procedures belong to the windows-packaging-publish skill.

## Related

- [windows-installer](./windows-installer.md)
- [microsoft-store](./microsoft-store.md)
- [pipelines-github](./pipelines-github.md)
- [bundle-windows config](../config/bundle-windows.md)
