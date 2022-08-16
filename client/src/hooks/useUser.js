import { useQuery } from 'react-query'
import { getUserById, getUserInfo } from '../services/user'
import { keys} from './queryKeys'

export const useUser = (userId, options = {}) => {
    return useQuery(keys.user(userId), () => getUserInfo(userId), options)
}

