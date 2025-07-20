import { useState } from "react";
import WelcomeScreen from "../components/WelcomeScreen";
import WashPlanScreen from "../components/WashPlanScreen";
import VehicleDetailsScreen from "../components/VehicleDetailsScreen";
import LocationScreen from "../components/LocationScreen";
import DateTimeScreen from "../components/DateTimeScreen";
import OrderSummaryScreen from "../components/OrderSummaryScreen";
import OrderTrackingScreen from "../components/OrderTrackingScreen";

type Screen = 'welcome' | 'washPlan' | 'vehicleDetails' | 'location' | 'dateTime' | 'orderSummary' | 'orderTracking';

interface AppState {
  currentScreen: Screen;
  selectedPlan: any;
  vehicleDetails: any;
  selectedLocation: any;
  selectedDateTime: any;
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'welcome',
    selectedPlan: null,
    vehicleDetails: null,
    selectedLocation: null,
    selectedDateTime: null
  });

  const navigateToScreen = (screen: Screen, data?: any) => {
    setAppState(prev => ({
      ...prev,
      currentScreen: screen,
      ...(data || {})
    }));
  };

  const handleGetStarted = () => {
    navigateToScreen('washPlan');
  };

  const handlePlanSelected = (selectedPlan: any) => {
    navigateToScreen('vehicleDetails', { selectedPlan });
  };

  const handleVehicleDetails = (vehicleDetails: any) => {
    navigateToScreen('location', { vehicleDetails });
  };

  const handleLocationSelected = (selectedLocation: any) => {
    navigateToScreen('dateTime', { selectedLocation });
  };

  const handleDateTimeSelected = (selectedDateTime: any) => {
    navigateToScreen('orderSummary', { selectedDateTime });
  };

  const handleOrderConfirmed = () => {
    navigateToScreen('orderTracking');
  };

  const handleStartNewOrder = () => {
    setAppState({
      currentScreen: 'welcome',
      selectedPlan: null,
      vehicleDetails: null,
      selectedLocation: null,
      selectedDateTime: null
    });
  };

  const handleBackNavigation = () => {
    const backMap: { [key in Screen]: Screen } = {
      'welcome': 'welcome',
      'washPlan': 'welcome',
      'vehicleDetails': 'washPlan',
      'location': 'vehicleDetails',
      'dateTime': 'location',
      'orderSummary': 'dateTime',
      'orderTracking': 'orderSummary'
    };
    
    navigateToScreen(backMap[appState.currentScreen]);
  };

  const orderDetails = {
    plan: appState.selectedPlan,
    vehicle: appState.vehicleDetails,
    location: appState.selectedLocation,
    dateTime: appState.selectedDateTime
  };

  return (
    <div className="min-h-screen bg-background">
      {appState.currentScreen === 'welcome' && (
        <WelcomeScreen onGetStarted={handleGetStarted} />
      )}
      
      {appState.currentScreen === 'washPlan' && (
        <WashPlanScreen 
          onNext={handlePlanSelected}
          onBack={handleBackNavigation}
        />
      )}
      
      {appState.currentScreen === 'vehicleDetails' && (
        <VehicleDetailsScreen 
          onNext={handleVehicleDetails}
          onBack={handleBackNavigation}
        />
      )}
      
      {appState.currentScreen === 'location' && (
        <LocationScreen 
          onNext={handleLocationSelected}
          onBack={handleBackNavigation}
        />
      )}
      
      {appState.currentScreen === 'dateTime' && (
        <DateTimeScreen 
          onNext={handleDateTimeSelected}
          onBack={handleBackNavigation}
        />
      )}
      
      {appState.currentScreen === 'orderSummary' && (
        <OrderSummaryScreen 
          orderDetails={orderDetails}
          onConfirmOrder={handleOrderConfirmed}
          onBack={handleBackNavigation}
        />
      )}
      
      {appState.currentScreen === 'orderTracking' && (
        <OrderTrackingScreen 
          onStartNew={handleStartNewOrder}
        />
      )}
    </div>
  );
};

export default Index;
