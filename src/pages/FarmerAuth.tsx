import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Mail, Lock, User, MapPin, ArrowLeft, Tractor } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const FarmerAuth = () => {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    farmType: ""
  });

  const handleLoginChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignupChange = (field: string, value: string) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Successfully signed in!");
        navigate("/");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await signUp(signupData.email, signupData.password, {
        full_name: signupData.fullName,
        location: signupData.location,
        farm_type: signupData.farmType,
        user_type: 'farmer'
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created successfully! Please check your email to verify your account.");
        navigate("/");
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
                <Tractor className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Farmer Portal</span>
            </div>
            
            <CardTitle className="text-2xl font-bold text-foreground">Welcome Farmer</CardTitle>
            <CardDescription className="text-muted-foreground">
              Access your farming dashboard and connect with agricultural experts
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="farmer@example.com"
                        value={loginData.email}
                        onChange={(e) => handleLoginChange("email", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => handleLoginChange("password", e.target.value)}
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
                    {loading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signupData.fullName}
                        onChange={(e) => handleSignupChange("fullName", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="farmer@example.com"
                        value={signupData.email}
                        onChange={(e) => handleSignupChange("email", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-location"
                        type="text"
                        placeholder="City, Country"
                        value={signupData.location}
                        onChange={(e) => handleSignupChange("location", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-farmtype">Farm Type</Label>
                    <Select onValueChange={(value) => handleSignupChange("farmType", value)} required>
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
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a strong password"
                        value={signupData.password}
                        onChange={(e) => handleSignupChange("password", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={(e) => handleSignupChange("confirmPassword", e.target.value)}
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerAuth;