import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Body received:", body);

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    console.log("Attempting Supabase insert...");
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

    const { data, error } = await supabase
      .from("contacts")
      .insert([{ name, email, message }]);

    console.log("Supabase response:", { data, error });

    if (error) throw error;

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}