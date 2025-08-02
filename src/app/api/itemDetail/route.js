import { connectDB } from "@/lib/mongoDB.js";
import { outfit, deskware, sticker } from "@/models/products.js";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const _id = searchParams.get("_id");
  const type = searchParams.get("type");

  if (!_id || !type) {
    return Response.json({ error: "Missing id or type" }, { status: 400 });
  }
  try {
    let item;
    if (type === "outfits") {
      item = await outfit.findOne({ _id, type });
    } else if (type === "deskwares") {
      item = await deskware.findOne({ _id, type });
    } else if (type === "stickers") {
      item = await sticker.findOne({ _id, type });
    }
    if (!item) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(item, { status: 200 });
  } catch (err) {
    console.error("DB Error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
