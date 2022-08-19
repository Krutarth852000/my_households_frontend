import httpService from "./httpService";
import { apiUrl } from "../config";
export async function addGroup(group) {
  const result = await httpService.post(`${apiUrl}/api/group`, group);
  return result.data;
}

export async function getGroupId() {
  const result = await httpService.get(`${apiUrl}/api/group`);
  return result.data;
}

export async function currentUserGroups(userId) {
  const result = await httpService.get(`${apiUrl}/api/group/${userId}`)
  return result.data;
}

export async function getGroupUsingId(groupId) {
  const result = await httpService.get(`${apiUrl}/api/group/detail/${groupId}`);
  return result.data;
}

export async function addMembers(groupId, memberId) {
  const result = await httpService.post(`${apiUrl}/api/group/${groupId}/member/${memberId}`);
  return result.data;
}
export async function deleteMember(groupId, memberId) {
  const result = await httpService.delete(`${apiUrl}/api/group/${groupId}/member/${memberId}`);
  return result;
}