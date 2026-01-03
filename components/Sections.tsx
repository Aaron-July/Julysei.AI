import React, { useState } from 'react';
import { Project, PortfolioItem } from '../types';
import { ArrowRight, CheckCircle2, Cpu, Zap, Globe, Smartphone, ChevronDown, Sparkles, Facebook, Twitter, Linkedin, Github, Mail, MapPin, Brain, BarChart3, Bot } from 'lucide-react';
import { generateDeepAnalysis } from '../services/geminiService';

// --- Shared Helper for Smooth Scrolling ---
const handleSmoothScroll = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
      const headerOffset = 80; // Height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
      });
      window.history.pushState(null, '', `#${id}`);
  }
};

// --- Hero Section ---
export const Hero = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-base">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-highlight/5 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-border/10 border border-brand-highlight/20 mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-brand-highlight" />
          <span className="text-xs font-semibold text-brand-highlight tracking-widest uppercase">AI-Powered Development</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-brand-text mb-8 leading-[1.1] tracking-tight max-w-5xl">
          Build Smarter. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-highlight to-brand-accent">Launch Faster.</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-brand-muted max-w-2xl mx-auto mb-12 leading-relaxed">
          We leverage advanced AI to simplify development and integrate intelligent solutions into your business, delivering high-quality, scalable results.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-30">
          <a 
            href="#contact" 
            onClick={(e) => handleSmoothScroll(e, 'contact')}
            className="px-8 py-4 bg-brand-highlight text-brand-base font-bold text-lg rounded-xl hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(78,205,196,0.3)] flex items-center justify-center gap-2 cursor-pointer"
          >
            Launch My Project <ArrowRight className="w-5 h-5" />
          </a>
          <a 
            href="#portfolio" 
            onClick={(e) => handleSmoothScroll(e, 'portfolio')}
            className="px-8 py-4 bg-brand-surface text-brand-text border border-brand-border/10 hover:border-brand-text font-medium text-lg rounded-xl transition-all transform hover:-translate-y-1 flex items-center justify-center cursor-pointer shadow-lg"
          >
            See Our AI Work
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-brand-muted/50 pointer-events-none">
          <ChevronDown className="w-8 h-8" />
      </div>
    </section>
  );
};

