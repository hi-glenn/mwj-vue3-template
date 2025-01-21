
import http from "@/api";

export const getHostList = (params) => {
    // return http.get(PORT1 + `/user/list`, params);
    // /api/v1/name/zones?page_no=1&page_size=10

    return http.get(`/api/v1/name/zone/${params.zone}/records?page_no=${params.page_no}&page_size=${params.page_size}`);
};