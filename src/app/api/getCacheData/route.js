import redis from "@/lib/redis";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  
  try {
    const data = await redis.get(key);
    const parsedData = data ? JSON.parse(data) : null;

    return new Response(JSON.stringify({ success: true, data: parsedData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching data from Redis", error }),
      { status: 500 }
    );
  }
}
