"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ko"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionary
const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.education": "Education",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "nav.blog": "Blog",
    "about.title": "About Me",
    "experience.title": "Work Experience",
    "projects.title": "Projects",
    "education.title": "Education",
    "skills.title": "Skills",
    "contact.title": "Contact Me",
    "contact.email": "Email",
    "contact.linkedin": "LinkedIn",
    "contact.blog": "Blog",
    "chatbot.title": "Ask me anything",
    "chatbot.placeholder": "Type your question here...",
    "download.resume": "Download Resume",
    // Work experience
    "experience.inspiroom.title": "Founder & Marketing Director",
    "experience.inspiroom.company": "Inspiroom Space Rental Business",
    "experience.inspiroom.period": "Aug 2024 - Present",
    "experience.antiegg.title": "Product Manager",
    "experience.antiegg.company": "ANTIEGG Content Agency",
    "experience.antiegg.period": "Jan 2024 - May 2025",
    // Education
    "education.hongik.name": "Hongik University",
    "education.hongik.degree": "Bachelor of Design, Visual Design",
    "education.hongik.period": "Mar 2021 - Feb 2026",
    "education.berkeley.name": "University of California, Berkeley",
    "education.berkeley.program": "Summer Session",
    "education.berkeley.period": "Jun 2025 - Aug 2025",
    // Skills
    "skills.marketing": "Marketing",
    "skills.productivity": "Productivity",
    "skills.ux": "UX",
    "skills.tools": "Tools",
    "skills.languages": "Languages",
    // Awards
    "awards.title": "Awards",
    "awards.startup.festival": "3rd Place, Startup Festival (Hongik University, 2023)",
    "awards.startup.competition": "1st Place, Startup Idea Competition (Hongik University Business School, 2023)",
  },
  ko: {
    "nav.home": "홈",
    "nav.about": "소개",
    "nav.experience": "경력",
    "nav.projects": "프로젝트",
    "nav.education": "학력",
    "nav.skills": "직무역량",
    "nav.contact": "연락처",
    "nav.blog": "블로그",
    "about.title": "소개",
    "experience.title": "경력",
    "projects.title": "프로젝트",
    "education.title": "학력",
    "skills.title": "기술",
    "contact.title": "연락처",
    "contact.email": "이메일",
    "contact.linkedin": "링크드인",
    "contact.blog": "블로그",
    "chatbot.title": "무엇이든 물어보세요",
    "chatbot.placeholder": "질문을 입력하세요...",
    "download.resume": "이력서 다운로드",
    // Work experience
    "experience.inspiroom.title": "창업자 겸 마케팅 총괄",
    "experience.inspiroom.company": "Inspiroom 공간대여 사업",
    "experience.inspiroom.period": "2024년 8월 - 현재",
    "experience.antiegg.title": "프로덕트 매니저",
    "experience.antiegg.company": "ANTIEGG 콘텐츠 대행사",
    "experience.antiegg.period": "2024년 1월 - 2025년 5월",
    // Education
    "education.hongik.name": "홍익대학교",
    "education.hongik.degree": "디자인학부 시각디자인전공",
    "education.hongik.period": "2021년 3월 - 2026년 2월",
    "education.berkeley.name": "University of California, Berkeley",
    "education.berkeley.program": "Summer Session",
    "education.berkeley.period": "2025년 6월 - 2025년 8월",
    // Skills
    "skills.marketing": "마케팅",
    "skills.productivity": "생산성",
    "skills.ux": "UX",
    "skills.tools": "툴",
    "skills.languages": "언어",
    // Awards
    "awards.title": "수상 경력",
    "awards.startup.festival": "창업 페스티벌 3위 (홍익대학교, 2023)",
    "awards.startup.competition": "창업 아이디어 경진대회 1위 (홍익대학교 경영대학, 2023)",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Function to translate text
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  // Save language preference to localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ko")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
