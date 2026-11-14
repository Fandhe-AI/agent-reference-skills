---
source: https://www.electronjs.org/docs/latest/api/local-ai-handler
---

# localAIHandler

Proxy built-in AI APIs to a local LLM implementation. Module; Experimental, new in Electron 45. Process: Utility.

## Signature / Usage

Snippet taken from https://www.electronjs.org/docs/latest/tutorial/local-ai-handler (utility process script, verbatim).

```js
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

## Options / Props

Process: [Utility](https://www.electronjs.org/docs/latest/glossary#utility-process)

This module is intended to be used by a script registered to a session via
[`ses.registerLocalAIHandler(handler)`](https://www.electronjs.org/docs/latest/api/session#sesregisterlocalaihandlerhandler-experimental)

### Methods

The `localAIHandler` module has the following methods:

#### `localAIHandler.setPromptAPIHandler(promptAPIHandler)` _Experimental_

* `promptAPIHandler` Function\<typeof [LanguageModelUtility](https://www.electronjs.org/docs/latest/api/language-model-utility) | null\>
  * `details` Object
    * `webContentsId` Integer - The [unique id](https://www.electronjs.org/docs/latest/api/web-contents#contentsid-readonly) of
      the [WebContents](https://www.electronjs.org/docs/latest/api/web-contents) calling the Prompt API.
    * `securityOrigin` string - Origin of the page calling the Prompt API.
    * `frameToken` string - The [frame token](https://www.electronjs.org/docs/latest/api/web-frame-main#frameframetoken-readonly)
      of the frame calling the Prompt API.
    * `renderProcessId` Integer - The [process id](https://www.electronjs.org/docs/latest/api/web-frame-main#frameprocessid-readonly)
      of the renderer process hosting the frame calling the Prompt API.

Sets the handler for new Prompt API binding requests from the renderer process. This happens
once per pair of `webContentsId` and `securityOrigin`. Returning `null` from the handler
will reject the creation of a new Prompt API session in the renderer. If you want to
invalidate existing Prompt API sessions, clear the local AI handler for the session using
`ses.registerLocalAIHandler(null)`.

> [!NOTE] If a renderer calls the Prompt API before `setPromptAPIHandler()` has been called,
> the request is queued. Once the handler is set, all queued requests are flushed. If too
> many requests are queued, the oldest pending request is dropped and pending promises in
> the renderer will be rejected. To avoid this, be sure to call `setPromptAPIHandler()` as
> early as possible.

## Notes

* Source: https://github.com/electron/electron/blob/v45.3.2/docs/api/local-ai-handler.md (tag v45.3.2). Not present in v44.8.0.
* The `promptAPIHandler` parameter type is copied verbatim from the official page (`Function\<typeof LanguageModelUtility | null\>`); the guide shows the handler returning a class that extends `LanguageModelUtility`.
* The session-side registration (`ses.registerLocalAIHandler(handler)`) is documented in [session methods](../session-network/session-methods-extensions-properties.md).
* Distinction: proxies Chromium's Prompt API to a local model in a utility process; for cloud LLM APIs use anthropic-api-core / openai-api-core / google-gemini-api.

## Related

* [LanguageModelUtility](./language-model-utility.md)
* [Local AI Handler guide](./local-ai-handler-guide.md)
* [utilityProcess](./utility-process.md)
