---
source: https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database/
---

# Connect to a private database using Tunnel

Connect Hyperdrive to a private database via Cloudflare Tunnel (public hostname, TCP) secured by a Cloudflare Access application with a Service Auth token.

## Signature / Usage

```sh
# wrangler v3.65 and above required
npx wrangler hyperdrive create <NAME-OF-HYPERDRIVE-CONFIGURATION-FOR-DB-VIA-TUNNEL> --host=<HOSTNAME-FOR-THE-TUNNEL> --user=<USERNAME-FOR-YOUR-DATABASE> --password=<PASSWORD-FOR-YOUR-DATABASE> --database=<DATABASE-TO-CONNECT-TO> --access-client-id=<YOUR-ACCESS-CLIENT-ID> --access-client-secret=<YOUR-SERVICE-TOKEN-CLIENT-SECRET>
```

```terraform
resource "cloudflare_hyperdrive_config"  "<TERRAFORM_VARIABLE_NAME_FOR_CONFIGURATION>" {
  account_id = "<YOUR_ACCOUNT_ID>"
  name       = "<NAME_OF_HYPERDRIVE_CONFIGURATION>"
  origin     = {
    host     = "<HOSTNAME_OF_TUNNEL>"
    database = "<NAME_OF_DATABASE>"
    user     = "<NAME_OF_DATABASE_USER>"
    password = "<DATABASE_PASSWORD>"
    scheme   = "postgres"
    access_client_id     = "<ACCESS_CLIENT_ID>"
    access_client_secret = "<ACCESS_CLIENT_SECRET>"
  }
  caching = {
    disabled = false
  }
}
```

## Notes

- The Workers VPC approach is recommended; it needs no Access applications or service tokens.
- Setup: (1) create a tunnel in the private network (dashboard Networking > Tunnels), run `cloudflared` there, and add a published application route (public hostname) with Service Type `TCP` pointing to the database (for example `localhost:5432`); (2) create the Hyperdrive configuration. In the dashboard (Storage & Databases > Hyperdrive > Create configuration > Private database) the Access service token and application can be created automatically. Manually: create a non-expiring Service Token (Client Secret is shown once), then a self-hosted Access application on the tunnel hostname with a Service Auth policy including that token, no identity providers, session duration "No duration, expires immediately".
- When creating the configuration, provide `access-client-id` and `access-client-secret` and omit the port; Hyperdrive sends database messages to the tunnel's public hostname.
- Database must use TLS (SSL); Hyperdrive requires it.
- If Super Bot Fight Mode is used, keep **Definitely Automated** set to **Allow**, otherwise tunnels may fail with `websocket: bad handshake`.
- Minimum driver versions: `pg` > 8.16.3, `mysql2` > 3.13.0 (with `disableEval: true`). Test with the `pg` `Client` example from [get-started](./get-started.md).
- Cloudflare Tunnel and Access in general: see Cloudflare One documentation (outside this skill).

## Related

- [Connect to a private database using Workers VPC](./connect-private-database-vpc.md)
- [Firewall and networking configuration](./firewall-and-networking.md)
- [Troubleshoot and debug](./troubleshooting.md)
