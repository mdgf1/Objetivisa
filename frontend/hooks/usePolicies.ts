import { useState, useEffect } from "react";
import { Party, PolicyCategory } from "../data_types/policies";
import { api } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";

type State = {
    categories: PolicyCategory[];
    parties: Party[];
    loading: boolean;
    error: string | null;
};

export function usePolicies(): State {
    const { lang } = useLanguage();
    const [state, setState] = useState<State>({
        categories: [],
        parties: [],
        loading: true,
        error: null
    });

    useEffect(() => {
        let active = true;
        setState((s) => ({ ...s, loading: true }));

        Promise.all([api.categories(lang), api.parties(lang)])
            .then(([categories, parties]) => {
                if (active) setState({ categories, parties, loading: false, error: null });
            })
            .catch((err) => {
                if (active) setState((s) => ({ ...s, loading: false, error: err.message }));
            });

        return () => {
            active = false;
        };
    }, [lang]);

    return state;
}
