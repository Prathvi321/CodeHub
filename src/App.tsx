/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LinkedListDetail from "@/src/pages/LinkedListDetail";
import GitGithubDetail from "@/src/pages/GitGithubDetail";
import ArrayDetail from "@/src/pages/ArrayDetail";
import CommunityDetail from "@/src/pages/CommunityDetail";
import DocumentationDetail from "@/src/pages/DocumentationDetail";
import StackDetail from "@/src/pages/StackDetail";
import Home from "@/src/pages/Home";
import Challenges from "@/src/pages/Challenges";
import PandasDetail from "@/src/pages/PandasDetail";
import NumpyDetail from "@/src/pages/NumpyDetail";
import QueueDetail from "@/src/pages/QueueDetail";
import Courses from "@/src/pages/Courses";
import NetworksDetail from "@/src/pages/NetworksDetail";

function AppRoutes() {
  const navigate = useNavigate();

  const handleNavigate = (topic: string | null) => {
    if (!topic || topic === "explore") {
      navigate("/");
    } else {
      navigate(`/${topic}`);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home onNavigate={handleNavigate} />} />
      <Route path="/linked-list" element={<LinkedListDetail onBack={() => navigate('/')} />} />
      <Route path="/git" element={<GitGithubDetail onBack={() => navigate('/')} />} />
      <Route path="/array" element={<ArrayDetail onBack={() => navigate('/')} />} />
      <Route path="/stack" element={<StackDetail onBack={() => navigate('/')} />} />
      <Route path="/community" element={<CommunityDetail onBack={() => navigate('/')} onNavigate={handleNavigate} />} />
      <Route path="/documentation" element={<DocumentationDetail onBack={() => navigate('/')} onNavigate={handleNavigate} />} />
      <Route path="/pandas" element={<PandasDetail onBack={() => navigate('/')} />} />
      <Route path="/numpy" element={<NumpyDetail onBack={() => navigate('/')} />} />
      <Route path="/queue" element={<QueueDetail onBack={() => navigate('/')} />} />
      <Route path="/networks" element={<NetworksDetail onBack={() => navigate('/')} />} />
      <Route path="/courses" element={<Courses onBack={() => navigate('/')} onNavigate={handleNavigate} />} />
      
      {/* Catch-all route renders the Under Construction Challenges page for any missing topics */}
      <Route path="*" element={<Challenges />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
