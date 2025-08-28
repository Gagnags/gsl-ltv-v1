import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import EventExplorer from "./pages/EventExplorer";
import PlayerProfile from "./pages/PlayerProfile";
import Cohorts from "./pages/Cohorts";
import LTVSimple from "./pages/LTVSimple";
import LTVAdvanced from "./pages/LTVAdvanced";
import LTVResults from "./pages/LTVResults";
import LTVPerformance from "./pages/LTVPerformance";
import SQLQuery from "./pages/SQLQuery";
import SupportSystem from "./components/SupportSystem";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/explore" component={EventExplorer} />
            <Route path="/players" component={PlayerProfile} />
            <Route path="/cohorts" component={Cohorts} />
            <Route path="/ltv" component={LTVSimple} />
            <Route path="/ltv/advanced" component={LTVAdvanced} />
            <Route path="/ltv/run/:id" component={LTVResults} />
            <Route path="/ltv/performance" component={LTVPerformance} />
            <Route path="/sql-query" component={SQLQuery} />
            <Route path="/support" component={() => <SupportSystem />} />
            <Route path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
