---
source: https://tediousjs.github.io/node-mssql/#toreadablestream
---

# toReadableStream

Convert request to a Node.js ReadableStream.

## Signature / Usage

```javascript
const { pipeline } = require('stream')
const request = new sql.Request()
const readableStream = request.toReadableStream()
pipeline(readableStream, transformStream, writableStream)
request.query('select * from mytable')
```

OR if you wanted to increase the highWaterMark of the read stream to buffer more rows in memory:

```javascript
const { pipeline } = require('stream')
const request = new sql.Request()
const readableStream = request.toReadableStream({ highWaterMark: 100 })
pipeline(readableStream, transformStream, writableStream)
request.query('select * from mytable')
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| highWaterMark | number | Buffer size (in rows) for the read stream. Optional. |

## Related

- [pipe](./pipe.md)
- [Request](./request.md)
