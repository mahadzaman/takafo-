import { getApiConfiguration } from '@/common/config/apiConfig';
import { UsersApi } from '@/api-docs';
export default class UserServices {
  async getUsersByRole(role: string): Promise<any> {
    const api = new UsersApi(await getApiConfiguration());
    const maxLimit = 1000000; // 1 Million
    const response = await api.usersControllerFindAllUsersWithRoles(
      maxLimit,
      1,
      role
    );

    return response.data;
  }
}
