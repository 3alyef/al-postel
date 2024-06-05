export function viewStatusJsonToMap(jsonStr: string): Map<string, "delivered" | "seen"> {
    const obj = JSON.parse(jsonStr);
    return new Map(Object.entries(obj));
};

export function deletedToJsonToMap(jsonStr: string): Map<string, "justTo" | "justFrom" | "all"> {
    const obj = JSON.parse(jsonStr);
    return new Map(Object.entries(obj));
}