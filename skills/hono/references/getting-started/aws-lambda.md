# AWS Lambda

Deploy Hono to AWS Lambda (Node.js 18+). Use the `hono/aws-lambda` adapter and CDK for infrastructure.

## Signature / Usage

```ts
// lambda/index.ts
import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'

const app = new Hono()
app.get('/', (c) => c.text('Hello Hono!'))

export const handler = handle(app)
```

**Streaming responses:**

```ts
import { streamHandle } from 'hono/aws-lambda'
export const handler = streamHandle(app)
```

## Notes

- `handle(app)` wraps the Hono app as a Lambda handler (request/response mode)
- `streamHandle(app)` enables response streaming; requires `invokeMode: lambda.InvokeMode.RESPONSE_STREAM` in CDK
- For binary responses, set the `Content-Type` header; Hono base64-encodes the body automatically
- Access `LambdaEvent` and `LambdaContext` via typed `c.env` bindings
- Recommended runtime: `NODEJS_22_X`; minimum supported: Node.js 18

## Related

- [Basic](./basic.md)
- [Lambda@Edge](./lambda-edge.md)
