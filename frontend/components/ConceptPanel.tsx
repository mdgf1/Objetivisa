import { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import SidePanel from "./SidePanel";
import { ConceptText } from "./ConceptText";
import { Concept } from "../data_types/concepts";
import { useConcepts } from "../contexts/ConceptsContext";
import { useConceptPanel } from "../contexts/ConceptPanelContext";
import { useEditor } from "../contexts/EditorContext";
import { useTooltipContext } from "../contexts/TooltipContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useStyles } from "../hooks/useStyles";
import makeStyles from "../styles/ConceptPanel.styles";

const T = {
  pt: { reason: "Porquê esta classificação?", current: "Situação atual" },
  en: { reason: "Why this classification?", current: "Current situation" },
};

/**
 * Left side panel holding the in-depth "card" for a concept. Policy concepts show their
 * current option and classification reason; plain concepts show their full description.
 * Text inside is rendered with ConceptText, so references stay hoverable/clickable and
 * clicking one swaps the panel to that concept.
 */
export default function ConceptPanel() {
  const { openId, closeConcept } = useConceptPanel();
  const { getConcept } = useConcepts();
  const { menu, modal } = useEditor();
  const { tooltips } = useTooltipContext();
  const { lang } = useLanguage();
  const s = useStyles(makeStyles);

  const concept = openId ? getConcept(openId) : undefined;
  // keep the last concept on screen while the panel slides out on close
  const [shown, setShown] = useState<Concept | undefined>(undefined);
  useEffect(() => {
    if (concept) setShown(concept);
  }, [concept]);

  const t = T[lang];
  const isPolicy = shown?.kind === "policy";

  return (
    <SidePanel
      visible={!!concept}
      expandedRatio={0.5}
      collapsedRatio={0.3}
      onDismiss={closeConcept}
      locked={!!menu || !!modal || tooltips.length > 0}
    >
      {shown && (
      <View style={s.container}>
        <View style={s.header}>
          {!!shown.icon && <Text style={s.icon}>{shown.icon}</Text>}
          <View style={s.headerText}>
            <Text style={s.title}>{shown.name}</Text>
            {isPolicy && !!shown.categoryName && (
              <Text style={[s.tag, { color: shown.categoryColor }]}>{shown.categoryName}</Text>
            )}
          </View>
          <TouchableOpacity style={s.close} onPress={closeConcept}>
            <Text style={s.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {isPolicy ? (
            <>
              {!!shown.currentOptionName && (
                <>
                  <Text style={s.optionName}>{shown.currentOptionName}</Text>
                  {!!shown.currentOptionDescription && (
                    <ConceptText
                      text={shown.currentOptionDescription}
                      style={s.optionDesc}
                      depth={1}
                    />
                  )}
                </>
              )}
              <View style={s.divider} />
              <Text style={s.sectionTitle}>{t.reason}</Text>
              {shown.description ? (
                <ConceptText text={shown.description} style={s.body} depth={1} />
              ) : (
                <Text style={s.empty}>—</Text>
              )}
            </>
          ) : shown.card ? (
            <ConceptText text={shown.card} style={s.body} depth={1} />
          ) : shown.description ? (
            <ConceptText text={shown.description} style={s.body} depth={1} />
          ) : (
            <Text style={s.empty}>—</Text>
          )}
        </ScrollView>
      </View>
      )}
    </SidePanel>
  );
}
