


export class Profile {
  constructor(data) {
    this.name = data.name
    this.picture = data.picture
    this.id = data.id
  }
}

export class Account extends Profile {
  constructor(data) {
    super(data)
    this.email = data.email
    // TODO add additional properties if needed
  }
}