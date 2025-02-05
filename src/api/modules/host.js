
import http from "@/api";

export const getHostList = (params) => {
    // return http.get(PORT1 + `/user/list`, params);
    // /api/v1/name/zones?page_no=1&page_size=10

    return http.get(`/api/v1/name/zone/${params.zone}/records?page_no=${params.page_no}&page_size=${params.page_size}`);
};

export const getRrset = (params) => {
    // return http.get(PORT1 + `/user/list`, params);
    // /api/v1/name/zones?page_no=1&page_size=10

    // /api/v1/name/zone/ooxx.website/host/1/data?r_typ=A&vid=1&v_typ=1
    return http.get(`/api/v1/name/zone/${params.zone}/host/${params.host}/data?r_typ=${params.r_typ}&vid=${params.vid}&v_typ=${params.v_typ}`);
};

export const postRrset = (params) => {
    return http.post(`/api/v1/name/zone/${params.zone}/records`, params.data);
};