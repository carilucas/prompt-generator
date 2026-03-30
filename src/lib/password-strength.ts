export function getPasswordStrength(password: string) {
    let score = 0;

    if (password.length >= 6) score++;
    if (password.length >= 10) score++;

    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
}

export function getStrengthLabel(score: number) {
    switch (score) {
        case 0:
        case 1:
            return "Weak";
        case 2:
            return "Fair";
        case 3:
            return "Good";
        case 4:
        case 5:
            return "Strong";
        default:
            return "";
    }
}