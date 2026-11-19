---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions
---

# Geography functions (part 2 of 2)

## Signature / Usage

### `ST_MAKEPOLYGONORIENTED`

```sql
ST_MAKEPOLYGONORIENTED(array_of_geography)
```

**Description**

Like `ST_MAKEPOLYGON`, but the vertex ordering of each input linestring
determines the orientation of each polygon ring. The orientation of a polygon
ring defines the interior of the polygon as follows: if someone walks along the
boundary of the polygon in the order of the input vertices, the interior of the
polygon is on the left. This applies for each polygon ring provided.

This variant of the polygon constructor is more flexible since
`ST_MAKEPOLYGONORIENTED` can construct a polygon such that the interior is on
either side of the polygon ring. However, proper orientation of polygon rings is
critical in order to construct the desired polygon.

If the input `ARRAY` or any element in the `ARRAY` is `NULL`,
`ST_MAKEPOLYGONORIENTED` returns `NULL`.

> [!NOTE]
> **Note:** The input argument for `ST_MAKEPOLYGONORIENTED` may contain an empty `GEOGRAPHY`. `ST_MAKEPOLYGONORIENTED` interprets an empty `GEOGRAPHY` as having an empty linestring, which will create a full loop: that is, a polygon that covers the entire Earth.

**Constraints**

Together, the input rings must form a valid polygon:

- The polygon shell must cover each of the polygon holes.
- There must be only one polygon shell, which must to be the first input ring. This implies that polygon holes can't be nested.
- Polygon rings may only intersect in a vertex on the boundary of both rings.

Every edge must span strictly less than 180 degrees.

