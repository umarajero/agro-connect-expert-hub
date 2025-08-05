import { useState, useEffect } from "react";
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
  Cloud, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  Thermometer,
  Eye,
  Gauge,
  MapPin,
  Search,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Zap
} from "lucide-react";
import { toast } from "sonner";

// Mock weather data for Nigerian locations
const weatherData = {
  "Lagos": {
    current: {
      temperature: 28,
      humidity: 85,
      windSpeed: 12,
      pressure: 1013,
      visibility: 8,
      uvIndex: 7,
      condition: "Partly Cloudy",
      icon: "partly-cloudy",
      feelsLike: 32
    },
    forecast: [
      { day: "Today", high: 30, low: 24, condition: "Thunderstorms", icon: "thunderstorm", precipitation: 80 },
      { day: "Tomorrow", high: 29, low: 23, condition: "Heavy Rain", icon: "heavy-rain", precipitation: 90 },
      { day: "Wednesday", high: 27, low: 22, condition: "Light Rain", icon: "light-rain", precipitation: 60 },
      { day: "Thursday", high: 31, low: 25, condition: "Partly Cloudy", icon: "partly-cloudy", precipitation: 20 },
      { day: "Friday", high: 32, low: 26, condition: "Sunny", icon: "sunny", precipitation: 10 },
      { day: "Saturday", high: 30, low: 24, condition: "Cloudy", icon: "cloudy", precipitation: 30 },
      { day: "Sunday", high: 28, low: 23, condition: "Light Rain", icon: "light-rain", precipitation: 50 }
    ],
    alerts: [
      { type: "warning", title: "Heavy Rainfall Warning", message: "Expect 50-80mm of rainfall in the next 24 hours. Consider delaying outdoor farming activities.", severity: "high" },
      { type: "info", title: "Optimal Planting Window", message: "Soil moisture levels will be ideal for planting after tomorrow's rainfall.", severity: "low" }
    ],
    farmingInsights: {
      soilMoisture: "High",
      irrigationRecommendation: "Suspend irrigation for 2-3 days",
      pestRisk: "Medium - High humidity may increase fungal diseases",
      harvestWindow: "Not recommended for next 48 hours due to rain"
    }
  },
  "Kano": {
    current: {
      temperature: 35,
      humidity: 45,
      windSpeed: 8,
      pressure: 1015,
      visibility: 12,
      uvIndex: 9,
      condition: "Sunny",
      icon: "sunny",
      feelsLike: 38
    },
    forecast: [
      { day: "Today", high: 37, low: 28, condition: "Sunny", icon: "sunny", precipitation: 5 },
      { day: "Tomorrow", high: 36, low: 27, condition: "Partly Cloudy", icon: "partly-cloudy", precipitation: 10 },
      { day: "Wednesday", high: 34, low: 26, condition: "Cloudy", icon: "cloudy", precipitation: 15 },
      { day: "Thursday", high: 35, low: 27, condition: "Sunny", icon: "sunny", precipitation: 0 },
      { day: "Friday", high: 38, low: 29, condition: "Hot", icon: "sunny", precipitation: 0 },
      { day: "Saturday", high: 36, low: 28, condition: "Partly Cloudy", icon: "partly-cloudy", precipitation: 5 },
      { day: "Sunday", high: 33, low: 25, condition: "Cloudy", icon: "cloudy", precipitation: 20 }
    ],
    alerts: [
      { type: "warning", title: "Heat Wave Alert", message: "Temperatures will exceed 37°C. Increase irrigation frequency and provide shade for livestock.", severity: "high" },
      { type: "info", title: "Drought Conditions", message: "No significant rainfall expected for the next 7 days. Monitor soil moisture levels closely.", severity: "medium" }
    ],
    farmingInsights: {
      soilMoisture: "Low",
      irrigationRecommendation: "Increase irrigation frequency - water early morning and evening",
      pestRisk: "Low - Dry conditions reduce pest activity",
      harvestWindow: "Excellent conditions for harvesting and drying crops"
    }
  },
  "Rivers": {
    current: {
      temperature: 26,
      humidity: 90,
      windSpeed: 6,
      pressure: 1011,
      visibility: 6,
      uvIndex: 4,
      condition: "Heavy Rain",
      icon: "heavy-rain",
      feelsLike: 29
    },
    forecast: [
      { day: "Today", high: 27, low: 22, condition: "Heavy Rain", icon: "heavy-rain", precipitation: 95 },
      { day: "Tomorrow", high: 26, low: 21, condition: "Thunderstorms", icon: "thunderstorm", precipitation: 85 },
      { day: "Wednesday", high: 28, low: 23, condition: "Light Rain", icon: "light-rain", precipitation: 70 },
      { day: "Thursday", high: 29, low: 24, condition: "Cloudy", icon: "cloudy", precipitation: 40 },
      { day: "Friday", high: 30, low: 25, condition: "Partly Cloudy", icon: "partly-cloudy", precipitation: 30 },
      { day: "Saturday", high: 28, low: 23, condition: "Light Rain", icon: "light-rain", precipitation: 60 },
      { day: "Sunday", high: 27, low: 22, condition: "Heavy Rain", icon: "heavy-rain", precipitation: 90 }
    ],
    alerts: [
      { type: "danger", title: "Flood Warning", message: "Heavy rainfall may cause flooding in low-lying areas. Move livestock to higher ground.", severity: "high" },
      { type: "warning", title: "High Humidity Alert", message: "Humidity levels above 90% increase risk of crop diseases. Monitor plants closely.", severity: "medium" }
    ],
    farmingInsights: {
      soilMoisture: "Very High",
      irrigationRecommendation: "Stop all irrigation immediately",
      pestRisk: "High - Wet conditions favor fungal diseases and pests",
      harvestWindow: "Postpone harvesting until conditions improve"
    }
  }
};

