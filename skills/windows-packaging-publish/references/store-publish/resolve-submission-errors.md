# Resolve Submission Errors

Common submission/certification errors for MSIX apps and how to resolve them, plus a checklist to avoid frequent certification failures.

## Signature / Usage

Error categories: UWP package format errors (wrong file uploaded, .NET Native compile errors), desktop packaging errors (Win32+UWP packages must use the Windows Packaging Project, not a plain UWP template), and name/identity mismatches (`The name found in the package is not one of your reserved app names`).

## Options / Props

| Error | Fix |
|---|---|
| Wrong package file uploaded | Upload the Visual Studio-generated `.msixupload`/`.appxupload`, not the raw `.msix`/`.msixbundle` |
| .NET Native compile error | Verify the app builds successfully in Release mode |
| Win32+UWP packaging issue | Use the Windows Packaging Project (Visual Studio 2017 Update 4+), not a UWP project template |
| Name/identity mismatch | Check Product identity page for an assigned Identity; reserve the exact name used in the package via Manage app name reservations |

## Notes

Common certification failure causes to avoid:

- Submitting an unfinished app (incomplete sections, under-construction links).
- Skipping local Windows App Certification Kit testing before submission.
- App crashing when there is no network connectivity.
- Missing test account credentials or access steps in Notes for certification.
- Missing a required privacy policy URL.
- Inaccurate app description relative to actual functionality.
- Incomplete or inaccurate Age ratings questionnaire answers.
- Declaring accessibility support without having engineered/tested for it.
- Using the legacy `Windows.ApplicationModel.Store.CurrentAppSimulator` class (test-only) instead of `CurrentApp`, or not migrating to `Windows.Services.Store` for apps targeting Windows 10 version 1607+.

## Related

- [App Certification Process](./app-certification-process.md)
- [Store Context](./store-context.md)
