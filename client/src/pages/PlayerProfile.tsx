import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Search,
  MapPin,
  Smartphone,
  Clock,
  DollarSign,
  Trophy,
  Activity,
  ShoppingCart,
  Gamepad2,
  TrendingUp,
  Lightbulb,
  Calendar,
  Zap,
  Target
} from "lucide-react";

const samplePlayer = {
  id: "player_98342",
  name: "Anonymous Player",
  lastSeen: "2 hours ago",
  xpLevel: 24,
  country: "United States",
  platform: "iOS",
  sessionCount: 127,
  avgSessionLength: "23m 14s",
  totalRevenue: 89.97,
  joinDate: "Jan 15, 2024",
  totalSessions: 127,
  avgSessionsPerDay: 3.2,
  longestSession: "1h 47m",
  preferredPlayTime: "Evening (7-10 PM)",
  currentStreak: "5 days",
  highestLevel: 24,
  levelsCompleted: 23,
  avgLevelTime: "2h 15m"
};

const nextBestActions = [
  {
    title: "Offer Soft Currency Bundle",
    description: "Player has failed Level 12 twice. Similar players respond well to currency offers.",
    impact: "+12% conversion",
    reasoning: "Based on 2,341 similar player patterns",
    priority: "High"
  },
  {
    title: "Send Social Feature Nudge",
    description: "Player hasn't used multiplayer features. They're in a social-active cohort.",
    impact: "+18% retention",
    reasoning: "91% of similar players engage when prompted",
    priority: "Medium"
  },
  {
    title: "Weekly Challenge Invitation",
    description: "Player shows consistent engagement patterns. Weekly challenges boost long-term retention.",
    impact: "+8% weekly retention",
    reasoning: "Strong correlation with play frequency",
    priority: "Medium"
  },
  {
    title: "Premium Content Preview",
    description: "High-engagement player ready for premium features based on progression speed.",
    impact: "+15% monetization",
    reasoning: "Level 20+ players show 3x conversion rate",
    priority: "High"
  }
];

const purchaseHistory = [
  { date: "Jan 16", item: "Golden Chest Pack", amount: 9.99, currency: "USD", status: "completed" },
  { date: "Jan 14", item: "Power-up Bundle", amount: 4.99, currency: "USD", status: "completed" },
  { date: "Jan 10", item: "Extra Lives x10", amount: 2.99, currency: "USD", status: "completed" },
  { date: "Jan 8", item: "Starter Pack", amount: 19.99, currency: "USD", status: "completed" },
  { date: "Jan 5", item: "Speed Boost Pack", amount: 1.99, currency: "USD", status: "completed" },
];

const sessionHistory = [
  { date: "Jan 16", duration: "28m", levels: 2, purchases: 1, events: 45 },
  { date: "Jan 16", duration: "15m", levels: 1, purchases: 0, events: 23 },
  { date: "Jan 15", duration: "42m", levels: 3, purchases: 1, events: 67 },
  { date: "Jan 15", duration: "19m", levels: 1, purchases: 0, events: 31 },
  { date: "Jan 14", duration: "33m", levels: 2, purchases: 2, events: 54 },
];

const progressionMilestones = [
  { level: 24, date: "Jan 16", attempts: 1, timeSpent: "1h 23m", difficulty: "Hard" },
  { level: 23, date: "Jan 15", attempts: 2, timeSpent: "2h 45m", difficulty: "Medium" },
  { level: 22, date: "Jan 14", attempts: 1, timeSpent: "45m", difficulty: "Medium" },
  { level: 21, date: "Jan 13", attempts: 3, timeSpent: "3h 12m", difficulty: "Hard" },
  { level: 20, date: "Jan 12", attempts: 1, timeSpent: "52m", difficulty: "Easy" },
];

const recentEvents = [
  { type: "level_fail", details: "Failed Level 25 (1st attempt)", time: "2 hours ago", severity: "warning" },
  { type: "session_end", details: "Session lasted 28 minutes", time: "2 hours ago", severity: "normal" },
  { type: "item_purchase", details: "Bought Golden Chest Pack", time: "3 hours ago", severity: "positive" },
  { type: "level_complete", details: "Completed Level 24", time: "3 hours ago", severity: "positive" },
  { type: "social_connect", details: "Connected Facebook account", time: "5 hours ago", severity: "positive" },
  { type: "session_start", details: "Started new session", time: "5 hours ago", severity: "normal" },
];

