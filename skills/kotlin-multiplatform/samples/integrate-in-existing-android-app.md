---
source: https://kotlinlang.org/docs/multiplatform/multiplatform-integrate-in-existing-app.html
---

# Make your Android application work on iOS

Move business logic of an existing Android app into a Kotlin Multiplatform `shared` module and reuse it from a new iOS app via direct integration.

`shared/build.gradle.kts` (replace the `kotlin.android {}` block with `androidLibrary {}`):

```kotlin
import org.jetbrains.kotlin.gradle.dsl.JvmTarget

kotlin {
    androidLibrary {
        namespace = "com.jetbrains.simplelogin.shared"
        compileSdk = libs.versions.android.compileSdk.get().toInt()
        compilerOptions {
            jvmTarget = JvmTarget.JVM_11
        }
    
        androidResources {
            enable = true
        }
    
        withHostTestBuilder {
        }
    
        withDeviceTestBuilder {
            sourceSetTreeName = "test"
        }.configure {
            instrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        }
    }
    //...
}
```

Common code with `expect` / `actual` per source set:

```kotlin
// commonMain/Platform.kt
package com.jetbrains.simplelogin.shared

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform
```

```kotlin
// androidMain/Platform.android.kt
package com.jetbrains.simplelogin.shared

import android.os.Build

class AndroidPlatform : Platform {
    override val name: String = "Android ${Build.VERSION.SDK_INT}"
}

actual fun getPlatform(): Platform = AndroidPlatform()
```

```kotlin
// iosMain/Platform.ios.kt
package com.jetbrains.simplelogin.shared

import platform.UIKit.UIDevice

class IOSPlatform: Platform {
    override val name: String = UIDevice.currentDevice.systemName() + " " + UIDevice.currentDevice.systemVersion
}

actual fun getPlatform(): Platform = IOSPlatform()
```

```kotlin
package com.jetbrains.simplelogin.shared

class Greeting {
    private val platform = getPlatform()

    fun greet(): String {
        return "Hello, ${platform.name}!"
    }
}
```

Depend on the shared module from the Android app (`app/build.gradle.kts`):

```kotlin
dependencies {
    // ...
    implementation(project(":shared"))
}
```

Platform-specific UUID (`commonMain`, `androidMain`, `iosMain`):

```kotlin
package com.jetbrains.simplelogin.shared

expect fun randomUUID(): String
```

```kotlin
package com.jetbrains.simplelogin.shared

import java.util.*

actual fun randomUUID() = UUID.randomUUID().toString()
```

```kotlin
package com.jetbrains.simplelogin.shared

import platform.Foundation.NSUUID

actual fun randomUUID(): String = NSUUID().UUIDString()
```

Xcode **Run Script** build phase (placed before **Compile Sources**, with **Based on dependency analysis** disabled):

```bash
if [ "YES" = "$OVERRIDE_KOTLIN_BUILD_IDE_SUPPORTED" ]; then
    echo "Skipping Gradle build task invocation due to OVERRIDE_KOTLIN_BUILD_IDE_SUPPORTED environment variable set to \"YES\""
    exit 0
fi
cd "$SRCROOT/.."
./gradlew :shared:embedAndSignAppleFrameworkForXcode
```

Use the shared framework (`sharedKit`) from SwiftUI:

```swift
import sharedKit
```

```swift
struct ContentView: View {
    var body: some View {
        Text(Greeting().greet())
        .padding()
    }
}
```

