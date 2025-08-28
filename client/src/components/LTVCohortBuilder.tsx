import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Plus, 
  X, 
  Target,
  Filter,
  Sparkles
} from "lucide-react";

interface CohortRule {
  id: string;
  field: string;
  operator: string;
  value: string;
  type: "attribute" | "event";
}

const sampleAttributes = [
  { value: "country", label: "Country", type: "attribute" },
  { value: "acquisition_channel", label: "Acquisition Channel", type: "attribute" },
  { value: "xp_level", label: "XP Level", type: "attribute" },
  { value: "total_sessions", label: "Total Sessions", type: "attribute" },
  { value: "total_iap_revenue", label: "Total IAP Revenue", type: "attribute" },
];

const sampleEvents = [
  { value: "tutorial_complete", label: "Tutorial Complete", type: "event" },
  { value: "first_purchase", label: "First Purchase", type: "event" },
  { value: "level_fail", label: "Level Fail", type: "event" },
  { value: "support_ticket", label: "Support Ticket", type: "event" },
  { value: "social_connect", label: "Social Connect", type: "event" },
];

const operators = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not Equals" },
  { value: "greater_than", label: "Greater Than" },
  { value: "less_than", label: "Less Than" },
  { value: "contains", label: "Contains" },
  { value: "in", label: "In" },
];

export const LTVCohortBuilder = () => {
  const [cohortName, setCohortName] = useState("");
  const [includeRules, setIncludeRules] = useState<CohortRule[]>([
    { id: "1", field: "", operator: "", value: "", type: "attribute" }
  ]);
  const [excludeRules, setExcludeRules] = useState<CohortRule[]>([]);
  const [estimatedSize, setEstimatedSize] = useState(45600);

  const addRule = (type: "include" | "exclude") => {
    const newRule: CohortRule = {
      id: Math.random().toString(36).substr(2, 9),
      field: "",
      operator: "",
      value: "",
      type: "attribute"
    };

    if (type === "include") {
      setIncludeRules([...includeRules, newRule]);
    } else {
      setExcludeRules([...excludeRules, newRule]);
    }
  };

  const removeRule = (id: string, type: "include" | "exclude") => {
    if (type === "include") {
      setIncludeRules(includeRules.filter(rule => rule.id !== id));
    } else {
      setExcludeRules(excludeRules.filter(rule => rule.id !== id));
    }
  };

  const updateRule = (id: string, field: keyof CohortRule, value: string, type: "include" | "exclude") => {
    const updateRules = (rules: CohortRule[]) =>
      rules.map(rule => rule.id === id ? { ...rule, [field]: value } : rule);

    if (type === "include") {
      setIncludeRules(updateRules(includeRules));
    } else {
      setExcludeRules(updateRules(excludeRules));
    }
  };

  const suggestedCohorts = [
    "High spenders from last week",
    "Players stuck at level 12", 
    "Tutorial completers, no purchase",
    "Social connectors with 3+ sessions",
    "Churned players from Facebook ads"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          LTV Cohort Definition
        </CardTitle>
        <CardDescription>
          Define the player audience for LTV prediction using attributes and events
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cohort Name */}
        <div className="space-y-2">
          <Label htmlFor="cohortName">Cohort Name</Label>
          <Input
            id="cohortName"
            placeholder="e.g., US Facebook High-Value Prospects"
            value={cohortName}
            onChange={(e) => setCohortName(e.target.value)}
          />
        </div>

        {/* Include Rules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Include Players Where</Label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addRule("include")}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Rule
            </Button>
          </div>

          <div className="space-y-3">
            {includeRules.map((rule, index) => (
              <div key={rule.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                {index > 0 && (
                  <Badge variant="secondary" className="text-xs">AND</Badge>
                )}
                
                <Select 
                  value={rule.field} 
                  onValueChange={(value) => updateRule(rule.id, "field", value, "include")}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="p-2">
                      <p className="text-xs text-muted-foreground mb-2">Player Attributes</p>
                      {sampleAttributes.map((attr) => (
                        <SelectItem key={attr.value} value={attr.value}>
                          {attr.label}
                        </SelectItem>
                      ))}
                    </div>
                    <Separator />
                    <div className="p-2">
                      <p className="text-xs text-muted-foreground mb-2">Player Events</p>
                      {sampleEvents.map((event) => (
                        <SelectItem key={event.value} value={event.value}>
                          {event.label}
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>

                <Select 
                  value={rule.operator} 
                  onValueChange={(value) => updateRule(rule.id, "operator", value, "include")}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Operator" />
                  </SelectTrigger>
                  <SelectContent>
                    {operators.map((op) => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Value"
                  value={rule.value}
                  onChange={(e) => updateRule(rule.id, "value", e.target.value, "include")}
                  className="flex-1"
                />

                {includeRules.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRule(rule.id, "include")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Exclude Rules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Exclude Players Where</Label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => addRule("exclude")}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Exclusion
            </Button>
          </div>

          {excludeRules.length > 0 && (
            <div className="space-y-3">
              {excludeRules.map((rule, index) => (
                <div key={rule.id} className="flex items-center gap-3 p-3 border border-destructive/20 rounded-lg bg-destructive/5">
                  {index > 0 && (
                    <Badge variant="outline" className="text-xs">AND</Badge>
                  )}
                  
                  <Select 
                    value={rule.field} 
                    onValueChange={(value) => updateRule(rule.id, "field", value, "exclude")}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="p-2">
                        <p className="text-xs text-muted-foreground mb-2">Player Attributes</p>
                        {sampleAttributes.map((attr) => (
                          <SelectItem key={attr.value} value={attr.value}>
                            {attr.label}
                          </SelectItem>
                        ))}
                      </div>
                      <Separator />
                      <div className="p-2">
                        <p className="text-xs text-muted-foreground mb-2">Player Events</p>
                        {sampleEvents.map((event) => (
                          <SelectItem key={event.value} value={event.value}>
                            {event.label}
                          </SelectItem>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>

                  <Select 
                    value={rule.operator} 
                    onValueChange={(value) => updateRule(rule.id, "operator", value, "exclude")}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      {operators.map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Value"
                    value={rule.value}
                    onChange={(e) => updateRule(rule.id, "value", e.target.value, "exclude")}
                    className="flex-1"
                  />

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRule(rule.id, "exclude")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Estimated Size */}
        <div className="p-4 bg-accent/30 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-medium">Estimated Cohort Size</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{estimatedSize.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">players</p>
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <Label className="text-sm font-medium">AI Suggested Cohorts</Label>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {suggestedCohorts.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start h-auto p-3 text-left"
                onClick={() => setCohortName(suggestion)}
              >
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{suggestion}</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};