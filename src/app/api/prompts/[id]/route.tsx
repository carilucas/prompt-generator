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
      return NextResponse.json(
        { message: "Unauthorized", ok: false },
        { status: 401 },
      );
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

    return NextResponse.json(
      { updated, message: "Prompt updated successfully", ok: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating prompt", ok: false },
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

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized", ok: false },
        { status: 401 },
      );
    }

    const prompt = await prisma.promptLog.findUnique({
      where: { id },
    });

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt not found", ok: false },
        { status: 404 },
      );
    }

    // seguridad multi-user
    if (prompt.userId !== user.userId) {
      return NextResponse.json(
        { message: "Forbidden", ok: false },
        { status: 403 },
      );
    }

    await prisma.promptLog.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Prompt deleted successfully", ok: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting prompt", ok: false },
      { status: 500 },
    );
  }
}
