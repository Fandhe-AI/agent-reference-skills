---
source: https://ai.google.dev/gemini-api/docs/oauth
---

# Authentication with OAuth quickstart

Set up OAuth (Application Default Credentials or in-app credential management) for the Gemini API when you need stricter access controls than an API key.

## Signature / Usage

Create Application Default Credentials from a downloaded `client_secret.json`:

```bash
gcloud auth application-default login \
    --client-id-file=client_secret.json \
    --scopes='https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/generative-language.retriever'
```

Test with curl:

```bash
access_token=$(gcloud auth application-default print-access-token)
project_id="YOUR_PROJECT_ID"
curl -X GET https://generativelanguage.googleapis.com/v1/models \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer ${access_token}" \
    -H "x-goog-user-project: ${project_id}" | grep '"name"'
```

Manage credentials yourself (`load_creds.py`):

```python
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ['https://www.googleapis.com/auth/generative-language.retriever']

def load_creds():
    """Converts `client_secret.json` to a credential object.

    This function caches the generated tokens to minimize the use of the
    consent screen.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'client_secret.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return creds
```

Use the token from `load_creds()` (`creds.token`) as the `Authorization: Bearer` header, together with `x-goog-user-project`, in the curl example above.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--client-id-file` | gcloud flag | Path to `client_secret.json` (OAuth 2.0 Client ID of type Desktop app) |
| `--scopes` | gcloud flag | `https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/generative-language.retriever` |

## Notes

- Setup steps: enable the Google Generative Language API in the Cloud project; configure the OAuth consent screen (user type External, add yourself as a test user); create an OAuth client of type Desktop app and save the JSON as `client_secret.json`.
- The page says this simplified approach is for a testing environment; for production, read Google's authentication and authorization overview before choosing credentials.
- The simplified setup triggers a "Google hasn't verified this app." dialog; the page says this is normal and to choose "continue".
- If running on Colab, include `--no-browser` and follow the printed instructions.
- The official sample writes `project_id=<MY PROJECT ID>`; it is quoted here as a shell string, so replace `YOUR_PROJECT_ID` with your project ID.
- The official page also shows `genai.Client()` (ADC auto-detected) and `genai.Client(credentials=creds)`; these are omitted because in Gemini Developer API mode google-genai 2.31.0 requires an API key (raises `ValueError: No API key was provided`) and only loads ADC for Vertex AI (`vertexai=True`), so use the REST call with an `Authorization: Bearer` header for OAuth instead.
- Docs fetched 2026-10-16. The curl example uses the `v1` models path.

## Related

- [api-key](./api-key.md)
- [get-started](./get-started.md)
