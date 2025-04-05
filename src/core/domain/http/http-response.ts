export interface HttpResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload?: object;
  metadata?: object;
  errors: any[];
  headers?: object;
}
