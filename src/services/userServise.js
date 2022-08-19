import httpService from "./httpService";

export async function findUserByEmail(email) {
  const result = await httpService.get(`http://localhost:3001/api/users/${email}`);
  return result.data;
}
export async function addGroupIdToUserAccount(userId, groupId) {
  const result = await httpService.put(`http://localhost:3001/api/users/${userId}/${groupId}`);
  return result.data;
}