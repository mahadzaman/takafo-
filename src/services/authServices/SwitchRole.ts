import { getApiConfiguration } from '@/common/config/apiConfig';
import { AuthApiFp } from '@/api-docs/apis/auth-api';
import type { SwitchROleDTO } from '@/api-docs/models/';

export default class SwitchRoleApi {
  async switch(switchROleDTO: SwitchROleDTO): Promise<void> {
    const authApi = AuthApiFp(await getApiConfiguration());

    await authApi.authControllerSwitchRole(switchROleDTO);
  }
}
