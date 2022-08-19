import httpService from "./httpService";

export async function addExpense(data) {
    const result = await httpService.post('http://localhost:3001/api/expense', data);
    return result.data;
}
export async function getExpenses(groupId) {
    const result = await httpService.get(`http://localhost:3001/api/expense/${groupId}`);
    return result.data;
}