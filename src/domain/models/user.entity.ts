export class UserEntity {
  constructor(
    public readonly roleId: number,
    public phone: string,
    public name: string,
    public pwd: string,
    public readonly _id?: any,
  ) {}
}
