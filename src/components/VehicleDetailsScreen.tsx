import { Car, Truck, Bike, Save } from "lucide-react";
import { useState } from "react";

interface VehicleDetails {
  vehicleType: string;
  brand: string;
  model: string;
  vehicleNumber: string;
  saveToVehicles: boolean;
}

interface VehicleDetailsScreenProps {
  onNext: (vehicleDetails: VehicleDetails) => void;
  onBack: () => void;
}

const vehicleTypes = [
  { id: 'car', name: 'Car', icon: Car },
  { id: 'suv', name: 'SUV', icon: Truck },
  { id: 'bike', name: 'Bike', icon: Bike }
];

const carBrands = ['Honda', 'Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Toyota', 'BMW', 'Audi', 'Mercedes'];
const carModels: { [key: string]: string[] } = {
  'Honda': ['City', 'Civic', 'Amaze', 'WR-V', 'Jazz'],
  'Maruti Suzuki': ['Alto', 'Swift', 'Baleno', 'Dzire', 'Wagon R', 'Vitara Brezza'],
  'Hyundai': ['i20', 'Creta', 'Verna', 'Grand i10', 'Elite i20'],
  'Tata': ['Nexon', 'Harrier', 'Tiago', 'Tigor', 'Safari'],
  'Mahindra': ['XUV500', 'Scorpio', 'Bolero', 'XUV300', 'Thar'],
  'Toyota': ['Innova', 'Fortuner', 'Camry', 'Corolla', 'Etios'],
  'BMW': ['3 Series', '5 Series', 'X1', 'X3', 'X5'],
  'Audi': ['A4', 'A6', 'Q3', 'Q5', 'Q7'],
  'Mercedes': ['C-Class', 'E-Class', 'GLA', 'GLC', 'S-Class']
};

const VehicleDetailsScreen = ({ onNext, onBack }: VehicleDetailsScreenProps) => {
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    vehicleType: '',
    brand: '',
    model: '',
    vehicleNumber: '',
    saveToVehicles: true
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: keyof VehicleDetails, value: string | boolean) => {
    setVehicleDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!vehicleDetails.vehicleType) newErrors.vehicleType = 'Please select vehicle type';
    if (!vehicleDetails.brand) newErrors.brand = 'Please enter brand name';
    if (!vehicleDetails.model) newErrors.model = 'Please enter model';
    if (!vehicleDetails.vehicleNumber) {
      newErrors.vehicleNumber = 'Please enter vehicle number';
    } else if (!/^[A-Z]{2}\s?\d{1,2}\s?[A-Z]{1,2}\s?\d{4}$/i.test(vehicleDetails.vehicleNumber.replace(/\s/g, ''))) {
      newErrors.vehicleNumber = 'Please enter valid vehicle number (e.g., MH 12 AB 1234)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onNext(vehicleDetails);
    }
  };

  const formatVehicleNumber = (value: string) => {
    // Remove all spaces and convert to uppercase
    const cleaned = value.replace(/\s/g, '').toUpperCase();
    
    // Format as XX 00 XX 0000
    let formatted = '';
    if (cleaned.length > 0) formatted += cleaned.slice(0, 2);
    if (cleaned.length > 2) formatted += ' ' + cleaned.slice(2, 4);
    if (cleaned.length > 4) formatted += ' ' + cleaned.slice(4, 6);
    if (cleaned.length > 6) formatted += ' ' + cleaned.slice(6, 10);
    
    return formatted;
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
        <h1 className="page-header text-left flex-1 mb-0">Vehicle Details</h1>
      </div>

      <div className="space-y-6">
        {/* Vehicle Type Selection */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-foreground mb-3">Vehicle Type</label>
          <div className="grid grid-cols-3 gap-3">
            {vehicleTypes.map((type) => {
              const IconComponent = type.icon;
              const isSelected = vehicleDetails.vehicleType === type.id;
              
              return (
                <button
                  key={type.id}
                  onClick={() => handleInputChange('vehicleType', type.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    isSelected 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <IconComponent className={`w-8 h-8 mx-auto mb-2 ${
                    isSelected ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <p className={`text-sm font-medium ${
                    isSelected ? 'text-primary' : 'text-foreground'
                  }`}>
                    {type.name}
                  </p>
                </button>
              );
            })}
          </div>
          {errors.vehicleType && (
            <p className="text-destructive text-sm mt-1">{errors.vehicleType}</p>
          )}
        </div>

        {/* Brand Input */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-foreground mb-3">Brand Name</label>
          <select
            value={vehicleDetails.brand}
            onChange={(e) => {
              handleInputChange('brand', e.target.value);
              handleInputChange('model', ''); // Reset model when brand changes
            }}
            className={`form-select ${errors.brand ? 'border-destructive' : ''}`}
          >
            <option value="">Select Brand</option>
            {carBrands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
          {errors.brand && (
            <p className="text-destructive text-sm mt-1">{errors.brand}</p>
          )}
        </div>

        {/* Model Input */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-foreground mb-3">Model</label>
          <select
            value={vehicleDetails.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            disabled={!vehicleDetails.brand}
            className={`form-select ${errors.model ? 'border-destructive' : ''} ${
              !vehicleDetails.brand ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <option value="">Select Model</option>
            {vehicleDetails.brand && carModels[vehicleDetails.brand]?.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
          {errors.model && (
            <p className="text-destructive text-sm mt-1">{errors.model}</p>
          )}
        </div>

        {/* Vehicle Number Input */}
        <div className="animate-fade-in">
          <label className="block text-sm font-medium text-foreground mb-3">Vehicle Number</label>
          <input
            type="text"
            placeholder="MH 12 AB 1234"
            value={vehicleDetails.vehicleNumber}
            onChange={(e) => handleInputChange('vehicleNumber', formatVehicleNumber(e.target.value))}
            maxLength={13}
            className={`form-input ${errors.vehicleNumber ? 'border-destructive' : ''}`}
          />
          {errors.vehicleNumber && (
            <p className="text-destructive text-sm mt-1">{errors.vehicleNumber}</p>
          )}
        </div>

        {/* Save to My Vehicles Toggle */}
        <div className="animate-fade-in">
          <label className="flex items-center p-4 bg-card rounded-xl border cursor-pointer">
            <input
              type="checkbox"
              checked={vehicleDetails.saveToVehicles}
              onChange={(e) => handleInputChange('saveToVehicles', e.target.checked)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-colors ${
              vehicleDetails.saveToVehicles 
                ? 'bg-primary border-primary' 
                : 'border-border bg-background'
            }`}>
              {vehicleDetails.saveToVehicles && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex items-center">
              <Save className="w-5 h-5 text-primary mr-2" />
              <div>
                <p className="font-medium text-foreground">Save to "My Vehicles"</p>
                <p className="text-sm text-muted-foreground">Quick access for future bookings</p>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="pb-8 mt-8">
        <button 
          onClick={handleContinue}
          className="btn-primary"
        >
          Continue to Location
        </button>
      </div>
    </div>
  );
};

export default VehicleDetailsScreen;