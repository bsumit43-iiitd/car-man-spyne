const CarDb = require("../db/car");

class Car {
  constructor() {
    this.carDb = new CarDb();
  }

  async addCar(data) {
    console.log(data)
    return await this.carDb.addCar(data);
  }

  async getCars() {
    return await this.carDb.getCars();
  }

  async getCarById(id) {
    return await this.carDb.getCarById(id);
  }

  async updateCarById(id, data) {
    return await this.carDb.updateCarById(id, data);
  }

  async deleteCarById(id) {
    return await this.carDb.deleteCarById(id);
  }
}

module.exports = Car;
