import { Car, Droplets, Clock, MapPin } from "lucide-react";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="mobile-container min-h-screen flex flex-col justify-between">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30 animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-full shadow-lg">
            <img src="/logo/53513459-4f54-44b9-b911-38f213e9f458.png" alt="ParkQwik Logo" className="w-16 h-16" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ParkQwik
          </span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Professional car wash service<br />
          at your doorstep
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4 w-full mb-8">
          <div className="flex items-center p-4 bg-card rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <Droplets className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground">Professional Wash</h3>
              <p className="text-sm text-muted-foreground">Premium cleaning service</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-card rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-secondary" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground">Quick & Convenient</h3>
              <p className="text-sm text-muted-foreground">Book in just 3 steps</p>
            </div>
          </div>

          <div className="flex items-center p-4 bg-card rounded-xl shadow-sm border">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mr-4">
              <MapPin className="w-6 h-6 text-success" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground">At Your Location</h3>
              <p className="text-sm text-muted-foreground">We come to you</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="pb-8">
        <button 
          onClick={onGetStarted}
          className="btn-primary animate-scale-up"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;