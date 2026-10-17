---
source: https://www.electronjs.org/docs/latest/api/structures/protocol-request
---

# Protocol structures

Object structures used by `protocol`, `webRequest` and window-open handlers: ProtocolRequest, ProtocolResponse, ProtocolResponseUploadData, ProtocolRoute, ProtocolSource, CustomScheme, UploadData, UploadFile, UploadRawData, PostBody, MimeTypedBuffer, FilePathWithHeaders.

## Signature / Usage

The structure pages contain no code examples. The example below is from the `protocol` module page (https://www.electronjs.org/docs/latest/api/protocol) and shows `CustomScheme` and `ProtocolSource` / `ProtocolRoute` in use:

```js
const { app, protocol } = require('electron')
const path = require('node:path')

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } }
])

app.whenReady().then(() => {
  protocol.registerSource('app', {
    routes: [
      {
        match: { host: 'bundle', path: '/assets/' },
        source: { type: 'directory', root: path.join(process.resourcesPath, 'assets') }
      },
      {
        match: { host: 'bundle' },
        source: {
          type: 'directory',
          root: path.join(app.getAppPath(), 'dist'),
          headers: { 'Cross-Origin-Opener-Policy': 'same-origin' }
        }
      }
    ]
  })
})
```

## Options / Props

### ProtocolRequest Object

| Name | Type | Description |
| --- | --- | --- |
| `url` | string | |
| `referrer` | string | |
| `initiatorOrigin` | string (optional) | The origin that issued the request (for example `https://example.com`, or `null` for an opaque origin). Absent for requests the browser started itself. Unlike `referrer`, this is not controlled by the requesting page. |
| `method` | string | |
| `uploadData` | [UploadData[]](#uploaddata-object) (optional) | |
| `headers` | Record\<string, string\> | |

### ProtocolResponse Object

| Name | Type | Description |
| --- | --- | --- |
| `error` | Integer (optional) | When assigned, the `request` will fail with the `error` number. For the available error numbers you can use, please see the [net error list](https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h). |
| `statusCode` | number (optional) | The HTTP response code, default is 200. |
| `charset` | string (optional) | The charset of response body, default is `"utf-8"`. |
| `mimeType` | string (optional) | The MIME type of response body, default is `"text/html"`. Setting `mimeType` would implicitly set the `content-type` header in response, but if `content-type` is already set in `headers`, the `mimeType` would be ignored. |
| `headers` | Record\<string, string \| string[]\> (optional) | An object containing the response headers. The keys must be string, and values must be either string or Array of string. |
| `data` | (Buffer \| string \| ReadableStream) (optional) | The response body. When returning stream as response, this is a Node.js readable stream representing the response body. When returning `Buffer` as response, this is a `Buffer`. When returning `string` as response, this is a `string`. This is ignored for other types of responses. |
| `path` | string (optional) | Path to the file which would be sent as response body. This is only used for file responses. |
| `url` | string (optional) | Download the `url` and pipe the result as response body. This is only used for URL responses. |
| `referrer` | string (optional) | The `referrer` URL. This is only used for file and URL responses. |
| `method` | string (optional) | The HTTP `method`. This is only used for file and URL responses. |
| `session` | Session (optional) | The session used for requesting URL. The HTTP request will reuse the current session by default. |
| `uploadData` | [ProtocolResponseUploadData](#protocolresponseuploaddata-object) (optional) | The data used as upload data. This is only used for URL responses when `method` is `"POST"`. |

### ProtocolResponseUploadData Object

| Name | Type | Description |
| --- | --- | --- |
| `contentType` | string | MIME type of the content. |
| `data` | string \| Buffer | Content to be sent. |

### ProtocolRoute Object

| Name | Type | Description |
| --- | --- | --- |
| `match` | Object (optional) | Which URLs on the scheme this route serves. A route without `match` serves every URL. |
| `match.host` | string (optional) | Host name to match, for standard schemes. It is compared with the URL's host as a whole, case-insensitively; there is no wildcard or subdomain matching. Omit to match any host. |
| `match.path` | string (optional) | Path prefix to match, starting with `/` and written as it appears in a URL (percent-encoded). Defaults to `/`. |
| `source` | Object | What the matched URLs are served from. |
| `source.type` | string | Must be `directory`. |
| `source.root` | string | Absolute path of the directory. The part of the URL's path after `match.path` is resolved inside it; paths that would leave it are not served. May point into an `asar` archive. |
| `source.index` | string (optional) | File served for a URL whose path ends in `/`. Defaults to `index.html`; an empty string disables it. |
| `source.headers` | Record\<string, string\> (optional) | Response headers added to every file served by this route. Headers computed by the file loader, including `Content-Type`, `Content-Length`, and `Content-Range`, will override these supplied values. |

### ProtocolSource Object

| Name | Type | Description |
| --- | --- | --- |
| `routes` | [ProtocolRoute[]](#protocolroute-object) | How URLs on the scheme map to directories on disk; see `protocol.registerSource`. |

### CustomScheme Object

| Name | Type | Description |
| --- | --- | --- |
| `scheme` | string | Custom schemes to be registered with options. |
| `privileges` | Object (optional) | |
| `privileges.standard` | boolean (optional) | Default false. |
| `privileges.secure` | boolean (optional) | Default false. |
| `privileges.bypassCSP` | boolean (optional) | Default false. |
| `privileges.allowServiceWorkers` | boolean (optional) | Default false. |
| `privileges.supportFetchAPI` | boolean (optional) | Default false. |
| `privileges.corsEnabled` | boolean (optional) | Default false. |
| `privileges.stream` | boolean (optional) | Default false. |
| `privileges.codeCache` | boolean (optional) | Enable V8 code cache for the scheme, only works when `standard` is also set to true. Default false. |
| `privileges.allowExtensions` | boolean (optional) | Allow Chrome extensions to be used on pages served over this protocol. Default false. |

### UploadData Object

| Name | Type | Description |
| --- | --- | --- |
| `bytes` | Buffer | Content being sent. |
| `file` | string (optional) | Path of file being uploaded. |
| `blobUUID` | string (optional) | UUID of blob data. Use `ses.getBlobData` method ([session-methods-misc.md](./session-methods-misc.md)) to retrieve the data. |

### UploadFile Object

| Name | Type | Description |
| --- | --- | --- |
| `type` | 'file' | `file`. |
| `filePath` | string | Path of file to be uploaded. |
| `offset` | Integer (optional) | Defaults to `0`. |
| `length` | Integer (optional) | Number of bytes to read from `offset`. Defaults to `0`. |
| `modificationTime` | Double (optional) | Last Modification time in number of seconds since the UNIX epoch. Defaults to `0`. |

### UploadRawData Object

| Name | Type | Description |
| --- | --- | --- |
| `type` | 'rawData' | `rawData`. |
| `bytes` | Buffer | Data to be uploaded. |

### PostBody Object

| Name | Type | Description |
| --- | --- | --- |
| `data` | ([UploadRawData](#uploadrawdata-object) \| [UploadFile](#uploadfile-object))[] | The post data to be sent to the new window. |
| `contentType` | string | The `content-type` header used for the data. One of `application/x-www-form-urlencoded` or `multipart/form-data`. Corresponds to the `enctype` attribute of the submitted HTML form. |
| `boundary` | string (optional) | The boundary used to separate multiple parts of the message. Only valid when `contentType` is `multipart/form-data`. |

### MimeTypedBuffer Object

| Name | Type | Description |
| --- | --- | --- |
| `mimeType` | string (optional) | MIME type of the buffer. |
| `charset` | string (optional) | Charset of the buffer. |
| `data` | Buffer | The actual Buffer content. |

### FilePathWithHeaders Object

| Name | Type | Description |
| --- | --- | --- |
| `path` | string | The path to the file to send. |
| `headers` | Record\<string, string\> (optional) | Additional headers to be sent. |

## Notes

* Source pages (https://www.electronjs.org/docs/latest/api/structures/<name>): protocol-request, protocol-response, protocol-response-upload-data, protocol-route, protocol-source, custom-scheme, upload-data, upload-file, upload-raw-data, post-body, mime-typed-buffer, file-path-with-headers.
* `ProtocolSource` and `ProtocolRoute` are used by the _Experimental_ `protocol.registerSource`.
* `ProtocolRequest` / `ProtocolResponse` are used by the deprecated `protocol.register*Protocol` / `protocol.intercept*Protocol` methods; `UploadData` is also exposed by `webRequest.onBeforeRequest` / `onBeforeSendHeaders`.
* Removed (Electron 37.0): the deprecated `null` value for the `session` property in `ProtocolResponse` ([breaking-changes-v37](../breaking-changes/breaking-changes-v37.md)).
* These shapes describe Electron's in-app custom-scheme and request interception; they are not server request/response types (for server-side HTTP see fastify / hono).

## Related

* [protocol-handle](./protocol-handle.md)
* [protocol-legacy-register-intercept](./protocol-legacy-register-intercept.md)
* [web-request](./web-request.md)
