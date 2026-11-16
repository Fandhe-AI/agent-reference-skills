---
source: https://docs.cloud.google.com/compute/docs/instance-templates/deterministic-instance-templates
---

# Deterministic instance templates

A deterministic instance template spells out exactly which third-party services or apps (and which versions) are installed on VMs, so every VM created from the template is identical. Compute Engine can rely only on what is defined in the template; vague startup scripts make behavior unpredictable, especially with autoscalers and rollbacks.

## Signature / Usage

### Non-deterministic template (what to avoid)

The source's example installs apache2 without a version and copies a file from an unversioned external server. The source notes the server at 108.59.87.185 does not exist, so copying the example fails at the last line; replace it with your own server information if applicable.

Adapted (not in the official docs): `--image-family debian-9` (an end-of-support image family) replaced with `debian-12`.

```bash
gcloud compute instance-templates create example-template-with-startup \
    --image-family debian-12 \
    --image-project debian-cloud \
    --metadata startup-script='#! /bin/bash
    sudo apt install -y apache2
    scp myuser@108.59.87.185:index.php /var/www/'
```

### Deterministic template

The source pins the package version and uses a versioned subdirectory (`version_2_1_3` contains the PHP scripts for version 2.1.3 of the service).

Adapted (not in the official docs): `--image-family debian-9` (an end-of-support image family) replaced with `debian-12`.

```bash
gcloud compute instance-templates create example-template-with-startup-2-1-3 \
    --image-family debian-12 \
    --image-project debian-cloud \
    --metadata startup-script='#! /bin/bash
    sudo apt install -y apache2=2.2.20-1ubuntu1
    scp myuser@108.59.87.185:version_2_1_3/index.php /var/www/'
```

## Options / Props

### Problems with the non-deterministic example

| Problem | Effect |
|---------|--------|
| No explicit apache2 version; relies on the current version in the `apt` repository | An autoscaler can add VMs with a different apache2 version; after rolling back to a previous template, VMs may run a different version than before the update |
| File fetched from an unversioned third-party host | The file may have changed since the template was last used |

### Recommended practices

| Practice | Detail |
|----------|--------|
| Container images with explicit tags | Assign a new tag for every build and reference it in the template instead of `latest` |
| Custom image | Preferred over startup scripts: guarantees every instance is the same; startup scripts may behave differently after distribution package updates. Use startup scripts for prototyping and rapid development, custom images for production |
| Deterministic startup scripts | Pin versions and use versioned paths |
| Specify the template ID, not the name | IDs are unique; a name can be deleted and recreated by an attacker before use (TOCTOU) |

## Notes

- Do not put passwords, tokens or keys in startup scripts or metadata; anyone who can read the VM's metadata can read them.
- Run the `scp` line only against a server you control; the source example uses a placeholder address.
- The source also shows a container-optimized image manifest (`version: v1beta2`, `image: myimage:version_2_1_3`) for pinning Docker image tags. It is omitted here because that manifest format belongs to the older container-on-VM mechanism; keep the principle (use explicit image tags, not `latest`).
- Corrected from the official docs: the source uses the end-of-support image family debian-9; replaced with debian-12.
- `2.2.20-1ubuntu1` is an Ubuntu-style apache2 version string used by the source only to illustrate pinning; use a version available in your image's apt repository.
- To see a template's ID: "Get information about an instance template" (https://docs.cloud.google.com/compute/docs/instance-templates/get-list-delete-instance-templates#get_information_about_an_instance_template).
- Source: https://docs.cloud.google.com/compute/docs/instance-templates/deterministic-instance-templates (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-templates.md](./instance-templates.md)
- [updating-migs.md](./updating-migs.md)
- [instance-groups.md](./instance-groups.md)
- Create instance templates: https://docs.cloud.google.com/compute/docs/instance-templates/create-instance-templates
- Get, list and delete instance templates: https://docs.cloud.google.com/compute/docs/instance-templates/get-list-delete-instance-templates
