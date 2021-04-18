export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, "g"), replace);
}
