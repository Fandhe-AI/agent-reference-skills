---
source: https://kotlinlang.org/docs/multiplatform/compose-swiftui-integration.html
---

# Integration with the SwiftUI framework

Compose Multiplatform is interoperable with the SwiftUI framework. You can embed Compose Multiplatform within a SwiftUI application as well as embed native SwiftUI components within the Compose Multiplatform UI.

## Signature / Usage

Use Compose Multiplatform inside a SwiftUI application: create a Kotlin function `MainViewController()` that returns `UIViewController` from UIKit and contains Compose Multiplatform code.

```kotlin
fun MainViewController(): UIViewController =
    ComposeUIViewController {
        Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text("This is Compose code", fontSize = 20.sp)
        }
    }
```

Then convert the `UIViewController` instance to a SwiftUI view:

```swift
struct ComposeViewController: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIViewController {
        return Main_iosKt.MainViewController()
    }

    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {
    }
}
```

Use SwiftUI inside Compose Multiplatform: SwiftUI structures cannot be written directly in Kotlin. Write them in Swift, wrap them in an intermediate `UIViewController`, and pass it to a Kotlin entry point function that takes a factory.

```kotlin
@OptIn(ExperimentalForeignApi::class)
fun ComposeEntryPointWithUIViewController(
    createUIViewController: () -> UIViewController
): UIViewController =
    ComposeUIViewController {
        Column(
            Modifier
                .fillMaxSize()
                .windowInsetsPadding(WindowInsets.systemBars),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("How to use SwiftUI inside Compose Multiplatform")
            UIKitViewController(
                factory = createUIViewController,
                modifier = Modifier.size(300.dp).border(2.dp, Color.Blue),
            )
        }
    }
```

In Swift, wrap SwiftUI views with a `UIHostingController`:

```swift
Main_iosKt.ComposeEntryPointWithUIViewController(createUIViewController: { () -> UIViewController in
    let swiftUIView = VStack {
        Text("SwiftUI in Compose Multiplatform")
    }
    return UIHostingController(rootView: swiftUIView)
})
```

### Examples (SwiftUI inside Compose)

All examples use the same Kotlin entry point function above and differ in the Swift side.

Map view, using SwiftUI's `Map`:

```swift
import SwiftUI
import MapKit

Main_iosKt.ComposeEntryPointWithUIViewController(createUIViewController: {
    let region = Binding.constant(
        MKCoordinateRegion(
            center: CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194),
            span: MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05)
        )
    )

    let mapView = Map(coordinateRegion: region)
    return UIHostingController(rootView: mapView)
})
```

Camera view, using `UIImagePickerController` wrapped in `UIViewControllerRepresentable`:

```swift
struct CameraView: UIViewControllerRepresentable {
    let imageHandler: (UIImage) -> Void
    @Environment(\.presentationMode) private var presentationMode

    init(imageHandler: @escaping (UIImage) -> Void) {
        self.imageHandler = imageHandler
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.sourceType = .camera
        picker.delegate = context.coordinator
        return picker
    }

    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}

    class Coordinator: NSObject, UINavigationControllerDelegate, UIImagePickerControllerDelegate {
        let parent: CameraView

        init(_ parent: CameraView) {
            self.parent = parent
        }

        func imagePickerController(_ picker: UIImagePickerController,
                                   didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            if let image = info[.originalImage] as? UIImage {
                parent.imageHandler(image)
            }
            parent.presentationMode.wrappedValue.dismiss()
        }

        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            parent.presentationMode.wrappedValue.dismiss()
        }
    }
}
```

Web view, wrapping `WKWebView` with `UIViewRepresentable` and embedding it with `UIHostingController`:

```swift
Main_iosKt.ComposeEntryPointWithUIViewController(createUIViewController: {
    let url = URL(string: "https://www.jetbrains.com")!
    return UIHostingController(rootView: WebView(url: url))
})
```

The page also shows advanced variants: `AnnotatedMapView` (map region `@State` plus `MapMarker` annotations), `CameraPreview` (presents `CameraView` in a `.sheet` and shows the captured image), and `AdvancedWebView` / `WebViewContainer` (`WKNavigationDelegate` coordinator that tracks loading state and current URL via `@Binding`). See the source page for their full code.

## Notes

- `ComposeUIViewController()` is a Compose Multiplatform library function that accepts a composable function as the `content` argument.
- Compose Multiplatform rendering requires high refresh rates to be explicitly enabled: add the `CADisableMinimumFrameDurationOnPhone` key to your app's `Info.plist` file. Without it, the app will crash at runtime.
- `Main_iosKt.MainViewController` is a generated name; see the Kotlin "Interoperability with Swift/Objective-C" page for how top-level Kotlin functions are exposed to Swift.
- You can use the Compose view in any SwiftUI view hierarchy and control its size from within SwiftUI code.
- To test the camera example on a real device, add the `NSCameraUsageDescription` key to the app's `Info.plist` file. Without it, the app will crash at runtime.
- Distinct from the apple-swiftui skill, which covers SwiftUI APIs themselves; this page covers only the Compose Multiplatform side of the bridge (`ComposeUIViewController`, `UIKitViewController`). Common Compose UI APIs belong to the android-compose-ui skill.

## Related

- [uikit-integration](./uikit-integration.md)
- [liquid-glass](./liquid-glass.md)
