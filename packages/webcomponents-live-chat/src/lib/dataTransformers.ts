export function serializeData(data: any) {
    const rawJson = JSON.stringify(data);
    const escaped = encodeURIComponent(rawJson);
    return `data:application/json,${escaped}`;
}

export function deserializeData(str: string) {
    if(str.startsWith('data:application/json')) {
        const payload = str.split(',')[1];
        return JSON.parse(
            decodeURIComponent(payload)
        );
    }
    return str;
}