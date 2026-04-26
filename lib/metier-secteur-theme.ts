const SECTEUR_CARD_BACKGROUNDS: Record<string, string> = {
  "Activités juridiques et comptables": "bg-indigo-50 dark:bg-indigo-950/30",
  "Activités juridiques": "bg-indigo-50 dark:bg-indigo-950/30",
  Comptabilité: "bg-indigo-50 dark:bg-indigo-950/30",
  "Agriculture et élevage": "bg-emerald-50 dark:bg-emerald-950/30",
  "Agriculture, sylviculture": "bg-emerald-50 dark:bg-emerald-950/30",
  "Élevage, pêche": "bg-emerald-50 dark:bg-emerald-950/30",
  "Architecture, études et normes": "bg-cyan-50 dark:bg-cyan-950/30",
  Architecture: "bg-cyan-50 dark:bg-cyan-950/30",
  "Étude des sols et des bâtiments": "bg-cyan-50 dark:bg-cyan-950/30",
  Normes: "bg-cyan-50 dark:bg-cyan-950/30",
  "Artisanat d'art, audiovisuel et spectacle":
    "bg-fuchsia-50 dark:bg-fuchsia-950/30",
  "Artisanat d'art": "bg-fuchsia-50 dark:bg-fuchsia-950/30",
  Audiovisuel: "bg-fuchsia-50 dark:bg-fuchsia-950/30",
  Spectacle: "bg-fuchsia-50 dark:bg-fuchsia-950/30",
  Automobile: "bg-red-50 dark:bg-red-950/30",
  "Bâtiment et travaux publics (BTP)": "bg-orange-50 dark:bg-orange-950/30",
  BTP: "bg-orange-50 dark:bg-orange-950/30",
  "Gros Œuvre": "bg-orange-50 dark:bg-orange-950/30",
  "Second Œuvre": "bg-orange-50 dark:bg-orange-950/30",
  "Commerce et distribution": "bg-lime-50 dark:bg-lime-950/30",
  "Commerce de détail": "bg-lime-50 dark:bg-lime-950/30",
  "Commerce de gros": "bg-lime-50 dark:bg-lime-950/30",
  "Grande distribution": "bg-lime-50 dark:bg-lime-950/30",
  "Communication et marketing": "bg-blue-50 dark:bg-blue-950/30",
  "Culture et patrimoine": "bg-stone-50 dark:bg-stone-900/60",
  Édition: "bg-violet-50 dark:bg-violet-950/30",
  Énergie: "bg-yellow-50 dark:bg-yellow-950/30",
  "Enseignement et formation": "bg-sky-50 dark:bg-sky-950/30",
  "Conseil, orientation et formation": "bg-sky-50 dark:bg-sky-950/30",
  Enseignement: "bg-sky-50 dark:bg-sky-950/30",
  Environnement: "bg-green-50 dark:bg-green-950/30",
  "Finance, banque et assurance": "bg-purple-50 dark:bg-purple-950/30",
  Assurance: "bg-purple-50 dark:bg-purple-950/30",
  Banque: "bg-purple-50 dark:bg-purple-950/30",
  Finance: "bg-purple-50 dark:bg-purple-950/30",
  "Gestion administrative et ressources humaines":
    "bg-slate-50 dark:bg-slate-900/60",
  "Gestion administrative": "bg-slate-50 dark:bg-slate-900/60",
  "Ressources humaines": "bg-slate-50 dark:bg-slate-900/60",
  "Hôtellerie et restauration": "bg-rose-50 dark:bg-rose-950/30",
  Hôtellerie: "bg-rose-50 dark:bg-rose-950/30",
  Restauration: "bg-rose-50 dark:bg-rose-950/30",
  Immobilier: "bg-teal-50 dark:bg-teal-950/30",
  "Industrie - Alimentaire": "bg-amber-50 dark:bg-amber-950/30",
  "Industrie - Bois": "bg-lime-50 dark:bg-lime-950/30",
  "Industrie - Chimie": "bg-pink-50 dark:bg-pink-950/30",
  "Industrie - Électronique": "bg-cyan-50 dark:bg-cyan-950/30",
  "Industrie - Métallurgie": "bg-zinc-50 dark:bg-zinc-900/60",
  "Industrie - Papier et imprimerie": "bg-neutral-50 dark:bg-neutral-900/60",
  Imprimerie: "bg-neutral-50 dark:bg-neutral-900/60",
  Papier: "bg-neutral-50 dark:bg-neutral-900/60",
  "Industrie - Textile et mode": "bg-fuchsia-50 dark:bg-fuchsia-950/30",
  Industries: "bg-stone-50 dark:bg-stone-900/60",
  "Informatique et télécommunication": "bg-blue-50 dark:bg-blue-950/30",
  Informatique: "bg-blue-50 dark:bg-blue-950/30",
  Télécommunication: "bg-blue-50 dark:bg-blue-950/30",
  "Logistique et transport": "bg-teal-50 dark:bg-teal-950/30",
  "Logistique et courrier": "bg-teal-50 dark:bg-teal-950/30",
  Transport: "bg-teal-50 dark:bg-teal-950/30",
  "Maintenance, entretien et nettoyage": "bg-slate-50 dark:bg-slate-900/60",
  Maintenance: "bg-slate-50 dark:bg-slate-900/60",
  Nettoyage: "bg-slate-50 dark:bg-slate-900/60",
  Recherche: "bg-violet-50 dark:bg-violet-950/30",
  Santé: "bg-emerald-50 dark:bg-emerald-950/30",
  Médical: "bg-emerald-50 dark:bg-emerald-950/30",
  "Soins animaliers": "bg-emerald-50 dark:bg-emerald-950/30",
  "Service à la personne": "bg-pink-50 dark:bg-pink-950/30",
  "Service public, défense et sécurité": "bg-red-50 dark:bg-red-950/30",
  Défense: "bg-red-50 dark:bg-red-950/30",
  Sécurité: "bg-red-50 dark:bg-red-950/30",
  "Service public": "bg-red-50 dark:bg-red-950/30",
  Social: "bg-indigo-50 dark:bg-indigo-950/30",
  "Sport, animation et loisir": "bg-orange-50 dark:bg-orange-950/30",
  "Animation et loisir": "bg-orange-50 dark:bg-orange-950/30",
  Sport: "bg-orange-50 dark:bg-orange-950/30",
  Tourisme: "bg-cyan-50 dark:bg-cyan-950/30",
};

