---
source: https://docs.cloud.google.com/assured-open-source-software/docs/overview
---

# Overview of Assured Open Source Software

Assured Open Source Software (Assured OSS) lets you use the open source packages Google secures and uses itself in your own developer workflows. Packages are built by Google, meet SLSA level 3 requirements, and come with verifiable provenance and an SBOM. More than one thousand popular Java, Go, Python and JavaScript (NPM) packages are available, including TensorFlow, Pandas and Scikit-learn.

## Signature / Usage

### Remote (proxy) repository URL

Assured OSS packages are stored in a Google-managed Artifact Registry repository. A remote (mirror or proxy) repository in JFrog Artifactory or Sonatype Nexus points to a URL such as the following (Python free tier).

```text
https://us-python.pkg.dev/cloud-aoss/python
```

## Options / Props

### Tiers

| Capability | Free tier | Premium tier |
|------------|-----------|--------------|
| Availability | Free | Available when you purchase Security Command Center Premium or Security Command Center Enterprise |
| Language packages in curated repositories | Python, Go, Java | Python, Go, Java, JavaScript (NPM) |
| JavaScript packages in a canonical repository | No | Yes |
| Setup | Manual steps | Automated as part of the organization-level activation of Security Command Center Premium or Enterprise |
| Curated repositories | Created in a Google-managed project | Created in a project that you specify |
| Universal proxy endpoints | Yes: download open source packages and metadata from one source, whether built by Google or not | Not listed separately in the source |
| Universal package metadata (collected and signed by Google: build, vulnerabilities, package health) | Not listed | Yes; package health is only available for packages built by Google |
| AWS account access | Yes | Not listed |
| Regions | Not listed | Google Cloud regions and multi-regions for remote (proxy) Artifact Registry repositories |

### Repository access options

| Option | Use when |
|--------|----------|
| Remote (mirror or proxy) repository in your environment | You use a repository manager such as JFrog Artifactory or Sonatype Nexus |
| Direct connection to the Artifact Registry repository with a service account | Developers use build tools such as Maven, Gradle, Go or pip |
| Virtual upstream repository (single access point) | Premium tier: two virtual repositories (Java, Python) are created automatically. Free tier: you configure it yourself, with an Artifact Registry standard or remote repository as upstream, or an Assured OSS type repository (a wrapper over a virtual repository with access to Free and Premium packages that performs server-side checks) |

## Notes

- Benefits listed by the source: trusted supplier, Assured SBOMs in industry formats such as SPDX, VEX information in formats such as CycloneDX, active scanning and fixing of new vulnerabilities in curated packages, and signed tamper-evident SLSA provenance.
- Premium integration with Security Command Center is described in the Security Command Center documentation (see the `gcp-security-compliance` skill). For pricing see the Security Command Center pricing page (prices are not copied here).
- Assured OSS is one component of software supply chain protection; see [software-supply-chain-security-overview.md](./software-supply-chain-security-overview.md).
- Snippet taken from https://docs.cloud.google.com/assured-open-source-software/docs/remote-repository-access.
- Source: https://docs.cloud.google.com/assured-open-source-software/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [enable-assured-oss.md](./enable-assured-oss.md)
- [remote-repository-access.md](./remote-repository-access.md)
- [download-python-packages.md](./download-python-packages.md)
- [package-signature-overview.md](./package-signature-overview.md)
- [software-supply-chain-security-overview.md](./software-supply-chain-security-overview.md)
