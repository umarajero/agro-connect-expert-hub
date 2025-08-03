import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Leaf, 
  MapPin, 
  Thermometer, 
  Droplets, 
  Zap,
  Info,
  Search,
  Filter,
  Cloud
} from "lucide-react";

// Nigeria soil data with regions and their characteristics
const nigerianSoilData = {
  "Lagos": {
    soilType: "Sandy Loam",
    pH: "6.0-7.0",
    organicMatter: "Medium",
    drainage: "Good",
    fertility: "Medium",
    recommendedCrops: ["Cassava", "Yam", "Plantain", "Cocoyam", "Vegetables"],
    challenges: ["Soil erosion", "Nutrient depletion"],
    coordinates: { lat: 6.5244, lng: 3.3792 },
    color: "#8B4513",
    weather: {
      temperature: "28°C",
      humidity: "85%",
      rainfall: "1,200mm/year",
      forecast: "Partly cloudy with afternoon showers",
      season: "Wet season"
    }
  },
  "Kano": {
    soilType: "Sandy Clay",
    pH: "6.5-7.5",
    organicMatter: "Low",
    drainage: "Moderate",
    fertility: "Medium",
    recommendedCrops: ["Millet", "Sorghum", "Groundnuts", "Cotton", "Cowpea"],
    challenges: ["Water scarcity", "Soil degradation"],
    coordinates: { lat: 12.0022, lng: 8.5920 },
    color: "#D2691E",
    weather: {
      temperature: "35°C",
      humidity: "45%",
      rainfall: "600mm/year",
      forecast: "Hot and dry with clear skies",
      season: "Dry season"
    }
  },
  "Kaduna": {
    soilType: "Clay Loam",
    pH: "6.0-7.0",
    organicMatter: "Medium",
    drainage: "Moderate",
    fertility: "High",
    recommendedCrops: ["Maize", "Rice", "Yam", "Ginger", "Tomatoes"],
    challenges: ["Seasonal flooding", "Pest management"],
    coordinates: { lat: 10.5222, lng: 7.4383 },
    color: "#A0522D",
    weather: {
      temperature: "30°C",
      humidity: "70%",
      rainfall: "1,000mm/year",
      forecast: "Warm with scattered thunderstorms",
      season: "Transition season"
    }
  },
  "Rivers": {
    soilType: "Clay",
    pH: "5.5-6.5",
    organicMatter: "High",
    drainage: "Poor",
    fertility: "High",
    recommendedCrops: ["Rice", "Plantain", "Cassava", "Oil Palm", "Cocoyam"],
    challenges: ["Waterlogging", "Soil acidity"],
    coordinates: { lat: 4.8156, lng: 7.0498 },
    color: "#654321",
    weather: {
      temperature: "26°C",
      humidity: "90%",
      rainfall: "2,400mm/year",
      forecast: "Heavy rainfall with high humidity",
      season: "Wet season"
    }
  },
  "Ogun": {
    soilType: "Loamy Sand",
    pH: "6.0-6.8",
    organicMatter: "Medium",
    drainage: "Good",
    fertility: "Medium",
    recommendedCrops: ["Cassava", "Maize", "Cocoa", "Kola nut", "Vegetables"],
    challenges: ["Soil erosion", "Nutrient management"],
    coordinates: { lat: 7.1608, lng: 3.3566 },
    color: "#8B7355",
    weather: {
      temperature: "27°C",
      humidity: "80%",
      rainfall: "1,100mm/year",
      forecast: "Mild temperatures with morning mist",
      season: "Wet season"
    }
  },
  "Plateau": {
    soilType: "Volcanic Soil",
    pH: "6.5-7.2",
    organicMatter: "High",
    drainage: "Excellent",
    fertility: "Very High",
    recommendedCrops: ["Irish Potato", "Tomatoes", "Cabbage", "Carrots", "Beans"],
    challenges: ["Temperature fluctuation", "Erosion on slopes"],
    coordinates: { lat: 9.2182, lng: 9.5179 },
    color: "#2F4F4F",
    weather: {
      temperature: "22°C",
      humidity: "65%",
      rainfall: "1,300mm/year",
      forecast: "Cool and pleasant with light winds",
      season: "Cool dry season"
    }
  },
  "Cross River": {
    soilType: "Forest Soil",
    pH: "5.8-6.5",
    organicMatter: "Very High",
    drainage: "Good",
    fertility: "High",
    recommendedCrops: ["Cocoa", "Oil Palm", "Plantain", "Cassava", "Yam"],
    challenges: ["Deforestation", "Soil acidity"],
    coordinates: { lat: 5.9631, lng: 8.3250 },
    color: "#228B22",
    weather: {
      temperature: "25°C",
      humidity: "88%",
      rainfall: "2,000mm/year",
      forecast: "Tropical climate with frequent showers",
      season: "Wet season"
    }
  },
  "Borno": {
    soilType: "Sandy",
    pH: "7.0-8.0",
    organicMatter: "Very Low",
    drainage: "Excellent",
    fertility: "Low",
    recommendedCrops: ["Millet", "Sorghum", "Groundnuts", "Sesame", "Date Palm"],
    challenges: ["Desertification", "Water scarcity", "Low fertility"],
    coordinates: { lat: 11.8846, lng: 13.1571 },
    color: "#F4A460",
    weather: {
      temperature: "38°C",
      humidity: "25%",
      rainfall: "300mm/year",
      forecast: "Very hot and arid with dust storms",
      season: "Dry season"
    }
  }
};

const SoilMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>("all");
  const [mapLoaded, setMapLoaded] = useState(false);

  // Get all unique crops for filtering
  const allCrops = Array.from(new Set(
    Object.values(nigerianSoilData).flatMap(region => region.recommendedCrops)
  )).sort();

  // Filter regions based on selected crop
  const filteredRegions = selectedCrop === "all" 
    ? Object.keys(nigerianSoilData)
    : Object.keys(nigerianSoilData).filter(region => 
        nigerianSoilData[region as keyof typeof nigerianSoilData].recommendedCrops.includes(selectedCrop)
      );

  const getSoilTypeColor = (soilType: string) => {
    const colorMap: { [key: string]: string } = {
      "Sandy": "#F4A460",
      "Sandy Loam": "#DEB887",
      "Sandy Clay": "#D2691E",
      "Clay Loam": "#A0522D",
      "Clay": "#654321",
      "Loamy Sand": "#F5DEB3",
      "Volcanic Soil": "#2F4F4F",
      "Forest Soil": "#228B22"
    };
    return colorMap[soilType] || "#8B4513";
  };

  const getFertilityColor = (fertility: string) => {
    const colorMap: { [key: string]: string } = {
      "Very High": "#006400",
      "High": "#32CD32",
      "Medium": "#FFD700",
      "Low": "#FF6347",
      "Very Low": "#DC143C"
    };
    return colorMap[fertility] || "#FFD700";
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
            Nigeria Soil Analysis Map
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Explore soil types across Nigerian regions and discover the best crops for each area based on soil characteristics.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Select onValueChange={setSelectedCrop} defaultValue="all">
              <SelectTrigger className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                {allCrops.map(crop => (
                  <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={() => setSelectedRegion(null)}>
            Clear Selection
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-glow bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Interactive Soil Map
                </CardTitle>
                <CardDescription>
                  Click on regions to view detailed soil information and crop recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Simplified Map Visualization */}
                <div className="relative bg-gradient-to-br from-green-50 to-brown-50 rounded-lg p-6 min-h-[400px] border-2 border-border">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Nigeria Soil Regions</h3>
                      <p className="text-muted-foreground mb-4">Interactive map visualization</p>
                    </div>
                  </div>
                  
                  {/* Region Markers */}
                  <div className="relative h-full">
                    {Object.entries(nigerianSoilData).map(([region, data]) => {
                      if (!filteredRegions.includes(region)) return null;
                      
                      // Calculate position based on coordinates (simplified)
                      const x = ((data.coordinates.lng - 3) / (14 - 3)) * 100;
                      const y = ((12 - data.coordinates.lat) / (12 - 4)) * 100;
                      
                      return (
                        <button
                          key={region}
                          onClick={() => setSelectedRegion(region)}
                          className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-150 ${
                            selectedRegion === region ? 'scale-150 ring-4 ring-primary/50' : ''
                          }`}
                          style={{
                            left: `${Math.max(5, Math.min(95, x))}%`,
                            top: `${Math.max(5, Math.min(95, y))}%`,
                            backgroundColor: data.color
                          }}
                          title={region}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Soil Type Legend</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Array.from(new Set(Object.values(nigerianSoilData).map(d => d.soilType))).map(soilType => (
                      <div key={soilType} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full border border-white"
                          style={{ backgroundColor: getSoilTypeColor(soilType) }}
                        />
                        <span className="text-xs text-muted-foreground">{soilType}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Region Details */}
          <div className="space-y-6">
            {selectedRegion ? (
              <Card className="shadow-glow bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    {selectedRegion} State
                  </CardTitle>
                  <CardDescription>
                    Detailed soil analysis and crop recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(() => {
                    const data = nigerianSoilData[selectedRegion as keyof typeof nigerianSoilData];
                    return (
                      <>
                        {/* Soil Characteristics */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-foreground">Soil Characteristics</h4>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Soil Type:</span>
                            <Badge style={{ backgroundColor: getSoilTypeColor(data.soilType) }} className="text-white">
                              {data.soilType}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">pH Level:</span>
                            <span className="font-medium">{data.pH}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Organic Matter:</span>
                            <span className="font-medium">{data.organicMatter}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Drainage:</span>
                            <span className="font-medium">{data.drainage}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Fertility:</span>
                            <Badge style={{ backgroundColor: getFertilityColor(data.fertility) }} className="text-white">
                              {data.fertility}
                            </Badge>
                          </div>
                        </div>

                        {/* Weather Information */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-foreground flex items-center">
                            <Cloud className="h-4 w-4 mr-2" />
                            Weather Forecast
                          </h4>
                          
                          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground text-sm">Temperature:</span>
                              <span className="font-medium text-sm">{data.weather.temperature}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground text-sm">Humidity:</span>
                              <span className="font-medium text-sm">{data.weather.humidity}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground text-sm">Annual Rainfall:</span>
                              <span className="font-medium text-sm">{data.weather.rainfall}</span>
                            </div>
                            
                            <div className="pt-2 border-t border-border">
                              <p className="text-xs text-muted-foreground mb-1">Current Forecast:</p>
                              <p className="text-sm font-medium">{data.weather.forecast}</p>
                              <Badge variant="outline" className="mt-2 text-xs">
                                {data.weather.season}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {/* Recommended Crops */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-foreground">Recommended Crops</h4>
                          <div className="flex flex-wrap gap-2">
                            {data.recommendedCrops.map(crop => (
                              <Badge key={crop} variant="secondary" className="text-xs">
                                {crop}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Challenges */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-foreground">Common Challenges</h4>
                          <ul className="space-y-1">
                            {data.challenges.map(challenge => (
                              <li key={challenge} className="text-sm text-muted-foreground flex items-center">
                                <div className="w-2 h-2 bg-destructive rounded-full mr-2"></div>
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                          <Search className="h-4 w-4 mr-2" />
                          Find Local Experts
                        </Button>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-glow bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Select a Region</h3>
                  <p className="text-muted-foreground text-sm">
                    Click on any region marker on the map to view detailed soil information and crop recommendations.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="bg-gradient-nature border-0">
              <CardHeader>
                <CardTitle className="text-lg">Nigeria Agriculture Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total States:</span>
                  <span className="font-semibold">36 + FCT</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Arable Land:</span>
                  <span className="font-semibold">84 million hectares</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Major Crops:</span>
                  <span className="font-semibold">50+ varieties</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Soil Types:</span>
                  <span className="font-semibold">8 major types</span>
                </div>
              </CardContent>
            </Card>

            {/* Soil Testing CTA */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <Thermometer className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Need Soil Testing?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Get professional soil analysis for your specific location
                </p>
                <Button variant="outline" size="sm">
                  Find Testing Centers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Regional Overview */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Regional Soil Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(nigerianSoilData).map(([region, data]) => {
              if (!filteredRegions.includes(region)) return null;
              
              return (
                <Card 
                  key={region} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-glow ${
                    selectedRegion === region ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedRegion(region)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: data.color }}
                      />
                      {region}
                    </CardTitle>
                    <CardDescription>{data.soilType}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Fertility:</span>
                        <Badge 
                          size="sm" 
                          style={{ backgroundColor: getFertilityColor(data.fertility) }}
                          className="text-white text-xs"
                        >
                          {data.fertility}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {data.recommendedCrops.slice(0, 3).join(", ")}
                        {data.recommendedCrops.length > 3 && "..."}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SoilMap;