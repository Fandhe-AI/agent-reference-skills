---
source: https://developers.cloudflare.com/workers/runtime-apis/bindings/mtls/
---

# mTLS

An mTLS certificate binding lets a Worker present a client certificate to services that enforce mutual TLS; unauthorized clients are rejected during the TLS handshake.

## Signature / Usage

Upload a certificate and private key:

```sh
npx wrangler mtls-certificate upload --cert cert.pem --key key.pem --name my-client-cert
```

Create the binding:

```jsonc
{
	"mtls_certificates": [
		{
			"binding": "MY_CERT",
			"certificate_id": "<CERTIFICATE_ID>"
		}
	]
}
```

The binding exposes `fetch()` with the same signature as the global `fetch`, but always presents the client certificate:

```js
export default {
	async fetch(request, environment) {
		return await environment.MY_CERT.fetch("https://a-secured-origin.com");
	},
};
```

```ts
interface Env {
  MY_CERT: Fetcher;
}

export default {
    async fetch(request, environment): Promise<Response> {
        return await environment.MY_CERT.fetch("https://a-secured-origin.com")
    }
} satisfies ExportedHandler<Env>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| binding | string | Name of the variable exposed on `env`. |
| certificate_id | string | ID shown after upload; also visible via `wrangler mtls-certificate list`. |

## Notes

- mTLS for Workers cannot be used for requests to a service that is a proxied zone on Cloudflare; Cloudflare returns a `520` error.
- `wrangler mtls-certificate upload` requires the SSL and Certificates Edit API token scope. The OAuth flow of `wrangler login` sets it automatically; for API tokens set the scope yourself.
- The binding presents an API similar to service bindings.
- The official page labels the TypeScript snippet as `js`; it is TypeScript.
- Wrangler command details belong to the cloudflare-wrangler skill.

## Related

- [bindings-overview.md](./bindings-overview.md)
- [service-bindings.md](./service-bindings.md)
