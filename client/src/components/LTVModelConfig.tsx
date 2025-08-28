import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Calendar, 
  Target,
  Brain,
  Clock,
  TrendingUp,
  AlertCircle,
  Info
} from "lucide-react";

interface ModelConfig {
  lookbackWindow: string;
  predictionHorizon: string;
  refreshFrequency: string;
  includeAttributes: string[];
  includeEvents: string[];
  autoRefresh: boolean;
}

const lookbackOptions = [
  { value: "3d", label: "3 Days", description: "Minimal data, fast predictions" },
  { value: "7d", label: "7 Days", description: "Recommended for most use cases" },
  { value: "14d", label: "14 Days", description: "More stable, higher accuracy" },
  { value: "30d", label: "30 Days", description: "Maximum accuracy, slower updates" },
];

const horizonOptions = [
  { value: "30d", label: "30-Day LTV", description: "Short-term value prediction" },
  { value: "90d", label: "90-Day LTV", description: "Standard business horizon" },
  { value: "180d", label: "180-Day LTV", description: "Long-term strategic planning" },
];

const refreshOptions = [
  { value: "6h", label: "Every 6 Hours" },
  { value: "12h", label: "Every 12 Hours" },
  { value: "24h", label: "Daily (Recommended)" },
  { value: "48h", label: "Every 2 Days" },
];

const coreAttributes = [
  { id: "total_sessions", name: "Total Sessions", impact: "high", enabled: true },
  { id: "xp_level", name: "XP Level", impact: "high", enabled: true },
  { id: "total_iap_revenue", name: "Total IAP Revenue", impact: "high", enabled: true },
  { id: "avg_session_length", name: "Avg Session Length", impact: "medium", enabled: true },
  { id: "country", name: "Country", impact: "medium", enabled: false },
  { id: "platform", name: "Platform", impact: "low", enabled: false },
];

const coreEvents = [
  { id: "tutorial_complete", name: "Tutorial Complete", impact: "high", enabled: true },
  { id: "first_purchase", name: "First Purchase", impact: "high", enabled: true },
  { id: "level_up", name: "Level Up", impact: "medium", enabled: true },
  { id: "social_connect", name: "Social Connect", impact: "medium", enabled: false },
  { id: "support_ticket", name: "Support Ticket", impact: "low", enabled: false },
];

export const LTVModelConfig = () => {
  const [config, setConfig] = useState<ModelConfig>({
    lookbackWindow: "7d",
    predictionHorizon: "90d", 
    refreshFrequency: "24h",
    includeAttributes: coreAttributes.filter(attr => attr.enabled).map(attr => attr.id),
    includeEvents: coreEvents.filter(event => event.enabled).map(event => event.id),
    autoRefresh: true
  });

  const [estimatedAccuracy, setEstimatedAccuracy] = useState(87.3);
  const [estimatedLatency, setEstimatedLatency] = useState("~15 min");

  const updateConfig = (field: keyof ModelConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const toggleAttribute = (id: string, enabled: boolean) => {
    const newAttributes = enabled 
      ? [...config.includeAttributes, id]
      : config.includeAttributes.filter(attr => attr !== id);
    updateConfig("includeAttributes", newAttributes);
  };

  const toggleEvent = (id: string, enabled: boolean) => {
    const newEvents = enabled 
      ? [...config.includeEvents, id]
      : config.includeEvents.filter(event => event !== id);
    updateConfig("includeEvents", newEvents);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Model Configuration
        </CardTitle>
        <CardDescription>
          Configure prediction parameters and model inputs for optimal accuracy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Time Windows */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Time Windows</Label>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="lookback" className="text-sm">Historical Lookback Window</Label>
              <Select 
                value={config.lookbackWindow} 
                onValueChange={(value) => updateConfig("lookbackWindow", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lookbackOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="horizon" className="text-sm">Prediction Horizon</Label>
              <Select 
                value={config.predictionHorizon} 
                onValueChange={(value) => updateConfig("predictionHorizon", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {horizonOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Model Inputs */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Model Inputs</Label>
          
          {/* Core Attributes */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4" />
              <Label className="text-sm font-medium">Player Attributes</Label>
            </div>
            <div className="space-y-2">
              {coreAttributes.map((attr) => (
                <div key={attr.id} className="flex items-center justify-between p-2 border border-border rounded">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={config.includeAttributes.includes(attr.id)}
                      onCheckedChange={(checked) => toggleAttribute(attr.id, checked)}
                    />
                    <span className="text-sm">{attr.name}</span>
                    <Badge 
                      variant={
                        attr.impact === "high" ? "default" : 
                        attr.impact === "medium" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {attr.impact} impact
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Events */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4" />
              <Label className="text-sm font-medium">Player Events</Label>
            </div>
            <div className="space-y-2">
              {coreEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-2 border border-border rounded">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={config.includeEvents.includes(event.id)}
                      onCheckedChange={(checked) => toggleEvent(event.id, checked)}
                    />
                    <span className="text-sm">{event.name}</span>
                    <Badge 
                      variant={
                        event.impact === "high" ? "default" : 
                        event.impact === "medium" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {event.impact} impact
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Refresh Settings */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Refresh Settings</Label>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="refresh" className="text-sm">Refresh Frequency</Label>
              <Select 
                value={config.refreshFrequency} 
                onValueChange={(value) => updateConfig("refreshFrequency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {refreshOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm">Auto-refresh predictions</Label>
                <p className="text-xs text-muted-foreground">Automatically update predictions on schedule</p>
              </div>
              <Switch
                checked={config.autoRefresh}
                onCheckedChange={(checked) => updateConfig("autoRefresh", checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Performance Estimates */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Performance Estimates</Label>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-accent/30 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Estimated Accuracy</span>
              </div>
              <p className="text-lg font-bold text-primary">{estimatedAccuracy}%</p>
              <p className="text-xs text-muted-foreground">Based on current config</p>
            </div>
            
            <div className="p-3 bg-accent/30 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Processing Time</span>
              </div>
              <p className="text-lg font-bold text-primary">{estimatedLatency}</p>
              <p className="text-xs text-muted-foreground">Per prediction run</p>
            </div>
          </div>
          
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">Configuration Impact</p>
                <p className="text-xs text-muted-foreground">
                  Longer lookback windows increase accuracy but reduce processing speed. 
                  Consider your use case when selecting time windows.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button className="flex-1">
            <Brain className="w-4 h-4 mr-2" />
            Run Prediction
          </Button>
          <Button variant="outline">
            <Info className="w-4 h-4 mr-2" />
            Test Config
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};