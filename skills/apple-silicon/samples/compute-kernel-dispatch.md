# Metal Compute Kernel Dispatch

Run a compute-only round trip on the GPU: device, library, function, pipeline state, command buffer, encoder, dispatch, and readback.

```objc
// MetalAdder.m — the host-side controller class.
const unsigned int arrayLength = 1 << 24;
const unsigned int bufferSize = arrayLength * sizeof(float);

@implementation MetalAdder
{
    id<MTLDevice> _mDevice;
    id<MTLComputePipelineState> _mAddFunctionPSO;
    id<MTLCommandQueue> _mCommandQueue;
    id<MTLBuffer> _mBufferA;
    id<MTLBuffer> _mBufferB;
    id<MTLBuffer> _mBufferResult;
}

- (instancetype) initWithDevice: (id<MTLDevice>) device
{
    self = [super init];
    if (self)
    {
        _mDevice = device;
        NSError* error = nil;

        id<MTLLibrary> defaultLibrary = [_mDevice newDefaultLibrary];
        if (defaultLibrary == nil)
        {
            NSLog(@"Failed to find the default library.");
            return nil;
        }

        id<MTLFunction> addFunction = [defaultLibrary newFunctionWithName:@"add_arrays"];
        if (addFunction == nil)
        {
            NSLog(@"Failed to find the adder function.");
            return nil;
        }

        // Compiling the pipeline state can fail (bad function, unsupported device);
        // the error is surfaced through `error`, never silently swallowed.
        _mAddFunctionPSO = [_mDevice newComputePipelineStateWithFunction: addFunction error:&error];
        if (_mAddFunctionPSO == nil)
        {
            NSLog(@"Failed to created pipeline state object, error %@.", error);
            return nil;
        }

        _mCommandQueue = [_mDevice newCommandQueue];
        if (_mCommandQueue == nil)
        {
            NSLog(@"Failed to find the command queue.");
            return nil;
        }
    }
    return self;
}

- (void) prepareData
{
    // storageModeShared: on Apple silicon's unified memory, CPU writes here
    // are visible to the GPU without an explicit copy or blit.
    _mBufferA = [_mDevice newBufferWithLength:bufferSize options:MTLResourceStorageModeShared];
    _mBufferB = [_mDevice newBufferWithLength:bufferSize options:MTLResourceStorageModeShared];
    _mBufferResult = [_mDevice newBufferWithLength:bufferSize options:MTLResourceStorageModeShared];

    [self generateRandomFloatData:_mBufferA];
    [self generateRandomFloatData:_mBufferB];
}

- (void) sendComputeCommand
{
    id<MTLCommandBuffer> commandBuffer = [_mCommandQueue commandBuffer];
    id<MTLComputeCommandEncoder> computeEncoder = [commandBuffer computeCommandEncoder];

    [self encodeAddCommand:computeEncoder];
    [computeEncoder endEncoding];
    [commandBuffer commit];

    // Blocking wait keeps this sample linear; real apps overlap CPU work
    // with GPU execution instead of waiting synchronously.
    [commandBuffer waitUntilCompleted];

    [self verifyResults];
}

- (void)encodeAddCommand:(id<MTLComputeCommandEncoder>)computeEncoder {
    [computeEncoder setComputePipelineState:_mAddFunctionPSO];
    [computeEncoder setBuffer:_mBufferA offset:0 atIndex:0];
    [computeEncoder setBuffer:_mBufferB offset:0 atIndex:1];
    [computeEncoder setBuffer:_mBufferResult offset:0 atIndex:2];

    MTLSize gridSize = MTLSizeMake(arrayLength, 1, 1);

    NSUInteger threadGroupSize = _mAddFunctionPSO.maxTotalThreadsPerThreadgroup;
    if (threadGroupSize > arrayLength)
    {
        threadGroupSize = arrayLength;
    }
    MTLSize threadgroupSize = MTLSizeMake(threadGroupSize, 1, 1);

    // dispatchThreads (non-uniform threadgroup): Metal never launches a
    // thread whose position is outside `gridSize`, so the kernel below
    // needs no bounds check for this dispatch form.
    [computeEncoder dispatchThreads:gridSize
              threadsPerThreadgroup:threadgroupSize];
}
@end
```

```metal
// add.metal — the MSL kernel invoked once per element.
#include <metal_stdlib>
using namespace metal;

kernel void add_arrays(device const float* inA,
                       device const float* inB,
                       device float* result,
                       uint index [[thread_position_in_grid]])
{
    result[index] = inA[index] + inB[index];
}
```

## Notes

- This is the compute side of Metal on Apple silicon; the rendering-side Metal API (MTKView, render pipeline states, render command encoders) is covered by the separate apple-graphics skill.
- Uses `dispatchThreads:threadsPerThreadgroup:` (non-uniform threadgroup dispatch), so no out-of-bounds thread ever calls the kernel — no index guard needed in `add_arrays`.
- Derived from the official Apple sample "Performing calculations on a GPU" (distributed under the Apple Sample Code License, not MIT), archive published/d80f8573d811.
