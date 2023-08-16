export interface Especialidades {
  direito_administrativo: boolean;
  direito_civil: boolean;
  direito_minorias: boolean;
  direito_empresarial: boolean;
  propriedade_intelectual: boolean;
  direito_ambiental: boolean;
  direito_financeiro_tributário: boolean;
  direito_processual: boolean;
  direito_trabalho: boolean;
  direito_previdenciário: boolean;
  direito_constitucional: boolean;
  direito_econômico_concorrencial: boolean;
  direito_penal: boolean;
  direito_anti_racismo: boolean;
  direito_igualdade_genero: boolean;
  filosofia_direito: boolean;
  liderança: boolean;
  eventos: boolean;
  negociação: boolean;
  mediação: boolean;
  arbitragem: boolean;
  gestão: boolean;
  rh: boolean;
  outros?: { [key: string]: boolean };
}
