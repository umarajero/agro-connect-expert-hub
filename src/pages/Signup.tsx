import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Mail, Lock, User, MapPin, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    farmType: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await signUp(formData.email, formData.password, {
        full_name: formData.fullName,
        location: formData.location,
        farm_type: formData.farmType
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created successfully! Please check your email to verify your account.");
        navigate("/login");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <div className="bg-gradient-primary p-1 rounded shadow-natural">
            <Leaf className="h-3 w-3 text-primary-foreground" />
          </div>
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <Card className="shadow-elegant border-border/50">
          <CardHeader className="text-center space-y-4">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-2">
              <div className="bg-gradient-primary p-2 rounded-lg shadow-natural">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">AgroDiverse</span>
            </div>
            
            <CardTitle className="text-2xl font-bold text-foreground">Join AgroDiverse</CardTitle>
            <CardDescription className="text-muted-foreground">
              Create your account and connect with agricultural experts worldwide.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="farmer@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-foreground">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmType" className="text-foreground">Farm Type</Label>
                <Select onValueChange={(value) => handleInputChange("farmType", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your farm type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crop">Crop Farming</SelectItem>
                    <SelectItem value="livestock">Livestock</SelectItem>
                    <SelectItem value="dairy">Dairy Farming</SelectItem>
                    <SelectItem value="poultry">Poultry</SelectItem>
                    <SelectItem value="organic">Organic Farming</SelectItem>
                    <SelectItem value="aquaculture">Aquaculture</SelectItem>
                    <SelectItem value="mixed">Mixed Farming</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </div>

            {/* Note about Supabase */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;