`iosApp/simpleLoginIOS/ContentView.swift` using the shared business logic (from the tutorial's `android-ios-tutorial/ContentView.swift` snippet):

```swift
import SwiftUI
import Combine
import sharedKit

struct ContentView: View {
    @State private var username: String = ""
    @State private var password: String = ""

    @ObservedObject var viewModel: ContentView.ViewModel

    var body: some View {
        VStack(spacing: 15.0) {
            ValidatedTextField(titleKey: "Username", secured: false, text: $username, errorMessage: viewModel.formState.usernameError, onChange: {
                viewModel.loginDataChanged(username: username, password: password)
            })
            ValidatedTextField(titleKey: "Password", secured: true, text: $password, errorMessage: viewModel.formState.passwordError, onChange: {
                viewModel.loginDataChanged(username: username, password: password)
            })
            Button("Login") {
                viewModel.login(username: username, password: password)
            }.disabled(!viewModel.formState.isDataValid || (username.isEmpty && password.isEmpty))
        }
        .padding(.all)
    }
}

struct ValidatedTextField: View {
    let titleKey: String
    let secured: Bool
    @Binding var text: String
    let errorMessage: String?
    let onChange: () -> ()

    @ViewBuilder var textField: some View {
        if secured {
            SecureField(titleKey, text: $text)
        }  else {
            TextField(titleKey, text: $text)
        }
    }

    var body: some View {
        ZStack {
            textField
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .autocapitalization(.none)
                .onChange(of: text) { _ in
                    onChange()
                }
            if let errorMessage = errorMessage {
                HStack {
                    Spacer()
                    FieldTextErrorHint(error: errorMessage)
                }.padding(.horizontal, 5)
            }
        }
    }
}

struct FieldTextErrorHint: View {
    let error: String
    @State private var showingAlert = false

    var body: some View {
        Button(action: { self.showingAlert = true }) {
            Image(systemName: "exclamationmark.triangle.fill")
                .foregroundColor(.red)
        }
        .alert(isPresented: $showingAlert) {
            Alert(title: Text("Error"), message: Text(error), dismissButton: .default(Text("Got it!")))
        }
    }
}

extension ContentView {

    struct LoginFormState {
        let usernameError: String?
        let passwordError: String?
        var isDataValid: Bool {
            get { return usernameError == nil && passwordError == nil }
        }
    }

    class ViewModel: ObservableObject {
        @Published var formState = LoginFormState(usernameError: nil, passwordError: nil)

        let loginValidator: LoginDataValidator
        let loginRepository: LoginRepository

        init(loginRepository: LoginRepository, loginValidator: LoginDataValidator) {
            self.loginRepository = loginRepository
            self.loginValidator = loginValidator
        }

        func login(username: String, password: String) {
            if let result = loginRepository.login(username: username, password: password) as? ResultSuccess  {
                print("Successful login. Welcome, \(result.data.displayName)")
            } else {
                print("Error while logging in")
            }
        }

        func loginDataChanged(username: String, password: String) {
            formState = LoginFormState(
                usernameError: (loginValidator.checkUsername(username: username) as? LoginDataValidator.ResultError)?.message,
                passwordError: (loginValidator.checkPassword(password: password) as? LoginDataValidator.ResultError)?.message)
        }
    }
}
```

`simpleLoginIOSApp.swift`:

```swift
import SwiftUI
import sharedKit

@main
struct SimpleLoginIOSApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView(viewModel: .init(loginRepository: LoginRepository(dataSource: LoginDataSource()), loginValidator: LoginDataValidator()))
        }
    }
}
```

## Notes

- Sample project: `https://github.com/Kotlin/kmp-integration-sample` (`master` = Android-only start, `final` = finished). The business logic moves from `com.jetbrains.simplelogin.androidapp.data` to `com.jetbrains.simplelogin.shared` in `shared/src/commonMain`.
- Replace Android-only code before sharing: `Patterns.EMAIL_ADDRESS` becomes a Kotlin `Regex`, `IOException` becomes `RuntimeException`, `java.util.UUID` goes behind `expect` / `actual` `randomUUID()`.
- Xcode settings in the tutorial: disable **User Script Sandboxing**, add `CADisableMinimumFrameDurationOnPhone = YES` for high refresh rates, set a development team and unique **Bundle Identifier**. If the build fails after changing sandboxing, stop the Gradle daemon with `./gradlew --stop`.
- The `shared` framework base name is `sharedKit` (`binaries.framework.baseName`). Direct integration is one of several iOS integration methods (SwiftPM and CocoaPods are alternatives; see the ios-integration references).
