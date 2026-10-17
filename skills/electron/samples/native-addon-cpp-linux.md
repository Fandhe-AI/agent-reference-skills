---
source: https://www.electronjs.org/docs/latest/tutorial/native-code-and-electron-cpp-linux
---

# Native Addon: C++ (Linux, GTK3)

Skeleton of a Linux-only Node-API addon written in C++ with GTK3: package, `binding.gyp` with `pkg-config`, C++ header, JavaScript wrapper, and usage.

```txt
cpp-linux/
├── binding.gyp          # Configuration file for node-gyp to build the native addon
├── include/
│   └── cpp_code.h       # Header file with declarations for our C++ native code
├── js/
│   └── index.js         # JavaScript interface that loads and exposes our native addon
├── package.json         # Node.js package configuration and dependencies
└── src/
    ├── cpp_addon.cc     # C++ code that bridges Node.js/Electron with our native code
    └── cpp_code.cc      # Implementation of our native C++ functionality using GTK3
```

```json
{
  "name": "cpp-linux",
  "version": "1.0.0",
  "description": "A demo module that exposes C++ code to Electron",
  "main": "js/index.js",
  "scripts": {
    "clean": "rm -rf build",
    "build-electron": "electron-rebuild",
    "build": "node-gyp configure && node-gyp build"
  },
  "license": "MIT",
  "dependencies": {
    "node-addon-api": "^8.3.0",
    "bindings": "^1.5.0"
  }
}
```

```json
{
  "targets": [
    {
      "target_name": "cpp_addon",
      "conditions": [
        ['OS=="linux"', {
          "sources": [
            "src/cpp_addon.cc",
            "src/cpp_code.cc"
          ],
          "include_dirs": [
            "<!@(node -p \"require('node-addon-api').include\")",
            "include",
            "<!@(pkg-config --cflags-only-I gtk+-3.0 | sed s/-I//g)"
          ],
          "libraries": [
            "<!@(pkg-config --libs gtk+-3.0)",
            "-luuid"
          ],
          "cflags": [
            "-fexceptions",
            "<!@(pkg-config --cflags gtk+-3.0)",
            "-pthread"
          ],
          "cflags_cc": [
            "-fexceptions",
            "<!@(pkg-config --cflags gtk+-3.0)",
            "-pthread"
          ],
          "ldflags": [
            "-pthread"
          ],
          "cflags!": ["-fno-exceptions"],
          "cflags_cc!": ["-fno-exceptions"],
          "defines": ["NODE_ADDON_API_CPP_EXCEPTIONS"],
          "dependencies": [
            "<!(node -p \"require('node-addon-api').gyp\")"
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
void setTodoUpdatedCallback(TodoCallback callback);
void setTodoDeletedCallback(TodoCallback callback);

} // namespace cpp_code
```

```js
// js/index.js
const EventEmitter = require('events');

class CppLinuxAddon extends EventEmitter {
  constructor() {
    super()

    if (process.platform !== 'linux') {
      throw new Error('This module is only available on Linux');
    }

    const native = require('bindings')('cpp_addon')
    this.addon = new native.CppLinuxAddon()

    // Set up event forwarding
    this.addon.on('todoAdded', (payload) => {
      this.emit('todoAdded', this.parse(payload))
    });

    this.addon.on('todoUpdated', (payload) => {
      this.emit('todoUpdated', this.parse(payload))
    })

    this.addon.on('todoDeleted', (payload) => {
      this.emit('todoDeleted', this.parse(payload))
    })
  }

  helloWorld(input = "") {
    return this.addon.helloWorld(input)
  }

  helloGui() {
    return this.addon.helloGui()
  }

  destroy() {
    this.addon.destroy()
  }

  // Parse JSON and convert date to JavaScript Date object
  parse(payload) {
    const parsed = JSON.parse(payload)

    return { ...parsed, date: new Date(parsed.date) }
  }
}

if (process.platform === 'linux') {
  module.exports = new CppLinuxAddon()
} else {
  // Return empty object on non-Linux platforms
  module.exports = {}
}
```

```sh
npm run build
```

```js
// In your Electron main process or renderer process
import cppLinux from 'cpp-linux'

// Test the basic functionality
console.log(cppLinux.helloWorld('Hi!'))
// Output: "Hello from C++! You said: Hi!"

// Set up event listeners for GTK GUI interactions
cppLinux.on('todoAdded', (todo) => {
  console.log('New todo added:', todo)
  // todo: { id: "uuid-string", text: "Todo text", date: Date object }
})

// Launch the native GTK GUI
cppLinux.helloGui()
```

## Notes

- Excerpted for size: the official page also contains `src/cpp_code.cc` (the GTK3 GUI implementation) and `src/cpp_addon.cc` (the Node-API bridge), both long and omitted here. The usage example is shortened to its first listener and `helloGui()`; see the source URL for the full walkthrough.
- The page's Requirements section lists the GTK3 build prerequisites; check it before building.
- Call `destroy()` before the app quits (e.g. in `will-quit` / `before-quit`) or Electron hangs on quit.
- `<!@(...)` in `binding.gyp` is a command expansion operator; here it runs `pkg-config` to find GTK3 includes and libraries.
- Distance: this is a Node-API / Electron integration sample; Linux desktop toolkits are not covered by another skill.
