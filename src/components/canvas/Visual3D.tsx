import { OrbitControls, Bounds, Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ApplicationMode, APPLICATION_MODE } from "../applicationModes";
import {
  ColorPaletteType,
  COLOR_PALETTE,
} from "../visualizers/palettes";
import AudioVisual from "../visualizers/visualizerAudio";
import WaveformVisual from "../visualizers/visualizerWaveform";

const getVisualizerComponent = (
  mode: ApplicationMode,
  visual: string,
  palette: ColorPaletteType
) => {
  switch (mode) {
    case APPLICATION_MODE.WAVE_FORM:
      return <WaveformVisual visual={visual} palette={palette} />;
    case APPLICATION_MODE.AUDIO:
      return <AudioVisual visual={visual} palette={palette} />;
    default:
      throw new Error(`Unknown mode ${mode}`);
  }
};
export interface Visual3DCanvasProps {
  mode: ApplicationMode;
}
const Visual3DCanvas = ({ mode }: Visual3DCanvasProps) => {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 1,
        far: 1000,
        position: [-17, -6, 6.5],
        up: [0, 0, 1],
      }}
    >
      
      {/* Lighting */}
      <ambientLight />

      {/* Visualizer */}
      {getVisualizerComponent(mode as ApplicationMode, "grid", COLOR_PALETTE.SR)}

      {/* Transparent Box to Control the Current Camera */}
      <Bounds fit clip observe damping={10} margin={2}>
        <Box args={[7.5, 7.5, 2]} position={[0, 1, 0]}>
          <meshPhongMaterial color="#ff0000" opacity={0} transparent />
        </Box>
      </Bounds>
      
      {/* Orbit Controls */}
      <OrbitControls makeDefault />
    </Canvas>
  );
};

export default Visual3DCanvas;
