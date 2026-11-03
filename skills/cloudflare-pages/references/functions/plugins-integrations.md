---
source: https://developers.cloudflare.com/pages/functions/plugins/honeycomb/, https://developers.cloudflare.com/pages/functions/plugins/sentry/, https://developers.cloudflare.com/pages/functions/plugins/google-chat/, https://developers.cloudflare.com/pages/functions/plugins/graphql/, https://developers.cloudflare.com/pages/functions/plugins/static-forms/, https://developers.cloudflare.com/pages/functions/plugins/vercel-og/
---

# Integration plugins: Honeycomb, Sentry, Google Chat, GraphQL, Static Forms, vercel/og

Official Pages Plugins: `@cloudflare/pages-plugin-honeycomb`, `-sentry`, `-google-chat`, `-graphql`, `-static-forms`, `-vercel-og` (install with `npm i <package>`).

## Signature / Usage

Honeycomb (keys from environment variables set in project settings):

```typescript
import honeycombPlugin from "@cloudflare/pages-plugin-honeycomb";

export const onRequest: PagesFunction<{
	HONEYCOMB_API_KEY: string;
	HONEYCOMB_DATASET: string;
}> = (context) => {
	return honeycombPlugin({
		apiKey: context.env.HONEYCOMB_API_KEY,
		dataset: context.env.HONEYCOMB_DATASET,
	})(context);
};
```

Honeycomb additional context. Adapted (not in the official docs): declares the undefined `getEmailFromRequest` helper; you must supply its implementation.

```typescript
import type { PluginData } from "@cloudflare/pages-plugin-honeycomb";

declare function getEmailFromRequest(request: Request): Promise<string>;

export const onRequest: PagesFunction<unknown, any, PluginData> = async ({
	data,
	next,
	request,
}) => {
	// Authenticate the user from the request and extract user's email address
	const email = await getEmailFromRequest(request);

	data.honeycomb.tracer.addData({ email });

	return next();
};
```

Sentry (install at `functions/_middleware.ts` as the first plugin) with a DSN from env:

```typescript
import sentryPlugin from "@cloudflare/pages-plugin-sentry";

export const onRequest: PagesFunction<{
	SENTRY_DSN: string;
}> = (context) => {
	return sentryPlugin({ dsn: context.env.SENTRY_DSN })(context);
};
```

Sentry additional context. Adapted (not in the official docs): destructures `request` and declares the helper.

```typescript
import type { PluginData } from "@cloudflare/pages-plugin-sentry";

declare function getEmailFromRequest(request: Request): Promise<string>;

export const onRequest: PagesFunction<unknown, any, PluginData> = async ({
	data,
	next,
	request,
}) => {
	// Authenticate the user from the request and extract user's email address
	const email = await getEmailFromRequest(request);

	data.sentry.setUser({ email });

	return next();
};
```

