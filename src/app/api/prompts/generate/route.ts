import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
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

        const {
            job,
            categoryId,
            title,
        } = await req.json();

        if (!job || !categoryId || !title) {
            return NextResponse.json(
                { message: "Missing required fields", ok: false },
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
                { message: "Category not found", ok: false },
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
- Explain that I communicate effectively in English, especially in writing, and I’m available for calls when needed to ensure smooth collaboration. Spanish is my native language. 
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

        return NextResponse.json(
            {
                prompt,
                id: saved.id,
                message: 'Yeah! prompt saved',
                ok: true
            },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error generating prompt", ok: false },
            { status: 500 }
        );
    }
}