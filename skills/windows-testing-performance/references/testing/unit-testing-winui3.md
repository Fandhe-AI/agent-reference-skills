# Unit Testing WinUI 3 Apps

Visual Studio's **WinUI Unit Test App** project template creates a XAML UI thread so tests can exercise `Microsoft.UI.Xaml` types directly. Applies to WinUI 3 desktop apps built with the Windows App SDK.

## Signature / Usage

```csharp
namespace WinUITest1
{
   [TestClass]
   public class UnitTest1
   {
      [TestMethod]
      public void TestMethod1()
      {
         Assert.AreEqual(0, 0);
      }

      // Use the UITestMethod attribute for tests that need to run on the UI thread.
      [UITestMethod]
      public void TestMethod2()
      {
         var grid = new Grid();
         Assert.AreEqual(0, grid.MinWidth);
      }
   }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `[TestClass]` | attribute | Marks a class containing MSTest test methods |
| `[TestMethod]` | attribute | Marks an ordinary test method (no XAML UI thread) |
| `[UITestMethod]` | attribute | Marks a test that must run on the XAML UI thread (required for `Microsoft.UI.Xaml` types) |
| `Assert.AreEqual` | static method | MSTest assertion comparing expected/actual values |

## Notes

- Recommended workflow: pull testable code into a separate **WinUI Class Library** project; both the app project and the unit test project reference that library, keeping the app project itself untested directly.
- Create the test project via Visual Studio: **Create a new project** > filter to C# / Windows / WinUI > **WinUI Unit Test App** template.
- Tests run and are discovered through Visual Studio **Test Explorer** (**Test** menu > **Test Explorer**, or `Ctrl+E, T`). Build the solution first so Test Explorer can discover tests.
- `[UITestMethod]` is required whenever the test constructs or touches `Microsoft.UI.Xaml.Controls.*` types (WinUI 3 namespace) — using plain `[TestMethod]` for such code will fail because there is no UI thread.
- This is distinct from unit testing non-WinUI .NET code — see the MSTest / xUnit / NUnit guide for tests that don't need a XAML UI thread.

## Related

- [Unit Testing Non-WinUI Code (MSTest / xUnit / NUnit)](./unit-testing-non-winui.md)
- [Testing Troubleshooting](./testing-troubleshooting.md)
