# Shared Storage Mode Buffer on Unified Memory

Allocate a buffer with `MTLResourceStorageModeShared` so the CPU and GPU read and write the same physical memory on Apple silicon, then access it from the CPU through `contents()` with no explicit copy.

```objc
// Buffers to hold data, allocated with the shared storage mode.
id<MTLBuffer> _mBufferA = [_mDevice newBufferWithLength:bufferSize
                                                 options:MTLResourceStorageModeShared];
id<MTLBuffer> _mBufferB = [_mDevice newBufferWithLength:bufferSize
                                                 options:MTLResourceStorageModeShared];
id<MTLBuffer> _mBufferResult = [_mDevice newBufferWithLength:bufferSize
                                                      options:MTLResourceStorageModeShared];

// The CPU writes directly into the buffer's backing store; on Apple
// silicon there is exactly one physical copy, so the GPU sees these
// writes once the command buffer that reads them is committed.
- (void) generateRandomFloatData: (id<MTLBuffer>) buffer
{
    float* dataPtr = buffer.contents;

    for (unsigned long index = 0; index < arrayLength; index++)
    {
        dataPtr[index] = (float)rand()/(float)(RAND_MAX);
    }
}

// After waitUntilCompleted, the CPU reads the GPU's output through the
// same `contents()` pointer — no readback copy is issued.
- (void) verifyResults
{
    float* a = _mBufferA.contents;
    float* b = _mBufferB.contents;
    float* result = _mBufferResult.contents;

    for (unsigned long index = 0; index < arrayLength; index++)
    {
        if (result[index] != (a[index] + b[index]))
        {
            printf("Compute ERROR: index=%lu result=%g vs %g=a+b\n",
                   index, result[index], a[index] + b[index]);
        }
    }
}
```

For a resource that should never be touched by the CPU at all (an intermediate GPU-only buffer or texture), switch to `.private`; the GPU can still read and write it, but only GPU commands (blit, compute, render) may access it:

```swift
let bufferOptions = MTLResourceOptions.storageModePrivate
let buffer = device.makeBuffer(length: 256,
                               options: bufferOptions)
```

## Notes

- This is the compute side of Metal on Apple silicon; the rendering-side Metal API (MTKView, render pipeline states, render command encoders) is covered by the separate apple-graphics skill.
- `storageModeShared` is what makes "unified memory" concrete: it is one physical allocation the CPU and GPU both address, unlike CUDA's managed memory which migrates pages between separate CPU and GPU memories.
- Derived from the official Apple sample "Performing calculations on a GPU" (distributed under the Apple Sample Code License, not MIT), archive published/d80f8573d811, and the code listings on developer.apple.com/documentation/metal/setting-resource-storage-modes ("Setting resource storage modes").
