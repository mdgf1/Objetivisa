export type Concept = {
  id: string;
  name: string;
  explanation: string;
};

// Use [[concept_id]] or [[concept_id|display text]] syntax in explanations.
export const CONCEPTS: Record<string, Concept> = {
  parlamentarismo: {
    id: "parlamentarismo",
    name: "Parlamentarismo",
    explanation: "Sistema de [[governo]] em que o [[poder_executivo|executivo]] é responsável perante o [[parlamento]]. O [[primeiro_ministro]] governa enquanto tiver a confiança da maioria parlamentar.",
  },
  parlamento: {
    id: "parlamento",
    name: "Parlamento",
    explanation: "Órgão [[poder_legislativo|legislativo]] eleito pelos cidadãos. Aprova leis, o orçamento do Estado e fiscaliza o [[governo]]. Em Portugal chama-se [[assembleia_da_republica|Assembleia da República]] e tem 230 deputados.",
  },
  poder_executivo: {
    id: "poder_executivo",
    name: "Poder Executivo",
    explanation: "Ramo do Estado responsável por implementar as leis e gerir o país no dia-a-dia. Faz parte da [[separacao_de_poderes]]. Em Portugal é exercido pelo [[governo]] liderado pelo [[primeiro_ministro]].",
  },
  poder_legislativo: {
    id: "poder_legislativo",
    name: "Poder Legislativo",
    explanation: "Ramo do Estado responsável por criar e aprovar leis. Em Portugal é a [[assembleia_da_republica|Assembleia da República]]. Parte da [[separacao_de_poderes]].",
  },
  separacao_de_poderes: {
    id: "separacao_de_poderes",
    name: "Separação de Poderes",
    explanation: "Princípio que divide o poder do Estado em três ramos independentes — [[poder_executivo|executivo]], [[poder_legislativo|legislativo]] e judicial — para evitar concentração de poder e garantir [[checks_and_balances|equilíbrio]].",
  },
  checks_and_balances: {
    id: "checks_and_balances",
    name: "Pesos e Contrapesos",
    explanation: "Mecanismos pelos quais os três poderes do Estado se limitam mutuamente. Por exemplo, o [[parlamento]] pode revogar leis do [[governo]], e os tribunais podem declarar leis inconstitucionais.",
  },
  democracia_representativa: {
    id: "democracia_representativa",
    name: "Democracia Representativa",
    explanation: "Sistema político em que os cidadãos elegem representantes para tomar decisões em seu nome. Assenta no [[sufragio_universal]], na [[separacao_de_poderes]] e na proteção de [[direitos_fundamentais]].",
  },
  sufragio_universal: {
    id: "sufragio_universal",
    name: "Sufrágio Universal",
    explanation: "Direito de todos os cidadãos adultos de votar, independentemente de género, raça, religião ou estatuto social. Conquistado progressivamente — em Portugal, o voto feminino pleno foi alcançado em 1976.",
  },
  assembleia_da_republica: {
    id: "assembleia_da_republica",
    name: "Assembleia da República",
    explanation: "O [[parlamento]] português, composto por 230 deputados eleitos por [[sufragio_universal]]. Aprova leis, o Orçamento do Estado e pode demitir o [[governo]] através de moções de censura.",
  },
  primeiro_ministro: {
    id: "primeiro_ministro",
    name: "Primeiro-Ministro",
    explanation: "Chefe do [[governo]] em sistemas [[parlamentarismo|parlamentares]]. Em Portugal é nomeado pelo Presidente da República, mas deve ter maioria no [[parlamento]]. Define as grandes linhas da política governativa.",
  },
  governo: {
    id: "governo",
    name: "Governo",
    explanation: "Órgão de [[poder_executivo]] que administra o Estado. Em Portugal é liderado pelo [[primeiro_ministro]] e composto por ministros. Precisa da confiança do [[parlamento]] para se manter em funções.",
  },
  direitos_fundamentais: {
    id: "direitos_fundamentais",
    name: "Direitos Fundamentais",
    explanation: "Direitos básicos garantidos pela [[constituicao|Constituição]] a todos os cidadãos: liberdade de expressão, direito à vida, à educação, à saúde, entre outros. São a base do [[estado_de_direito]].",
  },
  constituicao: {
    id: "constituicao",
    name: "Constituição",
    explanation: "Lei fundamental do Estado que define a organização política, os [[direitos_fundamentais]] dos cidadãos e os limites do poder. A constituição portuguesa de 1976, após o 25 de Abril, consagra a [[separacao_de_poderes]] e a [[democracia_representativa]].",
  },
  estado_de_direito: {
    id: "estado_de_direito",
    name: "Estado de Direito",
    explanation: "Princípio pelo qual todos — cidadãos e Estado — estão sujeitos à lei. Nenhuma entidade está acima da [[constituicao|Constituição]]. Garante que o poder não seja exercido de forma arbitrária.",
  },
  republicanismo: {
    id: "republicanismo",
    name: "Republicanismo",
    explanation: "Sistema de governo em que o chefe de Estado é eleito ou nomeado, e não hereditário. Opõe-se à [[monarquia]]. Em Portugal, a República foi instaurada em 1910.",
  },
  monarquia: {
    id: "monarquia",
    name: "Monarquia",
    explanation: "Sistema de governo em que o chefe de Estado é um monarca (rei ou rainha), geralmente por herança. Pode ser [[monarquia_absoluta|absoluta]] (com poderes totais) ou constitucional (com poderes limitados pela [[constituicao]]).",
  },
  monarquia_absoluta: {
    id: "monarquia_absoluta",
    name: "Monarquia Absoluta",
    explanation: "Forma de [[monarquia]] em que o monarca detém o poder total sem limitações constitucionais ou parlamentares. O [[poder_executivo]], [[poder_legislativo|legislativo]] e judicial estão concentrados numa só pessoa.",
  },
  laicismo: {
    id: "laicismo",
    name: "Laicismo",
    explanation: "Princípio de separação entre o Estado e as instituições religiosas. O Estado laico não favorece nem discrimina nenhuma religião, e as decisões políticas não são baseadas em princípios religiosos.",
  },
  sufragio_censitario: {
    id: "sufragio_censitario",
    name: "Sufrágio Censitário",
    explanation: "Sistema eleitoral em que apenas cidadãos com determinado nível de riqueza, propriedade ou educação têm direito a votar. Opõe-se ao [[sufragio_universal]]. Era comum no século XIX.",
  },
};
