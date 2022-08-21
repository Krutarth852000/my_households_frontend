import httpService from "./httpService";
import { apiUrl } from "../config";

export async function loginUser(data) {
    const result = await httpService.post(`${apiUrl}/api/auth`, data);
    return result.data;
}