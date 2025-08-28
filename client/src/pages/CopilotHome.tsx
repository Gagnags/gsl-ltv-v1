import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Send, 
  Brain, 
  Zap, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Activity,
  Users,
  BarChart3,
  TrendingUp,
  Database,
  PlayCircle
} from "lucide-react";

export default function CopilotHome() {
  const [query, setQuery] = useState("");
  
  // Mock conversation history
  const recentChats = [
    {
      id: 1,
      query: "Show me DAU trends for the last 14 days",
      timestamp: "2 hours ago",
      status: "completed",
      toolsUsed: ["events.query", "charts.create"]
    },
    {
      id: 2,
      query: "Create a cohort of players stuck at level 12",
      timestamp: "Yesterday",
      status: "completed",
      toolsUsed: ["cohorts.build", "players.analyze"]
    },
    {
      id: 3,
      query: "What's causing the retention drop in APAC?",
      timestamp: "2 days ago",
      status: "completed",
      toolsUsed: ["events.query", "explain", "charts.create"]
    }
  ];

  // Quick actions
  const quickActions = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Analyze Metrics",
      description: "Deep dive into your key performance indicators",
      query: "Show me a comprehensive analysis of our key metrics this week"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Build Cohorts",
      description: "Create player segments based on behavior",
      query: "Help me create cohorts for different player engagement levels"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Spot Anomalies",
      description: "Find unusual patterns in your data",
      query: "What anomalies or unusual patterns do you see in our data today?"
    },
    {
      icon: <PlayCircle className="w-5 h-5" />,
      title: "Journey Analysis",
      description: "Understand player progression paths",
      query: "Analyze the most common player journeys and identify drop-off points"
    }
  ];

  // Tool activity
  const toolActivity = [
    {
      tool: "events.query",
      description: "Queried session events for retention analysis",
      time: "30s ago",
      status: "success"
    },
    {
      tool: "charts.create",
      description: "Generated retention curve visualization",
      time: "1m ago",
      status: "success"
    },
    {
      tool: "cohorts.build",
      description: "Built 'High-Value Spenders' segment",
      time: "5m ago",
      status: "success"
    },
    {
      tool: "alerts.create",
      description: "Set up anomaly alert for DAU",
      time: "12m ago",
      status: "success"
    }
  ];

  const handleQuickAction = (query: string) => {
    setQuery(query);
  };

  const handleSend = () => {
    if (query.trim()) {
      // Handle query submission
      console.log("Sending query:", query);
      setQuery("");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary" />
            Insight Copilot
          </h1>
          <p className="text-muted-foreground mt-1">
            Your AI analytics assistant with tool calls, citations & confidence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-success">
            <CheckCircle className="w-3 h-3 mr-1" />
            Online
          </Badge>
          <Badge variant="secondary">
            GPT-4 Turbo
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent-purple" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-4 flex-col items-start text-left hover:bg-surface-elevated"
                    onClick={() => handleQuickAction(action.query)}
                  >
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      {action.icon}
                      <span className="font-medium">{action.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Input */}
          <Card className="bg-card border-card-border">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask anything about your players and events..."
                    className="pr-12 bg-surface-elevated border-input-border h-12"
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={handleSend}
                    disabled={!query.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleQuickAction("Show DAU by region")}>
                    Show DAU by region
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickAction("Analyze retention trends")}>
                    Analyze retention trends
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickAction("Find conversion bottlenecks")}>
                    Find conversion bottlenecks
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Conversations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentChats.map((chat) => (
                <div key={chat.id} className="p-3 bg-surface-elevated rounded-lg hover:bg-surface-overlay transition-smooth cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm">{chat.query}</p>
                    <Badge variant="outline" className="text-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {chat.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {chat.toolsUsed.map((tool) => (
                        <Badge key={tool} variant="secondary" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tool Registry */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Available Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span>events.query</span>
                  <Badge variant="outline" className="text-success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>charts.create</span>
                  <Badge variant="outline" className="text-success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>players.get</span>
                  <Badge variant="outline" className="text-success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>cohorts.build</span>
                  <Badge variant="outline" className="text-success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>journeys.mine</span>
                  <Badge variant="outline" className="text-success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>alerts.create</span>
                  <Badge variant="outline" className="text-success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>playbooks.compose</span>
                  <Badge variant="outline" className="text-success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>catalog.lookup</span>
                  <Badge variant="outline" className="text-success">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Tool Activity */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Tool Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {toolActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-2">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.tool}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Guardrails */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                AI Guardrails
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>PII masking enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Citations required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>No causal claims</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Confidence scoring</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}