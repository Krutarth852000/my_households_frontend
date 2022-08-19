import httpService from "./httpService";

export async function addToList(list) {
    const result = await httpService.post("http://localhost:3001/api/list", list);
    return result.data;
}

export async function getList(groupId) {
    const result =  await httpService.get(`http://localhost:3001/api/list/${groupId}`);
    return result.data
}

export async function appendToList(list, listId) {
       const result = await httpService.post(`http://localhost:3001/api/list/append/${listId}`, list);
    return result.data;
}
export async function deleteItem(itemId, listId) {
    const result = await httpService.delete(`http://localhost:3001/api/list/${itemId}/${listId}`);
    return result.data;
}