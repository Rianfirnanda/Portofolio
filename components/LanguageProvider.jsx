'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { portfolio } from '@/data/portfolio';
import { t as translate } from '@/lib/i18n';

/**
 * Satu state bahasa untuk seluruh situs (ID/EN) — tanpa library i18n.
 * Nilai awal diambil dari portfolio.meta.locale di data/portfolio.js.
 */
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(portfolio.meta.locale === 'en' ? 'en' : 'id');

  // Sinkronkan atribut lang pada <html> agar screen reader membaca dengan benar.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((current) => (current === 'id' ? 'en' : 'id'));
  }, []);

  // `t` terikat ke bahasa aktif supaya komponen cukup memanggil t(value).
  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      t: (input) => translate(input, lang),
    }),
    [lang, toggleLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** Hook pembaca konteks bahasa. */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage harus dipakai di dalam <LanguageProvider>.');
  }
  return context;
}

export default LanguageProvider;
