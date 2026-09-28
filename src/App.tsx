import React from 'react';
import { useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { GisExplorerPage } from './pages/GisExplorerPage';
import { PolicySimulationPage } from './pages/PolicySimulationPage';
import { AiResearchPage } from './pages/AiResearchPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { KnowledgeHubPage } from './pages/KnowledgeHubPage';
import { LandUpdatesPage } from './pages/LandUpdatesPage';
import { DisputesCompensationPage } from './pages/DisputesCompensationPage';

export const App: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'digital-twin':
        return <DigitalTwinPage />;
      case 'gis-explorer':
        return <GisExplorerPage />;
      case 'policy-simulation':
        return <PolicySimulationPage />;
      case 'ai-research':
        return <AiResearchPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'knowledge-hub':
        return <KnowledgeHubPage />;
      case 'disputes-compensation':
        return <DisputesCompensationPage />;
      case 'land-updates':
        return <LandUpdatesPage />;
      default:
        return <LandingPage />;
    }
  };

  return <Layout>{renderCurrentPage()}</Layout>;
};

export default App;
