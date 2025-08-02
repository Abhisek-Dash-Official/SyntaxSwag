import { connectDB } from "@/lib/mongoDB.js";
import { outfit, deskware, sticker } from "@/models/products.js";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;

  if (!type) {
    return Response.json({ error: "Missing type" }, { status: 400 });
  }

  let filter = {};

  // Colors (colors= "red")
  if (searchParams.get("colors")) {
    const colors = searchParams.get("colors");
    filter.colors = { $eq: colors };
  }

  // Price (price= "<100" or ">1000" ...)
  if (searchParams.get("price")) {
    const priceFilter = searchParams.get("price");

    if (priceFilter.startsWith("<")) {
      const max = Number(priceFilter.slice(1));
      filter.price = { $lt: max };
    } else if (priceFilter.startsWith(">")) {
      const min = Number(priceFilter.slice(1));
      filter.price = { $gt: min };
    }
  }

  // Category
  if (searchParams.get("category")) {
    filter.category = searchParams.get("category");
  }

  // Popular
  if (searchParams.get("popular") === "true") {
    filter.reviews = { $gt: 5000 };
  }

  try {
    let model;
    if (type === "outfits") model = outfit;
    else if (type === "deskwares") model = deskware;
    else if (type === "stickers") model = sticker;
    else return Response.json({ error: "Invalid type" }, { status: 400 });

    const products = await model
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    if (!products.length) {
      return Response.json([], { status: 404 });
    }

    return Response.json(products, { status: 200 });
  } catch (err) {
    console.error("DB Error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
