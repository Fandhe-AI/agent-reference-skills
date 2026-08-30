---
source: https://tediousjs.github.io/node-mssql/#azure-active-directory-authentication-connection-string
---

# Azure Active Directory Authentication Connection String

Several types of Azure Authentication are supported via connection string.

## Signature / Usage

### Authentication using Active Directory Integrated

```
Server=*.database.windows.net;Database=database;Authentication=Active Directory Integrated;Client secret=clientsecret;Client Id=clientid;Tenant Id=tenantid;Encrypt=true
```

If you want to utilize Authentication tokens (`azure-active-directory-access-token`), remove the unnecessary additional parameters and supply only a token parameter:

```
Server=*.database.windows.net;Database=database;Authentication=Active Directory Integrated;token=token;Encrypt=true
```

If you want to utilize managed identity services such as managed identity service app service:

```
Server=*.database.windows.net;Database=database;Authentication=Active Directory Integrated;msi endpoint=msiendpoint;Client Id=clientid;msi secret=msisecret;Encrypt=true
```

Or if it's managed identity service virtual machines:

```
Server=*.database.windows.net;Database=database;Authentication=Active Directory Integrated;msi endpoint=msiendpoint;Client Id=clientid;Encrypt=true
```

### Authentication using Active Directory Password

We can also utilize Active Directory Password, but unlike the previous examples, it is not part of the Active Directory Integrated Authentication.

```
Server=*.database.windows.net;Database=database;Authentication=Active Directory Password;User Id=username;Password=password;Client Id=clientid;Tenant Id=tenantid;Encrypt=true
```

## Notes

- Internally, the `'Active Directory Integrated'` type will change its type depending on the other parameters you add to it. In the first example above, it will change to `azure-active-directory-service-principal-secret` because a Client Id, Client secret and Tenant Id were supplied.
- For more reference, consult https://tediousjs.github.io/tedious/api-connection.html#function_newConnection, under the `authentication.type` parameter.

## Related

- [connection-string-formats](./connection-string-formats.md)
- [general-options](./general-options.md)
