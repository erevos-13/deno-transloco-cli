import { URL } from "../utils/constants.ts";
export const getLocales = async (token: string) => {
  try {
    const locales = await fetch(`${URL}/locales?key=${token}`).then((res) =>
      res.json()
    );
    if (!locales) {
      throw new Error("Error getting locales");
    }
    if (locales.ok) {
      return await locales.json();
    }
    return locales;
  } catch (error) {
    console.error(`Error getting locales: ${error}`);
    throw new Error("Error getting locales");
  }
};

export const getAllTranslation = async (token: string, filter: string[]) => {
  try {
    const filterParam = filter && filter.length > 0
      ? `&filter=${filter.join(",")}`
      : "";
    const allTranslation = await fetch(
      `${URL}/export/all.json?fallback=en&no-folding=true&key=${token}${filterParam}`,
    ).then((res) => res.json());
    if (!allTranslation) {
      console.log("%cError getting all translation", "color: red");
      throw new Error("Error getting all translation");
    }
    console.log("%cAll translation downloaded", "color: green");
    if (allTranslation.ok) {
      return await allTranslation.json();
    }
    return allTranslation;
  } catch (error) {
    console.error(`Error getting all translation: ${error}`);
    throw new Error("Error getting all translation");
  }
};

export const getFromEndpoint = async (
  locale: string,
  token: string,
  filter: string[],
): Promise<Uint8Array | null> => {
  try {
    console.log(
      "Getting from loco",
      "Locale:",
      locale,
      "Filter:",
      filter,
    );

    const filterParam = filter && filter.length > 0
      ? `&filter=${filter.join(",")}`
      : "";
    const url =
      `${URL}/export/locale/${locale}.json?key=${token}&fallback=en${filterParam}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Loco ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonTranslation = await response.json();
    const encoder = new TextEncoder();
    return encoder.encode(JSON.stringify(jsonTranslation));
  } catch (error) {
    console.error("%cError during get from loco", "color: red", error);
    throw error;
  }
};
