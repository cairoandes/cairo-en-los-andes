import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";
import FloatingLangSwitcher from "./components/FloatingLangSwitcher";
import Home from "./pages/Home";
import Maestros from "./pages/Maestros";
import Sponsors from "./pages/Sponsors";
import Premios from "./pages/Premios";
import GalasPage from "./pages/Galas";
import Turismo from "./pages/Turismo";
import Pasaporte from "./pages/Pasaporte";
import MiCuenta from "./pages/MiCuenta";
import ResetPassword from "./pages/ResetPassword";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/maestros"} component={Maestros} />
        <Route path={"/sponsors"} component={Sponsors} />
        <Route path={"/premios"} component={Premios} />
        <Route path={"/galas"} component={GalasPage} />
        <Route path={"/turismo"} component={Turismo} />
        <Route path={"/pasaporte-cairo-andes"} component={Pasaporte} />
        <Route path={"/mi-cuenta"} component={MiCuenta} />
        <Route path={"/recuperar-password/:token"} component={ResetPassword} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <FloatingLangSwitcher />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
