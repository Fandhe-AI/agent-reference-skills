# Desktop browser policies

Configure the built-in browser in the ChatGPT desktop app with MDM using Chrome Enterprise policies (244 supported); cloud management of these policies is not yet available.

## Signature / Usage

Example `/etc/opt/codex/policies/managed/browser.json` (Linux):

```json
{
  "PasswordManagerEnabled": false,
  "CookiesBlockedForUrls": ["https://example.com"]
}
```

Windows (Intune platform script) writes the same policies to the registry:

```powershell
$ErrorActionPreference = 'Stop'
$policyRoot = 'HKLM:\SOFTWARE\Policies\OpenAI\Codex'
if (-not (Test-Path -LiteralPath $policyRoot)) {
  New-Item -Path $policyRoot -Force | Out-Null
}
New-ItemProperty -Path $policyRoot -Name PasswordManagerEnabled -PropertyType DWord -Value 0 -Force | Out-Null
$cookieKey = "$policyRoot\CookiesBlockedForUrls"
if (-not (Test-Path -LiteralPath $cookieKey)) {
  New-Item -Path $cookieKey -Force | Out-Null
}
New-ItemProperty -Path $cookieKey -Name '1' -PropertyType String -Value 'https://example.com' -Force | Out-Null
```

## Options / Props

### Policy locations

| Platform | Format | Chrome location | ChatGPT desktop location |
| --- | --- | --- | --- |
| Windows | Registry values and keys | `SOFTWARE\Policies\Google\Chrome` | `SOFTWARE\Policies\OpenAI\Codex` |
| macOS | Managed preferences in a configuration profile | `com.google.Chrome` | `com.openai.codex` |
| Linux | JSON files in the mandatory-policy directory | `/etc/opt/chrome/policies/managed/` | `/etc/opt/codex/policies/managed/` |

### Example policies

| Policy | Example value | Effect |
| --- | --- | --- |
| `PasswordManagerEnabled` | `false` | Prevents saving new passwords; existing ones aren't deleted |
| `CookiesBlockedForUrls` | `["https://example.com"]` | Blocks cookies from that URL; doesn't block access |

### Windows registry value formats

| Type | Encoding |
| --- | --- |
| True or false | `REG_DWORD`, `0` false, `1` true |
| String lists | Child key named after the policy; numbered `REG_SZ` values starting at `1` |
| Structured | Follow the policy reference's Windows encoding (e.g. `ExtensionSettings` as JSON string in `REG_SZ`) |

### Supported policy families (244 in total)

The page lists every supported policy name alphabetically (A-C through T-Z); look each up in Google's Chrome Enterprise policy list for values. Examples: `URLAllowlist`, `URLBlocklist`, `ExtensionSettings`, `ExtensionInstallForcelist`, `ProxyMode`, `ProxyServer`, `DownloadRestrictions`, `PasswordManagerEnabled`, `CookiesBlockedForUrls`, `JavascriptEnabled`, `PrintingEnabled`, `DefaultPopupsSetting`, `ScreenCaptureAllowed`, `WebRtcIPHandling`, `SitePerProcess`, `CACertificates`.

## Notes

- The ChatGPT desktop identifiers still contain `Codex` / `codex`; use them exactly. Chrome's ADMX templates target Chrome only; use custom registry settings. A profile for Chrome's domain doesn't target ChatGPT desktop.
- Windows: `HKEY_LOCAL_MACHINE` for all users, `HKEY_CURRENT_USER` for one user (a SYSTEM script doesn't write to a signed-in user's HKCU). Recommended defaults use a child key `Recommended`. In Intune, set **Run this script using the logged on credentials** to **No** and **Run script in 64-bit PowerShell host** to **Yes**. Group Policy: use Registry preference items.
- macOS: set forced (mandatory) managed preferences in `com.openai.codex` (Jamf **Application & Custom Settings**; Intune **Templates → Preference file**, keeping only the key-value pairs inside the outer `<dict>`). `defaults write` isn't mandatory.
- Linux: root-owned files (typically `0755` dirs, `0644` files) placed directly in `managed/` (no nested directories); `/etc/opt/codex/policies/recommended/` for user-changeable defaults; avoid defining a policy in several files.
- Verify: restart the app, open an in-app tab at `chrome://policy`, **Reload policies**; expect source **Platform**, level **Mandatory**, no error. Some policies need a full restart. Seeing a policy there doesn't prove the feature behaves as intended.
- To remove a policy, update the deployment and delete obsolete registry entries or file keys.
- Source: https://learn.chatgpt.com/docs/enterprise/desktop-browser-policies (retrieved 2026-11-14).

## Related

- [Managed configuration](./managed-configuration.md)
- [Agent security](./agent-security.md)
