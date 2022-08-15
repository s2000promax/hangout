// 1. Any user has min required fields in DB (qualities & proffession)
// 2. The data equals mock data

const Profession = require('../models/Profession');
const Quality = require('../models/Quality');

const professionMock = require('../mock/profession.json');
const qualitiesMock = require('../mock/qualities.json');

module.exports = async () => {
 const professions = await Profession.find;
 if (professions.length !== professionMock.length) {
    await createInitialEntities(Profession, professionMock)
 }

  const qualities = await Quality.find;
  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntities(Quality, qualitiesMock);
  }
};

async function createInitialEntities(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async item => {
      try {
        delete  item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
