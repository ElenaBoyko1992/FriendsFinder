import {AxiosResponse, default as axios} from "axios";
import {MeResponseDataType, PhotosType, ProfileType, ResponseType, UsersTypeFromServer} from "api/types";

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
        return instance.get<UsersTypeFromServer>(`users?page=${currentPage}&count=${pageSize}`)
            .then((response: any) => response.data)
    }
}

export const followingAPI = {
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then((response: AxiosResponse<ResponseType<{}>>) => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
            .then((response: AxiosResponse<ResponseType<{}>>) => response.data)
    }
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`)
            .then((response: AxiosResponse<ResponseType<MeResponseDataType>>) => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post<ResponseType<{ userId: number }>>(`auth/login`, {email, password, rememberMe, captcha})
            .then((response: AxiosResponse<ResponseType<{ userId: number }>>) => response.data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
            .then((response: AxiosResponse<ResponseType<{}>>) => response.data)
    },
}

export const profileAPI = {
    getUserProfileData(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, {status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)

        return instance.put<ResponseType<{ photos?: PhotosType }>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile)
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<{ url: string }>(`security/get-captcha-url`)
    }
}

