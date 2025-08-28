import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus,
  Calendar,
  Filter,
  Download,
  Share,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart,
  Table,
  TrendingUp,
  Users,
  Activity,
  Clock
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const sampleData = [
  { date: "Jan 10", activeUsers: 21400, sessions: 31200, revenue: 2840 },
  { date: "Jan 11", activeUsers: 22100, sessions: 32800, revenue: 3120 },
  { date: "Jan 12", activeUsers: 23800, sessions: 35600, revenue: 3480 },
  { date: "Jan 13", activeUsers: 24200, sessions: 36400, revenue: 3650 },
  { date: "Jan 14", activeUsers: 25100, sessions: 37800, revenue: 3920 },
  { date: "Jan 15", activeUsers: 26800, sessions: 40200, revenue: 4280 },
  { date: "Jan 16", activeUsers: 24600, sessions: 37000, revenue: 3840 },
];

const dimensions = [
  "Country", "Platform", "Device Type", "Acquisition Channel", "Player Level", "Session Count",
  "Total Revenue", "Registration Date", "Last Session", "App Version"
];

const metrics = [
  "Active Users", "Sessions", "Session Duration", "Revenue", "Purchases", "Level Completions",
  "Tutorial Completions", "Social Interactions", "Ad Views", "Retention Rate"
];

const segments = [
  "New Players (< 7 days)", "Returning Players", "High Spenders", "At-Risk Players", 
  "Social Players", "Power Users", "Casual Players", "Weekend Players"
];

const recentQueries = [
  { query: "Daily Active Users by Country", time: "2 minutes ago", user: "John D." },
  { query: "Revenue Trends by Platform", time: "5 minutes ago", user: "Sarah M." },
  { query: "Level Completion Rates", time: "12 minutes ago", user: "Mike R." },
  { query: "Session Duration by Device", time: "18 minutes ago", user: "Lisa K." },
  { query: "Purchase Conversion Funnel", time: "25 minutes ago", user: "Tom B." },
  { query: "Retention Cohort Analysis", time: "32 minutes ago", user: "Anna C." },
  { query: "Weekend vs Weekday Activity", time: "45 minutes ago", user: "David L." },
  { query: "Tutorial Drop-off Points", time: "1 hour ago", user: "Emma S." },
];

export default function EventExplorer() {
  const [queryName, setQueryName] = useState("Free form analysis");
  const [selectedDimension, setSelectedDimension] = useState("");
  const [selectedMetric, setSelectedMetric] = useState("Active Users");
  const [selectedSegment, setSelectedSegment] = useState("");
  const [chartType, setChartType] = useState<"line" | "bar" | "table">("line");

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar - Variables & Controls */}
      <div className="w-80 bg-surface border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground mb-2">Variables</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">EXPLORATION NAME</label>
              <Input 
                value={queryName}
                onChange={(e) => setQueryName(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">TIME PERIOD</label>
              <Select defaultValue="last-7-days">
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Segments */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-muted-foreground">SEGMENTS</h3>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <div className="space-y-2">
            {segments.slice(0, 4).map((segment) => (
              <button
                key={segment}
                onClick={() => setSelectedSegment(segment)}
                className={`w-full text-left p-2 text-xs rounded-md transition-colors ${
                  selectedSegment === segment 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-surface-elevated hover:bg-muted text-muted-foreground"
                }`}
              >
                {segment}
              </button>
            ))}
          </div>
        </div>

        {/* Dimensions */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-muted-foreground">DIMENSIONS</h3>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <div className="space-y-1">
            {dimensions.slice(0, 6).map((dimension) => (
              <button
                key={dimension}
                onClick={() => setSelectedDimension(dimension)}
                className={`w-full text-left p-2 text-xs rounded-md transition-colors flex items-center gap-2 ${
                  selectedDimension === dimension 
                    ? "bg-accent-cyan/10 text-accent-cyan" 
                    : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                }`}
              >
                <div className="w-2 h-2 bg-accent-cyan rounded-full opacity-60"></div>
                {dimension}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="p-4 flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-muted-foreground">METRICS</h3>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <div className="space-y-1">
            {metrics.map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`w-full text-left p-2 text-xs rounded-md transition-colors flex items-center gap-2 ${
                  selectedMetric === metric 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                }`}
              >
                <div className="w-2 h-2 bg-primary rounded-full opacity-60"></div>
                {metric}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Tab Header */}
        <div className="p-4 border-b border-border bg-surface">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" />
                <span className="font-medium">{queryName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {selectedSegment || "All Users"}
                </Badge>
                {selectedDimension && (
                  <Badge variant="outline" className="text-xs">
                    by {selectedDimension}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Visualization Controls */}
        <div className="p-4 border-b border-border bg-surface">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-medium text-muted-foreground">VISUALIZATION</h3>
            <div className="flex items-center gap-2">
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("line")}
                className="h-8"
              >
                <LineChartIcon className="w-4 h-4" />
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("bar")}
                className="h-8"
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
              <Button
                variant={chartType === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("table")}
                className="h-8"
              >
                <Table className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Data Area */}
        <div className="flex-1 p-6">
          {chartType === "table" ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="w-5 h-5" />
                  {selectedMetric} Data Table
                </CardTitle>
                <CardDescription>
                  Detailed breakdown {selectedDimension ? `by ${selectedDimension}` : 'over time'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          {selectedDimension || "Date"}
                        </th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Active Users</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Sessions</th>
                        <th className="text-right py-3 px-4 font-medium text-muted-foreground">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleData.map((row, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-3 px-4 font-medium">{row.date}</td>
                          <td className="text-right py-3 px-4">{row.activeUsers.toLocaleString()}</td>
                          <td className="text-right py-3 px-4">{row.sessions.toLocaleString()}</td>
                          <td className="text-right py-3 px-4">${row.revenue.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {chartType === "line" ? <LineChartIcon className="w-5 h-5" /> : <BarChart3 className="w-5 h-5" />}
                  {selectedMetric} Trends
                </CardTitle>
                <CardDescription>
                  7-day performance {selectedDimension ? `by ${selectedDimension}` : 'overview'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "line" ? (
                      <LineChart data={sampleData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--popover))", 
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="activeUsers" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    ) : (
                      <BarChart data={sampleData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--popover))", 
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }} 
                        />
                        <Bar dataKey="activeUsers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Query History */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Queries
              </CardTitle>
              <CardDescription>Latest explorations by your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentQueries.map((query, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated hover:bg-muted transition-colors cursor-pointer">
                    <div>
                      <p className="font-medium text-sm">{query.query}</p>
                      <p className="text-xs text-muted-foreground">by {query.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{query.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}