import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  TrendingDown, 
  Users, 
  Clock, 
  ArrowRight,
  Filter,
  Play,
  Settings,
  BarChart3,
  Zap
} from "lucide-react";

export default function Journeys() {
  const [selectedFunnel, setSelectedFunnel] = useState("custom");
  const [whatIfValue, setWhatIfValue] = useState([10]);

  // Mock data for top journeys
  const topJourneys = [
    {
      id: 1,
      path: ["session_start", "tutorial_complete", "level_1_start", "level_1_complete", "shop_visit"],
      completion: 68.4,
      users: 12847,
      avgTime: "8m 23s"
    },
    {
      id: 2,
      path: ["session_start", "level_1_start", "level_1_fail", "level_1_retry", "level_1_complete"],
      completion: 45.2,
      users: 8392,
      avgTime: "12m 45s"
    },
    {
      id: 3,
      path: ["session_start", "shop_visit", "purchase_flow", "payment_success", "level_1_start"],
      completion: 89.7,
      users: 3421,
      avgTime: "4m 12s"
    }
  ];

  // Mock funnel data
  const funnelSteps = [
    { event: "session_start", users: 24781, dropoff: 0 },
    { event: "tutorial_complete", users: 19824, dropoff: 20.0 },
    { event: "level_1_start", users: 17643, dropoff: 11.0 },
    { event: "level_1_complete", users: 12847, dropoff: 27.2 },
    { event: "shop_visit", users: 8765, dropoff: 31.8 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Journey & Funnel Mining</h1>
          <p className="text-muted-foreground mt-1">
            Discover player paths and analyze conversion funnels
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Funnel
          </Button>
        </div>
      </div>

      <Tabs defaultValue="discover" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="discover">Auto-Discover</TabsTrigger>
          <TabsTrigger value="funnel">Funnel Builder</TabsTrigger>
          <TabsTrigger value="compare">Compare Segments</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Filter journeys by event or cohort..."
                className="pl-10 bg-surface-elevated border-input-border"
              />
            </div>
            <Select defaultValue="7d">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="new">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Players</SelectItem>
                <SelectItem value="new">New Players</SelectItem>
                <SelectItem value="returning">Returning</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Top Journeys */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Top Player Journeys</h2>
            <div className="grid gap-4">
              {topJourneys.map((journey) => (
                <Card key={journey.id} className="bg-card border-card-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-accent-cyan">
                          {journey.completion}% completion
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {journey.users.toLocaleString()} users
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {journey.avgTime} avg
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Analyze
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2 overflow-x-auto">
                      {journey.path.map((step, index) => (
                        <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                          <Badge variant="secondary" className="text-xs">
                            {step.replace(/_/g, ' ')}
                          </Badge>
                          {index < journey.path.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="funnel" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Funnel Builder */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Funnel Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {funnelSteps.map((step, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-surface-elevated rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{step.event.replace(/_/g, ' ')}</p>
                          <p className="text-sm text-muted-foreground">
                            {step.users.toLocaleString()} users
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {step.dropoff > 0 && (
                          <div className="flex items-center gap-2 text-destructive">
                            <TrendingDown className="w-4 h-4" />
                            <span className="font-medium">{step.dropoff}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Step
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* What-If Analysis */}
            <div className="space-y-6">
              <Card className="bg-card border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent-purple" />
                    What-If Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Improve Level 1 Completion Rate
                    </label>
                    <Slider
                      value={whatIfValue}
                      onValueChange={setWhatIfValue}
                      max={50}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>1%</span>
                      <span className="font-medium text-foreground">+{whatIfValue[0]}%</span>
                      <span>50%</span>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-surface-elevated rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Estimated Impact:</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Additional completions:</span>
                        <span className="text-sm font-medium text-success">
                          +{Math.round(12847 * (whatIfValue[0] / 100))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Overall funnel:</span>
                        <span className="text-sm font-medium text-accent-cyan">
                          +{(whatIfValue[0] * 0.4).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="text-xs text-warning-foreground">
                      <strong>Note:</strong> Estimates show associations, not proven causality. 
                      Consider A/B testing to validate.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-card-border">
                <CardHeader>
                  <CardTitle>Drop-off Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-surface-elevated rounded-lg">
                    <p className="text-sm font-medium mb-1">Top Drop-off Reason</p>
                    <p className="text-xs text-muted-foreground">
                      Players failing Level 1 more than 3 times (34% higher than average)
                    </p>
                  </div>
                  <div className="p-3 bg-surface-elevated rounded-lg">
                    <p className="text-sm font-medium mb-1">Device Pattern</p>
                    <p className="text-xs text-muted-foreground">
                      Mobile users show 15% higher drop-off at tutorial step
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compare" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-card-border">
              <CardHeader>
                <CardTitle>Segment A: New Players</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Users:</span>
                    <span className="font-medium">18,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Completion:</span>
                    <span className="font-medium text-accent-cyan">62.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Time:</span>
                    <span className="font-medium">9m 45s</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-card-border">
              <CardHeader>
                <CardTitle>Segment B: Returning Players</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Users:</span>
                    <span className="font-medium">6,534</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Completion:</span>
                    <span className="font-medium text-success">74.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Time:</span>
                    <span className="font-medium">6m 12s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}