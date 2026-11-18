---
source: https://docs.cloud.google.com/secret-manager/parameter-manager/docs/parameter-templates-overview
---

# Parameter templates overview

Parameter templates (Preview) define standardized configuration blueprints and insert instance-specific values through variables from parameter versions, separating configuration structure from data.

## Signature / Usage

Variables use the `{{.variableName}}` format. Parameter template (structure; unquoted `{{...}}` placeholders make it a template, not parseable YAML, until rendered):

```text
appName: forex-trading-engine
environment: {{.env}}
logLevel: {{.log_level}}
currencyPairDefaultsInUSD:
    EURUSD: 10000000
    XAUUSD: 5000000
    BTCUSD: 2000000
marketData:
    provider: {{.market.dataProviderName}}
    apiEndpoint: {{.market.dataProviderEndpoint}}
execution:
    provider: {{.execution.providerName}}
    apiEndpoint: {{.execution.providerEndpoint}}
```

Parameter version (production values):

```yaml
env: prod
log_level: INFO

market:
    dataProviderName: ProdAltostratProvider
    dataProviderEndpoint: wss://prod-market-data.altostrat.com:443

execution:
    providerName: ProdCymbalgroupExecutor
    providerEndpoint: https://prod-execution.cymbalgroup.com/v1/orders
```

Rendered output:

```yaml
appName: forex-trading-engine
environment: prod
logLevel: INFO
currencyPairDefaultsInUSD:
    EURUSD: 10000000
    XAUUSD: 5000000
    BTCUSD: 2000000
marketData:
    provider: ProdAltostratProvider
    apiEndpoint: wss://prod-market-data.altostrat.com:443
execution:
    provider: ProdCymbalgroupExecutor
    apiEndpoint: https://prod-execution.cymbalgroup.com/v1/orders
```

## Options / Props

### Resources

| Resource | Description |
|---|---|
| Parameter template | Holds template metadata |
| Parameter template version | Structural data in YAML or JSON; variables as `{{.variableName}}` |
| Rendering | Parameter Manager securely substitutes template variables with values from the parameter version |

### Limitations

| Limit | Value |
|---|---|
| Substitution | Direct variable substitution only (`{{.cpuCount}}` is replaced by the variable's value) |
| Template version format | Must be a valid JSON or YAML object; unformatted text unsupported |
| Secret Manager secrets | Can't be referenced directly in a template; use `__REF__()` syntax in a parameter version, hydrated at render time |
| Rendered output size | Must not exceed 1 MB |
| Variables | Maximum 64 per template version |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms"; available "as is" and might have limited support.
- Benefits: consistency across environments, baseline security policy enforcement, reuse of common configurations, fewer manual edits.
- The template block is tagged `text` here because the source's `yaml` block does not parse as YAML before rendering (`{{.env}}` is read as a flow mapping); its content is unchanged.
- Keep secrets out of template versions; reference them from a parameter version with `__REF__()` as the source directs.
- Source: https://docs.cloud.google.com/secret-manager/parameter-manager/docs/parameter-templates-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [create-parameter.md](./create-parameter.md)
