import { MapPin, Navigation, Home, Building2, Plus, Search } from "lucide-react";
import { useState } from "react";

interface Location {
  id: string;
  name: string;
  address: string;
  type: 'current' | 'saved' | 'custom';
}

interface LocationScreenProps {
  onNext: (location: Location) => void;
  onBack: () => void;
}

const savedAddresses: Location[] = [
  {
    id: 'home',
    name: 'Home',
    address: '123 Main Street, Andheri West, Mumbai',
    type: 'saved'
  },
  {
    id: 'office',
    name: 'Office',
    address: '456 Business Park, Bandra East, Mumbai',
    type: 'saved'
  }
];

const LocationScreen = ({ onNext, onBack }: LocationScreenProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [customAddress, setCustomAddress] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleCurrentLocation = async () => {
    setIsLoadingLocation(true);
    
    try {
      // Simulate getting current location
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const currentLocation: Location = {
        id: 'current',
        name: 'Current Location',
        address: 'Detected: Powai, Mumbai, Maharashtra',
        type: 'current'
      };
      
      setSelectedLocation(currentLocation);
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleSavedLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsAddingCustom(false);
  };

  const handleCustomAddress = () => {
    if (customAddress.trim()) {
      const customLocation: Location = {
        id: 'custom',
        name: 'Custom Address',
        address: customAddress.trim(),
        type: 'custom'
      };
      setSelectedLocation(customLocation);
    }
  };

  const handleContinue = () => {
    if (selectedLocation) {
      onNext(selectedLocation);
    }
  };

  return (
    <div className="mobile-container min-h-screen">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="mr-4 p-2 rounded-lg hover:bg-muted transition-colors"
        >
          ←
        </button>
        <h1 className="page-header text-left flex-1 mb-0">Select Location</h1>
      </div>

      <div className="space-y-4">
        {/* Current Location */}
        <div className="animate-fade-in">
          <button
            onClick={handleCurrentLocation}
            disabled={isLoadingLocation}
            className={`w-full p-4 bg-card border-2 rounded-xl transition-all duration-300 ${
              selectedLocation?.type === 'current' 
                ? 'border-primary bg-primary/10' 
                : 'border-border hover:border-primary/50'
            } ${isLoadingLocation ? 'opacity-70' : ''}`}
          >
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                selectedLocation?.type === 'current' ? 'bg-primary/20' : 'bg-primary/10'
              }`}>
                {isLoadingLocation ? (
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Navigation className={`w-6 h-6 ${
                    selectedLocation?.type === 'current' ? 'text-primary' : 'text-primary'
                  }`} />
                )}
              </div>
              <div className="text-left flex-1">
                <h3 className={`font-semibold ${
                  selectedLocation?.type === 'current' ? 'text-primary' : 'text-foreground'
                }`}>
                  {isLoadingLocation ? 'Getting your location...' : 'Use Current Location'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedLocation?.type === 'current' 
                    ? selectedLocation.address 
                    : 'We\'ll detect your location automatically'
                  }
                </p>
              </div>
              <MapPin className={`w-5 h-5 ${
                selectedLocation?.type === 'current' ? 'text-primary' : 'text-muted-foreground'
              }`} />
            </div>
          </button>
        </div>

        {/* Saved Addresses */}
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-3">Saved Addresses</h3>
          <div className="space-y-3">
            {savedAddresses.map((location) => (
              <button
                key={location.id}
                onClick={() => handleSavedLocation(location)}
                className={`w-full p-4 bg-card border-2 rounded-xl transition-all duration-300 ${
                  selectedLocation?.id === location.id 
                    ? 'border-secondary bg-secondary/10' 
                    : 'border-border hover:border-secondary/50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                    selectedLocation?.id === location.id ? 'bg-secondary/20' : 'bg-secondary/10'
                  }`}>
                    {location.id === 'home' ? (
                      <Home className={`w-6 h-6 ${
                        selectedLocation?.id === location.id ? 'text-secondary' : 'text-secondary'
                      }`} />
                    ) : (
                      <Building2 className={`w-6 h-6 ${
                        selectedLocation?.id === location.id ? 'text-secondary' : 'text-secondary'
                      }`} />
                    )}
                  </div>
                  <div className="text-left flex-1">
                    <h3 className={`font-semibold ${
                      selectedLocation?.id === location.id ? 'text-secondary' : 'text-foreground'
                    }`}>
                      {location.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Add Custom Address */}
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-3">Add New Address</h3>
          
          {!isAddingCustom ? (
            <button
              onClick={() => setIsAddingCustom(true)}
              className="w-full p-4 bg-card border-2 border-dashed border-border rounded-xl hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center justify-center">
                <Plus className="w-6 h-6 text-muted-foreground mr-2" />
                <span className="text-muted-foreground">Add custom address</span>
              </div>
            </button>
          ) : (
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter your address..."
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  className="form-input pl-10"
                  autoFocus
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setIsAddingCustom(false);
                    setCustomAddress('');
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomAddress}
                  disabled={!customAddress.trim()}
                  className={`btn-primary flex-1 ${
                    !customAddress.trim() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {selectedLocation?.type === 'custom' && (
            <div className="mt-3 p-4 bg-success/10 border border-success/20 rounded-xl">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-success mr-2" />
                <div>
                  <p className="font-medium text-success">Custom Address Added</p>
                  <p className="text-sm text-success/80">{selectedLocation.address}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pb-8 mt-8">
        <button 
          onClick={handleContinue}
          disabled={!selectedLocation}
          className={`btn-primary ${!selectedLocation ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Continue to Date & Time
        </button>
      </div>
    </div>
  );
};

export default LocationScreen;