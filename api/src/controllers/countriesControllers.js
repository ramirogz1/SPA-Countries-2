const { Activity, Country } = require("../db");
const axios = require("axios");

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://restcountries.com/v3/all");
  console.log(apiUrl,'hola')
  apiUrl.data.forEach((el) => {
    Country.findOrCreate({
      where: {
        id: el.cca3,
        name: el.name.common,
        image: el.flags[0],
        continents: el.continents[0],
        capital: el.capital || ["Capital Not Found"],
        subregion: el.subregion || "Subregion Not Found",
        area: el.area,
        population: el.population,
      },
    });
  });
};

const getDbInfo = async () => {
  const dbInfo = await Country.findAll({
    include: {
      model: Activity,
      attributes: ["name", "difficulty", "duration", "season"],
      through: {
        attributes: [],
      },
    },
  });
  return dbInfo;
};

module.exports = { getApiInfo, getDbInfo };
