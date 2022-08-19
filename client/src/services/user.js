import * as api from '../api'

export const useless = ({userId, userModified}) => new Promise((resolve, reject) => {

    if (userId != null && userModified != null) {
        resolve()
    }
    else {
        reject()
    }

})

export const getUserInfo = async (userId) => {

    const { data } = await api.fetchUser(userId)
    return data

}

export const getUserProfile = async (userName) => {

    const{ data } = await api.fetchUserProfile(userName)
    return data

}

