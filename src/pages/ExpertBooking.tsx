import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { 
  ArrowLeft, 
  Leaf, 
  Star, 
  Clock, 
  DollarSign, 
  Calendar as CalendarIcon,
  User,
  Mail,
  Phone,
  MessageSquare
} from "lucide-react";
import { expertsService, Expert } from "@/lib/experts";
import { bookingsService, BookingRequest } from "@/lib/bookings";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const ExpertBooking = () => {
  const { expertId } = useParams<{ expertId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(60);
  
  // Form data
  const [formData, setFormData] = useState({
    farmerName: "",
    farmerEmail: "",
    farmerPhone: "",
    consultationReason: ""
  });

  // Available time slots
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00"
  ];

  useEffect(() => {
    const loadExpert = async () => {
      if (!expertId) return;
      
      try {
        const expertData = await expertsService.getExpertById(expertId);
        setExpert(expertData);
        
        // Pre-fill user data if authenticated
        if (user) {
          setFormData(prev => ({
            ...prev,
            farmerEmail: user.email || "",
            farmerName: user.user_metadata?.full_name || ""
          }));
        }
      } catch (error) {
        console.error('Error loading expert:', error);
        toast.error('Expert not found');
        navigate('/experts');
      } finally {
        setLoading(false);
      }
    };

    loadExpert();
  }, [expertId, user, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePrice = () => {
    if (!expert) return 0;
    return (expert.hourly_rate * duration) / 60;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to book a consultation");
      navigate("/farmer-auth");
      return;
    }

    if (!expert || !selectedDate || !selectedTime) {
      toast.error("Please select a date and time");
      return;
    }

    setSubmitting(true);

    try {
      // Check availability
      const dateStr = selectedDate.toISOString().split('T')[0];
      const isAvailable = await bookingsService.checkTimeSlotAvailability(
        expert.id, 
        dateStr, 
        selectedTime
      );

      if (!isAvailable) {
        toast.error("This time slot is no longer available. Please select another time.");
        setSubmitting(false);
        return;
      }

      const bookingData: BookingRequest = {
        expert_id: expert.id,
        booking_date: dateStr,
        booking_time: selectedTime,
        duration_minutes: duration,
        total_price: calculatePrice(),
        farmer_name: formData.farmerName,
        farmer_email: formData.farmerEmail,
        farmer_phone: formData.farmerPhone,
        consultation_reason: formData.consultationReason
      };

      await bookingsService.createBooking(bookingData);
      
      toast.success("Booking request submitted successfully! The expert will review and confirm your booking.");
      navigate("/farmer-dashboard");
    } catch (error: any) {
      console.error('Error creating booking:', error);
      toast.error(error.message || "Failed to create booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading expert details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-foreground mb-2">Expert not found</h3>
            <p className="text-muted-foreground mb-4">The expert you're looking for doesn't exist or is no longer available.</p>
            <Button asChild>
              <Link to="/experts">Browse Other Experts</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatSpecialization = (specialization: string) => {
    return specialization
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Link to="/experts" className="inline-flex items-center space-x-2 text-primary hover:text-primary-glow mb-4 transition-colors">
            <div className="bg-gradient-primary p-1 rounded shadow-natural">
              <Leaf className="h-3 w-3 text-primary-foreground" />
            </div>
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Experts</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book Consultation
          </h1>
          <p className="text-xl text-muted-foreground">
            Schedule a consultation with {expert.full_name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Expert Info */}
          <div className="lg:col-span-1">
            <Card className="shadow-glow bg-card/80 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${expert.full_name}`} />
                    <AvatarFallback>{expert.full_name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{expert.full_name}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {formatSpecialization(expert.specialization)}
                    </CardDescription>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm">{expert.rating.toFixed(1)} ({expert.total_reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Hourly Rate:</span>
                    <span className="font-semibold text-lg">${expert.hourly_rate}/hour</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-medium">{expert.experience} years</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{expert.location}</span>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">About</h4>
                    <p className="text-sm text-muted-foreground">{expert.bio}</p>
                  </div>

                  {expert.education && (
                    <div className="pt-2">
                      <h4 className="font-semibold mb-2">Education</h4>
                      <p className="text-sm text-muted-foreground">{expert.education}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-glow bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Schedule Your Consultation</CardTitle>
                <CardDescription>
                  Fill in the details below to book your consultation session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Date and Time Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="rounded-md border"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Select Time</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                            className="justify-center"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <select
                          id="duration"
                          value={duration}
                          onChange={(e) => setDuration(Number(e.target.value))}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value={30}>30 minutes</option>
                          <option value={60}>60 minutes</option>
                          <option value={90}>90 minutes</option>
                          <option value={120}>120 minutes</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Contact Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="farmerName">Full Name *</Label>
                        <Input
                          id="farmerName"
                          value={formData.farmerName}
                          onChange={(e) => handleInputChange("farmerName", e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="farmerEmail">Email Address *</Label>
                        <Input
                          id="farmerEmail"
                          type="email"
                          value={formData.farmerEmail}
                          onChange={(e) => handleInputChange("farmerEmail", e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="farmerPhone">Phone Number *</Label>
                      <Input
                        id="farmerPhone"
                        type="tel"
                        value={formData.farmerPhone}
                        onChange={(e) => handleInputChange("farmerPhone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  {/* Consultation Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Consultation Details
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="consultationReason">Reason for Consultation *</Label>
                      <Textarea
                        id="consultationReason"
                        value={formData.consultationReason}
                        onChange={(e) => handleInputChange("consultationReason", e.target.value)}
                        placeholder="Please describe your farming challenge, questions, or what you'd like to discuss during the consultation..."
                        rows={4}
                        required
                      />
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Price Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{duration} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate:</span>
                        <span>${expert.hourly_rate}/hour</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>${calculatePrice().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={submitting || !selectedDate || !selectedTime}
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    size="lg"
                  >
                    {submitting ? "Submitting Booking..." : "Book Consultation"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExpertBooking;