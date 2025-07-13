"use client"
import { useState, useEffect } from "react"
import { Menu, X, Calendar, BookOpen, BarChart, LineChart, PieChart, Linkedin, Mail, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon } from "@/components/external-link-icon"

function LanguageSwitcher({ language, setLanguage }: { language: string; setLanguage: (lang: string) => void }) {
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => handleLanguageChange(language === "en" ? "ko" : "en")}
      className="w-12"
    >
      {language === "en" ? "KO" : "EN"}
    </Button>
  )
}

function Header({ language, setLanguage }: { language: string; setLanguage: (lang: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#home", label: language === "en" ? "Home" : "홈" },
    { href: "#about", label: language === "en" ? "About" : "소개" },
    { href: "#experience", label: language === "en" ? "Experience" : "경력" },
    { href: "#education", label: language === "en" ? "Education" : "학력" },
    { href: "#projects", label: language === "en" ? "Projects" : "프로젝트" },
    { href: "#awards", label: language === "en" ? "Awards" : "수상" },
    { href: "#skills", label: language === "en" ? "Skills" : "직무역량" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"}`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold" style={{ color: "#FF3399" }}>
            Hyunseo Oh
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
              onClick={(e) => {
                e.preventDefault()
                const element = document.querySelector(item.href)
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
                setIsMenuOpen(false)
              }}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden space-x-2">
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector(item.href)
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                  setIsMenuOpen(false)
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function Footer({ language }: { language: string }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Hyunseo Oh. {language === "en" ? "All rights reserved." : "All rights reserved."}
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="www.linkedin.com/in/hyunseo-oh-6b5977224"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="mailto:ohscaroh555@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault()
                window.location.href = "mailto:ohscaroh555@gmail.com"
              }}
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  // Language state
  const [language, setLanguage] = useState("en")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en"
    setLanguage(savedLanguage)
  }, [])

  const handleDownloadCV = () => {
    // Create a temporary link to download CV
    const link = document.createElement("a")
    if (language === "en") {
      link.href = "/resume-hyunseo-oh.pdf"
      link.download = "Resume_Hyunseo_Oh.pdf"
    } else {
      link.href = "/이력서-오현서.pdf"
      link.download = "이력서_오현서.pdf"
    }
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={language === "ko" ? "font-pretendard" : ""}>
      <Header language={language} setLanguage={setLanguage} />
      <main className="flex-1">
        <div className="container">
          {/* Hero Section */}
          <section id="home" className="py-12 md:py-24 lg:py-32 xl:py-40">
            <div className="px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                      {language === "en" ? (
                        "Identify through data and learn through action"
                      ) : (
                        <span style={{ letterSpacing: "0.05em", lineHeight: "1.2" }}>
                          데이터로 문제를 찾고
                          <br />
                          실행으로 배웁니다
                        </span>
                      )}
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button onClick={handleDownloadCV} className="w-full min-[400px]:w-auto hero-button">
                      <FileText className="mr-2 h-4 w-4" />
                      {language === "en" ? "Resume" : "이력서"}
                    </Button>
                    <Button onClick={handleDownloadCV} className="w-full min-[400px]:w-auto hero-button">
                      <FileText className="mr-2 h-4 w-4" />
                      {language === "en" ? "CV" : "CV"}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-full">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Hyunseo Oh"
                      width={400}
                      height={400}
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-12 md:py-16 lg:py-24 bg-muted/50">
            <div className="px-4 md:px-6">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  {language === "en"
                    ? "My entrepreneurial experience in the space rental business taught me how to plan and execute marketing strategies based on real user insights. I specialize in building and testing hypotheses, collecting VOC, and applying full-cycle improvement processes across UX and growth funnels."
                    : "고객을 직접 만나고 시장과 대화하는 일에 매력을 느껴, 공간 대여 서비스 창업을 통해 실사용자 기반의 기획과 마케팅을 직접 실행해보았습니다."}
                </p>
                <p className="text-lg leading-relaxed">
                  {language === "en"
                    ? "I set up key metrics for each stage of the customer funnel and designed and executed actions to improve them. What began as a small experiment with fewer than 10 monthly visitors grew significantly through efforts to solve user pain points. I collected over 30 VOCs (Voice of Customer), and ran A/B tests to continuously improve thumbnails, pricing, and copywriting. These efforts led to a 3x increase in booking rate within 30 days and over 2 million KRW in monthly revenue."
                    : "고객 퍼널별로 지표를 설정하고, 이를 향상시키기 위한 액션을 직접 설계하고 실행했습니다. 초기에는 월 방문자 10명도 채 안 되는 작은 실험이었지만, 고객 불편을 해결하려는 과정에서 30건 이상의 VOC를 수집하고, A/B 테스트를 통해 썸네일·가격·카피 문구를 지속적으로 개선했습니다. 그 결과 30일 내 예약률 3배 증가, 월 매출 200만 원 돌파라는 성과를 냈습니다."}
                </p>
                <p className="text-lg leading-relaxed">
                  {language === "en"
                    ? "When there was no visible demand, I re-segmented the target audience. When engagement was low, I redefined the user persona and repositioned the service around its core strength: a 'small party room for two.' Through dozens of such experiments and analyses, I internalized a full-cycle problem-solving process—defining the problem, forming hypotheses, executing quickly, and refining based on feedback."
                    : "수요가 보이지 않으면 타겟을 재세분화하고, 고객 반응이 없으면 페르소나를 재정의하며, '2인 소규모 파티룸'이라는 강점 중심으로 포지셔닝을 재설계했습니다. 이러한 수십 차례의 실험과 분석을 통해, 저는 '문제를 정의하고 → 가설을 세우고 → 빠르게 실행한 후 → 피드백을 반영해 개선하는' 풀사이클 문제 해결 프로세스를 몸에 익혔습니다."}
                </p>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-12 md:py-16 lg:py-24">
            <div className="px-4 md:px-6">
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8"
                style={{ letterSpacing: "0.02em" }}
              >
                {language === "en" ? "Work Experience" : "경력"}
              </h1>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border"></div>

                <div className="space-y-8">
                  {/* Experience items with timeline dots */}
                  <div className="relative flex items-start">
                    <div className="absolute left-2 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                    <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                      <Card className="overflow-hidden">
                        <CardHeader className="bg-muted/50">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-xl">
                                {language === "en" ? "Founder & Marketing Director" : "창업자 겸 마케팅 총괄"}
                              </CardTitle>
                              <CardDescription className="text-base text-white">
                                {language === "en" ? "Inspiroom" : "Inspiroom"}
                              </CardDescription>
                              <div className="flex items-center text-muted-foreground text-sm mt-2">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>{language === "en" ? "Aug 2024 - Present" : "2024년 8월 - 현재"}</span>
                              </div>
                            </div>
                            <button
                              className="h-8 w-8 flex items-center justify-center external-link-icon"
                              onClick={() => window.open("https://naver.me/xX70GlkZ", "_blank")}
                            >
                              <ExternalLinkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <p className="text-sm mb-4">
                            {language === "en"
                              ? "Running my own space rental business, I mproved weekly bookings from 1-2 to over 6 by iterating on solutions derived from customer funnel analysis. Built a KakaoTalk-based AI chatbot to automate customer service, significantly reducing response time and manual workload."
                              : "공간대여 사업을 운영하며 고객 퍼널 분석을 통해 도출한 솔루션을 반복 실험하여 주 평균 예약 수를 1-2건에서 6건 이상으로 끌어올렸습니다. 카카오톡 기반 AI 챗봇 시스템을 구축하여 고객 문의를 자동화하고, 업무량과 응답 시간을 크게 줄였습니다."}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="secondary" className="text-xs">
                              {language === "en" ? "Funnel Analysis" : "퍼널 분석"}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {language === "en" ? "AI Automation" : "AI 자동화"}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {language === "en" ? "Data Analysis" : "데이터 분석"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="relative flex items-start md:justify-end">
                    <div className="absolute left-2 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                    <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8">
                      <Card className="overflow-hidden">
                        <CardHeader className="bg-muted/50">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-xl">
                                {language === "en" ? "Marketing Strategist" : "Marketing Strategist"}
                              </CardTitle>
                              <CardDescription className="text-base text-white">
                                {language === "en" ? "TechEquity AI Summit" : "Techequity AI Summit"}
                              </CardDescription>
                              <div className="flex items-center text-muted-foreground text-sm mt-2">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>{language === "en" ? "Jun 2024 - Present" : "2025년 6월 - 현재"}</span>
                              </div>
                            </div>
                            <button
                              className="h-8 w-8 flex items-center justify-center external-link-icon"
                              onClick={() => window.open("https://techequity-ai.org/", "_blank")}
                            >
                              <ExternalLinkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <p className="text-sm mb-4">
                            {language === "en"
                              ? "Conducted A/B testing on social media creatives to optimize engagement. Collaborated with internal and external stakeholders to organize an international summit focused on equity in AI."
                              : "SNS 게시물 이미지 A/B 테스트를 수행했습니다. 국제적 규모의 행사를 기획하고 실행하기 위해 내외부 이해관계자들과 협업했습니다."}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="secondary" className="text-xs">
                              {language === "en" ? "Event Marketing" : "이벤트 마케팅"}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {language === "en" ? "Digital Campaigns" : "디지털 캠페인"}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {language === "en" ? "A/B Test" : "A/B 테스트"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="absolute left-2 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                    <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                      <Card className="overflow-hidden">
                        <CardHeader className="bg-muted/50">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <CardTitle className="text-xl">
                                {language === "en" ? "Product Manager" : "프로덕트 매니저"}
                              </CardTitle>
                              <CardDescription className="text-base text-white">
                                {language === "en" ? "ANTIEGG" : "ANTIEGG"}
                              </CardDescription>
                              <div className="flex items-center text-muted-foreground text-sm mt-2">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>{language === "en" ? "Jan 2024 - May 2025" : "2024년 1월 - 2025년 5월"}</span>
                              </div>
                            </div>
                            <button
                              className="h-8 w-8 flex items-center justify-center external-link-icon"
                              onClick={() => window.open("https://antiegg.kr", "_blank")}
                            >
                              <ExternalLinkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <p className="text-sm mb-4">
                            {language === "en"
                              ? "Built a dashboard in Looker Studio using 11 content performance metrics to monitor key performance indicators (KPIs). Collaborated with internal and external stakeholders to plan and execute a speaker-led networking event. Developed a blog strategy tailored to corporate clients."
                              : "콘텐츠 성과를 나타내는 11개 지표를 Looker Studio에 대시보드로 구축하여 핵심 지표(KPI)를 모니터링했습니다. 연사 초청 네트워킹 이벤트를 기획하고 실행하기 위해 내외부 이해관계자들과 협업했습니다. 기업 고객을 위해 블로그를 기획했습니다."}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="secondary" className="text-xs">
                              {language === "en" ? "Product Management" : "제품 관리"}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {language === "en" ? "Event Organizing" : "행사 기획"}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {language === "en" ? "B2B" : "B2B"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section id="education" className="py-12 md:py-16 lg:py-24 bg-muted/50">
            <div className="px-4 md:px-6">
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8"
                style={{ letterSpacing: "0.02em" }}
              >
                {language === "en" ? "Education" : "학력"}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader className="bg-muted/50">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-2xl">
                        {language === "en" ? "Hongik University" : "홍익대학교"}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {language === "en" ? "Bachelor of Design, Visual Design" : "디자인학부 시각디자인전공"}
                      </CardDescription>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{language === "en" ? "Mar 2021 - Feb 2026" : "2021년 3월 - 2026년 2월"}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="mb-6">
                      {language === "en" ? "5 Semester Scholarship Recipient" : "5학기 장학금 수혜"}
                    </p>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <BookOpen className="mr-2 h-5 w-5" />
                        {language === "en" ? "Key Courses" : "주요 과목"}
                      </h3>
                      <p className="text-sm">
                        {language === "en"
                          ? "UX Analysis and Application, Product Form Factor Studio, Communication Design, Design Psychology, Corporate Design Studio, Design Inquiry, Design Research, Exhibition Design, Transmedia Workshop, Art and Entrepreneurship, Innovation Methodology and Process, Consumer Behavior"
                          : "UX분석과응용, 제품폼팩터스튜디오, 커뮤니케이션디자인, 디자인심리, 기업적디자인스튜디오, 디자인탐구, 디자인리서치, 전시디자인, 트랜스미디어워크숍, 예술과창업, 혁신방법론과프로세스, 소비자행동"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-muted/50">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-2xl">University of California, Berkeley</CardTitle>
                      <CardDescription className="text-lg">Summer Session</CardDescription>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{language === "en" ? "Jun 2025 - Aug 2025" : "2025년 6월 - 2025년 8월"}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <BookOpen className="mr-2 h-5 w-5" />
                        {language === "en" ? "Key Courses" : "주요 과목"}
                      </h3>
                      <p className="text-sm">Data and Decisions, Digital Transformation</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-12 md:py-16 lg:py-24">
            <div className="px-4 md:px-6">
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8"
                style={{ letterSpacing: "0.02em" }}
              >
                {language === "en" ? "Projects" : "프로젝트"}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src="/images/inspiroom-soft-opening.png"
                      alt="Revenue growth through funnel analysis"
                      width={600}
                      height={300}
                      className="w-full h-full object-cover object-center transition-all hover:scale-105"
                    />
                  </div>
                  <CardHeader className="flex-grow">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-xl">
                        {language === "en"
                          ? "Revenue growth through funnel analysis"
                          : "예약률 개선을 위한 마케팅 실험"}
                      </CardTitle>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{language === "en" ? "Aug 2024 - Present" : "2024년 8월 - 현재"}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm">
                      {language === "en"
                        ? "Improved weekly bookings from 1-2 to over 6 by systematically addressing each stage of the customer funnel through data-driven marketing experiments."
                        : "창업 초기 적자 상황에서 데이터 기반 마케팅 실험을 통해 예약률을 단계적으로 개선한 프로젝트입니다."}
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Link href="/projects/funnel_analysis" className="w-full">
                      <Button variant="outline" className="w-full bg-transparent">
                        {language === "en" ? "View More" : "더보기"}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src="/images/antiegg-web-cover.jpg"
                      alt="Corporate Blog Planning"
                      width={600}
                      height={300}
                      className="w-full h-full object-cover object-center transition-all hover:scale-105"
                    />
                  </div>
                  <CardHeader className="flex-grow">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-xl">
                        {language === "en" ? "Corporate Blog Planning" : "기업 블로그 기획"}
                      </CardTitle>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{language === "en" ? "Jan 2024 - May 2025" : "2024년 1월 - 2025년 5월"}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm">
                      {language === "en"
                        ? "Planned and designed a corporate blog for SpaceBase to establish brand rapport and enable sustainable content management without development resources."
                        : "스페이스베이스의 브랜드 라포 형성을 위한 기업 블로그를 기획하고, 개발 리소스 없이 지속 가능한 콘텐츠 운영이 가능하도록 설계했습니다."}
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Link href="/projects/marketing-dashboard" className="w-full">
                      <Button variant="outline" className="w-full bg-transparent">
                        {language === "en" ? "View More" : "더보기"}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src="/images/inspiroom-soft-opening.png"
                      alt="AI Chatbot Implementation"
                      width={600}
                      height={300}
                      className="w-full h-full object-cover object-center transition-all hover:scale-105"
                    />
                  </div>
                  <CardHeader className="flex-grow">
                    <div className="flex flex-col gap-2">
                      <CardTitle className="text-xl">
                        {language === "en" ? "INSPIROOM AI Chatbot Development" : "INSPIROOM AI 챗봇 개발"}
                      </CardTitle>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{language === "en" ? "Aug 2024 - Present" : "2024년 8월 - 현재"}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm">
                      {language === "en"
                        ? "Developed an AI chatbot to automate repetitive customer inquiries and additional booking processes, achieving 2.1x revenue increase from additional bookings."
                        : "반복적인 고객 문의와 추가예약 프로세스를 자동화하는 AI 챗봇을 개발하여 추가예약 수익을 2.1배 증가시켰습니다."}
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Link href="/projects/ai-chatbot" className="w-full">
                      <Button variant="outline" className="w-full bg-transparent">
                        {language === "en" ? "View More" : "더보기"}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>

          {/* Awards Section */}
          <section id="awards" className="py-12 md:py-16 lg:py-24 bg-muted/50">
            <div className="px-4 md:px-6">
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8"
                style={{ letterSpacing: "0.02em" }}
              >
                {language === "en" ? "Awards" : "수상"}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="relative overflow-hidden">
                  <CardHeader className="py-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{language === "en" ? "1st Place" : "1위"}</CardTitle>
                        <CardDescription className="text-lg font-medium text-foreground">
                          {language === "en" ? "Startup Idea Competition" : "창업 아이디어 경진대회"}
                        </CardDescription>
                        <CardDescription className="text-muted-foreground mt-1">
                          {language === "en" ? "Hongik University Business School, 2023" : "홍익대학교 경영대학, 2023"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="relative overflow-hidden">
                  <CardHeader className="py-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{language === "en" ? "3rd Place" : "3위"}</CardTitle>
                        <CardDescription className="text-lg font-medium text-foreground">
                          {language === "en" ? "Startup Festival" : "창업 페스티벌"}
                        </CardDescription>
                        <CardDescription className="text-muted-foreground mt-1">
                          {language === "en" ? "Hongik University, 2023" : "홍익대학교, 2023"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-12 md:py-16 lg:py-24">
            <div className="px-4 md:px-6">
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8"
                style={{ letterSpacing: "0.02em" }}
              >
                {language === "en" ? "Skills" : "직무 역량"}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex flex-col h-full">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <BarChart className="mr-2 h-5 w-5" />
                    Marketing
                  </h2>

                  <Card className="flex-grow">
                    <CardContent className="p-4 h-full flex flex-col justify-start">
                      <div className="grid grid-cols-2 gap-3">
                        {(language === "en"
                          ? [
                              "Performance Marketing",
                              "Data Analysis",
                              "SEO",
                              "Dashboard Development",
                              "A/B Testing",
                              "Problem Definition",
                              "Pricing Strategy",
                              "End-to-End Operations",
                              "CRM Marketing",
                              "Funnel Optimization",
                              "Customer Segmentation",
                              "Conversion Rate Optimization",
                            ]
                          : [
                              "퍼포먼스 마케팅",
                              "데이터 분석",
                              "SEO",
                              "대시보드 개발",
                              "A/B 테스트",
                              "문제 정의",
                              "가격 전략",
                              "End-to-End 운영",
                              "CRM 마케팅",
                              "퍼널 최적화",
                              "고객 세분화",
                              "전환율 개선",
                            ]
                        ).map((skill, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3 flex-shrink-0 mt-1" />
                            <span className="text-sm">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col h-full">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <LineChart className="mr-2 h-5 w-5" />
                    Productivity
                  </h2>

                  <Card className="flex-grow">
                    <CardContent className="p-4 h-full flex flex-col justify-start">
                      <div className="flex items-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3 flex-shrink-0 mt-1" />
                        <span className="text-sm">
                          {language === "en" ? "AI Chatbot Planning/Development" : "AI 챗봇 기획/개발"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col h-full">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    UX
                  </h2>

                  <Card className="flex-grow">
                    <CardContent className="p-4 h-full flex flex-col justify-start">
                      <div className="space-y-3">
                        {(language === "en"
                          ? ["User Persona", "User Story", "User Experience Modeling"]
                          : ["유저 페르소나", "유저 스토리", "유저 경험 모델링"]
                        ).map((skill, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3 flex-shrink-0 mt-1" />
                            <span className="text-sm">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">{language === "en" ? "Tools" : "사용할 수 있는 툴"}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col h-full">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <BarChart className="mr-2 h-5 w-5" />
                      Marketing
                    </h3>
                    <Card className="flex-grow">
                      <CardContent className="p-4 h-full flex flex-col justify-start">
                        <div className="space-y-3">
                          {["GA4", "Looker Studio", "Search Console", "MySQL", "Python"].map((tool, idx) => (
                            <div key={idx} className="flex items-center">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3 flex-shrink-0 mt-1" />
                              <span className="text-sm">{tool}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex flex-col h-full">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <LineChart className="mr-2 h-5 w-5" />
                      Productivity
                    </h3>
                    <Card className="flex-grow">
                      <CardContent className="p-4 h-full flex flex-col justify-start">
                        <div className="space-y-3">
                          {["Slack", "Notion", "Zapier", "Make", "Asana", "Zira"].map((tool, idx) => (
                            <div key={idx} className="flex items-center">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3 flex-shrink-0 mt-1" />
                              <span className="text-sm">{tool}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex flex-col h-full">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <PieChart className="mr-2 h-5 w-5" />
                      Design
                    </h3>
                    <Card className="flex-grow">
                      <CardContent className="p-4 h-full flex flex-col justify-start">
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            "Figma",
                            "Framer",
                            "Protopie",
                            "Photoshop",
                            "Illustrator",
                            "Blender",
                            "After Effects",
                            "Unreal Engine",
                            "Rhino",
                            "Keyshot",
                            "SketchUp",
                            "AutoCAD",
                          ].map((tool, idx) => (
                            <div key={idx} className="flex items-center">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3 flex-shrink-0 mt-1" />
                              <span className="text-sm">{tool}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">{language === "en" ? "Languages" : "언어"}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <h3 className="text-xl font-semibold mb-2">{language === "en" ? "Korean" : "한국어"}</h3>
                      <Badge className="mb-2">{language === "en" ? "Native" : "모국어"}</Badge>
                      <p className="text-muted-foreground">{language === "en" ? "Native Speaker" : "원어민"}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <h3 className="text-xl font-semibold mb-2">{language === "en" ? "English" : "영어"}</h3>
                      <Badge className="mb-2">Duolingo 135</Badge>
                      <p className="text-muted-foreground">{language === "en" ? "Fluent" : "유창함"}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex flex-col items-center p-6">
                      <h3 className="text-xl font-semibold mb-2">{language === "en" ? "Japanese" : "일본어"}</h3>
                      <Badge className="mb-2">JLPT N2</Badge>
                      <p className="text-muted-foreground">{language === "en" ? "Conversational" : "일상 대화"}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer language={language} />
    </div>
  )
}
