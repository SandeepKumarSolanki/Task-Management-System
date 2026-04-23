import { StatsCardType, User } from "@/types/dashboard";

export const statsCards: StatsCardType[] = [
  {
    title: "Total Projects",
    value: 12,
    color: "bg-blue-500",
  },
  {
    title: "Total Tasks",
    value: 15,
    color: "bg-purple-500",
  },
  {
    title: "Completed Tasks",
    value: 5,
    color: "bg-green-500",
  },
  {
    title: "Tasks In Progress",
    value: 6,
    color: "bg-orange-500",
  },
];

export const users: User[] = [
  {
    id: 1,
    name: "Anurag",
    email: "anurag@gmail.com",
    status: "Active",
    created: "2 hours ago",
    performance: {
      todo: 10,
      inProgress: 20,
      completed: 70,
    },
  },
  {
    id: 2,
    name: "Anurag",
    email: "anurag@gmail.com",
    status: "Active",
    created: "2 hours ago",
    performance: {
      todo: 25,
      inProgress: 30,
      completed: 45,
    },
  },
  {
    id: 3,
    name: "Anurag",
    email: "anurag@gmail.com",
    status: "Active",
    created: "2 hours ago",
    performance: {
      todo: 35,
      inProgress: 25,
      completed: 40,
    },
  },
  
];