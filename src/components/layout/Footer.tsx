import { Leaf } from "lucide-react"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-bold text-primary">AgroInsight AI</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Diagnóstico inteligente para suas culturas com o poder da IA.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-3">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/pricing" className="hover:text-foreground transition-colors">{t('nav.pricing')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-3">Suporte</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Fale Conosco</Link></li>
              <li><Link to="/demo" className="hover:text-foreground transition-colors">Demonstração</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © 2024 AgroInsight AI. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}