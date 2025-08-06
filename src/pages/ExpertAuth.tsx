import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, Mail, Lock, User, MapPin, ArrowLeft, GraduationCap, 
  Award, FileText, DollarSign, Clock, Users, Star, MessageCircle, 
  Calendar, TrendingUp
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { expertsService } from "@/lib/experts";
import { toast } from "sonner";

const ExpertAuth = () => {
  const navigate = useNavigate();
  const { signUp, signIn, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [existingApplication, setExistingApplication] = useState(null);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Signup form state (account creation)
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Expert application form state
  const [expertData, setExpertData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    specialization: "",
    experience: "",
    education: "",
    certifications: "",
    bio: "",
    hourlyRate: "",
    availability: ""
  });

  // Check for existing application when user is authenticated
  useEffect(() => {
    const checkExistingApplication = async () => {
      if (user) {
        try {
          const application = await expertsService.getUserApplication();
          if (application) {
            setExistingApplication(application);
            // Pre-fill form with existing data
            setExpertData({
              fullName: application.full_name,
              email: application.email,
              phone: application.phone,
              location: application.location,
              specialization: application.specialization,
              experience: application.experience,
              education: application.education,
              certifications: application.certifications || "",
              bio: application.bio,
              hourlyRate: application.hourly_rate.toString(),
              availability: application.availability
            });
          }
        } catch (error) {
          console.error('Error checking existing application:', error);
        }
      }
    };

    checkExistingApplication();
  }, [user]);

  const handleLoginChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignupChange = (field: string, value: string) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  const handleExpertChange = (field: string, value: string) => {
    setExpertData(prev => ({ ...prev, [field]: value }));
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
        user_type: 'expert'
      });
      
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created successfully! Please complete your expert application below.");
        // Pre-fill email in expert form
        setExpertData(prev => ({ ...prev, email: signupData.email }));
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleExpertApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please create an account first");
      return;
    }

    setLoading(true);
    
    try {
      await expertsService.submitApplication({
        full_name: expertData.fullName,
        email: expertData.email,
        phone: expertData.phone,
        location: expertData.location,
        specialization: expertData.specialization,
        experience: expertData.experience,
        education: expertData.education,
        certifications: expertData.certifications,
        bio: expertData.bio,
        hourly_rate: parseInt(expertData.hourlyRate),
        availability: expertData.availability
      });
      
      toast.success("Expert application submitted successfully! We'll review your application and get back to you within 2-3 business days.");
      navigate("/");
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast.error(error.message || "Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Back to Home */}
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-1 rounded shadow-natural">
            <Leaf className="h-3 w-3 text-white" />
          </div>
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <Card className="shadow-elegant border-border/50">
          <CardHeader className="text-center space-y-4">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg shadow-natural">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Expert Portal</span>
            </div>
            
            <CardTitle className="text-2xl font-bold text-foreground">Agricultural Expert</CardTitle>
            <CardDescription className="text-muted-foreground">
              Join our network of agricultural professionals and help farmers worldwide
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!user ? (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Create Account</TabsTrigger>
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
                          placeholder="expert@example.com"
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
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="expert@example.com"
                          value={signupData.email}
                          onChange={(e) => handleSignupChange("email", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
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
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    After creating your account, you'll complete your expert application below.
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-6">
                {/* Application Status */}
                {existingApplication && (
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          existingApplication.status === 'approved' ? 'bg-green-500' :
                          existingApplication.status === 'rejected' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}></div>
                        <span className="font-medium">
                          Application Status: {existingApplication.status.charAt(0).toUpperCase() + existingApplication.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {existingApplication.status === 'pending' && "Your application is under review. We'll get back to you within 2-3 business days."}
                        {existingApplication.status === 'approved' && "Congratulations! Your application has been approved. You can now start consulting with farmers."}
                        {existingApplication.status === 'rejected' && "Your application was not approved. Please review the requirements and submit a new application."}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Expert Application Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Expert Application
                    </CardTitle>
                    <CardDescription>
                      Complete your professional profile to join our expert network
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleExpertApplication} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center">
                          <User className="h-5 w-5 mr-2" />
                          Personal Information
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                              id="fullName"
                              value={expertData.fullName}
                              onChange={(e) => handleExpertChange("fullName", e.target.value)}
                              placeholder="Dr. John Smith"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={expertData.email}
                              onChange={(e) => handleExpertChange("email", e.target.value)}
                              placeholder="expert@example.com"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={expertData.phone}
                              onChange={(e) => handleExpertChange("phone", e.target.value)}
                              placeholder="+1 (555) 123-4567"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location *</Label>
                            <Input
                              id="location"
                              value={expertData.location}
                              onChange={(e) => handleExpertChange("location", e.target.value)}
                              placeholder="City, Country"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Professional Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center">
                          <GraduationCap className="h-5 w-5 mr-2" />
                          Professional Background
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="specialization">Specialization *</Label>
                            <Select onValueChange={(value) => handleExpertChange("specialization", value)} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your area of expertise" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="crop-management">Crop Management</SelectItem>
                                <SelectItem value="soil-health">Soil Health</SelectItem>
                                <SelectItem value="livestock">Livestock Management</SelectItem>
                                <SelectItem value="pest-control">Pest Control</SelectItem>
                                <SelectItem value="organic-farming">Organic Farming</SelectItem>
                                <SelectItem value="irrigation">Irrigation Systems</SelectItem>
                                <SelectItem value="agricultural-economics">Agricultural Economics</SelectItem>
                                <SelectItem value="plant-pathology">Plant Pathology</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="experience">Years of Experience *</Label>
                            <Select onValueChange={(value) => handleExpertChange("experience", value)} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="5-10">5-10 years</SelectItem>
                                <SelectItem value="10-15">10-15 years</SelectItem>
                                <SelectItem value="15-20">15-20 years</SelectItem>
                                <SelectItem value="20+">20+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="education">Education Background *</Label>
                          <Input
                            id="education"
                            value={expertData.education}
                            onChange={(e) => handleExpertChange("education", e.target.value)}
                            placeholder="PhD in Agricultural Science, University of Agriculture"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="certifications">Certifications & Licenses</Label>
                          <Input
                            id="certifications"
                            value={expertData.certifications}
                            onChange={(e) => handleExpertChange("certifications", e.target.value)}
                            placeholder="Certified Crop Advisor, Organic Certification, etc."
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Professional Bio *</Label>
                          <Textarea
                            id="bio"
                            value={expertData.bio}
                            onChange={(e) => handleExpertChange("bio", e.target.value)}
                            placeholder="Tell us about your experience, achievements, and what makes you a great agricultural expert..."
                            rows={4}
                            required
                          />
                        </div>
                      </div>

                      {/* Service Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground flex items-center">
                          <DollarSign className="h-5 w-5 mr-2" />
                          Service Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="hourlyRate">Desired Hourly Rate (USD) *</Label>
                            <Input
                              id="hourlyRate"
                              type="number"
                              value={expertData.hourlyRate}
                              onChange={(e) => handleExpertChange("hourlyRate", e.target.value)}
                              placeholder="45"
                              min="20"
                              max="200"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="availability">Availability *</Label>
                            <Select onValueChange={(value) => handleExpertChange("availability", value)} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your availability" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="full-time">Full-time (40+ hours/week)</SelectItem>
                                <SelectItem value="part-time">Part-time (20-40 hours/week)</SelectItem>
                                <SelectItem value="flexible">Flexible (10-20 hours/week)</SelectItem>
                                <SelectItem value="weekends">Weekends only</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        disabled={loading || (existingApplication && existingApplication.status === 'approved')}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                        size="lg"
                      >
                        {loading ? "Submitting Application..." : 
                         existingApplication && existingApplication.status === 'approved' ? "Application Approved" :
                         existingApplication && existingApplication.status === 'pending' ? "Update Application" :
                         "Submit Expert Application"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpertAuth;