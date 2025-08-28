import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  TrendingUp, 
  RefreshCw, 
  ChevronDown, 
  ChevronRight,
  ExternalLink,
  Settings,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

export default function LTVAdvanced() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Mock alerts data
  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Tag Performance Alert",
      description: "subscription_billed tag has stopped firing for 3 days",
      severity: "medium",
      timestamp: "2 hours ago",
      affectedUsers: 1247
    },
    {
      id: 2,
      type: "error",
      title: "Data Quality Issue",
      description: "iap_purchase_success payload validation failed",
      severity: "high",
      timestamp: "5 hours ago",
      affectedUsers: 892
    },
    {
      id: 3,
      type: "info",
      title: "Model Update Available",
      description: "New LTV prediction model v2.1 ready for deployment",
      severity: "low",
      timestamp: "1 day ago",
      affectedUsers: 0
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "info":
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Build Custom LTV Prediction (Advanced)
          </h1>
          <p className="text-muted-foreground mt-1">
            Define cohorts, horizons, and inputs. Full results and performance views.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="default" size="sm">
            <Target className="w-4 h-4 mr-2" />
            Run Prediction
          </Button>
        </div>
      </div>

      {/* Alerts Section - Fills the empty space */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              System Alerts
            </CardTitle>
            <CardDescription>
              Monitor tag performance and data quality issues
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                {getAlertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{alert.title}</h4>
                    <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {alert.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{alert.timestamp}</span>
                    {alert.affectedUsers > 0 && (
                      <span>{alert.affectedUsers.toLocaleString()} users affected</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <CheckCircle className="w-4 h-4 mr-2" />
              Validate All Tags
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Model Performance
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Check Data Quality
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Overall LTV (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$4.87</div>
            <p className="text-sm text-muted-foreground mt-1">
              +12.3% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Payer LTV (30d)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">$12.34</div>
            <p className="text-sm text-muted-foreground mt-1">
              +8.7% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Model Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="text-sm text-muted-foreground">Average Model Accuracy</div>
              <div className="text-2xl font-bold text-foreground">77.4%</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Average AUC-ROC Score</div>
              <div className="text-2xl font-bold text-foreground">84.5%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced LTV Builder - Collapsed by Default */}
      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Advanced LTV Configuration</span>
            {isAdvancedOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cohort Definition</CardTitle>
              <CardDescription>
                Define user segments for LTV prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">User Type</label>
                  <select className="w-full mt-1 border rounded px-3 py-2 bg-background">
                    <option>All Users</option>
                    <option>New Users</option>
                    <option>Returning Users</option>
                    <option>High Value Users</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Platform</label>
                  <select className="w-full mt-1 border rounded px-3 py-2 bg-background">
                    <option>All Platforms</option>
                    <option>iOS</option>
                    <option>Android</option>
                    <option>Web</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prediction Horizon</CardTitle>
              <CardDescription>
                Set the time period for LTV forecasting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Days to Predict</label>
                  <input
                    type="number"
                    className="w-full mt-1 border rounded px-3 py-2 bg-background"
                    placeholder="30"
                    min="1"
                    max="365"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Confidence Level</label>
                  <select className="w-full mt-1 border rounded px-3 py-2 bg-background">
                    <option>95%</option>
                    <option>90%</option>
                    <option>80%</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}