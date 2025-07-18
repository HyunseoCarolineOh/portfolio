"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon } from "@/components/external-link-icon"

// Project data
const projects = {
  funnel_analysis: {
    title: {
      en: "Revenue growth through funnel analysis",
      ko: "퍼널 분석을 통한 매출 증대",
    },
    description: {
      en: "Improved weekly bookings by 1133% through iterative testing of solutions derived from customer funnel analysis in a space rental business.",
      ko: "공간대여 사업에서 데이터 기반 마케팅 실험을 통해 퍼널을 개선하고 매출을 1133% 증대시켰습니다.",
    },
    period: {
      en: "Aug 2024 - Nov 2024",
      ko: "2024년 8월 - 2024년 11월",
    },
    stage1: {
      problemDefinition: {
        en: "Through advertising, traffic (exposure) increased, but there was no change in actual bookings. This suggests that while the top-of-funnel 'exposure' stage was improved, bottlenecks occurred in the middle stage 'clicks' or bottom stage 'bookings'.",
        ko: "서비스 초기, 예약이 들어오지 않아 매출이 저조했습니다. 예약수가 저조했던 원인을 분석한 결과 공간이 플랫폼에서 거의 노출되지 않는다는 점을 발견했습니다. 예약 이전에 유입 자체가 일어나지 않았던 상황이었습니다.",
      },
      hypothesisDescription: {
        en: "Based on the analysis that low bookings were due to insufficient exposure on the platform, we developed the following hypothesis:",
        ko: "플랫폼에서의 노출 부족이 예약 저조의 원인이라는 분석을 바탕으로 다음과 같은 가설을 세웠습니다:",
      },
      hypothesis: {
        en: "If exposure increases through advertising, bookings will also increase.",
        ko: "광고를 집행하면 노출이 주당 100회에서 1,000회로 증가하고, 그 중 1%가 예약으로 전환되어 주당 10건의 예약이 발생할 것이다.",
      },
      solution: {
        en: "Started online advertising campaigns to increase daily exposure from 5,000 to over 14,000, significantly boosting our visibility on the platform.",
        ko: "인스퍼룸이 입점되어 있는 플랫폼인 스페이스클라우드 내부에서 광고를 집행했습니다. 여러 가지 광고상품들 중 가장 효과적인 광고상품을 찾기 위해 3주간 같은 요일에 다른 광고상품을 집행했고, 지역필터, 상권형키워드, 유형리스트 세 가지의 광고상품 중 가장 성과가 좋았던 지역필터를 실험에서 사용할 솔루션으로 선정해 한 달 간 광고를 집행했습니다.",
      },
      results: {
        en: "Exposure increased significantly, but bookings did not increase → This raised the possibility of issues with click-through rates or thumbnail strategy.",
        ko: "그 결과, 노출은 주당 1,137회로 예상보다 많이 증가했지만, 예약수는 주당 4회로 예약률은 0.35%였으며 실험 전(주당 3회) 대비 변화가 미미했습니다.",
      },
      metrics: {
        input: {
          en: "Exposure",
          ko: "노출",
        },
        output: {
          en: "Bookings",
          ko: "예약수",
        },
      },
    },
    stage2: {
      problemDefinition: {
        en: "Despite increased exposure, booking rates remained low. Analysis revealed that users were not clicking on our listings, likely due to unappealing thumbnails that failed to capture attention and generate interest.",
        ko: "노출이 증가했음에도 불구하고 예약수가 늘어나지 않은 이유는 노출이 클릭으로 이어지지 않았기 때문이었습니다. 노출은 104회에서 1,137회로 10배 넘 늘어난 데 비해, 클릭은 47회에서 249회로 약 5배 증가하여 노출에 비례해 늘어나지 않았습니다.",
      },
      hypothesisDescription: {
        en: "Users on SpaceCloud typically decide whether to click based on the information they see at first glance. Therefore, we hypothesized:",
        ko: "스페이스클라우드를 이용하는 사용자는 대부분 파티룸을 처음 접했을 때 정보를 바탕으로 클릭할 지 말 지를 결정합니다. 첫 눈에 노출되는 정보, 즉 썸네일을 매력적으로 보이게 만든다면 클릭수가 늘어나 결론적으로 예약수 증가로 이어질 것이라고 생각했고 따라서 다음과 같은 가설을 세웠습니다:",
      },
      hypothesis: {
        en: "If we use thumbnails that users want to click, both click-through rates and bookings will increase together.",
        ko: "기존 썸네일에서 매력적인 썸네일로 썸네일을 교체하면 클릭률이 21.9%에서 40%로 증가할 것이다.",
      },
      solution: {
        en: "Thumbnail Strategy Improvement: 1) Re-photographed thumbnails to create visually appealing images, 2) Added '1,000 KRW for early morning hours' text to thumbnails to emphasize price attractiveness. This strategy provided incentives for users to click, significantly improving CTR (click-through rate).",
        ko: "썸네일을 개선하기 위해 썸네일을 구성하는 요소들을 모두 분리해서 살펴본 다음, 아래 표와 같이 요소별로 분석하고 우선순위가 높은 요소는 개선방향을 고민하여 실제로 썸네일에 반영했습니다.",
      },
      results: {
        en: "After thumbnail improvements, click-through rates increased and bookings also increased significantly. Features: Both CTR and bookings showed meaningful growth together.",
        ko: "썸네일 업데이트(8/31) 이후 클릭률이 유의미하게 상승했습니다. 노출만 이루어지던 이전과 달리 노출수가 많아지면 클릭수도 함께 상승하는 모습을 데이터에서 확인할 수 있었습니다. 1,671 도달 중 예약이 20건 발생해 1단계 가설에서 목표로 했던 것(1%)보다 더 많은 고객(1.2%)이 구매로 전환되었습니다.",
      },
      metrics: {
        input: {
          en: "Click-through Rate (CTR)",
          ko: "클릭률 (CTR)",
        },
        output: {
          en: "Bookings",
          ko: "예약수",
        },
      },
    },
    overallResults: {
      en: "Through this two-stage approach, weekly bookings improved from 1-2 to over 6. The systematic analysis of each funnel stage - from exposure to click-through to conversion - enabled us to identify and solve specific bottlenecks, resulting in sustainable revenue growth.",
      ko: "두 번에 걸친 퍼널 개선을 통해 주당 예약수를 0회에서 20회까지 높였습니다. 노출부터 클릭, 전환까지 각 퍼널 단계의 체계적인 분석을 통해 특정 병목 지점을 식별하고 해결할 수 있었으며, 결과적으로 인스퍼룸을 적자 상태에서 월 200만원의 지속적인 매출을 내는 사업체로 발전시켰습니다.",
    },
    lessonsLearned: {
      en: "I realized that running ads isn't always the answer. While ads can definitely boost traffic, if there's an issue with the click-through rate (CTR), no amount of traffic will lead to conversions.",
      ko: "광고 집행이 모든 상황에서 답이 되지는 않는다는 것을 깨달았습니다. 광고는 트래픽을 확실하게 개선시킬 수 있기는 하지만, CTR에 문제가 있으면 트래픽이 아무리 많이 늘어봤자 전환으로 이어지지 않기 때문입니다.",
    },
    technologies: {
      en: ["Problem Definition", "Hypothesis", "Growth Marketing", "Pricing Strategy", "Data Analysis"],
      ko: ["문제 정의", "가설 설정", "그로스 마케팅", "가격 전략", "데이터 분석"],
    },
    images: [
      "/images/stage1-exposure-vs-bookings-chart.png",
      "/images/stage2-ctr-bookings-chart.png",
      "/images/thumbnail-before-after.png",
    ],
    relatedLinks: [
      {
        title: "Inspiroom",
        url: "https://www.spacecloud.kr/space/64161",
      },
    ],
  },
  "b2b-blog": {
    title: {
      en: "B2B Blog Design",
      ko: "기업 블로그 기획",
    },
    description: {
      en: "Built SpaceBase's blog with scalable content management, no dev required.",
      ko: "공간 디자인 스튜디오 스페이스베이스의 브랜드 라포 형성을 위한 기업 블로그를 기획했습니다. 개발 리소스 없이 지속 가능한 콘텐츠 운영이 가능하도록 설계했습니다.",
    },
    period: {
      en: "Jan 2024 - Feb 2025",
      ko: "2025년 1월 - 2025년 2월",
    },
    problemDefinition: {
      en: "SpaceBase recognized the need for corporate blog operation but lacked engineering resources. They expected the blog to serve as a starting point for brand rapport formation, being more approachable than formal corporate introduction meetings.",
      ko: "공간 디자인 스튜디오 스페이스베이스는 인바운드 유입을 늘리기 위한 채널 중 하나로 기업 블로그 운영의 필요성을 인식하고 있었지만, 팀 내부에 개발자가 없어 제작 여력이 부족하고, 블로그를 개발한다 하더라도 관리를 할 수 없는 상태였습니다.",
    },
    solution: {
      en: "① Information Architecture & Wireframe Design: Balanced client's preference for flashy UI with existing brand mood maintenance. Designed GNB to connect to existing site to avoid duplication with Contact and About pages. \n\n ② Framer CMS Implementation: Set up Framer CMS to enable content publishing without coding. Configured user-centric structure considering content publishing/editing/distribution from operator's perspective.",
      ko: "Framer를 이용해 코딩 없이도 새로운 글 작성과 발행이 용이하도록 설계했습니다.",
    },
    results: {
      en: "Launched a complete website without development resources. Secured sustainability and independence for clients to directly manage content. Visual materials (wireframes) facilitated internal decision-making processes and enhanced planning clarity and persuasiveness.",
      ko: "개발 리소스 없이 완성도 있는 웹사이트를 런칭했습니다. 클라이언트가 직접 콘텐츠를 운영할 수 있는 지속 가능성과 자립성을 확보했습니다. 시각 자료(와이어프레임)를 통해 내부 의사결정 과정이 원활해졌고, 기획의 명확성과 설득력을 강화했습니다.",
    },
    lessonsLearned: {
      en: "UX should consider not only website users but also administrators. Clear and concise documentation is necessary for communicating with internal and external stakeholders, beyond just good verbal communication.",
      ko: "UX는 웹사이트를 이용하는 사람뿐 아니라 관리하는 사람도 고려해야 합니다. 내외부 이해관계자와 소통하기 위해서는 말을 잘하는 것도 중요하지만, 명확하고 간결한 문서화가 필요합니다.",
    },
    technologies: {
      en: ["Framer CMS", "Information Architecture", "Wireframing", "UX Design", "Content Strategy"],
      ko: ["프레이머 CMS", "프레이머 CMS", "정보 구조", "와이어프레임", "UX 디자인", "콘텐츠 전략"],
    },
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BvxlvAkg2vQo2CTPOdryaCIvpNlzNp.png"],
    relatedLinks: [
      {
        title: "Spacebase Blog",
        url: "https://spacebase.co.kr/",
      },
    ],
  },
  "ecommerce-redesign": {
    title: {
      en: "B2B Banner CTR Optimization",
      ko: "B2B 배너 CTR 최적화",
    },
    description: {
      en: "Optimized B2B ad CTR using GA4 and data-informed experiments to improve website conversion performance.",
      ko: "GA4를 바탕으로 B2B 배너의 CTR을 개선하기 위해 문제를 정의하고 솔루션을 기획해 실험했습니다.",
    },
    period: {
      en: "Jan 2024 - May 2025",
      ko: "2024년 1월 - 2025년 5월",
    },
    problemDefinition: {
      en: "B2B banner ads on the website had low click-through rates, resulting in poor lead generation and conversion performance for business clients.",
      ko: "웹사이트 내 B2B 배너 광고의 클릭률이 낮아 비즈니스 클라이언트에 대한 리드 생성과 전환 성과가 저조했습니다.",
    },
    hypothesis: {
      en: "By analyzing user behavior through GA4 and implementing targeted design and messaging improvements, we can significantly increase B2B banner CTR.",
      ko: "GA4를 통한 사용자 행동 분석과 타겟팅된 디자인 및 메시징 개선을 통해 B2B 배너 CTR을 크게 향상시킬 수 있을 것입니다.",
    },
    solution: {
      en: "Conducted comprehensive analysis using GA4 to identify user behavior patterns. Designed and tested multiple banner variations with different messaging, colors, and placement strategies. Implemented A/B testing framework for continuous optimization.",
      ko: "GA4를 사용하여 사용자 행동 패턴을 파악하는 종합적인 분석을 수행했습니다. 다양한 메시징, 색상, 배치 전략으로 여러 배너 변형을 설계하고 테스트했습니다. 지속적인 최적화를 위한 A/B 테스트 프레임워크를 구현했습니다.",
    },
    results: {
      en: "Achieved 35% increase in B2B banner CTR, improved lead quality by 25%, and enhanced overall website conversion performance for business segments.",
      ko: "B2B 배너 CTR 35% 증가, 리드 품질 25% 향상, 비즈니스 세그먼트의 전체 웹사이트 전환 성과 개선을 달성했습니다.",
    },
    lessonsLearned: {
      en: "Data-driven design decisions are more effective than intuition-based approaches. Continuous testing and iteration are key to sustained improvement.",
      ko: "데이터 기반 디자인 결정이 직관 기반 접근법보다 효과적입니다. 지속적인 테스트와 반복이 지속적인 개선의 핵심입니다.",
    },
    technologies: {
      en: ["GA4", "A/B Testing", "Web Analytics", "Conversion Optimization", "UX Design"],
      ko: ["GA4", "A/B 테스트", "웹 분석", "전환 최적화", "UX 디자인"],
    },
    images: [],
    relatedLinks: [
      {
        title: "ANTIEGG 웹사이트",
        url: "https://antiegg.kr",
      },
    ],
  },
  "ai-chatbot": {
    title: {
      en: "Customer service chatbot development",
      ko: "고객응대 AI 챗봇 개발",
    },
    description: {
      en: "Developed an AI chatbot to automate repetitive customer inquiries and additional booking processes, significantly improving operational efficiency and revenue.",
      ko: "반복적인 고객 문의와 추가예약 프로세스를 자동화하는 AI 챗봇을 개발하여 운영 효율성과 매출을 크게 개선했습니다.",
    },
    period: {
      en: "Aug 2024 - Present",
      ko: "2024년 8월 - 현재",
    },
    problemDefinition: {
      en: "While operating the space rental service, there was significant fatigue from manually responding to repetitive customer questions (location, entry method, additional bookings, etc.), and opportunities for additional bookings were frequently missed due to response delays.",
      ko: "공간 대여 서비스 운영 중, 고객들의 반복적인 질문(위치, 입장 방법, 추가예약 등)에 매번 수동으로 대응하는 데 피로도가 컸고, 응답 지연으로 인해 추가예약 기회를 놓치는 경우도 자주 발생했습니다.",
    },
    hypothesis: {
      en: "By introducing an AI chatbot that handles repeated questions and manages same-day bookings on behalf of the host, \n\n① The operator's time spent on customer support will decrease to under 30 minutes per day\n\n② The number of additional monthly bookings is expected to increase from 4 to 10",
      ko: "반복되는 질문에 대한 답변과 더불어, 당일 추가예약을 대신 해주는 AI 챗봇을 도입하면 \n\n① 공간 운영자가 CS에 들이는 시간이 일 30분 이하로 줄어들고 \n\n② 월 추가예약 건수가 4회에서 10회로 늘어날 것이다.",
    },
    solution: {
      en: "① AI Chatbot Auto-Response: Converted frequently asked questions to automatic responses. Continuously improved and tuned response content to prevent inappropriate answers. Successfully enabled chatbot to handle over 60% of total inquiries.\n\n② Additional Booking Process Automation: Previous: Manual SpaceCloud checking and price calculation when users inquired about additional bookings. Improved: Chatbot directly provides remaining time check links and price tables → customers can judge booking availability themselves and make payments.",
      ko: "① AI 챗봇 자동 응답 구축: 자주 묻는 질문을 리스트업한 후 카카오톡 채널에 내장된 AI 자동 응답 기능에 그 내용을 학습시킴. 챗봇이 이상한 답변을 하지 않도록 지속적으로 응답 내용을 모니터링하며 튜닝. \n\n② 추가예약 프로세스 자동화: 기존에는 사용자가 추가예약 문의 시 운영자가 수동으로 스페이스클라우드 확인 및 가격 계산 후 답변했으나, 개선 후에는 챗봇이 직접 잔여 시간 확인 링크 및 가격 테이블을 안내하여 고객이 스스로 예약 가능 여부를 판단 후 입금할 수 있도록 구현.",
    },
    results: {
      en: "Revenue from additional bookings increased 2.1 times compared to before chatbot implementation. Operators were freed from repetitive tasks, and users received immediate responses, leading to increased satisfaction.",
      ko: "챗봇 도입 전보다 추가예약으로 인한 수익이 2.1배 증가했습니다. 운영자는 반복 업무에서 해방되었고, 사용자는 즉시 대응받으며 만족도가 상승했습니다.",
    },
    lessonsLearned: {
      en: "Automation can be a tool to capture missed opportunities. Chatbots are also subjects of user experience design, requiring design that considers user flow and emotions rather than just mechanical accuracy. What customers truly want may not always align with conventional UX/UI wisdom.",
      ko: "자동화는 놓치고 있던 기회를 포착하는 도구가 될 수 있습니다. 챗봇도 일종의 사용자 경험 설계 대상이며, 기계적 정확성보다 사용자 흐름과 감정을 고려한 설계가 필요합니다. 고객이 진정으로 원하는 것이 일반적인 UX/UI의 상식과 일치하지 않을 수도 있습니다.",
    },
    technologies: {
      en: [
        "AI Chatbot",
        "Natural Language Processing",
        "Process Automation",
        "Customer Service",
        "Revenue Optimization",
      ],
      ko: ["AI 챗봇", "자연어 처리", "프로세스 자동화", "고객 서비스", "수익 최적화"],
    },
    images: ["/images/inspiroom-chatbot-interface.png"],
    relatedLinks: [
      {
        title: "AI Chatbot",
        url: "http://pf.kakao.com/_yqIxdn/chat",
      },
    ],
  },
}

