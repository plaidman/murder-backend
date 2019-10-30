export function randString(length: number): string {
    const chars = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'];

    const string = [...Array(length)].map(
        () => {
            const index = Math.floor(Math.random() * chars.length);
            return chars[index];
        },
    ).join('');

    return string;
}
