import { Ion, Terrain, Viewer } from "cesium";

export function initViewer(options?: Viewer.ConstructorOptions) {
  const containerId = import.meta.env.VITE_CESIUM_CONTAINER_ID;
  Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN;
  //   console.log("Cesium Ion access token set:", Ion.defaultAccessToken);
  //   console.log("Cesium container ID:", containerId);
  if (!options) {
    options = {
      terrain: Terrain.fromWorldTerrain(),
    };
  }
  const viewer = new Viewer(containerId, options);
  return viewer;
}
