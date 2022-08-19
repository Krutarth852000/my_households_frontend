import httpService from "./httpService";

export async function addGroup(group) {
  const result = await httpService.post('http://localhost:3001/api/group', group);
  return result.data;
}

export async function getGroupId() {
  const result = await httpService.get('http://localhost:3001/api/group');
  return result.data;
}

export async function currentUserGroups(userId) {
  const result = await httpService.get(`http://localhost:3001/api/group/${userId}`)
  return result.data;
}

export async function getGroupUsingId(groupId) {
  const result = await httpService.get(`http://localhost:3001/api/group/detail/${groupId}`);
  return result.data;
}

export async function addMembers(groupId, memberId) {
  const result = await httpService.post(`http://localhost:3001/api/group/${groupId}/member/${memberId}`);
  return result.data;
}
export async function deleteMember(groupId, memberId) {
  const result = await httpService.delete(`http://localhost:3001/api/group/${groupId}/member/${memberId}`);
  return result;
}