# Model Armor Helpers

Hand-crafted helpers for filtering prompts and responses through Model Armor templates, and for creating new templates.

## +sanitize-prompt

Filter a user prompt through a Model Armor template (inbound safety check).

### Usage

```bash
gws modelarmor +sanitize-prompt \
  --template projects/MY_PROJECT/locations/us-central1/templates/MY_TEMPLATE \
  --text "User input to sanitize"

# Read from stdin
echo "User input" | gws modelarmor +sanitize-prompt \
  --template projects/MY_PROJECT/locations/us-central1/templates/MY_TEMPLATE
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--template` | Yes | Full template resource name: `projects/PROJECT/locations/LOCATION/templates/TEMPLATE` |
| `--text` | No | Text content to sanitize |
| `--json` | No | Complete JSON request body (overrides `--text`) |

## Notes

- Reads from stdin if neither `--text` nor `--json` is provided.

---

## +sanitize-response

Filter a model response through a Model Armor template (outbound safety check).

### Usage

```bash
gws modelarmor +sanitize-response \
  --template projects/MY_PROJECT/locations/us-central1/templates/MY_TEMPLATE \
  --text "Model output to sanitize"
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--template` | Yes | Full template resource name: `projects/PROJECT/locations/LOCATION/templates/TEMPLATE` |
| `--text` | No | Text content to sanitize |
| `--json` | No | Complete JSON request body (overrides `--text`) |

## Notes

- Reads from stdin if neither `--text` nor `--json` is provided.

---

## +create-template

Create a new Model Armor template with specified configuration.

### Usage

```bash
# Create with default jailbreak preset
gws modelarmor +create-template \
  --project MY_PROJECT \
  --location us-central1 \
  --template-id my-template

# Create with custom JSON configuration
gws modelarmor +create-template \
  --project MY_PROJECT \
  --location us-central1 \
  --template-id my-template \
  --json '{"filterConfig": {...}}'
```

### Options

| Name | Required | Description |
|------|----------|-------------|
| `--project` | Yes | GCP project ID |
| `--location` | Yes | GCP location (e.g. `us-central1`) |
| `--template-id` | Yes | Template identifier to create |
| `--preset` | No | Preset template type: `jailbreak` (default when neither `--preset` nor `--json` is set) |
| `--json` | No | Custom JSON template configuration (overrides `--preset`) |

## Related

- [helpers-overview.md](./helpers-overview.md)
