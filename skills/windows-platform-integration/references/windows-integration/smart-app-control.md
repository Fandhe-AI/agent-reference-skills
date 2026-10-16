# Smart App Control

App execution control that combines Microsoft app intelligence services with Windows code integrity. Allows apps and binaries only if likely safe, or if signed with a certificate from a CA in the Trusted Root Program. Malware, PUA, and unknown unsigned code are blocked by default.

## Signature / Usage

Verify the current mode (and apply an audit policy refresh) from an administrator command prompt:

```powershell
citool.exe -lp
citool.exe -r
```

Evaluation mode: Friendly Name `VerifiedAndReputableDesktopEvaluation`, Is Currently Enforced `true`. Enforcement mode: `VerifiedAndReputableDesktop`, Is Currently Enforced `true`.

## Options / Props

Modes:

| Mode | Behavior |
|------|----------|
| Evaluation | Evaluates whether the device is a good fit; may turn itself off automatically for users such as developers. Evaluates signatures but does not block. |
| Enforcement (On) | Apps cannot run unless recognized by Microsoft app intelligence services or signed with a trusted certificate. Blocked and audited events are logged by default. |
| Off | Not running. |

Registry values for `VerifiedAndReputablePolicyState` (testing only):

| Value | Mode |
|-------|------|
| 0 | Off |
| 1 | On (Enforcement) |
| 2 | Evaluation |

Audit policies (apply only in Evaluation mode; sample zip at https://aka.ms/sacauditpolicies):

| Policy file | Policy name in `citool.exe -lp` | Purpose |
|-------------|--------------------------------|---------|
| `SmartAppControlAudit.bin` | `VerifiedAndReputableDesktopEvaluationAudit` | Standard SAC policy with audit logs in evaluation mode. Signature and cloud reputation both allow. May cause the evaluation model to turn evaluation mode off. |
| `SmartAppControlAuditNoISG.bin` | `VerifiedAndReputableDesktopEvaluationAuditNoISG` | Does not check the Intelligent Security Graph; only properly signed apps pass without audit events. Intended for developers testing their own apps. Works even when SAC is Off. |

Event logs: Event Viewer > Application and Services Logs > Microsoft > Windows > CodeIntegrity > Operational. Event ID 3076 = evaluation mode, 3077 = enforcement mode.

## Notes

- Signing: Smart App Control supports both RSA and ECC code signing certificates. Code can be signed with any certificate, but only certificates issued by trusted providers are considered. Artifact Signing is the preferred way to sign; `signtool.exe` (included with Visual Studio) is the alternative. The signing procedure itself is covered by the windows-packaging-publish skill (code-signing).
- Test all code paths: install and uninstall binaries, all features, and integrations that load your binaries (e.g. Office add-ins). SAC evaluates binaries as they load.
- Settings path: Settings > Privacy & Security > Windows Security > App and Browser Control > Smart App Control settings. Setting Off or On (enforcement) is one-way unless the current setting is Evaluation; for testing, force a mode via the registry.
- WARNING: the registry-based mode forcing below is for testing only and weakens protection. Run it only on a disposable test VM, never on a development or production machine. It is run from an administrator prompt, then from the Recovery command prompt.
- Step 1 (administrator prompt): disable BitLocker protectors for two reboots and remove Defender definitions with `manage-bde -protectors c: -disable -rebootcount 2` and `"C:\Program Files\Windows Defender\MpCmdRun.exe" -RemoveDefinitions -DynamicSignatures`.
- Step 2: reboot to Recovery > Advanced Startup > Troubleshoot > Advanced > Command Prompt (the recovery drive is X:, system drive keeps its usual letter) and run the following. The example sets Evaluation mode (`/d 2`); use `/d 0` for Off or `/d 1` for On per the Registry values table above, with the same value in both `VerifiedAndReputablePolicyState*` `reg add` commands. Restart afterward.

```powershell
reg load HKLM\sac c:\windows\system32\config\system
reg add hklm\sac\controlset001\control\ci\policy /v VerifiedAndReputablePolicyState /t REG_DWORD /d 2 /f
reg add hklm\sac\controlset001\control\ci\protected /v VerifiedAndReputablePolicyStateMinValueSeen /t REG_DWORD /d 2 /f
reg unload hklm\sac

reg load HKLM\sac2 C:\windows\system32\config\SOFTWARE
reg add "hklm\sac2\Microsoft\Windows Defender" /v SacLearningModeSwitch /t REG_DWORD /d 0
reg unload hklm\sac2
```

- Apply `SmartAppControlAudit.bin` (disposable test machine only): ensure SAC is in evaluation mode; take ownership of the active evaluation policy (`takeown /f "C:\WINDOWS\System32\CodeIntegrity\CiPolicies\Active\{1283AC0F-FFF1-49AE-ADA1-8A933130CAD6}.cip" /a`, then `icacls` on the same path with `/grant Administrators:F`), rename it to `.cip.old`, put the audit policy in as `{1283AC0F-FFF1-49AE-ADA1-8A933130CAD6}.cip`, then run `citool.exe -r`. The `takeown` command may report success but fail; fall back to the manual File Explorer ownership steps.
- Apply `SmartAppControlAuditNoISG.bin` (disposable test machine only): ensure SAC is evaluation or off; run `mountvol S: /S`; copy the file to `S:\efi\microsoft\boot\cipolicies\active\{5283AC0F-FFF1-49AE-ADA1-8A933130CAD6}.cip`; run `citool.exe -r`.
- The CodeIntegrity log records only blocked or audited files; it does not log which installations fail or why. Review 3076/3077 events to find which installer files were blocked.
- Custom policies can be built as WDAC base policies.

## Related

- [Certificate](../security-identity/certificate.md)
- [AppContainer](../security-identity/appcontainer.md)
- [Official docs: Smart App Control overview](https://learn.microsoft.com/en-us/windows/apps/develop/smart-app-control/overview)
- [Official docs: Test your app with Smart App Control](https://learn.microsoft.com/en-us/windows/apps/develop/smart-app-control/test-your-app-with-smart-app-control)
