export const flattenObject = (obj: any, prefix = "") => {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + "." : "";
    if (
      typeof obj[k] !== "string" &&
      obj[k] !== null &&
      !Array.isArray(obj[k])
    ) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      //@ts-ignore
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};

export const getTags = (flags: any): string[] => {
  return Array.isArray(flags.filter)
    ? flags.filter
    : typeof flags.filter === "string"
    ? flags.filter.includes('"')
      ? flags.filter.match(/"([^"]+)"/g)?.map((tag: any) =>
        tag.replace(/"/g, "")
      ) ||
        []
      : [flags.filter]
    : [];
};

export const extractJsonLocale = (json: { [key: string]: any }) => {
  const locales: string[] = [];
  Object.keys(json).forEach((key) => {
    if (typeof json[key] === "object") {
      locales.push(key);
    }
  });
  return locales;
};
