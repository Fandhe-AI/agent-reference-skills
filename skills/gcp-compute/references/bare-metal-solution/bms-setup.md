---
source: https://docs.cloud.google.com/bare-metal/docs/bms-setup
---

# Set up Google Cloud to work with your Bare Metal Solution environment

After Google Cloud notifies you that your environment is ready (with the internal IP addresses of the servers), create redundant VLAN attachments, set up routing and firewall rules, create a jump host VM in your VPC network, log in over SSH or RDP, and optionally set up internet and Google API access.

## Signature / Usage

Prerequisites: a project with billing enabled; the VPC network you named in the order; the server IP addresses and temporary passwords provided by Google Cloud.

### Create redundant VLAN attachments (gcloud)

Cloud Router for peering must use Google Public ASN `16550` (a Cloud Router can have only one ASN):

```bash
gcloud compute routers create router-name \
--network vpc-network-name \
--asn 16550 \
--region region
```

Create the `PARTNER` attachments, one per edge availability domain, pre-activated with `--admin-enabled`:

```bash
gcloud compute interconnects attachments partner create first-attachment-name \
  --region region \
  --router first-router-name \
  --edge-availability-domain availability-domain-1 \
  --admin-enabled
```

```bash
gcloud compute interconnects attachments partner create second-attachment-name \
  --region region \
  --router second-router-name \
  --edge-availability-domain availability-domain-2 \
  --admin-enabled
```

Inspect an attachment with `gcloud compute interconnects attachments describe` (state is `PENDING_PARTNER` until Google Cloud completes configuration, then `INACTIVE` or `ACTIVE`). If attachments do not come up after the order completes, activate each one with `gcloud compute interconnects attachments partner update attachment-name --region region --admin-enabled` (the source shows both commands; omitted here).

### Custom advertised default route on BGP sessions

Replace existing custom advertisements:

```bash
gcloud compute routers update-bgp-peer router-name \
   --peer-name bgp-session-name \
   --advertisement-mode custom \
   --set-advertisement-ranges 0.0.0.0/0
```

Append to existing ones (advertisement mode must already be `custom`):

```bash
gcloud compute routers update-bgp-peer router-name \
   --peer-name bgp-session-name \
   --add-advertisement-ranges 0.0.0.0/0
```

### VPC firewall rule

Create an ingress or egress rule with `gcloud compute firewall-rules create rule-name --direction=INGRESS --priority=1000 --network=your-network-name --action=ALLOW --rules=protocol:port --source-ranges=ip-range --target-tags=instance-network-tag` (full template omitted; see Notes for how to scope it).

### First login from the jump host

Servers have no external IPs; use a jump host VM created in the same region (or a bastion host). Check reachability, then log in as `customeradmin` with the temporary password:

```bash
ping bare-metal-ip
```

```bash
ssh customeradmin@bare-metal-ip
```

You must change the password on first login (the server then logs you out); log in again with the new password. Changing the root password is also recommended (the source uses `sudo su -`, then `passwd`, then `exit` to return to the `customeradmin` prompt).

Then confirm the server matches your order (CPUs, sockets, memory; OS or hypervisor vendor and version; storage type and amount).

### Internet access, Method 1: one NAT VM plus Cloud NAT

Create the NAT gateway VM (drop `--service-account=` if you do not specify one; the default service account is then used):

```bash
gcloud compute instances create instance-name \
  --machine-type=machine-type-name \
  --network vpc-network-name \
  --subnet=subnet-name \
  --can-ip-forward \
  --zone=your-zone \
  --image-family=os-image-family-name \
  --image-project=os-image-project \
  --tags=natgw-network-tag \
  --service-account=optional-service-account-email
```

Configure forwarding and masquerading on the VM (Debian commands):

Adapted (not in the official docs): removed the shell prompt `$`.

```bash
sudo sysctl -w net.ipv4.ip_forward=1
```

Adapted (not in the official docs): removed the shell prompt `$`.

