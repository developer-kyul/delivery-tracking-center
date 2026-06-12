import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <MainLayout>
      <DashboardPage />
    </MainLayout>
  );
}

export default App;
