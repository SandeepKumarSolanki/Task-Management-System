export interface UserPerformance {
  todo: number;
  inProgress: number;
  completed: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  created: string;
  performance: UserPerformance;
}

export interface StatsCardType {
  title: string;
  value: number;
  color: string;
}