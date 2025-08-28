import { FixedSizeGrid as Grid } from "react-window";
import { FoodCard } from "./FoodCard";
import type { Food } from "../types/food.types";
import { useMemo } from "react";

type VirtualizedFoodListProps = {
  foods: Food[];
  showActions?: boolean;
  isPending?: boolean;
};

const CARD_WIDTH = 400; // Approximate width including margin
const CARD_HEIGHT = 200; // Approximate height including margin
const GRID_PADDING = 20;

export function VirtualizedFoodList({ 
  foods, 
  showActions = false, 
  isPending = false 
}: VirtualizedFoodListProps) {
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth - 40 : 800;
  const columnsCount = Math.max(1, Math.floor(containerWidth / CARD_WIDTH));
  const rowsCount = Math.ceil(foods.length / columnsCount);

  const itemData = useMemo(() => ({
    foods,
    columnsCount,
    showActions
  }), [foods, columnsCount, showActions]);

  const Cell = ({ columnIndex, rowIndex, style, data }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
    data: { foods: Food[]; columnsCount: number; showActions: boolean };
  }) => {
    const index = rowIndex * data.columnsCount + columnIndex;
    const food = data.foods[index];

    if (!food) {
      return <div style={style} />;
    }

    return (
      <div style={style}>
        <div style={{ padding: '8px' }}>
          <FoodCard food={food} showActions={data.showActions} />
        </div>
      </div>
    );
  };

  if (foods.length === 0) {
    return <div>No foods found.</div>;
  }

  return (
    <div style={{ opacity: isPending ? 0.7 : 1 }}>
      <Grid
        columnCount={columnsCount}
        columnWidth={CARD_WIDTH}
        height={600} // Fixed height for the container
        rowCount={rowsCount}
        rowHeight={CARD_HEIGHT}
        width={containerWidth}
        itemData={itemData}
      >
        {Cell}
      </Grid>
    </div>
  );
}