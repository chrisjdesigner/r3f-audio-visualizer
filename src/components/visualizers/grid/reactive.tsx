import BaseGrid from "./base";
import { VisualProps } from "../common";
import { COLOR_PALETTE } from "../palettes";

const GridVisual = ({
  coordinateMapper,
  palette = COLOR_PALETTE.SR,
}: VisualProps) => {

  // Set up the Grid Sizing
  const nGridRows = 60;
  const nGridCols = 60;
  const gridUnitSideLength = 0.025;
  const gridUnitSpacingScalar = 5;

  return (
    <>
      <BaseGrid
        coordinateMapper={coordinateMapper}
        nGridRows={nGridRows}
        nGridCols={nGridCols}
        cubeSideLength={gridUnitSideLength}
        cubeSpacingScalar={gridUnitSpacingScalar}
        palette={palette}
      />
    </>
  );
};

export default GridVisual;
