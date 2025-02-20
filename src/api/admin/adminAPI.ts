import { InstanceGuest } from '../../lib/axiosConfig';

export const adminLoginAPI = async (data: any) => {
  try {
    const url = '/api/admin/login';

    const formData = new URLSearchParams();
    formData.append('username', data.username);
    formData.append('password', data.password);

    const response = await InstanceGuest.post(url, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const changeSituationAPI = async (situation: String) => {
  try {
    const url = `/api/admin/situation/${situation}`;
    const response = await InstanceGuest.patch(url);
    return response;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const checkLoginAPI = async () => {
  try {
    const url = '/api/admin/checkLogin';
    const response = await InstanceGuest.get(url);
    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const checkSituationStatus = async () => {
  try {
    const url = '/api/admin/situation';
    const response = await InstanceGuest.get(url);
    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const menuListAdminAPI = async (situation: String) => {
  try {
    const url = `/api/admin/menu/list/${situation}`;
    const response = await InstanceGuest.get(url);
    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const menuDetailAdminAPI = async (id: number) => {
  try {
    const url = `/api/admin/menu/detail/${id}`;
    const response = await InstanceGuest.get(url);
    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
};

interface PopularMenu {
  name: string;
  views: number;
}

interface PopularMenuData {
  menus: PopularMenu[];
  totalViews: number;
  totalMenuCount: number;
}

/**
 * 특정 기간의 메뉴 조회 분석 데이터를 가져옵니다.
 * @param startDate 시작 날짜 (YYYY-MM-DD 형식)
 * @param endDate 종료 날짜 (YYYY-MM-DD 형식)
 * @returns 분석 데이터 응답
 */
export const getAnalyticsReportAPI = async (
  startDate: string,
  endDate: string,
  limit: number
): Promise<any> => {
  try {
    const url = `/api/admin/popular-menus?startDate=${startDate}&endDate=${endDate}&limit=${limit}`;
    const response = await InstanceGuest.get(url);
    return response.data.result;
  } catch (error) {
    throw new Error(String(error));
  }
};

/**
 * 이미 적절한 형식으로 반환된 API 응답을 그대로 사용합니다.
 * @param analyticsData 분석 API 응답 데이터
 * @returns 형식화된 인기 메뉴 데이터
 */
export const extractPopularMenus = (analyticsData: any): PopularMenuData => {
  return analyticsData; // API가 이미 필요한 형식으로 데이터를 반환하므로 그대로 사용
};

/**
 * 날짜 객체를 'YYYY-MM-DD' 형식의 문자열로 변환합니다.
 * @param date 날짜 객체
 * @returns 형식화된 날짜 문자열
 */
export const formatDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
