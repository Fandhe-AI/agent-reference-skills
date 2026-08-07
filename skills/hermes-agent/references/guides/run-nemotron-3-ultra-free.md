# Run Nemotron 3 Ultra Free in Hermes Agent

Guide for accessing Nemotron 3 Ultra at no cost through Nous Portal, via either the Hermes Desktop app or the command-line interface.

## Overview

Nous Research partnered with Nebius to provide complimentary access to Nemotron 3 Ultra through Nous Portal for a limited period (June 4–18). The model is reachable via either the Hermes Agent desktop app or the CLI. The `:free` tag is what keeps it on the no-cost plan — pick that exact variant (`nvidia/nemotron-3-ultra:free`).

## Signature / Usage

### Option A — Desktop App

1. Download the Hermes Desktop installer from the official site
2. Launch the app and select "Nous Portal" (marked Recommended)
3. Create or sign into a Nous Portal account; select the Free plan
4. Search for "nemotron 3 ultra" and select the Free tier variant
5. Begin chatting

### Option B — Command Line

```bash
# macOS/Linux/WSL2/Android
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
source ~/.bashrc

# Windows PowerShell
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

Then run `hermes setup` and follow the browser-based authentication steps. From the terminal, select the model:

```
/model nvidia/nemotron-3-ultra:free
```

## Notes

- The offer is time-limited (June 4–18); confirm current availability in Nous Portal before relying on the free tier
- Selecting a variant without the `:free` suffix moves usage off the no-cost plan
- For remote hosts, pair this guide with OAuth-over-SSH authentication steps

## Related

- [Quickstart](../getting-started/quickstart.md)
- [Installation](../getting-started/installation.md)
