import "cesium/Build/Cesium/Widgets/widgets.css";
import { lookAtMtEverest } from "./everest";
import { initViewer } from "./common/init-viewer";
import { tutorialOne } from "./tutorial-1";
import { flightTracker } from "./flight-tracker";

export async function initCesium() {
  let viewer = initViewer();
  // await tutorialOne(viewer);
  // lookAtMtEverest(viewer);
  flightTracker(viewer);
  return viewer;
}
