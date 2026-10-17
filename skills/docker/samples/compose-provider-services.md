---
source: https://docs.docker.com/compose/how-tos/provider-services/
---

# Use provider services

Declare a service whose lifecycle is managed by a provider plugin or binary and inject its connection details into dependents.

```yaml
services:
  database:
    provider:
      type: awesomecloud
      options:
        type: mysql
        foo: bar  
  app:
    image: myapp 
    depends_on:
       - database
```

The `type` resolves to a Docker CLI plugin or a binary:

```yaml
services:
  ai-runner:
    provider:
      type: model  # Looks for docker-model plugin or model binary
      options:
        model: ai/example-model
```

## Notes

- `type` names a Docker CLI plugin (`docker-<type>`), a binary on `PATH`, or a path to a binary or script. `awesomecloud` above is the docs' placeholder provider.
- The provider returns access details to Compose, which passes them to dependents as environment variables named `<PROVIDER_SERVICE_NAME>_<VARIABLE_NAME>` (for example `DATABASE_URL`).
- For AI models the page points to the `models` top-level element instead.
