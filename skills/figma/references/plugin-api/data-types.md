# Data Types

TypeScript interface and union type definitions used throughout the Plugin API for type-checking and passing structured values.

## Signature / Usage

```ts
// Color
interface RGB  { readonly r: number; readonly g: number; readonly b: number }
interface RGBA { readonly r: number; readonly g: number; readonly b: number; readonly a: number }

// Paint union
type Paint = SolidPaint | GradientPaint | ImagePaint | VideoPaint | PatternPaint | ShaderPaint

// Effect union
type Effect = DropShadowEffect | InnerShadowEffect | BlurEffect |
              NoiseEffect | TextureEffect | GlassEffect | ShaderEffect

// Transform (2×3 affine matrix)
type Transform = [[number, number, number], [number, number, number]]
```

## Options / Props

### Color

#### RGB

```ts
interface RGB {
  readonly r: number  // 0–1
  readonly g: number  // 0–1
  readonly b: number  // 0–1
}
```

#### RGBA

```ts
interface RGBA {
  readonly r: number  // 0–1
  readonly g: number  // 0–1
  readonly b: number  // 0–1
  readonly a: number  // 0–1 (opacity)
}
```

Black: `{ r: 0, g: 0, b: 0, a: 1 }` — White: `{ r: 1, g: 1, b: 1, a: 1 }`

#### Color spaces (Update 141)

Paints, gradient stops, and effects preserve the original color space and components via `sourceColor`; the RGB fields remain the projection for the current document color profile.

```ts
type ColorWithColorSpace =
  | { readonly space: 'SRGB' | 'DISPLAY_P3'; readonly r: number; readonly g: number; readonly b: number }
  | { readonly space: 'HSL'; readonly h: number; readonly s: number; readonly l: number }
  | { readonly space: 'HSB'; readonly h: number; readonly s: number; readonly b: number }
  | { readonly space: 'OKLAB'; readonly l: number; readonly a: number; readonly b: number }
  | { readonly space: 'OKLCH'; readonly l: number; readonly c: number; readonly h: number }

interface RGBWithColorSpace extends RGB { readonly sourceColor?: ColorWithColorSpace }
interface RGBAWithColorSpace extends RGBA { readonly sourceColor?: ColorWithColorSpace }
```

#### BlendMode

```ts
type BlendMode =
  'PASS_THROUGH' | 'NORMAL' | 'DARKEN' | 'MULTIPLY' | 'LINEAR_BURN' |
  'COLOR_BURN' | 'LIGHTEN' | 'SCREEN' | 'LINEAR_DODGE' | 'COLOR_DODGE' |
  'OVERLAY' | 'SOFT_LIGHT' | 'HARD_LIGHT' | 'DIFFERENCE' | 'EXCLUSION' |
  'HUE' | 'SATURATION' | 'COLOR' | 'LUMINOSITY'
```

---

### Paint

```ts
type Paint = SolidPaint | GradientPaint | ImagePaint | VideoPaint | PatternPaint | ShaderPaint
```

`ShaderPaint` (and `ShaderEffect` in the Effect union) apply a shader by `id` with a `properties` map; see the shader types in the typings.

Common fields on all paints: `visible?: boolean`, `opacity?: number`, `blendMode?: BlendMode`

#### SolidPaint

| Field | Type | Description |
|-------|------|-------------|
| `type` | `'SOLID'` | — |
| `color` | `RGBWithColorSpace` | Fill color (`RGB` plus optional `sourceColor`) |
| `boundVariables?` | `Record<string, VariableAlias>` | Variable bindings |

#### GradientPaint

| Field | Type | Description |
|-------|------|-------------|
| `type` | `'GRADIENT_LINEAR' \| 'GRADIENT_RADIAL' \| 'GRADIENT_ANGULAR' \| 'GRADIENT_DIAMOND'` | — |
| `gradientTransform` | `Transform` | Gradient positioning matrix |
| `gradientStops` | `ReadonlyArray<ColorStop>` | Color positions |

#### ImagePaint