// --- About Section ---
export const About = () => (
  <section id="about" className="py-32 bg-brand-surface relative overflow-hidden">
    {/* Subtle Pattern */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
    
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="order-2 lg:order-1">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-text mb-8 leading-tight">Redefining Business with <span className="text-brand-accent">Intelligence</span></h2>
          <p className="text-brand-muted mb-8 text-lg leading-relaxed">
             At Julysei.AI, we combine expert web and mobile development with strategic AI consulting. We don't just build apps; we help businesses identify the best AI opportunities, select the right tools, and seamlessly integrate them into their core processes to drive efficiency and growth.
          </p>
          <div className="space-y-6">
            {[
              { title: "Strategic AI Consulting", desc: "We identify high-value opportunities to deploy AI within your specific industry context." },
              { title: "Intelligent Integration", desc: "Seamlessly embed AI into your existing workflows and customer touchpoints." },
              { title: "Scalable Architecture", desc: "Future-proof systems designed to grow with your data needs." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-5 group">
                <div className="w-12 h-12 rounded-full bg-brand-base flex items-center justify-center border border-brand-border/10 group-hover:border-brand-highlight/50 transition-colors shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-brand-highlight" />
                </div>
                <div>
                  <h4 className="text-xl text-brand-text font-semibold mb-1 group-hover:text-brand-highlight transition-colors">{item.title}</h4>
                  <p className="text-brand-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="order-1 lg:order-2 relative">
           <div className="absolute inset-0 bg-gradient-to-tr from-brand-highlight to-brand-accent opacity-20 blur-3xl rounded-full" />
           <div className="relative grid grid-cols-2 gap-6">
              <div className="bg-brand-base/80 backdrop-blur-sm p-8 rounded-2xl border border-brand-border/10 hover:border-brand-highlight/30 transition-colors shadow-xl flex flex-col items-center text-center transform hover:-translate-y-2 duration-300">
                 <Bot className="w-12 h-12 text-brand-highlight mb-4" />
                 <span className="text-2xl font-bold text-brand-text mb-1">AI Agents</span>
                 <span className="text-sm text-brand-muted">Process Automation</span>
              </div>
              <div className="bg-brand-base/80 backdrop-blur-sm p-8 rounded-2xl border border-brand-border/10 hover:border-brand-accent/30 transition-colors shadow-xl flex flex-col items-center text-center transform hover:-translate-y-2 duration-300 translate-y-8">
                 <Zap className="w-12 h-12 text-brand-accent mb-4" />
                 <span className="text-2xl font-bold text-brand-text mb-1">Speed</span>
                 <span className="text-sm text-brand-muted">Rapid Deployment</span>
              </div>
              <div className="bg-brand-base/80 backdrop-blur-sm p-8 rounded-2xl border border-brand-border/10 hover:border-blue-400/30 transition-colors shadow-xl flex flex-col items-center text-center transform hover:-translate-y-2 duration-300 col-span-2">
                 <Globe className="w-12 h-12 text-blue-400 mb-4" />
                 <span className="text-2xl font-bold text-brand-text mb-1">Global Scale</span>
                 <span className="text-sm text-brand-muted">Enterprise Ready</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Services Section ---
export const Services = () => (
  <section id="services" className="py-24 bg-brand-base relative">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-brand-text mb-4">Our Expertise</h2>
        <p className="text-brand-muted max-w-2xl mx-auto text-lg">
          We combine traditional software engineering with cutting-edge AI to deliver comprehensive business solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: Smartphone,
            title: "Web & App Development",
            desc: "Custom-built, responsive websites and mobile applications tailored to your brand's unique needs and goals."
          },
          {
            icon: Brain,
            title: "AI Business Integration",
            desc: "From strategy to implementation, we help you choose the right tools and integrate custom chatbots and automation to revolutionize your operations."
          },
          {
            icon: BarChart3,
            title: "Strategic Consulting",
            desc: "We analyze your business processes to identify high-impact opportunities for digital transformation and AI adoption."
          }
        ].map((service, idx) => (
           <div key={idx} className="bg-brand-surface p-8 rounded-2xl border border-brand-border/10 hover:border-brand-highlight/30 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-brand-base border border-brand-border/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-brand-highlight" />
              </div>
              <h3 className="text-2xl font-bold text-brand-text mb-4 group-hover:text-brand-highlight transition-colors">{service.title}</h3>
              <p className="text-brand-muted leading-relaxed">
                {service.desc}
              </p>
           </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Projects Section ---
const projects: Project[] = [
  {
    id: '1',
    title: "FinTrack AI",
    category: "Website",
    description: "A personal finance tracker that predicts spending habits.",
    aiSolution: "Used ML models to categorize transactions and forecast monthly budgets with 90% accuracy.",
    imageUrl: "https://picsum.photos/600/400?random=1"
  },
  {
    id: '2',
    title: "HealthPulse",
    category: "Mobile App",
    description: "Telemedicine app connecting patients with specialists instantly.",
    aiSolution: "Integrated AI symptom checker to triage patients before consultation, reducing wait times.",
    imageUrl: "https://picsum.photos/600/400?random=2"
  },
  {
    id: '3',
    title: "BizAssist AI",
    category: "AI Integration",
    description: "Intelligent customer service automation for a mid-sized logistics firm.",
    aiSolution: "Implemented a context-aware LLM chatbot, reducing support ticket volume by 60% and improving response times.",
    imageUrl: "https://picsum.photos/600/400?random=3"
  }
];

export const Projects = () => {
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Record<string, string>>({});

  const handleAnalyze = async (project: Project) => {
    if (analysis[project.id]) return;
    setAnalyzingId(project.id);
    try {
        const result = await generateDeepAnalysis(project.description + " " + project.aiSolution);
        setAnalysis(prev => ({...prev, [project.id]: result}));
    } catch (e) {
        setAnalysis(prev => ({...prev, [project.id]: "Analysis temporarily unavailable due to connectivity."}));
    } finally {
        setAnalyzingId(null);
    }
  };

  return (
    <section id="projects" className="py-32 bg-brand-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">Real-World Scenarios</h2>
            <p className="text-brand-muted max-w-2xl mx-auto text-lg">See how we solve complex business problems with intelligent, data-driven solutions.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project.id} className="group bg-brand-base rounded-2xl overflow-hidden border border-brand-border/10 hover:border-brand-highlight/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-highlight/10 flex flex-col h-full">
              <div className="h-64 overflow-hidden relative">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-surface to-transparent opacity-60" />
                <div className="absolute top-4 right-4 bg-brand-base/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs text-brand-highlight font-semibold border border-brand-highlight/20">
                    {project.category}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-brand-text mb-3 group-hover:text-brand-highlight transition-colors">{project.title}</h3>
                <p className="text-brand-muted mb-6 leading-relaxed flex-grow">{project.description}</p>
                
                <div className="space-y-4 pt-6 border-t border-brand-border/10">
                    <div>
                        <p className="text-xs text-brand-accent font-bold mb-1 uppercase tracking-wider flex items-center gap-1">
                            <Zap className="w-3 h-3" /> AI Solution
                        </p>
                        <p className="text-sm text-brand-text/80">{project.aiSolution}</p>
                    </div>

                    <div className="min-h-[60px] flex items-end">
                        <button 
                            className="w-full py-3 text-sm font-semibold text-brand-text bg-brand-border/10 hover:bg-brand-border/20 border border-brand-border/10 rounded-xl transition-all flex items-center justify-center gap-2 group/btn cursor-pointer relative z-10"
                        >
                            View Live Projects
                        </button>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Portfolio Section ---
const portfolioItems: PortfolioItem[] = [
  { id: '1', title: 'Neon Realty', category: 'Website', imageUrl: 'https://picsum.photos/400/300?random=4' },
  { id: '2', title: 'FitCore', category: 'Mobile App', imageUrl: 'https://picsum.photos/400/300?random=5' },
  { id: '3', title: 'Zen Dining', category: 'Website', imageUrl: 'https://picsum.photos/400/300?random=6' },
  { id: '4', title: 'SmartSupport', category: 'AI Integration', imageUrl: 'https://picsum.photos/400/300?random=7' },
  { id: '5', title: 'DataSense', category: 'AI Integration', imageUrl: 'https://picsum.photos/400/300?random=8' },
  { id: '6', title: 'TravelGo', category: 'Mobile App', imageUrl: 'https://picsum.photos/400/300?random=9' },
];

export const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-32 bg-brand-base">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="w-full md:w-auto text-center md:text-left">
            <h2 className="text-4xl font-bold text-brand-text mb-2">Selected Works</h2>
            <p className="text-brand-muted text-lg">A gallery of our diverse technical capabilities.</p>
          </div>
          <div className="flex gap-2 flex-wrap justify-center md:justify-end w-full md:w-auto">
              {['All', 'Website', 'Mobile App', 'AI Integration'].map(filter => (
                  <button 
                    key={filter} 
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeFilter === filter ? 'bg-brand-highlight text-brand-base' : 'bg-brand-base text-brand-text hover:bg-brand-border/10 border border-brand-border/10'}`}
                  >
                      {filter}
                  </button>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map(item => (
              <div key={item.id} className="relative group rounded-2xl overflow-hidden cursor-pointer h-72 sm:h-80 border border-brand-border/10 shadow-sm hover:shadow-xl hover:shadow-brand-highlight/10 transition-all duration-300 animate-in fade-in zoom-in-95">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {/* Overlay: Always visible on touch/mobile, hover on desktop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-base via-brand-base/80 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 sm:p-8">
                      <div className="transform translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-brand-highlight text-xs sm:text-sm font-semibold mb-1 uppercase tracking-wide">{item.category}</p>
                          <h4 className="text-xl sm:text-2xl font-bold text-brand-text">{item.title}</h4>
                      </div>
                  </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Contact Section ---
interface ContactProps {
  onStartChat?: (name: string, email: string, message: string) => void;
}

export const Contact = ({ onStartChat }: ContactProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onStartChat) {
      onStartChat(formData.name, formData.email, formData.message);
    } else {
      alert("Message sent! We'll be in touch shortly.");
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
  <section id="contact" className="py-32 bg-brand-surface relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-base to-transparent opacity-50 pointer-events-none" />
    <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-brand-base rounded-3xl p-8 md:p-16 border border-brand-border/10 shadow-2xl relative overflow-hidden">
             {/* Decorative glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-highlight/10 blur-[100px] rounded-full pointer-events-none" />
             
             <div className="grid lg:grid-cols-2 gap-12 relative z-10">
                <div>
                    <h2 className="text-4xl font-bold text-brand-text mb-6">Ready to innovate?</h2>
                    <p className="text-brand-muted mb-8 text-lg leading-relaxed">
                        Let’s chat about how we can bring AI into your business and build the perfect web solutions for you. Whether you have a specific idea or just the seed of one, we're here to help.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-brand-text hover:text-brand-highlight transition-colors">
                            <div className="w-12 h-12 rounded-full bg-brand-border/10 flex items-center justify-center">
                                <Smartphone className="w-5 h-5 text-brand-highlight" />
                            </div>
                            <span className="text-lg">+1 (555) 123-4567</span>
                        </div>
                         <div className="flex items-center gap-4 text-brand-text hover:text-brand-highlight transition-colors">
                            <div className="w-12 h-12 rounded-full bg-brand-border/10 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-brand-highlight" />
                            </div>
                            <span className="text-lg">hello@julysei.ai</span>
                        </div>
                    </div>
                </div>
                
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                         <input 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text" 
                            className="w-full bg-brand-surface border border-brand-border/10 rounded-xl px-6 py-4 text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-highlight focus:ring-1 focus:ring-brand-highlight transition-all" 
                            placeholder="Your Name" 
                            required
                         />
                    </div>
                    <div>
                         <input 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email" 
                            className="w-full bg-brand-surface border border-brand-border/10 rounded-xl px-6 py-4 text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-highlight focus:ring-1 focus:ring-brand-highlight transition-all" 
                            placeholder="Email Address" 
                            required
                         />
                    </div>
                    <div>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-brand-surface border border-brand-border/10 rounded-xl px-6 py-4 text-brand-text placeholder-brand-muted/50 focus:outline-none focus:border-brand-highlight focus:ring-1 focus:ring-brand-highlight transition-all h-40 resize-none" 
                            placeholder="Tell us about your project..."
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-brand-highlight to-teal-500 text-brand-base font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all transform hover:-translate-y-1 cursor-pointer">
                        Send Message & Chat with AI
                    </button>
                </form>
             </div>
        </div>
    </div>
  </section>
  );
};

export const Footer = () => (
    <footer className="bg-brand-surface pt-20 pb-10 border-t border-brand-border/10 text-brand-muted">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* Brand Column */}
                <div className="space-y-6">
                    <div className="text-2xl font-bold text-brand-text tracking-tight flex items-center gap-1">
                        Julysei<span className="text-brand-highlight">.AI</span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Pioneering the future of web and mobile development with intelligent, data-driven solutions.
                    </p>
                    <div className="flex gap-4">
                        {[Facebook, Twitter, Linkedin, Github].map((Icon, idx) => (
                            <a key={idx} href="#" className="w-10 h-10 rounded-full bg-brand-border/10 flex items-center justify-center hover:bg-brand-highlight hover:text-brand-base transition-colors group cursor-pointer">
                                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-brand-text font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-3 text-sm">
                        {[
                            { name: 'Home', href: '#home' },
                            { name: 'About Us', href: '#about' },
                            { name: 'Services', href: '#services' },
                            { name: 'Case Studies', href: '#projects' },
                            { name: 'Portfolio', href: '#portfolio' },
                            { name: 'Contact', href: '#contact' }
                        ].map(link => (
                            <li key={link.name}>
                                <a 
                                    href={link.href} 
                                    onClick={(e) => handleSmoothScroll(e, link.href.substring(1))}
                                    className="hover:text-brand-highlight transition-colors flex items-center gap-2 cursor-pointer"
                                >
                                    <span className="w-1 h-1 rounded-full bg-brand-highlight/50" /> {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="text-brand-text font-bold mb-6">Services</h4>
                    <ul className="space-y-3 text-sm">
                        {['Web Development', 'Mobile Apps', 'AI Integration', 'Cloud Solutions', 'UI/UX Design'].map(item => (
                            <li key={item}>
                                <a 
                                    href="#contact" 
                                    onClick={(e) => handleSmoothScroll(e, 'contact')}
                                    className="hover:text-brand-highlight transition-colors flex items-center gap-2 cursor-pointer"
                                >
                                    <span className="w-1 h-1 rounded-full bg-brand-highlight/50" /> {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact & Newsletter */}
                <div>
                    <h4 className="text-brand-text font-bold mb-6">Stay Updated</h4>
                    <div className="space-y-4">
                        <p className="text-sm">Subscribe to our newsletter for the latest AI trends.</p>
                        <form className="relative" onSubmit={e => { e.preventDefault(); alert('Subscribed!'); }}>
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full bg-brand-base border border-brand-border/10 rounded-lg py-3 px-4 pr-12 text-sm text-brand-text focus:outline-none focus:border-brand-highlight transition-colors"
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-brand-highlight text-brand-base rounded hover:bg-teal-400 transition-colors cursor-pointer">
                                <Mail className="w-4 h-4" />
                            </button>
                        </form>
                        <div className="pt-4 flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-brand-highlight shrink-0" />
                            <span>123 Innovation Dr, Tech City, CA</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-brand-border/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <p>&copy; 2024 Julysei.AI. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-brand-text transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-brand-text transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-brand-text transition-colors">Cookie Policy</a>
                </div>
            </div>
        </div>
    </footer>
);