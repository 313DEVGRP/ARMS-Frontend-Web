import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Logo from '@/components/Logo';
import Sidebar from '@/components/Sidebar';
import Contents from '@/components/Contents';

import SystemInfo from '@/pages/System/SystemInfo';
import GeneralConfig from '@/pages/System/GeneralConfig';
import AuditLogging from '@/pages/System/AuditLogging';
import License from '@/pages/System/License';

import User from '@/pages/Security/User';
import Role from '@/pages/Security/Role';
import RoleDetail from '@/pages/Security/Role/Detail/RoleDetail';
import AccessControl from '@/pages/Security/AccessControl';
import ComingSoon from '@/components/ComingSoon';

function App() {
  return (
    <BrowserRouter basename="/mmc/dist">
      <main className="d-flex" as="main">
        <Logo />

        <Sidebar />

        <Contents>
          <Routes>
            <Route path="/" element={<Navigate to="/security/user" replace />} />

            <Route path="/system/info" element={<SystemInfo />} />
            <Route path="/system/config" element={<GeneralConfig />} />
            <Route path="/system/logging" element={<AuditLogging />} />
            <Route path="/system/license" element={<License />} />

            <Route path="/security/user" element={<User />} />
            <Route path="/security/role" element={<Outlet />}>
              <Route index element={<Role />} />
              <Route path=":roleName" element={<RoleDetail />} />
            </Route>
            <Route path="/security/access" element={<AccessControl />} />

            <Route path="*" element={<ComingSoon />} />
          </Routes>
        </Contents>
      </main>
    </BrowserRouter>
  );
}

export default App;
