type JwtPayload = {
  exp?: unknown;
};

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const paddedBase64 = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );

  if (typeof globalThis.atob !== "function") {
    return null;
  }

  return globalThis.atob(paddedBase64);
}

function getTokenPayload(token: string): JwtPayload | null {
  const [, payload] = token.split(".");

  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(decodeBase64Url(payload) ?? "") as JwtPayload;
  } catch {
    return null;
  }
}

export function isTokenValid(token: string) {
  const payload = getTokenPayload(token);

  if (typeof payload?.exp !== "number") {
    return false;
  }

  return payload.exp * 1000 > Date.now();
}