type ThemeSecteurEntry = {
  principal: boolean | null;
  secteur: {
    libelle: string | null;
  } | null;
};

const NORMALIZED_SECTEUR_CARD_BACKGROUNDS = Object.fromEntries(
  Object.entries(SECTEUR_CARD_BACKGROUNDS).map(([secteur, background]) => [
    normalizeSecteurLabel(secteur),
    background,
  ]),
);

function normalizeSecteurLabel(secteur: string) {
  return secteur
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/œ/g, "oe")
    .replace(/Œ/g, "oe")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

function getSecteurCardBackground(secteur?: string | null) {
  if (!secteur) {
    return undefined;
  }

  const trimmedSecteur = secteur.trim();
  const exactBackground = SECTEUR_CARD_BACKGROUNDS[trimmedSecteur];

  if (exactBackground) {
    return exactBackground;
  }

  const normalizedSecteur = normalizeSecteurLabel(trimmedSecteur);
  const normalizedBackground =
    NORMALIZED_SECTEUR_CARD_BACKGROUNDS[normalizedSecteur];

  if (normalizedBackground) {
    return normalizedBackground;
  }

  return Object.entries(NORMALIZED_SECTEUR_CARD_BACKGROUNDS).find(
    ([normalizedKnownSecteur]) =>
      normalizedSecteur.includes(normalizedKnownSecteur) ||
      normalizedKnownSecteur.includes(normalizedSecteur),
  )?.[1];
}

function getMetierSecteurBackground({
  secteurs,
  sousDomaineLibelle,
}: {
  secteurs: ThemeSecteurEntry[];
  sousDomaineLibelle?: string | null;
}) {
  const secteurPrincipal = secteurs.find((entry) => entry.principal)?.secteur;
  const firstSecteur = secteurs.find(
    (entry) => entry.secteur?.libelle,
  )?.secteur;
  const candidates = [
    sousDomaineLibelle,
    secteurPrincipal?.libelle,
    firstSecteur?.libelle,
  ].filter((label): label is string => Boolean(label));

  for (const candidate of candidates) {
    const background = getSecteurCardBackground(candidate);

    if (background) {
      return background;
    }
  }

  return undefined;
}

export { getMetierSecteurBackground, getSecteurCardBackground };
