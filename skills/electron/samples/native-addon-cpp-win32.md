---
source: https://www.electronjs.org/docs/latest/tutorial/native-code-and-electron-cpp-win32
---

# Native Addon: C++ (Win32)

Skeleton of a Windows-only Node-API addon written in C++ with the Win32 API: package, build configuration, C++ header, and JavaScript wrapper.

```txt
my-native-win32-addon/
├── binding.gyp
├── include/
│   └── cpp_code.h
├── js/
│   └── index.js
├── package.json
└── src/
    ├── cpp_addon.cc
    └── cpp_code.cc
```

```json
{
  "name": "cpp-win32",
  "version": "1.0.0",
  "description": "A demo module that exposes C++ code to Electron",
  "main": "js/index.js",
  "author": "Your Name",
  "scripts": {
    "clean": "node -e \"const fs=require('node:fs');for (const d of ['build_swift','build']) fs.rmSync(d,{recursive:true,force:true})\"",
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
      "target_name": "cpp_addon",
      "conditions": [
        ['OS=="win"', {
          "sources": [
            "src/cpp_addon.cc",
            "src/cpp_code.cc"
          ],
          "include_dirs": [
            "<!@(node -p \"require('node-addon-api').include\")",
            "include"
          ],
          "libraries": [
            "comctl32.lib",
            "shcore.lib"
          ],
          "dependencies": [
            "<!(node -p \"require('node-addon-api').gyp\")"
          ],
          "msvs_settings": {
            "VCCLCompilerTool": {
              "ExceptionHandling": 1,
              "DebugInformationFormat": "OldStyle",
              "AdditionalOptions": [
                "/FS"
              ]
            },
            "VCLinkerTool": {
              "GenerateDebugInformation": "true"
            }
          },
          "defines": [
            "NODE_ADDON_API_CPP_EXCEPTIONS",
            "WINVER=0x0A00",
            "_WIN32_WINNT=0x0A00"
          ]
        }]
      ]
    }
  ]
}
```

```cpp
// include/cpp_code.h
#pragma once
#include <string>
#include <functional>

namespace cpp_code {

std::string hello_world(const std::string& input);
void hello_gui();

// Callback function types
using TodoCallback = std::function<void(const std::string&)>;

// Callback setters
void setTodoAddedCallback(TodoCallback callback);

} // namespace cpp_code
```

```js
// js/index.js
const EventEmitter = require('events')

class CppWin32Addon extends EventEmitter {
  constructor() {
    super()

    if (process.platform !== 'win32') {
      throw new Error('This module is only available on Windows')
    }

    const native = require('bindings')('cpp_addon')
    this.addon = new native.CppWin32Addon();

    this.addon.on('todoAdded', (payload) => {
      this.emit('todoAdded', this.#parse(payload))
    });

    this.addon.on('todoUpdated', (payload) => {
      this.emit('todoUpdated', this.#parse(payload))
    });

    this.addon.on('todoDeleted', (payload) => {
      this.emit('todoDeleted', this.#parse(payload))
    });
  }

  helloWorld(input = "") {
    return this.addon.helloWorld(input)
  }

  helloGui() {
    this.addon.helloGui()
  }

  destroy() {
    this.addon.destroy()
  }

  #parse(payload) {
    const parsed = JSON.parse(payload)

    return { ...parsed, date: new Date(parsed.date) }
  }
}

if (process.platform === 'win32') {
  module.exports = new CppWin32Addon()
} else {
  module.exports = {}
}
```

```powershell
npm run build
```

## Notes

- Excerpted for size: the official page also contains `src/cpp_code.cc` (the Win32 GUI) and `src/cpp_addon.cc` (the Node-API bridge), both long and omitted here. Read the full walkthrough at the source URL.
- The official `clean` script uses `rm -rf` (a Unix command); it is replaced here with `fs.rmSync` so it also runs on Windows.
- You must call `destroy()` before the app quits (e.g. in `will-quit` / `before-quit`), otherwise persistent callback references keep the native destructor from running and Electron hangs on quit.
- `WINVER` / `_WIN32_WINNT` set to `0x0A00` target Windows 10; use the lowest Windows version you support.
- Distance: Win32 API details are in windows-interop-modernize and windows-platform-integration; this sample only shows how a native addon is wired into an Electron app.
