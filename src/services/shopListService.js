import httpService from "./httpService";
import { apiUrl } from "../config";
export async function addToList(list) {
    const result = await httpService.post(`${apiUrl}/api/list`, list);
    return result.data;
}

export async function getList(groupId) {
    const result =  await httpService.get(`${apiUrl}/api/list/${groupId}`);
    return result.data
}

export async function appendToList(list, listId) {
       const result = await httpService.post(`${apiUrl}/api/list/append/${listId}`, list);
    return result.data;
}
export async function deleteItem(itemId, listId) {
    const result = await httpService.delete(`${apiUrl}/api/list/${itemId}/${listId}`);
    return result.data;
}