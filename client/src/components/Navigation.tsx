import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Search, 
  Users, 
  GitBranch, 
  Filter, 
  TrendingUp,
  Database,
  Settings,
  Gamepad2,
  Layers,
  User,
  HeadphonesIcon
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/", icon: Home },
  { name: "Explore", href: "/explore", icon: Search },
  { name: "Custom SQL Query", href: "/sql-query", icon: Database },
  { name: "Cohorts", href: "/cohorts", icon: GitBranch },
  { name: "Funnels", href: "#", icon: Filter },
  { name: "LTV", href: "/ltv", icon: TrendingUp },
  { name: "Players", href: "/players", icon: Users },
  { name: "Settings", href: "#", icon: Settings },
  { name: "Integrated Games", href: "#", icon: Gamepad2 },
  { name: "Data Layer", href: "#", icon: Layers },
  { name: "User Profile", href: "#", icon: User },
];

export const Navigation = () => {
  const [location] = useLocation();

  return (
    <nav className="w-64 bg-surface border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">Electronic Arts</h1>
            <p className="text-xs text-muted-foreground">FC25</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth hover:bg-secondary",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Support */}
      <div className="p-4 border-t border-border">
        <Link
          href="/support"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
        >
          <HeadphonesIcon className="w-5 h-5" />
          Support
        </Link>
      </div>
    </nav>
  );
};