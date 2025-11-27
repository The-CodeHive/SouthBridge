import { NextResponse } from "next/server";
import { highlightCode } from "@/utils/shiki";

export async function POST(req: Request) {
  const { code, language } = await req.json();
  const html = await highlightCode(code, language);
  return NextResponse.json({ html });
}
