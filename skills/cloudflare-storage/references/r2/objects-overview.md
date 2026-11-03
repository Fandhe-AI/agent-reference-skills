---
source: https://developers.cloudflare.com/r2/objects/
---

# Objects

Objects are the files or data stored in an R2 bucket, identified by a key such as `images/photo.png`.

## Signature / Usage

```txt
logs/jan.csv
logs/feb.csv   -> shown under a "logs/" folder when "View prefixes as directories" is selected
```

## Notes

- R2 uses a flat storage structure. There are no real directories; the `/` in a key is a delimiter used to group objects by prefix.
- The dashboard groups objects sharing a prefix into folders when **View prefixes as directories** is checked. These folders are visual only and do not exist as separate resources.
- Workers Binding API is documented in the Workers API reference.

## Related

- [Upload objects](./objects-upload.md)
- [Download objects](./objects-download.md)
- [Delete objects](./objects-delete.md)
- [Workers API reference](./workers-api-reference.md)
