---
source: https://docs.cloud.google.com/application-design-center/docs/manage-catalogs
---

# Manage catalogs

Catalogs publish and share application templates and imported component templates across spaces. Templates are visible only to members of their space by default. Each space has a single catalog where you publish templates, edit metadata and share the catalog with spaces in other application management boundaries.

## Signature / Usage

### Publish an application template to a catalog

1. Find the catalog ID.

```bash
gcloud design-center spaces catalogs list \
--project=PROJECT \
--location=LOCATION \
--space=SPACE
```

2. Find the template ID.

```bash
gcloud design-center spaces application-templates list \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--filter=FILTER
```

3. Commit the application template and copy the `name` output (used as `application-template-revision-source`).

```bash
gcloud design-center spaces application-templates commit TEMPLATE \
--project=PROJECT \
--location=LOCATION \
--space=SPACE
```

4. Make sure the template is not already in the catalog.

```bash
gcloud design-center spaces catalogs templates list \
--catalog=CATALOG \
--project=PROJECT \
--location=LOCATION \
--space=SPACE
```

5. Create the catalog template.

```bash
gcloud design-center spaces catalogs templates create CATALOG_TEMPLATE \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--catalog=CATALOG \
--template-category=TEMPLATE_CATEGORY
```

6. Create the first catalog template revision, which developers use as an application source.

```bash
gcloud design-center spaces catalogs templates revisions create REVISION \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--catalog=CATALOG \
--template=CATALOG_TEMPLATE \
--application-template-revision-source=APPLICATION_TEMPLATE_REVISION_SOURCE
```

### Remove a template from a catalog

```bash
gcloud design-center spaces catalogs templates delete CATALOG_TEMPLATE \
--catalog=CATALOG \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--force
```

### Share a catalog with a space

```bash
gcloud design-center spaces catalogs shares create SHARE \
--project=PROJECT \
--space=SPACE \
--location=LOCATION \
--catalog=CATALOG \
--destination-space=DESTINATION_SPACE
```

Stop sharing:

```bash
gcloud design-center spaces catalogs shares delete SHARE \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--catalog=CATALOG
```

### Edit catalog metadata

```bash
gcloud design-center spaces catalogs update CATALOG \
--project=PROJECT \
--location=LOCATION \
--space=SPACE \
--description=DESCRIPTION \
--display-name=DISPLAY_NAME
```

## Options / Props

### Required roles

| Task | Required roles |
|---|---|
| Publish application templates to a space catalog | Application Design Center Admin (`roles/designcenter.admin`) |
| Share a catalog with destination spaces | Application Design Center Admin (`roles/designcenter.admin`) |

### Placeholders

| Name | Description |
|---|---|
| `CATALOG` | Catalog ID, for example `default-catalog` |
| `FILTER` | Narrow results, for example `"displayName:my-app-template*"` |
| `TEMPLATE_CATEGORY` | Template category, for example `application-template` |
| `REVISION` | Revision ID, for example `r1` |
| `APPLICATION_TEMPLATE_REVISION_SOURCE` | Value copied from the commit output, for example `projects/my-project/locations/us-central1/spaces/my-space/applicationTemplates/my-app-template/revisions/r1` |
| `DESTINATION_SPACE` | Fully qualified name, for example `projects/my-dest-project/locations/us-central1/spaces/my-dest-space` |

## Notes

- Template changes are not published automatically; publish the template to the catalog again to share the latest revision.
- A catalog can only be shared with a destination space in the same region as the source space but in a different application management boundary (Folder or Project boundary). Developers see shared templates under "Shared templates" in their space.
- Removing a template from the catalog (`templates delete ... --force`) is how you stop sharing that template with a space; try it on a disposable project first.
- Console steps (add templates, share, stop sharing, edit display name) are omitted here.
- Source: https://docs.cloud.google.com/application-design-center/docs/manage-catalogs (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [design-application-templates.md](./design-application-templates.md)
- [manage-spaces.md](./manage-spaces.md)
- [import-terraform.md](./import-terraform.md)
