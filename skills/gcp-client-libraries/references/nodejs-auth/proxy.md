---
source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md#using-a-proxy
---

# Using a proxy

google-auth-library proxies HTTPS requests when the `HTTPS_PROXY` or `https_proxy` environment variable is set. The variable is used for SSL requests that have no explicit proxy configuration option.

## Signature / Usage

The README gives no code for the proxy. To set per-client request defaults (such as an `agent`) or supply your own transport, `AuthClientOptions` accepts `transporter` and `transporterOptions`:

```ts
    /**
     * The {@link Gaxios `Gaxios`} instance used for making requests.
     *
     * @see {@link AuthClientOptions.useAuthRequestParameters}
     */
    transporter?: Gaxios;
    /**
     * Provides default options to the transporter, such as {@link GaxiosOptions.agent `agent`} or
     *  {@link GaxiosOptions.retryConfig `retryConfig`}.
     *
     * This option is ignored if {@link AuthClientOptions.transporter `gaxios`} has been provided
     */
    transporterOptions?: GaxiosOptions;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `HTTPS_PROXY` / `https_proxy` | env var | Proxy for HTTPS requests without an explicit proxy option. |
| `transporter` | `Gaxios` | The `Gaxios` instance used for making requests. |
| `transporterOptions` | `GaxiosOptions` | Default options for the transporter, such as `agent` or `retryConfig`. Ignored if `transporter` is provided. |

## Notes

- Applies to google-auth-library 11.3.4 (npm), `node>=22`.
- Snippet taken from https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/src/auth/authclient.ts (the `AuthClientOptions` declaration, shown here as in `authclient.d.ts`; it is a type fragment, not runnable code).
- The README's proxy statement is only two sentences and lives under the JWT section; it applies to the library's HTTPS requests in general. Proxy options for HTTP requests made through the underlying `gaxios` client are covered in the `nodejs` category of this skill.
- Proxy URLs can embed credentials; do not log them.
- Source: https://github.com/googleapis/google-cloud-node/blob/google-auth-library-v11.3.4/core/packages/google-auth-library-nodejs/README.md (retrieved 2026-11-16; pinned at tag google-auth-library-v11.3.4, Apache 2.0)

## Related

- [adc-googleauth.md](./adc-googleauth.md)
- [jwt-service-account.md](./jwt-service-account.md)
