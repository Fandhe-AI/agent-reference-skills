# Jest

## Usage

Basic setup:

```json
{ "scripts": { "test": "jest" } }
```

```json
{ "tasks": { "test": {} } }
```

Separating watch mode (important):

```json
{
  "scripts": { "test": "jest", "test:watch": "jest --watch" }
}
```

```json
{
  "tasks": {
    "test:watch": { "cache": false, "persistent": true }
  }
}
```

VS Code Jest extension:

```json
{
  "jest.jestCommandLine": "turbo run test --log-prefix=none --"
}
```
