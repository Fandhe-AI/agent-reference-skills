---
source: https://www.electronjs.org/docs/latest/tutorial/local-ai-handler
---

# Local AI Handler guide

Handle built-in AI APIs with a local LLM implementation: route Chromium's experimental Prompt API (`LanguageModel`) calls from web content to a local model running in a utility process. Experimental, new in Electron 45.

## Signature / Usage

> **This API is experimental.** It may change or be removed in future Electron releases.

Electron supports Chromium's experimental [Prompt API](https://github.com/webmachinelearning/prompt-api)
(`LanguageModel`) web API by letting you route calls to a local LLM running in a
[utility process](https://www.electronjs.org/docs/latest/api/utility-process). Web content calls
`LanguageModel.create()` and `LanguageModel.prompt()` like it would in any
browser, while your Electron app decides which model handles the request.

### How it works

The local AI handler architecture involves three processes:

1. **Main process** — creates `UtilityProcess`, and then registers it to handle
   Prompt API calls for a given session via [`ses.registerLocalAIHandler()`](https://www.electronjs.org/docs/latest/api/session#sesregisterlocalaihandlerhandler-experimental).
2. **Utility process** — runs a script that calls
   [`localAIHandler.setPromptAPIHandler()`](https://www.electronjs.org/docs/latest/api/local-ai-handler#localaihandlersetpromptapihandlerpromptapihandler-experimental)
   to supply a `LanguageModelUtility` subclass.
3. **Renderer process** — web content uses the `LanguageModel` API from Chromium's experimental Prompt API
   (e.g. `LanguageModel.create()`, `model.prompt()`).

When a renderer calls the Prompt API, Electron proxies the request through the
main process to the registered utility process, which invokes your
`LanguageModel` implementation and sends the result back directly to the renderer.

### Prerequisites

The Prompt API Blink feature must be enabled on any `BrowserWindow` that will
use it with the `AIPromptAPI` feature. To enable multi-modal inputs, add the
`AIPromptAPIMultimodalInput` as well.

```js
const win = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'AIPromptAPI'
  }
})
```

### Quick start

#### 1. Create the utility process script

The utility process script registers your `LanguageModelUtility` subclass. The
handler function receives a `details` object with information about the
caller, and must return a class that extends `LanguageModelUtility`.

```js title='ai-handler.js (Utility Process)'
const { localAIHandler, LanguageModelUtility } = require('electron/utility')

localAIHandler.setPromptAPIHandler((details) => {
  // details.webContentsId — ID of the calling WebContents
  // details.securityOrigin — origin of the calling page

  return class MyLanguageModel extends LanguageModelUtility {
    static async create(options) {
      // options.signal - AbortSignal to cancel the creation of the model
      // options.initialPrompts - initial prompts to pass to the language model

      return new MyLanguageModel({
        contextUsage: 0,
        contextWindow: 4096
      })
    }

    static async availability() {
      // Return 'available', 'downloadable', 'downloading', or 'unavailable'
      return 'available'
    }

    async prompt(input) {
      // input is a LanguageModelMessage[]
      // Return a string response from your model, or a ReadableStream
      // to return a streaming response.
      return 'This is a response from your local LLM!'
    }

    async clone() {
      return new MyLanguageModel({
        contextUsage: this.contextUsage,
        contextWindow: this.contextWindow
      })
    }

    destroy() {
      // Clean up model resources
    }
  }
})
```

#### 2. Register the handler in the main process

Fork the utility process and register it as the AI handler for a session:

```js title='main.js (Main Process)'
const { app, BrowserWindow, utilityProcess } = require('electron')

const path = require('node:path')

app.whenReady().then(() => {
  // Fork the utility process running your AI handler script
  const aiHandler = utilityProcess.fork(path.join(__dirname, 'ai-handler.js'))

  // Create a window with the Prompt API enabled
  const win = new BrowserWindow({
    webPreferences: {
      enableBlinkFeatures: 'AIPromptAPI'
    }
  })

  // Connect the AI handler to this session
  win.webContents.session.registerLocalAIHandler(aiHandler)

  win.loadFile('index.html')
})
```

#### 3. Use the Prompt API in your renderer

Your web content can now use the standard `LanguageModel` API, which is a
global available in the renderer:

```html title='index.html (Renderer Process)'
<script>
async function askAI () {
  const model = await LanguageModel.create()
  const response = await model.prompt('What is Electron?')
  document.getElementById('response').textContent = response
}
</script>

<button onclick="askAI()">Ask AI</button>
<p id="response"></p>
```

### Implementing a real model

The quick-start example returns a hardcoded string. A real implementation
would integrate with a local model. See [`electron/llm`](https://github.com/electron/llm)
for an example of using `node-llama-cpp` to wire up GGUF (GPT-Generated Unified Format) models.

### Clearing the handler

To disconnect the AI handler from a session, pass `null`:

```js @ts-type={win:Electron.BrowserWindow}
win.webContents.session.registerLocalAIHandler(null)
```

After clearing, any `LanguageModel.create()` calls from renderers using that
session will fail.

### Late handler registration

If a renderer uses the Prompt API after `ses.registerLocalAIHandler()` has been
called, but before  `localAIHandler.setPromptAPIHandler()` has been called in
the utility process, the request is not immediately rejected. Instead, Electron
queues pending requests. Once `setPromptAPIHandler()` is called, all queued
requests are flushed and handled normally.

If too many requests arrive before the handler is set, the **oldest** pending
request is dropped and pending promises will reject in the renderer. Call
`setPromptAPIHandler()` as early as possible in your utility process script
to avoid hitting this.

### Security considerations

The `details` object passed to your handler includes `webContentsId` and
`securityOrigin`. Use these to decide whether to handle a request, and
when to reuse a model instance versus providing a fresh instance to
provide proper isolation between origins.

### Further reading

- [`localAIHandler` API reference](https://www.electronjs.org/docs/latest/api/local-ai-handler)
- [`LanguageModelUtility` API reference](https://www.electronjs.org/docs/latest/api/language-model-utility)
- [`ses.registerLocalAIHandler()`](https://www.electronjs.org/docs/latest/api/session#sesregisterlocalaihandlerhandler-experimental)
- [`utilityProcess.fork()`](https://www.electronjs.org/docs/latest/api/utility-process#utilityprocessforkmodulepath-args-options)
- [`electron/llm`](https://github.com/electron/llm)

## Notes

- Source: https://github.com/electron/electron/blob/v45.3.2/docs/tutorial/local-ai-handler.md (tag v45.3.2). Not present in v44.8.0. Relative links are converted to https://www.electronjs.org/docs/latest/ URLs.
- The official quick start requires `webPreferences.enableBlinkFeatures: 'AIPromptAPI'` on every `BrowserWindow` that uses the API; the guide also names `AIPromptAPIMultimodalInput` for multi-modal inputs.
- Security: the guide names `webContentsId` and `securityOrigin` from the handler `details` as the values to use when deciding whether to handle a request and when to reuse a model instance. The API reference ([localAIHandler](./local-ai-handler.md)) also lists `frameToken` and `renderProcessId`, which identify the calling frame and its renderer process.
- Distinction: this guide covers Chromium's on-device Prompt API wiring; cloud LLM APIs are covered by anthropic-api-core, openai-api-core and google-gemini-api, and on-device Apple models by apple-intelligence.

## Related

- [localAIHandler](./local-ai-handler.md)
- [LanguageModelUtility](./language-model-utility.md)
- [utilityProcess](./utility-process.md)
