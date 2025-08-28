import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Activity,
  Zap,
  Filter,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  ArrowRight,
  Shield
} from "lucide-react";

export default function Playbooks() {
  const [selectedTab, setSelectedTab] = useState("runs");

  // Mock playbook data
  const playbooks = [
    {
      id: 1,
      name: "Weekly Retention Check",
      description: "Monitor D1/D7 retention and alert if below threshold",
      status: "active",
      lastRun: "2 hours ago",
      nextRun: "In 22 hours",
      successRate: 94.2,
      trigger: "Schedule: Daily at 9:00 AM",
      actions: ["Query retention metrics", "Compare to baseline", "Send Slack alert if anomaly"]
    },
    {
      id: 2,
      name: "High-Value Player Tagging",
      description: "Auto-tag players who spend >$100 in 7 days",
      status: "active",
      lastRun: "15 minutes ago",
      nextRun: "In 15 minutes",
      successRate: 100,
      trigger: "Event: purchase_complete",
      actions: ["Calculate 7d spend", "Tag as high-value", "Add to VIP cohort"]
    },
    {
      id: 3,
      name: "Level 12 Stuck Players",
      description: "Identify and assist players failing Level 12 repeatedly",
      status: "paused",
      lastRun: "Yesterday",
      nextRun: "Paused",
      successRate: 87.5,
      trigger: "Event: level_fail (level=12, count>=3)",
      actions: ["Add to cohort", "Grant soft currency", "Send encouragement notification"]
    }
  ];

  // Mock run history
  const runHistory = [
    {
      id: 1,
      playbook: "Weekly Retention Check",
      status: "success",
      timestamp: "2 hours ago",
      duration: "2.3s",
      actions: 3,
      affected: 12847
    },
    {
      id: 2,
      playbook: "High-Value Player Tagging",
      status: "success",
      timestamp: "15 minutes ago",
      duration: "0.8s",
      actions: 2,
      affected: 23
    },
    {
      id: 3,
      playbook: "Level 12 Stuck Players",
      status: "warning",
      timestamp: "Yesterday",
      duration: "1.2s",
      actions: 2,
      affected: 156,
      warning: "Blast radius exceeded safe limit"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Playbooks</h1>
          <p className="text-muted-foreground mt-1">
            Automate your analytics workflows with triggers and actions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Playbook
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="runs">Active Runs</TabsTrigger>
          <TabsTrigger value="library">Playbook Library</TabsTrigger>
          <TabsTrigger value="composer">Composer</TabsTrigger>
        </TabsList>

        <TabsContent value="runs" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search playbook runs..."
                className="pl-10 bg-surface-elevated border-input-border"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Run History */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Recent Runs</h2>
            <div className="space-y-3">
              {runHistory.map((run) => (
                <Card key={run.id} className="bg-card border-card-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {run.status === 'success' && <CheckCircle className="w-5 h-5 text-success" />}
                          {run.status === 'warning' && <AlertTriangle className="w-5 h-5 text-warning" />}
                          <div>
                            <p className="font-medium">{run.playbook}</p>
                            <p className="text-sm text-muted-foreground">{run.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {run.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="w-4 h-4" />
                            {run.actions} actions
                          </div>
                          <div>
                            {run.affected.toLocaleString()} affected
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                    {run.warning && (
                      <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded text-sm text-warning-foreground">
                        <strong>Warning:</strong> {run.warning}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          {/* Playbook Library */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Your Playbooks</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-success">
                  {playbooks.filter(p => p.status === 'active').length} Active
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  {playbooks.filter(p => p.status === 'paused').length} Paused
                </Badge>
              </div>
            </div>
            
            <div className="grid gap-4">
              {playbooks.map((playbook) => (
                <Card key={playbook.id} className="bg-card border-card-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{playbook.name}</h3>
                          <Badge variant={playbook.status === 'active' ? 'default' : 'secondary'}>
                            {playbook.status}
                          </Badge>
                          <Badge variant="outline" className="text-success">
                            {playbook.successRate}% success
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{playbook.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Last run:</span> {playbook.lastRun}
                          </div>
                          <div>
                            <span className="font-medium">Next run:</span> {playbook.nextRun}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={playbook.status === 'active' ? 'text-warning' : 'text-success'}
                        >
                          {playbook.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Trigger:</p>
                        <p className="text-sm text-muted-foreground">{playbook.trigger}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Actions:</p>
                        <div className="flex items-center gap-2 overflow-x-auto">
                          {playbook.actions.map((action, index) => (
                            <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                              <Badge variant="secondary" className="text-xs">
                                {action}
                              </Badge>
                              {index < playbook.actions.length - 1 && (
                                <ArrowRight className="w-3 h-3 text-muted-foreground" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="composer" className="space-y-6">
          {/* Playbook Composer */}
          <Card className="bg-card border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent-purple" />
                Playbook Composer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Playbook Name</label>
                  <Input placeholder="e.g., Weekly Retention Alert" className="bg-surface-elevated" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Input placeholder="Brief description of what this playbook does" className="bg-surface-elevated" />
                </div>
              </div>

              {/* Trigger Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</div>
                  Trigger
                </h3>
                <div className="p-4 bg-surface-elevated rounded-lg">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose trigger type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="schedule">Schedule (Time-based)</SelectItem>
                      <SelectItem value="event">Event (Data-driven)</SelectItem>
                      <SelectItem value="metric">Metric Threshold</SelectItem>
                      <SelectItem value="anomaly">Anomaly Detection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Conditions Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</div>
                  Conditions
                </h3>
                <div className="p-4 bg-surface-elevated rounded-lg">
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Condition
                  </Button>
                </div>
              </div>

              {/* Actions Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</div>
                  Actions
                </h3>
                <div className="p-4 bg-surface-elevated rounded-lg space-y-3">
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Action
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Available actions: Send notification, Update cohort, Create alert, Execute webhook, Generate report
                  </div>
                </div>
              </div>

              {/* Safeguards Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">4</div>
                  Safeguards
                  <Shield className="w-4 h-4 text-warning" />
                </h3>
                <div className="p-4 bg-surface-elevated rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Max affected users per run:</span>
                      <Input type="number" placeholder="1000" className="w-24 h-8" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cooldown period:</span>
                      <Select>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="1 hour" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15m">15 minutes</SelectItem>
                          <SelectItem value="1h">1 hour</SelectItem>
                          <SelectItem value="24h">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4">
                <Button>
                  <Play className="w-4 h-4 mr-2" />
                  Dry Run
                </Button>
                <Button variant="outline">
                  Save Draft
                </Button>
                <Button variant="outline">
                  Publish
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}