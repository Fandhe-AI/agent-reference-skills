---
source: https://www.electronjs.org/docs/latest/tutorial/native-code-and-electron-objc-macos
---

# Native Addon: Objective-C (macOS)

Skeleton of a macOS-only Node-API addon written in Objective-C++: package, `binding.gyp` with AppKit, C++ interface header, and JavaScript wrapper.

```txt
my-native-objc-addon/
├── binding.gyp
├── include/
│   └── objc_code.h
├── js/
│   └── index.js
├── package.json
└── src/
    ├── objc_addon.mm
    └── objc_code.mm
```

```json
{
  "name": "objc-macos",
  "version": "1.0.0",
  "description": "A demo module that exposes Objective-C code to Electron",
  "main": "js/index.js",
  "author": "Your Name",
  "scripts": {
    "clean": "rm -rf build",
    "build-electron": "electron-rebuild",
    "build": "node-gyp configure && node-gyp build"
  },
  "license": "MIT",
  "dependencies": {
    "bindings": "^1.5.0",
    "node-addon-api": "^8.3.0"
  }
}
```

```json
{
  "targets": [
    {
      "target_name": "objc_addon",
      "conditions": [
        ['OS=="mac"', {
          "sources": [
            "src/objc_addon.mm",
            "src/objc_code.mm"
          ],
          "include_dirs": [
            "<!@(node -p \"require('node-addon-api').include\")",
            "include"
          ],
          "libraries": [
            "-framework Foundation",
            "-framework AppKit"
          ],
          "dependencies": [
            "<!(node -p \"require('node-addon-api').gyp\")"
          ],
          "xcode_settings": {
            "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
            "CLANG_CXX_LIBRARY": "libc++",
            "MACOSX_DEPLOYMENT_TARGET": "11.0",
            "CLANG_ENABLE_OBJC_ARC": "YES",
            "OTHER_CFLAGS": [
              "-ObjC++",
              "-std=c++17"
            ]
          },
          "defines": [
            "NODE_ADDON_API_CPP_EXCEPTIONS"
          ]
        }]
      ]
    }
  ]
}
```

```cpp
// include/objc_code.h
#pragma once
#include <string>
#include <functional>

namespace objc_code {

std::string hello_world(const std::string& input);
void hello_gui();

// Callback function types
using TodoCallback = std::function<void(const std::string&)>;

// Callback setters
void setTodoAddedCallback(TodoCallback callback);

} // namespace objc_code
```

```js
// js/index.js
const EventEmitter = require('node:events')

class ObjcMacosAddon extends EventEmitter {
  constructor() {
    super()

    if (process.platform !== 'darwin') {
      throw new Error('This module is only available on macOS')
    }

    const native = require('bindings')('objc_addon')
    this.addon = new native.ObjcMacosAddon()

    this.addon.on('todoAdded', (payload) => {
      this.emit('todoAdded', this.parse(payload))
    })
  }

  helloWorld(input = '') {
    return this.addon.helloWorld(input)
  }

  helloGui() {
    this.addon.helloGui()
  }

  destroy() {
    this.addon.destroy()
  }

  parse(payload) {
    const parsed = JSON.parse(payload)

    return { ...parsed, date: new Date(parsed.date) }
  }
}

if (process.platform === 'darwin') {
  module.exports = new ObjcMacosAddon()
} else {
  module.exports = {}
}
```

```sh
npm run build
```

## Notes

- Excerpted for size: the official page also contains `src/objc_code.mm` (the AppKit window and table view) and `src/objc_addon.mm` (the Node-API bridge), both long and omitted here. See the source URL for the full walkthrough.
- `.mm` sources are Objective-C++; `CLANG_ENABLE_OBJC_ARC: YES` enables ARC; set `MACOSX_DEPLOYMENT_TARGET` to the lowest macOS you support.
- You cannot call the built addon from plain Node.js, because Node.js does not set up an app in the eyes of macOS; test it by requiring it from Electron.
- Call `destroy()` before the app quits (e.g. in `will-quit` / `before-quit`) or Electron hangs on quit.
- Distance: AppKit itself is covered by apple-appkit; this sample is only the Electron / Node-API wiring.
