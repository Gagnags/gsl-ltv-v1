import { useState } from "react";
import { X, Send, Sparkles, BarChart3, Users, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleMessages = [
  {
    type: "user",
    content: "Show me DAU for the last 14 days by region",
    timestamp: "2 min ago"
  },
  {
    type: "assistant",
    content: "I've analyzed your daily active users over the last 14 days. Here's what I found:\n\n**Key Insights:**\n- Overall DAU increased 12% week-over-week\n- North America leads with 45% of total DAU\n- Asia-Pacific shows strongest growth (+18%)\n- Europe experienced a slight dip on weekends\n\n**Sources:** events.session_start, last 14 days\n**Confidence:** High (0.87)",
    timestamp: "2 min ago",
    tools: ["events.query", "charts.create"]
  }
];

const quickActions = [
  { icon: BarChart3, label: "Analyze retention", action: "Show D1, D7, D30 retention for last month" },
  { icon: Users, label: "Find power users", action: "Show players with >10 sessions this week" },
  { icon: GitBranch, label: "Suggest cohorts", action: "Suggest meaningful player segments based on recent activity" },
];

export const CopilotPanel = ({ isOpen, onClose }: CopilotPanelProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    // Handle sending message
    setInput("");
  };

  return (
    <div className={cn(
      "fixed inset-y-0 right-0 w-96 bg-surface border-l border-border transform transition-transform duration-300 z-50 flex flex-col",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Insight Copilot</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {sampleMessages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "rounded-lg p-3",
              message.type === "user" 
                ? "bg-primary text-primary-foreground ml-8" 
                : "bg-muted mr-8"
            )}
          >
            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
            {message.tools && (
              <div className="mt-2 pt-2 border-t border-border/20">
                <div className="text-xs text-muted-foreground">
                  Tools used: {message.tools.join(", ")}
                </div>
              </div>
            )}
            <div className="text-xs text-muted-foreground mt-1">{message.timestamp}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="text-sm font-medium mb-2 text-muted-foreground">Quick Actions</div>
        <div className="space-y-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="w-full text-left p-2 rounded hover:bg-muted transition-smooth text-sm flex items-center gap-2"
              onClick={() => setInput(action.action)}
            >
              <action.icon className="w-4 h-4 text-muted-foreground" />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Ask anything about your players and events..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};