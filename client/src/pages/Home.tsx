import { MetricCard } from "@/components/MetricCard";
import { InsightCard } from "@/components/InsightCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Activity, 
  DollarSign, 
  Clock,
  Search,
  Plus,
  Bell,
  Zap,
  BarChart3,
  TrendingUp
} from "lucide-react";

export default function Home() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Good morning! 👋</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your game today
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Alerts
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* Quick Search */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Ask anything about your players and events..."
          className="pl-10 bg-surface-elevated border-input-border"
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard
          title="Daily Active Users"
          value="24,781"
          change={{ value: "+12.3%", type: "increase", period: "vs yesterday" }}
          icon={<Users className="w-5 h-5" />}
        />
        <MetricCard
          title="Session Length (Avg)"
          value="18m 34s"
          change={{ value: "+2.1%", type: "increase", period: "vs last week" }}
          icon={<Clock className="w-5 h-5" />}
        />
        <MetricCard
          title="Revenue (24h)"
          value="$12,847"
          change={{ value: "-5.2%", type: "decrease", period: "vs yesterday" }}
          icon={<DollarSign className="w-5 h-5" />}
        />
        <MetricCard
          title="Retention D1"
          value="67.2%"
          change={{ value: "+1.8%", type: "increase", period: "vs last week" }}
          icon={<Activity className="w-5 h-5" />}
        />
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Key Insights</h2>
          <div className="space-y-4">
            <InsightCard
              type="anomaly"
              title="Unusual Drop in Asia-Pacific DAU"
              description="Daily active users in APAC region dropped 18% compared to the 7-day average. This coincides with a server maintenance window that lasted longer than expected."
              severity="medium"
            />
            <InsightCard
              type="trend"
              title="Weekend Session Length Increasing"
              description="Players are spending 23% more time in-game during weekends compared to weekdays. This trend started 3 weeks ago and is accelerating."
              severity="low"
            />
            <InsightCard
              type="driver"
              title="Level 12 Completion Bottleneck"
              description="Players are getting stuck at Level 12 more than usual. 34% higher failure rate compared to other levels. Consider difficulty adjustment."
              severity="medium"
            />
            <InsightCard
              type="trend"
              title="Mobile Revenue Growth"
              description="iOS platform showing 28% revenue increase over last 2 weeks, driven by improved in-app purchase flow."
              severity="low"
            />
            <InsightCard
              type="anomaly"
              title="European Market Expansion"
              description="Significant user acquisition spike in Germany and France following localization update. 45% increase in new registrations."
              severity="low"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
          <div className="bg-card border border-card-border rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border/20">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New cohort "High-Value Spenders" created</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago • Sarah M.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-3 border-b border-border/20">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">LTV prediction model updated for Q1 cohorts</p>
                  <p className="text-xs text-muted-foreground">45 minutes ago • System</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-3 border-b border-border/20">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Alert triggered: Revenue dip detected</p>
                  <p className="text-xs text-muted-foreground">2 hours ago • Alert System</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-3 border-b border-border/20">
                <div className="w-2 h-2 bg-accent-cyan rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Dashboard "Weekly KPIs" shared with team</p>
                  <p className="text-xs text-muted-foreground">3 hours ago • Mike R.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-3 border-b border-border/20">
                <div className="w-2 h-2 bg-accent-purple rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Player segment "At-Risk Users" reached 1.2K members</p>
                  <p className="text-xs text-muted-foreground">4 hours ago • Cohort Builder</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Export completed: Player data Q4 analysis</p>
                  <p className="text-xs text-muted-foreground">5 hours ago • Tom B.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-card-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-auto p-4 flex-col items-start">
            <BarChart3 className="w-6 h-6 mb-2 text-primary" />
            <div className="text-left">
              <div className="font-medium">Analyze Retention</div>
              <div className="text-sm text-muted-foreground">Deep dive into player retention patterns</div>
            </div>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col items-start">
            <Users className="w-6 h-6 mb-2 text-accent-cyan" />
            <div className="text-left">
              <div className="font-medium">Build Cohort</div>
              <div className="text-sm text-muted-foreground">Create targeted player segments</div>
            </div>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col items-start">
            <TrendingUp className="w-6 h-6 mb-2 text-accent-purple" />
            <div className="text-left">
              <div className="font-medium">Predict LTV</div>
              <div className="text-sm text-muted-foreground">Forecast player lifetime value</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}