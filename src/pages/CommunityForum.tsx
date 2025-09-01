import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Leaf, 
  MessageCircle, 
  Users, 
  Search,
  MapPin,
  Calendar,
  TrendingUp,
  ExternalLink,
  Phone,
  Share2,
  Globe,
  UserPlus,
  MessageSquare,
  Heart,
  Eye
} from "lucide-react";

const CommunityForum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Groups" },
    { id: "crop-farming", name: "Crop Farming" },
    { id: "livestock", name: "Livestock" },
    { id: "organic", name: "Organic Farming" },
    { id: "irrigation", name: "Irrigation" },
    { id: "pest-control", name: "Pest Control" },
    { id: "market-trends", name: "Market Trends" },
    { id: "equipment", name: "Equipment & Tools" }
  ];

  const whatsappGroups = [
    {
      id: 1,
      name: "Nigerian Crop Farmers United",
      description: "Connect with crop farmers across Nigeria. Share experiences, ask questions, and learn from each other.",
      members: 1247,
      category: "crop-farming",
      location: "Nigeria",
      language: "English/Hausa",
      whatsappLink: "https://chat.whatsapp.com/invite/crop-farmers-nigeria",
      admin: "Alhaji Musa Ibrahim",
      lastActivity: "2 hours ago",
      topics: ["Maize farming", "Rice cultivation", "Pest management", "Market prices"]
    },
    {
      id: 2,
      name: "Lagos State Organic Farmers",
      description: "Organic farming community in Lagos. Share organic techniques, certification tips, and market opportunities.",
      members: 523,
      category: "organic",
      location: "Lagos State",
      language: "English/Yoruba",
      whatsappLink: "https://chat.whatsapp.com/invite/lagos-organic-farmers",
      admin: "Mrs. Adunni Okafor",
      lastActivity: "1 hour ago",
      topics: ["Organic certification", "Composting", "Natural pest control", "Organic markets"]
    },
    {
      id: 3,
      name: "Northern Nigeria Livestock Farmers",
      description: "Livestock farmers from northern Nigeria. Discuss cattle, goat, and sheep farming practices.",
      members: 892,
      category: "livestock",
      location: "Northern Nigeria",
      language: "English/Hausa/Fulfulde",
      whatsappLink: "https://chat.whatsapp.com/invite/northern-livestock",
      admin: "Mallam Garba Shehu",
      lastActivity: "30 minutes ago",
      topics: ["Cattle breeding", "Pasture management", "Veterinary care", "Market access"]
    },
    {
      id: 4,
      name: "Irrigation Systems Nigeria",
      description: "Farmers using and interested in irrigation systems. Share tips on drip irrigation, sprinklers, and water management.",
      members: 634,
      category: "irrigation",
      location: "Nigeria",
      language: "English",
      whatsappLink: "https://chat.whatsapp.com/invite/irrigation-nigeria",
      admin: "Eng. Fatima Hassan",
      lastActivity: "4 hours ago",
      topics: ["Drip irrigation", "Water pumps", "Solar irrigation", "Water conservation"]
    },
    {
      id: 5,
      name: "Plateau Vegetable Farmers",
      description: "Vegetable farmers in Plateau State. Perfect climate for vegetables - share your success stories!",
      members: 445,
      category: "crop-farming",
      location: "Plateau State",
      language: "English",
      whatsappLink: "https://chat.whatsapp.com/invite/plateau-vegetables",
      admin: "Mr. John Danjuma",
      lastActivity: "6 hours ago",
      topics: ["Tomato farming", "Irish potatoes", "Cabbage", "Cold storage"]
    },
    {
      id: 6,
      name: "Agricultural Equipment Sharing",
      description: "Share, rent, or buy agricultural equipment. Connect with farmers who have tractors, harvesters, and other tools.",
      members: 756,
      category: "equipment",
      location: "Nigeria",
      language: "English",
      whatsappLink: "https://chat.whatsapp.com/invite/agric-equipment",
      admin: "Chief Emeka Okonkwo",
      lastActivity: "1 day ago",
      topics: ["Tractor rental", "Harvesting equipment", "Processing machines", "Maintenance tips"]
    }
  ];

  const facebookGroups = [
    {
      id: 1,
      name: "Nigeria Farmers Network",
      description: "The largest community of Nigerian farmers on Facebook. Share photos, ask questions, and connect with agricultural experts.",
      members: 15420,
      category: "all",
      location: "Nigeria",
      facebookLink: "https://facebook.com/groups/nigeria-farmers-network",
      admin: "Dr. Chinedu Okoro",
      lastActivity: "15 minutes ago",
      posts: 1250,
      topics: ["General farming", "Success stories", "Problem solving", "Market updates"]
    },
    {
      id: 2,
      name: "Cassava Farmers Association Nigeria",
      description: "Dedicated to cassava farmers across Nigeria. Learn about new varieties, processing techniques, and market opportunities.",
      members: 8934,
      category: "crop-farming",
      location: "Nigeria",
      facebookLink: "https://facebook.com/groups/cassava-farmers-nigeria",
      admin: "Prof. Blessing Adebayo",
      lastActivity: "2 hours ago",
      posts: 892,
      topics: ["Cassava varieties", "Processing", "Export opportunities", "Disease management"]
    },
    {
      id: 3,
      name: "Young Farmers Nigeria",
      description: "Empowering the next generation of Nigerian farmers. Modern farming techniques, technology adoption, and youth in agriculture.",
      members: 6721,
      category: "all",
      location: "Nigeria",
      facebookLink: "https://facebook.com/groups/young-farmers-nigeria",
      admin: "Kemi Adeyemi",
      lastActivity: "1 hour ago",
      posts: 567,
      topics: ["Modern farming", "Technology", "Youth empowerment", "Agribusiness"]
    },
    {
      id: 4,
      name: "Organic Farming Nigeria",
      description: "Promoting sustainable and organic farming practices across Nigeria. Share organic techniques and certification guidance.",
      members: 4156,
      category: "organic",
      location: "Nigeria",
      facebookLink: "https://facebook.com/groups/organic-farming-nigeria",
      admin: "Dr. Amina Bello",
      lastActivity: "3 hours ago",
      posts: 423,
      topics: ["Organic certification", "Natural fertilizers", "Pest control", "Market access"]
    }
  ];

  const filteredWhatsAppGroups = whatsappGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredFacebookGroups = facebookGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJoinWhatsApp = (whatsappLink: string, groupName: string) => {
    window.open(whatsappLink, '_blank');
    // In a real app, you might track this action
    console.log(`User attempting to join WhatsApp group: ${groupName}`);
  };

  const handleJoinFacebook = (facebookLink: string, groupName: string) => {
    window.open(facebookLink, '_blank');
    // In a real app, you might track this action
    console.log(`User attempting to join Facebook group: ${groupName}`);
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
            Community Forum
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Connect with fellow farmers through WhatsApp and Facebook groups. Share experiences, ask questions, and build lasting relationships.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="transition-all duration-200"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{whatsappGroups.length}</div>
              <div className="text-sm text-muted-foreground">WhatsApp Groups</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{facebookGroups.length}</div>
              <div className="text-sm text-muted-foreground">Facebook Groups</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {(whatsappGroups.reduce((sum, group) => sum + group.members, 0) + 
                  facebookGroups.reduce((sum, group) => sum + group.members, 0)).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Active Support</div>
            </CardContent>
          </Card>
        </div>

        {/* WhatsApp Groups */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-green-600 p-2 rounded-lg mr-3">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">WhatsApp Communities</h2>
              <p className="text-muted-foreground">Join instant messaging groups for real-time farmer support</p>
            </div>
          </div>
          
          {filteredWhatsAppGroups.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No WhatsApp groups found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredWhatsAppGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-glow transition-all duration-300 bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-600 p-2 rounded-lg">
                          <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                          <CardDescription className="flex items-center space-x-2">
                            <MapPin className="h-3 w-3" />
                            <span>{group.location}</span>
                            <span>•</span>
                            <span>{group.language}</span>
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        WhatsApp
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{group.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {group.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{group.members.toLocaleString()} members</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{group.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Admin: </span>
                        <span className="font-medium">{group.admin}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleJoinWhatsApp(group.whatsappLink, group.name)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Join WhatsApp Group
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Facebook Groups */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Facebook Communities</h2>
              <p className="text-muted-foreground">Join larger communities for discussions, photos, and knowledge sharing</p>
            </div>
          </div>
          
          {filteredFacebookGroups.length === 0 ? (
            <div className="text-center py-12">
              <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Facebook groups found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFacebookGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-glow transition-all duration-300 bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                          <Globe className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                          <CardDescription className="flex items-center space-x-2">
                            <MapPin className="h-3 w-3" />
                            <span>{group.location}</span>
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Facebook
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{group.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {group.topics.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{group.members.toLocaleString()} members</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{group.posts} posts</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Admin: </span>
                        <span className="font-medium">{group.admin}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Active {group.lastActivity}
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleJoinFacebook(group.facebookLink, group.name)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Join Facebook Group
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Community Guidelines */}
        <Card className="mb-8 bg-gradient-nature border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground flex items-center">
              <Heart className="h-6 w-6 mr-2 text-red-500" />
              Community Guidelines
            </CardTitle>
            <CardDescription className="text-base">
              Help us maintain a supportive and respectful farming community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">✅ Do's</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Share your farming experiences and knowledge</li>
                  <li>• Ask questions and help others with their challenges</li>
                  <li>• Post photos of your crops and farming activities</li>
                  <li>• Respect different farming methods and opinions</li>
                  <li>• Share market prices and opportunities</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">❌ Don'ts</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Spam or post irrelevant content</li>
                  <li>• Share false or misleading information</li>
                  <li>• Promote unverified products or services</li>
                  <li>• Use offensive language or discriminate</li>
                  <li>• Share personal contact details publicly</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create Your Own Group CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="text-center p-8 bg-green-50 border-green-200">
            <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Start a WhatsApp Group
            </h3>
            <p className="text-muted-foreground mb-6">
              Create your own farming community for your local area or specific crop type.
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Create WhatsApp Group
            </Button>
          </Card>
          
          <Card className="text-center p-8 bg-blue-50 border-blue-200">
            <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Start a Facebook Group
            </h3>
            <p className="text-muted-foreground mb-6">
              Build a larger community with photo sharing, events, and detailed discussions.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Share2 className="h-4 w-4 mr-2" />
              Create Facebook Group
            </Button>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityForum;