# Directionality and Gravity

Directional signals help solidify the mental model of the journey a user takes across experiences. Direction of any motion should support both the continuity of the space and the integrity of the objects within it. Directional movement is subject to forces like gravity, which reinforces the natural feel of motion.

## Options / Props

### Direction of movement

Objects can move in any world axis (X, Y, Z), mirroring physical motion. When moving objects, avoid unnatural collisions, and always support higher-level constructs already present in the scene, such as scroll direction or layout hierarchy.

### Direction of navigation

Navigation direction between scenes is conceptual: users navigate forward and back, and scenes move in and out of view.

| Navigation | Behavior |
|---|---|
| Forward (A to B) | Simple A-to-B move; standard easing plus a feeling of gravity is added to make the movement feel physical. |
| Backward (B to A) | Movement is reversed; timing is quicker and more direct, using the decelerate easing, since the user expects to be returned to the previous state as soon as possible. |

When navigation replaces on-screen items rather than moving a single object, show where the exiting scene goes and where the incoming scene comes from. This solidifies the user's mental model, gives more time to prepare incoming content, and improves perceived performance. There are four discrete directions of navigation to consider:

| Direction | Behavior |
|---|---|
| Forward-In | Content decelerates into the scene without colliding with outgoing content. |
| Forward-Out | Content exits quickly; objects accelerate off screen. |
| Backward-In | Same as Forward-In, but reversed. |
| Backward-Out | Same as Forward-Out, but reversed. |

### Gravity

Objects that move on the Z-axis and aren't anchored to the scene by an on-screen affordance can be affected by gravity. As an object breaks free of the scene and before it reaches escape velocity, gravity pulls down on it, creating a more natural trajectory. Gravity typically manifests when an object must jump from one scene to another — this is why connected animation uses the concept of gravity.

## Notes

- Applies to `GravityConnectedAnimationConfiguration`, the default and recommended configuration for forward navigation in connected animations. See Connected Animation for the API-level configuration.

## Related

- [Motion Overview](./motion-overview.md)
- [Timing and Easing](./timing-and-easing.md)
- [Connected Animation](./connected-animation.md)
- [Page Transitions](./page-transitions.md)
