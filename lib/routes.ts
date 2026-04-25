export const ROUTES = {
  root: "/" as const,
  login: "/login" as const,
  register: "/register" as const,
  home: "/home" as const,
  favoris: "/favoris" as const,
  metierDetail: (codeOgr: string) =>
    ({
      pathname: "/metier/[codeOgr]",
      params: { codeOgr },
    }) as const,
} as const;
