# Multi-Service Workflow Composition

Combine multiple Google Workspace services with `gws workflow` helpers and script branching on exit codes.

```bash
# Prerequisites: authenticate with the required scopes
gws auth login -s gmail,calendar,drive,sheets

# ── Built-in workflow helpers ─────────────────────────────────────────────────

# Generate a standup report: today's meetings + open tasks
gws workflow +standup-report

# Prepare a briefing for the next calendar event
gws workflow +meeting-prep

# Summarise the week's activity across Gmail, Calendar, and Drive
gws workflow +weekly-digest

# Preview any workflow without executing side effects
gws workflow +standup-report --dry-run
gws workflow +meeting-prep --dry-run

# ── Script: run standup report and post result to Chat ───────────────────────
REPORT=$(gws workflow +standup-report)
EXIT=$?

if [ "$EXIT" -eq 0 ]; then
  gws chat spaces messages create \
    --params '{"parent": "spaces/SPACE_ID"}' \
    --json "$(jq -n --arg text "$REPORT" '{text: $text}')"
elif [ "$EXIT" -eq 2 ]; then
  echo "Auth error — re-authenticate with: gws auth login" >&2
  exit 1
else
  echo "Workflow failed with exit code $EXIT" >&2
  exit $EXIT
fi

# ── Script: upload a report then announce it in Chat ─────────────────────────
gws drive +upload ./weekly-report.pdf --name "Weekly Report $(date +%F)"
FILE_EXIT=$?

if [ $FILE_EXIT -eq 0 ]; then
  gws chat spaces messages create \
    --params '{"parent": "spaces/SPACE_ID"}' \
    --json '{"text": "Weekly report uploaded to Drive."}'
fi

# ── Pipeline: fetch all Drive files and load into Sheets ─────────────────────
gws drive files list \
  --params '{"pageSize": 100, "fields": "files(id,name,createdTime)"}' \
  --page-all \
  | jq -r '.files[] | [.id, .name, .createdTime] | @csv' \
  | while IFS= read -r row; do
      gws sheets +append --spreadsheet SPREADSHEET_ID --values "$row"
    done
```

## Notes

- `+standup-report`, `+meeting-prep`, and `+weekly-digest` are high-level helpers that internally call Gmail, Calendar, Drive, and Tasks — ensure all relevant scopes are authenticated.
- `--dry-run` on any workflow or helper prints the HTTP requests that would be made without executing them — useful for auditing what data a workflow will access.
- Exit codes are stable and intended for script branching: `0` = success, `1` = API error, `2` = auth error, `3` = validation error, `4` = discovery error, `5` = internal error.
- `--page-all` outputs NDJSON (one JSON object per page); pipe through `jq` to extract fields for downstream commands.
- Use `jq -n --arg` to safely build JSON payloads from shell variables — direct interpolation into JSON strings breaks when the value contains newlines or double quotes.
