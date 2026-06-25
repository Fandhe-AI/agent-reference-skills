# ARKit

| Name | Description | Path |
|------|-------------|------|
| ARSession | Core iOS AR session: motion tracking, camera control, image analysis | [arsession.md](./arsession.md) |
| ARConfiguration | Abstract base class for AR session configurations | [arconfiguration.md](./arconfiguration.md) |
| ARWorldTrackingConfiguration | 6DOF world tracking with plane detection, image/object detection, and LiDAR | [arworldtrackingconfiguration.md](./arworldtrackingconfiguration.md) |
| ARAnchor | Position and orientation of a tracked item in world coordinate space (iOS) | [aranchor.md](./aranchor.md) |
| ARFrame | Captured video frame with camera data, anchors, depth, and scene analysis | [arframe.md](./arframe.md) |
| ARPlaneAnchor | 2D planar surface detected by world tracking (iOS) | [arplaneanchor.md](./arplaneanchor.md) |
| ARSCNView | SceneKit AR view (deprecated iOS 26; migrate to RealityView) | [arscnview.md](./arscnview.md) |
| ARRaycastQuery | Mathematical ray for finding 3D positions on real-world surfaces | [arraycastquery.md](./arraycastquery.md) |
| ARCamera | Camera position, orientation, tracking state, and imaging parameters for a frame | [arcamera.md](./arcamera.md) |
| ARKitSession | visionOS entry point for managing AR data providers and authorization | [arkitsession.md](./arkitsession.md) |
| WorldTrackingProvider | visionOS provider for device pose and persistent world anchors | [worldtrackingprovider.md](./worldtrackingprovider.md) |
| HandTrackingProvider | visionOS provider for real-time hand and joint tracking | [handtrackingprovider.md](./handtrackingprovider.md) |
| SceneReconstructionProvider | visionOS provider for 3D mesh reconstruction of surroundings | [scenereconstructionprovider.md](./scenereconstructionprovider.md) |
| PlaneDetectionProvider | visionOS provider for detecting horizontal and vertical planes | [planedetectionprovider.md](./planedetectionprovider.md) |
| DeviceAnchor | Position and orientation of Apple Vision Pro obtained from WorldTrackingProvider | [deviceanchor.md](./deviceanchor.md) |
