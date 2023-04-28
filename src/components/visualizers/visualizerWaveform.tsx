import { useControls } from "leva";
import React, { Suspense, useEffect } from "react";
import { CoordinateMapper_WaveformSuperposition } from "../mappers/coordinateMappers/waveform";
import { ColorPaletteType, COLOR_PALETTE } from "./palettes";

interface WaveformVisualizerProps {
  visual: string;
  palette?: ColorPaletteType;
}

const WaveformVisual = ({
  visual,
  palette = COLOR_PALETTE.SR,
}: WaveformVisualizerProps) => {
  const VisualComponent = React.lazy(() => import(`./${visual}/reactive.tsx`));
  const double = visual == "waveform";
  const amplitude = 0.7;
  const frequencyHz_1 = 2.0;
  const frequencyHz_2 = 10.0;

  const coordinateMapper = new CoordinateMapper_WaveformSuperposition(
    double ? [frequencyHz_1, frequencyHz_2] : [frequencyHz_1],
    amplitude
  );

  return (
    <>
      <Suspense fallback={null}>
        <VisualComponent
          coordinateMapper={coordinateMapper}
          palette={palette}
        />
      </Suspense>
    </>
  );
};

export default WaveformVisual;
