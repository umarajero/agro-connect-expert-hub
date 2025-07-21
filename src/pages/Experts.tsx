import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageCircle, Video, Clock, Users, ArrowLeft, Leaf } from "lucide-react";

const Experts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Experts" },
    { id: "crops", name: "Crop Management" },
    { id: "livestock", name: "Livestock" },
    { id: "soil", name: "Soil Health" },
    { id: "pests", name: "Pest Control" },
    { id: "organic", name: "Organic Farming" }
  ];

  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Crop Management",
      category: "crops",
      experience: "15+ years",
      rating: 4.9,
      reviews: 234,
      price: "$45/hour",
      availability: "Available Now",
      image: "/placeholder.svg",
      bio: "Specializes in sustainable crop production and precision agriculture. PhD in Plant Science.",
      skills: ["Precision Agriculture", "Crop Rotation", "Yield Optimization"]
    },
    {
      id: 2,
      name: "Michael Chen",
      specialty: "Soil Health",
      category: "soil",
      experience: "12+ years",
      rating: 4.8,
      reviews: 189,
      price: "$40/hour",
      availability: "Available in 2 hours",
      image: "/placeholder.svg",
      bio: "Expert in soil analysis and nutrient management. Certified soil scientist with field experience.",
      skills: ["Soil Testing", "Nutrient Management", "pH Optimization"]
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Organic Farming",
      category: "organic",
      experience: "10+ years",
      rating: 4.9,
      reviews: 156,
      price: "$50/hour",
      availability: "Available Tomorrow",
      image: "/placeholder.svg",
      bio: "Organic farming consultant with expertise in natural pest control and certification processes.",
      skills: ["Organic Certification", "Natural Pest Control", "Composting"]
    },
    {
      id: 4,
      name: "James Wilson",
      specialty: "Livestock Management",
      category: "livestock",
      experience: "18+ years",
      rating: 4.7,
      reviews: 298,
      price: "$55/hour",
      availability: "Available Now",
      image: "/placeholder.svg",
      bio: "Livestock specialist focusing on cattle and poultry management. Veterinary background.",
      skills: ["Animal Health", "Feed Management", "Breeding Programs"]
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      specialty: "Pest Control",
      category: "pests",
      experience: "14+ years",
      rating: 4.8,
      reviews: 167,
      price: "$48/hour",
      availability: "Available in 1 hour",
      image: "/placeholder.svg",
      bio: "Entomologist specializing in integrated pest management and sustainable control methods.",
      skills: ["IPM Strategies", "Beneficial Insects", "Disease Management"]
    }
  ];

  const filteredExperts = selectedCategory === "all" 
    ? experts 
    : experts.filter(expert => expert.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-primary hover:text-primary-glow mb-4 transition-colors">
            <div className="bg-gradient-primary p-1 rounded shadow-natural">
              <Leaf className="h-3 w-3 text-primary-foreground" />
            </div>
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Expert Consultation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Connect with certified agricultural experts for personalized advice on your farming challenges.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="transition-all duration-200"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredExperts.map((expert) => (
            <Card key={expert.id} className="hover:shadow-glow transition-all duration-300 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={expert.image} alt={expert.name} />
                    <AvatarFallback>{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-foreground mb-1">{expert.name}</CardTitle>
                    <CardDescription className="text-primary font-medium mb-2">
                      {expert.specialty}
                    </CardDescription>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{expert.rating} ({expert.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{expert.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{expert.bio}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-semibold text-foreground">{expert.price}</div>
                    <div className="text-sm text-muted-foreground">{expert.availability}</div>
                  </div>
                  <Badge 
                    variant={expert.availability.includes("Now") ? "default" : "secondary"}
                    className="px-3 py-1"
                  >
                    {expert.availability}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Video className="h-4 w-4 mr-2" />
                    Video Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="text-center p-8 bg-gradient-nature border-0">
          <div className="max-w-2xl mx-auto">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need Immediate Help?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our experts are available 24/7 for urgent farming questions. Get instant support when you need it most.
            </p>
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              Get Emergency Support
            </Button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Experts;