-- Concept glossary seed (idempotent).
--
-- The `concepts` / `concept_translations` tables are created by Hibernate (ddl-auto=update)
-- on app startup. Run this AFTER the app has booted at least once:
--
--   docker exec -i objetivisa-db psql -U objetivisa objetivisa < scripts/db/concepts_seed.sql
--
-- Concept descriptions may reference other concepts via [[id]] or [[id|display]] markup.

-- ---------------------------------------------------------------------------
-- Concepts
-- ---------------------------------------------------------------------------
INSERT INTO public.concepts (id) VALUES
  ('parlamentarismo'), ('parlamento'), ('poder_executivo'), ('poder_legislativo'),
  ('separacao_de_poderes'), ('checks_and_balances'), ('democracia_representativa'),
  ('sufragio_universal'), ('assembleia_da_republica'), ('primeiro_ministro'), ('governo'),
  ('direitos_fundamentais'), ('constituicao'), ('estado_de_direito'), ('republicanismo'),
  ('monarquia'), ('monarquia_absoluta'), ('laicismo'), ('sufragio_censitario'),
  ('sales_tax')
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Portuguese translations
-- ---------------------------------------------------------------------------
INSERT INTO public.concept_translations (concept_id, locale, name, description) VALUES
  ('parlamentarismo', 'pt', 'Parlamentarismo',
   'Sistema de [[governo]] em que o [[poder_executivo|executivo]] é responsável perante o [[parlamento]]. O [[primeiro_ministro]] governa enquanto tiver a confiança da maioria parlamentar.'),
  ('parlamento', 'pt', 'Parlamento',
   'Órgão [[poder_legislativo|legislativo]] eleito pelos cidadãos. Aprova leis, o orçamento do Estado e fiscaliza o [[governo]]. Em Portugal chama-se [[assembleia_da_republica|Assembleia da República]] e tem 230 deputados.'),
  ('poder_executivo', 'pt', 'Poder Executivo',
   'Ramo do Estado responsável por implementar as leis e gerir o país no dia-a-dia. Faz parte da [[separacao_de_poderes]]. Em Portugal é exercido pelo [[governo]] liderado pelo [[primeiro_ministro]].'),
  ('poder_legislativo', 'pt', 'Poder Legislativo',
   'Ramo do Estado responsável por criar e aprovar leis. Em Portugal é a [[assembleia_da_republica|Assembleia da República]]. Parte da [[separacao_de_poderes]].'),
  ('separacao_de_poderes', 'pt', 'Separação de Poderes',
   'Princípio que divide o poder do Estado em três ramos independentes — [[poder_executivo|executivo]], [[poder_legislativo|legislativo]] e judicial — para evitar concentração de poder e garantir [[checks_and_balances|equilíbrio]].'),
  ('checks_and_balances', 'pt', 'Pesos e Contrapesos',
   'Mecanismos pelos quais os três poderes do Estado se limitam mutuamente. Por exemplo, o [[parlamento]] pode revogar leis do [[governo]], e os tribunais podem declarar leis inconstitucionais.'),
  ('democracia_representativa', 'pt', 'Democracia Representativa',
   'Sistema político em que os cidadãos elegem representantes para tomar decisões em seu nome. Assenta no [[sufragio_universal]], na [[separacao_de_poderes]] e na proteção de [[direitos_fundamentais]].'),
  ('sufragio_universal', 'pt', 'Sufrágio Universal',
   'Direito de todos os cidadãos adultos de votar, independentemente de género, raça, religião ou estatuto social. Conquistado progressivamente — em Portugal, o voto feminino pleno foi alcançado em 1976.'),
  ('assembleia_da_republica', 'pt', 'Assembleia da República',
   'O [[parlamento]] português, composto por 230 deputados eleitos por [[sufragio_universal]]. Aprova leis, o Orçamento do Estado e pode demitir o [[governo]] através de moções de censura.'),
  ('primeiro_ministro', 'pt', 'Primeiro-Ministro',
   'Chefe do [[governo]] em sistemas [[parlamentarismo|parlamentares]]. Em Portugal é nomeado pelo Presidente da República, mas deve ter maioria no [[parlamento]]. Define as grandes linhas da política governativa.'),
  ('governo', 'pt', 'Governo',
   'Órgão de [[poder_executivo]] que administra o Estado. Em Portugal é liderado pelo [[primeiro_ministro]] e composto por ministros. Precisa da confiança do [[parlamento]] para se manter em funções.'),
  ('direitos_fundamentais', 'pt', 'Direitos Fundamentais',
   'Direitos básicos garantidos pela [[constituicao|Constituição]] a todos os cidadãos: liberdade de expressão, direito à vida, à educação, à saúde, entre outros. São a base do [[estado_de_direito]].'),
  ('constituicao', 'pt', 'Constituição',
   'Lei fundamental do Estado que define a organização política, os [[direitos_fundamentais]] dos cidadãos e os limites do poder. A constituição portuguesa de 1976, após o 25 de Abril, consagra a [[separacao_de_poderes]] e a [[democracia_representativa]].'),
  ('estado_de_direito', 'pt', 'Estado de Direito',
   'Princípio pelo qual todos — cidadãos e Estado — estão sujeitos à lei. Nenhuma entidade está acima da [[constituicao|Constituição]]. Garante que o poder não seja exercido de forma arbitrária.'),
  ('republicanismo', 'pt', 'Republicanismo',
   'Sistema de governo em que o chefe de Estado é eleito ou nomeado, e não hereditário. Opõe-se à [[monarquia]]. Em Portugal, a República foi instaurada em 1910.'),
  ('monarquia', 'pt', 'Monarquia',
   'Sistema de governo em que o chefe de Estado é um monarca (rei ou rainha), geralmente por herança. Pode ser [[monarquia_absoluta|absoluta]] (com poderes totais) ou constitucional (com poderes limitados pela [[constituicao]]).'),
  ('monarquia_absoluta', 'pt', 'Monarquia Absoluta',
   'Forma de [[monarquia]] em que o monarca detém o poder total sem limitações constitucionais ou parlamentares. O [[poder_executivo]], [[poder_legislativo|legislativo]] e judicial estão concentrados numa só pessoa.'),
  ('laicismo', 'pt', 'Laicismo',
   'Princípio de separação entre o Estado e as instituições religiosas. O Estado laico não favorece nem discrimina nenhuma religião, e as decisões políticas não são baseadas em princípios religiosos.'),
  ('sufragio_censitario', 'pt', 'Sufrágio Censitário',
   'Sistema eleitoral em que apenas cidadãos com determinado nível de riqueza, propriedade ou educação têm direito a votar. Opõe-se ao [[sufragio_universal]]. Era comum no século XIX.'),
  ('sales_tax', 'pt', 'IVA (Imposto sobre o Valor Acrescentado)',
   'Imposto sobre o consumo cobrado sobre a generalidade dos bens e serviços. É um imposto indireto e regressivo — pesa proporcionalmente mais sobre quem tem menores rendimentos —, ao contrário da [[tributacao_progressiva|tributação progressiva]] do rendimento.'),
  ('tributacao_progressiva', 'pt', 'Tributação Progressiva',
   'Sistema fiscal em que a taxa de imposto aumenta à medida que o rendimento aumenta. Quem ganha mais paga uma percentagem maior. É o oposto de um imposto regressivo como o [[sales_tax|IVA]].')
