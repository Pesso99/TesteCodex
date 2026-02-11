import { NextResponse } from "next/server";
import { ComposeRequestSchema } from "@/lib/schemas/advisor";
import { generateComposeOutput } from "@/lib/api/compose";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = ComposeRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Payload inválido", details: parsed.error.flatten() }, { status: 400 });
    }

    const output = generateComposeOutput(parsed.data);
    return NextResponse.json({ mode: "mock", output });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro interno na composição";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
