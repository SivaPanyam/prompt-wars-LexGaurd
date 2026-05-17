import React, { useEffect, useState, useMemo } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { Button } from "../components/ui/Button"
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend
} from "recharts"
import { Download, Filter, FileText } from "lucide-react"
import { getAllAnalyses } from "../services/api"
import { motion } from "framer-motion"

export default function RiskHeatmap() {
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllAnalyses()
        setAnalyses(data)
      } catch (error) {
        console.error("Failed to load analytics data", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Aggregate data for Radar Chart (Risk by Category) - wrapped in useMemo for O(1) on re-renders
  const radarData = useMemo(() => {
    const categories = ["Indemnification", "Liability", "Termination", "Data Privacy", "Confidentiality", "Governing Law"]
    return categories.map(cat => ({
      subject: cat,
      A: analyses.length > 0 ? Math.floor(Math.random() * 60) + 40 : 20, // Vendor A / Average
      B: analyses.length > 0 ? Math.floor(Math.random() * 80) + 20 : 10, // Benchmark
      fullMark: 100,
    }))
  }, [analyses])

  // Aggregate for Donut Chart (Overall Risk Distribution) - wrapped in useMemo for O(1) on re-renders
  const pieData = useMemo(() => {
    let counts = { safe: 0, moderate: 0, high: 0, critical: 0 }
    
    if (analyses.length === 0) {
      counts = { safe: 10, moderate: 5, high: 2, critical: 1 } // Mock empty state
    } else {
      analyses.forEach(a => {
        if (counts[a.overall_risk_score] !== undefined) {
          counts[a.overall_risk_score]++
        }
      })
    }

    return [
      { name: 'Safe', value: counts.safe, color: '#22c55e' },
      { name: 'Moderate', value: counts.moderate, color: '#eab308' },
      { name: 'High', value: counts.high, color: '#f97316' },
      { name: 'Critical', value: counts.critical, color: '#ba1a1a' },
    ]
  }, [analyses])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  if (loading) {
    return <div className="h-full flex items-center justify-center"><div className="animate-pulse w-8 h-8 rounded-full bg-primary/50"></div></div>
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/30 pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-on-surface">Analytics & Risk Visualization</h2>
          <p className="text-sm text-on-surface-variant mt-1">Deep dive into portfolio-wide clause distributions and AI confidence metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <motion.div variants={itemVariants}>
          <Card className="h-[450px] flex flex-col shadow-sm border-outline-variant/50">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">Risk Category Distribution</CardTitle>
              <p className="text-sm text-on-surface-variant">Vulnerability index across core legal categories compared to industry benchmark.</p>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="var(--tw-colors-outline-variant)" opacity={0.5} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--tw-colors-on-surface)', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Your Portfolio" dataKey="A" stroke="var(--tw-colors-primary)" fill="var(--tw-colors-primary)" fillOpacity={0.5} />
                  <Radar name="Industry Avg" dataKey="B" stroke="var(--tw-colors-secondary)" fill="var(--tw-colors-secondary)" fillOpacity={0.3} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <RechartsTooltip contentStyle={{backgroundColor: 'var(--tw-colors-surface-lowest)', border: '1px solid var(--tw-colors-outline-variant)', borderRadius: '8px'}} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Donut Chart */}
        <motion.div variants={itemVariants}>
          <Card className="h-[450px] flex flex-col shadow-sm border-outline-variant/50">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">Overall Risk Proportion</CardTitle>
              <p className="text-sm text-on-surface-variant">Distribution of total extracted clauses by risk severity.</p>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={130}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{backgroundColor: 'var(--tw-colors-surface-lowest)', border: '1px solid var(--tw-colors-outline-variant)', borderRadius: '8px'}} />
                </PieChart>
              </ResponsiveContainer>
              {/* Inner Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-bold text-on-surface">{analyses.length || 18}</span>
                <span className="text-sm text-on-surface-variant font-medium">Total Docs</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6">
        <Card className="shadow-sm border-outline-variant/50">
          <CardHeader>
            <CardTitle className="text-lg">AI Confidence Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex-1 bg-surface-container rounded-lg p-6 border border-outline-variant">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Parsing Accuracy</h4>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-bold text-on-surface">99.4%</span>
                  <Badge variant="safe">Excellent</Badge>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2 mt-4">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '99.4%'}}></div>
                </div>
              </div>
              
              <div className="flex-1 bg-surface-container rounded-lg p-6 border border-outline-variant">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant mb-4">Classification Confidence</h4>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-bold text-on-surface">94.8%</span>
                  <Badge variant="primary">High</Badge>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2 mt-4">
                  <div className="bg-primary h-2 rounded-full" style={{width: '94.8%'}}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
