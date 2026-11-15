---
source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/overview
---

# Transfer Appliance overview

Transfer Appliance is a high-capacity storage device you fill with data and ship to a Google upload facility, which uploads the data to Cloud Storage. Online mode can instead stream copied data directly to your bucket.

## Signature / Usage

How it works: (1) request an appliance; (2) upload data (Linux and macOS mount the appliance NFS share; Windows uses SCP, SSH or SMB); (3) seal and ship the appliance back; (4) Google uploads the data to your Cloud Storage bucket and wipes the appliance; (5) access the data in Google Cloud.

Mounting the NFS share on Linux:

```bash
sudo mkdir /mnt/data
```

```bash
sudo mount -o vers=4 IP_ADDRESS:/mnt/ta_data /mnt/data
```

Replace `IP_ADDRESS` with the IP address of the appliance.

## Options / Props

| Feature | Detail |
|---|---|
| Encryption | AES 256; customer-managed keys via Cloud KMS; NIST 800-88 compliant erasure (wipe certificate on request) |
| Hardware trust | Tamper-resistant case with tamper-evident tags; TPM chip with PCR validation; remote hardware attestation |
| Performance | All SSD; 10Gbps RJ45 or 100Gbps QSFP28; scale with multiple appliances |
| Online mode | Stream copied data to Cloud Storage; connect to multiple appliances in parallel; can toggle online/offline (only if ordered online-capable) |
| Good fit when | existing Google Cloud customer; data in an available location; upload over the network would take more than one week |

Availability:

| Location | TA40 and TA300 (Rackable) | TA40 (Freestanding) | TA300 (Freestanding) |
|---|---|---|---|
| United States | Yes | Yes | Yes |
| EU member states, United Kingdom, Singapore, Japan, Canada, India | Yes | No | No |

For other countries see the Order Appliance page in the console, or contact data-support@google.com.

## Notes

- Speed example: at 100 Mbps, 300 TB takes about 9 months to upload; with Transfer Appliance, capture takes under 25 days, with data typically in Cloud Storage within another 10 business days. Very small files make rehydration slow.
- EU: appliances ship from Belgium; with an EU destination region, data never leaves the EU during the transfer.
- Other options: Storage Transfer Service (https://docs.cloud.google.com/storage-transfer/docs/overview), BigQuery Data Transfer Service (SaaS to BigQuery), transfer service for on-premises data.
- Snippet taken from https://docs.cloud.google.com/transfer-appliance/docs/4.0/transfer-data.
- Source: https://docs.cloud.google.com/transfer-appliance/docs/4.0/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [procedure-guide.md](./procedure-guide.md)
- [transfer-data.md](./transfer-data.md)
- [security-and-encryption.md](./security-and-encryption.md)
- [known-limitations.md](./known-limitations.md)
