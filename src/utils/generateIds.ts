function generateRandomId(): { id: string, randomId: number } {
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const idLength = 32; // Length of the generated ID
    let id = '';

    // Generate a random string ID from the alphabet
    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        id += alphabet[randomIndex];
    }

    const randomId = Math.floor(Math.random() * 10);

    return { id, randomId };
}


export default generateRandomId;