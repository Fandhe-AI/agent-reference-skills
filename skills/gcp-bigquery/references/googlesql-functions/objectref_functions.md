---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions
---

# ObjectRef functions

## Signature / Usage

GoogleSQL for BigQuery supports the following ObjectRef functions.

This topic includes functions that let you create and interact with
[`ObjectRef`](https://docs.cloud.google.com/bigquery/docs/work-with-objectref) and
[`ObjectRefRuntime`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions#objectrefruntime)
values.

An `ObjectRef` value represents a Cloud Storage object, including the object
URI, size, type, and similar metadata. It also contains an authorizer, which
identifies the
[Cloud resource connection](https://docs.cloud.google.com/bigquery/docs/create-cloud-resource-connection)
to use to access the Cloud Storage object from BigQuery. An `ObjectRef`
value is a `STRUCT` that has the following format:

```sql
STRUCT {
  uri string,  // Cloud Storage object URI
  version string,  // Cloud Storage object version
  authorizer string,  // Cloud resource connection to use for object access
  details json {  // Cloud Storage managed object metadata
    gcs_metadata json {
      "content_type": string,  // for example, "image/png"
      "md5_hash": string,  // for example, "d9c38814e44028bf7a012131941d5631"
      "size": number,  // for example, 23000
      "updated": number  // for example, 1741374857000000
    }
  }
}
```

The fields in the
`gcs_metadata` JSON refer to the [object metadata](https://docs.cloud.google.com/storage/docs/metadata)
for a Cloud Storage object.

### Function list

| Name | Summary |
|---|---|
| [`OBJ.FETCH_METADATA`](#objfetch_metadata) | Fetches Cloud Storage metadata for a partially populated `ObjectRef` value. |
| [`OBJ.GET_ACCESS_URL`](#objget_access_url) | Returns access URLs for a Cloud Storage object. |
| [`OBJ.GET_READ_URL`](#objget_read_url) | Returns a read URL and status for a Cloud Storage object. |
| [`OBJ.LIST`](#objlist) | Returns a table of metadata and `ObjectRef` values for files stored in Cloud Storage. |
| [`OBJ.MAKE_REF`](#objmake_ref) | Creates an `ObjectRef` value that contains reference information for a Cloud Storage object. |

### `OBJ.FETCH_METADATA`

```sql
OBJ.FETCH_METADATA(
  objectref
)
```

```sql
OBJ.FETCH_METADATA(
  ARRAY<objectref>
)
```

**Description**

The `OBJ.FETCH_METADATA` function returns Cloud Storage metadata for a partially
populated
[`ObjectRef` value](https://docs.cloud.google.com/bigquery/docs/work-with-objectref).

This function lets the `ObjectRef` value use either
[direct access](https://docs.cloud.google.com/bigquery/docs/work-with-objectref#direct-access) or
[delegated access](https://docs.cloud.google.com/bigquery/docs/work-with-objectref#delegated-access) to the
object.

This function still succeeds if there is a problem fetching metadata. In this
case, the `details` field contains an `error` field with the
error message, as shown in the following example:

```text
{
  "details": {
    "errors": [{
      "code":400,
      "message":"Connection credential for projects/myproject/locations/us/connections/connection1 cannot be used. Either the connection does not exist, or the user does not have sufficient permissions to use it.",
      "source":"OBJ.FETCH_METADATA",
    }]
  }
}
```

**Definitions**

- `objectref`: A partially populated `ObjectRef` value, in which the `uri` field is populated, the `authorizer` field is optional, and the `details` field is not populated.

**Output**

If your input is a single `ObjectRef` value, then the function returns
a fully populated `ObjectRef` value. The metadata is provided in the `details`
field of the returned `ObjectRef` value.

If your input is an array of `ObjectRef` values, then the function returns
an array of fully populated `ObjectRef` values. The metadata
is provided in the `details` field of each returned `ObjectRef` value.

**Examples**

The following query populates the metadata fields for an `ObjectRef` value
based on a PNG object in a publicly available Cloud Storage bucket:

```sql
SELECT
  OBJ.FETCH_METADATA(
    OBJ.MAKE_REF("gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/aquaclear-aquarium-background-poster.png", "us.connection1")
  ) AS obj;

/*-----------------------------+------------------+--------------------------+--------------------------------------------------+
 | obj.uri                     | obj.version      | obj.authorizer           | obj.details                                      |
 +-----------------------------+------------------+--------------------------+--------------------------------------------------+
 | gs://cloud-samples-data/... | 1742492679764550 | myproject.us.connection1 | {"gcs_metadata":                                 |
 |                             |                  |                          |   {"content_type":"image/png",                   |
 |                             |                  |                          |   "md5_hash":"e83227b9915e26bf7a42a38f7ce8d415", |
 |                             |                  |                          |   "size":1629498,                                |
 |                             |                  |                          |   "updated":1742492679000000                     |
 |                             |                  |                          |   }                                              |
 |                             |                  |                          | }                                                |
 +-----------------------------+------------------+--------------------------+--------------------------------------------------*/
```

The following query populates the metadata fields for each `ObjectRef` value in
the input array. The result is a single row that contains an array of `ObjectRef`
values.

```sql
SELECT
  OBJ.FETCH_METADATA(
    [
      OBJ.MAKE_REF("gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/aquaclear-aquarium-background-poster.png", "us.connection1"),
      OBJ.MAKE_REF("gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/aquaclear-aquarium-fish-net.png", "us.connection1")
    ]
  ) AS obj;

/*-----------------------------+------------------+--------------------------+--------------------------------------------------+
 | obj.uri                     | obj.version      | obj.authorizer           | obj.details                                      |
 +-----------------------------+------------------+--------------------------+--------------------------------------------------+
 | gs://cloud-samples-data/... | 1742492679764550 | myproject.us.connection1 | {"gcs_metadata":                                 |
 |                             |                  |                          |   {"content_type":"image/png",                   |
 |                             |                  |                          |   "md5_hash":"e83227b9915e26bf7a42a38f7ce8d415", |
 |                             |                  |                          |   "size":1629498,                                |
 |                             |                  |                          |   "updated":1742492679000000                     |
 |                             |                  |                          |   }                                              |
 |                             |                  |                          | }                                                |
 | gs://cloud-samples-data/... | 1742492681709630 | myproject.us.connection1 | {"gcs_metadata":                                 |
 |                             |                  |                          |   {"content_type":"image/png",                   |
 |                             |                  |                          |   "md5_hash":"07715c290072a357a11fb89da940b3cf", |
 |                             |                  |                          |   "size":1163692,                                |
 |                             |                  |                          |   "updated":1742492681000000                     |
 |                             |                  |                          |   }                                              |
 |                             |                  |                          | }                                                |
 +-----------------------------+------------------+--------------------------+--------------------------------------------------*/
```

**Limitations**

You can't have more than 20 Cloud resource connections in the project and
region where your query accesses object data as `ObjectRef` values.

### `OBJ.GET_ACCESS_URL`

```sql
OBJ.GET_ACCESS_URL(
  objectref,
  mode
  [, duration]
)
```

```sql
OBJ.GET_ACCESS_URL(
  ARRAY<objectref>,
  mode
  [, duration]
)
```

**Description**

The `OBJ.GET_ACCESS_URL` function returns a JSON value that contains reference
information for the input
[`ObjectRef`](https://docs.cloud.google.com/bigquery/docs/work-with-objectref)
value, and also
access URLs that you can use to read or modify the Cloud Storage object.

This function requires you to use
[delegated access](https://docs.cloud.google.com/bigquery/docs/work-with-objectref#delegated-access)
to read the object.

If the function encounters an error, the returned JSON contains a
`errors` field with the error message instead of the
`access_urls` field with the access URLs. The following example shows an
error message:

```text
{
  "objectref": {
    "authorizer": "myproject.us.connection1",
    "uri": "gs://mybucket/path/to/file.jpg"
  },
  "errors": [{
    "code":400,
    "message":"Connection credential for projects/myproject/locations/us/connections/connection1 cannot be used. Either the connection does not exist, or the user does not have sufficient permissions to use it.",
    "source":"OBJ.GET_ACCESS_URL",
  }]
}
```

**Definitions**

- `objectref`: An `ObjectRef` value that represents a Cloud Storage object.
- `mode`: A `STRING` value that identifies the type of URL that you want to
  be returned. The following values are supported:

  - `r`: Returns a URL that lets you read the object.
  - `rw`: Returns two URLs, one that lets you read the object, and one that lets you modify the object.
- `duration`: An optional [`INTERVAL`](../googlesql-syntax/data-types.md#interval-type) value that specifies how long
  the generated access URLs remain valid. You can specify a value between
  30 minutes and 6 hours. For example, you could specify
  `INTERVAL 2 HOUR` to generate URLs that expire after 2 hours. The default
  value is 6 hours.

**Output**

A JSON value or array of JSON values that contains the Cloud Storage object
reference
information from the input `ObjectRef` value, and also one or more URLs that
you can use to access the Cloud Storage object.

The JSON output is returned in the `ObjectRefRuntime`
schema:

```text
obj_ref_runtime json {
  obj_ref json {
    uri string, // Cloud Storage object URI
    version string, // Cloud Storage object version
    authorizer string, // Cloud resource connection to use for object access
    details json { // Cloud Storage managed object metadata
      gcs_metadata json {
      }
    }
  }
  access_urls json {
    read_url string, // read-only signed url
    write_url string, // writeable signed url
    expiry_time string // the URL expiration time in YYYY-MM-DD'T'HH:MM:SS'Z' format
  }
}
```

**Example**

This example returns read URLs for all of the image objects associated with
the films in the `mydataset.films` table, where the `poster` column is a
struct in the `ObjectRef` schema. The URLs expire in 45 minutes.

```sql
SELECT
  OBJ.GET_ACCESS_URL(poster, 'r', INTERVAL 45 MINUTE) AS read_url
FROM mydataset.films;
```

**Limitations**

You can't have more than 20 Cloud resource connections in the project and
region where your query accesses object data as `ObjectRef` values.

### `OBJ.GET_READ_URL`

```sql
OBJ.GET_READ_URL(objectref)
```

**Description**

The `OBJ.GET_READ_URL` function returns a `STRUCT` value that contains a read
URL that you can use to read the Cloud Storage object. The URL expires after
45 minutes.

This function requires you to use
[delegated access](https://docs.cloud.google.com/bigquery/docs/work-with-objectref#delegated-access) to read
for the input `ObjectRef` value.

**Definitions**

- `objectref`: an `ObjectRef` value that represents a Cloud Storage object

**Output**

A `STRUCT` value that contains the following fields:

- `url`: a read URL that you can use to read the Cloud Storage object. If the function can't create the read URL, then this value is `NULL`.
- `status`: an error message. If the function successfully creates the read URL, then this value is `NULL`.

**Examples**

In the following example, the `mydataset.films` table has a
`STRUCT` column `poster` that contains values with the `ObjectRef` schema.
The following query returns a read URL for each of the image objects associated
with the films:

```sql
SELECT
  OBJ.GET_READ_URL(poster) AS read_url
FROM mydataset.films;

/*----------------------------------------------------------------+-----------------+
 | read_url.url                                                   | read_url.status |
 +----------------------------------------------------------------+-----------------+
 | https://storage.googleapis.com/posters/poster-1.jpg?X-Goog-... | NULL            |
 +----------------------------------------------------------------+-----------------*/
```

When you run this query in Studio, the `read_url.url` column
displays the images corresponding to the read URLs. To view the text of the
URLs, select the **JSON** tab in the **Query results** pane.

**Limitations**

You can't have more than 20 connections in the project and region in which
your query accesses object data as `ObjectRef` values.

### `OBJ.LIST`

```sql
OBJ.LIST(
  uri
  [, authorizer ]
)
```

**Description**

The `OBJ.LIST` function returns a table of metadata and `ObjectRef` values for
files stored in Cloud Storage. `OBJ.LIST` lets you perform ad hoc discovery
and analysis of unstructured data. The Cloud Storage data can include documents,
images, and audio. The `OBJ.LIST` function can discover objects across all
[Cloud Storage classes](https://docs.cloud.google.com/storage/docs/storage-classes).

Using `OBJ.LIST` replaces the need to manually construct `ObjectRef` values.
You can quickly add Cloud Storage objects into AI functions to build ETL
pipelines that handle converting unstructured data to structured data. If you
require a persistent, self-updating table that continuously tracks new objects
that arrive in a bucket over time, you should create a standard
[BigQuery object table](https://docs.cloud.google.com/bigquery/docs/object-table-introduction)
instead.

For more information, see [Work with `ObjectRef` values](https://docs.cloud.google.com/bigquery/docs/work-with-objectref).

**Definitions**

- `uri`: a `STRING` value that contains the URI for the Cloud Storage
  object, for example, `gs://mybucket/flowers/12345.jpg`. Scalar subqueries
  and string manipulation functions such as `CONCAT` aren't supported.

  You can use one asterisk (`*`) wildcard character in each path to limit the
  objects included in the results. For example, if the bucket contains
  several types of unstructured data, you could list only PDF objects by
  specifying `gs://bucket_name/*.pdf`. For more information, see
  [Wildcard support for URIs](https://docs.cloud.google.com/bigquery/docs/external-data-cloud-storage#wildcard-support).

  > [!NOTE]
  > **Note:** The `OBJ.LIST` function doesn't support uris that end in a slash or uris that contain consecutive slashes. For example, uris such as `gs://mybucket/flowers/` and `gs://mybucket/flowers//12345.jpg` return an error.

- `authorizer`: a `STRING` value that contains the
  [Cloud Resource connection](https://docs.cloud.google.com/bigquery/docs/create-cloud-resource-connection)
  used for [delegated access](https://docs.cloud.google.com/bigquery/docs/work-with-objectref#delegated-access)
  to the Cloud Storage object. Your data administrator needs to set up the
  permissions to use this connection. If omitted, the returned ObjectRef uses
  [direct access](https://docs.cloud.google.com/bigquery/docs/work-with-objectref#direct-access).

**Output**

A table with metadata that represents the objects found in
Cloud Storage. The table includes the following columns:

- `uri`: a `STRING` value that contains the Cloud Storage URI of the object.
- `content_type`: a `STRING` value that contains the MIME type of the object, for example, `image/jpeg` or `application/pdf`.
- `size`: an `INT64` value that contains the object size in bytes.
- `md5_hash`: a `STRING` value that contains the MD5 hash of the object.
- `updated`: a `TIMESTAMP` value that contains the time the object was last updated.
- `metadata`: an `ARRAY<STRUCT<name STRING, value STRING>>` value that contains additional Cloud Storage metadata.
- `generation`: an `INT64` value that identifies the [version of an
  object](https://docs.cloud.google.com/storage/docs/metadata#generation-number), and exists for every object, regardless of whether a bucket uses Object Versioning.
- `ref`: an `ObjectRef` value that represents the object. This value can be passed to other `OBJ` and `AI` functions.

**Examples**

The examples demonstrate how to use `OBJ.LIST` to perform spontaneous analysis
of unstructured data. These examples omit the `authorizer` argument, which means
that the queries use [direct access](https://docs.cloud.google.com/bigquery/docs/work-with-objectref#direct-access).
If your environment requires [delegated access](https://docs.cloud.google.com/bigquery/docs/work-with-objectref#delegated-access),
add the `authorizer` argument to the query.

The following query uses the wildcard character (\*) to discover specific file
types, and it uses the `AI.IF` function to filter unstructured data. This query
lists only the PNG files that contain an image of a dog.

```sql
SELECT
  uri,
  content_type,
  size
FROM
  OBJ.LIST('gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/*.png')
WHERE
  AI.IF(('Does this image contain a dog?', ref))
ORDER BY
  uri;

/*----------------------------------------------------------------+--------------+--------+
 | uri                                                            | content_type | size   |
 +----------------------------------------------------------------+--------------+--------+
 | gs://.../k9-guard-dog-ear-cleaner.png                          | image/png    | 584558 |
 | gs://.../k9-guard-dog-paw-wipes.png                            | image/png    | 785219 |
 | gs://.../k9-guard-dog-toothpaste.png                           | image/png    | 732191 |
 | gs://.../k9-guard-flea-&-tick-shampoo.png                      | image/png    | 1144191|
 | gs://.../playful-pup-dog-training-book.png                     | image/png    | 1106425|
 | gs://.../playful-pup-dog-training-clicker-with-training-dvd.png| image/png    | 1203398|
 +----------------------------------------------------------------+--------------+--------*/
```

The following example combines the `OBJ.LIST` and `AI.GENERATE` functions with
the `output_schema` parameter to build an unstructured-to-structured data
pipeline using a single query. This example reads raw images and extracts
strictly typed properties into standard BigQuery columns without
creating a persistent object table.

```sql
SELECT
  uri,
  result.animal_type,
  result.item_color
FROM (
  SELECT
    uri,
    AI.GENERATE(
      ("What type of animal is this pet product for, and what is its primary color?", ref),
      output_schema => 'animal_type STRING, item_color STRING'
    ) AS result
  FROM
    OBJ.LIST('gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/*.png')
);

/*--------------------------------------------------------------------------+-------------+------------+
 | uri                                                                      | animal_type | item_color |
 +-----------------------------------=--------------------------------------+-------------+------------+
 | gs://cloud-samples-data/.../aquaclear-aquarium-filter-media-bag.png      | fish        | white      |
 | gs://cloud-samples-data/.../cozy-naps-cat-scratching-pad-with-catnip.png | cat         | brown      |
 | gs://cloud-samples-data/.../cozy-naps-cat-teaser-wand.png                | cat         | white      |
 | gs://cloud-samples-data/.../fluffy-buns-chinchilla-play-tunnel.png       | cat         | blue       |
 | gs://cloud-samples-data/.../fluffy-buns-rabbit-hay.png                   | rabbit      | green      |
 | gs://cloud-samples-data/.../k9-guard-dog-muzzle.png                      | dog         | black      |
 | ...                                                                      |             |            |
 +--------------------------------------------------------------------------+-------------+------------*/
```

The following example uses the `AI.IF` function to review a directory of
unstructured files for policy violations based on their semantic, visual, or
audio content. This query reviews a folder of product manuals and returns only
the files that are missing crucial safety warnings.

```sql
SELECT
  uri
FROM
  OBJ.LIST('gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/documents/*')
WHERE
  AI.IF(('Determine if this product manual is missing standard choking hazard safety warnings.', ref))
ORDER BY
  uri;

/*-----------------------------------------------------------------------------+
 | uri                                                                         |
 +-----------------------------------------------------------------------------+
 | gs://cloud-samples-data/.../documents/crittercuisine_5000_user_manual.pdf   |
 +-----------------------------------------------------------------------------*/
```

The following example uses the `OBJ.LIST` function to aggregate references into
arrays to pass multiple files to simultaneously. This
query retrieves three product images, and asks to
synthesize the visual theme of the files.

```sql
WITH product_images AS (
  SELECT ref
  FROM OBJ.LIST('gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/*.png')
  LIMIT 3
)
SELECT
  AI.GENERATE(
    ('What are the common visual themes or branding elements across these pet products?', ARRAY_AGG(ref))
  ).result AS comparison_summary
FROM
  product_images;

/*-----------------------------------------------------------------------------+
 | comparison_summary                                                          |
 +-----------------------------------------------------------------------------+
 | Based on the provided images, the common visual themes or branding elements |
 | across these pet products, which appear to be related to aquariums and      |
 | aquarium accessories, are:                                                  |
 | 1.  **Clean and Minimalist Aesthetics**                                     |
 |     ...                                                                     |
 | 2.  **Focus on Clarity and Transparency (for aquariums)**                   |
 |     ...                                                                     |
 | 3.  **Modern and Neutral Color Palette**                                    |
 |     ...                                                                     |
 | 4.  **Subtle Branding (where visible)**                                     |
 |     ...                                                                     |
 | 5.  **Quality and Durability (implied)**                                    |
 |     ...                                                                     |
 +-----------------------------------------------------------------------------*/
```

**Limitations**

The following object table limitations apply to the `OBJ.LIST` function. Because
`OBJ.LIST` dynamically generates object metadata, it shares many of the same
underlying behaviors and limitations as [object tables](https://docs.cloud.google.com/bigquery/docs/object-table-introduction).

- **Locations**: If you use a BigQuery connection, the connection's location and the query location must be compatible with the Cloud Storage bucket's region.
- **VPC Service Controls** : Access to Cloud Storage data is governed by your organization's [VPC Service Controls perimeters](https://docs.cloud.google.com/vpc-service-controls/docs/service-perimeters).

### `OBJ.MAKE_REF`

This function supports the following syntaxes:

```sql
OBJ.MAKE_REF(
  uri
  [, authorizer ]
  [, version => version_value ]
  [, details => gcs_metadata_json ]
)
```

```sql
OBJ.MAKE_REF(
  objectref_json
)
```

When you use this syntax, the top-level `authorizer` argument overwrites
any `authorizer` that you specify in the `objectref` argument.

```sql
OBJ.MAKE_REF(
  objectref,
  authorizer
)
```

**Description**

Use the `OBJ.MAKE_REF` function to create an
[`ObjectRef` value](https://docs.cloud.google.com/bigquery/docs/work-with-objectref)
that contains reference information for a Cloud Storage object.
You can use this function in workflows similar to the following:

1. Transform an object.
2. Save it to Cloud Storage using a writable signed URL that you created by using the [`OBJ.GET_ACCESS_URL` function](#objget_access_url).
3. Create an `ObjectRef` value for the transformation output by using the `OBJ.MAKE_REF` function.
4. Save the `ObjectRef` value by writing it to a table column.

**Definitions**

- `uri`: A `STRING` value that contains the URI for the Cloud Storage object, for example, `gs://mybucket/flowers/12345.jpg`. You can also specify a column name in place of a string literal. For example, if you have URI data in a `uri` field, you can specify `OBJ.MAKE_REF(uri, "myproject.us.conn")`.
- `authorizer`: A `STRING` value that contains the [Cloud Resource connection](https://docs.cloud.google.com/bigquery/docs/create-cloud-resource-connection) used for [delegated access](https://docs.cloud.google.com/bigquery/docs/work-with-objectref#delegated-access) to the Cloud Storage object. Your data administrator needs to set up the permissions to use this connection. If omitted, the returned ObjectRef uses [direct access](https://docs.cloud.google.com/bigquery/docs/work-with-objectref#direct-access).
- `version_value`: A `STRING` value that represents the Cloud Storage object version.
- `gcs_metadata_json`: A `JSON` value that represents Cloud Storage metadata,
  using the following schema:

  ```text
  gcs_metadata JSON {
      "content_type": string,
      "md5_hash": string,
      "size": number,
      "updated": number
  }
  ```

- `objectref_json`: A `JSON` value that represents a Cloud Storage object,
  using the following schema:

  Adapted (not in the official docs): Removed the comma after `uri string` because each optional field already starts with a comma.

  ```text
  obj_ref json {
    uri string
    [, authorizer string ]
    [, version string]
    [, details gcs_metadata_json ]
  }
  ```

Validation is performed on the formatting of the input, but not the content.

**Output**

An `ObjectRef` value.

- If you provide a URI as input, then the output is a reference to the Cloud Storage object identified by the URI.
- If you provide an ObjectRef JSON value, then the output contains all of the input information formatted as an ObjectRef value.
- If you provide an ObjectRef value and authorizer, then the output contains the input ObjectRef value with an updated authorizer.

**Examples**

The following example creates an `ObjectRef` value using a URI and a Cloud
resource connection as input:

Adapted (not in the official docs): Added the missing comma after `f.director` in the SELECT list.

```sql
CREATE OR REPLACE TABLE `mydataset.movies` AS (
  SELECT
    f.title,
    f.director,
    OBJ.MAKE_REF(p.uri, 'asia-south2.storage_connection') AS movie_poster
  FROM mydataset.movie_posters p
  join mydataset.films f
  using(title)
  where region = 'US'
  and release_year = 2024
);
```

The following example creates an `ObjectRef` value using JSON input:

```sql
OBJ.MAKE_REF(JSON '{"uri": "gs://cloud-samples-data/bigquery/tutorials/cymbal-pets/images/aquaclear-aquarium-background-poster.png", "authorizer": "asia-south2.storage_connection"}');
```

The following example creates a new `ObjectRef` value with an updated
authorizer:

```sql
SELECT
  OBJ.MAKE_REF(movie_poster,
               authorizer=>'asia-south2.new_connection') AS movie_poster_updated
FROM mydataset.movies
```

**Limitations**

You can't have more than 20 Cloud resource connections in the project and
region where your query accesses object data as `ObjectRef` values.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/objectref_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The SELECT list has no comma between `f.director` and `OBJ.MAKE_REF(...)`, which does not parse. A comma is added.
- Corrected from the official docs: The `obj_ref` schema writes `uri string,` followed by `[, authorizer string ]`, so the expanded text would contain a doubled comma. The comma after `uri string` is removed.

## Related

- [Index of this directory](./README.md)