| Field | Type | Description |
|-------|------|-------------|
| `type` | `'IMAGE'` | — |
| `scaleMode` | `'FILL' \| 'FIT' \| 'CROP' \| 'TILE'` | Image scaling |
| `imageHash` | `string \| null` | Image identifier |
| `imageTransform?` | `Transform` | Crop positioning |
| `scalingFactor?` | `number` | Tile repetition |
| `rotation?` | `number` | +90 increments |
| `filters?` | `ImageFilters` | Exposure, contrast, etc. |

#### VideoPaint / PatternPaint

VideoPaint mirrors ImagePaint with `type: 'VIDEO'` and `videoHash`. PatternPaint references a source node with `type: 'PATTERN'` and `sourceNodeId`, `tileType`, `scalingFactor`, `spacing`.

---

### Effect

```ts
type Effect = DropShadowEffect | InnerShadowEffect | BlurEffect |
              NoiseEffect | TextureEffect | GlassEffect | ShaderEffect
```

#### DropShadowEffect / InnerShadowEffect

| Field | Type | Description |
|-------|------|-------------|
| `type` | `'DROP_SHADOW' \| 'INNER_SHADOW'` | — |
| `color` | `RGBAWithColorSpace` | Shadow color (`RGBA` plus optional `sourceColor`) |
| `offset` | `Vector` | X/Y displacement |
| `radius` | `number` | Blur radius (≥ 0) |
| `spread?` | `number` | Expansion/contraction |
| `visible` | `boolean` | — |
| `blendMode` | `BlendMode` | — |
| `showShadowBehindNode?` | `boolean` | Drop shadow only |

#### BlurEffect

| Field | Type | Description |
|-------|------|-------------|
| `type` | `'LAYER_BLUR' \| 'BACKGROUND_BLUR'` | — |
| `radius` | `number` | Blur amount |
| `visible` | `boolean` | — |

---

### LayoutGrid

```ts
type LayoutGrid = RowsColsLayoutGrid | GridLayoutGrid
```

Always check `pattern` before reading other properties.

#### RowsColsLayoutGrid

| Field | Type | Description |
|-------|------|-------------|
| `pattern` | `'ROWS' \| 'COLUMNS'` | — |
| `alignment` | `'MIN' \| 'MAX' \| 'STRETCH' \| 'CENTER'` | Positioning mode |
| `gutterSize` | `number` | Space between sections |
| `count` | `number` | Section count (`Infinity` for auto) |
| `sectionSize?` | `number` | Individual section size |
| `offset?` | `number` | Edge spacing |

#### GridLayoutGrid

| Field | Type | Description |
|-------|------|-------------|
| `pattern` | `'GRID'` | — |
| `sectionSize` | `number` | Cell size |

---

### Transform

A 2×3 affine transformation matrix (top two rows of a 3×3 matrix):

```ts
type Transform = [
  [number, number, number],
  [number, number, number]
]
// Identity: [[1, 0, 0], [0, 1, 0]]
// Translation by (tx, ty): [[1, 0, tx], [0, 1, ty]]
```

---

### Vector and Rect

```ts
interface Vector { readonly x: number; readonly y: number }
interface Rect   { readonly x: number; readonly y: number; readonly width: number; readonly height: number }
```

---

### Constraints

```ts
interface Constraints {
  readonly horizontal: ConstraintType
  readonly vertical: ConstraintType
}
type ConstraintType = 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'SCALE'
```

`MIN` = left/top, `MAX` = right/bottom, `STRETCH` = both sides, `SCALE` = proportional.

---

### ExportSettings

```ts
type ExportSettings = ExportSettingsImage | ExportSettingsSVG | ExportSettingsPDF
```

`ExportSettingsREST` is a separate interface accepted by `exportAsync(settings: ExportSettingsREST): Promise<Object>`; it is not part of the `ExportSettings` union in typings v1.142.0.

Common fields: `contentsOnly?`, `useAbsoluteBounds?`, `suffix?`, `colorProfile?`

| Subtype | `format` | Key fields |
|---------|---------|------------|
| `ExportSettingsImage` | `'PNG' \| 'JPG'` | `constraint?: { type, value }` |
| `ExportSettingsSVG` | `'SVG'` | `svgOutlineText?`, `svgIdAttribute?`, `svgSimplifyStroke?` |
| `ExportSettingsPDF` | `'PDF'` | — |
| `ExportSettingsREST` | `'JSON_REST_V1'` | REST API equivalent response |

