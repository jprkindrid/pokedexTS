export function cleanInput(input) {
    if (input === "") {
        return [];
    }
    const lower = input.toLowerCase();
    const trimmed = lower.trim();
    const split = trimmed.split(" ");
    const result = split.filter((word) => word !== "");
    return result;
}
