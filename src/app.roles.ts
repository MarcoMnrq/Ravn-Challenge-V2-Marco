import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  MANAGER = 'MANAGER',
  CLIENT = 'CLIENT',
}

export const roles: RolesBuilder = new RolesBuilder();
