import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import PageView from "./pages/PageView";

import AdminHome from "./pages/admin/Home";
import Dashbaord from "./pages/admin/Dashboard";
import Upload from "./pages/admin/Upload";

import Topbar from "./components/Topbar";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// Nav links data structure
const NAV_LINKS = [
  {
    label: "Society",
    children: [
      {
        label: "Registration Certificate",
        slug: "registration-certificate",
        pdfUrl: "/pdfs/registration-certificate.pdf",
      },
      { label: "By Law", slug: "by-law", pdfUrl: "/pdfs/by-law.pdf" },
      {
        label: "Members",
        slug: "members",
        pdfUrl: "/pdfs/society-members.pdf",
      },
      {
        label: "Society Pan Card",
        slug: "society-pan-card",
        pdfUrl: "/pdfs/society-pan-card.jpg",
      },
    ],
  },
  { label: "Secretary", slug: "secretary", pdfUrl: "/pdfs/secretary.pdf" },
  {
    label: "About",
    children: [
      {
        label: "General Information",
        slug: "general-information",
        pdfUrl: "/pdfs/general-information.pdf",
      },
      {
        label: "Infrastructure",
        slug: "infrastructure",
        pdfUrl: "/pdfs/infrastructure.pdf",
      },
      {
        label: "Land Documents",
        slug: "land-documents",
        pdfUrl: "/pdfs/land-documents.pdf",
      },
      {
        label: "Building Documents",
        slug: "building-documents",
        pdfUrl: "/pdfs/building-documents.pdf",
      },
      {
        label: "Building Plan",
        slug: "building-plan",
        pdfUrl: "/pdfs/building-plan.pdf",
      },
      { label: "Photo Gallery", slug: "photo-gallery", pdfUrl: null },
    ],
  },
  {
    label: "Courses",
    children: [
      {
        label: "NCTE Order (D.El.Ed)",
        slug: "ncte-order-ded",
        pdfUrl: "/pdfs/ncte-order-ded.pdf",
      },
      {
        label: "Affiliation (D.El.Ed)",
        slug: "affiliation-ded",
        pdfUrl: "/pdfs/affiliation-ded.pdf",
      },
      {
        label: "Fee Structure (D.El.Ed)",
        slug: "fee-structure-ded",
        pdfUrl: "/pdfs/fee-structure.pdf",
      },
      {
        label: "Annual Intake (D.El.Ed)",
        slug: "annual-intake-ded",
        pdfUrl: "/pdfs/annual-intake-ded.pdf",
      },
      {
        label: "NCTE Order (B.Ed)",
        slug: "ncte-order-bed",
        pdfUrl: "/pdfs/ncte-order-bed.pdf",
      },
      {
        label: "Affiliation (B.Ed)",
        slug: "affiliation-bed",
        pdfUrl: "/pdfs/affiliation-bed.pdf",
      },
      {
        label: "Fee Structure (B.Ed)",
        slug: "fee-structure-bed",
        pdfUrl: "/pdfs/fee-structure.pdf",
      },
      {
        label: "Annual Intake (B.Ed)",
        slug: "annual-intake-bed",
        pdfUrl: "/pdfs/annual-intake-bed.pdf",
      },
      {
        label: "Academic Calendar",
        slug: "academic-calendar",
        pdfUrl: "/pdfs/academic-calendar.pdf",
      },
    ],
  },
  {
    label: "Staff",
    children: [
      {
        label: "Teaching Staff B.Ed",
        slug: "teaching-staff-bed",
        pdfUrl: "/pdfs/teaching-staff-bed.pdf",
      },
      {
        label: "Teaching Staff D.El.Ed",
        slug: "teaching-staff-ded",
        pdfUrl: "/pdfs/teaching-staff-ded.pdf",
      },
      {
        label: "Non-Teaching Staff B.Ed",
        slug: "non-teaching-staff-bed",
        pdfUrl: "/pdfs/non-teaching-staff-bed.pdf",
      },
      {
        label: "Non-Teaching Staff D.El.Ed",
        slug: "non-teaching-staff-ded",
        pdfUrl: "/pdfs/non-teaching-staff-ded.pdf",
      },
      {
        label: "Faculty Documents",
        slug: "faculty-documents",
        pdfUrl: "/pdfs/faculty-documents.pdf",
      },
      {
        label: "Weekly Attendance",
        slug: "staff-weekly-attendance",
        pdfUrl: "/pdfs/staff-weekly-attendance.pdf",
      },
    ],
  },
  {
    label: "Weekly Attendance",
    children: [
      {
        label: "Students Attendance",
        slug: "students-attendance",
        type: "attendance",
        apiKey: "students",
      },
      {
        label: "Teachers Attendance",
        slug: "teachers-attendance",
        type: "attendance",
        apiKey: "teachers",
      },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Library", slug: "library", pdfUrl: "/pdfs/library.pdf" },
      { label: "ICT Lab", slug: "ict-lab", pdfUrl: "/pdfs/ict-lab.pdf" },
      {
        label: "Art & Craft",
        slug: "art-craft",
        pdfUrl: "/pdfs/art-craft.pdf",
      },
      {
        label: "Curriculum",
        slug: "curriculum",
        pdfUrl: "/pdfs/curriculum.pdf",
      },
      {
        label: "Physical Education",
        slug: "physical-education",
        pdfUrl: "/pdfs/physical-education.pdf",
      },
      {
        label: "Mandatory Disclosure",
        slug: "mandatory-disclosure",
        pdfUrl: "/pdfs/mandatory-disclosure.pdf",
      },
    ],
  },
  { label: "Contact Us", slug: "/#contact-us", pdfUrl: null },
];

// Flat map of slug → page config — used by the route to look up page data
const PAGE_MAP = Object.fromEntries(
  NAV_LINKS.flatMap((l) =>
    l.children ? l.children.map((c) => [c.slug, c]) : [[l.slug, l]],
  ),
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        >
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashbaord />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/uploads"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/docs/:slug" element={<PageView pageMap={PAGE_MAP} />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
