export function randString(length: number): string {
    const chars = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'];
    let string = '';

    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        string = `${string}${chars[index]}`;
    }

    return string;
}

export function shuffle(array: any[]) {
    let currentIndex: number = array.length;
    let temporaryValue: any;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        if (currentIndex === randomIndex) {
            continue;
        }

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
