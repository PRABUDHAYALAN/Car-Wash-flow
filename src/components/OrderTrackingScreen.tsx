import { CheckCircle, Clock, MapPin, Car, User, Phone, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface OrderTrackingScreenProps {
  onStartNew: () => void;
}

interface OrderStatus {
  id: string;
  title: string;
  description: string;
  timestamp?: string;
  status: 'completed' | 'current' | 'pending';
}

const OrderTrackingScreen = ({ onStartNew }: OrderTrackingScreenProps) => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>([
    {
      id: 'assigned',
      title: 'Order Confirmed',
      description: 'Your car wash has been assigned to a technician',
      timestamp: '10:30 AM',
      status: 'completed'
    },
    {
      id: 'enroute',
      title: 'En Route',
      description: 'Technician is on the way to your location',
      timestamp: '11:15 AM',
      status: 'current'
    },
    {
      id: 'arrived',
      title: 'Arrived at Location',
      description: 'Technician has arrived and is setting up',
      status: 'pending'
    },
    {
      id: 'inprogress',
      title: 'Wash in Progress',
      description: 'Your vehicle is being washed',
      status: 'pending'
    },
    {
      id: 'completed',
      title: 'Service Completed',
      description: 'Your car wash has been completed successfully',
      status: 'pending'
    }
  ]);

  // Simulate status progression
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatusIndex(prev => {
        if (prev < orderStatuses.length - 1) {
          const newIndex = prev + 1;
          
          // Update status states
          setOrderStatuses(statuses => 
            statuses.map((status, index) => ({
              ...status,
              status: index < newIndex ? 'completed' : 
                     index === newIndex ? 'current' : 'pending',
              timestamp: index === newIndex ? new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              }) : status.timestamp
            }))
          );
          
          return newIndex;
        }
        return prev;
      });
    }, 3000); // Progress every 3 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const technicianInfo = {
    name: "Prabu Dhayalan",
    phone: "+91 98989 89898",
    rating: 4.8,
    vehicleNumber: "MH 02 XX 1234"
  };

  return (
    <div className="mobile-container min-h-screen">
      <div className="mb-6">
        <h1 className="page-header">Order Tracking</h1>
        <div className="bg-card border rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-semibold text-foreground">#PQ2024001</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Estimated Time</p>
              <p className="font-semibold text-primary">45 mins</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Current Status Highlight */}
        <div className="animate-fade-in">
          {orderStatuses.find(status => status.status === 'current') && (
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 animate-pulse">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">
                    {orderStatuses.find(status => status.status === 'current')?.title}
                  </h3>
                  <p className="text-sm text-foreground">
                    {orderStatuses.find(status => status.status === 'current')?.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Updated at {orderStatuses.find(status => status.status === 'current')?.timestamp}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Technician Info */}
        {currentStatusIndex >= 1 && (
          <div className="animate-slide-up">
            <h3 className="text-lg font-semibold text-foreground mb-3">Your Technician</h3>
            <div className="bg-card border rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mr-3">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{technicianInfo.name}</h4>
                    <div className="flex items-center">
                      <span className="text-warning text-sm">★ {technicianInfo.rating}</span>
                      <span className="text-muted-foreground text-sm ml-2">Expert Cleaner</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-success" />
                  </button>
                  <button className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Car className="w-4 h-4 mr-2" />
                <span>Vehicle: {technicianInfo.vehicleNumber}</span>
              </div>
            </div>
          </div>
        )}

        {/* Status Timeline */}
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">Order Status</h3>
          
          <div className="status-timeline">
            {orderStatuses.map((status, index) => (
              <div key={status.id} className="status-item">
                <div className="flex flex-col items-center">
                  <div className={`status-dot ${status.status}`}>
                    {status.status === 'completed' && (
                      <CheckCircle className="w-2 h-2 text-white" />
                    )}
                  </div>
                  {index < orderStatuses.length - 1 && (
                    <div className={`w-0.5 h-12 mt-2 ${
                      status.status === 'completed' ? 'bg-success' : 'bg-border'
                    }`}></div>
                  )}
                </div>
                
                <div className="flex-1 pb-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`font-semibold ${
                        status.status === 'completed' ? 'text-success' :
                        status.status === 'current' ? 'text-primary' :
                        'text-muted-foreground'
                      }`}>
                        {status.title}
                      </h4>
                      <p className={`text-sm mt-1 ${
                        status.status === 'completed' ? 'text-foreground' :
                        status.status === 'current' ? 'text-foreground' :
                        'text-muted-foreground'
                      }`}>
                        {status.description}
                      </p>
                    </div>
                    
                    {status.timestamp && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        status.status === 'completed' ? 'bg-success/20 text-success' :
                        status.status === 'current' ? 'bg-primary/20 text-primary' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {status.timestamp}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Completion */}
        {currentStatusIndex >= orderStatuses.length - 1 && (
          <div className="animate-scale-up">
            <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-success mb-2">Service Completed!</h3>
              <p className="text-muted-foreground mb-4">
                Your car has been professionally cleaned and is ready to go.
              </p>
              
              <div className="flex space-x-3">
                <button className="btn-secondary flex-1">
                  Rate Service
                </button>
                <button 
                  onClick={onStartNew}
                  className="btn-primary flex-1"
                >
                  Book Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingScreen;