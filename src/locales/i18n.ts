import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

import { en } from "./en";
import { es } from "./es";

const resources = {
  en,
  es,
};

const i18n = new I18n(resources);
i18n.locale = Localization.getLocales()[0].languageCode || "es";
i18n.interpolate.bind(i18n);

export const t = i18n.t.bind(i18n);
export default i18n;
