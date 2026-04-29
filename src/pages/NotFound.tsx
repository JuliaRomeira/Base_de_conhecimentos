import { Link } from "react-router-dom";
import { Home, FileQuestion } from "lucide-react";

const NotFound = () => (
  <div className="min-h-[60vh] flex items-center justify-center px-4">
    <div className="text-center max-w-md">
      <div className="inline-flex w-16 h-16 rounded-full bg-primary/10 text-primary items-center justify-center mb-6">
        <FileQuestion className="h-8 w-8" />
      </div>
      <h1 className="text-5xl font-bold text-foreground mb-3">404</h1>
      <p className="text-lg text-muted-foreground mb-8">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 h-11 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-glow"
      >
        <Home className="h-4 w-4" />
        Voltar ao início
      </Link>
    </div>
  </div>
);

export default NotFound;
