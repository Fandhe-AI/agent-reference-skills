# Creating Internal Packages

Design each package around a single responsibility.

## Usage

### 1. Create the directory

```
packages/math/
  src/
    add.ts
    subtract.ts
  package.json
  tsconfig.json
```

### 2. package.json

```json
{
  "name": "@repo/math",
  "type": "module",
  "exports": {
    "./add": { "types": "./dist/add.d.ts", "default": "./dist/add.js" },
    "./subtract": { "types": "./dist/subtract.d.ts", "default": "./dist/subtract.js" }
  },
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc"
  },
  "devDependencies": {
    "typescript": "latest",
    "@repo/typescript-config": "workspace:*"
  }
}
```

### 3. tsconfig.json

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": { "outDir": "dist", "rootDir": "src" },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. Add it to an app

```json
{ "dependencies": { "@repo/math": "workspace:*" } }
```

### 5. Cache configuration

```json
{
  "tasks": {
    "build": {
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    }
  }
}
```

## Notes

- `include` / `exclude` are not inherited from the base config, so they must always be specified explicitly.
