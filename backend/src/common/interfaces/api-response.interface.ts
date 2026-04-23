

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  errors?: any;
}

export function successResponse<T>(
  message: string,
  items: T,
  status = 200,
) {
  return {
    success: true,
    message,
    status,
    data: {
      items,
    },
  };
}