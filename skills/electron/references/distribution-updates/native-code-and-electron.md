---
source: https://www.electronjs.org/docs/latest/tutorial/native-code-and-electron
---

# Native Code and Electron

Electron combines web technologies with native code by building on "Native Node.js Addons": dynamically-linked shared objects (Unix-like) or DLL files (Windows) loaded with `require()` or `import`. This tutorial builds a basic C++ addon with `node-addon-api` and `node-gyp`.

## Signature / Usage

`package.json` with build scripts:

```json
{
  "name": "my-native-addon",
  "version": "1.0.0",
  "description": "A native addon for Electron",
  "main": "js/index.js",
  "scripts": {
    "clean": "node -e \"require('fs').rmSync('build', { recursive: true, force: true })\"",
    "build": "node-gyp configure && node-gyp build"
  },
  "dependencies": {
    "bindings": "^1.5.0",
    "node-addon-api": "^8.3.0"
  },
  "devDependencies": {
    "node-gyp": "^11.1.0"
  }
}
```

`binding.gyp`:

```json
{
  "targets": [
    {
      "target_name": "my_addon",
      "sources": [
        "src/my_addon.cc",
        "src/cpp_code.cc"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "include"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "defines": [
        "NODE_ADDON_API_CPP_EXCEPTIONS"
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "xcode_settings": {
        "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
        "CLANG_CXX_LIBRARY": "libc++",
        "MACOSX_DEPLOYMENT_TARGET": "10.14"
      },
      "msvs_settings": {
        "VCCLCompilerTool": {
          "ExceptionHandling": 1
        }
      }
    }
  ]
}
```

C++ addon code (`include/cpp_code.h`, `src/cpp_code.cc`, `src/my_addon.cc`):

```cpp
#pragma once
#include <string>

namespace cpp_code {
    // A simple function that takes a string input and returns a string
    std::string hello_world(const std::string& input);
} // namespace cpp_code
```

```cpp
#include <napi.h>
#include <string>
#include "../include/cpp_code.h"

// Create a class that will be exposed to JavaScript
class MyAddon : public Napi::ObjectWrap<MyAddon> {
public:
    // This static method defines the class for JavaScript
    static Napi::Object Init(Napi::Env env, Napi::Object exports) {
        // Define the JavaScript class with method(s)
        Napi::Function func = DefineClass(env, "MyAddon", {
            InstanceMethod("helloWorld", &MyAddon::HelloWorld)
        });

        // Create a persistent reference to the constructor
        Napi::FunctionReference* constructor = new Napi::FunctionReference();
        *constructor = Napi::Persistent(func);
        env.SetInstanceData(constructor);

        // Set the constructor on the exports object
        exports.Set("MyAddon", func);
        return exports;
    }

    // Constructor
    MyAddon(const Napi::CallbackInfo& info)
        : Napi::ObjectWrap<MyAddon>(info) {}

private:
    // Method that will be exposed to JavaScript
    Napi::Value HelloWorld(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();

        // Validate arguments (expecting one string)
        if (info.Length() < 1 || !info[0].IsString()) {
            Napi::TypeError::New(env, "Expected string argument").ThrowAsJavaScriptException();
            return env.Null();
        }

        // Convert JavaScript string to C++ string
        std::string input = info[0].As<Napi::String>();

        // Call our C++ function
        std::string result = cpp_code::hello_world(input);

        // Convert C++ string back to JavaScript string and return
        return Napi::String::New(env, result);
    }
};

// Initialize the addon
Napi::Object Init(Napi::Env env, Napi::Object exports) {
    return MyAddon::Init(env, exports);
}

// Register the initialization function
NODE_API_MODULE(my_addon, Init)
```

Using the addon in the main process:

```js
// In your main process
const myAddon = require('my-native-addon')

console.log(myAddon.helloWorld('Electron'))
```

## Requirements

- Node.js and npm, plus compile tools for the platform (Visual Studio on Windows, Xcode on macOS, GCC/Clang on Linux); see the `node-gyp` readme.
- macOS: Xcode Command Line Tools (`xcode-select --install`).
- Windows: the Node.js installer's optional "Tools for Native Modules" (Python 3 and the "Visual Studio Desktop development with C++" workload), or `chocolatey`, `winget`, or the Windows Store.
- Linux: a supported version of Python, `make`, and a C/C++ toolchain such as GCC.

## Steps

1. Create a package: `mkdir my-native-addon && cd my-native-addon && npm init -y`, then `npm install node-addon-api bindings` (`node-addon-api` is a C++ wrapper for the Node.js API; `bindings` finds the compiled `.node` file).
2. Configure `node-gyp` with `binding.gyp`; create `src/`, `include/`, and `js/` directories.
3. Write the C++ code and a JS wrapper (`js/index.js`) that loads it with `bindings('my_addon')`.
4. Build with `npm run build` (`node-gyp configure` and `node-gyp build`) and test with `node test.js`; expected output is `Hello from C++! You said: This is a test`.

## Notes

- To use the addon in Electron, include it as a dependency and build it targeting your specific Electron version. `electron-forge` handles this step automatically; see [using-native-node-modules.md](./using-native-node-modules.md).
- Platform-specific walkthroughs (`native-code-and-electron-cpp-win32`, `-cpp-linux`, `-objc-macos`, `-swift-macos`) exist in the official docs and are not part of this reference page.
- Other languages: Rust with `napi-rs`, `neon`, or `node-bindgen`; Objective-C/Swift via Objective-C++ on macOS. Use the N-API documentation on the Node.js side and the platform's own documentation on the native side.

## Related

- [Native Node Modules](./using-native-node-modules.md)
- [ASAR Archives](./asar-archives.md)
