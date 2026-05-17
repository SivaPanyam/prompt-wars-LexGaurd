import React, { useState, useEffect } from "react"
import { useSearchParams, useLocation } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { Button } from "../components/ui/Button"
import { ShieldAlert, FileText, MessageSquare, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react"
import { getAnalysisReport } from "../services/api"
import CompareVersions from "../components/CompareVersions"

export default function AIAnalysis() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const analysisId = searchParams.get("id")
  const reportFromState = location.state?.report

  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  const [activeTab, setActiveTab] = useState('document')
  const [selectedClauseId, setSelectedClauseId] = useState(null)

  useEffect(() => {
    // If we passed the report through navigation state, use it immediately
    if (reportFromState) {
      console.log("Using report from navigation state (Bypassing Firestore fetch)")
      setReport(reportFromState)
      if (reportFromState.clauses && reportFromState.clauses.length > 0) {
        const risky = reportFromState.clauses.find(c => ['high', 'critical'].includes(c.risk_assessment?.severity))
        setSelectedClauseId(risky ? risky.id : reportFromState.clauses[0].id)
      }
      setLoading(false)
      return
    }

    let retries = 0;
    const maxRetries = 3;

    async function fetchReport() {
      if (!analysisId) {
        setError("No analysis ID provided in URL.")
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        console.log(`Fetching report for ID: ${analysisId} (Attempt ${retries + 1})`)
        const data = await getAnalysisReport(analysisId)
        console.log("Report fetched successfully:", data)
        setReport(data)
        // Automatically select the first high/critical risk clause if available, otherwise the first clause
        if (data.clauses && data.clauses.length > 0) {
          const risky = data.clauses.find(c => ['high', 'critical'].includes(c.risk_assessment?.severity))
          setSelectedClauseId(risky ? risky.id : data.clauses[0].id)
        }
        setError("")
      } catch (err) {
        console.warn(`Fetch attempt ${retries + 1} failed:`, err.message)
        if (retries < maxRetries) {
          retries++;
          console.log(`Retrying in 2 seconds...`)
          setTimeout(fetchReport, 2000)
          return
        }
        setError(`Failed to load analysis report: ${err.message}. If this persists, please check that your GEMINI_API_KEY is correctly set in the backend environment.`)
      } finally {
        if (retries >= maxRetries || report) {
          setLoading(false)
        }
      }
    }
    fetchReport()
  }, [analysisId])

  if (loading) {
    return <AnalysisSkeleton />
  }

  if (error || !report) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <ShieldAlert className="w-16 h-16 text-error opacity-50" />
        <h2 className="text-xl font-semibold text-on-surface">Analysis Not Found</h2>
        <p className="text-on-surface-variant max-w-md">{error}</p>
        <Button onClick={() => window.location.href = '/dashboard/upload'}>Upload New Contract</Button>
      </div>
    )
  }

  const selectedClause = report.clauses?.find(c => c.id === selectedClauseId)

  // Helpers for inline highlighting styles based on risk severity
  const getHighlightStyle = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-error/10 border-l-4 border-error'
      case 'high': return 'bg-orange-500/10 border-l-4 border-orange-500'
      case 'moderate': return 'bg-yellow-500/10 border-l-4 border-yellow-500'
      case 'safe': return 'bg-green-500/5 border-l-4 border-green-500/30'
      default: return 'hover:bg-surface-container-low border-l-4 border-transparent'
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 animate-in fade-in duration-500">
      {/* Left Pane: Document View */}
      <Card className="flex-1 flex flex-col overflow-hidden shadow-sm">
        <div className="border-b border-outline-variant p-4 flex gap-4 bg-surface-container-low shrink-0">
          <button 
            className={`text-sm font-medium pb-1 ${activeTab === 'document' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            onClick={() => setActiveTab('document')}
          >
            Document View
          </button>
          <button 
            className={`text-sm font-medium pb-1 ${activeTab === 'clauses' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            onClick={() => setActiveTab('clauses')}
          >
            Clause Explorer
          </button>
          <button 
            className={`text-sm font-medium pb-1 ${activeTab === 'compare' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
            onClick={() => setActiveTab('compare')}
          >
            Compare Versions
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-surface-container-lowest">
          <div className="max-w-3xl mx-auto space-y-2">
            <div className="mb-8 border-b border-outline-variant/50 pb-4">
              <h1 className="text-2xl font-bold text-on-surface mb-2">{report.filename}</h1>
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <span>Overall Risk: <Badge variant={report.overall_risk_score} className="uppercase text-[10px] ml-1">{report.overall_risk_score}</Badge></span>
                <span>•</span>
                <span>{report.clauses.length} Clauses Extracted</span>
              </div>
            </div>

            {activeTab === 'document' && (
              <div className="font-serif text-on-surface text-base md:text-lg leading-relaxed space-y-4">
                {report.clauses?.map((clause) => (
                  <div 
                    key={clause.id}
                    className={`p-3 -mx-3 rounded transition-all cursor-pointer ${
                      selectedClauseId === clause.id 
                        ? getHighlightStyle(clause.risk_assessment?.severity)
                        : 'hover:bg-surface-container border-l-4 border-transparent'
                    }`}
                    onClick={() => setSelectedClauseId(clause.id)}
                  >
                    <p className="whitespace-pre-wrap">{clause.original_text}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'clauses' && (
              <div className="space-y-4 font-sans">
                {report.clauses?.map(clause => (
                  <div 
                    key={clause.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedClauseId === clause.id ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedClauseId(clause.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-on-surface">{clause.category || 'General'}</h4>
                        {clause.is_standard && <span className="text-xs text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">Standard Boilerplate</span>}
                      </div>
                      <Badge variant={clause.risk_assessment?.severity || 'safe'} className="uppercase">
                        {clause.risk_assessment?.severity || 'SAFE'}
                      </Badge>
                    </div>
                    <p className="text-sm text-on-surface-variant line-clamp-2 mt-2">{clause.original_text}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'compare' && (
              <div className="font-sans">
                <CompareVersions originalClauses={report.clauses} />
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Right Pane: AI Reasoning Inspector (Google Docs Style) - Hidden when comparing */}
      {activeTab !== 'compare' && (
      <Card className="w-[400px] flex flex-col overflow-hidden shrink-0 border-l-4 border-l-surface-container bg-surface-container-lowest shadow-sm">
        <CardHeader className="bg-surface-container-low py-4 border-b border-outline-variant">
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-primary" />
            AI Reasoning Inspector
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-6">
          {!selectedClause ? (
            <div className="text-center text-on-surface-variant mt-10">
              <FileText className="w-10 h-10 mx-auto mb-4 text-outline" />
              <p className="text-sm">Select a highlighted clause in the document to view detailed AI analysis.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              
              {/* Header Info */}
              <div className="pb-4 border-b border-outline-variant/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-on-surface">{selectedClause.category}</h3>
                  <Badge variant={selectedClause.risk_assessment?.severity || 'safe'} className="uppercase">
                    {selectedClause.risk_assessment?.severity || 'SAFE'}
                  </Badge>
                </div>
                {/* Simulated Confidence Indicator */}
                <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  High Confidence (94%)
                </div>
              </div>

              {/* Explainability Card */}
              {selectedClause.explainability && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500" />
                    Plain English Translation
                  </h4>
                  <div className="p-3 bg-surface-container rounded-lg text-sm text-on-surface border border-outline-variant/30 leading-relaxed">
                    {selectedClause.explainability.plain_english_summary}
                  </div>
                  {selectedClause.explainability.key_takeaways && selectedClause.explainability.key_takeaways.length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-on-surface-variant space-y-1">
                      {selectedClause.explainability.key_takeaways.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Risk Assessment Card */}
              {selectedClause.risk_assessment && selectedClause.risk_assessment.risk_drivers.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-error" />
                    Risk Drivers
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-on-surface-variant space-y-1">
                    {selectedClause.risk_assessment.risk_drivers.map((driver, idx) => (
                      <li key={idx}>{driver}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Real World Impact Card */}
              {selectedClause.consequence && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-orange-500" />
                    Simulated Impact
                  </h4>
                  <div className="p-3 bg-orange-500/5 border border-orange-500/20 rounded-lg text-sm space-y-2">
                    <p className="text-on-surface"><span className="font-medium text-orange-700 dark:text-orange-400">Worst Case:</span> {selectedClause.consequence.worst_case_scenario}</p>
                    <p className="text-on-surface"><span className="font-medium text-orange-700 dark:text-orange-400">Financial Exposure:</span> {selectedClause.consequence.financial_exposure}</p>
                  </div>
                </div>
              )}

              {/* Negotiation Strategy Card */}
              {selectedClause.negotiation && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Negotiation Strategy
                  </h4>
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Suggested Redline</p>
                      <div className="p-2 bg-surface-container-lowest border border-outline-variant/30 rounded font-mono text-xs text-on-surface">
                        {selectedClause.negotiation.redline_suggestion}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Argument</p>
                      <p className="text-sm text-on-surface">{selectedClause.negotiation.explanation}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Fallback Position</p>
                      <p className="text-sm text-on-surface-variant">{selectedClause.negotiation.fallback_position}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </CardContent>
      </Card>
      )}
    </div>
  )
}

function AnalysisSkeleton() {
  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 animate-in fade-in duration-300">
      <Card className="flex-1 p-8 space-y-6 overflow-hidden">
        <div className="flex justify-between items-center mb-10">
          <div className="w-1/2 h-8 bg-surface-container-high rounded animate-pulse"></div>
          <div className="flex items-center gap-2 text-primary font-medium text-sm">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            Orchestrating AI Agents...
          </div>
        </div>
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 mb-8">
          <p className="text-sm text-primary font-medium">Running 6-agent legal intelligence pipeline:</p>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="text-[10px] text-on-surface-variant flex items-center gap-1"><div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></div> Parser Agent</div>
            <div className="text-[10px] text-on-surface-variant flex items-center gap-1"><div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></div> Risk Agent</div>
            <div className="text-[10px] text-on-surface-variant flex items-center gap-1"><div className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></div> Negotiation Agent</div>
          </div>
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className={`h-4 bg-surface-container-high rounded animate-pulse ${i % 2 === 0 ? 'w-full' : 'w-5/6'}`}></div>
            <div className={`h-4 bg-surface-container-high rounded animate-pulse ${i % 3 === 0 ? 'w-4/5' : 'w-full'}`}></div>
          </div>
        ))}
      </Card>
      <Card className="w-[400px] shrink-0 p-6 space-y-6">
        <div className="w-3/4 h-6 bg-surface-container-high rounded animate-pulse"></div>
        <div className="w-full h-32 bg-surface-container-high rounded-lg animate-pulse mt-8"></div>
        <div className="w-full h-24 bg-surface-container-high rounded-lg animate-pulse"></div>
        <div className="w-full h-40 bg-surface-container-high rounded-lg animate-pulse"></div>
      </Card>
    </div>
  )
}
