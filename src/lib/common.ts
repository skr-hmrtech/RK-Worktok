type TempParams = {
  [key: string]:
    | string
    | number
    | boolean
    | { value?: string | number | boolean }
    | null
    | undefined;
};

export const createUrl = (url: string, tempParams: TempParams): string => {
  const obj: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(tempParams)) {
    if (
      value !== null &&
      value !== undefined &&
      value !== false &&
      value !== ""
    ) {
      if (typeof value === "object" && value !== null) {
        obj[key] = (value as { value?: string | number | boolean }).value ?? "";
      } else {
        obj[key] = value as string | number | boolean;
      }
    }
  }

  const makeUrl = Object.entries(obj)
    .map(
      ([key, value]) =>
        `&${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("");

  const finalUrl = `${url}${url.includes("?") ? "&" : "?"}${makeUrl.substring(
    1
  )}`;

  return finalUrl;
};

export const formatNumberByLocal = (num: number) => {
  if (typeof num !== "number") return num;
  const userLocale = navigator?.language || "en-US";
  return new Intl.NumberFormat(userLocale).format(num);
};
