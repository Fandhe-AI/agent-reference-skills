---
source: https://docs.cloud.google.com/service-extensions/docs/configure-traffic-extensions
---

# Configure a traffic extension

Traffic extensions on supported Application Load Balancers use plugins or callouts to modify headers and payloads without affecting backend service selection. A traffic extension points to a forwarding rule and to a plugin or a callout backend service that runs the `ext_proc` gRPC API.

## Signature / Usage

### Traffic extension with a plugin (YAML)

The example adds the response header `hello: service-extensions` when the host is `example.com`. Replace `PROJECT_ID`, `REGION` (forwarding rule region; must match the plugin location), `LOCATION` (`global` or a region) and `WASM_PLUGIN` (plugin ID or fully qualified name).

```bash
cat >traffic-plugin.yaml <<EOF
    name: traffic-ext
    forwardingRules:
    - https://www.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/forwardingRules/http-content-rule
    loadBalancingScheme: EXTERNAL_MANAGED
    extensionChains:
    - name: "chain1"
      matchCondition:
        celExpression: 'request.host == "example.com"'
      extensions:
      - name: 'ext1'
        service: projects/PROJECT_ID/locations/LOCATION/wasmPlugins/WASM_PLUGIN
        failOpen: false
        supportedEvents:
        - RESPONSE_HEADERS
        forwardAttributes:
        - request.host
        - request.path
EOF
```

```bash
gcloud service-extensions lb-traffic-extensions import traffic-ext \
    --source=traffic-plugin.yaml \
    --location=global
```

### Traffic extension with a callout (YAML)

```bash
cat >traffic.yaml <<EOF
    name: traffic-ext
    forwardingRules:
    - https://www.googleapis.com/compute/v1/projects/PROJECT_ID/regions/us-west1/forwardingRules/l7-ilb-forwarding-rule
    loadBalancingScheme: INTERNAL_MANAGED
    extensionChains:
    - name: "chain1"
      matchCondition:
        celExpression: 'request.host == "example.com"'
      extensions:
      - name: 'ext11'
        authority: ext11.com
        service: https://www.googleapis.com/compute/v1/projects/PROJECT_ID/regions/us-west1/backendServices/l7-ilb-callout-service
        failOpen: false
        timeout: 0.1s
        metadata:
          "key": "value"
          "fr": "forwarding_rule_id"
        supportedEvents:
        - RESPONSE_HEADERS
        forwardAttributes:
        - request.host
        - request.path
EOF
```

```bash
gcloud service-extensions lb-traffic-extensions import traffic-ext \
    --source=traffic.yaml \
    --location=us-west1
```

### Verify

```bash
curl -D - -H "host: example.com" FORWARDING_RULE_IP
```

The output includes `hello: service-extensions`. Repeat without the `host` header to confirm only `example.com` traffic is affected. Find the IP with `gcloud compute forwarding-rules describe`.

## Options / Props

| Field / rule | Detail |
|--------------|--------|
| Attachment | Only one traffic extension per forwarding rule; forwarding rules already used by another extension can't be selected |
| Chains | Each chain selects traffic by a CEL match condition; requests are evaluated sequentially and only one chain matches; all extensions in the matching chain act, and for response events the order is reversed; plugins and callouts can be mixed in a chain |
| Plugin constraints | All extension resources that reference a plugin must be of the same type and have the same load balancing scheme; plugins already used in Media CDN extensions can't be used |
| Extension / chain names | Console: start with a lowercase letter, up to 62 further lowercase letters, numbers or hyphens, not ending with a hyphen; advanced mode names follow RFC-1034, max 63 characters, first a letter, last a letter or number |
| Description | Up to 1,024 characters |
| Labels | Maximum 64 key-value pairs |
| `forwardAttributes` | Maximum 16 per extension |
| Forward headers | If none specified, all headers are sent |
| `failOpen` | Default `false`: on error, processing stops; HTTP `500` returned if response headers weren't delivered, otherwise the stream is reset. `true` continues processing and later chain extensions run |
| `timeout` (callout) | Console: 10 to 1000 milliseconds |
| `metadata` (callout) | Sent in `ProcessingRequest` as `protobuf.Struct`; total size under 1 KiB; key count under 20 in the Console text and under 16 in the YAML text; key length under 64 characters; value length under 1,024 characters; all values strings; text matching `forwarding_rule_id` is replaced by the forwarding rule's full resource URL |
| Console load balancer choices (plugin) | Global external or cross-region internal Application Load Balancer |

## Notes

- Source inconsistency: the metadata key count is under 20 in the Console steps and under 16 in the YAML steps; both are kept as written.
- The callout example uses `loadBalancingScheme: INTERNAL_MANAGED` and the plugin example `EXTERNAL_MANAGED`, as in the source. A traffic extension changes live load balancer traffic; try it on a disposable forwarding rule first.
- Callout prerequisite: create the callout backend service first.
- The new plugin takes a little time to distribute to all locations, not simultaneously.
- The source also shows the Console wizard; it is not reproduced. The YAML heredocs keep the source's 4-space indentation.
- Google Cloud Load Balancing, not Cloudflare or Vercel (see `cloudflare-workers`, `vercel`).
- Full `gcloud compute forwarding-rules` flags are in the `gcp-compute` skill: https://docs.cloud.google.com/sdk/gcloud/reference/compute/forwarding-rules/describe
- Source inconsistency: the plugin example references a regional forwarding rule (`.../regions/REGION/forwardingRules/http-content-rule`) and the replacement list says "`REGION`: the region of the forwarding rule. The value must match the value specified for the location of the plugin" and "`LOCATION`: the location of the plugin as either `global` or a region", but the import command uses `--location=global`. The example is kept as written; the source states that the forwarding rule region must match the plugin location.
- Source: https://docs.cloud.google.com/service-extensions/docs/configure-traffic-extensions (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [lb-extensions-overview.md](./lb-extensions-overview.md)
- [configure-callout-backend-service.md](./configure-callout-backend-service.md)
- [create-plugin.md](./create-plugin.md)
- [attributes.md](./attributes.md)
- [quotas.md](./quotas.md)
