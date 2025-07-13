"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button variant="outline" size="sm" onClick={() => setLanguage(language === "en" ? "ko" : "en")} className="w-12">
      {language === "en" ? "KO" : "EN"}
    </Button>
  )
}
