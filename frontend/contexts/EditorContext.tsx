import { createContext, useContext, useState, ReactNode } from "react";

// Right-click context menu: shown at (x, y). Offers "create concept" when text is selected
// and "create card" when the click was on a concept link.
export type EditorMenu = { x: number; y: number; conceptId?: string; selection?: string };

// Which editor modal is open.
export type EditorModal =
  | { type: "concept"; name: string } // create a concept, prefilled from the selection
  | { type: "card"; conceptId: string }; // create/edit a concept's card

type EditorState = {
  menu: EditorMenu | null;
  modal: EditorModal | null;
  openMenu: (m: EditorMenu) => void;
  closeMenu: () => void;
  openConceptEditor: (name: string) => void;
  openCardEditor: (conceptId: string) => void;
  closeModal: () => void;
};

const EditorContext = createContext<EditorState>({
  menu: null,
  modal: null,
  openMenu: () => {},
  closeMenu: () => {},
  openConceptEditor: () => {},
  openCardEditor: () => {},
  closeModal: () => {},
});

export function EditorProvider({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState<EditorMenu | null>(null);
  const [modal, setModal] = useState<EditorModal | null>(null);

  return (
    <EditorContext.Provider
      value={{
        menu,
        modal,
        openMenu: setMenu,
        closeMenu: () => setMenu(null),
        openConceptEditor: (name) => {
          setMenu(null);
          setModal({ type: "concept", name });
        },
        openCardEditor: (conceptId) => {
          setMenu(null);
          setModal({ type: "card", conceptId });
        },
        closeModal: () => setModal(null),
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export const useEditor = () => useContext(EditorContext);
