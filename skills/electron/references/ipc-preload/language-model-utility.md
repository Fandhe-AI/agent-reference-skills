---
source: https://www.electronjs.org/docs/latest/api/language-model-utility
---

# LanguageModelUtility

Implement local AI language models. Class; Experimental, new in Electron 45. Process: Utility.

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

> Implement local AI language models

Process: [Utility](https://www.electronjs.org/docs/latest/glossary#utility-process)

### `new LanguageModelUtility(initialState)`

* `initialState` Object
  * `contextUsage` number
  * `contextWindow` number

> [!NOTE]
> Do not use this constructor directly outside of the class itself, as it will not be properly connected to the `localAIHandler`

### Static Methods

The `LanguageModelUtility` class has the following static methods:

#### `LanguageModelUtility.create(options)` _Experimental_

* `options` [LanguageModelCreateOptions](https://www.electronjs.org/docs/latest/api/structures/language-model-create-options)

Returns `Promise<LanguageModelUtility>`. Creates a new `LanguageModelUtility` with the provided `options`.

#### `LanguageModelUtility.availability([options])` _Experimental_

* `options` [LanguageModelCreateCoreOptions](https://www.electronjs.org/docs/latest/api/structures/language-model-create-core-options) (optional)

Returns `Promise<string>`

Determines the availability of the language model and returns one of the following strings:

* `available`
* `downloadable`
* `downloading`
* `unavailable`

### Instance Properties

The following properties are available on instances of `LanguageModelUtility`:

#### `languageModelUtility.contextUsage` _Experimental_

A `number` representing how many tokens are currently in the context window.

#### `languageModelUtility.contextWindow` _Experimental_

A `number` representing the size of the context window, in tokens.

### Instance Methods

The following methods are available on instances of `LanguageModelUtility`:

#### `languageModelUtility.prompt(input, options)` _Experimental_

* `input` [LanguageModelMessage[]](https://www.electronjs.org/docs/latest/api/structures/language-model-message)
* `options` [LanguageModelPromptOptions](https://www.electronjs.org/docs/latest/api/structures/language-model-prompt-options)

Returns `Promise<string> | Promise<import('stream/web').ReadableStream<string>>`. Prompt the model for a response.

#### `languageModelUtility.append(input, options)` _Experimental_

* `input` [LanguageModelMessage[]](https://www.electronjs.org/docs/latest/api/structures/language-model-message)
* `options` [LanguageModelAppendOptions](https://www.electronjs.org/docs/latest/api/structures/language-model-append-options)

Returns `Promise<undefined>`. Append a message without prompting for a response.

#### `languageModelUtility.measureContextUsage(input, options)` _Experimental_

* `input` [LanguageModelMessage[]](https://www.electronjs.org/docs/latest/api/structures/language-model-message)
* `options` [LanguageModelPromptOptions](https://www.electronjs.org/docs/latest/api/structures/language-model-prompt-options)

Returns `Promise<number>`. Measure how many tokens the input would use.

#### `languageModelUtility.clone(options)` _Experimental_

* `options` [LanguageModelCloneOptions](https://www.electronjs.org/docs/latest/api/structures/language-model-clone-options)

Returns `Promise<LanguageModelUtility>`. Clones the `LanguageModelUtility` such that the
context and initial prompt should be preserved.

#### `languageModelUtility.destroy()` _Experimental_

Destroys the model, and any ongoing executions are aborted.

### Structures

The following structures are referenced by the methods above (each from `docs/api/structures/` at tag v45.3.2).

#### LanguageModelCreateOptions Object extends `LanguageModelCreateCoreOptions`

* `signal` [AbortSignal](https://nodejs.org/api/globals.html#globals_class_abortsignal)
* `initialPrompts` [LanguageModelMessage[]](https://www.electronjs.org/docs/latest/api/structures/language-model-message) (optional)

#### LanguageModelCreateCoreOptions Object

* `expectedInputs` [LanguageModelExpected[]](https://www.electronjs.org/docs/latest/api/structures/language-model-expected) (optional)
* `expectedOutputs` [LanguageModelExpected[]](https://www.electronjs.org/docs/latest/api/structures/language-model-expected) (optional)

#### LanguageModelMessage Object

* `role` string - Can be one of the following values:
  * `system`
  * `user`
  * `assistant`
* `content` [LanguageModelMessageContent[]](https://www.electronjs.org/docs/latest/api/structures/language-model-message-content)
* `prefix` boolean (optional)

#### LanguageModelMessageContent Object

* `type` string - Can be one of the following values:
  * `text`
  * `image`
  * `audio`
* `value` ArrayBuffer | string

#### LanguageModelExpected Object

* `type` string - Can be one of the following values:
  * `text`
  * `image`
  * `audio`
* `languages` string[] (optional)

#### LanguageModelPromptOptions Object

* `responseConstraint` Object | RegExp (optional) - a JSON schema object or a `RegExp` used to constrain the response to match the specified restraints.
* `signal` [AbortSignal](https://nodejs.org/api/globals.html#globals_class_abortsignal)

#### LanguageModelAppendOptions Object

* `signal` [AbortSignal](https://nodejs.org/api/globals.html#globals_class_abortsignal)

#### LanguageModelCloneOptions Object

* `signal` [AbortSignal](https://nodejs.org/api/globals.html#globals_class_abortsignal)

## Notes

* Source: https://github.com/electron/electron/blob/v45.3.2/docs/api/language-model-utility.md and `docs/api/structures/language-model-*.md` (tag v45.3.2). Neither the class nor the structures exist in v44.8.0.
* The official API page has no code example; the snippet under Signature / Usage is copied verbatim from the official guide.
* The class is only usable in a utility process (`require('electron/utility')`) that is registered with `ses.registerLocalAIHandler()`; it is not exported from `'electron'`. The handler module is [localAIHandler](./local-ai-handler.md).
* Distinction: this class backs Chromium's experimental Prompt API (`LanguageModel`) for web content; it is not an LLM client library. For provider APIs use anthropic-api-core, openai-api-core, google-gemini-api or vercel-ai-sdk; for on-device Apple models use apple-intelligence.

## Related

* [localAIHandler](./local-ai-handler.md)
* [Local AI Handler guide](./local-ai-handler-guide.md)
* [utilityProcess](./utility-process.md)
