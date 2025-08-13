import "cesium/Build/Cesium/Widgets/widgets.css";
import { lookAtMtEverest } from "./everest";
import { initViewer } from "./common/init-viewer";
import { tutorialOne } from "./tutorial-1";
import { flightTracker } from "./flight-tracker";
import { customizeBuildings } from "./customize-buildings";

export async function initCesium() {
  let viewer = initViewer();
  // await tutorialOne(viewer);
  // lookAtMtEverest(viewer);
  // await flightTracker(viewer);
  await customizeBuildings(viewer);
  return viewer;
}
