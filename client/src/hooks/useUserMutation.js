import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useless } from '../services/user'
import { keys} from './queryKeys'

export const useUserMutation = (options = {}) => {

    const queryClient = useQueryClient()

    return useMutation(useless, {
        ...options,
        onMutate: variables => {
            queryClient.setQueryData(
                keys.user(variables.userId), variables.userModified
            )
        }
    })

}