export default function PlayerProfile() {
  const [searchTerm, setSearchTerm] = useState("player_98342");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            Player 360
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive player profiles with detailed analytics
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by Player ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Player Header */}
      <div className="bg-card border border-card-border rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
              {samplePlayer.xpLevel}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{samplePlayer.id}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Last seen {samplePlayer.lastSeen}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {samplePlayer.country}
                </div>
                <div className="flex items-center gap-1">
                  <Smartphone className="w-4 h-4" />
                  {samplePlayer.platform}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Player since</div>
            <div className="font-medium">{samplePlayer.joinDate}</div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <MetricCard
          title="Total Sessions"
          value={samplePlayer.sessionCount.toString()}
          icon={<Activity className="w-5 h-5" />}
        />
        <MetricCard
          title="Avg Session Length"
          value={samplePlayer.avgSessionLength}
          icon={<Clock className="w-5 h-5" />}
        />
        <MetricCard
          title="Total Revenue"
          value={`$${samplePlayer.totalRevenue}`}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <MetricCard
          title="Current Level"
          value={samplePlayer.xpLevel.toString()}
          icon={<Trophy className="w-5 h-5" />}
        />
        <MetricCard
          title="Predicted LTV (90d)"
          value="$12.45"
          change={{ value: "+8.2%", type: "increase", period: "vs baseline" }}
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="progression">Progression</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Player Summary */}
            <div className="bg-card border border-card-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Player Summary
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Play Streak</p>
                    <p className="text-lg font-semibold text-foreground">{samplePlayer.currentStreak}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sessions/Day</p>
                    <p className="text-lg font-semibold text-foreground">{samplePlayer.avgSessionsPerDay}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Longest Session</p>
                    <p className="text-lg font-semibold text-foreground">{samplePlayer.longestSession}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Preferred Time</p>
                    <p className="text-lg font-semibold text-foreground">{samplePlayer.preferredPlayTime}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This player shows <span className="text-foreground font-medium">high engagement</span> with 
                    above-average session lengths and consistent daily activity. Currently progressing through 
                    mid-tier content with moderate spending patterns.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Best Actions */}
            <div className="bg-card border border-card-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent-cyan" />
                Next Best Actions
              </h3>
              <div className="space-y-4">
                {nextBestActions.map((action, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{action.title}</h4>
                      <Badge variant={action.priority === "High" ? "default" : "secondary"} className="text-xs">
                        {action.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-success">{action.impact}</span>
                      <span className="text-muted-foreground">{action.reasoning}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <div className="bg-card border border-card-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Events</h3>
            <div className="space-y-3">
              {recentEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-3 py-3 border-b border-border/20 last:border-0">
                  <div className={`w-2 h-2 rounded-full ${
                    event.severity === "positive" ? "bg-success" :
                    event.severity === "warning" ? "bg-warning" :
                    "bg-muted-foreground"
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{event.details}</span>
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">{event.type.replace('_', ' ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="purchases">
          <div className="bg-card border border-card-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Purchase History
            </h3>
            <div className="space-y-3">
              {purchaseHistory.map((purchase, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-surface-elevated rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{purchase.item}</p>
                      <p className="text-sm text-muted-foreground">{purchase.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${purchase.amount}</p>
                    <Badge variant="secondary" className="text-xs">{purchase.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-xl font-bold text-foreground">${samplePlayer.totalRevenue}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Purchase</p>
                  <p className="text-xl font-bold text-foreground">$9.59</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Purchase Frequency</p>
                  <p className="text-xl font-bold text-foreground">2.3 days</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sessions">
          <div className="bg-card border border-card-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Session History
            </h3>
            <div className="space-y-3">
              {sessionHistory.map((session, index) => (
                <div key={index} className="p-4 bg-surface-elevated rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{session.date}</span>
                    <span className="text-sm font-semibold text-primary">{session.duration}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Levels: </span>
                      <span className="font-medium">{session.levels}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Purchases: </span>
                      <span className="font-medium">{session.purchases}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Events: </span>
                      <span className="font-medium">{session.events}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="progression">
          <div className="bg-card border border-card-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Level Progression
            </h3>
            <div className="space-y-4">
              {progressionMilestones.map((milestone, index) => (
                <div key={index} className="p-4 bg-surface-elevated rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                        {milestone.level}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Level {milestone.level}</p>
                        <p className="text-sm text-muted-foreground">{milestone.date}</p>
                      </div>
                    </div>
                    <Badge variant={milestone.difficulty === "Hard" ? "destructive" : milestone.difficulty === "Medium" ? "secondary" : "default"}>
                      {milestone.difficulty}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Attempts: </span>
                      <span className="font-medium">{milestone.attempts}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Time Spent: </span>
                      <span className="font-medium">{milestone.timeSpent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                  <p className="text-xl font-bold text-foreground">{samplePlayer.xpLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-xl font-bold text-foreground">{samplePlayer.levelsCompleted}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Time/Level</p>
                  <p className="text-xl font-bold text-foreground">{samplePlayer.avgLevelTime}</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}