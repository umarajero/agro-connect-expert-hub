import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Mail, Lock, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
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
            
            <CardTitle className="text-2xl font-bold text-foreground">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to access expert agricultural insights and connect with farmers worldwide.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="farmer@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

            <div className="text-center space-y-4">
              <div className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </div>
              
              <div className="text-sm">
                <Link to="/forgot-password" className="text-muted-foreground hover:text-primary transition-colors">
                  Forgot your password?
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

export default Login;