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
      en: "Improved weekly bookings from 1-2 to over 6 by iterating on solutions derived from customer funnel analysis for Inspiroom space rental business.",
      ko: "데이터 기반 마케팅 실험을 통해 매출을 1133% 증대시켰습니다.",
    },
    period: {
      en: "Aug 2024 - Nov 2024",
      ko: "2024년 8월 - 2024년 11월",
    },
    stage1: {
      problemDefinition: {
        en: "Through advertising, traffic (exposure) increased, but there was no change in actual bookings. This suggests that while the top-of-funnel 'exposure' stage was improved, bottlenecks occurred in the middle stage 'clicks' or bottom stage 'bookings'.",
        ko: "광고를 통해 트래픽(노출)은 증가했지만, 실제 예약 수에는 변화가 없었습니다. 이는 퍼널 상단에 해당하는 '노출' 단계는 개선되었으나, 중간 단계인 '클릭' 혹은 하단 단계인 '예약'에서 병목 현상이 발생하고 있음을 시사합니다.",
      },
      hypothesis: {
        en: "If exposure increases through advertising, bookings will also increase.",
        ko: "광고를 통해 노출이 증가하면 예약수도 증가할 것이다.",
      },
      solution: {
        en: "Started online advertising campaigns to increase daily exposure from 5,000 to over 14,000, significantly boosting our visibility on the platform.",
        ko: "온라인 광고 캠페인을 시작하여 일일 노출 수를 5,000회에서 14,000회 이상으로 증가시켜 플랫폼에서의 가시성을 크게 높였습니다.",
      },
      results: {
        en: "Exposure increased significantly, but bookings did not increase → This raised the possibility of issues with click-through rates or thumbnail strategy.",
        ko: "노출은 증가했지만 예약수는 증가하지 않음 → 클릭률 혹은 썸네일 전략의 문제일 가능성 제기.",
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
        ko: "노출이 증가했음에도 불구하고 예약률은 여전히 낮았습니다. 분석 결과, 사용자들이 우리 리스팅을 클릭하지 않고 있었으며, 이는 관심을 끌지 못하는 매력적이지 않은 썸네일 때문인 것으로 판단되었습니다.",
      },
      hypothesis: {
        en: "If we use thumbnails that users want to click, both click-through rates and bookings will increase together.",
        ko: "클릭하고 싶은 썸네일을 사용하면 클릭률과 예약수가 함께 증가할 것이다.",
      },
      solution: {
        en: "Thumbnail Strategy Improvement: 1) Re-photographed thumbnails to create visually appealing images, 2) Added '1,000 KRW for early morning hours' text to thumbnails to emphasize price attractiveness. This strategy provided incentives for users to click, significantly improving CTR (click-through rate).",
        ko: "썸네일 전략 개선: 1) 썸네일 사진을 다시 촬영하여 시각적으로 매력적인 이미지 구성, 2) 썸네일에 '새벽시간대 1000원'이라는 문구를 넣어 가격 매력을 강조. 이러한 전략은 클릭하고 싶은 유인을 제공함으로써 CTR(클릭률)을 유의미하게 향상시켰습니다.",
      },
      results: {
        en: "After thumbnail improvements, click-through rates increased and bookings also increased significantly. Features: Both CTR and bookings showed meaningful growth together.",
        ko: "썸네일 개선 이후 클릭률이 상승했고, 예약 수 역시 유의미하게 증가함. 특징: 클릭률과 예약 수가 함께 의미있는 성장을 보임.",
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
      ko: "이러한 2단계 접근법을 통해 주 평균 예약 수를 1-2건에서 6건 이상으로 개선했습니다. 노출부터 클릭, 전환까지 각 퍼널 단계의 체계적인 분석을 통해 특정 병목 지점을 식별하고 해결할 수 있었으며, 이는 지속 가능한 매출 성장으로 이어졌습니다.",
    },
    lessonsLearned: {
      en: "1) Simply increasing traffic alone makes it difficult to expect substantial results (increased bookings). 2) Click-inducing elements in content (thumbnails) can be key factors for performance improvement. 3) Reflecting elements that users want to click can have a positive impact down to the bottom of the funnel. 4) Setting separate hypotheses and measurement metrics for each funnel stage is important for establishing effective improvement strategies.",
      ko: "1) 단순히 트래픽만 증가시켜서는 실질적인 성과(예약수 증가)를 기대하기 어렵다. 2) 콘텐츠(썸네일)의 클릭 유도 요소가 성과 개선의 핵심 요인이 될 수 있다. 3) 사용자 입장에서 클릭하고 싶은 요소를 반영하는 것이 퍼널 하단까지 긍정적인 영향을 미칠 수 있다. 4) 퍼널 각 단계에 대해 별도의 가설과 측정 지표를 설정하는 것이 효과적인 개선 전략 수립에 중요하다.",
    },
    technologies: [
      "SpaceCloud Dashboard",
      "Online Advertising",
      "A/B Testing",
      "Photography",
      "Pricing Strategy",
      "Data Analysis",
    ],
    images: [
      "/images/stage1-exposure-vs-bookings-chart.png",
      "/images/stage2-ctr-bookings-chart.png",
      "/images/thumbnail-before-after.png",
    ],
    relatedLinks: [
      {
        title: "Inspiroom 스페이스클라우드 바로가기",
        url: "https://www.spacecloud.kr/space/64161",
      },
    ],
  },
  "marketing-dashboard": {
    title: {
      en: "Corporate Blog Planning",
      ko: "기업 블로그 기획",
    },
    description: {
      en: "Planned and designed a corporate blog for SpaceBase to establish brand rapport and enable sustainable content management without development resources.",
      ko: "스페이스베이스의 브랜드 라포 형성을 위한 기업 블로그를 기획하고, 개발 리소스 없이 지속 가능한 콘텐츠 운영이 가능하도록 설계했습니다.",
    },
    period: {
      en: "Jan 2024 - May 2025",
      ko: "2024년 1월 - 2025년 5월",
    },
    problemDefinition: {
      en: "SpaceBase recognized the need for corporate blog operation but lacked production capacity. They expected the blog to serve as a starting point for brand rapport formation, being more approachable than formal corporate introduction meetings.",
      ko: "스페이스베이스는 기업 블로그 운영의 필요성을 인식하고 있었지만, 제작 여력이 부족한 상태였습니다. 기업 소개 미팅은 부담스럽지만, 블로그는 가볍게 접근 가능하다는 점에서 블로그가 브랜드 라포 형성의 출발점이 되기를 기대했습니다.",
    },
    hypothesis: {
      en: "By creating a user-friendly blog structure that balances client preferences with brand consistency, we can establish an effective brand communication channel that requires minimal maintenance.",
      ko: "클라이언트의 화려한 UI 선호와 기존 브랜드 무드 유지 간 균형 고려한 사용자 친화적 블로그 구조를 만들면, 최소한의 유지보수로 효과적인 브랜드 커뮤니케이션 채널을 구축할 수 있을 것입니다.",
    },
    solution: {
      en: "① Information Architecture & Wireframe Design: Balanced client's preference for flashy UI with existing brand mood maintenance. Designed GNB to connect to existing site to avoid duplication with Contact and About pages. ② Framer CMS Implementation: Set up Framer CMS to enable content publishing without coding. Configured user-centric structure considering content publishing/editing/distribution from operator's perspective.",
      ko: "① 정보구조(IA) 및 와이어프레임 설계: 클라이언트의 화려한 UI 선호와 기존 브랜드 무드 유지 간 균형 고려. 기존 홈페이지의 Contact 및 About 페이지와의 중복을 방지하기 위해 GNB에서 기존 사이트로 연결되도록 설계. ② 프레이머 CMS 활용: 프레이머 CMS를 통해 코딩 없이 콘텐츠 발행 가능하도록 세팅. 실제 운영자 관점에서 콘텐츠 발행/수정/배포 과정을 고려해 사용자 중심 구성.",
    },
    results: {
      en: "Launched a complete website without development resources. Secured sustainability and independence for clients to directly manage content. Visual materials (wireframes) facilitated internal decision-making processes and enhanced planning clarity and persuasiveness.",
      ko: "개발 리소스 없이 완성도 있는 웹사이트를 런칭했습니다. 클라이언트가 직접 콘텐츠를 운영할 수 있는 지속 가능성과 자립성을 확보했습니다. 시각 자료(와이어프레임)를 통해 내부 의사결정 과정이 원활해졌고, 기획의 명확성과 설득력을 강화했습니다.",
    },
    lessonsLearned: {
      en: "UX should consider not only website users but also administrators. Clear and concise documentation is necessary for communicating with internal and external stakeholders, beyond just good verbal communication.",
      ko: "UX는 웹사이트를 이용하는 사람뿐 아니라 관리하는 사람도 고려해야 합니다. 내외부 이해관계자와 소통하기 위해서는 말을 잘하는 것도 중요하지만, 명확하고 간결한 문서화가 필요합니다.",
    },
    technologies: ["Framer CMS", "Information Architecture", "Wireframing", "UX Design", "Content Strategy"],
    images: [
      "/placeholder.svg?height=400&width=800&text=Blog+Information+Architecture",
      "/placeholder.svg?height=400&width=800&text=Wireframe+Design+Process",
      "/placeholder.svg?height=400&width=800&text=Framer+CMS+Setup",
    ],
    relatedLinks: [
      {
        title: "ANTIEGG 웹사이트",
        url: "https://antiegg.kr",
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
    technologies: ["GA4", "A/B Testing", "Web Analytics", "Conversion Optimization", "UX Design"],
    images: [
      "/placeholder.svg?height=400&width=800&text=GA4+User+Behavior+Analysis",
      "/placeholder.svg?height=400&width=800&text=Banner+Design+Variations",
      "/placeholder.svg?height=400&width=800&text=CTR+Improvement+Results",
    ],
    relatedLinks: [
      {
        title: "ANTIEGG 웹사이트",
        url: "https://antiegg.kr",
      },
    ],
  },
  "ai-chatbot": {
    title: {
      en: "INSPIROOM AI Chatbot Development",
      ko: "INSPIROOM AI 챗봇 개발",
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
      en: "By automating responses to frequently asked questions and streamlining the additional booking process, we can reduce operational burden while capturing missed revenue opportunities.",
      ko: "자주 묻는 질문에 대한 응답을 자동화하고 추가예약 프로세스를 간소화하면, 운영 부담을 줄이면서 놓치고 있던 매출 기회를 포착할 수 있을 것입니다.",
    },
    solution: {
      en: "① AI Chatbot Auto-Response: Converted frequently asked questions to automatic responses. Continuously improved and tuned response content to prevent inappropriate answers. Successfully enabled chatbot to handle over 60% of total inquiries. ② Additional Booking Process Automation: Previous: Manual SpaceCloud checking and price calculation when users inquired about additional bookings. Improved: Chatbot directly provides remaining time check links and price tables → customers can judge booking availability themselves and make payments.",
      ko: "① AI 챗봇 자동 응답 구축: 자주 묻는 질문을 자동 응답으로 전환. 챗봇이 이상한 답변을 하지 않도록 지속적으로 응답 내용을 개선 및 튜닝. 결과적으로 전체 문의 중 60% 이상을 챗봇이 대응 가능하게 구현. ② 추가예약 프로세스 자동화: 기존에는 사용자가 추가예약 문의 시 수동으로 스페이스클라우드 확인 및 가격 계산 후 답변했으나, 개선 후에는 챗봇이 직접 잔여 시간 확인 링크 및 가격 테이블을 안내하여 고객이 스스로 예약 가능 여부를 판단 후 입금할 수 있도록 구현.",
    },
    results: {
      en: "Revenue from additional bookings increased 2.1 times compared to before chatbot implementation. Operators were freed from repetitive tasks, and users received immediate responses, leading to increased satisfaction.",
      ko: "챗봇 도입 전보다 추가예약으로 인한 수익이 2.1배 증가했습니다. 운영자는 반복 업무에서 해방되었고, 사용자는 즉시 대응받으며 만족도가 상승했습니다.",
    },
    lessonsLearned: {
      en: "Automation can be a tool to capture missed opportunities. Chatbots are also subjects of user experience design, requiring design that considers user flow and emotions rather than just mechanical accuracy. What customers truly want may not always align with conventional UX/UI wisdom.",
      ko: "자동화는 놓치고 있던 기회를 포착하는 도구가 될 수 있습니다. 챗봇도 일종의 사용자 경험 설계 대상이며, 기계적 정확성보다 사용자 흐름과 감정을 고려한 설계가 필요합니다. 고객이 진정으로 원하는 것이 일반적인 UX/UI의 상식과 일치하지 않을 수도 있습니다.",
    },
    technologies: [
      "AI Chatbot",
      "Natural Language Processing",
      "Process Automation",
      "Customer Service",
      "Revenue Optimization",
    ],
    images: [
      "/placeholder.svg?height=400&width=800&text=AI+Chatbot+Interface+Design",
      "/placeholder.svg?height=400&width=800&text=Automated+Booking+Process+Flow",
      "/placeholder.svg?height=400&width=800&text=Revenue+Increase+Analytics",
    ],
    relatedLinks: [
      {
        title: "Inspiroom 네이버 플레이스",
        url: "https://naver.me/xX70GlkZ",
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
              {project.title[language as keyof typeof project.title]}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {project.description[language as keyof typeof project.description]}
            </p>
            <div className="flex items-center text-muted-foreground mb-6">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{project.period[language as keyof typeof project.period]}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
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
            {slug === "funnel_analysis" && (
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
                      <p>
                        {project.stage1.problemDefinition[language as keyof typeof project.stage1.problemDefinition]}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Hypothesis" : "가설"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        {project.stage1.hypothesis[language as keyof typeof project.stage1.hypothesis]}
                      </p>

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
                                {project.stage1.metrics.input[language as keyof typeof project.stage1.metrics.input]}
                              </td>
                              <td className="px-4 py-3 rounded-br-lg">
                                {project.stage1.metrics.output[language as keyof typeof project.stage1.metrics.output]}
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
                      <p>{project.stage1.solution[language as keyof typeof project.stage1.solution]}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Results" : "결과"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{project.stage1.results[language as keyof typeof project.stage1.results]}</p>
                      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src="/images/stage1-exposure-vs-bookings-chart.png"
                          alt="Stage 1 Results - Exposure vs Bookings Chart"
                          width={800}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {language === "en"
                          ? "Graph showing exposure increasing from 5,000 to 14,200 over 7 days (July 1-7) while bookings remained flat at 50-55 level"
                          : "7월 1일-7일 동안 노출이 5,000에서 14,200으로 증가했지만 예약수는 50-55 수준에서 평평하게 유지된 그래프"}
                      </p>
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
                      <p>
                        {project.stage2.problemDefinition[language as keyof typeof project.stage2.problemDefinition]}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Hypothesis" : "가설"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        {project.stage2.hypothesis[language as keyof typeof project.stage2.hypothesis]}
                      </p>

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
                                {project.stage2.metrics.input[language as keyof typeof project.stage2.metrics.input]}
                              </td>
                              <td className="px-4 py-3 rounded-br-lg">
                                {project.stage2.metrics.output[language as keyof typeof project.stage2.metrics.output]}
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
                      <p className="mb-4">
                        {project.stage2.solution[language as keyof typeof project.stage2.solution]}
                      </p>
                      <div className="aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                          src="/images/thumbnail-before-after.png"
                          alt="Thumbnail Before After Comparison"
                          width={800}
                          height={400}
                          className="w-full object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Results" : "결과"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{project.stage2.results[language as keyof typeof project.stage2.results]}</p>
                      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src="/images/stage2-ctr-bookings-chart.png"
                          alt="Stage 2 CTR and Bookings Results Chart"
                          width={800}
                          height={400}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {language === "en"
                          ? "Graph showing CTR increasing from 1.5% to 3.9% and bookings increasing from 52 to 95 over 7 days (July 8-14)"
                          : "7월 8일-14일 동안 클릭률이 1.5%에서 3.9%로, 예약수가 52건에서 95건으로 증가한 그래프"}
                      </p>
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
                      <p>{project.overallResults[language as keyof typeof project.overallResults]}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Lessons Learned" : "배운 점"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{project.lessonsLearned[language as keyof typeof project.lessonsLearned]}</p>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            {/* Other Projects - Original Structure */}
            {slug !== "funnel_analysis" && (
              <>
                {/* Different image placement based on project */}
                {slug === "marketing-dashboard" && (
                  <div className="grid gap-4 mb-8">
                    {project.images.map((image, index) => (
                      <div key={index} className="aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title[language as keyof typeof project.title]} - Image ${index + 1}`}
                          width={800}
                          height={400}
                          className="w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>{language === "en" ? "Problem Definition" : "문제 정의"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{project.problemDefinition[language as keyof typeof project.problemDefinition]}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{language === "en" ? "Hypothesis" : "가설"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{project.hypothesis[language as keyof typeof project.hypothesis]}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{language === "en" ? "Solution" : "실행 과정"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{project.solution[language as keyof typeof project.solution]}</p>
                  </CardContent>
                </Card>

                {(slug === "ecommerce-redesign" || slug === "ai-chatbot") && (
                  <div className="grid gap-4 my-8">
                    {project.images.map((image, index) => (
                      <div key={index} className="aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${project.title[language as keyof typeof project.title]} - Image ${index + 1}`}
                          width={800}
                          height={400}
                          className="w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Results" : "성과"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{project.results[language as keyof typeof project.results]}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{language === "en" ? "Lessons Learned" : "배운 점"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{project.lessonsLearned[language as keyof typeof project.lessonsLearned]}</p>
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
