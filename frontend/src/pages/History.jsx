import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Badge } from "../components/ui/Badge"
import { FileText, Search, Filter, MoreHorizontal, ArrowRight, Download } from "lucide-react"
import { getAllAnalyses } from "../services/api"
import { motion } from "framer-motion"

export default function History() {
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllAnalyses()
        setAnalyses(data)
      } catch (error) {
        console.error("Failed to load history data", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface">Analysis History</h2>
          <p className="text-sm text-on-surface-variant mt-1">Search, filter, and review your previously analyzed contracts.</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-4 border-b border-outline-variant/50 bg-surface-container-low flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search by filename or ID..." 
              className="w-full pl-9 pr-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-outline-variant rounded-lg bg-surface-container-lowest text-sm font-medium hover:bg-surface-container text-on-surface transition-colors w-full sm:w-auto">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-outline-variant rounded-lg bg-surface-container-lowest text-sm font-medium hover:bg-surface-container text-on-surface transition-colors w-full sm:w-auto">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-on-surface-variant uppercase bg-surface-container-low border-b border-outline-variant/50">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Document Name</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Date Analyzed</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Total Clauses</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Overall Risk</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-on-surface-variant">
                    <div className="flex justify-center mb-2">
                      <div className="animate-pulse w-6 h-6 rounded-full bg-primary/50"></div>
                    </div>
                    Loading history...
                  </td>
                </tr>
              ) : analyses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-on-surface-variant">
                    No analyses found. <Link to="/dashboard/upload" className="text-primary hover:underline">Upload your first contract</Link>.
                  </td>
                </tr>
              ) : (
                analyses.map((doc, idx) => (
                  <tr key={doc.id} className={`border-b border-outline-variant/30 hover:bg-surface-container-low/50 transition-colors ${idx === analyses.length - 1 ? 'border-none' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center shrink-0 border border-outline-variant/50">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium text-on-surface truncate max-w-[200px] sm:max-w-[300px]">
                          {doc.filename || `Analysis ${doc.id.substring(0, 8)}`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant whitespace-nowrap">
                      Just now
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      {doc.clauses ? doc.clauses.length : 0}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={doc.overall_risk_score} className="uppercase text-[10px] tracking-wider">
                        {doc.overall_risk_score}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/dashboard/contracts?id=${doc.id}`} className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        {!loading && analyses.length > 0 && (
          <div className="p-4 border-t border-outline-variant/50 bg-surface-container-low flex justify-between items-center text-sm text-on-surface-variant">
            <span>Showing 1 to {analyses.length} of {analyses.length} entries</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container disabled:opacity-50" disabled>Prev</button>
              <button className="px-3 py-1 border border-outline-variant rounded bg-primary text-on-primary">1</button>
              <button className="px-3 py-1 border border-outline-variant rounded hover:bg-surface-container disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
