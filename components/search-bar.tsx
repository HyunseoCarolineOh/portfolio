"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  language: string
  onSearch: (query: string) => void
}

const searchTags = [
  "Marketing",
  "Product Management",
  "Data Analysis",
  "UX Design",
  "Performance Marketing",
  "AI Chatbot",
  "Dashboard Development",
  "A/B Testing",
  "SEO",
  "Figma",
  "Python",
  "MySQL",
  "GA4",
  "Looker Studio",
  "Startup",
  "Business Development",
  "Visual Design",
  "Project Management",
]

export function SearchBar({ language, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchTags.filter((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    onSearch(searchQuery)
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={language === "en" ? "Search skills, experience..." : "기술, 경험 검색..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="p-2 space-y-1">
            {suggestions.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSearch(tag)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-sm transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && (
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            {language === "en" ? "Searching for:" : "검색 중:"} "{query}"
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent" onClick={clearSearch}>
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        </div>
      )}
    </div>
  )
}