Google Chat bot (the plugin exposes one route, the bot's App URL):

```typescript
import googleChatPlugin from "@cloudflare/pages-plugin-google-chat";

export const onRequest: PagesFunction = googleChatPlugin(async (message) => {
	if (message.text.includes("ping")) {
		return { text: "pong" };
	}

	return { text: "Sorry, I could not understand your message." };
});
```

Adapted (not in the official docs): the `GoogleChatAPI` handler is `async` (the official code used `await` in a non-async function); see Notes.

```typescript
import { GoogleChatAPI } from "@cloudflare/pages-plugin-google-chat/api";

export const onRequest: PagesFunction = async () => {
	// Initialize a GoogleChatAPI with your service account's credentials
	const googleChat = new GoogleChatAPI({
		credentials: {
			client_email: "SERVICE_ACCOUNT_EMAIL_ADDRESS",
			private_key: "SERVICE_ACCOUNT_PRIVATE_KEY",
		},
	});

	// Post a message
	// https://developers.google.com/chat/api/reference/rest/v1/spaces.messages/create
	const message = await googleChat.createMessage(
		{ parent: "spaces/AAAAAAAAAAA" },
		undefined,
		{
			text: "I'm an alert!",
		},
	);

	return new Response("Alert sent.");
};
```

GraphQL (mounted in `functions/graphql.ts`, served at `/graphql`):

```typescript
import graphQLPlugin from "@cloudflare/pages-plugin-graphql";
import {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "RootQueryType",
		fields: {
			hello: {
				type: GraphQLString,
				resolve() {
					return "Hello, world!";
				},
			},
		},
	}),
});

export const onRequest: PagesFunction = graphQLPlugin({
	schema,
	graphql,
});
```

Static Forms:

```typescript
import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";

export const onRequest: PagesFunction = staticFormsPlugin({
	respondWith: ({ formData, name }) => {
		const email = formData.get("email");
		return new Response(
			`Hello, ${email}! Thank you for submitting the ${name} form.`,
		);
	},
});
```

```html
<body>
	<h1>Sales enquiry</h1>
	<form data-static-form-name="sales">
		<label>Email address <input type="email" name="email" /></label>
		<label>Message <textarea name="message"></textarea></label>
		<button type="submit">Submit</button>
	</form>
</body>
```

vercel/og (the file must be `.tsx` because it uses JSX):

```typescript
import React from "react";
import vercelOGPagesPlugin from "@cloudflare/pages-plugin-vercel-og";

interface Props {
	ogTitle: string;
}

export const onRequest = vercelOGPagesPlugin<Props>({
	imagePathSuffix: "/social-image.png",
	component: ({ ogTitle, pathname }) => {
		return <div style={{ display: "flex" }}>{ogTitle}</div>;
	},
	extractors: {
		on: {
			'meta[property="og:title"]': (props) => ({
				element(element) {
					props.ogTitle = element.getAttribute("content");
				},
			}),
		},
	},
	autoInject: {
		openGraph: true,
	},
});
```

Generate an arbitrary image at `/greet`:

```typescript
import React from "react";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";

export const onRequest: PagesFunction = async () => {
  return new ImageResponse(
    <div style={{ display: "flex" }}>Hello, world!</div>,
    {
      width: 1200,
      height: 630,
    }
  );
};
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Honeycomb `apiKey`, `dataset` | string | — | Same options as `@cloudflare/workers-honeycomb-logger`. |
| `data.honeycomb.tracer.log` | function(String) | — | Attach a log string to a trace. |
| `data.honeycomb.tracer.addData` | function(object) | — | Attach arbitrary data to a trace. |
| Sentry `dsn` | string | — | Sentry DSN. Other options are Toucan's; `context`, `request`, `event` are populated automatically. |
| `data.sentry` | Toucan instance | — | Use e.g. `setUser` in Functions below the plugin. |
| Google Chat handler | function | — | Takes an incoming message, returns a Promise of a response message (or void for no response). |
| `GoogleChatAPI` methods | functions | — | `downloadMedia`, `getSpace`, `listSpaces`, `getMember`, `listMembers`, `createMessage`, `deleteMessage`, `getMessage`, `updateMessage`, `getAttachment`; each takes up to three arguments (path params, query params, request body). |
| GraphQL `schema`, `graphql` | object, function | — | Server answers `application/json` and `application/graphql` POSTs; GET returns the GraphQL Playground. |
| Static Forms `respondWith` | function | — | Takes `{ formData, name }`, returns a Response or Promise of a Response. |
| vercel/og `imagePathSuffix` | string | — | Path suffix where the image is served (mounted at `functions/blog/_middleware.ts` with `/social-image.png`, `/blog/hello-world/social-image.png`). |
| vercel/og `component` | React component | — | Renders the image; receives `pathname` plus extracted props. |
| vercel/og `extractors` | object | — | Optional `on` and `onDocument` HTMLRewriter element/document handler factories that mutate props. |
| vercel/og `options` | object | — | Optional; passed to `@vercel/og`. |
| vercel/og `onError` | function | returns 404 | Called when `extractors` are given but the page is not valid HTML. |
| vercel/og `autoInject` | object | — | Optional `openGraph: true` sets `og:image`, `og:image:height`, `og:image:width` meta tags. |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages).
- Sentry now provides official support for Cloudflare Workers and Pages; see https://docs.sentry.io/platforms/javascript/guides/cloudflare/. The Sentry plugin captures exceptions that occur below it in the execution chain.
- Honeycomb: in the dataset settings enable **Automatically unpack nested JSON** and set **Maximum unpacking depth** to 5. The official page also shows a hard-coded API key variant, which it calls not advisable; it is omitted here.
- Corrected from the official docs: the Sentry "additional context" snippet used `request` without destructuring it; the Google Chat API example awaited inside a non-async function. Both helper-based snippets reference `getEmailFromRequest`, which is a placeholder you must implement.
- Google Chat: store the service account credentials in KV rather than plain text as the placeholders suggest (official recommendation).
- The Static Forms plugin overrides `method` and `action` on forms with `data-static-form-name`.
- Official Sentry also shows reading the DSN from KV via `context.env.KV.get("SENTRY_DSN")`.

## Related

- [plugins.md](./plugins.md)
- [plugins-security.md](./plugins-security.md)
- [bindings-env-secrets.md](./bindings-env-secrets.md)
