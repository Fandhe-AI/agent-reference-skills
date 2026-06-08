# Assets

File-based prop values (images, textures, etc.) managed through Theatre.js Studio. Available since v0.6.0.

## Signature / Usage

```javascript
import { getProject, types } from '@theatre/core'

// Configure project with asset base URL
const project = getProject('My Project', {
  assets: {
    baseUrl: '/theatrejs-assets',
  },
})

// Define an image prop on a sheet object
const obj = sheet.object('My Object', {
  texture: types.image('', { label: 'Texture' }),
})

// Resolve asset to a usable URL
obj.onValuesChange(({ texture }) => {
  const url = project.getAssetUrl(texture)
  if (url) myMesh.material.map = textureLoader.load(url)
})
```

## Options / Props

`getProject(name, { assets })`:

| Name | Type | Description |
|------|------|-------------|
| `assets.baseUrl` | `string` | Base URL where exported assets are hosted (default `'/'`) |

`types.image(default, opts?)`:

| Name | Type | Description |
|------|------|-------------|
| `default` | `string` | Initial asset handle; use `''` for none |
| `opts.label` | `string` | UI label shown in Studio |

## Notes

- Assign files to asset props in Studio; they are initially stored in the browser's IndexedDB
- When exporting project state, Studio generates a ZIP containing all assets — extract to `baseUrl`
- Once assets are served from `baseUrl`, Studio removes them from IndexedDB to save space
- An empty string or `undefined` value means no asset is assigned
- Custom asset types require forking the Theatre.js repo and adding a new prop editor

## Related

- [Prop Types](./prop-types.md)
- [Projects](./projects.md)
