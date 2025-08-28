import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from "@/components/MetricCard";
import { 
  GitBranch, 
  Plus,
  Search,
  Users,
  TrendingUp,
  Filter,
  Download,
  RefreshCw,
  Sparkles
} from "lucide-react";

const sampleCohorts = [
  {
    id: 1,
    name: "High-Value Spenders",
    description: "Players who spent >$50 in last 30 days",
    size: 2847,
    growth: "+12%",
    lastUpdated: "5 min ago",
    status: "active"
  },
  {
    id: 2,
    name: "Stuck at Level 12",
    description: "Players failing Level 12 multiple times",
    size: 1934,
    growth: "+8%",
    lastUpdated: "10 min ago",
    status: "active"
  },
  {
    id: 3,
    name: "Weekend Warriors",
    description: "High engagement on weekends only",
    size: 5621,
    growth: "-3%",
    lastUpdated: "15 min ago",
    status: "active"
  },
  {
    id: 4,
    name: "Social Connectors",
    description: "Players with high friend activity",
    size: 892,
    growth: "+24%",
    lastUpdated: "1 hour ago",
    status: "active"
  },
  {
    id: 5,
    name: "New Player Onboarding",
    description: "Players in their first 7 days",
    size: 12456,
    growth: "+18%",
    lastUpdated: "2 hours ago",
    status: "active"
  },
  {
    id: 6,
    name: "Retention Risk",
    description: "Players with declining engagement",
    size: 3247,
    growth: "-15%",
    lastUpdated: "3 hours ago",
    status: "monitoring"
  },
  {
    id: 7,
    name: "Power Users",
    description: "Daily players with >2hr sessions",
    size: 1156,
    growth: "+5%",
    lastUpdated: "4 hours ago",
    status: "active"
  },
  {
    id: 8,
    name: "iOS Premium Segment",
    description: "iOS users with premium purchases",
    size: 4567,
    growth: "+22%",
    lastUpdated: "6 hours ago",
    status: "active"
  }
];

const suggestedCohorts = [
  "Players who completed tutorial but never reached level 5",
  "High-session players with low monetization",
  "Players who churned after first purchase",
  "Social feature adopters in first week"
];

export default function Cohorts() {
  const [selectedMode, setSelectedMode] = useState<"natural" | "rules">("natural");
  const [searchTerm, setSearchTerm] = useState("");
  const [naturalQuery, setNaturalQuery] = useState("");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <GitBranch className="w-8 h-8 text-primary" />
            Cohort Builder
          </h1>
          <p className="text-muted-foreground mt-1">
            Create dynamic player segments with AI-powered suggestions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Cohort
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Cohorts"
          value="23"
          icon={<GitBranch className="w-5 h-5" />}
        />
        <MetricCard
          title="Active Members"
          value="47,294"
          change={{ value: "+8.2%", type: "increase", period: "this week" }}
          icon={<Users className="w-5 h-5" />}
        />
        <MetricCard
          title="Avg Cohort Size"
          value="2,056"
          icon={<Users className="w-5 h-5" />}
        />
        <MetricCard
          title="Weekly Growth"
          value="+12.3%"
          change={{ value: "+2.1%", type: "increase", period: "vs last week" }}
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      <Tabs defaultValue="library" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="library">Cohort Library</TabsTrigger>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="overlap">Overlap Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-6">
          {/* Search */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search cohorts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh All
            </Button>
          </div>

          {/* Cohorts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleCohorts.map((cohort) => (
              <div key={cohort.id} className="bg-card border border-card-border rounded-lg p-6 hover:shadow-lg transition-smooth">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{cohort.name}</h3>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    {cohort.status}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{cohort.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Size</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{cohort.size.toLocaleString()}</span>
                      <span className={`text-xs ${
                        cohort.growth.startsWith('+') ? 'text-success' : 'text-destructive'
                      }`}>
                        {cohort.growth}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Updated</span>
                    <span className="text-sm font-medium">{cohort.lastUpdated}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/20">
                  <Button variant="ghost" size="sm" className="flex-1">
                    View
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          {/* Mode Selector */}
          <div className="bg-card border border-card-border rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant={selectedMode === "natural" ? "default" : "outline"}
                onClick={() => setSelectedMode("natural")}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Natural Language
              </Button>
              <Button
                variant={selectedMode === "rules" ? "default" : "outline"}
                onClick={() => setSelectedMode("rules")}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Rules Builder
              </Button>
            </div>

            {selectedMode === "natural" ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Describe your cohort in natural language
                  </label>
                  <Input
                    placeholder="e.g., 'Players who spent more than $50 in the last 7 days and played at least 3 sessions'"
                    value={naturalQuery}
                    onChange={(e) => setNaturalQuery(e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Button>Generate Rules</Button>
                  <Button variant="outline">Preview Size</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Drag and drop conditions to build your cohort rules
                </p>
                <div className="border border-dashed border-border rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">Rules builder interface coming soon...</p>
                </div>
              </div>
            )}
          </div>

          {/* AI Suggestions */}
          <div className="bg-card border border-card-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Suggested Cohorts
            </h3>
            <div className="space-y-2">
              {suggestedCohorts.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 text-sm bg-surface-elevated hover:bg-muted rounded-lg transition-smooth"
                  onClick={() => setNaturalQuery(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="overlap">
          <div className="bg-card border border-card-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Cohort Overlap Analysis</h3>
            <p className="text-muted-foreground">Interactive overlap heatmap coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}