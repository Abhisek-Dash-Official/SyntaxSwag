import { connectDB } from "@/lib/mongoDB.js";
import UserPurchase from "@/models/UserPurchase.js";

export async function POST(req) {
  try {
    const body = await req.json();
    const { product_details, totalItems, totalPrice, user } = body;

    if (!product_details || !totalItems || !totalPrice || !user) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }
    await connectDB();

    const order = await UserPurchase.create({
      user,
      product_details,
      totalItems,
      totalPrice,
      date: new Date(),
    });
    return Response.json({ message: "Purchase successful", order });
  } catch (err) {
    console.error("Purchase error:", err);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
