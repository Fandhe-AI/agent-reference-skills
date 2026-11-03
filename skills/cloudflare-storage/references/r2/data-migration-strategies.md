---
source: https://developers.cloudflare.com/r2/data-migration/migration-strategies/
---

# Migration strategies

Combine Super Slurper and Sippy to migrate all objects with minimal downtime.

## Signature / Usage

```txt
Source bucket actively read/written:
  1. Enable Sippy, start using the R2 bucket in your application.
  2. Run a Super Slurper one-off job; Destination R2 bucket > Overwrite files? = "Skip existing".

Source bucket rarely read:
  1. Super Slurper copies all objects to R2.
  2. Enable Sippy on the R2 bucket, start using R2; objects uploaded during the copy are fetched on demand.
```

## Notes

- Super Slurper may skip objects uploaded after it lists the objects to copy.
- Performance: up to three concurrent Slurper jobs per account, each processes a set number of requests per second. Split the migration into smaller concurrent jobs via **Source bucket** > **Define rules** > **Bucket subpath**.
- Example prefixes for a `photos` tree: `/photos/2024` (all 2024 files) and `/photos/202` (2023 and 2024 files). Each prefix is an independent job, so a failure in one does not interrupt the others.

## Related

- [Super Slurper](./data-migration-super-slurper.md)
- [Sippy](./data-migration-sippy.md)
