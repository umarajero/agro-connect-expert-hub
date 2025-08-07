import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Leaf, 
  Search, 
  BookOpen, 
  Calendar, 
  User, 
  Clock,
  TrendingUp,
  Filter,
  Star
} from "lucide-react";

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Articles" },
    { id: "crop-management", name: "Crop Management" },
    { id: "soil-health", name: "Soil Health" },
    { id: "pest-control", name: "Pest Control" },
    { id: "irrigation", name: "Irrigation" },
    { id: "organic-farming", name: "Organic Farming" },
    { id: "livestock", name: "Livestock" },
    { id: "market-trends", name: "Market Trends" }
  ];

  const articles = [
    {
      id: 1,
      title: "Sustainable Crop Rotation Techniques for Nigerian Farmers",
      excerpt: "Learn how to implement effective crop rotation strategies that improve soil health and increase yields while reducing pest problems.",
      author: "Dr. Adebayo Ogundimu",
      category: "crop-management",
      readTime: "8 min read",
      publishDate: "2024-01-15",
      featured: true,
      image: "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      title: "Understanding Soil pH and Its Impact on Crop Growth",
      excerpt: "A comprehensive guide to soil pH management, testing methods, and how to adjust soil acidity for optimal plant nutrition.",
      author: "Prof. Fatima Hassan",
      category: "soil-health",
      readTime: "12 min read",
      publishDate: "2024-01-12",
      featured: true,
      image: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      title: "Integrated Pest Management: Natural Solutions",
      excerpt: "Discover eco-friendly pest control methods that protect your crops while maintaining environmental balance and reducing chemical dependency.",
      author: "Dr. Chinedu Okwu",
      category: "pest-control",
      readTime: "10 min read",
      publishDate: "2024-01-10",
      featured: false,
      image: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 4,
      title: "Water-Efficient Irrigation Systems for Small-Scale Farms",
      excerpt: "Explore cost-effective irrigation solutions that maximize water usage efficiency and reduce operational costs for small-scale farmers.",
      author: "Eng. Amina Bello",
      category: "irrigation",
      readTime: "15 min read",
      publishDate: "2024-01-08",
      featured: false,
      image: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 5,
      title: "Organic Farming Certification: A Step-by-Step Guide",
      excerpt: "Navigate the process of obtaining organic certification for your farm, including requirements, costs, and benefits.",
      author: "Dr. Kemi Adeyemi",
      category: "organic-farming",
      readTime: "18 min read",
      publishDate: "2024-01-05",
      featured: false,
      image: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 6,
      title: "Livestock Integration in Crop Production Systems",
      excerpt: "Learn how to successfully integrate livestock into your crop production for improved soil fertility and diversified income streams.",
      author: "Dr. Ibrahim Musa",
      category: "livestock",
      readTime: "14 min read",
      publishDate: "2024-01-03",
      featured: false,
      image: "https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter(article => article.featured);

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
            Knowledge Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover the latest research, best practices, and expert insights to help you grow better crops and build a successful farming business.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
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

        {/* Featured Articles */}
        {selectedCategory === "all" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              <Star className="h-6 w-6 mr-2 text-primary" />
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-glow transition-all duration-300 bg-card/80 backdrop-blur-sm">
                  <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }}>
                    <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(article.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="capitalize">
                        {article.category.replace('-', ' ')}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
                        Read More →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-primary" />
            {selectedCategory === "all" ? "Latest Articles" : `${categories.find(c => c.id === selectedCategory)?.name} Articles`}
          </h2>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-glow transition-all duration-300 bg-card/80 backdrop-blur-sm group cursor-pointer">
                  <div className="aspect-video bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${article.image})` }}>
                    <div className="w-full h-full bg-gradient-to-t from-black/40 to-transparent rounded-t-lg"></div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" size="sm" className="capitalize text-xs">
                        {article.category.replace('-', ' ')}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {new Date(article.publishDate).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-nature border-0 text-center p-8">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground mb-4">
              Stay Updated with Latest Insights
            </CardTitle>
            <CardDescription className="text-base">
              Get the latest agricultural research, farming tips, and expert advice delivered to your inbox weekly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;