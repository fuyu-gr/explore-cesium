import {
  Cartesian3,
  Color,
  createOsmBuildingsAsync,
  IonResource,
  JulianDate,
  PathGraphics,
  SampledPositionProperty,
  TimeInterval,
  TimeIntervalCollection,
  VelocityOrientationProperty,
  type Viewer,
} from "cesium";
import { flightData } from "./flight-data";

export async function flightTracker(viewer: Viewer) {
  const osmBuildings = await createOsmBuildingsAsync();
  viewer.scene.primitives.add(osmBuildings); // adds buildings
  let { start, stop, timeStepInSeconds } = setupClock(viewer);
  // map flight points
  let positionProperty = mapFlightPoints(viewer, start, timeStepInSeconds);
  // airplane entity and tracking
  const plane = await loadPlane();
  const airplaneEntity = viewer.entities.add({
    availability: new TimeIntervalCollection([
      new TimeInterval({ start: start, stop: stop }),
    ]),
    position: positionProperty,
    model: { uri: plane },
    orientation: new VelocityOrientationProperty(positionProperty),
    path: new PathGraphics({ width: 3 }),
  });
  viewer.trackedEntity = airplaneEntity;
  return viewer;
}

function setupClock(viewer: Viewer) {
  // timer setup through JulianDate as the library uses this for time management
  const timeStepInSeconds = 30; // estimated time between two points
  const totalSeconds = timeStepInSeconds * (flightData.length - 1);
  const start = JulianDate.fromIso8601("2020-03-09T23:10:00Z");
  const stop = JulianDate.addSeconds(start, totalSeconds, new JulianDate());
  viewer.clock.startTime = start.clone();
  viewer.clock.stopTime = stop.clone();
  viewer.clock.currentTime = start.clone();
  viewer.timeline.zoomTo(start, stop);
  viewer.clock.multiplier = 100; // playback speed
  viewer.clock.shouldAnimate = true; // start playback
  return {
    start,
    stop,
    timeStepInSeconds,
  };
}
function mapFlightPoints(
  viewer: Viewer,
  start: JulianDate,
  timeStepInSeconds: number
) {
  // SampledPositionedProperty stores position and timestamp for each sample along the radar sample series.
  const positionProperty = new SampledPositionProperty();
  for (let point = 0; point < flightData.length; point++) {
    const dataPoint = flightData[point];
    const time = JulianDate.addSeconds(
      start,
      point * timeStepInSeconds,
      new JulianDate()
    );
    const position = Cartesian3.fromDegrees(
      dataPoint.longitude,
      dataPoint.latitude,
      dataPoint.height
    );
    // Store the position along with its timestamp.
    positionProperty.addSample(time, position);
    viewer.entities.add({
      description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
      position: position,
      point: { pixelSize: 10, color: Color.RED },
    });
  }
  return positionProperty;
}
/*
  Used Cesium ion dashboard to upload and generate a glTF model of an airplane.
  Model used:
  https://cesium.cdn.prismic.io/cesium/Zv2eybVsGrYSwUFj_Cesium_Air.glb
  */
async function loadPlane() {
  // Load the glTF model from Cesium ion.
  const airplaneUri = await IonResource.fromAssetId(3624181);
  return airplaneUri;
}
