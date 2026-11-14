# StandardDrawingPipeline

Decides which objects of a scene are rendered and how they are submitted to the render list. The default implementation performs frustum culling and pushes every renderable object as a separate render item. Subclasses can override `isCulled()` and `pushRenderItem()` to implement other strategies such as GPU-driven rendering. This class is experimental and its interface might change.

## Signature / Usage

Adapted (not in the official docs): minimal subclass that overrides a hook and assigns it to the renderer.

```js
class MyDrawingPipeline extends StandardDrawingPipeline {

	isCulled( object, camera ) {

		return super.isCulled( object, camera );

	}

}

renderer.drawingPipeline = new MyDrawingPipeline();
```

```js
new StandardDrawingPipeline()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| renderer | ?Renderer | The renderer this pipeline is assigned to. Set when the pipeline is assigned via `Renderer#drawingPipeline`. Default `null`. |

## Methods

| Name | Description |
|------|-------------|
| `.begin( camera: Camera, renderContext: RenderContext )` | Prepares the pipeline for projecting a scene with the given camera. For an `ArrayCamera` the sub camera frustums are kept per render context. |
| `.beginRenderList( renderList: RenderList )` | Begins the projection into the given render list. |
| `.finishRenderList( renderList: RenderList )` | Finishes the projection into the given render list. |
| `.isCulled( object: Object3D, camera: Camera ) : boolean` | Returns `true` if the object is culled by the camera. Objects of render bundles are not culled. |
| `.pushRenderItem( renderList, object, geometry, material, groupOrder, z, group, clippingContext )` | Pushes a render item to the render list. |
| `.project( object: Object3D, camera: Camera, groupOrder: number, renderList: RenderList, clippingContext: ClippingContext )` | Traverses the scene graph and collects all renderable objects and lights into the render list. Call `begin()` before. |
| `.prepareAsync( scene: Object3D, camera: Camera ) : Promise\|undefined` | Hook to prepare resources before the synchronous projection in `Renderer.compileAsync()`. |
| `.dispose()` | Frees the resources of the pipeline. Called by `Renderer#dispose()`. |

## Notes

- This module can only be used with `WebGPURenderer`.
- `MeshletDrawingPipeline` and `VisibilityBufferDrawingPipeline` mentioned in the r187 release notes are examples add-ons, not part of `src/` and not documented here.
- Source: https://threejs.org/docs/pages/StandardDrawingPipeline.html (three.js r187, `src/renderers/common/StandardDrawingPipeline.js`; JSDoc from tag r187 / commit 7e89746)
- Migration (r186 → r187): the render list traversal formerly done by the private `Renderer#_projectObject()` moved into this class (https://github.com/mrdoob/three.js/pull/35191).

## Related

- [Renderer](./Renderer.md)
- [WebGPURenderer](./WebGPURenderer.md)
- [BundleGroup](./BundleGroup.md)
