# Motion Overview

Motion describes the way the interface animates and responds to user interaction. Motion in Windows is reactive, direct, and context appropriate — it provides feedback to user input and reinforces spatial paradigms that support way-finding. This guidance describes how the Fluent Design motion language is applied to Windows apps.

## Signature / Usage

Windows motion is fast, direct, and context-appropriate. Timing and easing curves are adjusted based on the purpose of the animation to create a coherent experience.

| Purpose | Definition | Ease | Timing | Used For |
|---|---|---|---|---|
| Direct Entrance | Fast – In | Cubic-bezier(0,0,0,1) | 167, 250, 333ms | Position, Scale, Rotation |
| Existing Elements | Point to Point | Cubic-bezier(0.55,0.55,0,1) | 167, 250, 333ms | Position, Scale, Rotation |
| Direct Exit | Fast – Out | Cubic-bezier(0,0,0,1) | 167ms | Position, Scale, Rotation (ALWAYS combine with fade out) |
| Gentle Exit | Soft – Out | Cubic-bezier(1,0,1,1) | 167ms | Position, Scale |
| Bare Minimum | Fade – In + Out | Linear | 83ms | Opacity |
| Strong Entrance (Keyframe 1) | Elastic In | Cubic-Bezier(0.85, 0, 0, 1) | 167ms | Position, Scale |
| Strong Entrance (Keyframe 2) | Elastic In | Cubic-Bezier(0.85, 0, 0.75, 1) | 167ms | Position, Scale |
| Strong Entrance (Keyframe 3) | Elastic In | Cubic-Bezier(0.85, 0, 0, 1) | 333ms | Position, Scale |

## Notes

- Avoid custom animations where possible. Use existing WinUI 3 animation resources — page transitions, in-page focus, and micro interactions — for consistency. If you can't use WinUI controls, mimic existing OS behaviors based on where the app entry point lives.
- The recommended WinUI motion controls are: page transitions, connected animations, and animated icons.
- This guidance describes how the Fluent Design language is applied to Windows apps; see Fluent Design - Motion (fluent2.microsoft.design) for the underlying design system.

## Related

- [Motion Principles](./motion-principles.md)
- [Timing and Easing](./timing-and-easing.md)
- [Page Transitions](./page-transitions.md)
- [Connected Animation](./connected-animation.md)
