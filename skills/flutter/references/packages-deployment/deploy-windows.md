---
source: https://docs.flutter.dev/deployment/windows
---

# Build and release a Windows desktop app

Step-by-step walkthrough of packaging and deploying a Flutter Windows desktop app through the Microsoft Store. Publishing through the Store is not required; Microsoft documentation covers traditional installation approaches such as Windows Installer.

## Signature / Usage

Version via `pubspec.yaml`, build with Flutter, then package as MSIX:

```yaml
version: 1.0.0+1
```

```console
flutter build windows --build-name 1.0.0 --build-number 1
msstore package .
msstore publish -v
```

### Preliminaries

Confirm the app satisfies Microsoft Store Policies, and join the Microsoft Partner Network to submit apps. In the Microsoft Partner Center, reserve the application name; pricing, availability, age ratings and category are configured with the first submission and retained for subsequent ones.

### Packaging and deployment

Valid package formats: **.msix**, **.msixbundle**, **.msixupload**, **.appx**, **.appxbundle**, **.appxupload**, **.xap**. See "MSIX packaging" in the Windows building page. Each product has a unique identity assigned by the Store; for manual packaging retrieve the package identity name, publisher and publisher display name in the Partner Center: application > **Product management** > **Product identity**. Submit manually by creating a new submission, **Packages**, and uploading the package.

### Continuous deployment

- Codemagic CI/CD uses the `msix` pub package to package, via the Codemagic Workflow Editor or `codemagic.yaml`, and publishes through the Partner Center submission API (requires associating the Azure Active Directory and Partner Center accounts).
- GitHub Actions can use the Microsoft Dev Store CLI (`msstore`), installed by the `setup-msstore-cli` action. The project's `pubspec.yaml` must contain an appropriate `msix_config` node. Environment secrets `AZURE_AD_TENANT_ID`, `AZURE_AD_ClIENT_ID`, `AZURE_AD_CLIENT_SECRET` and `SELLER_ID` (Dev Center **Account Settings** > **Organization Profile** > **Legal Info**) are required. The application must already exist in the Dev Center with at least one complete submission, and `msstore init` must be run once within the repository.

```yaml
- uses: microsoft/setup-msstore-cli@v1

- name: Configure the Microsoft Store CLI
  run: msstore reconfigure --tenantId ${{ secrets.AZURE_AD_TENANT_ID }} --clientId ${{ secrets.AZURE_AD_ClIENT_ID }} --clientSecret ${{ secrets.AZURE_AD_CLIENT_SECRET }} --sellerId ${{ secrets.SELLER_ID }}

- name: Install Dart dependencies
  run: flutter pub get

- name: Create MSIX package
  run: msstore package .

- name: Publish MSIX to the Microsoft Store
  run: msstore publish -v
```

### Version number

| Case | Default | Notes |
|------|---------|-------|
| Microsoft Store apps | `1.0.0.0` | Set during packaging; the revision (last) number must remain zero for all releases. |
| Apps not in the Store | file version `1.0.0.1`, product version `1.0.0+1` | The build name becomes the first three numbers of the file and product versions; the build number becomes the fourth. Override with `flutter build windows --build-name` / `--build-number`. |

### App icons

In **windows\runner\resources** replace **app_icon.ico**; if renamed, change the **IDI_APP_ICON** value in **windows\runner\Runner.rc**. With the `msix` pub package the logo path can also be configured in `pubspec.yaml`. Store listing logo: upload a 300 x 300 pixel image under Store logos.

### Validating the application package

Validate locally before publication with the Windows App Certification Kit (included in the Windows SDK): launch it, select the package (**.msix**, **.msixbundle**, etc.), choose a destination for the report. The report might contain important warnings even if certification passes.

## Notes

- Store a secret value only in CI secret storage; the YAML above references secrets and never inlines them.
- Flutter build/release procedure only; MSIX/Microsoft Store packaging in general is covered by windows-packaging-publish, and Win32/WinUI APIs by the windows-app-sdk family.

## Related

- [Set up Flutter flavors for Windows](./flavors-windows.md)
- [Continuous delivery with Flutter](./continuous-delivery.md)
