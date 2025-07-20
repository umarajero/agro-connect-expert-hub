import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Cloud, MapPin, MessageCircle, Calendar, TrendingUp, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      id: "connect",
      icon: Users,
      title: "Expert Consultation",
      description: "Connect with agricultural experts for personalized advice on crop management, pest control, and farming techniques.",
      features: ["Real-time chat", "Video consultations", "Expert ratings", "24/7 support"],
      color: "from-primary to-primary-glow"
    },
    {
      id: "articles",
      icon: BookOpen,
      title: "Knowledge Hub",
      description: "Access thousands of research articles, farming guides, and best practices from agricultural professionals worldwide.",
      features: ["Latest research", "Practical guides", "Case studies", "Seasonal tips"],
      color: "from-accent to-orange-400"
    },
    {
      id: "weather",
      icon: Cloud,
      title: "Weather Intelligence",
      description: "Get hyperlocal weather forecasts, alerts, and climate data to make informed farming decisions.",
      features: ["7-day forecasts", "Severe weather alerts", "Irrigation planning", "Historical data"],
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: "soil",
      icon: MapPin,
      title: "Soil Analytics",
      description: "Discover optimal crop recommendations based on your location's soil composition and environmental conditions.",
      features: ["Soil composition", "pH analysis", "Nutrient levels", "Crop suggestions"],
      color: "from-amber-600 to-orange-500"
    }
  ];

  const additionalFeatures = [
    { icon: MessageCircle, title: "Community Forum", description: "Join discussions with fellow farmers" },
    { icon: Calendar, title: "Crop Calendar", description: "Plan your planting and harvesting schedule" },
    { icon: TrendingUp, title: "Market Insights", description: "Track crop prices and market trends" },
    { icon: Zap, title: "Smart Alerts", description: "Receive notifications for optimal farming actions" }
  ];

  return (
    <section className="py-20 bg-gradient-nature">
      <div className="container mx-auto px-4">
        {/* Main Features */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Farm Successfully
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and knowledge to help you grow better crops and increase your yields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature) => (
            <Card key={feature.id} className="group hover:shadow-glow transition-all duration-300 bg-card/50 backdrop-blur-sm border-0">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {feature.features.map((item, index) => (
                    <li key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  Explore {feature.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="text-center p-6 hover:shadow-natural transition-all duration-300 bg-card/80 backdrop-blur-sm group cursor-pointer"
            >
              <feature.icon className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;