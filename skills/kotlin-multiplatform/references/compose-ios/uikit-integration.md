---
source: https://kotlinlang.org/docs/multiplatform/compose-uikit-integration.html
---

# Integration with the UIKit framework

Compose Multiplatform is interoperable with the UIKit framework. You can embed Compose Multiplatform within a UIKit application as well as embed native UIKit components within Compose Multiplatform.

## Signature / Usage

Use Compose Multiplatform inside a UIKit application: add the Compose Multiplatform code to any container view controller. This example uses `UITabBarController`:

```swift
let composeViewController = Main_iosKt.ComposeOnly()
composeViewController.title = "Compose Multiplatform inside UIKit"

let anotherViewController = UIKitViewController()
anotherViewController.title = "UIKit"

// Set up the UITabBarController
let tabBarController = UITabBarController()
tabBarController.viewControllers = [
    // Wrap the created ViewControllers in a UINavigationController to set titles
    UINavigationController(rootViewController: composeViewController),
    UINavigationController(rootViewController: anotherViewController)
]
tabBarController.tabBar.items?[0].title = "Compose"
tabBarController.tabBar.items?[1].title = "UIKit"
```

Use UIKit inside Compose Multiplatform: add the UIKit elements to a `UIKitView`. Set the component size with `Modifier.size()` or `Modifier.fillMaxSize()`.

```kotlin
UIKitView(
    factory = { MKMapView() },
    modifier = Modifier.size(300.dp),
)
```

Wrapping `UITextField` with Compose state:

```kotlin
@OptIn(ExperimentalForeignApi::class)
@Composable
fun UseUITextField(modifier: Modifier = Modifier) {
    // Holds the state of the text in Compose
    var message by remember { mutableStateOf("Hello, World!") }

    UIKitView(
        factory = {
            // Creates a UITextField integrated with Compose state
            val textField = object : UITextField(CGRectMake(0.0, 0.0, 0.0, 0.0)) {
                @ObjCAction
                fun editingChanged() {
                    // Updates the Compose state when text changes in UITextField
                    message = text ?: ""
                }
            }
            // Adds a listener for text changes within the UITextField
            textField.addTarget(
                target = textField,
                action = NSSelectorFromString(textField::editingChanged.name),
                forControlEvents = UIControlEventEditingChanged
            )
            textField
        },
        modifier = modifier.fillMaxWidth().height(30.dp),
        update = { textField ->
            // Updates UITextField text from Compose state
            textField.text = message
        }
    )
}
```

Web view with `WKWebView`:

```kotlin
UIKitView(
    factory = {
        WKWebView().apply {
            loadRequest(NSURLRequest(URL = NSURL(string = "https://www.jetbrains.com")))
        }
    },
    modifier = Modifier.size(300.dp)
)
```

Camera view with `AVCaptureSession` and `AVCaptureVideoPreviewLayer`:

```kotlin
val session = remember {
    AVCaptureSession().apply {
        val device = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo)!!
        val input = AVCaptureDeviceInput.deviceInputWithDevice(device, null)!!
        addInput(input)
    }
}
UIKitView(
    factory = {
        val previewLayer = AVCaptureVideoPreviewLayer(session)
        session.startRunning()

        object : UIView() {
            override fun layoutSubviews() {
                super.layoutSubviews()
                previewLayer.frame = bounds
            }
        }.apply {
            layer.addSublayer(previewLayer)
        }
    },
    modifier = Modifier.size(300.dp),
    onRelease = { session.stopRunning() }
)
```

The page also contains an advanced `RealDeviceCamera` composable (photo capture with `AVCapturePhotoOutput`, GPS metadata, a native `UIView` preview) and an advanced `WebViewWithDelegate` composable (`WKNavigationDelegateProtocol` plus `update`). See the source page and the ImageViewer sample for full code.

## Notes

- The official camera example never stops the session; this page adds `onRelease` to call `stopRunning()` when the view leaves the composition. The same applies to the advanced `RealDeviceCamera` composable.
- In the `UITextField` example, the `factory` parameter holds `editingChanged()` and the `addTarget()` listener; `editingChanged()` is annotated with `@ObjCAction` to interoperate with Objective-C; the `update` parameter of `UIKitView()` is called when the observable `message` state changes.
- Compose Multiplatform rendering requires high refresh rates to be explicitly enabled: add the `CADisableMinimumFrameDurationOnPhone` key to your app's `Info.plist` file. Without it, the app will crash at runtime.
- To test the camera examples on a real device, add the `NSCameraUsageDescription` key to the app's `Info.plist` file. Without it, the app will crash at runtime.
- In `WebViewWithDelegate`, the delegate object is `remember`ed across recompositions, and `update` reloads the page when the requested URL changes.
- Distinct from the apple-uikit skill, which covers UIKit APIs themselves; this page covers only the Compose Multiplatform side (`UIKitView`, `ComposeUIViewController`). Common Compose UI APIs belong to the android-compose-ui skill.

## Related

- [swiftui-integration](./swiftui-integration.md)
- [touch-with-native-ui](./touch-with-native-ui.md)
- [ios-migration](./ios-migration.md)
