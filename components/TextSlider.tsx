import React from "react";
import Marquee from "react-fast-marquee";

const TextSlider = () => {
  const items = [
    "LIVRAISON 58 WILAYA",
    "PAYEMENT A LA LIVRAISON",
    "BIENVENUE A NOTRE NOUVEAU STORE",
    "TISSUE DE QUALITE SUPERIEUR",
  ];

  return (
    <div className="border-t border-b mt-5 py-3 border-black">
      <Marquee className="" gradient={false} speed={60}>
        <div className="flex items-center">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <span className="mx-4 font-extrabold text-sm">{item}</span>
              <span
                className="w-1 h-1 rounded-full bg-current inline-block"
                aria-hidden="true"
              ></span>
            </React.Fragment>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default TextSlider;
