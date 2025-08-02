import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"
import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block text-primary">
              AgroInsight AI
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/demo" className="text-muted-foreground hover:text-foreground transition-colors">
              Demonstração
            </Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Preços
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </Link>
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link to="/register">
                <Button variant="hero">Começar grátis</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}