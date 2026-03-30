const requests = new Map();

export function rateLimit(key: string, limit = 3, windowMs = 60000) {
    const now = Date.now();

    const userRequests = requests.get(key) || [];

    const filtered = userRequests.filter(
        (time: number) => now - time < windowMs
    );

    if (filtered.length >= limit) {
        return false;
    }

    filtered.push(now);
    requests.set(key, filtered);

    return true;
}