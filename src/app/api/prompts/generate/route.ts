import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const {
            job,
            categoryId,
            title,
        } = await req.json();

        if (!job || !categoryId || !title) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // 🔎 Obtener categoría + perfil
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
            include: {
                profile: true,
            },
        });

        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        // 🧠 Construir perfil dinámico
        const profileText = category.profile
            ? `
- ${category.profile.experience}
- ${category.profile.roles}
- ${category.profile.strength}
`
            : "";

        // 🧠 Generar prompt
        const prompt =
            `You are an expert in Upwork proposals.

Write a short, high-converting proposal.

Job:
${job}

Focus:
${category.name}
- Clean execution

My profile:
${profileText}

Rules:
- Start with a gretting in english
- Max 150 words
- Personalized first line
- Use ✔️ bullet points
- No generic phrases
- Explain that Spanish is my native language, I can communicate in English in writing and if necessary we can do so orally considering that my level of spoken English is intermediate.
- For the final CTA, don't suggest a call, it should be soft not agressive.  
- End with Carlos Mora

Generate proposal:
`;



        // 💾 Guardar en DB
        const saved = await prisma.promptLog.create({
            data: {
                title,
                job,
                output: prompt,
                userId: user.userId,
                categoryId,
            },
        });

        return NextResponse.json({
            prompt,
            id: saved.id,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error generating prompt" },
            { status: 500 }
        );
    }
}