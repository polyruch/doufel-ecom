import React from "react";

interface Color {
  id: string;
  color: string;
}

interface ColorPickerProps {
  productColors: Color[];
  setSelectedColor: (color: string) => void;
  selectedColor: string;
}

const ColorPicker = ({
  productColors,
  setSelectedColor,
  selectedColor,
}: ColorPickerProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Color</h3>
      <div className="flex flex-wrap gap-2">
        {productColors.map((colorObj: Color) => (
          <button
            key={colorObj.id}
            onClick={() => setSelectedColor(colorObj.color)}
            className={`w-8 h-8 rounded-full border ${
              selectedColor === colorObj.color
                ? "ring-2 ring-offset-2"
                : "border-gray-300"
            }`}
            style={{
              backgroundColor: colorObj.color,
              ...(selectedColor === colorObj.color && {
                boxShadow: `0 0 0 2px white, 0 0 0 4px ${colorObj.color}`,
              }),
            }}
            aria-label={`Select ${colorObj.color} color`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
