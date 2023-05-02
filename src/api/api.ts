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
    me() {
        return instance.get(`auth/me`)
            .then((response: any) => response.data)
    },
    // getMyProfileData(myId: number) {
    //     debugger
    //     return axios.get(`profile/${myId}`)
    //         .then((response: any) => {
    //             debugger
    //             return response.data
    //         })
    // },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then((response: any) => response.data)
    },
    logout() {
        return instance.delete(`auth/login`)
            .then((response: any) => response.data)
    },


}

export const profileAPI = {
    getUserProfileData(userId: string) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileForUpdateType) {
        return instance.put(`profile`, profile)
    }
}

//types
export type ProfileForUpdateType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
}