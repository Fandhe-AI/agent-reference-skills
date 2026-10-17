---
source: https://kotlinlang.org/docs/multiplatform/ios-ci-cd-teamcity.html
---

# Configure an iOS delivery pipeline for your Kotlin Multiplatform project

Set up TeamCity Cloud for a KMP project with an iOS target: build and test on a hosted macOS agent, configure Apple signing, upload to TestFlight, and trigger builds on every push.

## Signature / Usage

```text
Commit and push
  -> Configure CI (generates local, uncommitted pipeline files)
  -> first build (local project files, hosted macOS agent)
  -> Publish to TestFlight (configure Apple signing)
  -> Connect repository (attach GitHub repository and branch)
  -> commit and push generated files; every push builds, tests, signs, uploads
```

## Options / Props

Apple signing credentials entered in the IDE form (stored by TeamCity as secure deployment credentials, not in project source files):

| Field | Description |
|-------|-------------|
| Issuer ID | Identifies your App Store Connect API integration |
| Key ID | Identifies the API key that you created |
| Private Key | The `.p8` file downloaded from App Store Connect |
| Team ID | Your Apple Developer team identifier |
| Bundle ID | Your app's unique identifier (for example, `com.company.app`), as configured in your app target and listed in App Store Connect |
| Certificate | The `.p12` distribution certificate that includes the private key |
| .p12 password | The password that you specified when exporting the certificate |

## Notes

- The fenced block summarizes the IDE flow; the page contains no code. The flow is driven from the Kotlin Multiplatform IDE plugin: after commit and push, click Configure CI; the plugin generates the files needed to build and test the iOS app on a hosted macOS agent, added locally but not committed. The TeamCity plugin (JetBrains Marketplace plugin 25142) is installed if missing.
- A TeamCity Cloud workspace is required (accept Terms of Service, Create free account, Authorize JetBrains). The free tier includes a monthly allowance of build minutes and storage.
- The first build uses local, uncommitted project files. Then click Publish to TestFlight to configure signing.
- App Store Connect API key: Users and Access, Keys; download the `.p8` file (only once, store it securely) and note the Issuer ID and Key ID.
- Distribution certificate: create or locate an Apple Distribution certificate, export it from Keychain Access (My Certificates) as `.p12` with an export password. Without a Mac, generate a CSR and convert the certificate to `.p12` with OpenSSL.
- Never commit the `.p8` / `.p12` files or passwords to the repository; enter them only in the IDE form.
- After the first deployment, Connect repository to attach the GitHub repository and branch; commit and push the generated pipeline files. Every push then builds the project, runs tests, signs the iOS app, and uploads a new build to TestFlight.
- App Store Connect, signing, and TestFlight concepts in general are covered by apple-distribution; this page covers only the TeamCity pipeline for a KMP project.

## Related

- [Configure TeamCity](./teamcity.md)
- [GitHub Actions](./github-actions.md)
- [Build and run](./build-and-run.md)
