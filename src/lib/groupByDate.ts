export const groupByDate = (allPrompts: any[]) => {
    const map: Record<string, any> = {};

    allPrompts.forEach((p) => {
        const date = p.createdAt.toISOString().split("T")[0];

        if (!map[date]) {
            map[date] = {
                date,
                count: 0,
                viewed: 0,
                connects: 0,
            };
        }

        map[date].count += 1;
        if (p.viewed) map[date].viewed += 1;
        if (p.connects) map[date].connects += p.connects;
    });

    return Object.values(map).map((d: any) => ({
        ...d,
        avgConnects: d.count ? d.connects / d.count : 0,
    }));
}