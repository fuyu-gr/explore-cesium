import {
  Cartesian3,
  Math as CesiumMath,
  HeadingPitchRange,
  Viewer,
} from "cesium";

export function lookAtSouthSanFran(viewer: Viewer) {
  const sanFranLocation = Cartesian3.fromDegrees(-122.4175, 37.655, 400); // Everest coordinates
  const cameraPosition = new HeadingPitchRange(
    CesiumMath.toRadians(0), // degree rotation or angle
    CesiumMath.toRadians(-30), // pitch or updown angle
    500 // range
  );
  viewer.camera.lookAt(sanFranLocation, cameraPosition);
  return viewer;
}
