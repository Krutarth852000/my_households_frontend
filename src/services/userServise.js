import httpService from "./httpService";
import { apiUrl } from "../config";
export async function findUserByEmail(email) {
  const result = await httpService.get(`${apiUrl}/api/users/${email}`);
  return result.data;
}
export async function addGroupIdToUserAccount(userId, groupId) {
  const result = await httpService.put(`${apiUrl}/api/users/${userId}/${groupId}`);
  return result.data;
}