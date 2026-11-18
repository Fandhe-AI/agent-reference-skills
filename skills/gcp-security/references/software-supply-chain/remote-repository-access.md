---
source: https://docs.cloud.google.com/assured-open-source-software/docs/remote-repository-access
---

# Download Assured OSS packages using a remote repository

Proxy and download Assured OSS packages through a JFrog Artifactory or Sonatype Nexus remote repository. This page applies to the free tier; the premium tier is documented under Security Command Center (see the `gcp-security-compliance` skill).

## Signature / Usage

Before you begin, enable Assured OSS and validate connectivity for the requested service accounts. Create a new remote repository in the repository manager and choose the repository type (`Maven` for Java, `PyPi` for Python, `Go` for Go). Use one of the following URLs as the repository URL (Artifactory **URL** field, Nexus **Remote Storage** field).

### Java

```text
https://us-maven.pkg.dev/cloud-aoss/java
```

### Python

```text
https://us-python.pkg.dev/cloud-aoss/python
```

### Go

```text
https://us-go.pkg.dev/cloud-aoss/go
```

### Artifactory specifics

- Repository Key: a unique name, for example `assured-oss-java-repo`.
- User Name: `_json_key_base64`. Password: the entire base64-encoded service account JSON key file as a single line (the source obtains it with `cat key-filename.json | base64`).
- Python only: set **Registry URL** to `https://us-python.pkg.dev/cloud-aoss/python` and **URL** to `https://us-python.pkg.dev`.
- Go only: in **Advanced Settings** select **Bypass HEAD Requests**.
- For Python, append `/simple` to the obtained repository URL and use it as `index-url` in `pip install` (for example `https://a0a87smb7hcda.jfrog.io/artifactory/api/pypi/assured-oss-python-repo/simple`).

### Nexus specifics

- Under **HTTP** select **Authentication**; Authentication type `Username`; Username `_json_key_base64`; Password: the same base64-encoded key string.

## Options / Props

### Optional connection test URLs (Artifactory)

| Language | URL to enter for the test |
|----------|---------------------------|
| Java | `https://us-maven.pkg.dev` |
| Python | `https://us-python.pkg.dev` |
| JavaScript | `https://us-npm.pkg.dev` |
| Go | `https://us-go.pkg.dev` |

## Notes

- Do not enter the complete domain name for the connection test; it might return HTTP `404` or `405`. A successful test shows `Successfully connected to server`.
- Known issue: the **Test** button can return an error even when the connection is configured correctly. Create the remote repository regardless and use the validate-connection page to confirm.
- The base64 key string is a long-lived credential: it lands in shell history, process lists and repository manager configuration. Do not print it in shared terminals or CI logs, and do not commit the key file or the encoded string. The Python direct-access page warns that service account keys are a security risk and recommends a more secure alternative where possible.
- After the repository is created, configure build tools (Apache Maven, Gradle Build Tool, pip) to use it.
- Source: https://docs.cloud.google.com/assured-open-source-software/docs/remote-repository-access (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [assured-oss-overview.md](./assured-oss-overview.md)
- [enable-assured-oss.md](./enable-assured-oss.md)
- [download-python-packages.md](./download-python-packages.md)