`ST_MAKEPOLYGONORIENTED` relies on the ordering of the input vertices of each
linestring to determine the orientation of the polygon. This applies to the
polygon shell and any polygon holes. `ST_MAKEPOLYGONORIENTED` expects all
polygon holes to have the opposite orientation of the shell. See
[`ST_MAKEPOLYGON`](geography_functions-1.md#st_makepolygon) for an alternate polygon constructor, and
other constraints on building a valid polygon.

> [!NOTE]
> **Note:** Due to the GoogleSQL snapping process, edges with a sufficiently short length will be discarded and the two endpoints will be snapped to a single point. Therefore, it's possible that vertices in a linestring may be snapped together such that one or more edge disappears. Hence, it's possible that a polygon hole that's sufficiently small may disappear, or the resulting `GEOGRAPHY` may contain only a line or a point.

**Return type**

`GEOGRAPHY`

### `ST_MAXDISTANCE`

```sql
ST_MAXDISTANCE(geography_1, geography_2[, use_spheroid])
```

Returns the longest distance in meters between two non-empty
`GEOGRAPHY`s; that is, the distance between two
vertices where the first vertex is in the first
`GEOGRAPHY`, and the second vertex is in the second
`GEOGRAPHY`. If `geography_1` and `geography_2` are the
same `GEOGRAPHY`, the function returns the distance
between the two most distant vertices in that
`GEOGRAPHY`.

If either of the input `GEOGRAPHY`s is empty,
`ST_MAXDISTANCE` returns `NULL`.

The optional `use_spheroid` parameter determines how this function measures
distance. If `use_spheroid` is `FALSE`, the function measures distance on the
surface of a perfect sphere.

The `use_spheroid` parameter currently only supports
the value `FALSE`. The default value of `use_spheroid` is `FALSE`.

**Return type**

`FLOAT64`

### `ST_NPOINTS`

```sql
ST_NPOINTS(geography_expression)
```

**Description**

An alias of [ST_NUMPOINTS](#st_numpoints).

### `ST_NUMGEOMETRIES`

```sql
ST_NUMGEOMETRIES(geography_expression)
```

**Description**

Returns the number of geometries in the input `GEOGRAPHY`. For a single point,
linestring, or polygon, `ST_NUMGEOMETRIES` returns `1`. For any collection of
geometries, `ST_NUMGEOMETRIES` returns the number of geometries making up the
collection. `ST_NUMGEOMETRIES` returns `0` if the input is the empty
`GEOGRAPHY`.

**Return type**

`INT64`

**Example**

The following example computes `ST_NUMGEOMETRIES` for a single point geography,
two collections, and an empty geography.

```sql
WITH example AS(
  SELECT ST_GEOGFROMTEXT('POINT(5 0)') AS geography
  UNION ALL
  SELECT ST_GEOGFROMTEXT('MULTIPOINT(0 1, 4 3, 2 6)') AS geography
  UNION ALL
  SELECT ST_GEOGFROMTEXT('GEOMETRYCOLLECTION(POINT(0 0), LINESTRING(1 2, 2 1))') AS geography
  UNION ALL
  SELECT ST_GEOGFROMTEXT('GEOMETRYCOLLECTION EMPTY'))
SELECT
  geography,
  ST_NUMGEOMETRIES(geography) AS num_geometries,
FROM example;

/*------------------------------------------------------+----------------+
 | geography                                            | num_geometries |
 +------------------------------------------------------+----------------+
 | POINT(5 0)                                           | 1              |
 | MULTIPOINT(0 1, 4 3, 2 6)                            | 3              |
 | GEOMETRYCOLLECTION(POINT(0 0), LINESTRING(1 2, 2 1)) | 2              |
 | GEOMETRYCOLLECTION EMPTY                             | 0              |
 +------------------------------------------------------+----------------*/
```

### `ST_NUMPOINTS`

```sql
ST_NUMPOINTS(geography_expression)
```

**Description**

Returns the number of vertices in the input
`GEOGRAPHY`. This includes the number of points, the
number of linestring vertices, and the number of polygon vertices.

> [!NOTE]
> **Note:** The first and last vertex of a polygon ring are counted as distinct vertices.

**Return type**

`INT64`

### `ST_PERIMETER`

```sql
ST_PERIMETER(geography_expression[, use_spheroid])
```

**Description**

Returns the length in meters of the boundary of the polygons in the input
`GEOGRAPHY`.

If `geography_expression` is a point or a line, returns zero. If
`geography_expression` is a collection, returns the perimeter of the polygons
in the collection; if the collection doesn't contain polygons, returns zero.

The optional `use_spheroid` parameter determines how this function measures
distance. If `use_spheroid` is `FALSE`, the function measures distance on the
surface of a perfect sphere.

The `use_spheroid` parameter currently only supports
the value `FALSE`. The default value of `use_spheroid` is `FALSE`.

**Return type**

`FLOAT64`

### `ST_POINTN`

```sql
ST_POINTN(linestring_geography, index)
```

**Description**

Returns the Nth point of a linestring geography as a point geography, where N is
the index. The index is 1-based. Negative values are counted backwards from the
end of the linestring, so that -1 is the last point. Returns an error if the
input isn't a linestring, if the input is empty, or if there is no vertex at
the given index.

**Return Type**

Point `GEOGRAPHY`

**Example**

The following example uses `ST_POINTN`, [`ST_STARTPOINT`](#st_startpoint) and
[`ST_ENDPOINT`](geography_functions-1.md#st_endpoint) to extract points from a linestring.

```sql
WITH linestring AS (
    SELECT ST_GEOGFROMTEXT('LINESTRING(1 1, 2 1, 3 2, 3 3)') g
)
SELECT ST_POINTN(g, 1) AS first, ST_POINTN(g, -1) AS last,
    ST_POINTN(g, 2) AS second, ST_POINTN(g, -2) AS second_to_last
FROM linestring;

/*--------------+--------------+--------------+----------------+
 | first        | last         | second       | second_to_last |
 +--------------+--------------+--------------+----------------+
 | POINT(1 1)   | POINT(3 3)   | POINT(2 1)   | POINT(3 2)     |
 +--------------+--------------+--------------+----------------*/
```

### `ST_REGIONSTATS`

```sql
ST_REGIONSTATS(
    geography,
    raster_id
    [ , [band => ] value ]
    [ , include => value ]
    [ , options => value ]
)
```

**Description**

Returns statistics summarizing the pixel values of the raster image referenced
by `raster_id` that intersect with `geography`. The statistics include the
count, minimum, maximum, sum, standard deviation, mean, and area of the valid
pixels of the raster band named `band_name`. Google Earth Engine computes
the results of the function call.

> [!NOTE]
> **Note:** This function incurs charges under the BigQuery Services SKU. For more information, read about [billing](https://docs.cloud.google.com/bigquery/docs/raster-data#billing) for the `ST_REGIONSTATS` function.

- `geography`: A `GEOGRAPHY` value to intersect with the raster image.
- `raster_id`: A string that identifies a raster image. The
  following formats are supported:

  - A URI from an image table provided by Google Earth Engine in BigQuery sharing (formerly Analytics Hub).
  - A URI for a readable GeoTIFF raster file.
  - A Google Earth Engine asset path that references public catalog data or project-owned assets with read access.

  For more information about how to find and format each type
  of input, see [Find raster data](https://docs.cloud.google.com/bigquery/docs/raster-data#raster-data-sources).
- `band_name`: A string in one of the following formats:

  - A single band within the raster image specified by `raster_id`.
  - A formula to compute a value from the available bands in the raster image. The formula uses the Google Earth Engine [image expression syntax](https://developers.google.com/earth-engine/guides/image_math#expressions).

  Bands can be referenced by their name, `band_name`, in expressions. If
  you don't specify a band, the first band of the image is used.
- `include`: An optional string formula that uses the Google Earth Engine
  [image expression syntax](https://developers.google.com/earth-engine/guides/image_math#expressions) to compute a pixel weight.
  The formula should return values from 0 to 1. Values outside this range are
  set to the nearest limit, either 0 or 1. A value of 0 means that
  the pixel is *invalid* and it's excluded from analysis.
  A positive value means that a pixel is *valid* .
  Values between 0 and 1 represent
  proportional weights for calculations, such as weighted
  means. For more information, see [Pixel weights](https://docs.cloud.google.com/bigquery/docs/raster-data#pixel-weights).

- `options`: A case-sensitive `JSON` value that specifies options as key value
  pairs, such as `JSON '{"scale": 10.0}'`.

  The following options are supported:
  - `"scale"`: The scale in meters at which raster processing should be performed. By default, the scale is determined from the dataset. For more information, see [Pixel size and scale of analysis](https://docs.cloud.google.com/bigquery/docs/raster-data#pixel-scale).

You can only call this function in the `US`, `us-central1`,
and `us-central2` regions.

For more information about raster data and how to
call this function, see [Work with raster data](https://docs.cloud.google.com/bigquery/docs/raster-data).

**Return type**

```sql
STRUCT<
  count ,
  min FLOAT64,
  max FLOAT64,
  stdDev FLOAT64,
  sum FLOAT64,
  mean FLOAT64,
  area FLOAT64
>
```

Return values:

- `count`: The number of pixels that intersect with `geography`, including partially intersecting pixels.
- `min`: The minimum band value of the valid pixels that intersect with `geography`.
- `max`: The maximum band value of the valid pixels that intersect with `geography`.
- `stdDev`: The weighted standard deviation of the band values of the pixels that intersect with `geography`.
- `sum`: The weighted sum of the band values of the pixels that intersect with `geography`.
- `mean`: The weighted mean of the band values of the pixels that intersect with `geography`.
- `area`: The sum of the area of valid pixels, or parts of valid pixels,
  that intersect `geography`.

  - For point geometries, the area of the entire intersecting pixel is used.
  - For polygon geometries, partial intersections are weighted by the proportional overlap of the polygon with the pixel.
  - The `area` value might differ from the area returned by the `ST_AREA` function. The difference is typically by less than 1% but increases for polygons that are smaller than the pixel size in the raster image.

If no valid pixels intersect `geography`, then the function returns 0
for all statistics.

### `ST_SIMPLIFY`

```sql
ST_SIMPLIFY(geography, tolerance_meters)
```

**Description**

Returns a simplified version of `geography`, the given input
`GEOGRAPHY`. The input `GEOGRAPHY` is simplified by replacing nearly straight
chains of short edges with a single long edge. The input `geography` will not
change by more than the tolerance specified by `tolerance_meters`. Thus,
simplified edges are guaranteed to pass within `tolerance_meters` of the
*original* positions of all vertices that were removed from that edge. The given
`tolerance_meters` is in meters on the surface of the Earth.

Note that `ST_SIMPLIFY` preserves topological relationships, which means that
no new crossing edges will be created and the output will be valid. For a large
enough tolerance, adjacent shapes may collapse into a single object, or a shape
could be simplified to a shape with a smaller dimension.

**Constraints**

For `ST_SIMPLIFY` to have any effect, `tolerance_meters` must be non-zero.

`ST_SIMPLIFY` returns an error if the tolerance specified by `tolerance_meters`
is one of the following:

- A negative tolerance.
- Greater than \~7800 kilometers.

**Return type**

`GEOGRAPHY`

**Examples**

The following example shows how `ST_SIMPLIFY` simplifies the input line
`GEOGRAPHY` by removing intermediate vertices.

```sql
WITH example AS
 (SELECT ST_GEOGFROMTEXT('LINESTRING(0 0, 0.05 0, 0.1 0, 0.15 0, 2 0)') AS line)
SELECT
   line AS original_line,
   ST_SIMPLIFY(line, 1) AS simplified_line
FROM example;

/*---------------------------------------------+----------------------+
 |                original_line                |   simplified_line    |
 +---------------------------------------------+----------------------+
 | LINESTRING(0 0, 0.05 0, 0.1 0, 0.15 0, 2 0) | LINESTRING(0 0, 2 0) |
 +---------------------------------------------+----------------------*/
```

The following example illustrates how the result of `ST_SIMPLIFY` can have a
lower dimension than the original shape.

```sql
WITH example AS
 (SELECT
    ST_GEOGFROMTEXT('POLYGON((0 0, 0.1 0, 0.1 0.1, 0 0))') AS polygon,
    t AS tolerance
  FROM UNNEST([1000, 10000, 100000]) AS t)
SELECT
  polygon AS original_triangle,
  tolerance AS tolerance_meters,
  ST_SIMPLIFY(polygon, tolerance) AS simplified_result
FROM example

/*-------------------------------------+------------------+-------------------------------------+
 |          original_triangle          | tolerance_meters |          simplified_result          |
 +-------------------------------------+------------------+-------------------------------------+
 | POLYGON((0 0, 0.1 0, 0.1 0.1, 0 0)) |             1000 | POLYGON((0 0, 0.1 0, 0.1 0.1, 0 0)) |
 | POLYGON((0 0, 0.1 0, 0.1 0.1, 0 0)) |            10000 |            LINESTRING(0 0, 0.1 0.1) |
 | POLYGON((0 0, 0.1 0, 0.1 0.1, 0 0)) |           100000 |                          POINT(0 0) |
 +-------------------------------------+------------------+-------------------------------------*/
```

### `ST_SNAPTOGRID`

```sql
ST_SNAPTOGRID(geography_expression, grid_size)
```

**Description**

Returns the input `GEOGRAPHY`, where each vertex has
been snapped to a longitude/latitude grid. The grid size is determined by the
`grid_size` parameter which is given in degrees.

**Constraints**

Arbitrary grid sizes aren't supported. The `grid_size` parameter is rounded so
that it's of the form `10^n`, where `-10 < n < 0`.

**Return type**

`GEOGRAPHY`

### `ST_STARTPOINT`

```sql
ST_STARTPOINT(linestring_geography)
```

**Description**

Returns the first point of a linestring geography as a point geography. Returns
an error if the input isn't a linestring or if the input is empty.

**Return Type**

Point `GEOGRAPHY`

**Example**

```sql
SELECT ST_STARTPOINT(ST_GEOGFROMTEXT('LINESTRING(1 1, 2 1, 3 2, 3 3)')) first

/*--------------+
 | first        |
 +--------------+
 | POINT(1 1)   |
 +--------------*/
```

### `ST_TOUCHES`

```sql
ST_TOUCHES(geography_1, geography_2)
```

**Description**

Returns `TRUE` provided the following two conditions are satisfied:

1. `geography_1` intersects `geography_2`.
2. The interior of `geography_1` and the interior of `geography_2` are disjoint.

**Return type**

`BOOL`

### `ST_UNION`

```sql
ST_UNION(geography_1, geography_2)
```

```sql
ST_UNION(array_of_geography)
```

**Description**

Returns a `GEOGRAPHY` that represents the point set
union of all input `GEOGRAPHY`s.

`ST_UNION` comes in two variants. For the first variant, input must be two
`GEOGRAPHY`s. For the second, the input is an
`ARRAY` of type `GEOGRAPHY`.

For the first variant of `ST_UNION`, if an input
`GEOGRAPHY` is `NULL`, `ST_UNION` returns `NULL`.
For the second variant, if the input `ARRAY` value
is `NULL`, `ST_UNION` returns `NULL`.
For a non-`NULL` input `ARRAY`, the union is computed
and `NULL` elements are ignored so that they don't affect the output.

See [`ST_UNION_AGG`](#st_union_agg) for the aggregate version of `ST_UNION`.

**Return type**

`GEOGRAPHY`

**Example**

```sql
SELECT ST_UNION(
  ST_GEOGFROMTEXT('LINESTRING(-122.12 47.67, -122.19 47.69)'),
  ST_GEOGFROMTEXT('LINESTRING(-122.12 47.67, -100.19 47.69)')
) AS results

/*---------------------------------------------------------+
 | results                                                 |
 +---------------------------------------------------------+
 | LINESTRING(-100.19 47.69, -122.12 47.67, -122.19 47.69) |
 +---------------------------------------------------------*/
```

### `ST_UNION_AGG`

```sql
ST_UNION_AGG(geography [ WHERE where_expression ])
```

**Description**

Returns a `GEOGRAPHY` that represents the point set
union of all input `GEOGRAPHY`s.

`ST_UNION_AGG` ignores `NULL` input `GEOGRAPHY` values. You
can specify a boolean expression for `where_expression` to filter the aggregate
function input.

See [`ST_UNION`](#st_union) for the non-aggregate version of `ST_UNION_AGG`.

**Return type**

`GEOGRAPHY`

**Example**

```sql
SELECT ST_UNION_AGG(items) AS results
FROM UNNEST([
  ST_GEOGFROMTEXT('LINESTRING(-122.12 47.67, -122.19 47.69)'),
  ST_GEOGFROMTEXT('LINESTRING(-122.12 47.67, -100.19 47.69)'),
  ST_GEOGFROMTEXT('LINESTRING(-122.12 47.67, -122.19 47.69)')]) as items;

/*---------------------------------------------------------+
 | results                                                 |
 +---------------------------------------------------------+
 | LINESTRING(-100.19 47.69, -122.12 47.67, -122.19 47.69) |
 +---------------------------------------------------------*/
```

### `ST_WITHIN`

```sql
ST_WITHIN(geography_1, geography_2)
```

**Description**

Returns `TRUE` if no point of `geography_1` is outside of `geography_2` and
the interiors of `geography_1` and `geography_2` intersect.

Given two geographies `a` and `b`, `ST_WITHIN(a, b)` returns the same result
as [`ST_CONTAINS`](geography_functions-1.md#st_contains)`(b, a)`. Note the opposite order of arguments.

**Return type**

`BOOL`

### `ST_X`

```sql
ST_X(point_geography_expression)
```

**Description**

Returns the longitude in degrees of the single-point input
`GEOGRAPHY`.

For any input `GEOGRAPHY` that isn't a single point,
including an empty `GEOGRAPHY`, `ST_X` returns an
error.

**Return type**

`FLOAT64`

**Example**

The following example uses `ST_X` and `ST_Y` to extract coordinates from
single-point geographies.

```sql
WITH points AS
   (SELECT ST_GEOGPOINT(i, i + 1) AS p FROM UNNEST([0, 5, 12]) AS i)
 SELECT
   p,
   ST_X(p) as longitude,
   ST_Y(p) as latitude
FROM points;

/*--------------+-----------+----------+
 | p            | longitude | latitude |
 +--------------+-----------+----------+
 | POINT(0 1)   | 0.0       | 1.0      |
 | POINT(5 6)   | 5.0       | 6.0      |
 | POINT(12 13) | 12.0      | 13.0     |
 +--------------+-----------+----------*/
```

### `ST_Y`

```sql
ST_Y(point_geography_expression)
```

**Description**

Returns the latitude in degrees of the single-point input
`GEOGRAPHY`.

For any input `GEOGRAPHY` that isn't a single point,
including an empty `GEOGRAPHY`, `ST_Y` returns an
error.

**Return type**

`FLOAT64`

**Example**

See [`ST_X`](#st_x) for example usage.

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- The official page is split into 2 files at section boundaries; this is part 2.
- Conflicting official statements: the `ST_REGIONSTATS` syntax names the optional argument `band` (`[ , [band => ] value ]`), but the text refers to "the raster band named `band_name`" and documents the argument as `band_name`. The page does not say which name is right, so both are kept as published.
- Caution: the official `ST_REGIONSTATS` return type lists the first field as `count ,` with no data type, while the other fields have types. The type is not stated on any page, so it is kept as published.

## Related

- [Index of this directory](./README.md)
- [Geography functions (part 1 of 2)](./geography_functions-1.md)
