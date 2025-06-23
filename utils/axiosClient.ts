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
      "/products?fields=price,old_price,title&populate[banner][fields]=url&populate[images][fields]=url&populate[colors][fields]=color"
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

export async function createOrder(orderData: {
  customerInfo: {
    nom: string;
    prenom: string;
    wilaya: string;
    ville: string;
    address: string;
    phone: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color?: string;
    size?: string;
  }>;
  shippingMethod: string;
  shippingCost: number;
  subtotal: number;
  total: number;
}) {
  try {
    // A string to hold all the extra details for the 'notes' field
    const notes = `--- DETAILS DE LA COMMANDE ---
Méthode de livraison: ${orderData.shippingMethod}
Coût de livraison: ${orderData.shippingCost} DA
Sous-total: ${orderData.subtotal} DA
Total: ${orderData.total} DA

--- ARTICLES ---
${orderData.items
  .map(
    (item) =>
      `- ${item.name} (x${item.quantity}) | Couleur: ${
        item.color || "N/A"
      } | Taille: ${item.size || "N/A"}`
  )
  .join("\n")}
    `;

    // Format data according to the Strapi 'PurchaseRequest' schema
    const formattedData = {
      data: {
        customerName: `${orderData.customerInfo.nom} ${orderData.customerInfo.prenom}`,
        customerAddress: `${orderData.customerInfo.wilaya} - ${orderData.customerInfo.ville} - ${orderData.customerInfo.address}`,
        customerPhone: orderData.customerInfo.phone,
        // products: orderData.items.map((item) => parseInt(item.id, 10)), // Send an array of product IDs for the relation
        orderStatus: "Pending", // Default status, ensure 'Pending' is an option in Strapi
        notes: notes, // Add all other details to the 'notes' field
      },
    };

    const response = await api.post("/purchase-requests", formattedData);
    return response.data;
  } catch (error: any) {
    console.error("Error creating order:", error.response?.data?.error);
    throw error;
  }
}
