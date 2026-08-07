# LightingModel

Abstract base class for implementing lighting models used by node materials. Defines hook methods executed at different points during light evaluation.

## Signature / Usage

```js
class LightingModel {
	constructor() {}
}
```

## Methods

| Method | Description |
|--------|-------------|
| `start(builder)` | Sets up lighting model/context data used later in evaluation |
| `direct(lightData, builder)` | Direct light term; executed for directional/point/spot light nodes |
| `directRectArea(lightData, builder)` | Direct light term for rect area light nodes |
| `indirect(builder)` | Indirect light term |
| `ambientOcclusion(builder)` | Ambient occlusion term; must be called manually from `indirect()` |
| `finish(builder)` | Final tasks, e.g. updating outgoing light |

## Notes

- All methods are abstract; concrete lighting models (e.g. `PhysicalLightingModel`) implement the subset they need.

## Related

- [PhysicalLightingModel](./PhysicalLightingModel.md)
