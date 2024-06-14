export function viewStatusJsonToMap(jsonStr: string): Map<string, "delivered" | "seen"> {
    const obj = JSON.parse(jsonStr);
    return new Map(Object.entries(obj));
};