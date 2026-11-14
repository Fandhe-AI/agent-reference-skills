# Security

Upstash Redis security features: TLS encryption, ACL, IP allowlisting, encryption at rest, and private connectivity options.

## Notes

### TLS
- TLS is **always enabled** on all Upstash Redis databases; it cannot be disabled
- All client connections (REST API and redis-cli) use TLS by default

### Authentication Tokens
- Two token types per database: **standard** (full read/write) and **read-only**
- Tokens are shown in the Upstash Console under the database Details tab
- Store tokens in environment variables or a secrets manager — never hardcode them
- A secure password is generated at database creation (stored encrypted by Upstash); if it leaks, reset it in the console (this also revokes the REST tokens; see the REST API page for what a reset does to ACL users)

### Redis ACL
- Restricts specific users to a subset of commands and key patterns
- Available on all paid plans
- Works with the REST API through dedicated ACL tokens
- ACL users must be **manually redefined** when migrating from a regional to a global database

### Application Level Encryption
- Client-side encryption protects data in use but operations that must read the data (increments, comparisons, searches) will not work; the docs mention client features such as the Java Lettuce cipher codec and say SDK-level encryption is planned
- Source: https://upstash.com/docs/redis/features/security (fetched 2026-11-14; no version pin on the site)

### Credential Protection
- Prod Pack feature: database credentials are not stored in Upstash infrastructure and are shown only once when enabled (save them immediately); the console CLI, Data Browser, Monitor and ACL are disabled
- Toggle **Protect Credentials** in Settings -> Configuration. Disabling it permanently revokes the current credentials and generates new ones, which can break applications using them. **Reset Credentials** stays available and generates new protected credentials
- Source: https://upstash.com/docs/redis/features/credential-protection (fetched 2026-11-14; no version pin on the site)

### IP Allowlisting
- Limits database access to specified IP addresses
- Practical limitation: serverless functions use dynamic IPs, making allowlisting difficult in those environments

### Encryption at Rest
- Available via the **Prod Pack** add-on
- Encrypts data stored in block storage (EBS)

### Private Connectivity
- **VPC Peering** and **AWS PrivateLink**: Pro-tier features that bypass public internet for database access

## Related

- [Connection & Authentication](./connection-auth.md)
- [Global Replication](./global-replication.md)