```bash
sudo iptables -t nat -A POSTROUTING \
   -o $(/bin/ip -o -4 route show to default | awk '{print $5}') -j MASQUERADE
```

To keep the NAT gateway settings across a reboot, the source runs `sudo -i`, writes `net.ipv4.ip_forward=1` to `/etc/sysctl.d/70-natgw.conf` and installs `iptables-persistent` (omitted).

Route to the default internet gateway first, with a tag so existing VMs keep using it, then the NAT route at a lower priority (higher number):

```bash
gcloud compute routes create default-internet-gateway-route-name \
    --destination-range=0.0.0.0/0 \
    --network=network-name \
    --priority=default-igw-route-priority \
    --tags=natgw-network-tag,default-igw-tags \
    --next-hop-gateway=default-internet-gateway
```

```bash
gcloud compute routes create natgw-route-name \
    --destination-range=0.0.0.0/0 \
    --network=network-name \
    --priority=natgw-route-priority \
    --next-hop-instance=natgw-vm-name \
    --next-hop-instance-zone=natgw-vm-zone
```

### Internet access, Method 2: redundant VMs, Cloud NAT, internal passthrough Network Load Balancer, policy-based routing

Health-check web server (source commands, comments included):

```bash
# Installing http server

sudo yum install httpd
sudo systemctl restart httpd

# Testing

curl http://127.0.0.1:80
```

Create an instance group:

```bash
gcloud compute instance-groups unmanaged create INSTANCE_GROUP_NAME --project=PROJECT_ID --zone=ZONE
```

Add the VM to the instance group:

```bash
gcloud compute instance-groups unmanaged add-instances INSTANCE_GROUP_NAME --project=PROJECT_ID --zone=ZONE --instances=VM_NAME
```

Internet policy-based route (`SOURCE_RANGE` = "the source IP CIDR range. In this case, this is the Bare Metal Solution IP address", `NEXT_HOP` = the load balancer frontend IPv4 address, `REGION` = region of the VLAN attachment):

```bash
gcloud network-connectivity policy-based-routes create ROUTE_NAME \
 --source-range=SOURCE_RANGE \
 --destination-range=0.0.0.0/0 \
 --ip-protocol=ALL \
 --network="projects/PROJECT_ID/global/networks/NETWORK" \
 --next-hop-ilb-ip=NEXT_HOP \
 --description="DESCRIPTION" \
 --priority=PRIORITY \
 --interconnect-attachment-region=REGION
```

