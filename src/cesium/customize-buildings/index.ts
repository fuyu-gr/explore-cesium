import {
  Cartesian3,
  Cesium3DTileset,
  Cesium3DTileStyle,
  ClassificationType,
  createOsmBuildingsAsync,
  GeoJsonDataSource,
  IonResource,
  type Viewer,
} from "cesium";

export async function customizeBuildings(viewer: Viewer) {
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-104.9965, 39.74248, 4000), // Denver, Colorado
  });
  const buildings = await createOsmBuildingsAsync();
  toggleButton(buildings, "Toggle Other Buildings");
  viewer.scene.primitives.add(buildings);
  await loadCustomArea(viewer);
  hideBuildingsInCustomArea(buildings);
  let newBuilding = await loadBuilding(viewer);
  toggleButton(newBuilding, "Toggle New Building", "50px");
  return viewer;
}

async function loadCustomArea(viewer: Viewer) {
  // Load the GeoJSON file from Cesium ion.
  const resource = await IonResource.fromAssetId(3624545);
  // Create the geometry from the GeoJSON, and clamp it to the ground.
  const geoJSON = await GeoJsonDataSource.load(resource, {
    clampToGround: true,
  });
  const dataSource = await viewer.dataSources.add(geoJSON); // loads a yellowish square in that area
  // only do this to not let the buildings in the area be occluded by the polygon
  for (const entity of dataSource.entities.values) {
    if (entity.polygon)
      entity.polygon.classificationType = ClassificationType.TERRAIN as any;
  }
  viewer.flyTo(dataSource);
}

function hideBuildingsInCustomArea(buildings: Cesium3DTileset) {
  buildings.style = new Cesium3DTileStyle({
    show: {
      conditions: [
        // // Any building that has this elementId will have `show = false`.
        ["${elementId} === 332469316", false],
        ["${elementId} === 332469317", false],
        ["${elementId} === 235368665", false],
        ["${elementId} === 530288180", false],
        ["${elementId} === 530288179", false],
        ["${elementId} === 532245203", false],
        // If a building does not have one of these elementIds, set `show = true`.
        [true, true],
      ],
    },
  });
}

async function loadBuilding(viewer: Viewer) {
  const resource = await Cesium3DTileset.fromIonAssetId(3624582);
  const tileSet = viewer.scene.primitives.add(resource);
  viewer.flyTo(tileSet);
  return tileSet;
}

function toggleButton(buildings: Cesium3DTileset, text: string, top = "5px") {
  const button = document.createElement("toggle-building");
  button.textContent = text;
  button.style.position = "fixed";
  button.style.top = top;
  button.style.left = "5px";
  button.style.zIndex = "1";
  button.style.backgroundColor = "white";
  button.style.padding = "5px";
  button.onclick = () => {
    buildings.show = !buildings.show;
  };
  document.body.appendChild(button);
}
