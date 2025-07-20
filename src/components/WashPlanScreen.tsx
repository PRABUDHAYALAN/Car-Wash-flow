import { CheckCircle, RotateCcw, Calendar, CalendarDays } from "lucide-react";
import { useState } from "react";

interface WashPlan {
  id: string;
  title: string;
  price: number;
  icon: any;
  features: string[];
  popular?: boolean;
}

interface WashPlanScreenProps {
  onNext: (selectedPlan: WashPlan) => void;
  onBack: () => void;
}

const washPlans: WashPlan[] = [
  {
    id: "one-time",
    title: "One-Time",
    price: 299,
    icon: CheckCircle,
    features: ["Exterior wash", "Interior vacuum", "Tire cleaning", "Dashboard wipe"]
  },
  {
    id: "daily",
    title: "Daily",
    price: 199,
    icon: RotateCcw,
    features: ["Quick exterior wash", "Basic interior clean", "Daily convenience", "Save 33%"],
    popular: true
  },
  {
    id: "weekly",
    title: "Weekly",
    price: 999,
    icon: Calendar,
    features: ["Complete wash", "Interior detailing", "Wax polish", "Weekly schedule", "Save 50%"]
  },
  {
    id: "monthly",
    title: "Monthly",
    price: 2999,
    icon: CalendarDays,
    features: ["Premium service", "Deep cleaning", "Paint protection", "Monthly package", "Best value"]
  }
];

const WashPlanScreen = ({ onNext, onBack }: WashPlanScreenProps) => {
  const [selectedPlan, setSelectedPlan] = useState<WashPlan | null>(null);

  const handlePlanSelect = (plan: WashPlan) => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      onNext(selectedPlan);
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
        <h1 className="page-header text-left flex-1 mb-0">Choose Your Wash Plan</h1>
      </div>

      <div className="space-y-4 mb-8">
        {washPlans.map((plan) => {
          const IconComponent = plan.icon;
          const isSelected = selectedPlan?.id === plan.id;
          
          return (
            <div
              key={plan.id}
              onClick={() => handlePlanSelect(plan)}
              className={`wash-plan-card ${isSelected ? 'selected' : ''} animate-fade-in`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-warning to-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                    isSelected ? 'bg-white/20' : 'bg-primary/10'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${
                      isSelected ? 'text-white' : 'text-primary'
                    }`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${
                      isSelected ? 'text-white' : 'text-foreground'
                    }`}>
                      {plan.title}
                    </h3>
                    <p className={`text-sm ${
                      isSelected ? 'text-white/80' : 'text-muted-foreground'
                    }`}>
                      {plan.id === 'daily' ? 'Per day' : 
                       plan.id === 'weekly' ? 'Per week' : 
                       plan.id === 'monthly' ? 'Per month' : 'One time'}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`text-2xl font-bold plan-price ${
                    isSelected ? 'text-white' : 'text-primary'
                  }`}>
                    ₹{plan.price}
                  </span>
                  {plan.id !== 'one-time' && (
                    <p className={`text-xs ${
                      isSelected ? 'text-white/60' : 'text-muted-foreground'
                    }`}>
                      vs ₹{299} one-time
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className={`w-4 h-4 mr-2 ${
                      isSelected ? 'text-white/80' : 'text-success'
                    }`} />
                    <span className={`text-sm ${
                      isSelected ? 'text-white/90' : 'text-foreground'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {isSelected && (
                <div className="absolute inset-0 border-2 border-white/30 rounded-2xl pointer-events-none"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pb-8">
        <button 
          onClick={handleContinue}
          disabled={!selectedPlan}
          className={`btn-primary ${!selectedPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Continue to Vehicle Details
        </button>
      </div>
    </div>
  );
};

export default WashPlanScreen;