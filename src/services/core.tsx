import { ValidateURL } from "@/lib";
import type { LocalStorageShorts } from "@/types";

const ShortURL = async (url: string): Promise<LocalStorageShorts> => {
    try {
        const validate = ValidateURL(url);
        if (!validate) throw new Error('url_required');
        const f = await fetch('/api/shorten', {
            method: 'POST',
            body: JSON.stringify({ longUrl: url }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const response = await f.json() as { shortCode: string };
        if (!response) throw new Error('Internal Error');
        const short: LocalStorageShorts = { ...response, url };
        const indexs: LocalStorageShorts[] = JSON.parse(localStorage.getItem('items') ?? '[]') ?? [];
        const fil = indexs.find((i) => i.shortCode === short.shortCode);
        if (!fil) {
            indexs.push(short);
            localStorage.setItem('items', JSON.stringify(indexs));
        };
        return short;
    } catch (err) {
        throw err;
    }
};

export {
    ShortURL
};