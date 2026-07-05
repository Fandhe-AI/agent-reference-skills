# response

| Name | Description | Path |
| --- | --- | --- |
| String | Send a plain text response | [string.md](./string.md) |
| HTML | Send an HTML response (`HTML`, `HTMLBlob`) | [html.md](./html.md) |
| JSON | Send a JSON response (`JSON`, `JSONPretty`, `JSONBlob`) | [json.md](./json.md) |
| JSONP | Send a JSONP response wrapped in a callback | [jsonp.md](./jsonp.md) |
| XML | Send an XML response (`XML`, `XMLPretty`, `XMLBlob`) | [xml.md](./xml.md) |
| Blob | Send arbitrary data with a content type | [blob.md](./blob.md) |
| Stream | Send a data stream from an `io.Reader` | [stream.md](./stream.md) |
| File | Send the contents of a file as the response | [file.md](./file.md) |
| Attachment | Send a file as a downloadable attachment | [attachment.md](./attachment.md) |
| Inline | Send a file rendered inline in the browser | [inline.md](./inline.md) |
| NoContent | Send an empty body with a status code | [no-content.md](./no-content.md) |
| Redirect | Redirect the request to another URL | [redirect.md](./redirect.md) |
| Response Hooks | `Before`/`After` callbacks around response writing | [response-hooks.md](./response-hooks.md) |
| Static Files | Serve static assets and single files via `Echo#Static`/`StaticFS`/`File` | [static-files.md](./static-files.md) |
| Templates | Render templates via the `Renderer` interface and `Context#Render` | [templates.md](./templates.md) |
