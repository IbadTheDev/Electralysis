import axios from './axiosInstance';

export interface DailyData {
  uid: string;
  dayOfWeek: string;
  unitsUsed: number;
  cost: number;
  time:string;
}

export interface WeeklyData {
  uid: string;
  weekStart: string;
  unitsUsed: number;
  cost: number;
  time:string;
}

export interface MonthlyData {
  uid: string;
  month: string;
  unitsUsed: number;
  cost: number;
  time:string;
}

export interface UnitData {
  uid: string;
  dateTime: string;
  unitsUsed: number;
}

export const getDailyData = async (): Promise<DailyData[]> => {
    const response = await axios.get('/ElectricityUsage/Daily?date=' + new Date().toISOString());
    return response.data;
  };
  
  export const getWeeklyData = async (): Promise<WeeklyData[]> => {
    const response = await axios.get('/ElectricityUsage/Weekly');
    return response.data;
  };
  
  export const getMonthlyData = async (): Promise<MonthlyData[]> => {
    const response = await axios.get('/ElectricityUsage/Monthly');
    return response.data;
  };

  export const getUnitsByDateTimeRange = async (startDateTime: string, endDateTime: string): Promise<UnitData[]> => {
    const response = await axios.get('/ElectricityUsage/UnitsByDateTimeRange', {
        params: {
            startDateTime,
            endDateTime
        }
    });
    return response.data;
};