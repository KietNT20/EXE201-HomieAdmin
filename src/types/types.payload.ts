export interface ApplicationPayload {
  jobId: number;
  workerId: number;
  message?: string;
}

export interface CategoryPayload {
  categoryId: number;
}

export interface JobPostPayload {
  userId: number;
  title: string;
  description: string;
  location: string;
  squareMeters: number;
  numberOfFloors: number;
  startDate: string;
  endDate: string;
  status: string;
  createDate: string;
  categorys: CategoryPayload[];
}
