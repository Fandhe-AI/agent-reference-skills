# Lambda@Edge

Deploy Hono to AWS Lambda@Edge (Node.js 18+). Functions run at CloudFront edge locations.

## Signature / Usage

```ts
// lambda/index_edge.ts
import { Hono } from 'hono'
import { handle } from 'hono/lambda-edge'

const app = new Hono()
app.get('/', (c) => c.text('Hello Hono on Lambda@Edge!'))

export const handler = handle(app)
```

**Callback pattern (post-auth request continuation):**

```ts
app.get('/', async (c, next) => {
  await next()
  c.env.callback(null, c.env.request)
})
```

## Notes

- Import `handle` from `hono/lambda-edge` (not `hono/aws-lambda`)
- Attach the Lambda function to a CloudFront distribution's `VIEWER_REQUEST` event
- Recommended CDK runtime: `NODEJS_20_X`
- Use CDK to manage CloudFront distributions, IAM roles, and API Gateway automatically
- The `callback` mechanism in `c.env` allows conditional request continuation after middleware

## Related

- [Basic](./basic.md)
- [AWS Lambda](./aws-lambda.md)
