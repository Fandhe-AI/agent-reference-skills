---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/dlp_functions
---

# DLP encryption functions

## Signature / Usage

GoogleSQL for BigQuery supports the following DLP functions
that allow interoperable encryption and decryption between BigQuery and
[Cloud Data Loss Prevention (Cloud DLP)](https://cloud.google.com/dlp/docs),
using [AES-SIV](https://cloud.google.com/dlp/docs/pseudonymization#aes-siv).
To use DLP functions, you need a
[new cryptographic key and then use that key to get a wrapped key](https://docs.cloud.google.com/bigquery/docs/column-key-encrypt#wrapped-key-dlp-functions).

### Function list

| Name | Summary |
|---|---|
| [`DLP_DETERMINISTIC_ENCRYPT`](#dlp_deterministic_encrypt) | Encrypts data with a DLP compatible algorithm. |
| [`DLP_DETERMINISTIC_DECRYPT`](#dlp_deterministic_decrypt) | Decrypts DLP-encrypted data. |
| [`DLP_KEY_CHAIN`](#dlp_key_chain) | Gets a data encryption key that's wrapped by Cloud Key Management Service. |

### `DLP_DETERMINISTIC_ENCRYPT`

```sql
DLP_DETERMINISTIC_ENCRYPT(key, plaintext, surrogate)
```

```sql
DLP_DETERMINISTIC_ENCRYPT(key, plaintext, surrogate, context)
```

**Description**

This function derives a data encryption key from `key` and `context`, and then
encrypts `plaintext`. You can use `surrogate` to prepend the
encryption result. To use DLP functions, you need a
[new cryptographic key and then use that key to get a wrapped key](https://docs.cloud.google.com/bigquery/docs/column-key-encrypt#wrapped-key-dlp-functions).

**Definitions**

- `key`: The `STRUCT` value that's returned by [`DLP_KEY_CHAIN`](#dlp_key_chain). `key` must be set to `ENABLED` in Cloud KMS. For information about how to generate a wrapped key, see [gcloud kms encrypt](https://cloud.google.com/sdk/gcloud/reference/kms/encrypt).
- `plaintext`: The `STRING` value to encrypt.
- `surrogate`: A `STRING` value that you can prepend to output. If you don't want to use `surrogate`, pass an empty string (enclosed in `""`).
- `context`: A user-provided `STRING` value that's used with a Cloud KMS key to derive a data encryption key. For more information, see [CryptoDeterministicConfig:context](https://cloud.google.com/dlp/docs/reference/rest/v2/projects.deidentifyTemplates#cryptodeterministicconfig).

**Return data type**

`STRING`

**Examples**

In the following query, the wrapped key is presented in a `BYTES` literal format:

```sql
SELECT
  DLP_DETERMINISTIC_ENCRYPT(
    DLP_KEY_CHAIN(
      'gcp-kms://projects/myproject/locations/us/keyRings/kms-test/cryptoKeys/test-KEK',
      b'\012\044\000\325\155\264\153\246\071\172\130\372\305\103\047\342\356\061\077\014\030\126\147\041\126\150\012\036\020\202\215\044\267\310\331\014\116\233\022\071\000\363\344\230\067\274\007\340\273\016\212\151\226\064\200\377\303\207\103\147\052\267\035\350\004\147\365\251\271\133\062\251\246\152\177\017\005\270\044\141\211\116\337\043\035\263\122\340\110\333\266\220\377\247\204\215\233'),
    'Plaintext',
    '',
    'aad') AS results;

/*--------------------------------------+
 | results                              |
 +--------------------------------------+
 | AWDeSznl9C7+NzTaCgiqiEAZ8Y55fZSuvCQ= |
 +--------------------------------------*/
```

In the following query, the wrapped key is presented in the base64 format:

```sql
DECLARE DLP_KEY_VALUE BYTES;

SET DLP_KEY_VALUE =
  FROM_BASE64(
    'CiQA1W20a6Y5elj6xUMn4u4xPwwYVmchVmgKHhCCjSS3yNkMTpsSOQDz5Jg3vAfguw6KaZY0gP/Dh0NnKrcd6ARn9am5WzKppmp/DwW4JGGJTt8jHbNS4EjbtpD/p4SNmw==');

SELECT
  DLP_DETERMINISTIC_ENCRYPT(
    DLP_KEY_CHAIN(
      'gcp-kms://projects/myproject/locations/us/keyRings/kms-test/cryptoKeys/test-Kek',
      DLP_KEY_VALUE),
    'Plaintext',
    'your_surrogate',
    'aad') AS results;

/*---------------------------------------------------------+
 | results                                                 |
 +---------------------------------------------------------+
 | your_surrogate(36):AWDeSznl9C7+NzTaCgiqiEAZ8Y55fZSuvCQ= |
 +---------------------------------------------------------*/
```

### `DLP_DETERMINISTIC_DECRYPT`

```sql
DLP_DETERMINISTIC_DECRYPT(key, ciphertext, surrogate)
```

```sql
DLP_DETERMINISTIC_DECRYPT(key, ciphertext, surrogate, context)
```

**Description**

This function decrypts `ciphertext` using an encryption key derived from `key`
and `context`. Pass the `surrogate` that `DLP_DETERMINISTIC_ENCRYPT` prepended to
`ciphertext`; it isn't added to the decryption result. To use DLP functions, you need a
[new cryptographic key and then use that key to get a wrapped key](https://docs.cloud.google.com/bigquery/docs/column-key-encrypt#wrapped-key-dlp-functions).

**Definitions**

- `key`: The `STRUCT` value returned by [`DLP_KEY_CHAIN`](#dlp_key_chain). `key` must be set to `ENABLED` in Cloud KMS. For information about how to generate a wrapped key, see [gcloud kms encrypt](https://cloud.google.com/sdk/gcloud/reference/kms/encrypt).
- `ciphertext`: The `STRING` value to decrypt.
- `surrogate`: The `STRING` value that was passed as `surrogate` to `DLP_DETERMINISTIC_ENCRYPT` and prepended to `ciphertext`. If no `surrogate` was used, pass an empty string (enclosed in `""`).
- `context`: A `STRING` value that's used with a Cloud KMS key to derive a data encryption key. For more information, see [CryptoDeterministicConfig:context](https://cloud.google.com/dlp/docs/reference/rest/v2/projects.deidentifyTemplates#cryptodeterministicconfig).

**Return data type**

`STRING`

**Examples**

In the following query, the wrapped key is presented in a `BYTES` literal format:

```sql
SELECT
  DLP_DETERMINISTIC_DECRYPT(
    DLP_KEY_CHAIN(
      'gcp-kms://projects/myproject/locations/us/keyRings/kms-test/cryptoKeys/test-Kek',
      b'\012\044\000\325\155\264\153\246\071\172\130\372\305\103\047\342\356\061\077\014\030\126\147\041\126\150\012\036\020\202\215\044\267\310\331\014\116\233\022\071\000\363\344\230\067\274\007\340\273\016\212\151\226\064\200\377\303\207\103\147\052\267\035\350\004\147\365\251\271\133\062\251\246\152\177\017\005\270\044\141\211\116\337\043\035\263\122\340\110\333\266\220\377\247\204\215\233'),
    'AWDeSznl9C7+NzTaCgiqiEAZ8Y55fZSuvCQ=',
    '',
    'aad') AS results;

/*--------------------------------------+
 | results                              |
 +--------------------------------------+
 | Plaintext                            |
 +--------------------------------------*/
```

In the following query, the wrapped key is presented in the base64 format:

```sql
DECLARE DLP_KEY_VALUE BYTES;

SET DLP_KEY_VALUE =
  FROM_BASE64(
    'CiQA1W20a6Y5elj6xUMn4u4xPwwYVmchVmgKHhCCjSS3yNkMTpsSOQDz5Jg3vAfguw6KaZY0gP/Dh0NnKrcd6ARn9am5WzKppmp/DwW4JGGJTt8jHbNS4EjbtpD/p4SNmw==');

SELECT
  DLP_DETERMINISTIC_DECRYPT(
    DLP_KEY_CHAIN(
      'gcp-kms://projects/myproject/locations/us/keyRings/kms-test/cryptoKeys/test-Kek',
      DLP_KEY_VALUE),
    'your_surrogate(36):AWDeSznl9C7+NzTaCgiqiEAZ8Y55fZSuvCQ=',
    'your_surrogate',
    'aad') AS results;

/*--------------------------------------+
 | results                              |
 +--------------------------------------+
 | Plaintext                            |
 +--------------------------------------*/
```

### `DLP_KEY_CHAIN`

```sql
DLP_KEY_CHAIN(kms_resource_name, wrapped_key)
```

**Description**

You can use this function instead of the `key` argument for
DLP deterministic encryption functions. This function lets
you use the [AES-SIV encryption functions](https://cloud.google.com/dlp/docs/pseudonymization#aes-siv)
without including `plaintext` keys in a query. To use DLP functions, you need a
[new cryptographic key and then use that key to get a wrapped key](https://docs.cloud.google.com/bigquery/docs/column-key-encrypt#wrapped-key-dlp-functions).

**Definitions**

- `kms_resource_name`: A `STRING` literal that contains the resource path to the
  Cloud KMS key. `kms_resource_name` can't be `NULL` and must reside
  in the same Cloud region where this function is executed. This argument is
  used to derive the data encryption key in the `DLP_DETERMINISTIC_DECRYPT` and
  `DLP_DETERMINISTIC_ENCRYPT` functions. A Cloud KMS key looks like
  this:

  ```sql
  gcp-kms://projects/my-project/locations/us/keyRings/my-key-ring/cryptoKeys/my-crypto-key
  ```

- `wrapped_key`: A `BYTES` literal that represents a secret text chosen by the
  user, wrapped (encrypted) with the Cloud KMS key. The secret text before
  wrapping can be 16, 24, or 32 bytes; the wrapped value is longer. For information about
  how to generate a wrapped key, see [gcloud kms encrypt](https://cloud.google.com/sdk/gcloud/reference/kms/encrypt).

**Return data type**

`STRUCT`

**Examples**

In the following query, the wrapped key is presented in a `BYTES` literal format:

```sql
SELECT
  DLP_DETERMINISTIC_ENCRYPT(
    DLP_KEY_CHAIN(
      'gcp-kms://projects/myproject/locations/us/keyRings/kms-test/cryptoKeys/test-Kek',
      b'\012\044\000\325\155\264\153\246\071\172\130\372\305\103\047\342\356\061\077\014\030\126\147\041\126\150\012\036\020\202\215\044\267\310\331\014\116\233\022\071\000\363\344\230\067\274\007\340\273\016\212\151\226\064\200\377\303\207\103\147\052\267\035\350\004\147\365\251\271\133\062\251\246\152\177\017\005\270\044\141\211\116\337\043\035\263\122\340\110\333\266\220\377\247\204\215\233'),
    'Plaintext',
    '',
    'aad') AS results;

/*--------------------------------------+
 | results                              |
 +--------------------------------------+
 | AWDeSznl9C7+NzTaCgiqiEAZ8Y55fZSuvCQ= |
 +--------------------------------------*/
```

In the following query, the wrapped key is presented in the base64 format:

```sql
DECLARE DLP_KEY_VALUE BYTES;

SET DLP_KEY_VALUE =
  FROM_BASE64(
    'CiQA1W20a6Y5elj6xUMn4u4xPwwYVmchVmgKHhCCjSS3yNkMTpsSOQDz5Jg3vAfguw6KaZY0gP/Dh0NnKrcd6ARn9am5WzKppmp/DwW4JGGJTt8jHbNS4EjbtpD/p4SNmw==');

SELECT
  DLP_DETERMINISTIC_ENCRYPT(
    DLP_KEY_CHAIN(
      'gcp-kms://projects/myproject/locations/us/keyRings/kms-test/cryptoKeys/test-Kek',
      DLP_KEY_VALUE),
    'Plaintext',
    '',
    'aad') AS results;

/*--------------------------------------+
 | results                              |
 +--------------------------------------+
 | AWDeSznl9C7+NzTaCgiqiEAZ8Y55fZSuvCQ= |
 +--------------------------------------*/
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/dlp_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Caution: the first `DLP_DETERMINISTIC_ENCRYPT` example uses the KMS key name `.../cryptoKeys/test-KEK`, while the other examples on this page use `test-Kek`. Both examples show the same ciphertext. The page does not say which spelling is right, so it is kept as published.
- Corrected from the official docs: the `DLP_DETERMINISTIC_ENCRYPT` definition of `key` says it is a serialized `BYTES` value returned by `DLP_KEY_CHAIN`, but the `DLP_KEY_CHAIN` section on this page gives its return data type as `STRUCT`, and every example passes the `DLP_KEY_CHAIN(...)` call itself; the type is changed to `STRUCT`.
- Corrected from the official docs: the `DLP_DETERMINISTIC_DECRYPT` definition of `key` has the same `BYTES` statement; it is changed to `STRUCT`, the return data type of `DLP_KEY_CHAIN` on this page.
- Corrected from the official docs: the `DLP_DETERMINISTIC_DECRYPT` description and its `surrogate` definition say `surrogate` is prepended to the decryption result. In this section's base64 example the ciphertext is `'your_surrogate(36):AWDeSznl9C7+NzTaCgiqiEAZ8Y55fZSuvCQ='`, `surrogate` is `'your_surrogate'`, and the result is `Plaintext` with no prefix; the encryption examples show that `DLP_DETERMINISTIC_ENCRYPT` adds that prefix. Both sentences are changed to describe `surrogate` as the value that identifies the prefix on `ciphertext`.
- Corrected from the official docs: the `wrapped_key` definition says the argument is the user's secret text of 16, 24, or 32 bytes. The argument is that secret after it is wrapped with the Cloud KMS key (the definition links to `gcloud kms encrypt` for generating it, and the function is described as avoiding plaintext keys in a query); the wrapped key in this page's base64 example decodes to 97 bytes. The length limit is moved to the secret before wrapping.

## Related

- [Index of this directory](./README.md)
