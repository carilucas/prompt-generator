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

        // 📋 Obtener reglas del usuario
        const rulesDB = await prisma.rule.findMany({
            where: { userId: user.userId },
            orderBy: { order: "asc" },
        });

        const rulesText = rulesDB.length > 0
            ? rulesDB.map(r => `- ${r.content}`).join("\n")
            : `- Start with a greeting in english
- Max 150 words
- Personalized first line
- Use ✔️ bullet points
- No generic phrases`;

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
${rulesText}


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