---
source: https://www.electronjs.org/docs/latest/tutorial/native-code-and-electron-swift-macos
---

# Native Addon: Swift (macOS)

Skeleton of a macOS-only Node-API addon whose logic is written in Swift and exposed through an Objective-C bridge: package, `binding.gyp` with Swift build actions, bridge header, and bridge implementation.

```txt
swift-native-addon/
├── binding.gyp            # Build configuration
├── include/
│   └── SwiftBridge.h      # Objective-C header for the bridge
├── js/
│   └── index.js           # JavaScript interface
├── package.json           # Package configuration
└── src/
    ├── SwiftCode.swift    # Swift implementation
    ├── SwiftBridge.m      # Objective-C bridge implementation
    └── swift_addon.mm     # Node.js addon implementation
```

```json
{
  "name": "swift-macos",
  "version": "1.0.0",
  "description": "A demo module that exposes Swift code to Electron",
  "main": "js/index.js",
  "scripts": {
    "clean": "rm -rf build",
    "build-electron": "electron-rebuild",
    "build": "node-gyp configure && node-gyp build"
  },
  "license": "MIT",
  "dependencies": {
    "bindings": "^1.5.0",
    "node-addon-api": "^8.3.0"
  },
  "devDependencies": {
    "node-gyp": "^11.1.0"
  }
}
```

```json
{
  "targets": [{
    "target_name": "swift_addon",
    "conditions": [
      ['OS=="mac"', {
        "sources": [
          "src/swift_addon.mm",
          "src/SwiftBridge.m",
          "src/SwiftCode.swift"
        ],
        "include_dirs": [
          "<!@(node -p \"require('node-addon-api').include\")",
          "include",
          "build_swift"
        ],
        "dependencies": [
          "<!(node -p \"require('node-addon-api').gyp\")"
        ],
        "libraries": [
          "<(PRODUCT_DIR)/libSwiftCode.a"
        ],
        "cflags!": [ "-fno-exceptions" ],
        "cflags_cc!": [ "-fno-exceptions" ],
        "xcode_settings": {
          "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
          "CLANG_ENABLE_OBJC_ARC": "YES",
          "SWIFT_OBJC_BRIDGING_HEADER": "include/SwiftBridge.h",
          "SWIFT_VERSION": "5.0",
          "SWIFT_OBJC_INTERFACE_HEADER_NAME": "swift_addon-Swift.h",
          "MACOSX_DEPLOYMENT_TARGET": "11.0",
          "OTHER_CFLAGS": [
            "-ObjC++",
            "-fobjc-arc"
          ],
          "OTHER_LDFLAGS": [
            "-Wl,-rpath,@loader_path",
            "-Wl,-install_name,@rpath/libSwiftCode.a"
          ],
          "HEADER_SEARCH_PATHS": [
            "$(SRCROOT)/include",
            "$(CONFIGURATION_BUILD_DIR)",
            "$(SRCROOT)/build/Release",
            "$(SRCROOT)/build_swift"
          ]
        },
        "actions": []
      }]
    ]
  }]
}
```

The `actions` array, replaced with the Swift compile and copy steps:

```json
{
  // ...other code
  "actions": [
    {
      "action_name": "build_swift",
      "inputs": [
        "src/SwiftCode.swift"
      ],
      "outputs": [
        "build_swift/libSwiftCode.a",
        "build_swift/swift_addon-Swift.h"
      ],
      "action": [
        "swiftc",
        "src/SwiftCode.swift",
        "-emit-objc-header-path", "./build_swift/swift_addon-Swift.h",
        "-emit-library", "-o", "./build_swift/libSwiftCode.a",
        "-emit-module", "-module-name", "swift_addon",
        "-module-link-name", "SwiftCode"
      ]
    },
    {
      "action_name": "copy_swift_lib",
      "inputs": [
        "<(module_root_dir)/build_swift/libSwiftCode.a"
      ],
      "outputs": [
        "<(PRODUCT_DIR)/libSwiftCode.a"
      ],
      "action": [
        "sh",
        "-c",
        "cp -f <(module_root_dir)/build_swift/libSwiftCode.a <(PRODUCT_DIR)/libSwiftCode.a && install_name_tool -id @rpath/libSwiftCode.a <(PRODUCT_DIR)/libSwiftCode.a"
      ]
    }
  ]
  // ...other code
}
```

```objc
// include/SwiftBridge.h
#ifndef SwiftBridge_h
#define SwiftBridge_h

#import <Foundation/Foundation.h>

@interface SwiftBridge : NSObject
+ (NSString*)helloWorld:(NSString*)input;
+ (void)helloGui;

+ (void)setTodoAddedCallback:(void(^)(NSString* todoJson))callback;
+ (void)setTodoUpdatedCallback:(void(^)(NSString* todoJson))callback;
+ (void)setTodoDeletedCallback:(void(^)(NSString* todoId))callback;
@end

#endif
```

```objc
// src/SwiftBridge.m
#import "SwiftBridge.h"
#import "swift_addon-Swift.h"
#import <Foundation/Foundation.h>

@implementation SwiftBridge

static void (^todoAddedCallback)(NSString*);
static void (^todoUpdatedCallback)(NSString*);
static void (^todoDeletedCallback)(NSString*);

+ (NSString*)helloWorld:(NSString*)input {
    return [SwiftCode helloWorld:input];
}

+ (void)helloGui {
    [SwiftCode helloGui];
}

+ (void)setTodoAddedCallback:(void(^)(NSString*))callback {
    todoAddedCallback = callback;
    [SwiftCode setTodoAddedCallback:callback];
}

+ (void)setTodoUpdatedCallback:(void(^)(NSString*))callback {
    todoUpdatedCallback = callback;
    [SwiftCode setTodoUpdatedCallback:callback];
}

+ (void)setTodoDeletedCallback:(void(^)(NSString*))callback {
    todoDeletedCallback = callback;
    [SwiftCode setTodoDeletedCallback:callback];
}

@end
```

```sh
npm run build
```

## Notes

- Excerpted for size: the official page also contains `src/SwiftCode.swift` (a SwiftUI todo UI), `src/swift_addon.mm` (the Node-API bridge), and `js/index.js` (an `EventEmitter` wrapper like the Objective-C sample, loading `bindings('swift_addon')`), omitted here. See the source URL for the full walkthrough.
- Swift does not integrate with node-gyp directly: Swift is compiled to a static library `libSwiftCode.a` by `swiftc` (the `build_swift` action), copied with `install_name_tool`, then linked into the addon.
- You cannot call the built addon from plain Node.js; test it from Electron.
- Call `destroy()` before the app quits (e.g. in `will-quit` / `before-quit`) or Electron hangs on quit.
- Distance: Swift / SwiftUI language and UI details are in apple-swift and apple-swiftui; this sample covers the Electron / Node-API wiring only.
