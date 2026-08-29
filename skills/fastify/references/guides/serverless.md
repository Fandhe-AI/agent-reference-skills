---
source: https://fastify.dev/docs/latest/Guides/Serverless/
---

# Serverless

Target: Fastify v5.12.1. Run serverless applications and REST APIs using an existing Fastify application. Platforms with long-running processes (Google Cloud Run, AWS Fargate, Azure Container Instances, Vercel) make full use of Fastify's features; short-lived FaaS platforms need an adapter.

## Signature / Usage

```js
// app.js — export a builder, listen only when run directly
const fastify = require('fastify')

function init() {
  const app = fastify()
  app.get('/', (request, reply) => reply.send({ hello: 'world' }))
  return app
}

if (require.main === module) {
  init().listen({ port: 3000 }, (err) => {
    if (err) console.error(err)
  })
} else {
  module.exports = init
}
```

```js
// lambda.js — AWS Lambda via @fastify/aws-lambda
const awsLambdaFastify = require('@fastify/aws-lambda')
const init = require('./app')

const proxy = awsLambdaFastify(init())
exports.handler = proxy
```

## Notes

- **AWS**: use [`@fastify/aws-lambda`](https://github.com/fastify/aws-lambda-fastify) (API Gateway only, optimized) or [`@h4ad/serverless-adapter`](https://github.com/H4ad/serverless-adapter) (slower, broader AWS service support). API Gateway does not support streams and has a 29s timeout
- **Google Cloud Functions**: requires a custom `addContentTypeParser('application/json', ...)` because the platform pre-parses the body; emit `request` on `fastify.server` after `fastify.ready()`
- **Google Firebase Functions**: wrap with `onRequest()` from `firebase-functions/v2/https`; same content-type-parser caveat as Cloud Functions — omitting it can stall the Fastify process
- **Google Cloud Run**: a container platform, so little/no code changes needed; must listen on `0.0.0.0` and `process.env.PORT`
- **Netlify Lambda**: reuses the AWS Lambda handler behind a Webpack build (`netlify-lambda`)
- **Vercel**: fully supports Fastify; [Fluid compute](https://vercel.com/docs/fluid-compute) combines server-like concurrency with autoscaling (opt-in)
- **Genezio**: has its own dedicated Fastify deployment guide

## Related

- [testing.md](./testing.md)
