import { NextResponse } from "next/server";
import { moveFitRequestSchema } from "@/lib/validation/movefit";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    const result = moveFitRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid request.",
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      received: result.data,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Invalid JSON body.",
      },
      { status: 400 },
    );
  }
}