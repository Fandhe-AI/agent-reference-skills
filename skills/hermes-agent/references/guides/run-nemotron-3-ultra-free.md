# Run Nemotron 3 Ultra Free in Hermes Agent

Guide for accessing Nemotron 3 Ultra at no cost through Nous Portal, via either the Hermes Desktop app or the command-line interface.

## Overview

Nous Research partnered with Nebius to provide complimentary access to Nemotron 3 Ultra through Nous Portal as a limited-time promotion (the docs state June 4–18, no year given; see Notes). The model is reachable via either the Hermes Agent desktop app or the CLI. The `:free` tag is what keeps it on the no-cost plan — pick that exact variant (`nvidia/nemotron-3-ultra:free`).

## Signature / Usage

### Option A — Desktop App

1. Download the Hermes Desktop installer (macOS or Windows) from the official site and open it; first launch finishes setup (usually under a minute)
2. At the "Let's get you set up" screen, click **Nous Portal** (marked Recommended); in the browser create or sign into a Nous Portal account, choose the **Free** plan, and authorize Hermes
3. On the **Default model** card click **Change**, search for "nemotron 3 ultra", and select the variant tagged **Free tier** (`nvidia/nemotron-3-ultra:free`)
4. Click **Start chatting**

### Option B — Command Line

```bash
# macOS/Linux/WSL2/Android
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
source ~/.bashrc

# Windows PowerShell
iex (irm https://hermes-agent.nousresearch.com/install.ps1)
```

Then run `hermes setup`, select **Quick Setup**, create or sign into a Nous Portal account in the browser, choose the **Free** plan, and click **Connect**. Back in the terminal select the model from the list (or later with `/model`):

```
/model nvidia/nemotron-3-ultra:free
```

## Notes

- The offer is time-limited: the v0.22.2 docs still describe it as free for two weeks, June 4th to June 18th (partnership with Nebius; the page gives no year). This page was refreshed on 2026-10-17, after that window; whether the free tier is still available is not stated in the docs, so confirm in Nous Portal before relying on it
- Troubleshooting: if the model is missing, finish the Nous Portal connection and confirm you are on the Free plan (`hermes portal info` confirms login and routing through Nous); for remote hosts see the OAuth over SSH guide
- Selecting a variant without the `:free` suffix moves usage off the no-cost plan
- For remote hosts, pair this guide with OAuth-over-SSH authentication steps

## Related

- [Quickstart](../getting-started/quickstart.md)
- [Installation](../getting-started/installation.md)
