import { Link } from "react-router-dom";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";

const RECENT_UPLOADS = [
  {
    filename: "attendance_bed_2025.pdf",
    course: "B.Ed",
    uploadedBy: "Anjali Das",
    date: "10 Apr 2025",
    status: "Confirmed",
  },
  {
    filename: "attendance_ded_2025.pdf",
    course: "D.El.Ed",
    uploadedBy: "Rahul Mondal",
    date: "09 Apr 2025",
    status: "Pending",
  },
  {
    filename: "attendance_bed_2025.pdf",
    course: "B.Ed",
    uploadedBy: "Anjali Das",
    date: "09 Apr 2025",
    status: "Confirmed",
  },
  {
    filename: "attendance_ded_2025.pdf",
    course: "D.El.Ed",
    uploadedBy: "Rahul Mondal",
    date: "08 Apr 2025",
    status: "Confirmed",
  },
  {
    filename: "attendance_bed_2025.pdf",
    course: "B.Ed",
    uploadedBy: "Anjali Das",
    date: "07 Apr 2025",
    status: "Review",
  },
];

const STATUS_COLOR = {
  Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Review: "bg-blue-50 text-blue-700 border-blue-200",
};

const Dashboard = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return { text: "Good Morning", Icon: Sunrise };
    } else if (hour >= 12 && hour < 17) {
      return { text: "Good Afternoon", Icon: Sun };
    } else if (hour >= 17 && hour < 21) {
      return { text: "Good Evening", Icon: Sunset };
    } else {
      return { text: "Good Night", Icon: Moon };
    }
  };

  const { text, Icon } = getGreeting();

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Welcome banner */}
      <div className="bg-[#003a6a] rounded-2xl p-6 mb-6 flex items-center justify-between relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-[#ff5421]/15 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute right-20 bottom-0 w-28 h-28 bg-[#f59b18]/10 rounded-full translate-y-1/2 pointer-events-none" />
        <div className="relative">
          <p className="text-blue-200 text-xs mb-1">
            {text}
            <Icon className="inline-block ml-1 mb-0.5" size={16} />
          </p>
          <h2 className="text-white text-xl font-bold mb-1">
            Welcome back, Administrator
          </h2>
          <p className="text-blue-200/70 text-xs">
            Bhagirathi Primary Teachers Training Institute - Jiaganj,
            Murshidabad, WB
          </p>
        </div>
      </div>

      {/* Tables row */}
      <div className="grid gap-4">
        {/* Recent uploads */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-[#003a6a]">
                Recent Uploads
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Latest file uploads
              </p>
            </div>
            <Link to="/admin/uploads" className="text-xs text-[#ff5421] font-semibold hover:underline">
              View all 
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Filename", "Course", "Uploaded By", "Date", "Status"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_UPLOADS.map((s, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#003a6a]/10 flex items-center justify-center text-[#003a6a] text-[10px] font-black shrink-0">
                          {s.filename
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="font-medium text-gray-800 whitespace-nowrap">
                          {s.filename}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${s.course === "B.Ed" ? "bg-[#003a6a]/10 text-[#003a6a]" : "bg-[#f59b18]/15 text-[#7a5300]"}`}
                      >
                        {s.course}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 font-mono text-[10px]">
                      {s.uploadedBy}
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 whitespace-nowrap">
                      {s.date}
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${STATUS_COLOR[s.status]}`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
