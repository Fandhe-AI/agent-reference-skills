---
source: https://v2.tauri.app/distribute/sign/macos/
---

# macOS Code Signing

Code signing is required on macOS to list your app in the Apple App Store and to prevent a "broken application" warning when downloaded from the browser. Distribution outside the App Store with a _Developer ID Application_ certificate also requires notarization.

## Signature / Usage

Find the signing identity of an installed certificate and give it to Tauri:

```sh
security find-identity -v -p codesigning
```

Set it in `tauri.conf.json > bundle > macOS > signingIdentity` or via the `APPLE_SIGNING_IDENTITY` environment variable.

Export a certificate for CI/CD:

```sh
openssl base64 -A -in /path/to/certificate.p12 -out certificate-base64.txt
```

## Options / Props

| Environment variable | Description |
| --- | --- |
| `APPLE_SIGNING_IDENTITY` | Signing identity (alternative to `signingIdentity` config) |
| `APPLE_CERTIFICATE` | Contents of `certificate-base64.txt` (base64 `.p12`) |
| `APPLE_CERTIFICATE_PASSWORD` | Password of the exported `.p12` |
| `APPLE_API_ISSUER` | Notarization (App Store Connect): Issuer ID above the keys table |
| `APPLE_API_KEY` | Notarization (App Store Connect): Key ID column value |
| `APPLE_API_KEY_PATH` | Notarization (App Store Connect): path of the downloaded private key |
| `APPLE_ID` | Notarization (Apple ID): Apple account email |
| `APPLE_PASSWORD` | Notarization (Apple ID): app-specific password |
| `APPLE_TEAM_ID` | Notarization (Apple ID): Apple Team ID (account membership page) |

## Signing

1. Generate a Certificate Signing Request (CSR) on your Mac.
2. In Certificates, IDs & Profiles click `Create a certificate`. Choose `Apple Distribution` to submit to the App Store or `Developer ID Application` to ship outside it; upload the CSR.
3. Download the `.cer` file and open it to install the certificate in the keychain.
4. Locally: configure the signing identity as above.
5. CI/CD: in Keychain Access (_My Certificates_ tab, _login_ keychain) export the certificate key as `.p12` with a password, convert it to base64 and set `APPLE_CERTIFICATE` and `APPLE_CERTIFICATE_PASSWORD`.

Example GitHub Actions job (required secrets: `APPLE_ID`, `APPLE_PASSWORD`, `APPLE_CERTIFICATE`, `APPLE_CERTIFICATE_PASSWORD`, `KEYCHAIN_PASSWORD`):

```yaml
name: 'build'

on:
  push:
    branches:
      - main

jobs:
  build-macos:
    needs: prepare
    strategy:
      matrix:
        include:
          - args: '--target aarch64-apple-darwin'
            arch: 'silicon'
          - args: '--target x86_64-apple-darwin'
            arch: 'intel'
    runs-on: macos-latest
    env:
      APPLE_ID: ${{ secrets.APPLE_ID }}
      APPLE_PASSWORD: ${{ secrets.APPLE_PASSWORD }}
    steps:
      - name: Import Apple Developer Certificate
        env:
          APPLE_CERTIFICATE: ${{ secrets.APPLE_CERTIFICATE }}
          APPLE_CERTIFICATE_PASSWORD: ${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
          KEYCHAIN_PASSWORD: ${{ secrets.KEYCHAIN_PASSWORD }}
        run: |
          echo $APPLE_CERTIFICATE | base64 --decode > certificate.p12
          security create-keychain -p "$KEYCHAIN_PASSWORD" build.keychain
          security default-keychain -s build.keychain
          security unlock-keychain -p "$KEYCHAIN_PASSWORD" build.keychain
          security set-keychain-settings -t 3600 -u build.keychain
          security import certificate.p12 -k build.keychain -P "$APPLE_CERTIFICATE_PASSWORD" -T /usr/bin/codesign
          security set-key-partition-list -S apple-tool:,apple:,codesign: -s -k "$KEYCHAIN_PASSWORD" build.keychain
          security find-identity -v -p codesigning build.keychain
      - name: Verify Certificate
        run: |
          CERT_INFO=$(security find-identity -v -p codesigning build.keychain | grep "Apple Development")
          CERT_ID=$(echo "$CERT_INFO" | awk -F'"' '{print $2}')
          echo "CERT_ID=$CERT_ID" >> $GITHUB_ENV
          echo "Certificate imported."
      - uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          APPLE_CERTIFICATE: ${{ secrets.APPLE_CERTIFICATE }}
          APPLE_CERTIFICATE_PASSWORD: ${{ secrets.APPLE_CERTIFICATE_PASSWORD }}
          APPLE_SIGNING_IDENTITY: ${{ env.CERT_ID }}
        with:
          args: ${{ matrix.args }}
```

## Notarization

Provide credentials for Tauri to authenticate with Apple, either with the App Store Connect API or an Apple ID:

- App Store Connect: in Users and Access, Integrations tab, Add (name, Developer access); set `APPLE_API_ISSUER`, `APPLE_API_KEY`; download the private key (only once, visible after a page reload) and set `APPLE_API_KEY_PATH`.
- Apple ID: set `APPLE_ID`, `APPLE_PASSWORD` (app-specific password), `APPLE_TEAM_ID`.

Then rerun the build, e.g. `pnpm tauri build --bundles dmg`. To skip stapling for an initial notarization pass append `--skip-stapling`:

```sh
pnpm tauri build --bundles dmg --skip-stapling
```

## Ad-Hoc Signing

If you do not want to provide an Apple-authenticated identity but still want to sign, use the pseudo-identity `-`. This is useful on Apple Silicon, where code-signing is required for all apps from the Internet.

```json
"signingIdentity": "-"
```

## Notes

- Requires an Apple Developer account, paid (99$ per year) or free (testing and development only), and an Apple device for signing. With a free account you cannot notarize and the app still shows as not verified.
- Only the Apple Developer `Account Holder` can create _Developer ID Application_ certificates (it can be associated with a different Apple ID via a CSR with a different user email).
- A signing certificate is only valid if associated with your Apple ID; an invalid one is not listed in _Keychain Access > My Certificates_ or the `security find-identity` output. If the certificate does not download to the correct location, select the "login" option under "Default Keychains" in Keychain Access.
- Notarization is required when using a _Developer ID Application_ certificate.
- Ad-hoc signing does not prevent macOS from requiring users to allow the app in Privacy & Security settings.
- The source's example job verifies a certificate using `grep "Apple Development"`; adjust it to your certificate type.
- Tauri bundler side only; Apple's signing and notarization procedures belong to the apple-distribution skill.

## Related

- [app-store](./app-store.md)
- [macos-application-bundle](./macos-application-bundle.md)
- [dmg](./dmg.md)
- [pipelines-github](./pipelines-github.md)
