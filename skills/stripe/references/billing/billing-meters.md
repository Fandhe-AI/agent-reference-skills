# Billing Meters

Meters specify how to aggregate meter events over a billing period for usage-based pricing. Meter events represent actions your customers take; a `metered` Price references a Meter to compute the bill.

## Signature / Usage

```bash
# Create a billing meter
curl https://api.stripe.com/v1/billing/meters \
  -u "sk_test_...:" \
  -d "display_name=Search API Calls" \
  -d event_name=ai_search_api \
  -d "default_aggregation[formula]=sum" \
  -d "value_settings[event_payload_key]=value" \
  -d "customer_mapping[type]=by_id" \
  -d "customer_mapping[event_payload_key]=stripe_customer_id"
```

## Options / Props

### Create Parameters

| Name | Type | Description |
|------|------|-------------|
| `display_name` | string | The meter's name. Not visible to the customer. Max 250 characters. Required |
| `event_name` | string | Name of the meter event to record usage for; corresponds to `event_name` on meter events. Max 100 characters. Required |
| `default_aggregation.formula` | enum | How events are aggregated: `count`, `last`, or `sum`. Required |
| `customer_mapping.type` | enum | Method for mapping a meter event to a customer; must be `by_id` |
| `customer_mapping.event_payload_key` | string | Key in the meter event payload used to map the event to a customer |
| `value_settings.event_payload_key` | string | Key in the meter event payload to use as the event's value (e.g. `bytes_used`) |
| `event_time_window` | enum | Time window meter events are pre-aggregated for, if any: `day` or `hour` |

### Object Attributes

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Meter ID (`mtr_...`) |
| `object` | string | `billing.meter` |
| `status` | enum | `active` or `inactive` |
| `status_transitions.deactivated_at` | timestamp or null | When the meter was deactivated |
| `created` / `updated` | timestamp | Creation / last update time |
| `livemode` | boolean | Whether the meter exists in live mode |

### Key Endpoints

| Operation | Method | Path |
|-----------|--------|------|
| Create | POST | `/v1/billing/meters` |
| Retrieve | GET | `/v1/billing/meters/:id` |
| Update | POST | `/v1/billing/meters/:id` |
| List | GET | `/v1/billing/meters` |
| Deactivate | POST | `/v1/billing/meters/:id/deactivate` |
| Reactivate | POST | `/v1/billing/meters/:id/reactivate` |

## Notes

- Attach a Meter to a Price by setting `recurring.usage_type=metered` and `recurring.meter=<meter_id>` on the Price (see Products & Prices).
- `default_aggregation`, `display_name`, and `event_name` are set on create and cannot be changed afterward; `update` only allows renaming `display_name`.
- Report usage via the separate Meter Events API (`POST /v1/billing/meter_events`), not through this resource.
- Deactivating a meter stops it from accepting new events; existing Prices referencing it are unaffected for past usage.

### Key Webhook Events

| Event | When |
|-------|------|
| `billing.meter.created` | Meter created |
| `billing.meter.updated` | Meter updated |
| `billing.meter.deactivated` | Meter deactivated |
| `billing.meter.reactivated` | Meter reactivated |

## Related

- [Products & Prices](./products-prices.md)
- [Subscriptions](./subscriptions.md)
