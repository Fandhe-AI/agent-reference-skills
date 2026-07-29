# Use a C# Component from C++/WinRT

Consumes a Windows Runtime Component (WRC) authored in C# from a C++/WinRT app: add a project reference, `#include` the generated `winrt/<Namespace>.h` header, and call it like any other projected WinRT type. The reverse-direction counterpart of authoring a WinRT component in C# (see csharp-winrt).

## Signature / Usage

C# side — Windows Runtime types must be `public sealed`, and members may only expose WinRT-compatible types in their public surface:

```csharp
public sealed class Example
{
    int MyNumber;

    public string GetMyString()
    {
        return $"This is call #: {++MyNumber}";
    }
}
```

C++/WinRT side — after adding a project reference to the C# Windows Runtime Component project, include its generated header and consume it directly:

```cppwinrt
// MainPage.h
#include "winrt/SampleComponent.h"

namespace winrt::CppToCSharpWinRT::implementation
{
    struct MainPage : MainPageT<MainPage>
    {
        winrt::SampleComponent::Example myExample;
    };
}
```

```cppwinrt
// MainPage.cpp
void MainPage::ClickHandler(IInspectable const&, RoutedEventArgs const&)
{
    hstring myString = myExample.GetMyString();
    myButton().Content(box_value(myString));
}
```

## Options / Props

| Step | Description |
|------|-------------|
| C# project template | **Windows Runtime Component (Universal Windows)** — produces a `.winmd` on build that the C++/WinRT project consumes as a projected header. |
| Add Reference | In the C++/WinRT project, add a **Project** reference to the C# component project (Solution Explorer → References → Add Reference → Projects → Solution). |
| `#include "winrt/<ComponentNamespace>.h"` | Generated projection header exposing the C# types under `winrt::<ComponentNamespace>::`. |
| Debugger Type = *Managed and Native* | Project property (**Debugging**) needed to step through both the C# and C++ sides together. |
| **Application Minimum** version | Controls which .NET is used to compile; Windows 10 Fall Creators Update (10.0.16299.0)+ enables .NET Standard 2.0 and Arm64, at the cost of extra `.vcxproj` NuGet-import configuration. |

## Notes

- .NET automatically maps common .NET types (primitives, collections) to their WinRT equivalents in the component's public interface — only WinRT-compatible types may appear in members exposed to C++/WinRT.
- All Windows Runtime classes exposed from the C# component must be declared `sealed` (the default when you use the project template).
- If the C# component references its own NuGet packages, the consuming C++/WinRT project must separately reference the same package (via `packages.config`) and add a `DeploymentContent` item for the package's DLL, or the dependency won't be deployed with the app.

## Related

- [Author APIs and IDL](./author-apis.md)
- [Consume APIs](./consume-apis.md)

The C#-authoring counterpart (Authoring WinRT Components in C#) lives in the csharp-winrt category of this skill.
