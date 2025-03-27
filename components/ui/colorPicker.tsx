import React from "react";

const ColorPicker = ({
  productColors,
  setSelectedColor,
  selectedColor,
}: any) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Color</h3>
      <div className="flex flex-wrap gap-2">
        {productColors.map((color: { id: string; color: string }) => (
          <button
            key={color.id}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full border ${
              selectedColor === color
                ? "ring-2 ring-offset-2"
                : "border-gray-300"
            }`}
            style={{
              backgroundColor: color.color,
              ...(selectedColor === color && {
                boxShadow: `0 0 0 2px white, 0 0 0 4px ${color.color}`,
              }),
            }}
            aria-label={`Select ${color} color`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
