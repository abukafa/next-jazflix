import sharp from "sharp";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    const res = await fetch(url);
    const buffer = await res.arrayBuffer();

    const resized = await sharp(Buffer.from(buffer))
      .resize(300) // <= ukuran poster
      .jpeg({ quality: 70 })
      .toBuffer();

    return new Response(resized, {
      headers: { "Content-Type": "image/jpeg" },
    });
  } catch {
    return new Response(null, { status: 500 });
  }
}
