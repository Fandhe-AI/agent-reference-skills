---
source: https://fastify.dev/docs/latest/Guides/Serverless/
---

# Serverless Lambda

Wrap a Fastify app factory with `@fastify/aws-lambda` so the same app runs locally and as an AWS Lambda handler.

```js
// app.js
const fastify = require('fastify');

function init() {
  const app = fastify();
  app.get('/', (request, reply) => reply.send({ hello: 'world' }));
  return app;
}

if (require.main === module) {
  init().listen({ port: 3000 }, (err) => {
    if (err) console.error(err);
    console.log('server listening on 3000');
  });
} else {
  module.exports = init;
}
```

```js
// lambda.js
const awsLambdaFastify = require('@fastify/aws-lambda')
const init = require('./app');

const proxy = awsLambdaFastify(init())

exports.handler = proxy;
```

## Notes

- `require.main === module` lets `app.js` double as both a standalone server (`node app.js`) and a module exporting the app factory for `lambda.js`.
- `@fastify/aws-lambda` adapts the API Gateway/ALB event format to a Fastify `inject()`-style request under the hood.
- Cold-start optimizations (disabling unused plugins, `logger: false`) are recommended for production Lambda deployments.
