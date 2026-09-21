import React, { createContext, useContext, useState } from 'react';
import { Parcel, ChangeEvent, PolicyScenario } from '../types';
import { mockParcels } from '../data/parcels';
import { mockChangeEvents } from '../data/changeEvents';
import { mockScenarios, computeSimulationResults } from '../data/policyScenarios';
import { parcelService } from '../services/api';

interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  selectedParcel: Parcel | null;
  setSelectedParcel: (parcel: Parcel | null) => void;
  selectParcelById: (id: string) => Promise<void>;
  isLoadingParcelDetails: boolean;
  parcels: Parcel[];
  changeEvents: ChangeEvent[];
  approveChangeEvent: (id: string) => void;
  rejectChangeEvent: (id: string) => void;
  dispatchSurvey: (id: string, surveyor: string) => void;
  currentScenario: PolicyScenario;
  setCurrentScenario: (scenario: PolicyScenario) => void;
  updateScenarioParams: (newParams: Partial<PolicyScenario['parameters']>) => void;
  is3DMode: boolean;
  setIs3DMode: (val: boolean) => void;
  userRole: string;
  setUserRole: (role: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeLayers: {
    parcels: boolean;
    masterPlan: boolean;
    satellite: boolean;
    ndvi: boolean;
    floodRisk: boolean;
    wetlands: boolean;
  };
  toggleLayer: (layerName: keyof AppContextType['activeLayers']) => void;
  timelineYear: number;
  setTimelineYear: (year: number) => void;
  
  // All-India Geography Navigation
  selectedState: string;
  selectedCity: string;
  setSelectedGeography: (state: string, city: string, coords?: [number, number]) => void;
  activeMapCenter: [number, number];
  setActiveMapCenter: (coords: [number, number]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [parcels, setParcels] = useState<Parcel[]>(mockParcels);
  const [selectedParcel, setSelectedParcelState] = useState<Parcel | null>(mockParcels[0]);
  const [isLoadingParcelDetails, setIsLoadingParcelDetails] = useState<boolean>(false);
  const [changeEvents, setChangeEvents] = useState<ChangeEvent[]>(mockChangeEvents);
  const [currentScenario, setCurrentScenario] = useState<PolicyScenario>(mockScenarios[0]);
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('District Magistrate / Collector');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [timelineYear, setTimelineYear] = useState<number>(2025);

  // All India Geography
  const [selectedState, setSelectedState] = useState<string>('Uttar Pradesh');
  const [selectedCity, setSelectedCity] = useState<string>('Varanasi');
  const [activeMapCenter, setActiveMapCenter] = useState<[number, number]>([25.3630, 83.0200]);

  const [activeLayers, setActiveLayers] = useState({
    parcels: true,
    masterPlan: true,
    satellite: true,
    ndvi: false,
    floodRisk: false,
    wetlands: true,
  });

  const toggleLayer = (layerName: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  /**
   * Fetch Parcel Details via Async Service (Simulating backend FastAPI endpoint)
   */
  const setSelectedParcel = async (parcel: Parcel | null) => {
    if (!parcel) {
      setSelectedParcelState(null);
      return;
    }
    setIsLoadingParcelDetails(true);
    try {
      const fullDetails = await parcelService.getParcelDetails(parcel.id);
      setSelectedParcelState(fullDetails);
      setActiveMapCenter(fullDetails.center);
    } catch (err) {
      console.error('Error fetching parcel details:', err);
      setSelectedParcelState(parcel);
    } finally {
      setIsLoadingParcelDetails(false);
    }
  };

  const selectParcelById = async (id: string) => {
    setIsLoadingParcelDetails(true);
    try {
      const fullDetails = await parcelService.getParcelDetails(id);
      setSelectedParcelState(fullDetails);
      setActiveMapCenter(fullDetails.center);
    } catch (err) {
      console.error('Error in selectParcelById:', err);
      const found = parcels.find(p => p.id === id || p.parcelCode === id || p.khasraNo.toLowerCase().includes(id.toLowerCase()));
      if (found) {
        setSelectedParcelState(found);
        setActiveMapCenter(found.center);
      }
    } finally {
      setIsLoadingParcelDetails(false);
    }
  };

  const setSelectedGeography = (state: string, city: string, coords?: [number, number]) => {
    setSelectedState(state);
    setSelectedCity(city);
    if (coords) {
      setActiveMapCenter(coords);
    }
    // Check if any parcel exists in this city
    const localParcels = parcels.filter(
      p => p.state.toLowerCase() === state.toLowerCase() || p.district.toLowerCase().includes(city.toLowerCase()) || city.toLowerCase().includes(p.district.toLowerCase())
    );
    if (localParcels.length > 0) {
      setSelectedParcelState(localParcels[0]);
    }
  };

  const approveChangeEvent = (id: string) => {
    setChangeEvents(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, status: 'Approved' };
        }
        return item;
      })
    );

    const event = changeEvents.find(e => e.id === id);
    if (event) {
      setParcels(prev =>
        prev.map(p => {
          if (p.id === event.parcelId) {
            return {
              ...p,
              currentLandUse: event.newDetectedClass,
              status: 'Verified',
              complianceScore: 90,
              lastUpdated: new Date().toISOString().split('T')[0]
            };
          }
          return p;
        })
      );
    }
  };

  const rejectChangeEvent = (id: string) => {
    setChangeEvents(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'Rejected' } : item))
    );
  };

  const dispatchSurvey = (id: string, surveyor: string) => {
    setChangeEvents(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status: 'Field Survey Dispatched', assignedSurveyor: surveyor }
          : item
      )
    );
  };

  const updateScenarioParams = (newParams: Partial<PolicyScenario['parameters']>) => {
    const merged = { ...currentScenario.parameters, ...newParams };
    const calculated = computeSimulationResults(merged);
    setCurrentScenario(prev => ({
      ...prev,
      parameters: merged,
      results: calculated
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedParcel,
        setSelectedParcel,
        selectParcelById,
        isLoadingParcelDetails,
        parcels,
        changeEvents,
        approveChangeEvent,
        rejectChangeEvent,
        dispatchSurvey,
        currentScenario,
        setCurrentScenario,
        updateScenarioParams,
        is3DMode,
        setIs3DMode,
        userRole,
        setUserRole,
        searchQuery,
        setSearchQuery,
        activeLayers,
        toggleLayer,
        timelineYear,
        setTimelineYear,
        selectedState,
        selectedCity,
        setSelectedGeography,
        activeMapCenter,
        setActiveMapCenter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
