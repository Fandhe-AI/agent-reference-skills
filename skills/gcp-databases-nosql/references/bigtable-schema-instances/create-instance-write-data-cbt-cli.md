---
source: https://docs.cloud.google.com/bigtable/docs/create-instance-write-data-cbt-cli
---

# Create an instance and write data with the cbt CLI

Quickstart: create a Bigtable instance (in the Console), connect with the `cbt` CLI, create a table and column family, write and read data, and clean up.

## Signature / Usage

### Install cbt

```text
gcloud components install cbt
```

### Connect (replace PROJECT_ID with the project that holds the instance)

```bash
echo project = PROJECT_ID >> ~/.cbtrc && echo instance = quickstart-instance >> ~/.cbtrc
```

```bash
cat ~/.cbtrc
```

### Create a table and column family

```bash
cbt createtable my-table
```

```bash
cbt ls
```

```bash
cbt createfamily my-table cf1
```

```bash
cbt ls my-table
```

Output: `cf1` with GC policy `<never>`.

### Write and read

```bash
cbt set my-table r1 cf1:c1=test-value1
  cbt set my-table r1 cf1:c1=test-value2
```

```bash
cbt read my-table
```

Output (two timestamped values in the same column of row `r1`):

```text
    ---
    r1
      cf1:c1                                   @ 2023/03/22-06:56:11.323000
        "test-value1"
      cf1:c1                                   @ 2023/03/22-06:56:04.361000
        "test-value2"
```

### Clean up (destructive)

```bash
cbt deletetable my-table
```

```bash
cbt deleteinstance quickstart-instance
```

```bash
rm ~/.cbtrc
```

```bash
gcloud auth revoke
```

## Options / Props

| Console field | Value |
|---------------|-------|
| Instance name / ID | `Quickstart instance` / `quickstart-instance` |
| Storage type | SSD |
| Cluster ID | `quickstart-instance-c1` |
| Region / Zone | A region near you / Any |
| Node scaling mode / Quantity | Manual allocation / 1 |

## Notes

- Limit: a single write request can set up to 10,000 cells.
- `cbt deletetable`, `cbt deleteinstance` and `rm ~/.cbtrc` are destructive; run them only on disposable resources, and try the quickstart on a disposable instance first. `gcloud auth revoke` is optional.
- The instance is created through the Google Cloud console (Create instance page); the source has no gcloud form here, see creating-instance.md.
- The second `cbt set` line is indented in the source and kept verbatim.
- Bigtable: wide-column NoSQL database, not a relational database; its SQL (GoogleSQL for Bigtable) is not Cloud SQL / Spanner (`gcp-databases-relational`).
- Source: https://docs.cloud.google.com/bigtable/docs/create-instance-write-data-cbt-cli (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-instance.md](./creating-instance.md)
- [schema-design-steps.md](./schema-design-steps.md)
- [garbage-collection.md](./garbage-collection.md)
