---
source: https://docs.cloud.google.com/vpc/docs/configure-private-google-access
---

# Configure Private Google Access

How to enable Private Google Access on a subnet and meet the DNS, routing and firewall requirements for the domain you choose (default domains, `private.googleapis.com`, or `restricted.googleapis.com`). It also allows access to the external IPs used by App Engine, including third-party App Engine-based services.

## Signature / Usage

### Enable on an existing subnet

```bash
gcloud compute networks subnets update SUBNET_NAME \
--region=REGION \
--enable-private-ip-google-access
```

Replace `SUBNET_NAME` with the subnet name and `REGION` with its region.

### Verify

```bash
gcloud compute networks subnets describe SUBNET_NAME \
--region=REGION \
--format="get(privateIpGoogleAccess)"
```

### Create a new subnet with it enabled

Adapted (not in the official docs): removed the source's `[ --stack-type=STACK_TYPE ]` and `[ --ipv6-access-type=IPv6_ACCESS_TYPE ]` template brackets, which make the command unrunnable in a shell; the two optional flags are described below the example.

```bash
gcloud compute networks subnets create SUBNET_NAME \
    --region=REGION \
    --network=NETWORK_NAME \
    --range=PRIMARY_IPV4_RANGE \
    --enable-private-ip-google-access
```

Optional flags to add before `--enable-private-ip-google-access`: `--stack-type=STACK_TYPE` (`IPV4_ONLY`, `IPV4_IPV6`, or `IPV6_ONLY`) and `--ipv6-access-type=IPV6_ACCESS_TYPE` (`EXTERNAL` or `INTERNAL`, only with `--stack-type=IPV4_IPV6` or `IPV6_ONLY`). For an IPv6-only subnet omit `--range`.

### Disable

```bash
gcloud compute networks subnets update SUBNET_NAME \
    --region=REGION \
    --no-enable-private-ip-google-access
```

### Check default routes for a network

```bash
gcloud compute routes list \
    --filter="default-internet-gateway NETWORK_NAME"
```

### List subnets of a network

```bash
gcloud compute networks subnets list --filter=NETWORK_NAME
```

### Compute default-domain IP ranges (goog.json minus cloud.json)

Adapted (not in the official docs): the `if len(cidrs) != 2` check in `main` is always true because `cidrs` always has two entries, so a failed download (`read_url` prints an error and returns `None`) ended in a `TypeError` instead of a clear failure; it now raises when either result is `None`.

```python
from __future__ import print_function

import json

try:
    from urllib import urlopen
except ImportError:
    from urllib.request import urlopen
    from urllib.error import HTTPError

import netaddr

IPRANGE_URLS = {
    "goog": "https://www.gstatic.com/ipranges/goog.json",
    "cloud": "https://www.gstatic.com/ipranges/cloud.json",
}


def read_url(url):
    try:
        return json.loads(urlopen(url).read())
    except (IOError, HTTPError):
        print("ERROR: Invalid HTTP response from %s" % url)
    except json.decoder.JSONDecodeError:
        print("ERROR: Could not parse HTTP response from %s" % url)


def get_data(link):
    data = read_url(link)
    if data:
        print("{} published: {}".format(link, data.get("creationTime")))
        cidrs = netaddr.IPSet()
        for e in data["prefixes"]:
            if "ipv4Prefix" in e:
                cidrs.add(e.get("ipv4Prefix"))
            if "ipv6Prefix" in e:
                cidrs.add(e.get("ipv6Prefix"))
        return cidrs


def main():
    cidrs = {group: get_data(link) for group, link in IPRANGE_URLS.items()}
    if any(c is None for c in cidrs.values()):
        raise ValueError("ERROR: Could not process data from Google")
    print("IP ranges for Google APIs and services default domains:")
    for ip in (cidrs["goog"] - cidrs["cloud"]).iter_cidrs():
        print(ip)


if __name__ == "__main__":
    main()
```

## Options / Props

### Conditions for a VM to use Private Google Access

| Conditions for a VM to use Private Google Access |
|---|
| The VM interface is in a subnet with Private Google Access enabled. |
| The VPC network meets the network requirements below. |
| The VM interface has no external IP address. |
| The packet source IP is the interface's primary internal IPv4 address, its internal IPv6 address, or an internal IPv4 address from an alias IP range. |

### Network requirements

| Network requirements |
|---|
| Enable the API of the service you access when using a Google API endpoint (for example the Cloud Storage API to create a bucket via `storage.googleapis.com`); accessing other resource types, such as a bucket in another project through its `storage.googleapis.com` URL, may need no API enabled. |
| For IPv6, the VM must be configured with a `/96` IPv6 address range and the software must send packets whose sources match addresses in that range. |
| You must use a VPC network; legacy networks are not supported because they have no subnets. |
| Permissions: project owners, editors, and principals with the Network Admin role (`roles/compute.networkAdmin`) can create or update subnets and assign IP addresses. |
| Logging: Cloud Logging captures API requests from VMs in these subnets, identifying the source as the VM's internal IP. |

### Domain options

| Domain | IP ranges | Supports |
|--------|-----------|----------|
| Default domains (all names except the two below) | Various ranges (see goog.json minus cloud.json) | Most Google APIs and services regardless of VPC Service Controls support, including Google Maps, Google Ads, Google Cloud and Google Workspace web applications such as Gmail and Google Docs |
| `private.googleapis.com` | `199.36.153.8/30`, `2600:2d00:0002:2000::/56` | Most Google APIs and services regardless of VPC Service Controls support; not Google Workspace web applications. Use when you don't use VPC Service Controls, or you do but also need services it doesn't support |
| `restricted.googleapis.com` | `199.36.153.4/30`, `2600:2d00:0002:1000::/56` | Only APIs supported by VPC Service Controls; blocks others; no Google Workspace APIs or web applications. Gives extra data exfiltration risk mitigation |

