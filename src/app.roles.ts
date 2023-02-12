import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  MANAGER = 'MANAGER',
  CLIENT = 'CLIENT',
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.MANAGER)
  .createAny('product')
  .updateAny('product')
  .deleteAny('product')
  .readAny('product')

  .grant(AppRoles.CLIENT)
  .readAny('product');
