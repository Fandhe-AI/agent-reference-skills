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

### Size Compose views to fit their content (EAP)

A Compose view can measure its content using a sizing proposal from SwiftUI and report its preferred size. If that size changes, the hosting `UIView` invalidates its intrinsic content size so SwiftUI can run layout again and apply the updated size. For the `UIViewRepresentable` examples, define a Kotlin function `MainComposeView()` in `main.ios.kt`:

```kotlin
fun MainComposeView(): UIView = ComposeUIView {
    Text(
        "This Compose view wraps text to fit the available width",
        modifier = Modifier.fillMaxWidth().padding(16.dp)
    )
}
```

On iOS 16 and later, pass SwiftUI's sizing proposal to the Compose view's `sizeThatFits()` method. Use `UIView.noIntrinsicMetric` for dimensions that SwiftUI leaves unspecified. This `UIViewRepresentable` example uses a fixed width and content-based height:

```swift
struct ComposeView: UIViewRepresentable {
    let makeComposeUIView: () -> UIView

    func makeUIView(context: Context) -> UIView {
        makeComposeUIView()
    }

    func updateUIView(_ uiView: UIView, context: Context) {}

    @available(iOS 16.0, *)
    func sizeThatFits(
        _ proposal: ProposedViewSize,
        uiView: UIView,
        context: Context
    ) -> CGSize? {
        uiView.sizeThatFits(
            CGSize(
                // noIntrinsicMetric marks a dimension as unspecified by SwiftUI
                width: proposal.width ?? UIView.noIntrinsicMetric,
                height: proposal.height ?? UIView.noIntrinsicMetric
            )
        )
    }
}

struct ContentView: View {
    var body: some View {
        // Uses the bridge name generated for your Kotlin file
        // for example, main.ios.kt -> Main_iosKt
        ComposeView(makeComposeUIView: { Main_iosKt.MainComposeView() })
            .frame(width: 240)
    }
}
```

To size content hosted in a view controller, update `MainViewController()` in `main.ios.kt` to use content that wraps its height:

```kotlin
fun MainViewController(): UIViewController = ComposeUIViewController {
    Text(
        "This Compose view wraps text to fit the available width",
        modifier = Modifier.fillMaxWidth().padding(16.dp)
    )
}
```

Then add `sizeThatFits(_:uiViewController:context:)` to the `ComposeViewController` wrapper and forward SwiftUI's sizing proposal to the controller's Compose view:

```swift
struct ComposeViewController: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIViewController {
        // Uses the bridge name generated for your Kotlin file
        // for example, main.ios.kt -> Main_iosKt
        Main_iosKt.MainViewController()
    }

    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {}

    @available(iOS 16.0, *)
    func sizeThatFits(
        _ proposal: ProposedViewSize,
        uiViewController: UIViewController,
        context: Context
    ) -> CGSize? {
        uiViewController.view.sizeThatFits(
            CGSize(
                // noIntrinsicMetric marks a dimension as unspecified by SwiftUI
                width: proposal.width ?? UIView.noIntrinsicMetric,
                height: proposal.height ?? UIView.noIntrinsicMetric
            )
        )
    }
}

struct ContentView: View {
    var body: some View {
        ComposeViewController()
            .frame(width: 240)
    }
}
```

If your SwiftUI app has to run on an iOS version earlier than 16, report the intrinsic content size of `MainComposeView()` in `main.ios.kt`:

```kotlin
fun MainComposeView(): UIView = ComposeUIView(
    configure = {
        preferredSizeReportingStrategy = PreferredSizeReportingStrategy.IntrinsicContentSize
    }
) {
    Text(
        "This Compose view wraps text to fit the available width",
        modifier = Modifier.fillMaxWidth().padding(16.dp)
    )
}
```

Then pass the width to `sizeThatFits()` in `updateUIView()` and use the same width for the SwiftUI frame. SwiftUI reads the resulting size through `intrinsicContentSize`:

```swift
struct IntrinsicComposeView: UIViewRepresentable {
    let makeComposeUIView: () -> UIView
    let width: CGFloat

    func makeUIView(context: Context) -> UIView {
        makeComposeUIView()
    }

    func updateUIView(_ uiView: UIView, context: Context) {
        _ = uiView.sizeThatFits(
            // noIntrinsicMetric marks a dimension as unspecified by SwiftUI
            CGSize(width: width, height: UIView.noIntrinsicMetric)
        )
    }
}

struct ContentView: View {
    private let width: CGFloat = 240

    var body: some View {
        // Uses the bridge name generated for your Kotlin file
        // for example, main.ios.kt -> Main_iosKt
        IntrinsicComposeView(
            makeComposeUIView: { Main_iosKt.MainComposeView() },
            width: width
        )
        .frame(width: width)
    }
}
```

For a fixed height, swap width and height in the sizing proposal and SwiftUI frame.

## Notes

- `ComposeUIViewController()` is a Compose Multiplatform library function that accepts a composable function as the `content` argument.
- Compose Multiplatform rendering requires high refresh rates to be explicitly enabled: add the `CADisableMinimumFrameDurationOnPhone` key to your app's `Info.plist` file. Without it, the app will crash at runtime.
- `Main_iosKt.MainViewController` is a generated name; see the Kotlin "Interoperability with Swift/Objective-C" page for how top-level Kotlin functions are exposed to Swift.
- You can use the Compose view in any SwiftUI view hierarchy and control its size from within SwiftUI code.
- To test the camera example on a real device, add the `NSCameraUsageDescription` key to the app's `Info.plist` file. Without it, the app will crash at runtime.
- Distinct from the apple-swiftui skill, which covers SwiftUI APIs themselves; this page covers only the Compose Multiplatform side of the bridge (`ComposeUIViewController`, `UIKitViewController`). Common Compose UI APIs belong to the android-compose-ui skill.
- Content-based sizing (`sizeThatFits()`, `PreferredSizeReportingStrategy.IntrinsicContentSize`) is labelled EAP in the docs at this pin; the official page for Compose Multiplatform 1.13.0-beta02 describes it, not the stable 1.12.2 release. The code blocks above are verbatim from the source page.
- Source: https://github.com/JetBrains/kotlin-multiplatform-dev-docs/blob/54ca714a853f25f193b016207b89e09edfded5e6/topics/compose/ios/compose-swiftui-integration.md (pinned, fetched 2026-11-14)

## Related

- [uikit-integration](./uikit-integration.md)
- [liquid-glass](./liquid-glass.md)
