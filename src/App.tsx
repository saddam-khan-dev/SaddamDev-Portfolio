import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Menu, 
  X, 
  FileText, 
  ArrowRight, 
  MapPin, 
  Link as LinkIcon, 
  Code, 
  Database, 
  Cloud, 
  Zap, 
  Brush,
  Mail,
  Smartphone,
  Globe,
  GitBranch,
  MessageSquare,
  Search,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Context ---

const SettingsContext = React.createContext<any>(null);

const useSettings = () => React.useContext(SettingsContext);

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/about' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = settings.resume_url || '/resume/resume.pdf';
    link.download = `${settings.dev_name}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (location.pathname === '/admin') return null;

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 transition-all duration-300",
      isScrolled ? "bg-white/80 dark:bg-[#101922]/80 backdrop-blur-md h-16" : "bg-transparent h-20"
    )}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Terminal className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {settings.dev_name.split('Dev')[0]}<span className="text-primary">Dev</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors",
                location.pathname === link.path ? "text-primary" : "text-slate-600 dark:text-slate-400"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleResumeDownload}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20"
          >
            <Download className="w-4 h-4" />
            Resume
          </button>
          <button 
            className="md:hidden text-slate-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-[#101922] border-b border-slate-200 dark:border-slate-800 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
              <button 
                onClick={handleResumeDownload}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-bold"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const { settings } = useSettings();
  return (
    <footer className="bg-slate-50 dark:bg-[#080d12] border-t border-slate-200 dark:border-slate-800 py-16" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div id="contact-info">
            <h2 className="text-3xl font-bold mb-6 whitespace-pre-line">{settings.contact_title || "Let's build something extraordinary."}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
              {settings.contact_subtitle || "I'm currently available for freelance work and full-time opportunities."}
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-medium">{settings.dev_email}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="font-medium">{settings.dev_phone}</span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-1.5 rounded-md">
              <Terminal className="text-white w-4 h-4" />
            </div>
            <span className="font-bold tracking-tight text-slate-900 dark:text-white">{settings.dev_name.split('Dev')[0]}<span className="text-primary">Dev</span></span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-primary transition-colors"><Globe className="w-5 h-5" /></a>
            <a href={settings.github_url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
            <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            <Link to="/admin" className="text-[10px] text-slate-500 hover:text-primary transition-colors uppercase font-bold tracking-widest">Admin</Link>
          </div>
          <p className="text-xs text-slate-500">© {settings.copyright_year} {settings.dev_name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input 
          required
          className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" 
          placeholder="Name" 
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input 
          required
          className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" 
          placeholder="Email" 
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <textarea 
        required
        className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" 
        placeholder="Message" 
        rows={4}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      ></textarea>
      <button 
        disabled={status === 'loading'}
        className="bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' && <p className="text-emerald-500 text-sm font-medium">Message sent successfully!</p>}
      {status === 'error' && <p className="text-red-500 text-sm font-medium">Failed to send message. Please try again.</p>}
    </form>
  );
};

// --- Pages ---

const Home = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const { settings } = useSettings();

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data.slice(0, 3)));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-grow"
    >
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
            </span>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">{settings.hero_badge || 'Available for Hire'}</span>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight whitespace-pre-line">
              {settings.hero_title || 'Building Scalable Web Apps'}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
              {settings.hero_subtitle || 'Full Stack MERN Specialist crafting high-performance digital experiences.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/projects" className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:translate-y-[-2px] transition-all flex items-center gap-2 shadow-xl shadow-primary/25">
              View My Work
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#contact" className="px-8 py-4 border border-slate-200 dark:border-slate-800 bg-white/5 font-bold rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
              Get In Touch
            </a>
          </div>
          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-3">
              {['M', 'E', 'R', 'N'].map((letter, i) => (
                <div key={letter} className={cn(
                  "w-10 h-10 rounded-full border-2 border-background-dark flex items-center justify-center",
                  i === 0 ? "bg-primary/20" : i === 1 ? "bg-primary/30" : i === 2 ? "bg-primary/40" : "bg-primary/50"
                )}>
                  <span className="text-xs font-bold">{letter}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 font-medium tracking-wide italic">{settings.hero_tech_stack_label || 'Expertise in modern tech stacks'}</p>
          </div>
        </div>
        <div className="order-1 md:order-2 relative aspect-square max-w-[500px] mx-auto w-full">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent-purple/30 rounded-3xl blur-2xl"></div>
          <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-slate-200/20 glass-card">
            <img 
              alt={`${settings.dev_name} Portrait`} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              src={settings.dev_photo}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800";
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 right-6 p-4 glass-card rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-primary font-bold uppercase">Location</p>
                  <p className="font-bold">{settings.dev_location}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <MapPin className="text-accent-cyan w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-slate-100 dark:bg-[#0d151c]" id="projects">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-primary font-bold tracking-widest text-sm uppercase">{settings.projects_subtitle || 'Portfolio'}</span>
              <h2 className="text-4xl font-bold">{settings.projects_title || 'Featured Projects'}</h2>
            </div>
            <Link to="/projects" className="text-primary font-bold flex items-center gap-2 group">
              Explore All Projects
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <TechStackSection />
    </motion.div>
  );
};

const TechStackSection = () => {
  const { settings } = useSettings();
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data));
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal />;
      case 'Code': return <Code />;
      case 'Database': return <Database />;
      case 'Cloud': return <Cloud />;
      case 'Zap': return <Zap />;
      case 'Brush': return <Brush />;
      case 'Search': return <Search />;
      case 'Globe': return <Globe />;
      case 'Smartphone': return <Smartphone />;
      case 'GitBranch': return <GitBranch />;
      default: return <Terminal />;
    }
  };

  return (
    <section className="py-24" id="skills">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold">{settings.skills_title || 'The Modern Tech Stack'}</h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {settings.skills_subtitle || 'Specialized in building scalable applications with modern technologies.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Featured Skill Categories */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Terminal className="text-primary w-5 h-5" />
                  <span className="font-bold">Frontend</span>
                </div>
                <p className="text-xs text-slate-500">React, Next.js, Tailwind, Redux</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Database className="text-accent-cyan w-5 h-5" />
                  <span className="font-bold">Backend</span>
                </div>
                <p className="text-xs text-slate-500">Node.js, Express, MongoDB, SQL</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {skills.slice(0, 6).map((skill) => (
              <div key={skill.id} className="aspect-square flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-white/5 rounded-2xl hover:bg-primary/10 transition-colors border border-transparent hover:border-primary/20 group">
                <div className={cn("w-12 h-12 flex items-center justify-center mb-3 transition-transform group-hover:scale-110", skill.color)}>
                  {getIcon(skill.icon)}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-center">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState('All Projects');
  const { settings } = useSettings();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = settings.resume_url || '/resume/resume.pdf';
    link.download = `${settings.dev_name}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories = ['All Projects', 'Full Stack', 'React', 'Node.js', 'Mobile'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-grow py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4">Project Gallery</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
            A curated selection of my professional work and personal experiments. Specializing in high-performance full-stack applications built with the MERN stack.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold transition-all",
                  filter === cat ? "bg-primary text-white" : "bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
            Sort by: 
            <select className="bg-transparent outline-none text-slate-900 dark:text-white cursor-pointer">
              <option>Latest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center p-12 text-center group hover:border-primary/50 transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
            </div>
            <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
            <p className="text-sm text-slate-500">Next-gen AI integration project in development</p>
          </div>
        </div>

        <div className="mt-24 p-12 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Have a project in mind?</h2>
            <p className="text-slate-500">Let's build something extraordinary together using the latest technologies.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/#contact')}
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:translate-y-[-2px] transition-all"
            >
              Start a Discussion
            </button>
            <button 
              onClick={handleResumeDownload}
              className="px-8 py-4 bg-white/5 font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const { settings } = useSettings();
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/experience')
      .then(res => res.json())
      .then(data => setExperience(data));
    
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-grow py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
          </span>
          <span className="text-xs font-bold text-primary uppercase tracking-widest">{settings.hero_badge || 'Available for Hire'}</span>
        </div>
        <h1 className="text-6xl font-black mb-8">{settings.about_title || 'About & Skills'}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <Terminal className="text-primary w-6 h-6" />
              <h2 className="text-2xl font-bold">{settings.about_journey_title || 'My Journey'}</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
              {settings.about_journey_text1 || 'I am a passionate developer building robust applications.'}
            </p>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
              {settings.about_journey_text2 || 'My approach combines technical excellence with business goals.'}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Years Exp', value: settings.years_exp },
                { label: 'Projects Done', value: settings.projects_done },
                { label: 'Happy Clients', value: settings.happy_clients },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]"></div>
          </div>
        </div>

        <div className="mb-24">
          <div className="flex items-center gap-3 mb-12">
            <Code className="text-primary w-6 h-6" />
            <h2 className="text-2xl font-bold">Tech Stack</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill) => (
              <div key={skill.id} className="p-8 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <span className="font-bold">{skill.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-500">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-primary"
                  />
                </div>
                <p className="text-xs text-slate-500 italic">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-12">
            <ArrowRight className="text-primary w-6 h-6" />
            <h2 className="text-2xl font-bold">Professional Experience</h2>
          </div>
          <div className="space-y-12">
            {experience.map((exp, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-primary border-4 border-background-dark"></div>
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">{exp.date}</span>
                    <span className="text-slate-500">•</span>
                    <span className="font-bold text-lg">{exp.role}</span>
                  </div>
                  <p className="text-slate-500">{exp.company}</p>
                </div>
                <ul className="space-y-2">
                  {exp.points.map((p: string, j: number) => (
                    <li key={j} className="text-sm text-slate-500 flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project }: any) => (
  <div className="group flex flex-col bg-white dark:bg-[#101922] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-primary/10">
    <div className="relative h-56 overflow-hidden">
      <img 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        src={project.image}
        referrerPolicy="no-referrer"
      />
      {project.id === 1 && (
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="px-3 py-1 bg-background-dark/80 backdrop-blur-md rounded-full text-[10px] font-bold text-accent-cyan border border-accent-cyan/20">LIVE</span>
        </div>
      )}
    </div>
    <div className="p-6 flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag: string) => (
          <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">{tag}</span>
        ))}
      </div>
      <h3 className="text-xl font-bold">{project.title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
        {project.description}
      </p>
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <a 
          href={project.demo_url || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm font-bold flex items-center gap-1 hover:text-primary transition-colors"
        >
          <LinkIcon className="w-4 h-4" /> Demo
        </a>
        <a 
          href={project.github_url || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm font-bold flex items-center gap-1 hover:text-primary transition-colors"
        >
          <Code className="w-4 h-4" /> GitHub
        </a>
      </div>
    </div>
  </div>
);

// --- Main App ---

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'settings' | 'experience' | 'skills'>('projects');
  const { settings, refreshSettings } = useSettings();
  const [localSettings, setLocalSettings] = useState<any>(null);
  const [error, setError] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [uploading, setUploading] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (settings) setLocalSettings(settings);
  }, [settings]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, isProject: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(field);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        if (isProject) {
          setEditingProject({ ...editingProject, [field]: data.url });
        } else {
          setLocalSettings({ ...localSettings, [field]: data.url });
        }
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(null);
    }
  };

  const fetchProjects = async () => {
    const res = await fetch(`/api/projects?t=${Date.now()}`);
    const data = await res.json();
    console.log("Fetched projects:", data);
    setProjects(data);
  };

  const fetchExperience = async () => {
    const res = await fetch(`/api/experience?t=${Date.now()}`);
    const data = await res.json();
    console.log("Fetched experience:", data);
    setExperience(data);
  };

  const fetchSkills = async () => {
    const res = await fetch(`/api/skills?t=${Date.now()}`);
    const data = await res.json();
    setSkills(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setIsLoggedIn(true);
      fetchProjects();
      fetchExperience();
      fetchSkills();
    } else {
      setError('Invalid password');
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProject.id ? 'PUT' : 'POST';
    const url = editingProject.id ? `/api/projects/${editingProject.id}` : '/api/projects';
    
    const payload = {
      ...editingProject,
      tags: Array.isArray(editingProject.tags) ? editingProject.tags.join(',') : editingProject.tags
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setEditingProject(null);
      fetchProjects();
    }
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingExperience.id ? 'PUT' : 'POST';
    const url = editingExperience.id ? `/api/experience/${editingExperience.id}` : '/api/experience';
    
    const payload = {
      ...editingExperience,
      points: Array.isArray(editingExperience.points) ? editingExperience.points.join(',') : editingExperience.points
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setEditingExperience(null);
      fetchExperience();
    }
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingSkill.id ? 'PUT' : 'POST';
    const url = editingSkill.id ? `/api/skills/${editingSkill.id}` : '/api/skills';
    
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingSkill),
    });

    if (res.ok) {
      setEditingSkill(null);
      fetchSkills();
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('Saving...');
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(localSettings),
    });
    if (res.ok) {
      await refreshSettings();
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } else {
      setSaveStatus('Failed to save settings');
    }
  };

  const handleDeleteProject = async (id: number) => {
    console.log("Attempting to delete project with ID:", id);
    if (!id) {
      alert("Error: Project ID is missing. Cannot delete.");
      console.error("No ID provided for project deletion");
      return;
    }
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        console.log("Delete project response status:", res.status);
        if (res.ok) {
          const data = await res.json();
          console.log("Delete project response data:", data);
          if (data.changes === 0) {
            alert(`Server reported 0 changes. Project with ID ${id} might not exist in the database or was already deleted.\nExisted check: ${data.existed}`);
            await fetchProjects(); // Refresh anyway
          } else {
            alert(`Project with ID ${id} deleted successfully.`);
            await fetchProjects();
          }
        } else {
          const errorData = await res.json();
          alert(`Delete project failed: ${errorData.error || 'Unknown error'}`);
          console.error("Delete project failed:", errorData);
        }
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const handleDeleteExperience = async (id: number) => {
    console.log("Attempting to delete experience with ID:", id);
    if (!id) {
      alert("Error: Experience ID is missing. Cannot delete.");
      console.error("No ID provided for experience deletion");
      return;
    }
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' });
        console.log("Delete experience response status:", res.status);
        if (res.ok) {
          const data = await res.json();
          console.log("Delete experience response data:", data);
          if (data.changes === 0) {
            alert(`Server reported 0 changes. Experience with ID ${id} might not exist in the database or was already deleted.\nExisted check: ${data.existed}`);
            await fetchExperience(); // Refresh anyway
          } else {
            alert(`Experience with ID ${id} deleted successfully.`);
            await fetchExperience();
          }
        } else {
          const errorData = await res.json();
          alert(`Delete experience failed: ${errorData.error || 'Unknown error'}`);
          console.error("Delete experience failed:", errorData);
        }
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchSkills();
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex-grow flex items-center justify-center p-6 bg-[#080d12]">
        <form onSubmit={handleLogin} className="glass-card p-8 rounded-2xl w-full max-w-md flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input 
            type="password" 
            placeholder="Password" 
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-primary text-white font-bold py-3 rounded-lg active:scale-95 hover:scale-[1.02] hover:brightness-110 transition-all duration-100">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex-grow p-6 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('projects')}
              className={cn("px-4 py-1.5 rounded-md text-sm font-bold transition-all active:scale-95 hover:bg-primary/10", activeTab === 'projects' ? "bg-primary text-white hover:bg-primary/90" : "text-slate-500 hover:text-slate-900 dark:hover:text-white")}
            >
              Projects
            </button>
            <button 
              onClick={() => setActiveTab('experience')}
              className={cn("px-4 py-1.5 rounded-md text-sm font-bold transition-all active:scale-95 hover:bg-primary/10", activeTab === 'experience' ? "bg-primary text-white hover:bg-primary/90" : "text-slate-500 hover:text-slate-900 dark:hover:text-white")}
            >
              Experience
            </button>
            <button 
              onClick={() => setActiveTab('skills')}
              className={cn("px-4 py-1.5 rounded-md text-sm font-bold transition-all active:scale-95 hover:bg-primary/10", activeTab === 'skills' ? "bg-primary text-white hover:bg-primary/90" : "text-slate-500 hover:text-slate-900 dark:hover:text-white")}
            >
              Skills
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={cn("px-4 py-1.5 rounded-md text-sm font-bold transition-all active:scale-95 hover:bg-primary/10", activeTab === 'settings' ? "bg-primary text-white hover:bg-primary/90" : "text-slate-500 hover:text-slate-900 dark:hover:text-white")}
            >
              Site Settings
            </button>
          </div>
        </div>
        <button onClick={handleLogout} className="text-xs font-bold text-slate-500 hover:text-red-500 uppercase tracking-widest active:scale-95 hover:scale-105 transition-all">Logout</button>
      </div>

      {activeTab === 'projects' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Manage Projects</h2>
            <button 
              onClick={() => setEditingProject({ title: '', description: '', image: '', tags: '', demo_url: '', github_url: '', category: 'Full Stack' })}
              className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm active:scale-95 hover:scale-[1.02] hover:brightness-110 transition-all"
            >
              Add Project
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {projects.map(p => (
              <div key={p.id} className="glass-card p-6 rounded-xl flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{p.title} <span className="text-xs text-slate-500 font-normal ml-2">ID: {p.id}</span></h3>
                  <p className="text-sm text-slate-500">{p.category}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingProject(p)} className="px-4 py-2 bg-accent-cyan/20 text-accent-cyan rounded-lg text-sm font-bold active:scale-95 hover:bg-accent-cyan/30 transition-all">Edit</button>
                  <button onClick={() => handleDeleteProject(p.id)} className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg text-sm font-bold active:scale-95 hover:bg-red-500/30 transition-all">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'experience' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Professional Experience</h2>
            <button 
              onClick={() => setEditingExperience({ date: '', role: '', company: '', points: '' })}
              className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm active:scale-95 hover:scale-[1.02] hover:brightness-110 transition-all"
            >
              Add Experience
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {experience.map(e => (
              <div key={e.id} className="glass-card p-6 rounded-xl flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{e.role} <span className="text-xs text-slate-500 font-normal ml-2">ID: {e.id}</span></h3>
                  <p className="text-sm text-slate-500">{e.company} | {e.date}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingExperience(e)} className="px-4 py-2 bg-accent-cyan/20 text-accent-cyan rounded-lg text-sm font-bold active:scale-95 hover:bg-accent-cyan/30 transition-all">Edit</button>
                  <button onClick={() => handleDeleteExperience(e.id)} className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg text-sm font-bold active:scale-95 hover:bg-red-500/30 transition-all">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'skills' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Manage Skills</h2>
            <button 
              onClick={() => setEditingSkill({ name: '', icon: 'Terminal', color: 'text-primary', category: 'Frontend', level: 80, description: '' })}
              className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm active:scale-95 hover:scale-[1.02] hover:brightness-110 transition-all"
            >
              Add Skill
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {skills.map(s => (
              <div key={s.id} className="glass-card p-6 rounded-xl flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{s.name} <span className="text-xs text-slate-500 font-normal ml-2">{s.category} | {s.level}%</span></h3>
                  <p className="text-sm text-slate-500">{s.description}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditingSkill(s)} className="px-4 py-2 bg-accent-cyan/20 text-accent-cyan rounded-lg text-sm font-bold active:scale-95 hover:bg-accent-cyan/30 transition-all">Edit</button>
                  <button onClick={() => handleDeleteSkill(s.id)} className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg text-sm font-bold active:scale-95 hover:bg-red-500/30 transition-all">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="glass-card p-8 rounded-2xl flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Global Site Settings</h2>
            {saveStatus && <p className={cn("text-sm font-bold", saveStatus.includes('success') ? "text-emerald-500" : "text-primary")}>{saveStatus}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Developer Name</label>
              <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.dev_name || ''} onChange={e => setLocalSettings({...localSettings, dev_name: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Professional Title / Location</label>
              <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.dev_location || ''} onChange={e => setLocalSettings({...localSettings, dev_location: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Email Address</label>
              <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.dev_email || ''} onChange={e => setLocalSettings({...localSettings, dev_email: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Phone Number</label>
              <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.dev_phone || ''} onChange={e => setLocalSettings({...localSettings, dev_phone: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">GitHub URL</label>
              <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.github_url || ''} onChange={e => setLocalSettings({...localSettings, github_url: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">LinkedIn URL</label>
              <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.linkedin_url || ''} onChange={e => setLocalSettings({...localSettings, linkedin_url: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Profile Photo URL</label>
              <div className="flex gap-2">
                <input className="flex-grow bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.dev_photo || ''} onChange={e => setLocalSettings({...localSettings, dev_photo: e.target.value})} />
                <label className="cursor-pointer bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-primary/20 transition-all">
                  <Download className="w-4 h-4" />
                  {uploading === 'dev_photo' ? '...' : 'Upload'}
                  <input type="file" className="hidden" onChange={e => handleFileUpload(e, 'dev_photo')} accept="image/*" />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Resume URL</label>
              <div className="flex gap-2">
                <input className="flex-grow bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.resume_url || ''} onChange={e => setLocalSettings({...localSettings, resume_url: e.target.value})} />
                <label className="cursor-pointer bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-primary/20 transition-all">
                  <Download className="w-4 h-4" />
                  {uploading === 'resume_url' ? '...' : 'Upload'}
                  <input type="file" className="hidden" onChange={e => handleFileUpload(e, 'resume_url')} accept=".pdf,.doc,.docx" />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Copyright Year</label>
              <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.copyright_year || ''} onChange={e => setLocalSettings({...localSettings, copyright_year: e.target.value})} />
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold mb-6">Hero Section Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Hero Badge</label>
                <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.hero_badge || ''} onChange={e => setLocalSettings({...localSettings, hero_badge: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Tech Stack Label</label>
                <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.hero_tech_stack_label || ''} onChange={e => setLocalSettings({...localSettings, hero_tech_stack_label: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-slate-500">Hero Title (Use \n for new lines)</label>
                <textarea rows={2} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.hero_title || ''} onChange={e => setLocalSettings({...localSettings, hero_title: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-slate-500">Hero Subtitle</label>
                <textarea rows={2} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.hero_subtitle || ''} onChange={e => setLocalSettings({...localSettings, hero_subtitle: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold mb-6">Section Titles & About Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Projects Section Title</label>
                <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.projects_title || ''} onChange={e => setLocalSettings({...localSettings, projects_title: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Projects Section Subtitle</label>
                <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.projects_subtitle || ''} onChange={e => setLocalSettings({...localSettings, projects_subtitle: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Skills Section Title</label>
                <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.skills_title || ''} onChange={e => setLocalSettings({...localSettings, skills_title: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Skills Section Subtitle</label>
                <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.skills_subtitle || ''} onChange={e => setLocalSettings({...localSettings, skills_subtitle: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">About Page Title</label>
                <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.about_title || ''} onChange={e => setLocalSettings({...localSettings, about_title: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Journey Title</label>
                <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.about_journey_title || ''} onChange={e => setLocalSettings({...localSettings, about_journey_title: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-slate-500">Journey Paragraph 1</label>
                <textarea rows={3} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.about_journey_text1 || ''} onChange={e => setLocalSettings({...localSettings, about_journey_text1: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-slate-500">Journey Paragraph 2</label>
                <textarea rows={3} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.about_journey_text2 || ''} onChange={e => setLocalSettings({...localSettings, about_journey_text2: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold mb-6">Contact Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Contact Title</label>
                <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.contact_title || ''} onChange={e => setLocalSettings({...localSettings, contact_title: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Contact Subtitle</label>
                <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.contact_subtitle || ''} onChange={e => setLocalSettings({...localSettings, contact_subtitle: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-white/10">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Years Experience</label>
              <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.years_exp || ''} onChange={e => setLocalSettings({...localSettings, years_exp: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Projects Done</label>
              <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.projects_done || ''} onChange={e => setLocalSettings({...localSettings, projects_done: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Happy Clients</label>
              <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={localSettings?.happy_clients || ''} onChange={e => setLocalSettings({...localSettings, happy_clients: e.target.value})} />
            </div>
          </div>

          <button className="bg-primary text-white font-bold py-4 rounded-xl mt-4 shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.98] hover:scale-[1.01]">Save All Settings</button>
        </form>
      )}

      {editingProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-6 overflow-y-auto">
          <form onSubmit={handleSaveProject} className="glass-card p-8 rounded-2xl w-full max-w-2xl flex flex-col gap-4 my-8">
            <h2 className="text-2xl font-bold mb-4">{editingProject.id ? 'Edit Project' : 'Add Project'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Title</label>
                <input required className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingProject.title} onChange={e => setEditingProject({...editingProject, title: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Category</label>
                <input required className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingProject.category} onChange={e => setEditingProject({...editingProject, category: e.target.value})} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Image URL</label>
              <div className="flex gap-2">
                <input required className="flex-grow bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingProject.image} onChange={e => setEditingProject({...editingProject, image: e.target.value})} />
                <label className="cursor-pointer bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 hover:bg-primary/20 transition-all">
                  <Download className="w-4 h-4" />
                  {uploading === 'image' ? '...' : 'Upload'}
                  <input type="file" className="hidden" onChange={e => handleFileUpload(e, 'image', true)} accept="image/*" />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Tags (comma separated)</label>
              <input required className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingProject.tags} onChange={e => setEditingProject({...editingProject, tags: e.target.value})} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Demo URL</label>
                <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingProject.demo_url} onChange={e => setEditingProject({...editingProject, demo_url: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">GitHub URL</label>
                <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingProject.github_url} onChange={e => setEditingProject({...editingProject, github_url: e.target.value})} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Description</label>
              <textarea required rows={3} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingProject.description} onChange={e => setEditingProject({...editingProject, description: e.target.value})} />
            </div>
            <div className="flex gap-4 mt-4">
              <button type="submit" className="flex-grow bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all active:scale-95 hover:scale-[1.01]">Save Changes</button>
              <button type="button" onClick={() => setEditingProject(null)} className="px-8 py-3 bg-white/10 rounded-lg font-bold hover:bg-white/20 transition-all active:scale-95 hover:scale-[1.01]">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {editingExperience && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-6 overflow-y-auto">
          <form onSubmit={handleSaveExperience} className="glass-card p-8 rounded-2xl w-full max-w-2xl flex flex-col gap-4 my-8">
            <h2 className="text-2xl font-bold mb-4">{editingExperience.id ? 'Edit Experience' : 'Add Experience'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Date Range</label>
                <input required placeholder="e.g. 2024 — PRESENT" className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingExperience.date} onChange={e => setEditingExperience({...editingExperience, date: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Role</label>
                <input required placeholder="e.g. Full Stack Developer" className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingExperience.role} onChange={e => setEditingExperience({...editingExperience, role: e.target.value})} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Company</label>
              <input required placeholder="e.g. Freelance / SaddamDev" className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingExperience.company} onChange={e => setEditingExperience({...editingExperience, company: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Points (comma separated)</label>
              <textarea required rows={4} placeholder="Point 1, Point 2, Point 3" className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingExperience.points} onChange={e => setEditingExperience({...editingExperience, points: e.target.value})} />
            </div>
            <div className="flex gap-4 mt-4">
              <button type="submit" className="flex-grow bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all active:scale-95 hover:scale-[1.01]">Save Changes</button>
              <button type="button" onClick={() => setEditingExperience(null)} className="px-8 py-3 bg-white/10 rounded-lg font-bold hover:bg-white/20 transition-all active:scale-95 hover:scale-[1.01]">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {editingSkill && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-6 overflow-y-auto">
          <form onSubmit={handleSaveSkill} className="glass-card p-8 rounded-2xl w-full max-w-2xl flex flex-col gap-4 my-8">
            <h2 className="text-2xl font-bold mb-4">{editingSkill.id ? 'Edit Skill' : 'Add Skill'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Skill Name</label>
                <input required className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingSkill.name} onChange={e => setEditingSkill({...editingSkill, name: e.target.value})} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Category</label>
                <select className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingSkill.category} onChange={e => setEditingSkill({...editingSkill, category: e.target.value})}>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Icon</label>
                <select className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingSkill.icon} onChange={e => setEditingSkill({...editingSkill, icon: e.target.value})}>
                  <option value="Terminal">Terminal</option>
                  <option value="Code">Code</option>
                  <option value="Database">Database</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Zap">Zap</option>
                  <option value="Brush">Brush</option>
                  <option value="Search">Search</option>
                  <option value="Globe">Globe</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="GitBranch">GitBranch</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-slate-500">Color Class (Tailwind)</label>
                <input className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingSkill.color} onChange={e => setEditingSkill({...editingSkill, color: e.target.value})} placeholder="text-primary" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Proficiency Level (%)</label>
              <input type="number" min="0" max="100" className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingSkill.level} onChange={e => setEditingSkill({...editingSkill, level: parseInt(e.target.value)})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-slate-500">Description</label>
              <textarea rows={3} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary" value={editingSkill.description} onChange={e => setEditingSkill({...editingSkill, description: e.target.value})} />
            </div>
            <div className="flex gap-4 mt-4">
              <button type="submit" className="flex-grow bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-all active:scale-95 hover:scale-[1.01]">Save Changes</button>
              <button type="button" onClick={() => setEditingSkill(null)} className="px-8 py-3 bg-white/10 rounded-lg font-bold hover:bg-white/20 transition-all active:scale-95 hover:scale-[1.01]">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const AppContent = () => {
  const { pathname, hash } = useLocation();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error("Failed to fetch settings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80; // Account for sticky header
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          return true;
        }
      } else {
        window.scrollTo(0, 0);
      }
      return false;
    };

    // Try immediately
    if (!scrollToHash() && hash) {
      // If not found, try again after a short delay (to allow for rendering)
      const timer = setTimeout(scrollToHash, 100);
      const timer2 = setTimeout(scrollToHash, 500); // Second attempt for slower renders
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, [pathname, hash]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080d12]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SettingsContext.Provider value={{ settings, refreshSettings: fetchSettings }}>
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        {pathname !== '/admin' && <Footer />}
      </div>
    </SettingsContext.Provider>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
