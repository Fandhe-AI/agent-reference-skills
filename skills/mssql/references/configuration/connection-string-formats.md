---
source: https://tediousjs.github.io/node-mssql/#formats
---

# Formats

In addition to a configuration object, `mssql` supports passing config as a connection string.

## Signature / Usage

### Standard configuration using tedious driver

```
Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true
```

### Standard configuration using MSNodeSQLv8 driver

```
Driver=msnodesqlv8;Server=(local)\INSTANCE;Database=database;UID=DOMAIN\username;PWD=password;Encrypt=true
```

## Notes

- This section corresponds to the "Classic Connection String" format. For Azure Active Directory connection string formats, see azure-ad-connection-string.

## Related

- [general-options](./general-options.md)
- [azure-ad-connection-string](./azure-ad-connection-string.md)
