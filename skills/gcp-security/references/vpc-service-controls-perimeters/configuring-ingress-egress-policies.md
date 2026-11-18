---
source: https://docs.cloud.google.com/vpc-service-controls/docs/configuring-ingress-egress-policies
---

# Configuring ingress and egress policies

Set ingress and egress policies (YAML or JSON rule files) on an existing perimeter or while creating one. The gcloud commands assume a default access policy is configured.

## Signature / Usage

### Update policies on an existing perimeter

```bash
gcloud access-context-manager perimeters update PERIMETER_NAME --set-ingress-policies=INGRESS-FILENAME.yaml

gcloud access-context-manager perimeters update PERIMETER_NAME --set-egress-policies=EGRESS-FILENAME.yaml
```

For example:

```bash
gcloud access-context-manager perimeters update my-perimeter --set-ingress-policies=my-ingress-rule.yaml
```

### Set policies during perimeter creation

`PROJECT_NUMBER` is the number of the project to protect.

Adapted (not in the official docs): the egress command's `--egress-policies=-EGRESS-FILENAME.yaml` (stray leading hyphen) is written `--egress-policies=EGRESS-FILENAME.yaml`, and `projects/PROJECT` is written `projects/PROJECT_NUMBER` because `--resources` takes project numbers only.

```bash
gcloud access-context-manager perimeters create PERIMETER_NAME --title=TITLE --ingress-policies=INGRESS-FILENAME.yaml --restricted-services=SERVICE --resources="projects/PROJECT_NUMBER"

gcloud access-context-manager perimeters create PERIMETER_NAME --title=TITLE --egress-policies=EGRESS-FILENAME.yaml --restricted-services=SERVICE --resources="projects/PROJECT_NUMBER"
```

For example:

Adapted (not in the official docs): `storage.googelapis.com` is corrected to `storage.googleapis.com`, and the project ID `projects/myproject` is replaced by the project number `projects/12345` because `--resources` takes project numbers only.

```bash
gcloud access-context-manager perimeters create my-perimeter --title=perimeter-for-project-1 --ingress-policies=my-ingress-rule.yaml --restricted-services=storage.googleapis.com --resources="projects/12345"
```

## Notes

- Corrected from the official docs: the source shows `--egress-policies=-EGRESS-FILENAME.yaml` and `--restricted-services=storage.googelapis.com` (typos), and `--resources="projects/PROJECT"` / `--resources="projects/myproject"`. The gcloud 593.0.0 help for `perimeters create` describes `--resources` as projects "in the form projects/<projectnumber>", and the create service perimeter page states "If you specify projects, only project numbers are supported."; `projects/12345` is the example project number used on that page.
- The commands omit `--policy`; they assume a default access policy (`access_context_manager/policy` property), as the source notes.
- Console: the YAML attribute names are the same attributes as in the console, but the console uses slightly different names. If you select **All sources** in the ingress rule's **Sources** list, the ingress policy allows access from any network origin. That is permissive; use it only if you intend to accept any source.
- Changing a perimeter's policies is disruptive and can block production traffic: `--set-ingress-policies` / `--set-egress-policies` set the perimeter's enforced ingress / egress policies to the file contents. Test changes in dry run mode first (`gcloud access-context-manager perimeters dry-run update` accepts the same flags; see dry-run-mode.md) and try them on a disposable perimeter first.
- The rule file attributes are defined in the ingress and egress rules reference (https://docs.cloud.google.com/vpc-service-controls/docs/ingress-egress-rules). The source also shows Console steps (omitted).
- Source: https://docs.cloud.google.com/vpc-service-controls/docs/configuring-ingress-egress-policies (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/vpc-service-controls/docs/create-service-perimeters (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-service-perimeters.md](./create-service-perimeters.md)
- [manage-service-perimeters.md](./manage-service-perimeters.md)
- [dry-run-mode.md](./dry-run-mode.md)
