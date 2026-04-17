import { getCurrentUser } from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized", ok: false },
                { status: 401 }
            );
        }
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json(
                { message: "Prompt required", ok: false },
                { status: 400 }
            );
        }

        const callAI = async (model: string) => {
            const res = await fetch(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model,
                        messages: [
                            {
                                role: "system",
                                content:
                                    "You are an expert freelancer who writes high-converting Upwork proposals.",
                            },
                            {
                                role: "user",
                                content: prompt,
                            },
                        ],
                    }),
                }
            );

            const data = await res.json();
            // console.log("MODEL:", model);
            // console.log("RESPONSE:", data);
            return data?.choices?.[0]?.message?.content || null;
        };

        // 🔥 Ejecutar en paralelo (IMPORTANTE para performance)
        const [proposalA, proposalB] = await Promise.all([
            // callAI("openai/gpt-3.5-turbo"),
            // callAI("openrouter/elephant-alpha"),
            callAI("openai/gpt-oss-20b"),
            callAI("qwen/qwen3-next-80b-a3b-instruct"),
        ]);

        return NextResponse.json({
            proposalA,
            proposalB,
            ok: true,
        });
    } catch (error) {
        return NextResponse.json(
            { message: "AI error", ok: false },
            { status: 500 }
        );
    }
}