Skip route for on-premises and local subnets (its priority must be less than or equal to the internet route's priority value; the source passes `SOURCE_RANGE/32`, so `SOURCE_RANGE` here is the single Bare Metal Solution IP address used in the internet route, see Notes):

```bash
gcloud network-connectivity policy-based-routes create ROUTE_NAME \
--source-range=SOURCE_RANGE/32 \
--destination-range=DESTINATION_RANGE \
--ip-protocol=ALL \
--network="projects/PROJECT_ID/global/networks/VPC_NAME" \
--next-hop-other-routes="DEFAULT_ROUTING" \
--description="DESCRIPTION" \
--priority=PRIORITY \
--interconnect-attachment-region=REGION
```

Load balancer health check: protocol `HTTP`, port `80`, request path `/`; frontend ports `80,8008,8080,8088`. Allow HTTP port 80 on the VM in the firewall or health checks fail.

### Internet access, Method 3: Method 2 in a separate VPC

Create a custom-mode VPC network and a subnet for internet access, then two Cloud Routers with custom advertisement of `0.0.0.0/0` (`gcloud compute networks create`, `gcloud compute networks subnets create`, `gcloud compute routers create ... --advertisement-mode=custom --set-advertisement-ranges=0.0.0.0/0`; commands omitted). Create four VLAN attachments (two per router), then follow Method 2 but create only the internet policy-based route (no local-traffic route).

## Options / Props

| Item | Value |
|------|-------|
| VLAN attachment max speed | 10 Gbps single; 20 Gbps per redundant pair; use multiple pairs for more |
| Pair placement | Primary and secondary in separate edge availability domains (EAD), separate hardware and racks; choose the same metro (city) for both |
| Cloud Router ASN | `16550` (Google Public ASN) |
| VLAN attachment MTU choices | 1440 (default), 1460, 1500, 8896; jumbo frame (8896) not supported for Bare Metal Solution, use 1500 consistently |
| Attachment states | `PENDING_PARTNER`, then `INACTIVE` or `ACTIVE` |
| Default VPC firewall | Egress allowed, ingress blocked; stateful, so replies to VPC-initiated connections are allowed |
| Jump host login user | `customeradmin` |

## Notes

- Create an ingress rule only if servers must initiate connections to VPC resources; create an egress rule only if you restricted egress to the Bare Metal Solution IP range. Prefer narrow `--source-ranges` (the Bare Metal Solution ranges) and specific ports; do not use `0.0.0.0/0` for SSH/RDP. Traffic control inside the environment is your responsibility.
- Connection checklist if `ping` fails: attachments `Up`; custom advertised `0.0.0.0/0`; restrictive egress rules allow the Bare Metal Solution IP range.
- Store the new passwords safely; never put them in metadata or startup scripts.
- Method 1 warning (from the source): it uses a global untagged route, so other VMs would route internet traffic through the NAT VM unless tagged with `default-igw-tags`; tag existing VMs first, then create the NAT route. `natgw-route-priority` must be a higher number (lower priority) than `default-igw-route-priority`. For production the source strongly recommends Method 2. In a shared VPC service project use `--next-hop-address` instead of `--next-hop-instance` / `--next-hop-instance-zone` and run against the host project.
- Cloud NAT cannot be used standalone for Bare Metal Solution internet access (no transitive endpoints); a Compute Engine VM is required. Prefer Cloud NAT over an external IP on the VM.
- The NAT VM example uses the default Compute Engine service account if none is given; prefer a dedicated least-privilege service account (`--service-account`).
- For a separate internet VPC (Method 3), an existing local BGP session must not advertise `0.0.0.0/0` toward Bare Metal Solution; only the internet VPC should.
- Google API access: follow https://docs.cloud.google.com/vpc/docs/configure-private-google-access-hybrid (routes for Google API traffic; resolve `*.googleapis.com` as a `CNAME` to `restricted.googleapis.com`).
- For Oracle databases, the open source Toolkit for Bare Metal Solution (https://github.com/google/bms-toolkit) installs Oracle software.
- Distance line: VPC networks, firewall policies, Cloud Router and Cloud NAT themselves are in `gcp-networking`, and Cloud Load Balancing in `gcp-load-balancing`; the VM-side settings are here.
- Omitted: the firewall-rule command block (summarized above), the attachment `describe` and `partner update` commands, the root password change commands, the persist-across-reboot commands for Method 1, and the three Method 3 commands (VPC network, subnet, Cloud Routers). The source also shows Console steps for VLAN attachments, routes, firewall rules, VM creation and the load balancer (omitted), and a sample `describe` output.
- Corrected from the official docs: the source writes the two NAT gateway commands with a leading `$` prompt (`$ sudo sysctl -w net.ipv4.ip_forward=1`, `$ sudo iptables -t nat -A POSTROUTING ...`); the prompt is removed so that pasting the blocks does not fail with `$: command not found`.
- Both routes in Method 2 must cover the same source. The source defines `SOURCE_RANGE` as "the Bare Metal Solution IP address" and appends `/32` only in the skip route. If you give the internet route a CIDR range (for example several servers), pass that same CIDR without `/32` to the skip route; otherwise traffic from the other addresses to on-premises and local subnets matches only the internet route.
- Source: https://docs.cloud.google.com/bare-metal/docs/bms-setup (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [bms-planning.md](./bms-planning.md)
- [bms-iam.md](./bms-iam.md)
- [bms-ssh-keys.md](./bms-ssh-keys.md)