const Weather = () => {
  const [selectedLocation, setSelectedLocation] = useState("Lagos");
  const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const currentWeather = weatherData[selectedLocation as keyof typeof weatherData];

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const location = searchLocation.trim();
      if (weatherData[location as keyof typeof weatherData]) {
        setSelectedLocation(location);
        toast.success(`Weather data loaded for ${location}`);
      } else {
        toast.error("Location not found. Try Lagos, Kano, or Rivers.");
      }
      setLoading(false);
    }, 1000);
  };

  const getWeatherIcon = (iconType: string) => {
    const iconMap: { [key: string]: any } = {
      "sunny": Sun,
      "partly-cloudy": Cloud,
      "cloudy": Cloud,
      "light-rain": CloudRain,
      "heavy-rain": CloudRain,
      "thunderstorm": Zap
    };
    return iconMap[iconType] || Cloud;
  };

  const getAlertColor = (severity: string) => {
    const colorMap: { [key: string]: string } = {
      "high": "destructive",
      "medium": "default",
      "low": "secondary"
    };
    return colorMap[severity] || "default";
  };

  const getAlertIcon = (type: string) => {
    const iconMap: { [key: string]: any } = {
      "danger": AlertTriangle,
      "warning": AlertTriangle,
      "info": TrendingUp
    };
    return iconMap[type] || AlertTriangle;
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
            Weather Intelligence
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Get hyperlocal weather forecasts, alerts, and climate data to make informed farming decisions.
          </p>
        </div>

        {/* Location Search */}
        <Card className="mb-8 shadow-glow bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Location Search
            </CardTitle>
            <CardDescription>
              Enter your location to get hyperlocal weather data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLocationSearch} className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter city name (e.g., Lagos, Kano, Rivers)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
              >
                {loading ? "Searching..." : "Get Weather"}
              </Button>
            </form>
            <div className="flex gap-2 mt-4">
              {Object.keys(weatherData).map(location => (
                <Button
                  key={location}
                  variant={selectedLocation === location ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLocation(location)}
                >
                  {location}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Weather */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Conditions */}
            <Card className="shadow-glow bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Current Weather - {selectedLocation}
                </CardTitle>
                <CardDescription>Real-time weather conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    {(() => {
                      const IconComponent = getWeatherIcon(currentWeather.current.icon);
                      return <IconComponent className="h-16 w-16 text-primary mx-auto mb-4" />;
                    })()}
                    <div className="text-4xl font-bold text-foreground mb-2">
                      {currentWeather.current.temperature}°C
                    </div>
                    <div className="text-muted-foreground mb-2">
                      Feels like {currentWeather.current.feelsLike}°C
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {currentWeather.current.condition}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Humidity</div>
                        <div className="font-semibold">{currentWeather.current.humidity}%</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Wind className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Wind</div>
                        <div className="font-semibold">{currentWeather.current.windSpeed} km/h</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Gauge className="h-4 w-4 text-green-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Pressure</div>
                        <div className="font-semibold">{currentWeather.current.pressure} hPa</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-purple-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Visibility</div>
                        <div className="font-semibold">{currentWeather.current.visibility} km</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4 text-yellow-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">UV Index</div>
                        <div className="font-semibold">{currentWeather.current.uvIndex}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 7-Day Forecast */}
            <Card className="shadow-glow bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  7-Day Forecast
                </CardTitle>
                <CardDescription>Extended weather outlook for farming planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentWeather.forecast.map((day, index) => {
                    const IconComponent = getWeatherIcon(day.icon);
                    return (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 text-sm font-medium text-muted-foreground">
                            {day.day}
                          </div>
                          <IconComponent className="h-5 w-5 text-primary" />
                          <div className="text-sm text-muted-foreground">
                            {day.condition}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Droplets className="h-3 w-3 text-blue-500" />
                            <span className="text-xs text-muted-foreground">{day.precipitation}%</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{day.high}°</div>
                            <div className="text-sm text-muted-foreground">{day.low}°</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts and Insights */}
          <div className="space-y-6">
            {/* Weather Alerts */}
            <Card className="shadow-glow bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Weather Alerts
                </CardTitle>
                <CardDescription>Important weather warnings for farmers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentWeather.alerts.map((alert, index) => {
                  const IconComponent = getAlertIcon(alert.type);
                  return (
                    <div key={index} className="p-4 rounded-lg border border-border bg-muted/30">
                      <div className="flex items-start space-x-3">
                        <IconComponent className="h-5 w-5 text-destructive mt-0.5" />
                        <div className="flex-1">
                          <div className="font-semibold text-foreground mb-1">
                            {alert.title}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {alert.message}
                          </p>
                          <Badge variant={getAlertColor(alert.severity) as any} size="sm">
                            {alert.severity.toUpperCase()} PRIORITY
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Farming Insights */}
            <Card className="shadow-glow bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Farming Insights
                </CardTitle>
                <CardDescription>AI-powered recommendations based on weather</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Soil Moisture:</span>
                    <Badge variant="secondary">{currentWeather.farmingInsights.soilMoisture}</Badge>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="font-medium text-blue-900 mb-1">💧 Irrigation</div>
                    <p className="text-sm text-blue-800">{currentWeather.farmingInsights.irrigationRecommendation}</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <div className="font-medium text-yellow-900 mb-1">🐛 Pest Risk</div>
                    <p className="text-sm text-yellow-800">{currentWeather.farmingInsights.pestRisk}</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="font-medium text-green-900 mb-1">🌾 Harvest Window</div>
                    <p className="text-sm text-green-800">{currentWeather.farmingInsights.harvestWindow}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-nature border-0">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-foreground mb-4">Need Expert Advice?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Get personalized weather-based farming recommendations from our experts.
                </p>
                <Button size="sm" className="bg-gradient-primary hover:shadow-glow transition-all duration-300" asChild>
                  <Link to="/experts">
                    Consult Weather Expert
                  </Link>
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

export default Weather;