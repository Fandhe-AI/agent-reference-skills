---
source: https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server
---

# Install SDKs

SDK and development environment setup commands from the official tutorial (Python / TypeScript).

## Install uv (for Python)

> **Warning**: This downloads and runs a remote script. Review the script before running it, and run it in a disposable or trusted environment.

Adapted (not in the official docs): the official docs use a one-line pipe. Split into download and run so the script can be reviewed first.

```bash
curl -LsSf -o install.sh https://astral.sh/uv/install.sh
# Review install.sh before running it
sh install.sh
```

```powershell
irm https://astral.sh/uv/install.ps1 -OutFile install.ps1
# Review install.ps1 before running it
powershell -ExecutionPolicy ByPass -File install.ps1
```

Restart the terminal after installing so that the `uv` command is recognized.

## Create a Python server project

```bash
# Create a new directory for our project
uv init weather
cd weather

# Create virtual environment and activate it
uv venv
source .venv/bin/activate

# Install dependencies
uv add "mcp[cli]"

# Create our server file
touch weather.py
```

## Check Node.js (for TypeScript)

```bash
node --version
npm --version
```

Node.js 20 or later is required (per the source).

## Create a TypeScript server project

```bash
# Create a new directory for our project
mkdir weather
cd weather

# Initialize a new npm project
npm init -y

# Install dependencies
npm install @modelcontextprotocol/server zod
npm install -D @types/node typescript

# Create our files
mkdir src
touch src/index.ts
```

Next steps are adding `"type": "module"` and build scripts to `package.json`, and creating `tsconfig.json`. See the source for details.
