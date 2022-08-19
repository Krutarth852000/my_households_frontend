import httpService from "./httpService";
import { apiUrl } from "../config";

export async function addExpense(data) {
    const result = await httpService.post(`${apiUrl}/api/expense`, data);
    return result.data;
}
export async function getExpenses(groupId) {
    const result = await httpService.get(`${apiUrl}/api/expense/${groupId}`);
    return result.data;
}