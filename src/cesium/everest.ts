import {
  Cartesian3,
  Math as CesiumMath,
  HeadingPitchRange,
  Viewer,
} from "cesium";

export function lookAtMtEverest(viewer: Viewer) {
  const everestPosition = Cartesian3.fromDegrees(86.9254, 27.9882, 8848); // Everest coordinates
  const cameraPosition = new HeadingPitchRange(
    CesiumMath.toRadians(280), // degree rotation or angle
    CesiumMath.toRadians(-10), // pitch or updown angle
    20000 // range
  );
  viewer.camera.lookAt(everestPosition, cameraPosition);
  return viewer;
}
