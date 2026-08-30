---
source: https://tediousjs.github.io/node-mssql/#geography-and-geometry
---

# Geography and Geometry

node-mssql has a built-in deserializer for the `Geography` and `Geometry` CLR data types.

## Signature / Usage

Geography types can be constructed several different ways. Refer carefully to documentation to verify the coordinate ordering; the ST methods tend to order parameters as longitude (x) then latitude (y), while custom CLR methods tend to prefer to order them as latitude (y) then longitude (x).

The query:

```sql
select geography::STGeomFromText(N'POLYGON((1 1, 3 1, 3 1, 1 1))',4326)
```

results in:

```javascript
{
  srid: 4326,
  version: 2,
  points: [
    Point { lat: 1, lng: 1, z: null, m: null },
    Point { lat: 1, lng: 3, z: null, m: null },
    Point { lat: 1, lng: 3, z: null, m: null },
    Point { lat: 1, lng: 1, z: null, m: null }
  ],
  figures: [ { attribute: 1, pointOffset: 0 } ],
  shapes: [ { parentOffset: -1, figureOffset: 0, type: 3 } ],
  segments: []
}
```

Geometry types can also be constructed in several ways. Unlike Geographies, they are consistent in always placing x before y. node-mssql decodes the result of this query:

```sql
select geometry::STGeomFromText(N'POLYGON((1 1, 3 1, 3 7, 1 1))',4326)
```

into the JavaScript object:

```javascript
{
  srid: 4326,
  version: 1,
  points: [
    Point { x: 1, y: 1, z: null, m: null },
    Point { x: 1, y: 3, z: null, m: null },
    Point { x: 7, y: 3, z: null, m: null },
    Point { x: 1, y: 1, z: null, m: null }
  ],
  figures: [ { attribute: 2, pointOffset: 0 } ],
  shapes: [ { parentOffset: -1, figureOffset: 0, type: 3 } ],
  segments: []
}
```

## Notes

- You will also see `x` and `y` coordinates in parsed Geography points; they are not recommended for use and have been omitted from the example above. For compatibility, they remain flipped (`x`, the horizontal offset, is instead used for latitude, the vertical), and thus risk misleading you. Prefer instead to use the `lat` and `lng` properties
- Geometry always places `x` before `y`, unlike Geography where ordering conventions vary by construction method

## Related

- [Data Types](./data-types.md)
- [Table-Valued Parameter (TVP)](./table-valued-parameter.md)
