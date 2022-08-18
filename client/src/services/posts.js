import * as api from '../api'

export const getPostsByUser = async (userId) => {

  const { data } = await api.fetchUserPosts(userId)
  return data.data

}
