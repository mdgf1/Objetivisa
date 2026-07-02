import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useConcepts } from "../contexts/ConceptsContext";
import { useStyles } from "../hooks/useStyles";
import makeStyles from "../styles/Editor.styles";

type Props = {
  value: string;
  onChangeText: (v: string) => void;
  style?: any;
  multiline?: boolean;
};

// Detects an unclosed [[ token immediately before the cursor and returns its query text,
// or null when the cursor isn't inside a reference (or the id part is already finished).
function activeToken(value: string, cursor: number): { start: number; query: string } | null {
  const before = value.slice(0, cursor);
  const open = before.lastIndexOf("[[");
  if (open === -1) return null;
  const inner = before.slice(open + 2);
  // still typing the id: no closing ]], no new [[, and not yet past the | display separator
  if (/[\]\[\n|]/.test(inner)) return null;
  return { start: open, query: inner };
}

/**
 * A textarea for editor fields that autocompletes [[concept]] references: type "[[" and a
 * dropdown of matching concepts appears; picking one inserts [[id]].
 */
export default function ConceptTextInput({ value, onChangeText, style, multiline = true }: Props) {
  const s = useStyles(makeStyles);
  const { concepts } = useConcepts();
  const [sel, setSel] = useState({ start: 0, end: 0 });
  const [forceSel, setForceSel] = useState<{ start: number; end: number } | null>(null);

  const token = activeToken(value, sel.start);
  const q = token?.query.trim().toLowerCase() ?? "";
  const qId = q.replace(/\s+/g, "_");
  const suggestions = token
    ? Object.values(concepts)
        .filter((c) => c.id.includes(qId) || c.name.toLowerCase().includes(q))
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 6)
    : [];

  const insert = (id: string) => {
    if (!token) return;
    const inserted = `[[${id}]]`;
    const next = value.slice(0, token.start) + inserted + value.slice(sel.start);
    const pos = token.start + inserted.length;
    onChangeText(next);
    setSel({ start: pos, end: pos });
    setForceSel({ start: pos, end: pos });
  };

  return (
    <View style={s.suggestWrap}>
      <TextInput
        style={style}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        autoCapitalize="none"
        selection={forceSel ?? undefined}
        onSelectionChange={(e) => {
          setSel(e.nativeEvent.selection);
          if (forceSel) setForceSel(null);
        }}
      />
      {token && suggestions.length > 0 && (
        <View style={s.suggestBox}>
          {suggestions.map((c) => (
            <TouchableOpacity key={c.id} style={s.suggestItem} onPress={() => insert(c.id)}>
              <Text style={s.suggestName}>{c.name}</Text>
              <Text style={s.suggestId}>[[{c.id}]]</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
