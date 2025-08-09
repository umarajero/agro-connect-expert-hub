import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MessageCircle, Video, Clock, Users, ArrowLeft, Leaf, AlertCircle, Search, Filter } from "lucide-react";
import { useEffect } from "react";
import { expertsService, Expert } from "@/lib/experts";
import { toast } from "sonner";

const Experts = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "All Experts" },
    { id: "crop-management", name: "Crop Management" },
    { id: "livestock", name: "Livestock Management" },
    { id: "soil-health", name: "Soil Health" },
    { id: "pest-control", name: "Pest Control" },
    { id: "organic-farming", name: "Organic Farming" },
    { id: "irrigation", name: "Irrigation Systems" },
    { id: "agricultural-economics", name: "Agricultural Economics" },
    { id: "plant-pathology", name: "Plant Pathology" }
  ];

  const availabilityOptions = [
    { id: "all", name: "All Availability" },
    { id: "full-time", name: "Full-time" },
    { id: "part-time", name: "Part-time" },
    { id: "flexible", name: "Flexible" },
    { id: "weekends", name: "Weekends" }
  ];
  // Load experts from Supabase
  useEffect(() => {
    const loadExperts = async () => {
      try {
        setLoading(true);
        setError(null);
        const expertsData = await expertsService.getApprovedExperts();
        setExperts(expertsData);
      } catch (error) {
        console.error('Error loading experts:', error);
        setError('Failed to load experts. Please try again later.');
        toast.error('Failed to load experts');
      } finally {
        setLoading(false);
      }
    };

    loadExperts();
  }, []);

  const filteredExperts = experts.filter(expert => {
    const matchesCategory = selectedCategory === "all" || expert.specialization === selectedCategory;
    const matchesAvailability = selectedAvailability === "all" || expert.availability === selectedAvailability;
    const matchesSearch = searchTerm === "" || 
      expert.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesAvailability && matchesSearch;
  });

  // Helper function to get availability status
  const getAvailabilityStatus = (availability: string) => {
    const availabilityMap: { [key: string]: string } = {
      'full-time': 'Available Now',
      'part-time': 'Available Today',
      'flexible': 'Available Soon',
      'weekends': 'Available Weekends'
    };
    return availabilityMap[availability] || 'Contact for Availability';
  };

  // Helper function to get experience display
  const getExperienceDisplay = (experience: string) => {
    const experienceMap: { [key: string]: string } = {
      '5-10': '5-10 years',
      '10-15': '10-15 years', 
      '15-20': '15-20 years',
      '20+': '20+ years'
    };
    return experienceMap[experience] || experience;
  };

  // Helper function to format specialization for display
  const formatSpecialization = (specialization: string) => {
    return specialization
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Helper function to get availability badge variant
  const getAvailabilityVariant = (availability: string) => {
    if (availability === "full-time") return "default";
    if (availability === "part-time") return "secondary";
    return "outline";
  };

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

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search experts by name, specialization, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select onValueChange={setSelectedAvailability} defaultValue="all">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                {availabilityOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
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
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading experts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Error Loading Experts</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : filteredExperts.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No experts found</h3>
            <p className="text-muted-foreground">
              {selectedCategory === "all" 
                ? "No approved experts are currently available. Check back soon!"
                : "No experts found in this category. Try selecting a different category."
              }
            </p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <Link to="/become-expert">
                  Become an Expert
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {filteredExperts.map((expert) => (
              <Card key={expert.id} className="hover:shadow-glow transition-all duration-300 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${expert.full_name}`} />
                      <AvatarFallback>{expert.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-foreground mb-1">{expert.full_name}</CardTitle>
                      <CardDescription className="text-primary font-medium mb-2">
                        {formatSpecialization(expert.specialization)}
                      </CardDescription>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{expert.rating.toFixed(1)} ({expert.total_reviews} reviews)</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{getExperienceDisplay(expert.experience)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{expert.bio}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {expert.education && (
                      <Badge variant="secondary" className="text-xs">
                        {expert.education}
                      </Badge>
                    )}
                    {expert.certifications && (
                      <Badge variant="secondary" className="text-xs">
                        {expert.certifications}
                      </Badge>
                    )}
                    {expert.location && (
                      <Badge variant="secondary" className="text-xs">
                        {expert.location}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-lg font-semibold text-foreground">₦{expert.hourly_rate.toLocaleString('en-NG')}/hour</div>
                      <div className="text-sm text-muted-foreground">{getAvailabilityStatus(expert.availability)}</div>
                    </div>
                    <Badge 
                      variant={getAvailabilityVariant(expert.availability)}
                      className="px-3 py-1"
                    >
                      {getAvailabilityStatus(expert.availability)}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-primary hover:shadow-glow transition-all duration-300">
                      <Link to={`/expert/${expert.id}/book`} className="flex items-center w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Book Consultation
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          
          <Card className="text-center p-8 bg-primary/5 border-primary/20">
            <div className="max-w-2xl mx-auto">
              <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Become an Expert
              </h3>
              <p className="text-muted-foreground mb-6">
                Share your agricultural expertise and help farmers worldwide while earning competitive rates.
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link to="/become-expert">
                  Apply Now
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Experts;