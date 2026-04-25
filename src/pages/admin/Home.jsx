import { Outlet } from "react-router-dom";

import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";

const Home = () => {
  return (
    <div className="flex h-screen bg-[#f4f6fb] overflow-hidden text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Home;
