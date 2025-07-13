"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Blog posts data (simulating CMS)
const blogPosts = {
  1: {
    title: {
      en: "The Future of AI in Marketing",
      ko: "마케팅에서의 AI의 미래",
    },
    content: {
      en: `
        <h2>Introduction</h2>
        <p>Artificial Intelligence is revolutionizing the marketing landscape in unprecedented ways. From personalized customer experiences to predictive analytics, AI is enabling marketers to make data-driven decisions that drive better results.</p>
        
        <h2>Key Applications of AI in Marketing</h2>
        <p>AI is being applied across various marketing functions:</p>
        <ul>
          <li><strong>Personalization:</strong> AI algorithms analyze customer behavior to deliver personalized content and recommendations.</li>
          <li><strong>Predictive Analytics:</strong> Machine learning models predict customer lifetime value, churn probability, and optimal pricing strategies.</li>
          <li><strong>Chatbots and Customer Service:</strong> AI-powered chatbots provide 24/7 customer support and lead qualification.</li>
          <li><strong>Content Generation:</strong> AI tools assist in creating marketing copy, social media posts, and even video content.</li>
        </ul>
        
        <h2>The Impact on Marketing Teams</h2>
        <p>As AI becomes more prevalent, marketing teams are evolving their skill sets and workflows. The most successful teams are those that embrace AI as a tool to augment human creativity and strategic thinking, rather than replace it.</p>
        
        <h2>Looking Ahead</h2>
        <p>The future of AI in marketing is bright, with emerging technologies like generative AI, advanced natural language processing, and computer vision opening new possibilities for customer engagement and brand storytelling.</p>
      `,
      ko: `
        <h2>소개</h2>
        <p>인공지능은 전례 없는 방식으로 마케팅 환경을 혁신하고 있습니다. 개인화된 고객 경험부터 예측 분석까지, AI는 마케터들이 더 나은 결과를 이끌어내는 데이터 기반 의사결정을 할 수 있게 해줍니다.</p>
        
        <h2>마케팅에서 AI의 주요 응용</h2>
        <p>AI는 다양한 마케팅 기능에 적용되고 있습니다:</p>
        <ul>
          <li><strong>개인화:</strong> AI 알고리즘이 고객 행동을 분석하여 개인화된 콘텐츠와 추천을 제공합니다.</li>
          <li><strong>예측 분석:</strong> 머신러닝 모델이 고객 생애 가치, 이탈 확률, 최적 가격 전략을 예측합니다.</li>
          <li><strong>챗봇과 고객 서비스:</strong> AI 기반 챗봇이 24/7 고객 지원과 리드 자격 심사를 제공합니다.</li>
          <li><strong>콘텐츠 생성:</strong> AI 도구가 마케팅 카피, 소셜 미디어 게시물, 심지어 비디오 콘텐츠 제작을 지원합니다.</li>
        </ul>
        
        <h2>마케팅 팀에 미치는 영향</h2>
        <p>AI가 더욱 보편화됨에 따라 마케팅 팀들은 기술과 워크플로우를 발전시키고 있습니다. 가장 성공적인 팀들은 AI를 인간의 창의성과 전략적 사고를 대체하는 것이 아니라 보완하는 도구로 받아들이는 팀들입니다.</p>
        
        <h2>미래 전망</h2>
        <p>마케팅에서 AI의 미래는 밝으며, 생성형 AI, 고급 자연어 처리, 컴퓨터 비전과 같은 신기술들이 고객 참여와 브랜드 스토리텔링의 새로운 가능성을 열어주고 있습니다.</p>
      `,
    },
    date: "2025-06-15",
    readTime: 5,
    tags: ["Marketing", "AI", "Technology"],
    image: "/placeholder.svg?height=400&width=800&text=AI+Marketing+Future",
    author: "Hyunseo Oh",
  },
  2: {
    title: {
      en: "Effective UX Design Principles",
      ko: "효과적인 UX 디자인 원칙",
    },
    content: {
      en: `
        <h2>Understanding User-Centered Design</h2>
        <p>User Experience (UX) design is fundamentally about creating products that provide meaningful and relevant experiences to users. This involves the design of the entire process of acquiring and integrating the product, including aspects of branding, design, usability, and function.</p>
        
        <h2>Core UX Design Principles</h2>
        <p>Effective UX design is built on several key principles:</p>
        <ul>
          <li><strong>User Research:</strong> Understanding your users through research, interviews, and testing is the foundation of good UX design.</li>
          <li><strong>Usability:</strong> Products should be easy to use, learn, and remember. Users should be able to accomplish their goals efficiently.</li>
          <li><strong>Accessibility:</strong> Design should be inclusive and accessible to users with diverse abilities and needs.</li>
          <li><strong>Consistency:</strong> Consistent design patterns and interactions help users build mental models and navigate more intuitively.</li>
        </ul>
        
        <h2>The Design Process</h2>
        <p>A structured design process typically includes research, ideation, prototyping, testing, and iteration. Each phase builds upon the previous one, creating a cycle of continuous improvement.</p>
        
        <h2>Measuring Success</h2>
        <p>UX success can be measured through various metrics including task completion rates, user satisfaction scores, and business metrics like conversion rates and customer retention.</p>
      `,
      ko: `
        <h2>사용자 중심 디자인 이해하기</h2>
        <p>사용자 경험(UX) 디자인은 근본적으로 사용자에게 의미 있고 관련성 있는 경험을 제공하는 제품을 만드는 것입니다. 이는 브랜딩, 디자인, 사용성, 기능을 포함한 제품 획득 및 통합의 전체 프로세스 디자인을 포함합니다.</p>
        
        <h2>핵심 UX 디자인 원칙</h2>
        <p>효과적인 UX 디자인은 여러 핵심 원칙을 기반으로 합니다:</p>
        <ul>
          <li><strong>사용자 연구:</strong> 연구, 인터뷰, 테스트를 통해 사용자를 이해하는 것이 좋은 UX 디자인의 기초입니다.</li>
          <li><strong>사용성:</strong> 제품은 사용하기 쉽고, 배우기 쉽고, 기억하기 쉬워야 합니다. 사용자는 효율적으로 목표를 달성할 수 있어야 합니다.</li>
          <li><strong>접근성:</strong> 디자인은 다양한 능력과 요구를 가진 사용자에게 포용적이고 접근 가능해야 합니다.</li>
          <li><strong>일관성:</strong> 일관된 디자인 패턴과 상호작용은 사용자가 멘탈 모델을 구축하고 더 직관적으로 탐색할 수 있도록 도와줍니다.</li>
        </ul>
        
        <h2>디자인 프로세스</h2>
        <p>구조화된 디자인 프로세스는 일반적으로 연구, 아이디어 발상, 프로토타이핑, 테스트, 반복을 포함합니다. 각 단계는 이전 단계를 기반으로 하여 지속적인 개선의 사이클을 만듭니다.</p>
        
        <h2>성공 측정</h2>
        <p>UX 성공은 작업 완료율, 사용자 만족도 점수, 전환율 및 고객 유지율과 같은 비즈니스 지표를 포함한 다양한 메트릭을 통해 측정할 수 있습니다.</p>
      `,
    },
    date: "2025-05-28",
    readTime: 7,
    tags: ["Design", "UX", "Product"],
    image: "/placeholder.svg?height=400&width=800&text=UX+Design+Principles",
    author: "Hyunseo Oh",
  },
  3: {
    title: {
      en: "Data-Driven Marketing Strategies",
      ko: "데이터 기반 마케팅 전략",
    },
    content: {
      en: `
        <h2>The Power of Data in Marketing</h2>
        <p>In today's digital landscape, data has become the cornerstone of successful marketing strategies. By leveraging data analytics, marketers can make informed decisions, optimize campaigns, and deliver personalized experiences that resonate with their target audience.</p>
        
        <h2>Key Data Sources for Marketing</h2>
        <p>Effective data-driven marketing relies on multiple data sources:</p>
        <ul>
          <li><strong>Website Analytics:</strong> Tools like Google Analytics provide insights into user behavior, traffic sources, and conversion paths.</li>
          <li><strong>Customer Data:</strong> CRM systems and customer databases offer valuable information about purchase history and preferences.</li>
          <li><strong>Social Media Metrics:</strong> Engagement rates, reach, and sentiment analysis from social platforms.</li>
          <li><strong>Email Marketing Data:</strong> Open rates, click-through rates, and conversion metrics from email campaigns.</li>
        </ul>
        
        <h2>Implementation Strategies</h2>
        <p>To successfully implement data-driven marketing, organizations should focus on data collection, analysis, and actionable insights. This includes setting up proper tracking, creating dashboards for real-time monitoring, and establishing KPIs that align with business objectives.</p>
        
        <h2>Measuring ROI and Success</h2>
        <p>The ultimate goal of data-driven marketing is to improve ROI and business outcomes. By continuously monitoring and optimizing campaigns based on data insights, marketers can achieve better results and demonstrate the value of their efforts.</p>
      `,
      ko: `
        <h2>마케팅에서 데이터의 힘</h2>
        <p>오늘날의 디지털 환경에서 데이터는 성공적인 마케팅 전략의 초석이 되었습니다. 데이터 분석을 활용함으로써 마케터들은 정보에 기반한 의사결정을 내리고, 캠페인을 최적화하며, 타겟 고객에게 공감을 불러일으키는 개인화된 경험을 제공할 수 있습니다.</p>
        
        <h2>마케팅을 위한 주요 데이터 소스</h2>
        <p>효과적인 데이터 기반 마케팅은 여러 데이터 소스에 의존합니다:</p>
        <ul>
          <li><strong>웹사이트 분석:</strong> Google Analytics와 같은 도구는 사용자 행동, 트래픽 소스, 전환 경로에 대한 인사이트를 제공합니다.</li>
          <li><strong>고객 데이터:</strong> CRM 시스템과 고객 데이터베이스는 구매 이력과 선호도에 대한 귀중한 정보를 제공합니다.</li>
          <li><strong>소셜 미디어 지표:</strong> 소셜 플랫폼의 참여율, 도달률, 감정 분석.</li>
          <li><strong>이메일 마케팅 데이터:</strong> 이메일 캠페인의 열람률, 클릭률, 전환 지표.</li>
        </ul>
        
        <h2>구현 전략</h2>
        <p>데이터 기반 마케팅을 성공적으로 구현하려면 조직은 데이터 수집, 분석, 실행 가능한 인사이트에 집중해야 합니다. 여기에는 적절한 추적 설정, 실시간 모니터링을 위한 대시보드 생성, 비즈니스 목표와 일치하는 KPI 설정이 포함됩니다.</p>
        
        <h2>ROI 및 성공 측정</h2>
        <p>데이터 기반 마케팅의 궁극적인 목표는 ROI와 비즈니스 성과를 개선하는 것입니다. 데이터 인사이트를 기반으로 캠페인을 지속적으로 모니터링하고 최적화함으로써 마케터들은 더 나은 결과를 달성하고 그들의 노력의 가치를 입증할 수 있습니다.</p>
      `,
    },
    date: "2025-04-10",
    readTime: 6,
    tags: ["Marketing", "Analytics", "Strategy"],
    image: "/placeholder.svg?height=400&width=800&text=Data+Marketing",
    author: "Hyunseo Oh",
  },
  4: {
    title: {
      en: "Building an Effective Portfolio",
      ko: "효과적인 포트폴리오 구축하기",
    },
    content: {
      en: `
        <h2>The Importance of a Strong Portfolio</h2>
        <p>In today's competitive job market, a well-crafted portfolio is essential for showcasing your skills, experience, and unique value proposition. Whether you're a designer, developer, marketer, or any other professional, your portfolio serves as a powerful tool to demonstrate your capabilities to potential employers or clients.</p>
        
        <h2>Key Elements of an Effective Portfolio</h2>
        <p>A successful portfolio should include:</p>
        <ul>
          <li><strong>Clear Value Proposition:</strong> Clearly communicate what you do and what makes you unique.</li>
          <li><strong>Diverse Project Showcase:</strong> Display a variety of projects that demonstrate your range of skills.</li>
          <li><strong>Case Studies:</strong> Provide detailed explanations of your process, challenges faced, and solutions implemented.</li>
          <li><strong>Results and Impact:</strong> Quantify the outcomes of your work whenever possible.</li>
          <li><strong>Professional Presentation:</strong> Ensure your portfolio is visually appealing and easy to navigate.</li>
        </ul>
        
        <h2>Digital vs. Physical Portfolios</h2>
        <p>While digital portfolios offer greater accessibility and can include interactive elements, physical portfolios can make a lasting impression in face-to-face meetings. Consider your industry and target audience when deciding on the format.</p>
        
        <h2>Keeping Your Portfolio Updated</h2>
        <p>Your portfolio should be a living document that evolves with your career. Regularly update it with new projects, skills, and achievements to ensure it accurately reflects your current capabilities and professional growth.</p>
      `,
      ko: `
        <h2>강력한 포트폴리오의 중요성</h2>
        <p>오늘날의 경쟁적인 취업 시장에서 잘 만들어진 포트폴리오는 당신의 기술, 경험, 그리고 독특한 가치 제안을 보여주는 데 필수적입니다. 디자이너, 개발자, 마케터, 또는 다른 전문가든 상관없이, 포트폴리오는 잠재적 고용주나 클라이언트에게 당신의 능력을 보여주는 강력한 도구 역할을 합니다.</p>
        
        <h2>효과적인 포트폴리오의 핵심 요소</h2>
        <p>성공적인 포트폴리오는 다음을 포함해야 합니다:</p>
        <ul>
          <li><strong>명확한 가치 제안:</strong> 당신이 무엇을 하는지, 무엇이 당신을 독특하게 만드는지 명확하게 전달하세요.</li>
          <li><strong>다양한 프로젝트 쇼케이스:</strong> 당신의 다양한 기술을 보여주는 여러 프로젝트를 전시하세요.</li>
          <li><strong>케이스 스터디:</strong> 당신의 프로세스, 직면한 도전, 구현한 솔루션에 대한 자세한 설명을 제공하세요.</li>
          <li><strong>결과와 영향:</strong> 가능할 때마다 당신의 작업 결과를 정량화하세요.</li>
          <li><strong>전문적인 프레젠테이션:</strong> 포트폴리오가 시각적으로 매력적이고 탐색하기 쉽도록 하세요.</li>
        </ul>
        
        <h2>디지털 vs. 물리적 포트폴리오</h2>
        <p>디지털 포트폴리오는 더 큰 접근성을 제공하고 인터랙티브 요소를 포함할 수 있지만, 물리적 포트폴리오는 대면 미팅에서 지속적인 인상을 남길 수 있습니다. 형식을 결정할 때 당신의 업계와 타겟 고객을 고려하세요.</p>
        
        <h2>포트폴리오 업데이트 유지하기</h2>
        <p>포트폴리오는 당신의 경력과 함께 발전하는 살아있는 문서여야 합니다. 새로운 프로젝트, 기술, 성취로 정기적으로 업데이트하여 현재의 능력과 전문적 성장을 정확하게 반영하도록 하세요.</p>
      `,
    },
    date: "2025-03-05",
    readTime: 4,
    tags: ["Career", "Portfolio", "Design"],
    image: "/placeholder.svg?height=400&width=800&text=Portfolio+Building",
    author: "Hyunseo Oh",
  },
}

export default function BlogPost() {
  const params = useParams()
  const id = Number.parseInt(params.id as string)
  const [language, setLanguage] = useState("en")

  const post = blogPosts[id as keyof typeof blogPosts]

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container px-4 md:px-6 py-8">
        <Link href="/#blog">
          <Button variant="outline" className="mb-8 bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === "en" ? "Back to Blog" : "블로그로 돌아가기"}
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title[language as keyof typeof post.title]}
                width={800}
                height={400}
                className="w-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title[language as keyof typeof post.title]}</h1>

            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString(language === "en" ? "en-US" : "ko-KR")}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>
                  {post.readTime} {language === "en" ? "min read" : "분 소요"}
                </span>
              </div>
            </div>
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: post.content[language as keyof typeof post.content],
            }}
          />
        </article>
      </div>
    </div>
  )
}
