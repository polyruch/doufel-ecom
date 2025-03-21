import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

export default api;

export async function getBanner() {
  try {
    const response = await api.get("/banner?populate[Image][fields]=url");
    return response.data;
  } catch (error) {
    console.error("Error fetching banner:", error);
    throw error;
  }
}

export async function getProducts() {
  try {
    const response = await api.get(
      "/products?fields=price,title&populate[banner][fields]=url&populate[images][fields]=url"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProduct(id: string) {
  try {
    const response = await api.get(`/products/${id}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

// export async function getProduct(id) {
//     try {
//       const response = await api.get(`/products/${id}?populate=*`);
//       return response.data.data;
//     } catch (error) {
//       console.error("Error fetching product:", error);
//       throw error;
//     }
//   }
