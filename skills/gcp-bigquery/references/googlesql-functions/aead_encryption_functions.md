---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/aead_encryption_functions
---

# AEAD encryption functions

## Signature / Usage

GoogleSQL for BigQuery supports the following AEAD encryption functions.
For a description of how the AEAD encryption
functions work, see [AEAD encryption concepts](https://docs.cloud.google.com/bigquery/docs/aead-encryption-concepts).

### Function list

| Name | Summary |
|---|---|
| [`AEAD.DECRYPT_BYTES`](#aeaddecrypt_bytes) | Uses the matching key from a keyset to decrypt a `BYTES` ciphertext. |
| [`AEAD.DECRYPT_STRING`](#aeaddecrypt_string) | Uses the matching key from a keyset to decrypt a `BYTES` ciphertext into a `STRING` plaintext. |
| [`AEAD.ENCRYPT`](#aeadencrypt) | Encrypts `STRING` plaintext, using the primary cryptographic key in a keyset. |
| [`DETERMINISTIC_DECRYPT_BYTES`](#deterministic_decrypt_bytes) | Uses the matching key from a keyset to decrypt a `BYTES` ciphertext, using deterministic AEAD. |
| [`DETERMINISTIC_DECRYPT_STRING`](#deterministic_decrypt_string) | Uses the matching key from a keyset to decrypt a `BYTES` ciphertext into a `STRING` plaintext, using deterministic AEAD. |
| [`DETERMINISTIC_ENCRYPT`](#deterministic_encrypt) | Encrypts `STRING` plaintext, using the primary cryptographic key in a keyset, using deterministic AEAD encryption. |
| [`KEYS.ADD_KEY_FROM_RAW_BYTES`](#keysadd_key_from_raw_bytes) | Adds a key to a keyset, and return the new keyset as a serialized `BYTES` value. |
| [`KEYS.KEYSET_CHAIN`](#keyskeyset_chain) | Produces a Tink keyset that's encrypted with a Cloud KMS key. |
| [`KEYS.KEYSET_FROM_JSON`](#keyskeyset_from_json) | Converts a `STRING` JSON keyset to a serialized `BYTES` value. |
| [`KEYS.KEYSET_LENGTH`](#keyskeyset_length) | Gets the number of keys in the provided keyset. |
| [`KEYS.KEYSET_TO_JSON`](#keyskeyset_to_json) | Gets a JSON `STRING` representation of a keyset. |
| [`KEYS.NEW_KEYSET`](#keysnew_keyset) | Gets a serialized keyset containing a new key based on the key type. |
| [`KEYS.NEW_WRAPPED_KEYSET`](#keysnew_wrapped_keyset) | Creates a new keyset and encrypts it with a Cloud KMS key. |
| [`KEYS.REWRAP_KEYSET`](#keysrewrap_keyset) | Re-encrypts a wrapped keyset with a new Cloud KMS key. |
| [`KEYS.ROTATE_KEYSET`](#keysrotate_keyset) | Adds a new primary cryptographic key to a keyset, based on the key type. |
| [`KEYS.ROTATE_WRAPPED_KEYSET`](#keysrotate_wrapped_keyset) | Rewraps a keyset and rotates it. |

### `AEAD.DECRYPT_BYTES`

```sql
AEAD.DECRYPT_BYTES(keyset, ciphertext, additional_data)
```

**Description**

Uses the matching key from `keyset` to decrypt `ciphertext` and verifies the
integrity of the data using `additional_data`. Returns an error if decryption or
verification fails.

`keyset` is a serialized `BYTES` value returned by one of the
`KEYS` functions or a `STRUCT` returned by
`KEYS.KEYSET_CHAIN`. `keyset` must contain the key that was used to
encrypt `ciphertext`, and the key must be in an `'ENABLED'` state, or else the
function returns an error. `AEAD.DECRYPT_BYTES` identifies the matching key
in `keyset` by finding the key with the key ID that matches the one encrypted in
`ciphertext`.

`ciphertext` is a `BYTES` value that's the result of
a call to `AEAD.ENCRYPT` where the input `plaintext` was of type
`BYTES`.

If `ciphertext` includes an initialization vector (IV),
it should be the first bytes of `ciphertext`. If `ciphertext` includes an
authentication tag, it should be the last bytes of `ciphertext`. If the
IV and authentic tag are one (SIV), it should be the first bytes of
`ciphertext`. The IV and authentication tag commonly require 16 bytes, but may
vary in size.

`additional_data` is a `STRING` or `BYTES` value that binds the ciphertext to
its context. This forces the ciphertext to be decrypted in the same context in
which it was encrypted. This function casts any
`STRING` value to `BYTES`.
This must be the same as the `additional_data` provided to `AEAD.ENCRYPT` to
encrypt `ciphertext`, ignoring its type, or else the function returns an error.

**Return Data Type**

`BYTES`

**Example**

This example creates a table of unique IDs with associated plaintext values and
keysets. Then it uses these keysets to encrypt the plaintext values as
`BYTES` and store them in a new table. Finally, it
uses `AEAD.DECRYPT_BYTES` to decrypt the encrypted values and display them as
plaintext.

The following statement creates a table `CustomerKeysets` containing a column of
unique IDs, a column of `AEAD_AES_GCM_256` keysets, and a column of favorite
animals.

```sql
CREATE TABLE aead.CustomerKeysets AS
SELECT
  1 AS customer_id,
  KEYS.NEW_KEYSET('AEAD_AES_GCM_256') AS keyset,
  b'jaguar' AS favorite_animal
UNION ALL
SELECT
  2 AS customer_id,
  KEYS.NEW_KEYSET('AEAD_AES_GCM_256') AS keyset,
  b'zebra' AS favorite_animal
UNION ALL
SELECT
  3 AS customer_id,
  KEYS.NEW_KEYSET('AEAD_AES_GCM_256') AS keyset,
  b'nautilus' AS favorite_animal;
```

The following statement creates a table `EncryptedCustomerData` containing a
column of unique IDs and a column of ciphertext. The statement encrypts the
plaintext `favorite_animal` using the keyset value from `CustomerKeysets`
corresponding to each unique ID.

```sql
CREATE TABLE aead.EncryptedCustomerData AS
SELECT
  customer_id,
  AEAD.ENCRYPT(keyset, favorite_animal, CAST(CAST(customer_id AS STRING) AS BYTES))
   AS encrypted_animal
FROM
  aead.CustomerKeysets AS ck;
```

The following query uses the keysets in the `CustomerKeysets` table to decrypt
data in the `EncryptedCustomerData` table.

```sql
SELECT
  ecd.customer_id,
  AEAD.DECRYPT_BYTES(
    (SELECT ck.keyset
     FROM aead.CustomerKeysets AS ck
     WHERE ecd.customer_id = ck.customer_id),
    ecd.encrypted_animal,
    CAST(CAST(customer_id AS STRING) AS BYTES)
  ) AS favorite_animal
FROM aead.EncryptedCustomerData AS ecd;
```

### `AEAD.DECRYPT_STRING`

```sql
AEAD.DECRYPT_STRING(keyset, ciphertext, additional_data)
```

**Description**

Like [`AEAD.DECRYPT_BYTES`](#aeaddecrypt_bytes), but where `additional_data` is
of type `STRING`.

**Return Data Type**

`STRING`

### `AEAD.ENCRYPT`

```sql
AEAD.ENCRYPT(keyset, plaintext, additional_data)
```

**Description**

Encrypts `plaintext` using the primary cryptographic key in `keyset`. The
algorithm of the primary key must be `AEAD_AES_GCM_256`. Binds the ciphertext to
the context defined by `additional_data`. Returns `NULL` if any input is `NULL`.

`keyset` is a serialized `BYTES` value returned by one of the
`KEYS` functions or a `STRUCT` returned by
`KEYS.KEYSET_CHAIN`.

`plaintext` is the `STRING` or
`BYTES` value to be encrypted.

`additional_data` is a `STRING` or `BYTES` value that binds the ciphertext to
its context. This forces the ciphertext to be decrypted in the same context in
which it was encrypted. `plaintext` and `additional_data` must be of the same
type. `AEAD.ENCRYPT(keyset, string1, string2)` is equivalent to
`AEAD.ENCRYPT(keyset, CAST(string1 AS BYTES), CAST(string2 AS BYTES))`.

The output is ciphertext `BYTES`. The ciphertext contains a
[Tink-specific](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) prefix indicating the key used to perform the encryption.

**Return Data Type**

`BYTES`

**Example**

The following query uses the keysets for each `customer_id` in the
`CustomerKeysets` table to encrypt the value of the plaintext `favorite_animal`
in the `PlaintextCustomerData` table corresponding to that `customer_id`. The
output contains a column of `customer_id` values and a column of
corresponding ciphertext output as `BYTES`.

```sql
WITH CustomerKeysets AS (
  SELECT 1 AS customer_id, KEYS.NEW_KEYSET('AEAD_AES_GCM_256') AS keyset UNION ALL
  SELECT 2, KEYS.NEW_KEYSET('AEAD_AES_GCM_256') UNION ALL
  SELECT 3, KEYS.NEW_KEYSET('AEAD_AES_GCM_256')
), PlaintextCustomerData AS (
  SELECT 1 AS customer_id, 'elephant' AS favorite_animal UNION ALL
  SELECT 2, 'walrus' UNION ALL
  SELECT 3, 'leopard'
)
SELECT
  pcd.customer_id,
  AEAD.ENCRYPT(
    (SELECT keyset
     FROM CustomerKeysets AS ck
     WHERE ck.customer_id = pcd.customer_id),
    pcd.favorite_animal,
    CAST(pcd.customer_id AS STRING)
  ) AS encrypted_animal
FROM PlaintextCustomerData AS pcd;
```

### `DETERMINISTIC_DECRYPT_BYTES`

```sql
DETERMINISTIC_DECRYPT_BYTES(keyset, ciphertext, additional_data)
```

**Description**

Uses the matching key from `keyset` to decrypt `ciphertext` and verifies the
integrity of the data using `additional_data`. Returns an error if decryption
fails.

`keyset` is a serialized `BYTES` value or a `STRUCT`
value returned by one of the `KEYS` functions. `keyset` must contain
the key that was used to encrypt `ciphertext`, the key must be in an `'ENABLED'`
state, and the key must be of type `DETERMINISTIC_AEAD_AES_SIV_CMAC_256`, or
else the function returns an error. `DETERMINISTIC_DECRYPT_BYTES` identifies the
matching key in `keyset` by finding the key with the key ID that matches the one
encrypted in `ciphertext`.

`ciphertext` is a `BYTES` value that's the result of a call to
`DETERMINISTIC_ENCRYPT` where the input `plaintext` was of type `BYTES`.

The ciphertext must follow Tink's [wire format](https://developers.google.com/tink/wire-format#deterministic_aead). The first
byte of `ciphertext` should contain a Tink key version followed by a 4 byte key
hint. If `ciphertext` includes an initialization vector (IV), it should be the
next bytes of `ciphertext`. If `ciphertext` includes an authentication tag, it
should be the last bytes of `ciphertext`. If the IV and authentic tag are one
(SIV), it should be the first bytes of `ciphertext`. The IV and authentication
tag commonly require 16 bytes, but may vary in size.

`additional_data` is a `STRING` or `BYTES` value that binds the ciphertext to
its context. This forces the ciphertext to be decrypted in the same context in
which it was encrypted. This function casts any `STRING` value to `BYTES`. This
must be the same as the `additional_data` provided to `DETERMINISTIC_ENCRYPT` to
encrypt `ciphertext`, ignoring its type, or else the function returns an error.

**Return Data Type**

`BYTES`

**Example**

This example creates a table of unique IDs with associated plaintext values and
keysets. Then it uses these keysets to encrypt the plaintext values as `BYTES`
and store them in a new table. Finally, it uses `DETERMINISTIC_DECRYPT_BYTES` to
decrypt the encrypted values and display them as plaintext.

The following statement creates a table `CustomerKeysets` containing a column of
unique IDs, a column of `DETERMINISTIC_AEAD_AES_SIV_CMAC_256` keysets, and a
column of favorite animals.

```sql
CREATE TABLE deterministic.CustomerKeysets AS
SELECT
  1 AS customer_id,
  KEYS.NEW_KEYSET('DETERMINISTIC_AEAD_AES_SIV_CMAC_256') AS keyset,
  b'jaguar' AS favorite_animal
UNION ALL
SELECT
  2 AS customer_id,
  KEYS.NEW_KEYSET('DETERMINISTIC_AEAD_AES_SIV_CMAC_256') AS keyset,
  b'zebra' AS favorite_animal
UNION ALL
SELECT
  3 AS customer_id,
  KEYS.NEW_KEYSET('DETERMINISTIC_AEAD_AES_SIV_CMAC_256') AS keyset,
  b'nautilus' AS favorite_animal;
```

The following statement creates a table `EncryptedCustomerData` containing a
column of unique IDs and a column of ciphertext. The statement encrypts the
plaintext `favorite_animal` using the keyset value from `CustomerKeysets`
corresponding to each unique ID.

```sql
CREATE TABLE deterministic.EncryptedCustomerData AS
SELECT
  customer_id,
  DETERMINISTIC_ENCRYPT(ck.keyset, favorite_animal, CAST(CAST(customer_id AS STRING) AS BYTES))
   AS encrypted_animal
FROM
  deterministic.CustomerKeysets AS ck;
```

The following query uses the keysets in the `CustomerKeysets` table to decrypt
data in the `EncryptedCustomerData` table.

```sql
SELECT
  ecd.customer_id,
  DETERMINISTIC_DECRYPT_BYTES(
    (SELECT ck.keyset
     FROM deterministic.CustomerKeysets AS ck
     WHERE ecd.customer_id = ck.customer_id),
    ecd.encrypted_animal,
    CAST(CAST(ecd.customer_id AS STRING) AS BYTES)
  ) AS favorite_animal
FROM deterministic.EncryptedCustomerData AS ecd;
```

### `DETERMINISTIC_DECRYPT_STRING`

```sql
DETERMINISTIC_DECRYPT_STRING(keyset, ciphertext, additional_data)
```

**Description**

Like [`DETERMINISTIC_DECRYPT_BYTES`](#deterministic_decrypt_bytes), but where
`plaintext` is of type `STRING`.

**Return Data Type**

`STRING`

### `DETERMINISTIC_ENCRYPT`

```sql
DETERMINISTIC_ENCRYPT(keyset, plaintext, additional_data)
```

**Description**

Encrypts `plaintext` using the primary cryptographic key in `keyset` using
[deterministic AEAD](https://developers.google.com/tink/deterministic-aead). The algorithm of the primary key must
be `DETERMINISTIC_AEAD_AES_SIV_CMAC_256`. Binds the ciphertext to the context
defined by `additional_data`. Returns `NULL` if any input is `NULL`.

`keyset` is a serialized `BYTES` value or a `STRUCT`
value returned by one of the `KEYS` functions.

`plaintext` is the `STRING` or `BYTES` value to be encrypted.

`additional_data` is a `STRING` or `BYTES` value that binds the ciphertext to
its context. This forces the ciphertext to be decrypted in the same context in
which it was encrypted. `plaintext` and `additional_data` must be of the same
type. `DETERMINISTIC_ENCRYPT(keyset, string1, string2)` is equivalent to
`DETERMINISTIC_ENCRYPT(keyset, CAST(string1 AS BYTES), CAST(string2 AS BYTES))`.

The output is ciphertext `BYTES`. The ciphertext contains a
[Tink-specific](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) prefix indicating the key used to perform the encryption.
Given an identical `keyset`, `plaintext` and `additional_data`, this function returns the same
ciphertext each time it's invoked (including across queries).

**Return Data Type**

`BYTES`

**Example**

The following query uses the keysets for each `customer_id` in the
`CustomerKeysets` table to encrypt the value of the plaintext `favorite_animal`
in the `PlaintextCustomerData` table corresponding to that `customer_id`. The
output contains a column of `customer_id` values and a column of corresponding
ciphertext output as `BYTES`.

```sql
WITH CustomerKeysets AS (
  SELECT 1 AS customer_id,
  KEYS.NEW_KEYSET('DETERMINISTIC_AEAD_AES_SIV_CMAC_256') AS keyset UNION ALL
  SELECT 2, KEYS.NEW_KEYSET('DETERMINISTIC_AEAD_AES_SIV_CMAC_256') UNION ALL
  SELECT 3, KEYS.NEW_KEYSET('DETERMINISTIC_AEAD_AES_SIV_CMAC_256')
), PlaintextCustomerData AS (
  SELECT 1 AS customer_id, 'elephant' AS favorite_animal UNION ALL
  SELECT 2, 'walrus' UNION ALL
  SELECT 3, 'leopard'
)
SELECT
  pcd.customer_id,
  DETERMINISTIC_ENCRYPT(
    (SELECT keyset
     FROM CustomerKeysets AS ck
     WHERE ck.customer_id = pcd.customer_id),
    pcd.favorite_animal,
    CAST(pcd.customer_id AS STRING)
  ) AS encrypted_animal
FROM PlaintextCustomerData AS pcd;
```

### `KEYS.ADD_KEY_FROM_RAW_BYTES`

```sql
KEYS.ADD_KEY_FROM_RAW_BYTES(keyset, key_type, raw_key_bytes)
```

**Description**

Returns a serialized keyset as `BYTES` with the
addition of a key to `keyset` based on `key_type` and `raw_key_bytes`.

The primary cryptographic key remains the same as in `keyset`. The expected
length of `raw_key_bytes` depends on the value of `key_type`. The following are
supported `key_types`:

- `'AES_CBC_PKCS'`: Creates a key for AES decryption using cipher block chaining and PKCS padding. `raw_key_bytes` is expected to be a raw key `BYTES` value of length 16, 24, or 32; these lengths have sizes of 128, 192, and 256 bits, respectively. GoogleSQL AEAD functions don't support keys of these types for encryption; instead, prefer `'AEAD_AES_GCM_256'` or `'AES_GCM'` keys.
- `'AES_GCM'`: Creates a key for AES decryption or encryption using [Galois/Counter Mode](https://en.wikipedia.org/wiki/Galois/Counter_Mode). `raw_key_bytes` must be a raw key `BYTES` value of length 16 or 32; these lengths have sizes of 128 and 256 bits, respectively. When keys of this type are inputs to `AEAD.ENCRYPT`, the output ciphertext doesn't have a Tink-specific prefix indicating which key was used as input.

**Return Data Type**

`BYTES`

**Example**

The following query creates a table of customer IDs along with raw key bytes,
called `CustomerRawKeys`, and a table of unique IDs, called `CustomerIds`. It
creates a new `'AEAD_AES_GCM_256'` keyset for each `customer_id`; then it adds a
new key to each keyset, using the `raw_key_bytes` value corresponding to that
`customer_id`. The output is a table where each row contains a `customer_id` and
a keyset in `BYTES`, which contains the raw key added
using KEYS.ADD_KEY_FROM_RAW_BYTES.

```sql
WITH CustomerRawKeys AS (
  SELECT 1 AS customer_id, b'0123456789012345' AS raw_key_bytes UNION ALL
  SELECT 2, b'9876543210543210' UNION ALL
  SELECT 3, b'0123012301230123'
), CustomerIds AS (
  SELECT 1 AS customer_id UNION ALL
  SELECT 2 UNION ALL
  SELECT 3
)
SELECT
  ci.customer_id,
  KEYS.ADD_KEY_FROM_RAW_BYTES(
    KEYS.NEW_KEYSET('AEAD_AES_GCM_256'),
    'AES_CBC_PKCS',
    (SELECT raw_key_bytes FROM CustomerRawKeys AS crk
     WHERE crk.customer_id = ci.customer_id)
  ) AS keyset
FROM CustomerIds AS ci;
```

The output keysets each contain two things: the primary cryptographic key
created using `KEYS.NEW_KEYSET('AEAD_AES_GCM_256')`, and the raw key added using
`KEYS.ADD_KEY_FROM_RAW_BYTES`. If a keyset in the output is used with
`AEAD.ENCRYPT`, GoogleSQL uses the primary cryptographic key created
using `KEYS.NEW_KEYSET('AEAD_AES_GCM_256')` to encrypt the input plaintext. If
the keyset is used with `AEAD.DECRYPT_STRING` or `AEAD.DECRYPT_BYTES`,
GoogleSQL returns the resulting plaintext if either key succeeds in
decrypting the ciphertext.

### `KEYS.KEYSET_CHAIN`

```sql
KEYS.KEYSET_CHAIN(kms_resource_name, first_level_keyset)
```

**Description**

Can be used in place of the `keyset` argument to the AEAD
and deterministic
encryption functions to pass a [Tink](https://github.com/google/tink/blob/master/docs/KEY-MANAGEMENT.md) keyset that's encrypted
with a [Cloud KMS key](https://cloud.google.com/kms/docs/resource-hierarchy). This function lets you use
other AEAD functions without including plaintext keys in a query.

This function takes the following arguments:

- `kms_resource_name`: A `STRING` literal that contains the resource path to
  the Cloud KMS key that's used to decrypt `first_level_keyset`.
  This key must reside in the same Cloud region where this function is executed.
  A Cloud KMS key looks like this:

  ```sql
  gcp-kms://projects/my-project/locations/us/keyRings/my-key-ring/cryptoKeys/my-crypto-key
  ```

- `first_level_keyset`: A `BYTES` literal that represents a [keyset](https://docs.cloud.google.com/bigquery/docs/aead-encryption-concepts#keysets)
  or [wrapped keyset](https://docs.cloud.google.com/bigquery/docs/aead-encryption-concepts#wrapped_keysets).

**Return Data Type**

`STRUCT`

**Example**

This example creates a table of example data, then shows how to encrypt that
data using a wrapped (encrypted) keyset. Finally it shows how to query the
encrypted version of the data.

The following statement creates a table `RawCustomerData` containing a column of
customer ids and a column of favorite animals.

```sql
CREATE TABLE aead.RawCustomerData AS
SELECT
  1 AS customer_id,
  b'jaguar' AS favorite_animal
UNION ALL
SELECT
  2 AS customer_id,
  b'zebra' AS favorite_animal
UNION ALL
SELECT
  3 AS customer_id,
  b'zebra' AS favorite_animal;
```

The following statement creates a table `EncryptedCustomerData` containing a
column of unique IDs and a column of ciphertext. The statement encrypts the
plaintext `favorite_animal` using the first_level_keyset provided.

```sql
DECLARE kms_resource_name STRING;
DECLARE first_level_keyset BYTES;
SET kms_resource_name = 'gcp-kms://projects/my-project/locations/us/keyRings/my-key-ring/cryptoKeys/my-crypto-key';
SET first_level_keyset = b'\012\044\000\107\275\360\176\264\206\332\235\215\304...';

CREATE TABLE aead.EncryptedCustomerData AS
SELECT
  customer_id,
  AEAD.ENCRYPT(
    KEYS.KEYSET_CHAIN(kms_resource_name, first_level_keyset),
    favorite_animal,
    CAST(CAST(customer_id AS STRING) AS BYTES)
  ) AS encrypted_animal
FROM
  aead.RawCustomerData;
```

The following query uses the first_level_keyset to decrypt data in the
`EncryptedCustomerData` table.

```sql
DECLARE kms_resource_name STRING;
DECLARE first_level_keyset BYTES;
SET kms_resource_name = 'gcp-kms://projects/my-project/locations/us/keyRings/my-key-ring/cryptoKeys/my-crypto-key';
SET first_level_keyset = b'\012\044\000\107\275\360\176\264\206\332\235\215\304...';

SELECT
  customer_id,
  AEAD.DECRYPT_BYTES(
    KEYS.KEYSET_CHAIN(kms_resource_name, first_level_keyset),
    encrypted_animal,
    CAST(CAST(customer_id AS STRING) AS BYTES)
  ) AS favorite_animal
FROM
  aead.EncryptedCustomerData;
```

The previous two steps also work with the `DETERMINISTIC_ENCRYPT` and
`DETERMINISTIC_DECRYPT_BYTES` functions. The wrapped keyset must be created
using the `DETERMINISTIC_AEAD_AES_SIV_CMAC_256` type.

The following statement creates a table `EncryptedCustomerData` containing a
column of unique IDs and a column of ciphertext. The statement encrypts the
plaintext `favorite_animal` using the first_level_keyset provided. You can see
that the ciphertext for `favorite_animal` is the same for customers 2 and 3
since their plaintext `favorite_animal` is the same.

Adapted (not in the official docs): corrected the misspelled function name `DETERMINISTC_ENCRYPT` to `DETERMINISTIC_ENCRYPT`, and the input table `daead.RawCustomerData`, which this page never creates, is changed to `aead.RawCustomerData`, the table created at the start of this example.

```sql
DECLARE kms_resource_name STRING;
DECLARE first_level_keyset BYTES;
SET kms_resource_name = 'gcp-kms://projects/my-project/locations/us/keyRings/my-key-ring/cryptoKeys/my-crypto-key';
SET first_level_keyset = b'\012\044\000\107\275\360\176\264\206\332\235\215\304...';

CREATE TABLE daead.EncryptedCustomerData AS
SELECT
  customer_id,
  DETERMINISTIC_ENCRYPT(
    KEYS.KEYSET_CHAIN(kms_resource_name, first_level_keyset),
    favorite_animal,
    CAST(CAST(customer_id AS STRING) AS BYTES)
  ) AS encrypted_animal
FROM
  aead.RawCustomerData;
```

The following query uses the first_level_keyset to decrypt data in the
`EncryptedCustomerData` table.

Adapted (not in the official docs): corrected the dataset name `dead` to `daead`.

```sql
DECLARE kms_resource_name STRING;
DECLARE first_level_keyset BYTES;
SET kms_resource_name = 'gcp-kms://projects/my-project/locations/us/keyRings/my-key-ring/cryptoKeys/my-crypto-key';
SET first_level_keyset = b'\012\044\000\107\275\360\176\264\206\332\235\215\304...';

SELECT
  customer_id,
  DETERMINISTIC_DECRYPT_BYTES(
    KEYS.KEYSET_CHAIN(kms_resource_name, first_level_keyset),
    encrypted_animal,
    CAST(CAST(customer_id AS STRING) AS BYTES)
  ) AS favorite_animal
FROM daead.EncryptedCustomerData;
```

### `KEYS.KEYSET_FROM_JSON`

```sql
KEYS.KEYSET_FROM_JSON(json_keyset)
```

**Description**

Returns the input `json_keyset` `STRING` as
serialized `BYTES`, which is a valid input for other
`KEYS` and `AEAD` functions. The JSON `STRING` must
be compatible with the definition of the
[google.crypto.tink.Keyset](https://github.com/google/tink/blob/master/proto/tink.proto)
protocol buffer message: the JSON keyset should be a JSON object containing
objects and name-value pairs corresponding to those in the "keyset" message in
the google.crypto.tink.Keyset definition. You can convert the output serialized
`BYTES` representation back to a JSON
`STRING` using `KEYS.KEYSET_TO_JSON`.

**Return Data Type**

`BYTES`

**Example**

`KEYS.KEYSET_FROM_JSON` takes JSON-formatted `STRING`
values like the following:

```json
{
  "key":[
      {
        "keyData":{
          "keyMaterialType":"SYMMETRIC",
          "typeUrl":"type.googleapis.com/google.crypto.tink.AesGcmKey",
          "value":"GiD80Z8kL6AP3iSNHhqseZGAIvq7TVQzClT7FQy8YwK3OQ=="
        },
        "keyId":3101427138,
        "outputPrefixType":"TINK",
        "status":"ENABLED"
      }
    ],
  "primaryKeyId":3101427138
}
```

The following query creates a new keyset from a JSON-formatted
`STRING` `json_keyset`:

```sql
SELECT KEYS.KEYSET_FROM_JSON(json_keyset);
```

This returns the `json_keyset` serialized as `BYTES`, like the following:

```sql
\x08\x9d\x8e\x85\x82\x09\x12d\x0aX\x0a0
type.googleapis.com/google.crypto.tink.AesGcmKey\x12\"\x1a qX\xe4IG\x87\x1f\xde
\xe3)+e\x98\x0a\x1c}\xfe\x88<\x12\xeb\xc1t\xb8\x83\x1a\xcd\xa8\x97\x84g\x18\x01
\x10\x01\x18\x9d\x8e\x85\x82\x09 \x01
```

### `KEYS.KEYSET_LENGTH`

```sql
KEYS.KEYSET_LENGTH(keyset)
```

**Description**

Returns the number of keys in the provided keyset.

**Return Data Type**

`INT64`

**Example**

This example references a JSON-formatted STRING
called `json_keyset` that contains two keys:

```json
{
   "primaryKeyId":1354994251,
   "key":[
      {
         "keyData":{
            "keyMaterialType":"SYMMETRIC",
            "typeUrl":"type.googleapis.com/google.crypto.tink.AesGcmKey",
            "value":"GiD9sxQRgFj4aYN78vaIlxInjZkG/uvyWSY9a8GN+ELV2Q=="
         },
         "keyId":1354994251,
         "outputPrefixType":"TINK",
         "status":"ENABLED"
      }
   ],
   "key":[
      {
         "keyData":{
            "keyMaterialType":"SYMMETRIC",
            "typeUrl":"type.googleapis.com/google.crypto.tink.AesGcmKey",
            "value":"PRn76sxQRgFj4aYN00vaIlxInjZkG/uvyWSY9a2bLRm"
         },
         "keyId":852264701,
         "outputPrefixType":"TINK",
         "status":"DISABLED"
      }
   ]
}
```

The following query converts `json_keyset` to a keyset and then returns
the number of keys in the keyset:

```sql
SELECT KEYS.KEYSET_LENGTH(KEYS.KEYSET_FROM_JSON(json_keyset)) as key_count;

/*-----------+
 | key_count |
 +-----------+
 | 2         |
 +-----------*/
```

### `KEYS.KEYSET_TO_JSON`

```sql
KEYS.KEYSET_TO_JSON(keyset)
```

**Description**

Returns a JSON `STRING` representation of the input
`keyset`. The returned JSON `STRING` is compatible
with the definition of the
[google.crypto.tink.Keyset](https://github.com/google/tink/blob/master/proto/tink.proto)
protocol buffer message. You can convert the JSON
`STRING` representation back to
`BYTES` using `KEYS.KEYSET_FROM_JSON`.

**Return Data Type**

`STRING`

**Example**

The following query returns a new `'AEAD_AES_GCM_256'` keyset as a
JSON-formatted `STRING`.

```sql
SELECT KEYS.KEYSET_TO_JSON(KEYS.NEW_KEYSET('AEAD_AES_GCM_256'));
```

The result is a `STRING` like the following.

```json
{
  "key":[
      {
        "keyData":{
          "keyMaterialType":"SYMMETRIC",
          "typeUrl":"type.googleapis.com/google.crypto.tink.AesGcmKey",
          "value":"GiD80Z8kL6AP3iSNHhqseZGAIvq7TVQzClT7FQy8YwK3OQ=="
        },
        "keyId":3101427138,
        "outputPrefixType":"TINK",
        "status":"ENABLED"
      }
    ],
  "primaryKeyId":3101427138
}
```

### `KEYS.NEW_KEYSET`

```sql
KEYS.NEW_KEYSET(key_type)
```

**Description**

Returns a serialized keyset containing a new key based on `key_type`. The
returned keyset is a serialized `BYTES`
representation of
[google.crypto.tink.Keyset](https://github.com/google/tink/blob/master/proto/tink.proto)
that contains a primary cryptographic key and no additional keys. You can use
the keyset with the `AEAD.ENCRYPT`, `AEAD.DECRYPT_BYTES`, and
`AEAD.DECRYPT_STRING` functions for encryption and decryption, as well as with
the `KEYS` group of key- and keyset-related functions.

`key_type` is a `STRING` literal representation of the type of key to create.
`key_type` can't be `NULL`. `key_type` can be:

- `AEAD_AES_GCM_256`: Creates a 256-bit key with the pseudo-random number generator provided by [boringSSL](https://boringssl.googlesource.com/boringssl/). The key uses AES-GCM for encryption and decryption operations.
- `DETERMINISTIC_AEAD_AES_SIV_CMAC_256`: Creates a 512-bit `AES-SIV-CMAC` key, which contains a 256-bit `AES-CTR` key and 256-bit `AES-CMAC` key. The `AES-SIV-CMAC` key is created with the pseudo-random number generator provided by [boringSSL](https://boringssl.googlesource.com/boringssl/). The key uses AES-SIV for encryption and decryption operations.

**Return Data Type**

`BYTES`

**Example**

The following query creates a keyset for each row in `CustomerIds`, which can
subsequently be used to encrypt data. Each keyset contains a single encryption
key with randomly-generated key data. Each row in the output contains a
`customer_id` and an `'AEAD_AES_GCM_256'` key in
`BYTES`.

```sql
SELECT customer_id, KEYS.NEW_KEYSET('AEAD_AES_GCM_256') AS keyset
FROM (
  SELECT 1 AS customer_id UNION ALL
  SELECT 2 UNION ALL
  SELECT 3
) AS CustomerIds;
```

### `KEYS.NEW_WRAPPED_KEYSET`

```sql
KEYS.NEW_WRAPPED_KEYSET(kms_resource_name, key_type)
```

**Description**

Creates a new keyset and encrypts it with a
[Cloud KMS key](https://cloud.google.com/kms/docs/resource-hierarchy).
Returns the [wrapped keyset](https://docs.cloud.google.com/bigquery/docs/aead-encryption-concepts#wrapped_keysets) as a `BYTES`
representation of [google.crypto.tink.Keyset](https://github.com/google/tink/blob/master/proto/tink.proto)
that contains a primary cryptographic key and no additional keys.

This function takes the following arguments:

- `kms_resource_name`: A `STRING` literal representation of the
  Cloud KMS key. `kms_resource_name` can't be `NULL`. The
  Cloud KMS key must reside in the same Cloud region where this
  function is executed. A Cloud KMS key looks like this:

  ```sql
  gcp-kms://projects/my-project/locations/us/keyRings/my-key-ring/cryptoKeys/my-crypto-key
  ```

- `key_type`: A `STRING` literal representation of the keyset type.
  `key_type` can't be `NULL` but can be one of the following values:

  - `AEAD_AES_GCM_256`: Creates a 256-bit key with the pseudo-random number
    generator provided by [boringSSL](https://boringssl.googlesource.com/boringssl/). The key uses AES-GCM for
    encryption and decryption operations.

  - `DETERMINISTIC_AEAD_AES_SIV_CMAC_256`:
    Creates a 512-bit `AES-SIV-CMAC` key, which contains a 256-bit `AES-CTR` key
    and 256-bit `AES-CMAC` key. The `AES-SIV-CMAC` key is created with the
    pseudo-random number generator provided by [boringSSL](https://boringssl.googlesource.com/boringssl/). The key
    uses AES-SIV for encryption and decryption operations.

**Return Data Type**

`BYTES`

**Example**

Put the following variables above each example query that you run:

```sql
DECLARE kms_resource_name STRING;
SET kms_resource_name = 'gcp-kms://projects/my-project/locations/us/keyRings/my-key-ring/cryptoKeys/my-crypto-key';
```

The following query creates a wrapped keyset, which contains the ciphertext
produced by encrypting a [Tink](https://github.com/google/tink/blob/master/proto/tink.proto) keyset
with the specified Cloud KMS key. If you run the query multiple times,
it generates multiple wrapped keysets, and each wrapped keyset is unique to
each query that's run.

```sql
SELECT KEYS.NEW_WRAPPED_KEYSET(kms_resource_name, 'AEAD_AES_GCM_256');
```

Multiple calls to this function with the same arguments in one query
returns the same value. For example, the following query only creates one
wrapped keyset and returns it for each row in a table called `my_table`.

```sql
SELECT
  *,
  KEYS.NEW_WRAPPED_KEYSET(kms_resource_name, 'AEAD_AES_GCM_256')
FROM my_table
```

### `KEYS.REWRAP_KEYSET`

```sql
KEYS.REWRAP_KEYSET(source_kms_resource_name, target_kms_resource_name, wrapped_keyset)
```

**Description**

Re-encrypts a [wrapped keyset](https://docs.cloud.google.com/bigquery/docs/aead-encryption-concepts#wrapped_keysets) with a new
[Cloud KMS key](https://cloud.google.com/kms/docs/resource-hierarchy). Returns the wrapped keyset as a
`BYTES` representation of [google.crypto.tink.Keyset](https://github.com/google/tink/blob/master/proto/tink.proto)
that contains a primary cryptographic key and no additional keys.

When this function is used, a wrapped keyset is decrypted by
`source_kms_resource_name` and then re-encrypted by `target_kms_resource_name`.
During this process, the decrypted keyset is never visible to customers.

This function takes the following arguments:

- `source_kms_resource_name`: A `STRING` literal representation of the
  Cloud KMS key you want to replace. This key must reside in the same
  Cloud region where this function is executed. A Cloud KMS key looks
  like this:

  ```sql
  gcp-kms://projects/my-project/locations/us/keyRings/my-key-ring/cryptoKeys/my-crypto-key
  ```

- `target_kms_resource_name`: A `STRING` literal representation of the
  new Cloud KMS key that you want to use.

- `wrapped_keyset`: A `BYTES` literal representation of the
  keyset that you want to re-encrypt.

**Return Data Type**

`BYTES`

**Example**

Put the following variables above each example query that you run:

```sql
DECLARE source_kms_resource_name STRING;
DECLARE target_kms_resource_name STRING;
DECLARE wrapped_keyset BYTES;
SET source_kms_resource_name = 'gcp-kms://projects/my-project/locations/us/keyRings/my-key-ring/cryptoKeys/my-crypto-key';
SET target_kms_resource_name = 'gcp-kms://projects/my-project/locations/another-location/keyRings/my-key-ring/cryptoKeys/my-other-crypto-key';
SET wrapped_keyset = b'\012\044\000\107\275\360\176\264\206\332\235\215\304...';
```

The following query rewraps a wrapped keyset. If you run the query multiple
times, it generates multiple wrapped keysets, and each wrapped keyset is unique
to each query that's run.

```sql
SELECT KEYS.REWRAP_KEYSET(source_kms_resource_name, target_kms_resource_name, wrapped_keyset);
```

Multiple calls to this function with the same arguments in one query
returns the same value. For example, the following query only creates one
wrapped keyset and returns it for each row in a table called `my_table`.

```sql
SELECT
  *,
  KEYS.REWRAP_KEYSET(source_kms_resource_name, target_kms_resource_name, wrapped_keyset)
FROM my_table
```

### `KEYS.ROTATE_KEYSET`

```sql
KEYS.ROTATE_KEYSET(keyset, key_type)
```

**Description**

Adds a new key to `keyset` based on `key_type`. This new key becomes the primary
cryptographic key of the new keyset. Returns the new keyset serialized as
`BYTES`.

The old primary cryptographic key from the input `keyset` remains an additional
key in the returned keyset.

The new `key_type` must match the key type of existing keys in the `keyset`.

**Return Data Type**

`BYTES`

**Example**

The following statement creates a table containing a column of unique
`customer_id` values and `'AEAD_AES_GCM_256'` keysets. Then, it creates a new
primary cryptographic key within each keyset in the source table using
`KEYS.ROTATE_KEYSET`. Each row in the output contains a `customer_id` and an
`'AEAD_AES_GCM_256'` keyset in `BYTES`.

```sql
WITH ExistingKeysets AS (
SELECT 1 AS customer_id, KEYS.NEW_KEYSET('AEAD_AES_GCM_256') AS keyset
    UNION ALL
  SELECT 2, KEYS.NEW_KEYSET('AEAD_AES_GCM_256') UNION ALL
  SELECT 3, KEYS.NEW_KEYSET('AEAD_AES_GCM_256')
)
SELECT customer_id, KEYS.ROTATE_KEYSET(keyset, 'AEAD_AES_GCM_256') AS keyset
FROM ExistingKeysets;
```

### `KEYS.ROTATE_WRAPPED_KEYSET`

```sql
KEYS.ROTATE_WRAPPED_KEYSET(kms_resource_name, wrapped_keyset, key_type)
```

**Description**

Takes an existing [wrapped keyset](https://docs.cloud.google.com/bigquery/docs/aead-encryption-concepts#wrapped_keysets) and returns a rotated and
rewrapped keyset. The returned wrapped keyset is a `BYTES`
representation of [google.crypto.tink.Keyset](https://github.com/google/tink/blob/master/proto/tink.proto).

When this function is used, the wrapped keyset is decrypted,
the new key is added, and then the keyset is re-encrypted. The primary
cryptographic key from the input `wrapped_keyset` remains as an
additional key in the returned keyset. During this rotation process,
the decrypted keyset is never visible to customers.

This function takes the following arguments:

- `kms_resource_name`: A `STRING` literal representation of the
  [Cloud KMS key](https://cloud.google.com/kms/docs/resource-hierarchy) that was used to wrap the
  wrapped keyset. The Cloud KMS key must reside in the same Cloud
  region where this function is executed. A Cloud KMS key looks like
  this:

  ```sql
  gcp-kms://projects/my-project/locations/us/keyRings/my-key-ring/cryptoKeys/my-crypto-key
  ```

- `wrapped_keyset`: A `BYTES` literal representation of the
  existing keyset that you want to work with.

- `key_type`: A `STRING` literal representation of the keyset type. This must
  match the key type of existing keys in `wrapped_keyset`.

**Return Data Type**

`BYTES`

**Example**

Put the following variables above each example query that you run:

```sql
DECLARE kms_resource_name STRING;
DECLARE wrapped_keyset BYTES;
SET kms_resource_name = 'gcp-kms://projects/my-project/locations/us/keyRings/my-key-ring/cryptoKeys/my-crypto-key';
SET wrapped_keyset = b'\012\044\000\107\275\360\176\264\206\332\235\215\304...';
```

The following query rotates a wrapped keyset. If you run the query multiple
times, it generates multiple wrapped keysets, and each wrapped keyset is unique
to each query that's run.

```sql
SELECT KEYS.ROTATE_WRAPPED_KEYSET(kms_resource_name, wrapped_keyset, 'AEAD_AES_GCM_256');
```

Multiple calls to this function with the same arguments in one query
returns the same value. For example, the following query only creates one
wrapped keyset and returns it for each row in a table called `my_table`.

```sql
SELECT
  *,
  KEYS.ROTATE_WRAPPED_KEYSET(kms_resource_name, wrapped_keyset, 'AEAD_AES_GCM_256')
FROM my_table
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/aead_encryption_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: the example called `DETERMINISTC_ENCRYPT`, which is a misspelling; it is changed to `DETERMINISTIC_ENCRYPT`, the name given in the `DETERMINISTIC_ENCRYPT` syntax on the same page. It also reads `daead.RawCustomerData`, which no step on this page creates; the input is changed to `aead.RawCustomerData`, the table that the first statement of this example creates.
- Corrected from the official docs: the decrypt query read from `dead.EncryptedCustomerData`, but the previous example creates `daead.EncryptedCustomerData`; the dataset name is changed to `daead`.
- Caution: the official example `json_keyset` repeats the `"key"` member twice in one JSON object (one per key) although the text says it contains two keys. A JSON object with duplicate names keeps only the first in a JSON value (see the "No strict validation" note in the JSON functions page). The intended form (for example one `"key"` array with two elements) is not stated, so the example is kept as published.
- Corrected from the official docs: the `DETERMINISTIC_ENCRYPT` description says the same ciphertext is returned for an identical `keyset` and `plaintext`. The same description says that `additional_data` binds the ciphertext to its context and must be passed again to decrypt it, so `additional_data` must also be identical; it is added to the condition.
- Caution: the text before the `daead.EncryptedCustomerData` example says the ciphertext is the same for customers 2 and 3 because their plaintext is the same. The example passes each row's `customer_id` as `additional_data`, and customers 2 and 3 have different IDs, so their ciphertexts differ; the same ciphertext is produced only when `keyset`, `plaintext` and `additional_data` are all identical. The official text is kept as published.

## Related

- [Index of this directory](./README.md)
