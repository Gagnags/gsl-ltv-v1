import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingUp, Eye, Info } from "lucide-react";

interface InsightCardProps {
  type: "anomaly" | "trend" | "driver" | "info";
  title: string;
  description: string;
  confidence?: "low" | "medium" | "high";
  severity?: "low" | "medium" | "high";
  className?: string;
}

export const InsightCard = ({ 
  type, 
  title, 
  description, 
  confidence = "medium", 
  severity = "medium",
  className 
}: InsightCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "anomaly":
        return <AlertTriangle className="w-5 h-5" />;
      case "trend":
        return <TrendingUp className="w-5 h-5" />;
      case "driver":
        return <Eye className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "anomaly":
        return severity === "high" ? "text-destructive" : "text-warning";
      case "trend":
        return "text-success";
      case "driver":
        return "text-accent-cyan";
      case "info":
        return "text-primary";
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "anomaly":
        return severity === "high" ? "border-destructive/20" : "border-warning/20";
      case "trend":
        return "border-success/20";
      case "driver":
        return "border-accent-cyan/20";
      case "info":
        return "border-primary/20";
    }
  };

  const getConfidenceColor = () => {
    switch (confidence) {
      case "low":
        return "bg-warning/10 text-warning";
      case "medium":
        return "bg-accent-cyan/10 text-accent-cyan";
      case "high":
        return "bg-success/10 text-success";
    }
  };

  return (
    <div className={cn(
      "bg-card border rounded-lg p-4 hover:shadow-lg transition-smooth",
      getBorderColor(),
      className
    )}>
      <div className="flex items-start gap-3">
        <div className={cn("mt-0.5", getTypeColor())}>
          {getIcon()}
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">{title}</h3>
            <span className={cn(
              "px-2 py-1 rounded-full text-xs font-medium capitalize",
              getConfidenceColor()
            )}>
              {confidence} confidence
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};