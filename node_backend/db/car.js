const util = require("util");
const mongoClient = require("../utils/connectDb");
const { ObjectId } = require("mongodb");

class CarDb {
  async addCar(data) {
    try {
      const db = await mongoClient.getDb();
      const collection = db.db("sumit").collection("car");

      const carData = {
        title: data.title,
        description: data.description,
        tags: data.tags,
        images: data.images, 
      };

      const result = await collection.insertOne(carData);

      return result;
    } catch (err) {
      console.log(`Error while adding car: \n${util.inspect(err)}`);
      throw err;
    }
  }

  async getCars() {
    try {
      const db = await mongoClient.getDb();
      const collection = db.db("sumit").collection("car");

      const result = await collection.find().toArray();
      return result;
    } catch (err) {
      console.log(`Error while fetching cars: \n${util.inspect(err)}`);
      throw err;
    }
  }

  async getCarById(id) {
    try {
      const db = await mongoClient.getDb();
      const collection = db.db("sumit").collection("car");

      const result = await collection.findOne({ _id: new ObjectId(id) });
      return result;
    } catch (err) {
      console.log(`Error while fetching car by ID: \n${util.inspect(err)}`);
      throw err;
    }
  }

  async updateCarById(id, data) {
    try {
      const db = await mongoClient.getDb();
      const collection = db.db("sumit").collection("car");

      const updateData = {
        title: data.title,
        description: data.description,
        tags: data.tags,
      };

      if (data.images) {
        updateData.images = data.images;
      }

      const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnOriginal: false }
      );
      return result.value;
    } catch (err) {
      console.log(`Error while updating car by ID: \n${util.inspect(err)}`);
      throw err;
    }
  }

  async deleteCarById(id) {
    try {
      const db = await mongoClient.getDb();
      const collection = db.db("sumit").collection("car");

      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount;
    } catch (err) {
      console.log(`Error while deleting car by ID: \n${util.inspect(err)}`);
      throw err;
    }
  }
}

module.exports = CarDb;
