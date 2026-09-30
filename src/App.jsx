import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import VerifyEmailPage from './pages/VerifyEmailPage'
import PricingPage from './pages/PricingPage'
import PlatformPage from './pages/PlatformPage'
import WorkflowPage from './pages/WorkflowPage'
import WaitlistPage from './pages/WaitlistPage'
import PrivacyPage from './pages/PrivacyPage'
import DashboardLayout from './components/dashboard/DashboardLayout'
import DashboardHome from './pages/dashboard/DashboardHome'
import ProjectsPage from './pages/dashboard/ProjectsPage'
import ServersPage from './pages/dashboard/ServersPage'
import DatabasePage from './pages/dashboard/DatabasePage'
import DeploymentsPage from './pages/dashboard/DeploymentsPage'
import MetricsPage from './pages/dashboard/MetricsPage'
import BillingPage from './pages/dashboard/BillingPage'
import ReceiptsPage from './pages/dashboard/ReceiptsPage'
import DashboardSettingsPage from './pages/dashboard/DashboardSettingsPage'
import PublicOnlyRoute from './components/PublicOnlyRoute'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/platform" element={<PlatformPage />} />
      <Route path="/workflow" element={<WorkflowPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/waitlist" element={<WaitlistPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><SignUpPage /></PublicOnlyRoute>} />
      <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPasswordPage /></PublicOnlyRoute>} />
      <Route path="/reset-password" element={<PublicOnlyRoute><ResetPasswordPage /></PublicOnlyRoute>} />
      <Route path="/verify-email" element={<PublicOnlyRoute><VerifyEmailPage /></PublicOnlyRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<DashboardHome />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="servers" element={<ServersPage />} />
        <Route path="database" element={<DatabasePage />} />
        <Route path="deployments" element={<DeploymentsPage />} />
        <Route path="metrics" element={<MetricsPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="billing/receipts" element={<ReceiptsPage />} />
        <Route path="settings" element={<DashboardSettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App
