"use client";

import { useAuthStore } from "@/store/auth";

const Dashboard = () => {
  const { user } = useAuthStore();
  return <div>{JSON.stringify(user)}</div>;
};

export default Dashboard;
