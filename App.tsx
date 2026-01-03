import React, { useState, useEffect } from 'react';
import { Hero, About, Services, Projects, Portfolio, Contact, Footer } from './components/Sections';
import { Chatbot } from './components/Chatbot';
import { Menu, X, Sun, Moon, MessageCircle } from 'lucide-react';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialInput, setChatInitialInput] = useState('');
  const [chatTrigger, setChatTrigger] = useState(0);

  // Initialize theme state from DOM class
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
        window.history.pushState(null, '', `#${id}`);
    }
  };

  const handleContactChat = (name: string, email: string, message: string) => {
    const text = `Hi, my name is ${name} (${email}). \n\nI'm interested in: ${message}`;
    setChatInitialInput(text);
    setChatTrigger(prev => prev + 1);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-base text-brand-text font-sans selection:bg-brand-highlight selection:text-brand-base transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-brand-base/90 backdrop-blur-md border-b border-brand-border/10 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a 
            href="#home" 
            onClick={handleScroll('home')}
            className="text-2xl font-bold text-brand-text tracking-tight flex items-center gap-1 z-[101]"
          >
            Julysei<span className="text-brand-highlight">.AI</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-sm font-medium items-center">
            {['Home', 'About', 'Services', 'Projects', 'Portfolio'].map((item) => (
              <a 
                key={item} 
                href={`#${item === 'Home' ? 'home' : item.toLowerCase()}`}
                onClick={handleScroll(item === 'Home' ? 'home' : item.toLowerCase())}
                className="text-brand-text/80 hover:text-brand-text transition-colors relative group cursor-pointer"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-highlight transition-all group-hover:w-full" />
              </a>
            ))}
            
            <div className="flex items-center gap-2 border-l border-brand-border/10 pl-6 ml-2">
              <button 
                  onClick={toggleTheme} 
                  className="p-2 rounded-full hover:bg-brand-border/10 text-brand-text transition-colors cursor-pointer"
                  aria-label="Toggle Theme"
              >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button 
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className={`p-2 rounded-full hover:bg-brand-border/10 transition-colors cursor-pointer ${isChatOpen ? 'text-brand-highlight bg-brand-highlight/10' : 'text-brand-text'}`}
                  aria-label="Toggle AI Assistant"
                  title="Talk to AI Assistant"
              >
                  <MessageCircle className="w-5 h-5" />
              </button>
            </div>

            <a 
                href="#contact" 
                onClick={handleScroll('contact')}
                className="px-6 py-2.5 text-sm font-bold bg-brand-text text-brand-base rounded-full hover:bg-brand-highlight transition-all transform hover:scale-105 shadow-lg shadow-brand-highlight/10 cursor-pointer"
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2 z-[101]">
            <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-brand-border/10 text-brand-text transition-colors cursor-pointer"
            >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`p-2 rounded-full hover:bg-brand-border/10 transition-colors cursor-pointer ${isChatOpen ? 'text-brand-highlight bg-brand-highlight/10' : 'text-brand-text'}`}
                aria-label="Toggle AI Assistant"
            >
                <MessageCircle className="w-5 h-5" />
            </button>
            <button 
                className="text-brand-text p-2 hover:bg-brand-border/10 rounded-lg transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-brand-surface border-b border-brand-border/10 shadow-2xl animate-in slide-in-from-top-5 z-[90]">
            <div className="flex flex-col p-6 space-y-4">
              {['Home', 'About', 'Services', 'Projects', 'Portfolio'].map((item) => (
                <a 
                  key={item}
                  href={`#${item === 'Home' ? 'home' : item.toLowerCase()}`}
                  className="text-lg font-medium text-brand-text hover:text-brand-highlight transition-colors py-2 border-b border-brand-border/5 last:border-0 cursor-pointer"
                  onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleScroll(item === 'Home' ? 'home' : item.toLowerCase())(e);
                  }}
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contact" 
                className="block text-center px-6 py-4 bg-brand-highlight text-brand-base font-bold rounded-xl mt-4 active:scale-95 transition-transform cursor-pointer"
                onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    handleScroll('contact')(e);
                }}
              >
                Get in Touch
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Portfolio />
        <Contact onStartChat={handleContactChat} />
      </main>

      <Footer />
      <Chatbot 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
        initialMessage={chatInitialInput}
        triggerConfig={chatTrigger}
      />
    </div>
  );
};

export default App;