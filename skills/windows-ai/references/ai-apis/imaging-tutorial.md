# Imaging walkthrough (Image Super Resolution)

.NET MAUI sample that scales and sharpens an image with `ImageScaler`, alongside `LanguageModel` text generation.

## Signature / Usage

Core of the sample's `DoScaleImage` (scaling part):

```csharp
if (ImageScaler.GetReadyState() == AIFeatureReadyState.NotReady)
{
    var op = await ImageScaler.EnsureReadyAsync();
    if (op.Status != AIFeatureReadyResultState.Success)
    {
        throw new Exception(op.ExtendedError.Message);
    }
}

ImageScaler imageScaler = await ImageScaler.CreateAsync();

double imageScale = scale;
if (imageScale > imageScaler.MaxSupportedScaleFactor)
{
    imageScale = imageScaler.MaxSupportedScaleFactor;
}

int newHeight = (int)(origHeight * imageScale);
int newWidth = (int)(origWidth * imageScale);
SoftwareBitmap finalImage = imageScaler.ScaleSoftwareBitmap(softwareBitmap, newWidth, newHeight);
```

Display: `SoftwareBitmapSource` supports only `Bgra8` and not `Straight` alpha, so convert first:

```csharp
imageToShow = SoftwareBitmap.Convert(imageToShow, BitmapPixelFormat.Bgra8, BitmapAlphaMode.Premultiplied);
```

## Notes

- Complete the .NET MAUI steps of the get-started page first.
- Changes from the ".NET MAUI App" template are in four files: `MauiWindowsAISample.csproj` (Windows-conditioned Windows App SDK package reference and Windows `TargetFramework`), `Platforms/Windows/MainPage.cs`, `MainPage.xaml`, `MainPage.xaml.cs`.
- `ImageScaler.MaxSupportedScaleFactor` caps the requested scale.
- Two ways to show the result: set a `SoftwareBitmapSource` on the native `Microsoft.UI.Xaml.Controls.Image`, or PNG-encode into an `InMemoryRandomAccessStream` and use `ImageSource.FromStream` (keep the stream alive).
- Run: clone `microsoft/WindowsAppSDK-Samples`, switch to `release/experimental`, open `Samples/WindowsAIFoundry/cs-maui/MauiWindowsAISample.sln` in Visual Studio 2022, target "Windows Machine", press F5.
- Source: https://learn.microsoft.com/en-us/windows/ai/apis/imaging-tutorial (retrieved 2026-10-16)

## Related

- [ImageScaler](./image-scaler.md)
- [Imaging overview](./imaging-overview.md)
- [Get started building an app with Windows AI APIs](./get-started.md)
- [Tutorial: Phi Silica and .NET MAUI](./phi-silica-tutorial-maui.md)
