import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Users, Target, Filter } from "lucide-react";

interface CohortRule {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export function LTVCohortBuilder() {
  const [cohortName, setCohortName] = useState("");
  const [rules, setRules] = useState<CohortRule[]>([]);
  const [excludeTestUsers, setExcludeTestUsers] = useState(true);
  const [estimatedSize, setEstimatedSize] = useState(0);

  const availableFields = [
    { value: "total_sessions", label: "Total Sessions", type: "number" },
    { value: "total_iap_spend", label: "Total IAP Spend", type: "currency" },
    { value: "platform", label: "Platform", type: "select" },
    { value: "region", label: "Region", type: "select" },
    { value: "user_type", label: "User Type", type: "select" },
    { value: "feature_usage", label: "Feature Usage", type: "select" },
    { value: "engagement_pattern", label: "Engagement Pattern", type: "select" },
    { value: "purchase_history", label: "Purchase History", type: "select" }
  ];

  const operators = [
    { value: "gt", label: "Greater than" },
    { value: "gte", label: "Greater than or equal" },
    { value: "lt", label: "Less than" },
    { value: "lte", label: "Less than or equal" },
    { value: "eq", label: "Equals" },
    { value: "ne", label: "Not equals" },
    { value: "contains", label: "Contains" },
    { value: "in", label: "In list" }
  ];

  const addRule = () => {
    const newRule: CohortRule = {
      id: Date.now().toString(),
      field: "",
      operator: "",
      value: ""
    };
    setRules([...rules, newRule]);
  };

  const removeRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const updateRule = (id: string, field: keyof CohortRule, value: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ));
  };

  const getFieldType = (fieldValue: string) => {
    return availableFields.find(f => f.value === fieldValue)?.type || "text";
  };

  const renderValueInput = (rule: CohortRule) => {
    const fieldType = getFieldType(rule.field);
    
    switch (fieldType) {
      case "select":
        return (
          <Select value={rule.value} onValueChange={(value) => updateRule(rule.id, "value", value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Value" />
            </SelectTrigger>
            <SelectContent>
              {rule.field === "platform" && (
                <>
                  <SelectItem value="ios">iOS</SelectItem>
                  <SelectItem value="android">Android</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                </>
              )}
              {rule.field === "region" && (
                <>
                  <SelectItem value="na">North America</SelectItem>
                  <SelectItem value="eu">Europe</SelectItem>
                  <SelectItem value="apac">Asia Pacific</SelectItem>
                </>
              )}
              {rule.field === "user_type" && (
                <>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="returning">Returning</SelectItem>
                  <SelectItem value="veteran">Veteran</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        );
      case "currency":
        return (
          <Input
            type="number"
            placeholder="0.00"
            value={rule.value}
            onChange={(e) => updateRule(rule.id, "value", e.target.value)}
            className="w-32"
          />
        );
      case "number":
        return (
          <Input
            type="number"
            placeholder="0"
            value={rule.value}
            onChange={(e) => updateRule(rule.id, "value", e.target.value)}
            className="w-32"
          />
        );
      default:
        return (
          <Input
            placeholder="Enter value"
            value={rule.value}
            onChange={(e) => updateRule(rule.id, "value", e.target.value)}
            className="w-32"
          />
        );
    }
  };

  const validateCohort = () => {
    // Mock validation - in real implementation, this would call your backend
    const validRules = rules.filter(rule => rule.field && rule.operator && rule.value);
    if (validRules.length === 0) return;
    
    // Mock estimated size calculation
    const baseSize = 5000;
    const ruleMultiplier = 0.8;
    const estimated = Math.floor(baseSize * Math.pow(ruleMultiplier, validRules.length));
    setEstimatedSize(estimated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Cohort Definition Builder</h2>
        <p className="text-muted-foreground">
          Define the player audience for LTV prediction using attributes and events
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Cohort Definition */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cohort Name */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cohort Name</CardTitle>
              <CardDescription>
                Give your cohort a descriptive name for easy identification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g., US Facebook High-Value Prospects"
                value={cohortName}
                onChange={(e) => setCohortName(e.target.value)}
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* Include Players Where */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Include Players Where
              </CardTitle>
              <CardDescription>
                Define inclusion criteria for your cohort
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {rules.map((rule) => (
                <div key={rule.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Select value={rule.field} onValueChange={(value) => updateRule(rule.id, "field", value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableFields.map((field) => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={rule.operator} onValueChange={(value) => updateRule(rule.id, "operator", value)}>
                    <SelectTrigger className="w-32">
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

                  {renderValueInput(rule)}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRule(rule.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" onClick={addRule} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Rule
              </Button>
            </CardContent>
          </Card>

          {/* Exclude Test Users */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Quality Settings</CardTitle>
              <CardDescription>
                Configure data quality filters for your cohort
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="exclude-test-users">Exclude Test Users</Label>
                  <p className="text-sm text-muted-foreground">
                    Filter out test accounts and development users
                  </p>
                </div>
                <Switch
                  id="exclude-test-users"
                  checked={excludeTestUsers}
                  onCheckedChange={setExcludeTestUsers}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preview & Actions */}
        <div className="space-y-6">
          {/* Estimated Cohort Size */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5" />
                Estimated Cohort Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {estimatedSize > 0 ? estimatedSize.toLocaleString() : "—"}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {estimatedSize > 0 ? "estimated players" : "Add rules to estimate"}
                </p>
              </div>
              <Button 
                onClick={validateCohort} 
                className="w-full mt-4"
                disabled={rules.length === 0}
              >
                <Target className="w-4 h-4 mr-2" />
                Estimate Size
              </Button>
            </CardContent>
          </Card>

          {/* AI Suggested Cohorts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Suggested Cohorts</CardTitle>
              <CardDescription>
                Pre-defined cohorts based on common patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "High spenders from last week",
                "Players stuck at level 12",
                "Tutorial completers, no purchase"
              ].map((suggestion, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`suggestion-${index}`}
                    className="rounded"
                  />
                  <Label htmlFor={`suggestion-${index}`} className="text-sm">
                    {suggestion}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Build Cohort Button */}
          <Button className="w-full" size="lg">
            <Target className="w-4 h-4 mr-2" />
            Build Cohort
          </Button>
        </div>
      </div>
    </div>
  );
}