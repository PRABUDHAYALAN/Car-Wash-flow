import { CreditCard, Smartphone, Wallet, MapPin, Calendar, Car, Droplets, CheckCircle } from "lucide-react";
import { useState } from "react";

interface OrderDetails {
  plan: any;
  vehicle: any;
  location: any;
  dateTime: any;
}

interface OrderSummaryScreenProps {
  orderDetails: OrderDetails;
  onConfirmOrder: () => void;
  onBack: () => void;
}

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: Smartphone, popular: true },
  { id: 'card', name: 'Card', icon: CreditCard },
  { id: 'wallet', name: 'Wallet', icon: Wallet }
];

const OrderSummaryScreen = ({ orderDetails, onConfirmOrder, onBack }: OrderSummaryScreenProps) => {
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const { plan, vehicle, location, dateTime } = orderDetails;

  const calculatePricing = () => {
    const basePrice = plan.price;
    const tax = Math.round(basePrice * 0.18); // 18% GST
    const discount = plan.id === 'daily' ? 100 : plan.id === 'weekly' ? 200 : plan.id === 'monthly' ? 500 : 0;
    const total = basePrice + tax - discount;

    return {
      basePrice,
      tax,
      discount,
      total
    };
  };

  const pricing = calculatePricing();

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onConfirmOrder();
  };

  const formatDateTime = () => {
    const date = new Date(dateTime.date);
    const timeSlot = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].includes(dateTime.time) 
      ? ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM'][['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'].indexOf(dateTime.time)]
      : dateTime.time;
    
    return `${date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })} at ${timeSlot}`;
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
        <h1 className="page-header text-left flex-1 mb-0">Order Summary</h1>
      </div>

      <div className="space-y-6">
        {/* Service Details */}
        <div className="animate-fade-in">
          <div className="bg-card border rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Service Details</h3>
            
            <div className="space-y-4">
              {/* Wash Plan */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                  <Droplets className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{plan.title} Wash</p>
                  <p className="text-sm text-muted-foreground">
                    {plan.features?.slice(0, 2).join(', ')}
                  </p>
                </div>
                <p className="font-semibold text-primary">₹{plan.price}</p>
              </div>

              {/* Vehicle */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mr-3">
                  <Car className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {vehicle.brand} {vehicle.model}
                  </p>
                  <p className="text-sm text-muted-foreground">{vehicle.vehicleNumber}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mr-3">
                  <MapPin className="w-5 h-5 text-success" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{location.name}</p>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center mr-3">
                  <Calendar className="w-5 h-5 text-warning" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Scheduled Service</p>
                  <p className="text-sm text-muted-foreground">{formatDateTime()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="animate-fade-in">
          <div className="bg-card border rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Price Breakdown</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-foreground">Service charge</span>
                <span className="text-foreground">₹{pricing.basePrice}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-foreground">GST (18%)</span>
                <span className="text-foreground">₹{pricing.tax}</span>
              </div>
              
              {pricing.discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Discount ({plan.title} plan)</span>
                  <span>-₹{pricing.discount}</span>
                </div>
              )}
              
              <hr className="border-border" />
              
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">₹{pricing.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              const isSelected = selectedPayment === method.id;
              
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full p-4 bg-card border-2 rounded-xl transition-all duration-300 ${
                    isSelected 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                      isSelected ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        isSelected ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`font-medium ${
                        isSelected ? 'text-primary' : 'text-foreground'
                      }`}>
                        {method.name}
                        {method.popular && (
                          <span className="ml-2 text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'border-primary bg-primary' 
                        : 'border-border bg-background'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Confirm & Pay Button */}
      <div className="pb-8 mt-8">
        <button 
          onClick={handleConfirmPayment}
          disabled={isProcessing}
          className={`btn-primary ${isProcessing ? 'opacity-70' : ''}`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Processing Payment...
            </div>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2 inline" />
              Confirm & Pay ₹{pricing.total}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryScreen;