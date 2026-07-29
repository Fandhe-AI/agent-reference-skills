# Resource Group Argument Buffer for a Compute Function

Bind several resources (a texture, a buffer, and a constant) to a compute function through a single argument buffer instead of one bind call per resource.

```metal
// The argument buffer's layout, declared once and shared by CPU-side
// encoding code and the kernel that reads it.
struct ArgumentBufferExample {
    texture2d<float, access::write> a;
    depth2d<float> b;
    sampler c;
    texture2d<float> d;
    device float4* e;
    texture2d<float> f;
    int g;
};

kernel void example(constant ArgumentBufferExample & argumentBuffer [[buffer(0)]],
                    uint index [[thread_position_in_grid]])
{
    // Every resource referenced through `argumentBuffer` was bound with
    // a single setBuffer: call on the CPU side, not one bind per field.
    float4 sample = argumentBuffer.e[index];
    argumentBuffer.a.write(sample, uint2(index, 0));
}
```

```objc
// CPU side: build the argument buffer once with an argument encoder,
// then reuse it across frames instead of re-binding each resource.
id<MTLArgumentEncoder> argumentEncoder =
    [computeFunction newArgumentEncoderWithBufferIndex:0];

NSUInteger argumentBufferLength = argumentEncoder.encodedLength;
_argumentBuffer = [_device newBufferWithLength:argumentBufferLength options:0];

[argumentEncoder setArgumentBuffer:_argumentBuffer offset:0];
[argumentEncoder setTexture:_outputTexture atIndex:0];
[argumentEncoder setBuffer:_sourceBuffer offset:0 atIndex:4];

// The compute encoder must declare that the kernel will access these
// resources indirectly through the argument buffer — Metal cannot
// discover that dependency from setBuffer: alone.
[computeEncoder useResource:_outputTexture usage:MTLResourceUsageWrite];
[computeEncoder useResource:_sourceBuffer usage:MTLResourceUsageRead];
[computeEncoder setBuffer:_argumentBuffer offset:0 atIndex:0];
```

## Notes

- This is the compute side of Metal on Apple silicon; the rendering-side Metal API (MTKView, render pipeline states, render command encoders) is covered by the separate apple-graphics skill.
- Bundling resources into one argument buffer means one `setBuffer:` on the compute encoder replaces N per-resource bind calls, which is the CPU-overhead win described in the source doc.
- Any resource the kernel reaches only through the argument buffer (not bound directly to the encoder) needs an explicit `useResource:` call so Metal knows to make it resident.
- Derived from the code listings on developer.apple.com/documentation/metal/improving-cpu-performance-by-using-argument-buffers ("Improving CPU performance by using argument buffers") and developer.apple.com/documentation/metal/managing-groups-of-resources-with-argument-buffers ("Managing groups of resources with argument buffers"), adapted from the docs' fragment-function example to a compute function.
