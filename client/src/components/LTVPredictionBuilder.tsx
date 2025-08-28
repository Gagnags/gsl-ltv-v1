import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator,
  Calendar,
  Filter,
  Settings,
  Target,
  TrendingUp,
  Users,
  Clock,
  DollarSign
} from "lucide-react";

const predictionWindows = [
  { value: "30d", label: "30 Days", description: "Short-term prediction" },
  { value: "90d", label: "90 Days", description: "Standard LTV window" },
  { value: "180d", label: "180 Days", description: "Long-term forecast" },
  { value: "1y", label: "1 Year", description: "Annual prediction" }
];

const lookbackWindows = [
  { value: "3d", label: "First 3 Days", description: "Early behavior signals" },
  { value: "7d", label: "First 7 Days", description: "Standard onboarding window" },
  { value: "14d", label: "First 14 Days", description: "Extended early period" },
  { value: "30d", label: "First 30 Days", description: "Full month analysis" }
];

const modelTypes = [
  { value: "linear", label: "Linear Regression", description: "Fast, interpretable baseline" },
  { value: "gradient", label: "Gradient Boosting", description: "Balanced accuracy and speed" },
  { value: "neural", label: "Neural Network", description: "Highest accuracy, slower training" }
];

export const LTVPredictionBuilder = () => {
  const [predictionWindow, setPredictionWindow] = useState("90d");
  const [lookbackWindow, setLookbackWindow] = useState("7d");
  const [modelType, setModelType] = useState("gradient");
  const [minSessionCount, setMinSessionCount] = useState("3");
  const [excludeTestUsers, setExcludeTestUsers] = useState(true);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Calculator className="w-6 h-6 text-primary" />
          <div>
            <CardTitle>LTV Prediction Builder</CardTitle>
            <CardDescription>Configure model parameters and prediction settings</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prediction Horizon */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Target className="w-4 h-4" />
            Prediction Horizon
          </Label>
          <Select value={predictionWindow} onValueChange={setPredictionWindow}>
            <SelectTrigger>
              <SelectValue placeholder="Select prediction window" />
            </SelectTrigger>
            <SelectContent>
              {predictionWindows.map((window) => (
                <SelectItem key={window.value} value={window.value}>
                  <div>
                    <div className="font-medium">{window.label}</div>
                    <div className="text-xs text-muted-foreground">{window.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Time period for which to predict future player value
          </p>
        </div>

        <Separator />

        {/* Historical Lookback */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="w-4 h-4" />
            Historical Lookback Window
          </Label>
          <Select value={lookbackWindow} onValueChange={setLookbackWindow}>
            <SelectTrigger>
              <SelectValue placeholder="Select lookback period" />
            </SelectTrigger>
            <SelectContent>
              {lookbackWindows.map((window) => (
                <SelectItem key={window.value} value={window.value}>
                  <div>
                    <div className="font-medium">{window.label}</div>
                    <div className="text-xs text-muted-foreground">{window.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Initial player data period used for predictions
          </p>
        </div>

        <Separator />

        {/* Model Configuration */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Settings className="w-4 h-4" />
            Model Type
          </Label>
          <Select value={modelType} onValueChange={setModelType}>
            <SelectTrigger>
              <SelectValue placeholder="Select model type" />
            </SelectTrigger>
            <SelectContent>
              {modelTypes.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  <div>
                    <div className="font-medium">{model.label}</div>
                    <div className="text-xs text-muted-foreground">{model.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Data Filters */}
        <div className="space-y-4">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Filter className="w-4 h-4" />
            Data Filters
          </Label>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="min-sessions" className="text-sm">Minimum Session Count</Label>
              <Input
                id="min-sessions"
                type="number"
                value={minSessionCount}
                onChange={(e) => setMinSessionCount(e.target.value)}
                className="mt-1"
                min="1"
                max="100"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Players must have at least this many sessions
              </p>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <div className="text-sm font-medium">Exclude Test Users</div>
                <div className="text-xs text-muted-foreground">Filter out internal testing accounts</div>
              </div>
              <Button
                variant={excludeTestUsers ? "default" : "outline"}
                size="sm"
                onClick={() => setExcludeTestUsers(!excludeTestUsers)}
              >
                {excludeTestUsers ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Configuration Summary */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Configuration Summary</Label>
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Target className="w-4 h-4 text-primary" />
              <span>Predicting {predictionWindow} LTV using {lookbackWindow} of data</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-accent-cyan" />
              <span>Model: {modelTypes.find(m => m.value === modelType)?.label}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-accent-purple" />
              <span>Min {minSessionCount} sessions • {excludeTestUsers ? 'Excluding' : 'Including'} test users</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button className="flex-1">
            <Calculator className="w-4 h-4 mr-2" />
            Run Prediction
          </Button>
          <Button variant="outline">
            <Clock className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};