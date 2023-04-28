import React, { Suspense } from "react";
import { useEnergyInfo, useVisualSourceDataX } from "../../appState";
import { CoordinateMapper_Data } from "../mappers/coordinateMappers/data";
import { EnergyTracker } from "../mappers/valueTracker/energyTracker";
import { ColorPaletteType, COLOR_PALETTE } from "./palettes";

interface AudioVisualProps {
  visual: string;
  palette?: ColorPaletteType;
}

const AudioVisual = ({
  visual,
  palette = COLOR_PALETTE.SR,
}: AudioVisualProps) => {
  const freqData = useVisualSourceDataX();
  const energyInfo = useEnergyInfo();
  const amplitude = 1.0;

  const coordinateMapper = new CoordinateMapper_Data(amplitude, freqData);
  const energyTracker = new EnergyTracker(energyInfo);
  const VisualComponent = React.lazy(() => import(`./${visual}/reactive.tsx`));

  return (
    <Suspense fallback={null}>
      <VisualComponent
        coordinateMapper={coordinateMapper}
        scalarTracker={energyTracker}
        palette={palette}
      />
    </Suspense>
  );
};

export default AudioVisual;
