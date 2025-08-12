import "cesium/Build/Cesium/Widgets/widgets.css";
import { lookAtMtEverest } from "./everest";
import { initViewer } from "./init-viewer";
import { tutorialOne } from "./tutorial-1";

export async function initCesium() {
  let viewer = initViewer();
  // await tutorialOne(viewer);
  lookAtMtEverest(viewer);
  return viewer;
}
