import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useEditor } from "../contexts/EditorContext";
import { useConcepts } from "../contexts/ConceptsContext";
import { useTooltipContext } from "../contexts/TooltipContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useStyles } from "../hooks/useStyles";
import { api } from "../services/api";
import ConceptTextInput from "./ConceptTextInput";
import makeStyles from "../styles/Editor.styles";

const T = {
  pt: {
    createConcept: "Criar conceito",
    createCard: "Criar card",
    newConcept: "Novo conceito",
    editCard: "Card do conceito",
    name: "Nome",
    id: "ID",
    description: "Descrição (tooltip)",
    card: "Conteúdo do card",
    refHint: "Podes referenciar outros conceitos com [[id]] ou [[id|texto]].",
    cancel: "Cancelar",
    save: "Guardar",
    required: "Preenche o ID e o nome.",
  },
  en: {
    createConcept: "Create concept",
    createCard: "Create card",
    newConcept: "New concept",
    editCard: "Concept card",
    name: "Name",
    id: "ID",
    description: "Description (tooltip)",
    card: "Card content",
    refHint: "You can reference other concepts with [[id]] or [[id|text]].",
    cancel: "Cancel",
    save: "Save",
    required: "Fill in the ID and name.",
  },
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60);

/** Create-concept modal, prefilled from the selected text. */
function ConceptModal({ initialName, onClose }: { initialName: string; onClose: () => void }) {
  const s = useStyles(makeStyles);
  const { lang } = useLanguage();
  const { refresh } = useConcepts();
  const t = T[lang];

  const [name, setName] = useState(initialName);
  const [id, setId] = useState(slugify(initialName));
  const [idEdited, setIdEdited] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!id.trim() || !name.trim()) return setError(t.required);
    setSaving(true);
    try {
      await api.createConcept(lang, { id: id.trim(), name: name.trim(), description });
      refresh();
      onClose();
    } catch (e: any) {
      setError(e?.message ?? "error");
      setSaving(false);
    }
  };

  return (
    <View style={s.modal}>
      <Text style={s.modalTitle}>{t.newConcept}</Text>

      <Text style={s.label}>{t.name}</Text>
      <TextInput
        style={s.input}
        value={name}
        onChangeText={(v) => {
          setName(v);
          if (!idEdited) setId(slugify(v));
        }}
      />

      <Text style={s.label}>{t.id}</Text>
      <TextInput
        style={s.input}
        value={id}
        autoCapitalize="none"
        onChangeText={(v) => {
          setIdEdited(true);
          setId(v);
        }}
      />

      <Text style={s.label}>{t.description}</Text>
      <ConceptTextInput style={s.textarea} value={description} onChangeText={setDescription} />
      <Text style={s.hint}>{t.refHint}</Text>

      {error && <Text style={s.error}>{error}</Text>}

      <View style={s.actions}>
        <TouchableOpacity style={[s.btn, s.btnCancel]} onPress={onClose}>
          <Text style={s.btnCancelText}>{t.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.btn, s.btnSave]} onPress={save} disabled={saving}>
          <Text style={s.btnSaveText}>{t.save}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/** Create/edit the in-depth card body for a concept. */
function CardModal({ conceptId, onClose }: { conceptId: string; onClose: () => void }) {
  const s = useStyles(makeStyles);
  const { lang } = useLanguage();
  const { getConcept, refresh } = useConcepts();
  const t = T[lang];
  const concept = getConcept(conceptId);

  const [card, setCard] = useState(concept?.card ?? "");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await api.saveConceptCard(conceptId, lang, { card });
      refresh();
      onClose();
    } catch (e: any) {
      setError(e?.message ?? "error");
      setSaving(false);
    }
  };

  return (
    <View style={s.modal}>
      <Text style={s.modalTitle}>{t.editCard} — {concept?.name ?? conceptId}</Text>

      <Text style={s.label}>{t.card}</Text>
      <ConceptTextInput style={s.textarea} value={card} onChangeText={setCard} />
      <Text style={s.hint}>{t.refHint}</Text>

      {error && <Text style={s.error}>{error}</Text>}

      <View style={s.actions}>
        <TouchableOpacity style={[s.btn, s.btnCancel]} onPress={onClose}>
          <Text style={s.btnCancelText}>{t.cancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.btn, s.btnSave]} onPress={save} disabled={saving}>
          <Text style={s.btnSaveText}>{t.save}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function EditorLayer() {
  const s = useStyles(makeStyles);
  const { lang } = useLanguage();
  const { menu, modal, openMenu, closeMenu, openConceptEditor, openCardEditor, closeModal } = useEditor();
  const { freeze, closeAll } = useTooltipContext();
  const t = T[lang];
  const menuRef = useRef<any>(null);

  // While an editor menu/modal is open, hold the tooltip chain open (interacting with the
  // menu/modal shouldn't count as "leaving" the tooltip). Clear the chain once done.
  useEffect(() => {
    const editing = !!menu || !!modal;
    freeze(editing);
    if (!editing) closeAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu, modal]);

  // Right-click: offer "create concept" when text is selected, "create card" when the click
  // landed on a concept link (tagged with data-concept-id).
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onContext = (e: MouseEvent) => {
      const selection = window.getSelection?.()?.toString().trim() || undefined;
      const el = (e.target as HTMLElement)?.closest?.("[data-concept-id]") as HTMLElement | null;
      const conceptId = el?.getAttribute("data-concept-id") || undefined;
      if (!selection && !conceptId) return; // nothing to offer → native menu
      e.preventDefault();
      openMenu({ x: e.clientX, y: e.clientY, conceptId, selection });
    };
    document.addEventListener("contextmenu", onContext);
    return () => document.removeEventListener("contextmenu", onContext);
  }, [openMenu]);

  // dismiss the menu on any click outside it
  useEffect(() => {
    if (typeof document === "undefined" || !menu) return;
    const onDown = (e: MouseEvent) => {
      const node = menuRef.current as HTMLElement | null;
      if (node && !node.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [menu, closeMenu]);

  return (
    <>
      {menu && (
        <View ref={menuRef} style={[s.menu, { left: menu.x, top: menu.y }]}>
          {!!menu.selection && (
            <TouchableOpacity style={s.menuItem} onPress={() => openConceptEditor(menu.selection!)}>
              <Text style={s.menuItemText}>{t.createConcept}</Text>
            </TouchableOpacity>
          )}
          {!!menu.conceptId && (
            <TouchableOpacity style={s.menuItem} onPress={() => openCardEditor(menu.conceptId!)}>
              <Text style={s.menuItemText}>{t.createCard}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {modal && (
        <View
          style={s.overlay}
          {...({ onClick: (e: any) => { if (e.target === e.currentTarget) closeModal(); } } as any)}
        >
          {modal.type === "concept" ? (
            <ConceptModal initialName={modal.name} onClose={closeModal} />
          ) : (
            <CardModal conceptId={modal.conceptId} onClose={closeModal} />
          )}
        </View>
      )}
    </>
  );
}