export default function ProjectDetail() {
  const params = useParams()
  const slug = params.slug as string
  const [language, setLanguage] = useState("ko")

  // Get language from localStorage or URL params
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "ko"
    setLanguage(savedLanguage)
  }, [])

  const project = projects[slug as keyof typeof projects]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === "en" ? "Project Not Found" : "프로젝트를 찾을 수 없습니다"}
          </h1>
          <p className="text-muted-foreground mb-4">
            {language === "en" ? `Project "${slug}" does not exist.` : `"${slug}" 프로젝트가 존재하지 않습니다.`}
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === "en" ? "Back to Home" : "홈으로 돌아가기"}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Helper function to get section titles based on project type
  const getSectionTitles = (slug: string, language: string) => {
    if (slug === "b2b-blog" || slug === "ai-chatbot") {
      return {
        problemDefinition: language === "en" ? "Situation" : "상황",
        solution: language === "en" ? "Action" : "액션",
      }
    }
    return {
      problemDefinition: language === "en" ? "Problem Definition" : "문제 정의",
      solution: language === "en" ? "Solution" : "실행 과정",
    }
  }

  const sectionTitles = getSectionTitles(slug, language)

  return (
    <div className={`min-h-screen ${language === "ko" ? "font-pretendard" : ""}`}>
      <div className="container px-4 md:px-6 py-8">
        <Link href="/">
          <Button variant="outline" className="mb-8 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "en" ? "Back to Home" : "홈으로"}
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {project.title?.[language as keyof typeof project.title] || "Title not available"}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {project.description?.[language as keyof typeof project.description] || "Description not available"}
            </p>
            <div className="flex items-center text-muted-foreground mb-6">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{project.period?.[language as keyof typeof project.period] || "Period not available"}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies?.[language as keyof typeof project.technologies]?.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              )) || null}
            </div>

            {/* Related Links */}
            {project.relatedLinks && project.relatedLinks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.relatedLinks.map((link, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(link.url, "_blank")}
                    className="bg-transparent"
                  >
                    <ExternalLinkIcon className="mr-2 h-4 w-4" />
                    {link.title}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-8">
            {/* Funnel Analysis Project - Two Stage Approach */}
            {slug === "funnel_analysis" && project.stage1 && project.stage2 && (
              <>
                {/* Stage 1 */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-primary">
                    {language === "en"
                      ? "Stage 1: Exposure Improvement through Advertising"
                      : "1단계: 광고를 통한 노출 개선"}
                  </h2>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Problem Definition" : "문제 정의"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">
                        {project.stage1.problemDefinition?.[
                          language as keyof typeof project.stage1.problemDefinition
                        ] || "Content not available"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Hypothesis" : "가설"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base mb-4">
                        {project.stage1.hypothesisDescription?.[
                          language as keyof typeof project.stage1.hypothesisDescription
                        ] || "Content not available"}
                      </p>

                      <div className="mb-4">
                        <p className="text-base bg-muted/30 p-3 rounded-md border-l-4 border-primary">
                          {project.stage1.hypothesis?.[language as keyof typeof project.stage1.hypothesis] ||
                            "Hypothesis not available"}
                        </p>
                      </div>

                      {/* Stage 1 Metrics Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-lg">
                          <thead>
                            <tr className="bg-muted/100">
                              <th className="px-4 py-3 text-left font-medium rounded-tl-lg border-r-2 border-muted/50">
                                {language === "en" ? "Input Metric" : "인풋 지표"}
                              </th>
                              <th className="px-4 py-3 text-left font-medium rounded-tr-lg">
                                {language === "en" ? "Output Metric" : "아웃풋 지표"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-muted/50">
                              <td className="px-4 py-3 rounded-bl-lg border-r-2 border-muted/50">
                                {project.stage1.metrics?.input?.[
                                  language as keyof typeof project.stage1.metrics.input
                                ] || "Input metric not available"}
                              </td>
                              <td className="px-4 py-3 rounded-br-lg">
                                {project.stage1.metrics?.output?.[
                                  language as keyof typeof project.stage1.metrics.output
                                ] || "Output metric not available"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Solution" : "실행 과정"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">
                        {project.stage1.solution?.[language as keyof typeof project.stage1.solution] ||
                          "Solution not available"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Results" : "결과"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base mb-4">
                        {project.stage1.results?.[language as keyof typeof project.stage1.results] ||
                          "Results not available"}
                      </p>
                      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src="/images/stage1-results-chart.svg"
                          alt="Stage 1 Results Chart"
                          width={800}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Stage 2 */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-primary">
                    {language === "en"
                      ? "Stage 2: CTR Improvement through Thumbnail Strategy"
                      : "2단계: 썸네일 전략을 통한 CTR 개선"}
                  </h2>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Problem Definition" : "문제 정의"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base mb-4">
                        {project.stage2.problemDefinition?.[
                          language as keyof typeof project.stage2.problemDefinition
                        ] || "Content not available"}
                      </p>
                      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src="/images/stage2-problem-chart.svg"
                          alt="Stage 2 Problem Analysis Chart"
                          width={800}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Hypothesis" : "가설"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base mb-4">
                        {project.stage2.hypothesisDescription?.[
                          language as keyof typeof project.stage2.hypothesisDescription
                        ] || "Content not available"}
                      </p>

                      <div className="mb-4">
                        <p className="text-base bg-muted/30 p-3 rounded-md border-l-4 border-primary">
                          {project.stage2.hypothesis?.[language as keyof typeof project.stage2.hypothesis] ||
                            "Hypothesis not available"}
                        </p>
                      </div>

                      {/* Stage 2 Metrics Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-lg">
                          <thead>
                            <tr className="bg-muted/100">
                              <th className="px-4 py-3 text-left font-medium rounded-tl-lg border-r-2 border-muted/50">
                                {language === "en" ? "Input Metric" : "인풋 지표"}
                              </th>
                              <th className="px-4 py-3 text-left font-medium rounded-tr-lg">
                                {language === "en" ? "Output Metric" : "아웃풋 지표"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-muted/50">
                              <td className="px-4 py-3 rounded-bl-lg border-r-2 border-muted/50">
                                {project.stage2.metrics?.input?.[
                                  language as keyof typeof project.stage2.metrics.input
                                ] || "Input metric not available"}
                              </td>
                              <td className="px-4 py-3 rounded-br-lg">
                                {project.stage2.metrics?.output?.[
                                  language as keyof typeof project.stage2.metrics.output
                                ] || "Output metric not available"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Solution" : "실행 과정"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                        <Image
                          src="/images/thumbnail-analysis.png"
                          alt="Thumbnail Analysis Components"
                          width={800}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-base mb-4">
                        {project.stage2.solution?.[language as keyof typeof project.stage2.solution] ||
                          "Solution not available"}
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-lg">
                          <thead>
                            <tr className="bg-muted/100">
                              <th className="px-4 py-3 text-center font-medium rounded-tl-lg border-r border-muted/50 min-w-[80px] whitespace-nowrap text-sm">
                                {language === "en" ? "Component" : "요소"}
                              </th>
                              <th className="px-4 py-3 text-center font-medium border-r border-muted/50 min-w-[200px] whitespace-nowrap text-sm">
                                {language === "en" ? "Description" : "설명"}
                              </th>
                              <th className="px-4 py-3 text-center font-medium border-r border-muted/50 min-w-[100px] whitespace-nowrap text-sm">
                                {language === "en" ? "Priority" : "우선순위"}
                              </th>
                              <th className="px-4 py-3 text-center font-medium rounded-tr-lg min-w-[150px] whitespace-nowrap text-sm">
                                {language === "en" ? "Improvement Direction" : "개선 방향"}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-muted/50">
                              <td className="px-4 py-3 border-r border-muted/50 font-medium text-sm text-center">
                                {language === "en" ? "Title" : "제목"}
                              </td>
                              <td className="px-4 py-3 border-r border-muted/50 text-sm">
                                {language === "en"
                                  ? "Doesn't require much effort to change but is an element that users pay attention to at least once."
                                  : "바꾸는 데에 큰 품이 들지 않으나 사용자들이 한 번 쯤은 눈길을 주는 요소이다."}
                              </td>
                              <td className="px-4 py-3 border-r border-muted/50 text-center">
                                <Badge variant="destructive" className="text-xs">
                                  {language === "en" ? "High" : "상"}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {language === "en"
                                  ? "Insert the biggest advantage '14-person large capacity' into the title."
                                  : "가장 큰 장점인 '14인 대형'을 제목에 삽입한다"}
                              </td>
                            </tr>
                            <tr className="bg-muted/30">
                              <td className="px-4 py-3 border-r border-muted/50 font-medium text-sm text-center">
                                {language === "en" ? "Photo" : "사진"}
                              </td>
                              <td className="px-4 py-3 border-r border-muted/50 text-sm">
                                {language === "en"
                                  ? "Takes up the largest area. Requires re-shooting so it takes more resources to change, but has high impact."
                                  : "가장 넓은 면적을 차지한다. 재촬영을 해야 해서 바꿀 때 리소스는 많이 들겠지만 임팩트가 크다"}
                              </td>
                              <td className="px-4 py-3 border-r border-muted/50 text-center">
                                <Badge variant="secondary" className="text-xs">
                                  {language === "en" ? "Medium" : "중"}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {language === "en"
                                  ? "Shoot photos that show windows well to highlight Inspiroom's bright lighting advantage, and brighten the editing."
                                  : "인스퍼룸의 장점인 환한 채광이 잘 보일 수 있게 창문이 잘 보이는 사진으로 촬영하고 보정도 밝게 한다."}
                              </td>
                            </tr>
                            <tr className="bg-muted/50">
                              <td className="px-4 py-3 border-r border-muted/50 font-medium text-sm text-center">
                                {language === "en" ? "Price" : "가격"}
                              </td>
                              <td className="px-4 py-3 border-r border-muted/50 text-sm">
                                {language === "en"
                                  ? "The first thing that catches the eye, and when the price is low, the effect of inducing clicks would be very large. However, since the actual price needs to be lowered, changes may negatively affect revenue."
                                  : "가장 먼저 눈길이 가는 부분이며 가격이 낮을 때 클릭을 유도하는 효과는 매우 클 것이다. 단 실제로 가격을 낮춰야 하므로 변경 시 매출에 부정적 영향을 줄 수도 있다."}
                              </td>
                              <td className="px-4 py-3 border-r border-muted/50 text-center">
                                <Badge variant="secondary" className="text-xs">
                                  {language === "en" ? "Medium" : "중"}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {language === "en"
                                  ? "Set price to 1000 won during unpopular time slots so that 1000 won is displayed in the thumbnail."
                                  : "비인기 시간대에 1000원으로 가격 설정하여 썸네일에 1000원으로 가격이 노출되게 설정"}
                              </td>
                            </tr>
                            <tr className="bg-muted/30">
                              <td className="px-4 py-3 border-r border-muted/50 font-medium text-sm text-center">
                                {language === "en" ? "Tag" : "태그"}
                              </td>
                              <td className="px-4 py-3 border-r border-muted/50 text-sm">
                                {language === "en"
                                  ? "Small in size so not very noticeable, but requires almost no resources to change and the first two can function as product information."
                                  : "크기가 작아 눈에 잘 안 띄긴 하지만 변경하는 데에 리소스가 거의 들지 않고 맨 앞 두개 정도는 상품 정보로 기능할 수 있을 것이다."}
                              </td>
                              <td className="px-4 py-3 border-r border-muted/50 text-center">
                                <Badge variant="secondary" className="text-xs">
                                  {language === "en" ? "Medium" : "중"}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                {language === "en"
                                  ? "Focus on space advantages like 'near station', 'large party room', etc."
                                  : "역세권, 대형파티룸 등의 공간 장점을 중심으로 작성"}
                              </td>
                            </tr>
                            <tr className="bg-muted/50">
                              <td className="px-4 py-3 border-r border-muted/50 font-medium text-sm text-center">
                                {language === "en" ? "Button" : "버튼"}
                              </td>
                              <td className="px-4 py-3 border-r border-muted/50 text-sm">
                                {language === "en"
                                  ? "Having buttons wouldn't be bad, but doesn't seem to have a big impact. Flash coupons cost money to execute. Direct payment is already being done."
                                  : "버튼이 있으면 나쁘지는 않겠지만 큰 영향을 주지는 않을 것 같다. 반짝쿠폰의 경우 집행하려면 비용이 든다. 바로결제는 이미 하고 있다."}
                              </td>
                              <td className="px-4 py-3 border-r border-muted/50 text-center">
                                <Badge variant="outline" className="text-xs">
                                  {language === "en" ? "Low" : "하"}
                                </Badge>
                              </td>
                              <td className="px-4 py-3 text-sm">-</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <p className="text-sm text-muted-foreground mt-4">
                        {language === "en"
                          ? "* Capacity, comments, and likes cannot be changed immediately, so they are excluded from discussion."
                          : "* 인원수와 댓글, 좋아요 수는 당장 변경할 수 없기 때문에 논의에서 제외한다."}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Results" : "결과"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base mb-4">
                        {project.stage2.results?.[language as keyof typeof project.stage2.results] ||
                          "Results not available"}
                      </p>
                      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src="/images/stage2-results-chart.svg"
                          alt="Stage 2 Results Chart"
                          width={800}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Overall Results and Lessons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Overall Results" : "전체 성과"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">
                        {project.overallResults?.[language as keyof typeof project.overallResults] ||
                          "Results not available"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Lessons Learned" : "배운 점"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">
                        {project.lessonsLearned?.[language as keyof typeof project.lessonsLearned] ||
                          "Lessons not available"}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {/* Other Projects - Original Structure */}
            {slug !== "funnel_analysis" && (
              <>
                {/* Different image placement based on project */}
                {(slug === "b2b-blog" || slug === "ai-chatbot") && project.images && project.images.length > 0 && (
                  <div className="grid gap-4 mb-8">
                    {project.images.map((image, index) => (
                      <div key={index} className="aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title?.[language as keyof typeof project.title] || "Project"} - Image ${index + 1}`}
                          width={800}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>{sectionTitles.problemDefinition}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base mb-4">
                      {project.problemDefinition?.[language as keyof typeof project.problemDefinition] ||
                        "Problem definition not available"}
                    </p>
                    {/* Add the opportunity flow graphic for ai-chatbot project */}
                    {slug === "ai-chatbot" && (
                      <div className="mt-6 p-6 bg-muted/20 rounded-lg">
                        <div className="space-y-8">
                          {/* Successful Scenario */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-green-700 dark:text-green-400">
                              {language === "en" ? "✓ Successful Response Scenario" : "✓ 성공적인 응대 시나리오"}
                            </h4>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                                  {language === "en" ? "Space in Use" : "공간 이용 중"}
                                </div>
                                <div className="text-gray-400">→</div>
                                <div className="bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                                  {language === "en" ? "Extension Inquiry" : "시간 연장 문의"}
                                </div>
                                <div className="text-gray-400">→</div>
                                <div className="bg-green-100 dark:bg-green-900 px-3 py-2 rounded-lg text-sm font-medium">
                                  {language === "en" ? "Quick Response" : "신속 응대"}
                                </div>
                                <div className="text-gray-400">→</div>
                                <div className="bg-green-200 dark:bg-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                                  {language === "en" ? "Additional Revenue" : "추가 수입 전환"}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Failed Scenario */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-red-700 dark:text-red-400">
                              {language === "en" ? "✗ Missed Opportunity Scenario" : "✗ 기회 놓침 시나리오"}
                            </h4>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                                  {language === "en" ? "Space in Use" : "공간 이용 중"}
                                </div>
                                <div className="text-gray-400">→</div>
                                <div className="bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                                  {language === "en" ? "Extension Inquiry" : "시간 연장 문의"}
                                </div>
                                <div className="text-gray-400">→</div>
                                <div className="bg-red-100 dark:bg-red-900 px-3 py-2 rounded-lg text-sm font-medium">
                                  {language === "en" ? "Delayed Response" : "응대 늦어짐"}
                                </div>
                                <div className="text-gray-400">→</div>
                                <div className="bg-red-100 dark:bg-red-800 px-3 py-2 rounded-lg text-sm font-medium">
                                  {language === "en" ? "Time Expires" : "이용시간 종료"}
                                </div>
                                <div className="text-gray-400">→</div>
                                <div className="bg-red-200 dark:bg-red-800 px-3 py-2 rounded-lg text-sm font-medium">
                                  {language === "en" ? "Missed Revenue" : "추가 수입 기회 놓침"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Only show hypothesis for projects that have it and are not b2b-blog */}
                {project.hypothesis && slug !== "b2b-blog" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Hypothesis" : "가설"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">
                        {project.hypothesis[language as keyof typeof project.hypothesis] || "Hypothesis not available"}
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>{sectionTitles.solution}</CardTitle>
                  </CardHeader>
                  {slug === "b2b-blog" ? (
                    <CardContent>
                      <p className="text-base mb-6">
                        {language === "en"
                          ? "The design process involved comprehensive information architecture planning and wireframe development to ensure optimal user experience for both content consumers and administrators."
                          : "설계 과정에서는 콘텐츠 소비자와 관리자 모두에게 최적의 사용자 경험을 보장하기 위해 포괄적인 정보 구조 계획과 와이어프레임 개발이 포함되었습니다."}
                      </p>

                      <div className="space-y-6 mb-6">
                        <div className="w-full overflow-hidden rounded-lg border">
                          <iframe
                            style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                            width="100%"
                            height="450"
                            src="https://embed.figma.com/board/UYZjY43ERZUQujqeovuI4R/-%EC%8B%9C%EC%A6%8C16--%EC%8A%A4%EB%B2%A0-CMS-IA--Copy-?node-id=0-1&embed-host=share"
                            allowFullScreen
                          />
                        </div>

                        <div className="w-full overflow-hidden rounded-lg border">
                          <iframe
                            style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                            width="100%"
                            height="450"
                            src="https://embed.figma.com/design/qd3dbG2DLGFAP2m8NchWDp/Spacebase-CMS-Wireframe?node-id=0-1&embed-host=share"
                            allowFullScreen
                          />
                        </div>
                      </div>

                      <div className="text-base whitespace-pre-line">
                        {project.solution?.[language as keyof typeof project.solution] || "Solution not available"}
                      </div>
                      {slug === "ai-chatbot" && (
                        <div className="mt-8 p-6 bg-muted/20 rounded-lg">
                          <div className="space-y-8">
                            {/* Successful Scenario */}
                            <div className="space-y-4">
                              <h4 className="font-semibold text-green-700 dark:text-green-400">
                                {language === "en" ? "✓ Successful Response Scenario" : "✓ 성공적인 응대 시나리오"}
                              </h4>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                                    {language === "en" ? "Space in Use" : "공간 이용 중"}
                                  </div>
                                  <div className="text-gray-400">→</div>
                                  <div className="bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                                    {language === "en" ? "Extension Inquiry" : "시간 연장 문의"}
                                  </div>
                                  <div className="text-gray-400">→</div>
                                  <div className="bg-green-100 dark:bg-green-900 px-3 py-2 rounded-lg text-sm font-medium">
                                    {language === "en" ? "Quick Response" : "신속 응대"}
                                  </div>
                                  <div className="text-gray-400">→</div>
                                  <div className="bg-green-200 dark:bg-green-800 px-3 py-2 rounded-lg text-sm font-medium">
                                    {language === "en" ? "Additional Revenue" : "추가 수입 전환"}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Failed Scenario */}
                            <div className="space-y-4">
                              <h4 className="font-semibold text-red-700 dark:text-red-400">
                                {language === "en" ? "✗ Missed Opportunity Scenario" : "✗ 기회 놓침 시나리오"}
                              </h4>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                                    {language === "en" ? "Space in Use" : "공간 이용 중"}
                                  </div>
                                  <div className="text-gray-400">→</div>
                                  <div className="bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                                    {language === "en" ? "Extension Inquiry" : "시간 연장 문의"}
                                  </div>
                                  <div className="text-gray-400">→</div>
                                  <div className="bg-red-100 dark:bg-red-900 px-3 py-2 rounded-lg text-sm font-medium">
                                    {language === "en" ? "Delayed Response" : "응대 늦어짐"}
                                  </div>
                                  <div className="text-gray-400">→</div>
                                  <div className="bg-red-100 dark:bg-red-800 px-3 py-2 rounded-lg text-sm font-medium">
                                    {language === "en" ? "Time Expires" : "이용시간 종료"}
                                  </div>
                                  <div className="text-gray-400">→</div>
                                  <div className="bg-red-200 dark:bg-red-800 px-3 py-2 rounded-lg text-sm font-medium">
                                    {language === "en" ? "Missed Revenue" : "추가 수입 기회 놓침"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {slug === "ai-chatbot" && (
                        <div className="mt-8 p-6 bg-muted/20 rounded-lg">
                          <h4 className="font-semibold text-lg mb-6 text-center">
                            {language === "en" ? "Additional Booking Process Comparison" : "추가예약 프로세스 비교"}
                          </h4>

                          <div className="space-y-8">
                            {/* Before Process */}
                            <div className="space-y-4">
                              <h5 className="font-semibold text-red-700 dark:text-red-400">
                                {language === "en" ? "Before: Manual Process" : "기존 추가예약 과정"}
                              </h5>
                              <div className="flex flex-col space-y-3">
                                <div className="flex items-center space-x-3">
                                  <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium text-center min-w-[120px]">
                                    {language === "en" ? "Additional Booking Inquiry" : "추가예약 문의 인입"}
                                  </div>
                                  <div className="text-gray-400">↓</div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium text-center min-w-[120px]">
                                    {language === "en"
                                      ? "Admin Checks Availability"
                                      : "관리자가 추가예약 가능한지 확인"}
                                  </div>
                                  <div className="text-gray-400">↓</div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium text-center min-w-[120px]">
                                    {language === "en" ? "Manual Fee Calculation" : "추가금 수작업으로 계산"}
                                  </div>
                                  <div className="text-gray-400">↓</div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium text-center min-w-[120px]">
                                    {language === "en" ? "Send Account Info & Fee" : "계좌번호와 함께 추가금 안내"}
                                  </div>
                                  <div className="text-gray-400">↓</div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium text-center min-w-[120px]">
                                    {language === "en" ? "Customer Payment" : "예약자가 입금"}
                                  </div>
                                  <div className="text-gray-400">↓</div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium text-center min-w-[120px]">
                                    {language === "en" ? "Payment Confirmation" : "입금확인"}
                                  </div>
                                  <div className="text-gray-400">↓</div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg text-sm font-medium text-center min-w-[120px]">
                                    {language === "en" ? "Manual System Update" : "시스템에 해당 시간대 마감처리"}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* After Process */}
                            <div className="space-y-4">
                              <h5 className="font-semibold text-green-700 dark:text-green-400">
                                {language === "en" ? "After: Automated Process" : "변경된 추가예약 과정"}
                              </h5>
                              <div className="flex flex-col space-y-3">
                                <div className="flex items-center space-x-3">
                                  <div className="bg-blue-100 dark:bg-blue-800 px-3 py-2 rounded-lg text-sm font-medium text-center min-w-[120px]">
                                    {language === "en"
                                      ? "Customer Checks Calendar"
                                      : "예약자가 직접 캘린더에서 추가예약 가능한지 여부 확인"}
                                  </div>
                                  <div className="text-gray-400">↓</div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="bg-green-100 dark:bg-green-800 px-3 py-2 rounded-lg text-sm font-medium text-center min-w-[120px]">
                                    {language === "en"
                                      ? "AI Calculates Fee & Creates Payment Request"
                                      : "AI가 추가금 계산해서 입금요청창 생성"}
                                  </div>
                                  <div className="text-gray-400">↓</div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="bg-blue-100 dark:bg-blue-800 px-3 py-2 rounded-lg text-sm font-medium text-center min-w-[120px]">
                                    {language === "en" ? "Customer Payment" : "예약자가 입금"}
                                  </div>
                                  <div className="text-gray-400">↓</div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="bg-green-100 dark:bg-green-800 px-3 py-2 rounded-lg text-sm font-medium text-center min-w-[120px]">
                                    {language === "en" ? "Automatic System Update" : "시스템 자동 처리"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  ) : (
                    <CardContent>
                      <div className="text-base whitespace-pre-line">
                        {project.solution?.[language as keyof typeof project.solution] || "Solution not available"}
                      </div>
                    </CardContent>
                  )}
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Results" : "성과"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">
                        {project.results?.[language as keyof typeof project.results] || "Results not available"}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Lessons Learned" : "배운 점"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base">
                        {project.lessonsLearned?.[language as keyof typeof project.lessonsLearned] ||
                          "Lessons not available"}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
