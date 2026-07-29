# Combining Blit and Compute Operations in a Single Pass

Metal 4's compute command encoder can issue both texture-copy ("blit") commands and a compute dispatch, so two source textures can be composited and then processed by a kernel without leaving the encoder.

```objc
// Create a compute encoder from the command buffer — this one encoder
// will issue both the texture copies and the compute dispatch below.
id<MTL4ComputeCommandEncoder> computeEncoder;
computeEncoder = [commandBuffer computeCommandEncoder];

// Copy the chyron texture into the composite color texture.
MTLSize chyronTextureSize = { chyronTexture.width, chyronTexture.height, 1 };
MTLOrigin destinationOrigin = { offset, 0, 0 };

[computeEncoder copyFromTexture:chyronTexture
                    sourceSlice:0
                    sourceLevel:0
                   sourceOrigin:MTLOriginMake(0, 0, 0)
                     sourceSize:chyronTextureSize
                      toTexture:compositeColorTexture
               destinationSlice:0
               destinationLevel:0
              destinationOrigin:destinationOrigin];

// Copy the background image texture into the same composite texture,
// below the chyron.
MTLSize backgroundImageSize = { backgroundImageTexture.width, backgroundImageTexture.height, 1 };
MTLOrigin backgroundOrigin = { 0, chyronTexture.height, 0 };

[computeEncoder copyFromTexture:backgroundImageTexture
                    sourceSlice:0
                    sourceLevel:0
                   sourceOrigin:MTLOriginMake(0, 0, 0)
                     sourceSize:backgroundImageSize
                      toTexture:compositeColorTexture
               destinationSlice:0
               destinationLevel:0
              destinationOrigin:backgroundOrigin];

// The copies above and the dispatch below both touch compositeColorTexture;
// this barrier orders the blit stage before the dispatch stage so the
// kernel never reads a partially-copied texture.
[computeEncoder barrierAfterEncoderStages:MTLStageBlit
                      beforeEncoderStages:MTLStageDispatch
                        visibilityOptions:MTL4VisibilityOptionDevice];

[computeEncoder setComputePipelineState:computePipelineState];
[computeEncoder setArgumentTable:argumentTable];

[argumentTable setTexture:compositeColorTexture.gpuResourceID
                  atIndex:ComputeTextureBindingIndexForColorImage];
[argumentTable setTexture:compositeGrayscaleTexture.gpuResourceID
                  atIndex:ComputeTextureBindingIndexForGrayscaleImage];

[computeEncoder dispatchThreadgroups:threadgroupCount
               threadsPerThreadgroup:threadgroupSize];

[computeEncoder endEncoding];
```

```metal
kernel void
convertToGrayscale(texture2d<half, access::read>  inTexture  [[texture(ComputeTextureBindingIndexForColorImage)]],
                   texture2d<half, access::write> outTexture [[texture(ComputeTextureBindingIndexForGrayscaleImage)]],
                   uint2                          gridId     [[thread_position_in_grid]])
{
    // Required because the encoder above dispatches with dispatchThreadgroups:,
    // which rounds the threadgroup count up and can overhang the texture.
    if ((gridId.x >= outTexture.get_width()) ||
        (gridId.y >= outTexture.get_height()))
    {
        return;
    }

    half4 colorValue = inTexture.read(gridId);
    half grayValue = dot(colorValue.rgb, half3(0.2126h, 0.7152h, 0.0722h));
    outTexture.write(half4(grayValue, grayValue, grayValue, 1.0), gridId);
}
```

## Notes

- This is the compute side of Metal on Apple silicon; the rendering-side Metal API (MTKView, render pipeline states, render command encoders) is covered by the separate apple-graphics skill.
- Uses `dispatchThreadgroups:threadsPerThreadgroup:`, which rounds the threadgroup count up to cover the texture — `convertToGrayscale` guards `gridId` against the texture bounds for that overhang.
- `MTL4ComputeCommandEncoder` can issue blit-style texture copies and a compute dispatch from the same encoder; a `barrierAfterEncoderStages:beforeEncoderStages:` call is still required between them because the GPU may otherwise reorder or overlap the two stages.
- Derived from the code listings on developer.apple.com/documentation/metal/processing-a-texture-in-a-compute-function, which redirects to "Combining blit and compute operations in a single pass".
