import { Container } from "../components/ui/Container";
import { mockData } from "../data/mockData";
import { Code, Briefcase, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { name } = mockData.personalInfo;
  const { t } = useTranslation();

  return (
    <footer className="bg-surface border-t border-border py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-border/50">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-500">
                {name}
              </span>
              <span className="h-2 w-2 rounded-full bg-primary-500 mt-1"></span>
            </a>
            <p className="text-foreground/70 max-w-sm">
              {t('footer.desc')}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-foreground/70 hover:text-primary-600 transition-colors">{t('navbar.home') === 'Home' ? 'About me' : 'Sobre mí'}</a></li>
              <li><a href="#services" className="text-foreground/70 hover:text-primary-600 transition-colors">{t('navbar.services')}</a></li>
              <li><a href="#portfolio" className="text-foreground/70 hover:text-primary-600 transition-colors">{t('navbar.portfolio')}</a></li>
              <li><a href="#contact" className="text-foreground/70 hover:text-primary-600 transition-colors">{t('navbar.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-foreground hover:bg-primary-500 hover:text-white transition-colors border border-border">
                <Code className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-foreground hover:bg-[#0077b5] hover:text-white transition-colors border border-border">
                <Briefcase className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-foreground hover:bg-[#E1306C] hover:text-white transition-colors border border-border">
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-foreground/50">
          <p>© {currentYear} {name}. {t('footer.rights')}</p>
          <p className="mt-2 md:mt-0 flex items-center gap-1">
            {t('footer.built')}
          </p>
        </div>
      </Container>
    </footer>
  );
}
