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

### Redis ACL
- Restricts specific users to a subset of commands and key patterns
- Available on all paid plans
- Works with the REST API through dedicated ACL tokens
- ACL users must be **manually redefined** when migrating from a regional to a global database

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
