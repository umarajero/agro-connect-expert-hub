import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Expert Connect", href: "#connect" },
        { name: "Knowledge Hub", href: "#articles" },
        { name: "Weather Data", href: "#weather" },
        { name: "Soil Analytics", href: "#soil" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Farming Guides", href: "#guides" },
        { name: "Research Papers", href: "#research" },
        { name: "Market Reports", href: "#market" },
        { name: "Community Forum", href: "#forum" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#help" },
        { name: "Contact Us", href: "#contact" },
        { name: "Training", href: "#training" },
        { name: "API Documentation", href: "#api" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-foreground/10 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">AgriConnect</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Empowering farmers worldwide with expert knowledge, real-time data, and 
              sustainable farming solutions for a better harvest.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@agriconnect.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Agricultural Innovation Center</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-primary-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-primary-foreground/10 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-primary-foreground mb-2">Stay Updated</h3>
              <p className="text-primary-foreground/80">Get the latest farming insights and expert tips delivered to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-lg bg-card text-foreground border-0 focus:outline-none focus:ring-2 focus:ring-accent min-w-[200px]"
              />
              <Button className="rounded-l-none bg-accent hover:bg-accent/90 text-accent-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-primary-foreground/20">
          <div className="text-primary-foreground/80 mb-4 md:mb-0">
            © 2024 AgriConnect. All rights reserved. Built with love for farmers worldwide.
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4 text-primary-foreground" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;