---
source: https://www.electronjs.org/docs/latest/tutorial/accessibility
---

# Accessibility

Expose Chrome's accessibility tree manually, or toggle it from third-party macOS software.

```js
app.setAccessibilitySupportEnabled(enabled)
```

Objective-C (third-party macOS assistive technology toggling an Electron app):

```objc
CFStringRef kAXManualAccessibility = CFSTR("AXManualAccessibility");

+ (void)enableAccessibility:(BOOL)enable inElectronApplication:(NSRunningApplication *)app
{
    AXUIElementRef appRef = AXUIElementCreateApplication(app.processIdentifier);
    if (appRef == nil)
        return;

    CFBooleanRef value = enable ? kCFBooleanTrue : kCFBooleanFalse;
    AXUIElementSetAttributeValue(appRef, kAXManualAccessibility, value);
    CFRelease(appRef);
}
```

Swift:

```swift
import Cocoa
let name = CommandLine.arguments.count >= 2 ? CommandLine.arguments[1] : "Electron"
let pid = NSWorkspace.shared.runningApplications.first(where: {$0.localizedName == name})!.processIdentifier
let axApp = AXUIElementCreateApplication(pid)
let result = AXUIElementSetAttributeValue(axApp, "AXManualAccessibility" as CFString, true as CFTypeRef)
print("Setting 'AXManualAccessibility' \(error.rawValue == 0 ? "succeeded" : "failed")")
```

## Notes

- Electron enables accessibility features automatically when assistive technology (JAWS on Windows, VoiceOver on macOS) is present; the user's system utilities take priority over `app.setAccessibilitySupportEnabled`.
- `app.setAccessibilitySupportEnabled(enabled)` is macOS and Windows; the first line above is the call form from the page, not a full program.
- Accessibility concerns are those of websites, since the UI is HTML.
- The Swift snippet is reproduced verbatim from the official page; it references `error`, which is not declared in the snippet.
- Distance: native accessibility frameworks are in apple-appkit and windows-winui-ui; the Objective-C / Swift code here is for external tools, not for the Electron app itself.
