"use client";

import { useAuthStore } from "@/stores/auth";

const Dashboard = () => {
  const { user } = useAuthStore();
  return <div>{JSON.stringify(user)}</div>;
};

export default Dashboard;
