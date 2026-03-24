import { cookies } from "next/headers";

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) return null;
    try {
        return JSON.parse(session.value);

    } catch (error) {
        return null
    }
}