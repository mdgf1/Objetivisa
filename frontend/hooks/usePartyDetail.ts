import { useState, useEffect } from "react";
import { PartyDetail } from "../data_types/party";
import { api } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";

type State = {
    detail: PartyDetail | null;
    loading: boolean;
    error: string | null;
};

/** Fetches a party's detail (positions/people/history). Pass null to fetch nothing. */
export function usePartyDetail(partyId: string | null): State {
    const { lang } = useLanguage();
    const [state, setState] = useState<State>({ detail: null, loading: false, error: null });

    useEffect(() => {
        if (!partyId) {
            setState({ detail: null, loading: false, error: null });
            return;
        }

        let active = true;
        setState({ detail: null, loading: true, error: null });

        api.partyDetail(partyId, lang)
            .then((detail) => {
                if (active) setState({ detail, loading: false, error: null });
            })
            .catch((err) => {
                if (active) setState({ detail: null, loading: false, error: err.message });
            });

        return () => {
            active = false;
        };
    }, [partyId, lang]);

    return state;
}
