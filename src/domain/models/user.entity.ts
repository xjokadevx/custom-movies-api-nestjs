export class UserEntity {
  constructor(
    public readonly roleId: number,
    public phone: string,
    public name: string,
    public pwd: string,
  ) {}

  updateName(newName: string) {
    this.name = newName;
  }
  updatePhone(newPhone: string) {
    this.phone = newPhone;
  }
  updatePwd(newPwd: string) {
    this.pwd = newPwd;
  }
}
