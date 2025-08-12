import {
  Cartesian3,
  Math as CesiumMath,
  createOsmBuildingsAsync,
  Viewer,
} from "cesium";

export async function tutorialOne(viewer: Viewer) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
      heading: CesiumMath.toRadians(0.0),
      pitch: CesiumMath.toRadians(-15.0),
    },
  });
  // Add Cesium OSM Buildings, a global 3D buildings layer.
  const buildingTileSet = await createOsmBuildingsAsync();
  viewer.scene.primitives.add(buildingTileSet);
  return viewer;
}
