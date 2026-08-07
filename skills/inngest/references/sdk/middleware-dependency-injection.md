# Dependency Injection Middleware

Shares common client instances (e.g. an OpenAI client, a database client) across all Inngest functions via middleware, so functions receive them as part of their execution context instead of re-instantiating per run.

## Signature / Usage

```ts
import { dependencyInjectionMiddleware } from "inngest";
import OpenAI from "openai";

const openai = new OpenAI();

const inngest = new Inngest({
  id: "my-app",
  middleware: [dependencyInjectionMiddleware({ openai })],
});

inngest.createFunction(
  { id: "user-create", triggers: [{ event: "app/user.create" }] },
  async ({ openai }) => {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-3.5-turbo",
    });
  }
);
```

### Custom middleware (equivalent, manual form)

```ts
import { Middleware } from "inngest";
import OpenAI from "openai";

const openai = new OpenAI();

class OpenAIMiddleware extends Middleware.BaseMiddleware {
  id = "openai";

  transformFunctionInput(args: Middleware.TransformFunctionInputArgs) {
    return { ...args, ctx: { ...args.ctx, openai } };
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| dependencies object | `Record<string, unknown>` | Key/value pairs injected into every function's context (e.g. `{ openai }`). |

## Notes

- `dependencyInjectionMiddleware()` is a built-in helper equivalent to hand-writing a `transformFunctionInput` hook (see [Middleware](./middleware.md)).
- Injected dependency types are inferred from the middleware output — functions see a correctly typed property without manual type declarations.
- When multiple middleware inject the same property name, the **last-registered middleware wins** for both the runtime value and the inferred type.

## Related

- [Middleware](./middleware.md)
- [Inngest Client](./inngest-client.md)
