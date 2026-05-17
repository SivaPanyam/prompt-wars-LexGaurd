import React, { useState, useMemo } from "react"
import { Badge } from "./ui/Badge"
import { Card } from "./ui/Card"
import { ArrowRight, CheckCircle2, ShieldAlert, TrendingDown, HelpCircle, MessageSquare } from "lucide-react"

// Helper to generate mock diffs based on the live report
function generateMockDiff(originalClauses) {
  if (!originalClauses || originalClauses.length === 0) return []

  return originalClauses.map((clause, index) => {
    // We will artificially modify the first "high" or "critical" clause to show a diff, 
    // or just the second clause if none exist.
    const isTarget = clause.risk_assessment?.severity === 'critical' || 
                     clause.risk_assessment?.severity === 'high' || 
                     index === 1

    if (isTarget && clause.original_text) {
      // Create a mock deletion and addition
      const words = clause.original_text.split(" ")
      const mid = Math.floor(words.length / 2)
      
      const originalSnippet = words.slice(mid, mid + 5).join(" ")
      const revisedSnippet = "strictly capped at $10,000"

      return {
        ...clause,
        hasChanged: true,
        originalDiff: clause.original_text.replace(originalSnippet, `<span class="bg-error/20 text-error line-through px-1 rounded">${originalSnippet}</span>`),
        revisedDiff: clause.original_text.replace(originalSnippet, `<span class="bg-green-500/20 text-green-700 dark:text-green-400 font-medium px-1 rounded">${revisedSnippet}</span>`),
        insight: {
          title: "Liability Cap Introduced",
          description: "Counter-party inserted a hard cap on liability damages.",
          recommendation: "Reject. The cap of $10,000 is grossly disproportionate to the contract value. Counter with a cap equal to 12 months fees.",
          acceptAction: "Accept Risk",
          rejectAction: "Reject Redline"
        }
      }
    }

    return {
      ...clause,
      hasChanged: false,
      originalDiff: clause.original_text,
      revisedDiff: clause.original_text
    }
  })
}

export default function CompareVersions({ originalClauses }) {
  const [selectedChangeId, setSelectedChangeId] = useState(null)
  
  const diffedClauses = useMemo(() => generateMockDiff(originalClauses), [originalClauses])
  const changedCount = diffedClauses.filter(c => c.hasChanged).length
  
  const activeChange = diffedClauses.find(c => c.id === selectedChangeId)

  return (
    <div className="flex flex-col h-full space-y-4 font-sans animate-in fade-in duration-300">
      
      {/* KPI Header */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-surface-container rounded-lg p-4 border border-outline-variant flex items-center justify-between">
          <div>
            <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Similarity Score</p>
            <p className="text-2xl font-bold text-on-surface">94.2%</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-green-500 opacity-50" />
        </div>
        <div className="bg-surface-container rounded-lg p-4 border border-outline-variant flex items-center justify-between">
          <div>
            <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Clauses Changed</p>
            <p className="text-2xl font-bold text-on-surface">{changedCount}</p>
          </div>
          <ArrowRight className="w-8 h-8 text-secondary opacity-50" />
        </div>
        <div className="bg-surface-container rounded-lg p-4 border border-outline-variant flex items-center justify-between">
          <div>
            <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">Risk Delta</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-on-surface">-12%</p>
              <Badge variant="safe">Reduced</Badge>
            </div>
          </div>
          <TrendingDown className="w-8 h-8 text-green-500 opacity-50" />
        </div>
      </div>

      {/* Split Pane View */}
      <div className="flex-1 flex gap-4 min-h-[400px]">
        
        {/* Left: Original */}
        <div className="flex-1 flex flex-col border border-outline-variant rounded-lg overflow-hidden bg-surface-container-lowest">
          <div className="bg-surface-container-low py-2 px-4 border-b border-outline-variant font-semibold text-sm text-on-surface flex justify-between">
            <span>Original Contract (v1)</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {diffedClauses.map(clause => (
              <div 
                key={`orig-${clause.id}`} 
                className={`p-3 rounded border-l-4 cursor-pointer transition-colors ${
                  clause.hasChanged ? (selectedChangeId === clause.id ? 'bg-error/5 border-error' : 'border-error/50 hover:bg-surface-container') : 'border-transparent'
                }`}
                onClick={() => clause.hasChanged && setSelectedChangeId(clause.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-on-surface-variant">{clause.category || 'Clause'}</span>
                </div>
                <p 
                  className="text-sm text-on-surface whitespace-pre-wrap leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: clause.originalDiff }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Revised */}
        <div className="flex-1 flex flex-col border border-outline-variant rounded-lg overflow-hidden bg-surface-container-lowest">
          <div className="bg-surface-container-low py-2 px-4 border-b border-outline-variant font-semibold text-sm text-on-surface flex justify-between">
            <span>Revised Document (v2)</span>
            <Badge variant="primary" className="bg-secondary text-on-secondary">Counter-party</Badge>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {diffedClauses.map(clause => (
              <div 
                key={`rev-${clause.id}`} 
                className={`p-3 rounded border-l-4 cursor-pointer transition-colors ${
                  clause.hasChanged ? (selectedChangeId === clause.id ? 'bg-green-500/10 border-green-500' : 'border-green-500/50 hover:bg-surface-container') : 'border-transparent'
                }`}
                onClick={() => clause.hasChanged && setSelectedChangeId(clause.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-on-surface-variant">{clause.category || 'Clause'}</span>
                </div>
                <p 
                  className="text-sm text-on-surface whitespace-pre-wrap leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: clause.revisedDiff }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Negotiation Insights Panel (Slides up when a change is selected) */}
      {activeChange && (
        <Card className="mt-4 border-primary/30 shadow-lg animate-in slide-in-from-bottom-8">
          <div className="p-4 bg-primary/5 border-b border-primary/20 flex justify-between items-center">
            <h3 className="font-semibold text-primary flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              AI Negotiation Insight
            </h3>
            <button onClick={() => setSelectedChangeId(null)} className="text-on-surface-variant hover:text-on-surface text-sm underline">Dismiss</button>
          </div>
          <div className="p-4 flex gap-6">
            <div className="flex-1">
              <h4 className="font-semibold text-on-surface mb-1">{activeChange.insight.title}</h4>
              <p className="text-sm text-on-surface-variant mb-4">{activeChange.insight.description}</p>
              
              <div className="p-3 bg-surface-container rounded border border-outline-variant">
                <p className="text-xs font-semibold uppercase tracking-wider text-error mb-1">AI Recommendation</p>
                <p className="text-sm text-on-surface">{activeChange.insight.recommendation}</p>
              </div>
            </div>
            <div className="w-48 flex flex-col justify-center gap-2 shrink-0 border-l border-outline-variant pl-6">
              <button className="w-full py-2 bg-error/10 text-error hover:bg-error/20 rounded font-medium text-sm transition-colors">
                {activeChange.insight.rejectAction}
              </button>
              <button className="w-full py-2 bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20 rounded font-medium text-sm transition-colors">
                {activeChange.insight.acceptAction}
              </button>
            </div>
          </div>
        </Card>
      )}

      {!activeChange && changedCount > 0 && (
        <div className="text-center p-4 text-sm text-on-surface-variant">
          Click on a highlighted change to view AI negotiation insights.
        </div>
      )}
    </div>
  )
}
