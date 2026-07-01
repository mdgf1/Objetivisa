import { Party, PolicyCategory } from "../data_types/policies";
import { Lang } from "../contexts/LanguageContext";

const BASE = "http://localhost:3001/api";

async function get<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    return res.json();
}

async function put(path: string, body: object): Promise<void> {
    const res = await fetch(`${BASE}${path}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`PUT ${path} failed: ${res.status}`);
}

export const api = {
    parties:     (lang: Lang) => get<Party[]>(`/parties?lang=${lang}`),
    categories:  (lang: Lang) => get<PolicyCategory[]>(`/categories?lang=${lang}`),
    saveGroup:   (id: string, lang: Lang, body: { name: string; currentOptionId: string; classificationReason: string }) =>
        put(`/editor/groups/${id}?lang=${lang}`, body),
    saveOption:  (id: string, lang: Lang, body: { name: string; description: string }) =>
        put(`/editor/options/${id}?lang=${lang}`, body),
    saveStance:  (optionId: string, partyId: string, stance: string) =>
        put(`/editor/stances/${optionId}/${partyId}`, { stance }),
};
