/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import LinkedListDetail from "@/src/pages/LinkedListDetail";
import GitGithubDetail from "@/src/pages/GitGithubDetail";
import ArrayDetail from "@/src/pages/ArrayDetail";
import CommunityDetail from "@/src/pages/CommunityDetail";
import DocumentationDetail from "@/src/pages/DocumentationDetail";
import StackDetail from "@/src/pages/StackDetail";
import Home from "@/src/pages/Home";

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  if (selectedTopic === "linked-list") {
    return <LinkedListDetail onBack={() => setSelectedTopic(null)} />;
  }

  if (selectedTopic === "git") {
    return <GitGithubDetail onBack={() => setSelectedTopic(null)} />;
  }

  if (selectedTopic === "array") {
    return <ArrayDetail onBack={() => setSelectedTopic(null)} />;
  }

  if (selectedTopic === "stack") {
    return <StackDetail onBack={() => setSelectedTopic(null)} />;
  }

  if (selectedTopic === "community") {
    return <CommunityDetail onBack={() => setSelectedTopic(null)} onNavigate={(topic) => setSelectedTopic(topic)} />;
  }

  if (selectedTopic === "documentation") {
    return <DocumentationDetail onBack={() => setSelectedTopic(null)} onNavigate={(topic) => setSelectedTopic(topic)} />;
  }

  return <Home onNavigate={(topic) => setSelectedTopic(topic)} />;
}
