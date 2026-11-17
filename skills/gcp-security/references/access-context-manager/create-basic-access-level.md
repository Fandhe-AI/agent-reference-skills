---
source: https://docs.cloud.google.com/access-context-manager/docs/create-basic-access-level
---

# Creating a basic access level

A basic access level is a set of conditions over attributes (IP subnetworks, device policy, principals, required access levels). Create it with `gcloud access-context-manager levels create` and a `--basic-level-spec` YAML file, or with `accessLevels.create`. An access policy must already exist.

## Signature / Usage

### gcloud

The command takes the access level name, the flags in the options table below (`--title` and `--basic-level-spec` required, `--combine-function` and `--description` optional) and `--policy`. Example command from the source:

```bash
gcloud access-context-manager levels create Device_Trust \
    --basic-level-spec=corpdevspec.yaml \
    --combine-function=AND \
    --description='Access level that conforms to corporate spec.' \
    --title='Device_Trust Extended' \
    --policy=1521580097614100
```

Expected output:

```text
Create request issued for: NAME
Waiting for operation [accessPolicies/POLICY/accessLevels/NAME/create/1521594488380943] to complete...done.
Created level NAME.
```

### REST

```text
POST https://accesscontextmanager.googleapis.com/v1/accessPolicies/POLICY/accessLevels
```

The request body contains an `AccessLevel`; each `Condition` is evaluated as AND (all attributes true) or NAND (at least one false, when `negate` is true). The response is an `Operation`.

### Example: limit access on a corporate network

Auditors on 203.0.113.0 to 203.0.113.127 reach Cloud Logging for the project `sensitive-data`. YAML spec (`CONDITIONS.yaml`):

```yaml
- ipSubnetworks:
  - 203.0.113.0/25
```

Create the level from the saved file:

```bash
gcloud access-context-manager levels create NAME \
   --title TITLE \
   --basic-level-spec CONDITIONS.yaml \
   --policy=POLICY
```

Private IP variant:

```yaml
- vpcNetworkSources:
  - vpcSubnetwork:
      network: VPC_NETWORK_NAME
      vpcIpSubnetworks:
      - IP_RANGE
```

REST body:

```json
{
 "name": "NAME",
 "title": "TITLE",
 "basic": {
   "conditions": [
     {
       "ipSubnetworks": [
         "203.0.113.0/25"
       ]
     }
   ]
 }
}
```

Adapted (not in the official docs): the source writes `VPC_NETWORK_NAME` and `IP_RANGE` unquoted, which is invalid JSON; they are quoted here.

```json
{
 "name": "NAME",
 "title": "TITLE",
 "basic": {
   "conditions": [
     {
       "vpcNetworkSources": [
        {
          "vpcSubnetwork": {
            "network": "VPC_NETWORK_NAME",
            "vpcIpSubnetworks": [
              "IP_RANGE"
            ]
          }
        }
       ]
     }
   ]
 }
}
```

### Example: limit access by device attributes

```yaml
- devicePolicy:
    osConstraints:
      - osType: DESKTOP_CHROME_OS
        minimumVersion: 11316.165.0
      - osType: DESKTOP_WINDOWS
        minimumVersion: 10.0.1809
```

```json
{
 "name": "NAME",
 "title": "TITLE",
 "basic": {
   "conditions": [
     {
       "devicePolicy": {
         "osConstraints": [
           {
             "osType": "DESKTOP_CHROME_OS",
             "minimumVersion": "11316.165.0"
           },
           {
             "osType": "DESKTOP_WINDOWS",
             "minimumVersion": "10.0.1809"
           }
         ]
      }
     }
   ]
  }
}
```

### Example: grant access by user or service account (nested levels)

```yaml
- members:
    - user:sysadmin@example.com
    - serviceAccount:service@project.iam.gserviceaccount.com

- requiredAccessLevels:
    - accessPolicies/247332951433/accessLevels/Device_Trust
    - accessPolicies/247332951433/accessLevels/IP_Trust
```

```bash
gcloud access-context-manager levels create NAME \
   --title TITLE \
   --basic-level-spec CONDITIONS.yaml \
   --combine-function=OR \
   --policy=POLICY
```

REST body with `combiningFunction` set to `OR`:

```json
{
 "name": "NAME",
 "title": "TITLE",
 "basic": {
   "conditions": [
     {
       "members": [
         "user:sysadmin@example.com",
         "serviceAccount:service@project.iam.gserviceaccount.com"
       ]
     },
     {
       "requiredAccessLevels": [
         "accessPolicies/247332951433/accessLevels/Device_Trust",
         "accessPolicies/247332951433/accessLevels/IP_Trust"
       ]
     }
   ],
   "combiningFunction": "OR"
 }
}
```

## Options / Props

### `gcloud access-context-manager levels create` options

| Option | Description |
|--------|-------------|
| `basic-level-spec` | YAML file with one or more conditions (each with at least one attribute) |
| `title` | Short title shown in the console; must be unique to the policy |
| `combine-function` | Optional; `AND` (default) or `OR` |
| `description` | Optional long-form description |
| `policy` | ID of the organization's access policy; optional if a default policy is set |

### Naming limits

| Item | Rule |
|------|------|
| `LEVEL_NAME` / `NAME` | Begins with a letter; only letters, numbers and underscores; maximum 50 characters |
| Console title | At most 50 characters, starts with a letter; only numbers, letters, underscores and spaces |

## Notes

- The console cannot select a scoped policy to create a level under; use the gcloud CLI or the API. Principals can be added to levels only with `gcloud` or the API.
- A condition can include one of each attribute type; all attributes in a condition must be met. Console option "When condition is met, return" TRUE means AND, FALSE means NAND (negate).
- Device attributes in custom access level expressions require a paid subscription (Chrome Enterprise Premium); device information comes from Endpoint Verification. Checked criteria: screen lock, storage encryption, OS kind and version.
- With `combine-function=OR`, the listed principals get access even if the other conditions are not met. This is the stated purpose of the principal example; an `OR` level is less restrictive than its nested levels.
- For private IP ranges (for example `192.168.0.0/16`, `172.16.0.0/12`), see the VPC Service Controls page "Allow access to protected resources from an internal IP address".
- Corrected from the official docs: the `vpcNetworkSources` request body has `"network": VPC_NETWORK_NAME,` and `IP_RANGE` unquoted, which is not valid JSON.
- The generic syntax line in the source (`levels create LEVEL_NAME OPTIONS --policy=POLICY`, with `OPTIONS` standing for the table's flags) is omitted because it is not runnable; the example commands show the flags.
- The source also shows Console steps (including a CSV import for VPC networks and subnets).
- Source: https://docs.cloud.google.com/access-context-manager/docs/create-basic-access-level (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-level-attributes.md](./access-level-attributes.md)
- [create-custom-access-level.md](./create-custom-access-level.md)
- [create-access-policy.md](./create-access-policy.md)
- [overview.md](./overview.md)
