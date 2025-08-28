import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Database, 
  Activity, 
  BarChart3,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  GitBranch,
  Eye,
  Edit,
  ExternalLink,
  Shield,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock catalog entries
  const catalogEntries = [
    {
      id: 1,
      name: "session_start",
      type: "Event",
      description: "Fired when a player begins a new game session",
      owner: "Analytics Team",
      lastUpdated: "2 days ago",
      usage: "High",
      quality: "Excellent",
      schema: {
        player_id: "string",
        session_id: "uuid",
        platform: "enum",
        timestamp: "datetime"
      },
      sampleCount: "2.4M/day"
    },
    {
      id: 2,
      name: "level_complete",
      type: "Event",
      description: "Player successfully completes a game level",
      owner: "Game Design",
      lastUpdated: "1 week ago",
      usage: "High",
      quality: "Good",
      schema: {
        level: "integer",
        time_to_complete: "duration",
        attempts: "integer",
        score: "float"
      },
      sampleCount: "890K/day"
    },
    {
      id: 3,
      name: "total_iap_revenue",
      type: "Attribute",
      description: "Total in-app purchase revenue per player (lifetime)",
      owner: "Monetization Team",
      lastUpdated: "3 days ago",
      usage: "Medium",
      quality: "Excellent",
      derivedFrom: ["purchase_complete", "refund_processed"],
      refreshRate: "Hourly"
    },
    {
      id: 4,
      name: "Daily Active Users",
      type: "Metric",
      description: "Count of unique players who had at least one session",
      owner: "Analytics Team", 
      lastUpdated: "1 day ago",
      usage: "High",
      quality: "Excellent",
      calculation: "COUNT(DISTINCT player_id) WHERE session_start IN last 24h"
    }
  ];

  // Mock quality metrics
  const qualityMetrics = [
    {
      name: "Schema Conformance",
      value: 98.7,
      status: "excellent",
      trend: "stable"
    },
    {
      name: "Data Freshness",
      value: 99.2,
      status: "excellent", 
      trend: "improving"
    },
    {
      name: "Completeness",
      value: 94.3,
      status: "good",
      trend: "declining"
    },
    {
      name: "Accuracy",
      value: 97.8,
      status: "excellent",
      trend: "stable"
    }
  ];

  // Mock lineage data
  const lineageData = [
    {
      source: "Raw Events",
      target: "session_start",
      type: "ingestion"
    },
    {
      source: "session_start",
      target: "Daily Active Users",
      type: "aggregation"
    },
    {
      source: "purchase_complete",
      target: "total_iap_revenue",
      type: "derivation"
    }
  ];

  const getQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case "excellent": return "text-success";
      case "good": return "text-accent-cyan";
      case "fair": return "text-warning";
      case "poor": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getUsageBadge = (usage: string) => {
    switch (usage.toLowerCase()) {
      case "high": return "bg-success/10 text-success";
      case "medium": return "bg-warning/10 text-warning";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredEntries = catalogEntries.filter(entry => {
    const matchesSearch = entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || entry.type.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Catalog</h1>
          <p className="text-muted-foreground mt-1">
            Discover, understand, and govern your data assets
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
          <Button size="sm">
            <Database className="w-4 h-4 mr-2" />
            Add Entity
          </Button>
        </div>
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse">Browse Catalog</TabsTrigger>
          <TabsTrigger value="quality">Data Quality</TabsTrigger>
          <TabsTrigger value="lineage">Lineage</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, attributes, metrics..."
                className="pl-10 bg-surface-elevated border-input-border"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="event">Events</SelectItem>
                <SelectItem value="attribute">Attributes</SelectItem>
                <SelectItem value="metric">Metrics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Catalog Entries */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Data Assets ({filteredEntries.length})
              </h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-success">
                  {catalogEntries.filter(e => e.type === 'Event').length} Events
                </Badge>
                <Badge variant="outline" className="text-accent-cyan">
                  {catalogEntries.filter(e => e.type === 'Attribute').length} Attributes  
                </Badge>
                <Badge variant="outline" className="text-accent-purple">
                  {catalogEntries.filter(e => e.type === 'Metric').length} Metrics
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredEntries.map((entry) => (
                <Card key={entry.id} className="bg-card border-card-border hover:bg-surface-elevated transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            {entry.type === 'Event' && <Activity className="w-5 h-5 text-success" />}
                            {entry.type === 'Attribute' && <User className="w-5 h-5 text-accent-cyan" />}
                            {entry.type === 'Metric' && <BarChart3 className="w-5 h-5 text-accent-purple" />}
                            <h3 className="text-lg font-semibold">{entry.name}</h3>
                          </div>
                          <Badge variant="secondary">{entry.type}</Badge>
                          <Badge className={getUsageBadge(entry.usage)}>
                            {entry.usage} usage
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{entry.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {entry.owner}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Updated {entry.lastUpdated}
                          </div>
                          <div className={`flex items-center gap-1 ${getQualityColor(entry.quality)}`}>
                            <CheckCircle className="w-4 h-4" />
                            {entry.quality} quality
                          </div>
                          {entry.sampleCount && (
                            <div className="flex items-center gap-1">
                              <Database className="w-4 h-4" />
                              {entry.sampleCount}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <GitBranch className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {entry.schema && (
                      <div className="mt-4 p-3 bg-surface-elevated rounded-lg">
                        <p className="text-sm font-medium mb-2">Schema:</p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(entry.schema).map(([field, type]) => (
                            <Badge key={field} variant="outline" className="text-xs">
                              {field}: {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {entry.derivedFrom && (
                      <div className="mt-4 p-3 bg-surface-elevated rounded-lg">
                        <p className="text-sm font-medium mb-2">Derived from:</p>
                        <div className="flex flex-wrap gap-2">
                          {entry.derivedFrom.map((source) => (
                            <Badge key={source} variant="outline" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          {/* Quality Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {qualityMetrics.map((metric) => (
              <Card key={metric.name} className="bg-card border-card-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{metric.name}</h3>
                    {metric.trend === 'improving' && <TrendingUp className="w-4 h-4 text-success" />}
                    {metric.trend === 'declining' && <AlertTriangle className="w-4 h-4 text-warning" />}
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {metric.value}%
                  </div>
                  <Badge 
                    variant="outline" 
                    className={getQualityColor(metric.status)}
                  >
                    {metric.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quality Issues */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                Quality Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <div>
                    <p className="font-medium">Schema drift detected in purchase_complete</p>
                    <p className="text-sm text-muted-foreground">New field 'currency_code' appeared 2 days ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="font-medium">High null rate in player location</p>
                    <p className="text-sm text-muted-foreground">12.3% of records missing location data</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Investigate
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lineage" className="space-y-6">
          {/* Data Lineage Visualization */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Data Lineage
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Interactive lineage graph showing data flow and transformations
                </p>
                
                {/* Simplified lineage visualization */}
                <div className="bg-surface-elevated rounded-lg p-6 min-h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <GitBranch className="w-12 h-12 mx-auto mb-3" />
                    <p>Interactive lineage graph would be rendered here</p>
                    <p className="text-sm">Showing relationships between events, attributes, and metrics</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="bg-surface-elevated">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Upstream Dependencies</h4>
                      <div className="space-y-2 text-sm">
                        <div>Raw event streams</div>
                        <div>Data validation rules</div>
                        <div>Transformation logic</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-surface-elevated">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Current Asset</h4>
                      <div className="space-y-2 text-sm">
                        <div className="font-medium">session_start</div>
                        <div className="text-muted-foreground">Core event</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-surface-elevated">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Downstream Usage</h4>
                      <div className="space-y-2 text-sm">
                        <div>Daily Active Users metric</div>
                        <div>Session analytics dashboard</div>
                        <div>Retention calculations</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-6">
          {/* Governance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success" />
                  Access Control
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Protected Entities:</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Masked Fields:</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Access Policies:</span>
                    <span className="font-medium">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-accent-cyan" />
                  Data Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Active Users:</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Queries Today:</span>  
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Top Asset:</span>
                    <span className="font-medium">session_start</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent-purple" />
                  Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">GDPR Ready:</span>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Retention Policy:</span>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Audit Trail:</span>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle>Recent Governance Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-surface-elevated rounded-lg">
                <Shield className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-sm">New masking rule applied to email field</p>
                  <p className="text-xs text-muted-foreground">2 hours ago by Data Protection Officer</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-surface-elevated rounded-lg">
                <Eye className="w-5 h-5 text-accent-cyan" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Access granted to Marketing team for cohort data</p>
                  <p className="text-xs text-muted-foreground">1 day ago by Analytics Manager</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-surface-elevated rounded-lg">
                <Calendar className="w-5 h-5 text-warning" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Data retention policy updated for event data</p>
                  <p className="text-xs text-muted-foreground">3 days ago by Legal Team</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}