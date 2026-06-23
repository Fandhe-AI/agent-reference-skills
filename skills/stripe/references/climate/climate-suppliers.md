# Climate Suppliers

Represents a carbon removal supplier in Frontier's portfolio. Suppliers are embedded in Climate Product objects and can also be retrieved directly.

## Signature / Usage

```javascript
// List all suppliers
const suppliers = await stripe.climate.suppliers.list();

// Retrieve a specific supplier
const supplier = await stripe.climate.suppliers.retrieve(
  'climsup_charm_industrial'
);
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/climate/suppliers/:id` | Retrieve a supplier |
| GET | `/v1/climate/suppliers` | List all suppliers |

## Options / Props

### Supplier Object Fields

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier (format: `climsup_*`) |
| `object` | string | Always `"climate.supplier"` |
| `info_url` | string | URL to a webpage with more information about the supplier |
| `livemode` | boolean | `true` for live mode, `false` for test mode |
| `locations` | array | Geographic locations where this supplier operates |
| `locations[].city` | string \| null | City name |
| `locations[].country` | string | Two-letter ISO country code |
| `locations[].latitude` | float \| null | Geographic latitude |
| `locations[].longitude` | float \| null | Geographic longitude |
| `locations[].region` | string \| null | State, province, or region |
| `name` | string | Name of the carbon removal supplier |
| `removal_pathway` | enum | Scientific method used for carbon removal |

### `removal_pathway` Values

| Value | Description |
|-------|-------------|
| `biomass_carbon_removal_and_storage` | Biological carbon capture stored long-term |
| `direct_air_capture` | Mechanical capture of CO₂ from ambient air |
| `enhanced_weathering` | Accelerated mineral weathering to sequester carbon |
| `marine_carbon_removal` | Ocean-based carbon removal processes |

## Notes

- Suppliers are read-only; managed entirely by Stripe and Frontier.
- Supplier objects are embedded within Climate Product objects under the `suppliers` array.
- Independent third-party verification of carbon removal is performed before delivery is confirmed.

## Related

- [Climate Products](./climate-products.md)
- [Climate Orders](./climate-orders.md)
