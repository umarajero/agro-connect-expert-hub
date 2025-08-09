import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Award, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-agriculture.jpg";

const HeroSection = () => {
  const stats = [
    { icon: Users, value: "87", label: "Farmers Connected" },
    { icon: TrendingUp, value: "62%", label: "Crop Yield Increase" },
    { icon: Award, value: "23", label: "Expert Advisors" },
    { icon: Globe, value: "1", label: "Countries Served" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Connecting Farmers with
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Expert Knowledge</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Access real-time weather data, soil insights, expert consultations, and agricultural 
            articles to maximize your crop yields and farming success.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4 shadow-natural hover:shadow-glow transition-all duration-300">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;