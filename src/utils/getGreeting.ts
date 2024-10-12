function getGreeting(): string {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return "Good morning ☀"; // Morning symbol
    } else if (currentHour >= 12 && currentHour < 17) {
        return "Good afternoon 🌤"; // Afternoon symbol
    } else if (currentHour >= 17 && currentHour < 21) {
        return "Good evening 🌇"; // Evening symbol
    } else {
        return "Good night 🌙"; // Night symbol
    }
}

export default getGreeting;