---

### Variable & VariableCollection

#### Variable

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` (readonly) | Unique ID |
| `name` | `string` | Display name |
| `variableCollectionId` | `string` (readonly) | Parent collection |
| `resolvedType` | `VariableResolvedDataType` (readonly) | `'BOOLEAN' \| 'COLOR' \| 'EASING' \| 'FLOAT' \| 'STRING' \| 'TIMING'` (`EASING` / `TIMING` added in Update 133) |
| `valuesByMode` | `Record<string, VariableValue>` (readonly) | Values per mode |
| `remote` | `boolean` (readonly) | From team library |
| `key` | `string` (readonly) | Import key |
| `codeSyntax` | `Record<string, string>` (readonly) | Platform code definitions |

Methods: `setValueForMode(modeId, value)`, `resolveForConsumer(consumer)`, `remove()`, `getPublishStatusAsync()`, `setVariableCodeSyntax(platform, value)`, `removeVariableCodeSyntax(platform)`

```ts
type VariableValue =
  boolean | string | number | RGB | RGBA | MotionEasing | VariableAlias | VariableComposedColor

// Either the color or the opacity must be a variable alias, or both (Update 139)
type VariableComposedColor =
  | { color: RGB | RGBA; opacity: VariableAlias }
  | { color: VariableAlias; opacity: number | VariableAlias }
```

`VariableScope` now includes `'COLOR_OPACITY'` (the opacity channel of a color; `'OPACITY'` is layer opacity). Easing variables hold `MotionEasing` values and timing variables hold numbers (seconds).

---

### Image

```ts
interface Image {
  readonly hash: string
  getBytesAsync(): Promise<Uint8Array>
  getSizeAsync(): Promise<{ width: number; height: number }>
}
```

Created via `figma.createImage(data: Uint8Array)` or `figma.getImageByHash(hash)`. Max 4096×4096 px; PNG, JPEG, GIF supported.

---

### FontName

```ts
interface FontName {
  readonly family: string  // e.g. 'Inter'
  readonly style: string   // e.g. 'Regular', 'Bold Italic'
  readonly variationSettings?: FontVariationSettings  // present when reading a variable font
}

// Axis values keyed by 4-character OpenType tag, e.g. { wght: 550, slnt: -10 }
interface FontVariationSettings { readonly [axis: string]: number }

// A font to apply: style may be omitted (Figma picks the closest named instance)
interface FontNameInput {
  readonly family: string
  readonly style?: string
  readonly variationSettings?: FontVariationSettings
}
```

Accepted by `figma.loadFontAsync`, `setRangeFontName`, and `fontName` assignment (Update 138). Reads always return a fully populated `FontName`.

---

### Guide

```ts
interface Guide {
  readonly axis: 'X' | 'Y'
  readonly offset: number
}
```

---

### Reaction, Action, Trigger

Prototype interaction types:

- `Reaction = { trigger: Trigger | null; action: Action | null }`
- `Trigger` — user interaction (e.g. click, hover, key press)
- `Action` — navigation or overlay behavior

---

### DocumentChange / NodeChange / StyleChange

Document change events deliver typed change descriptors:

- `DocumentChangeEvent.documentChanges: DocumentChange[]`
- `NodeChangeEvent.changedNode: SceneNode`
- `StyleChangeEvent.changedStyle: BaseStyle`

## Notes

- `figma.mixed` (unique symbol) is returned for node-level properties that differ across a mixed selection.
- All numeric color channels are 0–1, not 0–255 (for RGB / RGBA; `sourceColor` components use the ranges of their color space).
- Checked against `@figma/plugin-typings` v1.142.0 (Plugin API Update 141, 2026-10-15). `TextCase` in the typings also includes `'SMALL_CAPS_FORCED'`.
- Use `figma.util.rgb()` / `figma.util.rgba()` / `figma.util.solidPaint()` for converting CSS color strings.

## Related

- [node-properties](./node-properties.md)
- [figma.util](./figma-util.md)
- [figma.variables](./figma-variables.md)
