import http from "@/api";

// 表格的模拟用户列表
export const getZoneList = (params) => {
    // return http.get(PORT1 + `/user/list`, params);
    // /api/v1/name/zones?page_no=1&page_size=10

    return http.get(`/api/v1/name/zones?page_no=1&page_size=10`, params);
};