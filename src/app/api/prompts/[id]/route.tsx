import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: Props) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { boosted, connects, viewed, won, answered } = await req.json();
    const { id } = await params;
    const updated = await prisma.promptLog.update({
      where: { id },
      data: {
        boosted,
        connects,
        viewed,
        won,
        answered,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating prompt" },
      { status: 500 },
    );
  }
}

interface DeleteProps {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: Request, { params }: DeleteProps) {
  try {
    const { id } = await params;
    console.log(id);
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prompt = await prisma.promptLog.findUnique({
      where: { id },
    });

    if (!prompt) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // seguridad multi-user
    if (prompt.userId !== user.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.promptLog.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting prompt" },
      { status: 500 },
    );
  }
}
