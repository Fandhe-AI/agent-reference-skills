---
source: https://v2.tauri.app/develop/debug/neovim/
---

# Debug in Neovim

Debug a Tauri application's Rust code in Neovim with `nvim-dap`, `nvim-dap-ui` and `overseer.nvim`.

## Signature / Usage

Prerequisite: `nvim-dap` requires the `codelldb` binary. Download the version for your system from https://github.com/vadimcn/codelldb/releases and unzip it.

Install `nvim-dap` and `nvim-dap-ui` (which requires the `nvim-nio` plugin), then configure:

`init.lua`

```lua
local dap = require("dap")

dap.adapters.codelldb = {
  type = 'server',
  port = "${port}",
  executable = {
    -- Change this to your path!
    command = '/opt/codelldb/adapter/codelldb',
    args = {"--port", "${port}"},
  }
}

dap.configurations.rust= {
  {
    name = "Launch file",
    type = "codelldb",
    request = "launch",
    program = function()
      return vim.fn.input('Path to executable: ', vim.fn.getcwd() .. '/target/debug/', 'file')
    end,
    cwd = '${workspaceFolder}',
    stopOnEntry = false
  },
}
```

This setup asks for the Tauri App binary to debug each time the debugger is launched.

Optionally toggle the debugger view with `nvim-dap-ui` when a session starts and stops:

```lua
local dapui = require("dapui")
dapui.setup()

dap.listeners.before.attach.dapui_config = function()
  dapui.open()
end
dap.listeners.before.launch.dapui_config = function()
  dapui.open()
end
dap.listeners.before.event_terminated.dapui_config = function()
  dapui.close()
end
dap.listeners.before.event_exited.dapui_config = function()
  dapui.close()
end
```

Change how breakpoints are displayed:

```lua
vim.fn.sign_define('DapBreakpoint',{ text ='🟥', texthl ='', linehl ='', numhl =''})
vim.fn.sign_define('DapStopped',{ text ='▶️', texthl ='', linehl ='', numhl =''})
```

### Starting the dev server

The Tauri CLI is not used to launch the app, so the development server does not start automatically. Control it from Neovim with `overseer.nvim`, using a VS Code style task configuration in `.vscode/tasks.json`. Example for a project using `trunk`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "process",
      "label": "dev server",
      "command": "trunk",
      "args": ["serve"],
      "isBackground": true,
      "presentation": {
        "revealProblems": "onProblem"
      },
      "problemMatcher": {
        "pattern": {
          "regexp": "^error:.*",
          "file": 1,
          "line": 2
        },
        "background": {
          "activeOnStart": false,
          "beginsPattern": ".*Rebuilding.*",
          "endsPattern": ".*server listening at:.*"
        }
      }
    }
  ]
}
```

### Example key bindings

```lua
local overseer = require("overseer")
overseer.setup()

vim.keymap.set('n', '<F5>', function() dap.continue() end)
vim.keymap.set('n', '<F6>', function() dap.disconnect({ terminateDebuggee = true }) end)
vim.keymap.set('n', '<F10>', function() dap.step_over() end)
vim.keymap.set('n', '<F11>', function() dap.step_into() end)
vim.keymap.set('n', '<F12>', function() dap.step_out() end)
vim.keymap.set('n', '<Leader>b', function() dap.toggle_breakpoint() end)
vim.keymap.set('n', '<Leader>o', function() overseer.toggle() end)
vim.keymap.set('n', '<Leader>R', function() overseer.run_template() end)
```

## Notes

- The official page omits `require("overseer")`; it is added here so the key bindings work.

## Related

- [Debug](./debug-overview.md)
- [Debug in VS Code](./debug-vscode.md)