### Configuration summary

| Domain | DNS | Routes | Firewall egress allow |
|--------|-----|--------|-----------------------|
| Default | No special DNS | Default route `0.0.0.0/0` (and `::/0` for IPv6) with next hop `default-internet-gateway`, or custom routes for the Google IP ranges | Implied allow egress suffices unless a higher-priority rule blocks it |
| `private.googleapis.com` | Private DNS zone records to `199.36.153.8/30` / `2600:2d00:0002:2000::/56` | `199.36.153.8/30`, `34.126.0.0/18`; IPv6 `2600:2d00:0002:2000::/56`, `2001:4860:8040::/42` | Same ranges |
| `restricted.googleapis.com` | Private DNS zone records to `199.36.153.4/30` / `2600:2d00:0002:1000::/56` | `199.36.153.4/30`, `34.126.0.0/18`; IPv6 `2600:2d00:0002:1000::/56`, `2001:4860:8040::/42` | Same ranges |

### DNS records (private zone)

| Domain | A record targets | AAAA record target |
|--------|------------------|--------------------|
| `private.googleapis.com` | `199.36.153.8`, `199.36.153.9`, `199.36.153.10`, `199.36.153.11` | `2600:2d00:0002:2000::` |
| `restricted.googleapis.com` | `199.36.153.4`, `199.36.153.5`, `199.36.153.6`, `199.36.153.7` | `2600:2d00:0002:1000::` |

## Notes

- Domain options: `private.googleapis.com` and `restricted.googleapis.com` support only HTTP-based protocols over TCP (HTTP, HTTPS, HTTP/2); MQTT, ICMP and others are unsupported, as are interactive websites and features using redirects or content retrieval from the internet. `private.googleapis.com` domain names include `*.googleapis.com` (excluding `*.rep.googleapis.com`), `*.run.app`, `*.appspot.com`, `*.cloudfunctions.net`, `gcr.io` / `*.gcr.io`, `*.pkg.dev`, `*.gstatic.com`, `*.pki.goog`, `*.gke.goog`, `packages.cloud.google.com`, `dl.google.com`, `source.developers.google.com`, `storage.cloud.google.com`, `accounts.google.com` (only paths for service account OAuth) and others listed in the source.
- Configuration summary: Some Google APIs offer direct connectivity from Compute Engine VMs bypassing Google Front Ends; allow egress to `34.126.0.0/18` and `2001:4860:8040::/42` (no DNS records needed; VPC Service Controls supported).
- DNS records (private zone): Steps: create a private DNS zone for `googleapis.com`; add the A (and AAAA) records for the chosen VIP name; add a `CNAME` for `*.googleapis.com` pointing to the VIP name. For other domains (`gcr.io`, `*.pkg.dev`, `*.run.app`, ...) create a zone for `DOMAIN` in the same project as the `googleapis.com` zone, add A / AAAA records for `DOMAIN` pointing to the VIP addresses, and a `CNAME` `*.DOMAIN` to `DOMAIN`.
- Do not mix addresses of the two VIPs in DNS; this causes intermittent failures. Public DNS records for these names exist but can't be used to reach the APIs; create a private zone.
- Cloud Storage custom domain names: pointing DNS at the VIPs isn't enough; set the HTTP Host header and TLS SNI to `storage.googleapis.com`.
- Routing: next hop must be the default internet gateway; routing to Google APIs via other VMs or custom next hops isn't supported. Traffic stays inside Google's network. Google publishes no internet routes for the two VIP ranges. Without an IPv6 default route there is no IPv6 connectivity to Google APIs.
- Firewall: if you have an egress deny to all destinations, add an egress allow rule with higher priority for each range of your chosen domain.
- Default-domain ranges are allocated dynamically and change often; automate the script daily. For strict egress requirements use a Private Service Connect endpoint or a VIP instead. `_spf.google.com` is not a complete list.
- Disabling Private Google Access stops API access for VMs without external IPs and can break connectivity; try it on a disposable subnet first. The script is run as described at https://github.com/GoogleCloudPlatform/networking-tools-python/tree/main/tools/cidr#how-to-run.
- Firestore with MongoDB compatibility (`firestore.goog`) has its own Private Google Access page.
- Adapted from the official docs: the subnet-create example had `[ --stack-type=STACK_TYPE ] \` and `[ --ipv6-access-type=IPv6_ACCESS_TYPE ] \` lines (template brackets) and the script checked `if len(cidrs) != 2:` and raised `ValueError("ERROR: Could process data from Google")`; both are changed as described above.
- The default-domain list includes `gcr.io` / `*.gcr.io` as the source lists them.
- Forms omitted: the source also shows Console steps. The full `gcloud compute` flag lists are in the `gcp-compute` skill (https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/subnets/update).
- Clarified from the official docs: Private Google Access cannot be disabled manually on a subnet range that a Public NAT gateway serves, so the disable command above has no effect on such ranges while the gateway provides NAT for them (Cloud NAT product interactions, https://docs.cloud.google.com/nat/docs/nat-product-interactions, retrieved 2026-11-17).
- Source: https://docs.cloud.google.com/vpc/docs/configure-private-google-access (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [private-google-access.md](./private-google-access.md)
- [private-access-options.md](./private-access-options.md)
- [private-services-access.md](./private-services-access.md)
