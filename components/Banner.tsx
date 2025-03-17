"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";
import { getBanner } from "@/utils/axiosClient";

const Banner = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getBanner();
        if (data.data?.Image?.url) {
          setImageUrl(data.data.Image.url);
        } else {
          console.error("Banner image URL not found in response");
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanner();
  }, []);

  return (
    <div className="relative h-[25vh] min-h-[200px] sm:min-h-[400px] w-full overflow-hidden ">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
        </div>
      ) : imageUrl ? (
        <Image
          src={imageUrl}
          alt="Girly Chic Boutique Banner"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      ) : null}
      <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center"></div>
    </div>
  );
};

export default Banner;
