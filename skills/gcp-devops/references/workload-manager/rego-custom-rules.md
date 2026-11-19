---
source: https://docs.cloud.google.com/workload-manager/docs/evaluate/custom-rules/rego-custom-rules
---

# Write custom rules using Rego

Write Workload Manager custom rules in the Rego policy language (`.rego` files). Google provides sample rules in the `GoogleCloudPlatform/workload-manager` GitHub repository that you can upload as they are or modify.

## Signature / Usage

### Example 1: at least one tag on Compute Engine resources

```rego
# Copyright 2024 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

########################################################################
# DETAILS:  MUST have atleast one tag
# SEVERITY: Medium
# ASSET_TYPE: compute.googleapis.com/Instance
# TAGS: Tags, Cost, Management, Compute Engine
########################################################################

package google.compute.instance.tags

import data.validator.google.lib as lib
import data.validator.google.lib.parameters as gparam
import future.keywords

asset := input.asset

params:= lib.get_default(gparam.global_parameters,"compute",{})

deny [{"msg": message, "details": metadata}] {

	# Check if resource is in exempt list
	exempt_list := lib.get_default(params, "exemptions", [])
	exempt := {asset.name} & {ex | ex := exempt_list[_]}
	not count(exempt) != 0

	tags := lib.get_default(asset.resource.data, "tags", {"items": []})
	count(tags.items) == 0

	message:="Compute resource is missing tags. Ensure appropriate tags are applied."

	metadata:={"name": asset.name}
}
```

### Example 2: do not use the Compute Engine default service account

```rego
# Copyright 2024 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

########################################################################
# DETAILS:  MUST NOT use default service account
# SEVERITY: Medium
# ASSET_TYPE: compute.googleapis.com/Instance
# TAGS: Defaults, Management, Compute Engine
########################################################################

package google.compute.defaultserviceAccount

import data.validator.google.lib as lib
import data.validator.google.lib.parameters as gparam
import future.keywords

asset := input.asset

input_enriched := object.union({"resource": {"data": {"serviceAccounts": []}}}, asset)

params := lib.get_default(gparam.global_parameters, "compute", {})

deny[{
	"msg": "Disallowed default service account",
	"details": {"name": asset.name},
}] {

	account = input_enriched.resource.data.serviceAccounts[_]
	endswith(account.email, params.default_sa)
}
```

### Example 3: VMs must not have an external IP address

```rego
# Copyright 2024 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

########################################################################
# DETAILS:  Ensure VMs dont have External IP
# SEVERITY: High
# ASSET_TYPE: compute.googleapis.com/Instance
# TAGS: Security, Network, Compute Engine, External IP, VM, Virtual Machine
########################################################################

package google.compute.instance.approved.external.ip

import data.validator.google.lib as lib
import data.validator.google.lib.parameters as gparam
import future.keywords

asset := input.asset

params := lib.get_default(gparam.global_parameters, "compute", {})

deny [{"msg": message, "details": metadata}] {

	# Check if resource is in exempt list
	exempt_list := lib.get_default(params, "exemptions", [])
	exempt := {asset.name} & {ex | ex := exempt_list[_]}
	not count(exempt) != 0

	# Find network access config block w/ external IP
	instance := asset.resource.data
	access_config := instance.networkInterfaces[_].accessConfigs
	count(access_config) > 0

	message := sprintf("%v : VM Instance has external IP. current config: %v",[asset.name, access_config])
	metadata := {"name": asset.name}
}
```

### Bucket layout

The top level of the Cloud Storage bucket must include the `/lib` and `/rules` folders.

- `lib`
  - `parameters.rego`
  - `utils.rego`
- `/rules`
  - `rule_name1.rego`
  - `rule_name2.rego`

## Options / Props

### Custom rule sections

| Section | Description |
|---------|-------------|
| Metadata | Fields that define the rule metadata (below). |
| Package declaration | For example, `templates.google.compute.instance.label`. |
| Import statements | For example, `data.validator.google.lib as lib`. |
| Rule definitions | A set of instructions that defines the rule. |

### Metadata fields

| Field | Description |
|-------|-------------|
| `DETAILS` | A short description for the rule. |
| `SEVERITY` | A user-defined value for the severity of a violation, for example `HIGH`, `CRITICAL`, `MEDIUM`, or `LOW`. |
| `ASSET_TYPE` | One of the supported assets (see the supported data sources on the custom rules overview page). |
| `TAGS` | One or more tags for the rule; they help filter the rules. |

## Notes

- Be familiar with the Rego policy language before writing rules.
- Upload the `.rego` files to a Cloud Storage bucket; the top level must include `/lib` (`parameters.rego`, `utils.rego`) and `/rules` (your rule files).
- Example 3 flags VMs that have any external IP address; Example 2 relies on `params.default_sa` from the shared `lib/parameters.rego` parameters.
- Rego blocks keep the source's tab indentation inside rule bodies. The source shows the examples as indented code blocks without a language tag; the `rego` tag was added.
- Source: https://docs.cloud.google.com/workload-manager/docs/evaluate/custom-rules/rego-custom-rules (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-custom-rules.md](./about-custom-rules.md)
- [evaluate-using-custom-rules.md](./evaluate-using-custom-rules.md)
