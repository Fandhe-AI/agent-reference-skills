---
source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/install
---

# Install Cloud Storage FUSE

Install or upgrade Cloud Storage FUSE (`gcsfuse`) from prebuilt Linux packages (Ubuntu/Debian, CentOS/Red Hat/Rocky Linux, SUSE) or by building the latest source with `go install`. Supported frameworks, operating systems, and architectures are listed on the overview page.

## Signature / Usage

### Ubuntu/Debian: configure the package source (signed-by form)

Install the required packages:

```bash
sudo apt-get update
sudo apt-get install -y curl lsb-release
```

Add the Cloud Storage FUSE distribution URL as a package source:

```bash
export GCSFUSE_REPO=gcsfuse-`lsb_release -c -s`
echo "deb [signed-by=/usr/share/keyrings/cloud.google.asc] https://packages.cloud.google.com/apt $GCSFUSE_REPO main" | sudo tee /etc/apt/sources.list.d/gcsfuse.list
```

Import the Google Cloud public key:

Adapted (not in the official docs): added `-fsSL` to `curl` so an HTTP error is not written into the keyring file.

```bash
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo tee /usr/share/keyrings/cloud.google.asc
```

### Ubuntu/Debian: install and upgrade

```bash
sudo apt-get update
sudo apt-get install gcsfuse
```

```bash
sudo apt-get update
sudo apt-get install --only-upgrade gcsfuse
```

### CentOS/Red Hat/Rocky Linux

```bash
sudo tee /etc/yum.repos.d/gcsfuse.repo > /dev/null <<EOF
[gcsfuse]
name=gcsfuse (packages.cloud.google.com)
baseurl=https://packages.cloud.google.com/yum/repos/gcsfuse-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=0
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg
       https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF
```

```bash
sudo yum install fuse
sudo yum install gcsfuse
```

Answer "yes" to any questions about adding the GPG signing key. Upgrade:

Adapted (not in the official docs): removed `sudo apt-get update` from the yum upgrade block, because `apt-get` is not available on CentOS/Red Hat/Rocky Linux.

```bash
sudo yum -y upgrade gcsfuse
```

### SUSE Linux

```bash
sudo tee /etc/zypp/repos.d/gcsfuse.repo > /dev/null <<EOF
[gcsfuse]
name=gcsfuse (packages.cloud.google.com)
baseurl=https://packages.cloud.google.com/yum/repos/gcsfuse-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=0
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg
       https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF
```

```bash
sudo zypper install fuse
sudo zypper install gcsfuse
```

Upgrade:

```bash
sudo zypper refresh
sudo zypper -n update gcsfuse
```

### Build from source

Install `fuse`, `git`, and `go` (see `go.mod` in the gcsfuse repository for the required `go` version), then:

```bash
go install github.com/googlecloudplatform/gcsfuse/v3@master
```

Or clone the repository and install from it:

```bash
git clone https://github.com/GoogleCloudPlatform/gcsfuse.git
cd gcsfuse
go install .
```

## Notes

- A successful source build installs a binary named `gcsfuse` to `$GOPATH/bin`. To upgrade from source, re-run the install steps.
- You can alternatively download the latest prebuilt package from the GitHub releases page (https://github.com/GoogleCloudPlatform/gcsfuse/releases).
- Corrected from the official docs: the CentOS/Red Hat/Rocky Linux upgrade block originally began with `sudo apt-get update`.
- Adapted from the official docs: the original key import `curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo tee /usr/share/keyrings/cloud.google.asc` had no `-fsSL`.
- Omitted: the source also shows a legacy Ubuntu/Debian path for distributions without `signed-by` support, which pipes the key into the deprecated `apt-key add`.
- Source inconsistency: the SUSE repo file uses the `gcsfuse-el7-x86_64` base URL, exactly as in the source.
- `go install ...@master` builds the repository's `master` branch, not a tagged release; prefer the packages for reproducible installs.
- Source: https://docs.cloud.google.com/storage/docs/cloud-storage-fuse/install (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [mount-bucket.md](./mount-bucket.md)
