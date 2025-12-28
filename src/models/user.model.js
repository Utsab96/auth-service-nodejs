class User {
  constructor({ id, name, email, password, created_at }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
  }
}

module.exports = User;
