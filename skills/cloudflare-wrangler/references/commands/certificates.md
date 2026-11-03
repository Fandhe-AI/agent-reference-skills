---
source: https://developers.cloudflare.com/workers/wrangler/commands/certificates/
---

# Certificates

Use these commands to manage certificates for mTLS connections. The `mtls-certificate` commands manage client certificates for Worker subrequests. The `cert` commands manage both mTLS client certificates and Certificate Authority (CA) chain certificates, primarily for use with Hyperdrive configurations.

## Signature / Usage

### `mtls-certificate`

Manage client certificates used for mTLS connections in subrequests. These certificates can be used in `mtls_certificate` bindings, which allow a Worker to present the certificate when establishing a connection with an origin that requires client authentication (mTLS).

```sh
npx wrangler mtls-certificate upload
npx wrangler mtls-certificate list
npx wrangler mtls-certificate delete
```

Example of `upload`:

```sh
npx wrangler mtls-certificate upload --cert cert.pem --key key.pem --name my-origin-cert
```

```sh
Uploading mTLS Certificate my-origin-cert...
Success! Uploaded mTLS Certificate my-origin-cert
ID: 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d
Issuer: CN=my-secured-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US
Expires: 1/01/2025
```

You can then add this certificate as a binding in your Wrangler configuration file:

```jsonc
{
	"mtls_certificates": [
		{
			"binding": "MY_CERT",
			"certificate_id": "99f5fef1-6cc1-46b8-bd79-44a0d5082b8d",
		},
	],
}
```

```toml
[[mtls_certificates]]
binding = "MY_CERT"
certificate_id = "99f5fef1-6cc1-46b8-bd79-44a0d5082b8d"
```

Note that the certificate and private keys must be in separate (typically `.pem`) files when uploading.

Example of `list`:

```sh
npx wrangler mtls-certificate list
```

```sh
ID: 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d
Name: my-origin-cert
Issuer: CN=my-secured-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US
Created on: 1/01/2023
Expires: 1/01/2025

ID: c5d004d1-8312-402c-b8ed-6194328d5cbe
Issuer: CN=another-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US
Created on: 1/01/2023
Expires: 1/01/2025
```

Example of `delete`:

```sh
npx wrangler mtls-certificate delete --id 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d
```

```sh
Are you sure you want to delete certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d (my-origin-cert)? [y/n]
yes
Deleting certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d...
Deleted certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d successfully
```

### `cert`

Manage mTLS client certificates and Certificate Authority (CA) chain certificates used for secured connections. These certificates can be used in Hyperdrive configurations, enabling them to present the certificate when connecting to an origin database that requires client authentication (mTLS) or a custom Certificate Authority (CA).

```sh
npx wrangler cert upload mtls-certificate
npx wrangler cert upload certificate-authority
npx wrangler cert list
npx wrangler cert delete
```

Example of `cert upload mtls-certificate`:

Adapted (not in the official docs): the `mtls-certificate` subcommand was added to the command; see Notes.

```sh
npx wrangler cert upload mtls-certificate --cert cert.pem --key key.pem --name my-origin-cert
```

```sh
Uploading mTLS Certificate my-origin-cert...
Success! Uploaded mTLS Certificate my-origin-cert
ID: 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d
Issuer: CN=my-secured-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US
Expires: 1/01/2025
```

Example of `cert upload certificate-authority`:

```sh
npx wrangler cert upload certificate-authority --ca-cert server-ca-chain.pem --name SERVER_CA_CHAIN
```

```sh
Uploading CA Certificate SERVER_CA_CHAIN...
Success! Uploaded CA Certificate SERVER_CA_CHAIN
ID: 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d
Issuer: CN=my-secured-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US
Expires: 1/01/2025
```

Example of `cert list` (lists mTLS or CA certificates):

```sh
npx wrangler cert list
```

```sh
ID: 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d
Name: my-origin-cert
Issuer: CN=my-secured-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US
Created on: 1/01/2023
Expires: 1/01/2025

ID: c5d004d1-8312-402c-b8ed-6194328d5cbe
Issuer: CN=another-origin.com,OU=my-team,O=my-org,L=San Francisco,ST=California,C=US
Created on: 1/01/2023
Expires: 1/01/2025
```

Example of `cert delete`:

```sh
npx wrangler cert delete --id 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d
```

```sh
Are you sure you want to delete certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d (my-origin-cert)? [y/n]
yes
Deleting certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d...
Deleted certificate 99f5fef1-6cc1-46b8-bd79-44a0d5082b8d successfully
```

## Options / Props

### `mtls-certificate upload` / `cert upload mtls-certificate`

Upload an mTLS certificate

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--cert` | string | yes | The path to a certificate file (.pem) containing a chain of certificates to upload |
| `--key` | string | yes | The path to a file containing the private key for your leaf certificate |
| `--name` | string | no | The name for the certificate |

### `cert upload certificate-authority`

Upload a CA certificate chain

| Flag | Type | Required | Description |
| --- | --- | --- | --- |
| `--name` | string | no | The name for the certificate |
| `--ca-cert` | string | yes | The path to a certificate file (.pem) containing a chain of CA certificates to upload |

### `mtls-certificate list` / `cert list`

List uploaded mTLS certificates. No command-specific flags.

### `mtls-certificate delete` / `cert delete`

Delete an mTLS certificate

| Flag | Type | Description |
| --- | --- | --- |
| `--id` | string | The id of the mTLS certificate to delete |
| `--name` | string | The name of the mTLS certificate record to delete |

## Notes

- Each command also accepts the global flags; see the global flags page.
- `mtls_certificate` binding runtime usage (`env.MY_CERT.fetch`) belongs to the cloudflare-workers skill; the `mtls_certificates` configuration key belongs to the configuration references.
- Source inconsistency: the official `cert list` example heading says "upload an mTLS or CA certificate" although the command lists certificates; the `mtls-certificate list` example likewise says "upload". Both examples show listing output.
- Corrected from the official docs: the official `cert upload mtls-certificate` example runs `npx wrangler cert upload --cert cert.pem --key key.pem --name my-origin-cert` without the `mtls-certificate` subcommand, although the same page defines the command as `cert upload mtls-certificate`; the subcommand was added to the example.

## Related

- [Hyperdrive](./hyperdrive.md)
- [Global flags](./global-flags.md)
