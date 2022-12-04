import {default as axios} from "axios";

//instance помогает избегать дублирования кода. Все данные из instance попадут при его дальнейшем использовании
//в запрос на сервер. Т.е. instance теперь используется в коде ниже вместо "axios"
const instance = axios.create({
    withCredentials: true,
    //в baseURL URL обязательно большими буквами. Базовый URL уже внесен в логику последующего кода,
    //поэтому далее внизу по коду везде указанг только сокращенный (без базового) URL
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "f49178a7-6bdf-4301-836a-a758a2a7fb65"
    }
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response: any) => response.data)
    }
}

export const followingAPI = {
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then((response: any) => response.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then((response: any) => response.data)
    }
}

export const authAPI = {
    checkAuth() {
        return instance.get(`auth/me`)
            .then((response: any) => response.data)
    },
    getMyProfileData(myId: number) {

        return axios.get(`profile/${myId}`)
            .then((response: any) => response.data)
    }
}

export const profileAPI = {
    getUserProfileData(userId: string) {
        return instance.get(`profile/${userId}`)
    },
}
