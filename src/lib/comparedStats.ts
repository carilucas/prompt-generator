interface comparedPromptsProps {
    createdAt: Date;
    boosted: number | null;
    connects: number | null;
    answered: boolean | null;
    won: boolean | null;
    viewed: boolean;
}

interface allPromptsProps {
    createdAt: Date;
    connects: number | null;
    viewed: boolean;
}


export const comparedStats = (comparedPrompts: comparedPromptsProps[], allPrompts: allPromptsProps[]) => {
    const viewedStats = [
        {
            name: "Viewed",
            value: allPrompts.filter((p) => p.viewed).length,
        },
        {
            name: "Not Viewed",
            value: allPrompts.filter((p) => !p.viewed).length,
        },
    ];

    const boostedStats = [
        {
            name: "Boosted",
            value: comparedPrompts.filter(p => (p.boosted ?? 0) > 0).length,
        },
        {
            name: "Not Boosted",
            value: comparedPrompts.filter(p => !p.boosted || p.boosted === 0).length,
        },
    ];

    const totalVsWon = [
        {
            name: "Total",
            valueTotal: comparedPrompts.length,
        },
        {
            name: "Won",
            valueWon: comparedPrompts.filter(p => p.won).length,
        },
    ];

    const funnelStats = [
        {
            name: "Sent",
            valueTotal: comparedPrompts.length,
        },
        {
            name: "Answered",
            valueAnswered: comparedPrompts.filter(p => p.answered).length,
        },
        {
            name: "Won",
            valueWon: comparedPrompts.filter(p => p.won).length,
        },
    ];

    const boostedWon = comparedPrompts.filter(
        p => (p.boosted ?? 0) > 0 && p.won
    ).length;

    const boostedTotal = comparedPrompts.filter(
        p => (p.boosted ?? 0) > 0
    ).length;

    const normalWon = comparedPrompts.filter(
        p => (!p.boosted || p.boosted === 0) && p.won
    ).length;

    const normalTotal = comparedPrompts.filter(
        p => !p.boosted || p.boosted === 0
    ).length;

    const boostPerformance = [
        {
            name: "Boosted",
            winRate: boostedTotal ? (boostedWon / boostedTotal) * 100 : 0,
        },
        {
            name: "Normal",
            winRate: normalTotal ? (normalWon / normalTotal) * 100 : 0,
        },
    ];

    return [
        viewedStats,
        boostedStats,
        totalVsWon,
        funnelStats,
        boostPerformance
    ]

}