ON CONFLICT (concept_id, locale) DO NOTHING;

-- Concept referenced above by sales_tax but not yet in the concepts table.
INSERT INTO public.concepts (id) VALUES ('tributacao_progressiva') ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- English translations (only the taxation example is bilingual for now)
-- ---------------------------------------------------------------------------
INSERT INTO public.concept_translations (concept_id, locale, name, description) VALUES
  ('sales_tax', 'en', 'VAT (Value-Added Tax)',
   'A consumption tax levied on most goods and services. It is an indirect, regressive tax — it weighs proportionally more on lower earners — unlike the [[tributacao_progressiva|progressive taxation]] of income.'),
  ('tributacao_progressiva', 'en', 'Progressive Taxation',
   'A tax system where the rate rises as income rises, so higher earners pay a larger share. The opposite of a regressive tax like [[sales_tax|VAT]].')
ON CONFLICT (concept_id, locale) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Wire the taxation policy-group description to the sales_tax concept.
-- Guarded so it is safe to re-run.
-- ---------------------------------------------------------------------------
UPDATE public.policy_group_translations
   SET classification_reason = replace(classification_reason, 'VAT', '[[sales_tax|VAT]]')
 WHERE group_id = 'taxation' AND locale = 'en'
   AND classification_reason NOT LIKE '%[[sales_tax%';

UPDATE public.policy_group_translations
   SET classification_reason = replace(classification_reason, 'IVA', '[[sales_tax|IVA]]')
 WHERE group_id = 'taxation' AND locale = 'pt'
   AND classification_reason NOT LIKE '%[[sales_tax%';
