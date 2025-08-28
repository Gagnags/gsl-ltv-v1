import { Button } from "@/components/ui/button";
import { LTVModelPerformance } from "@/components/LTVModelPerformance";
import { 
  ArrowLeft,
  BarChart3
} from "lucide-react";

export default function LTVPerformance() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <a href="/ltv" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              LTV Snapshot
            </a>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary" />
              Model Performance
            </h1>
            <p className="text-muted-foreground mt-1">
              Detailed performance metrics and model analysis
            </p>
          </div>
        </div>
      </div>

      <LTVModelPerformance />
    </div>
  );
}