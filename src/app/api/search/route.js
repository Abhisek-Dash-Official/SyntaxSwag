import { connectDB } from "@/lib/mongoDB.js";
import { outfit, deskware, sticker } from "@/models/products.js";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("searchTerm");
  if (!searchTerm) {
    return Response.json({ error: "Missing Search query" }, { status: 400 });
  }
  try {
    let data = [];
    const searchProducts = async (model, searchTerm) => {
      // "i" = case-insensitive
      return model.find({
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { desc_: { $regex: searchTerm, $options: "i" } },
        ],
      });
    };
    const [data1, data2, data3] = await Promise.all([
      searchProducts(outfit, searchTerm),
      searchProducts(deskware, searchTerm),
      searchProducts(sticker, searchTerm),
    ]);

    data = [...data1, ...data2, ...data3];
    return Response.json(data, { status: 200 });
  } catch (err) {
    console.error("DB Error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
