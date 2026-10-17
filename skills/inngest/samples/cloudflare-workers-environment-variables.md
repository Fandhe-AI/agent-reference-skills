# Cloudflare Workers Environment Variables

Pass the Workers `env` bindings into Inngest function handlers with middleware.

```ts
import { Inngest, Middleware } from 'inngest';

class WorkersBindingsMiddleware extends Middleware.BaseMiddleware {
  id = "workers-bindings";
  private env!: Env;

  async wrapRequest({ next, requestArgs }: Middleware.WrapRequestArgs) {
    // requestArgs contains the raw arguments passed to the Workers fetch handler
    // For Workers, these are [request, env, ctx]
    this.env = requestArgs[1] as Env;
    return await next();
  }

  transformFunctionInput(args: Middleware.TransformFunctionInputArgs) {
    return {
      ...args,
      ctx: {
        ...args.ctx,
        // Return the env object to the function handler's input args
        env: this.env,
      },
    };
  }
}

// Include the middleware when creating the Inngest client
export const inngest = new Inngest({
  id: 'my-workers-app',
  middleware: [WorkersBindingsMiddleware],
});

const myFn = inngest.createFunction(
  { id: 'my-fn', triggers: { event: 'demo/event.sent' } },
  // The "env" argument returned in transformFunctionInput is passed through:
  async ({ event, step, env }) => {

    // The env object will be typed as well:
    console.log(env.MY_VAR);
  }
);
```

## Notes

- Workers bind environment variables to the `fetch` handler's `env` argument rather than `process.env`, so they must be forwarded explicitly
- `wrapRequest` captures `requestArgs` (`[request, env, ctx]` for Workers) and `transformFunctionInput` injects `env` into the handler input
- With Hono, `requestArgs` is `[honoContext]`; read the bindings from `honoCtx.env` instead of `requestArgs[1]`
- Source: https://www.inngest.com/docs-markdown/examples/middleware/cloudflare-workers-environment-variables (retrieved 2026-10-16)
