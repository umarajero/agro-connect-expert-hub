import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Leaf, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Award, 
  FileText,
  CheckCircle,
  Star,
  Users,
  DollarSign,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { expertsService } from "@/lib/experts";
import { useEffect } from "react";

const BecomeExpert = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [existingApplication, setExistingApplication] = useState(null);
  const [formData, setFormData] = useState({
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

  // Check for existing application on component mount
  useEffect(() => {
    const checkExistingApplication = async () => {
      if (user) {
        try {
          const application = await expertsService.getUserApplication();
          if (application) {
            setExistingApplication(application);
            // Pre-fill form with existing data
            setFormData({
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to submit your expert application");
      navigate("/login");
      return;
    }

    setLoading(true);
    
    try {
      await expertsService.submitApplication({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        specialization: formData.specialization,
        experience: formData.experience,
        education: formData.education,
        certifications: formData.certifications,
        bio: formData.bio,
        hourly_rate: parseInt(formData.hourlyRate),
        availability: formData.availability
      });
      
      toast.success("Application submitted successfully! We'll review your application and get back to you within 2-3 business days.");
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast.error(error.message || "Failed to submit application. Please try again.");
      setLoading(false);
    }
  };

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn ₦15,000-50,000/hour",
      description: "Set your own rates and earn competitive compensation for your expertise"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Work when you want, from anywhere in the world"
    },
    {
      icon: Users,
      title: "Help Farmers Globally",
      description: "Share your knowledge and make a real impact on agriculture worldwide"
    },
    {
      icon: Star,
      title: "Build Your Reputation",
      description: "Gain recognition as a trusted agricultural expert in our community"
    }
  ];

  const requirements = [
    "Minimum 5 years of agricultural experience",
    "Relevant degree or professional certification",
    "Strong communication skills",
    "Reliable internet connection",
    "Passion for helping farmers succeed"
  ];

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
            Become an Agricultural Expert
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Share your expertise with farmers worldwide and earn money helping them succeed. Join our community of trusted agricultural professionals.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-glow transition-all duration-300 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="bg-gradient-primary p-3 rounded-lg w-fit mx-auto mb-4">
                  <benefit.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Application Form */}
          <div className="lg:col-span-2">
            {existingApplication && (
              <Card className="mb-6 border-primary/20 bg-primary/5">
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
            
            <Card className="shadow-glow bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Expert Application</CardTitle>
                <CardDescription>
                  {existingApplication && existingApplication.status === 'pending' 
                    ? "Your application is currently under review. You can update it below if needed."
                    : existingApplication && existingApplication.status === 'approved'
                    ? "Your expert profile information:"
                    : "Fill out the form below to apply to become an agricultural expert on our platform."
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="Dr. John Smith"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
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
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+234 0838006869"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="Lagos, Nigeria"
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
                        <Select onValueChange={(value) => handleInputChange("specialization", value)} required>
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
                        <Select onValueChange={(value) => handleInputChange("experience", value)} required>
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
                        value={formData.education}
                        onChange={(e) => handleInputChange("education", e.target.value)}
                        placeholder="PhD in Agricultural Science, University of Agriculture"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="certifications">Certifications & Licenses</Label>
                      <Input
                        id="certifications"
                        value={formData.certifications}
                        onChange={(e) => handleInputChange("certifications", e.target.value)}
                        placeholder="Certified Crop Advisor, Organic Certification, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio *</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
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
                        <Label htmlFor="hourlyRate">Desired Hourly Rate (NGN) *</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          value={formData.hourlyRate}
                          onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                          placeholder="15000"
                          min="5000"
                          max="100000"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="availability">Availability *</Label>
                        <Select onValueChange={(value) => handleInputChange("availability", value)} required>
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
                    disabled={loading}
                    disabled={loading || (existingApplication && existingApplication.status === 'approved')}
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    size="lg"
                  >
                    {loading ? "Submitting Application..." : 
                     existingApplication && existingApplication.status === 'approved' ? "Application Approved" :
                     existingApplication && existingApplication.status === 'pending' ? "Update Application" :
                     "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Requirements & Process */}
          <div className="space-y-6">
            {/* Requirements */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Application Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-medium text-foreground">Submit Application</h4>
                      <p className="text-sm text-muted-foreground">Complete the form with your details</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-medium text-foreground">Review Process</h4>
                      <p className="text-sm text-muted-foreground">We'll review your application within 2-3 days</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-medium text-foreground">Interview</h4>
                      <p className="text-sm text-muted-foreground">Brief video interview to assess expertise</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-medium text-foreground">Start Helping</h4>
                      <p className="text-sm text-muted-foreground">Begin consulting with farmers worldwide</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="bg-gradient-nature border-0">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Have questions about becoming an expert? We're here to help!
                </p>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BecomeExpert;