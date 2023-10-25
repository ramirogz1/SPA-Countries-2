const { Router } = require("express");
const { getDbInfo } = require("../controllers/countriesControllers");
const { Activity, Country } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const countriesTotales = await getDbInfo();
    if (name) {
      const countriesName = countriesTotales.filter((c) =>
        c.name.toLowerCase().includes(name.toLowerCase())
      );
      countriesName.length
        ? res.status(200).send(countriesName)
        : res.status(404).send("Pais no encontrado");
    } else {
      res.status(200).send(countriesTotales);
    }
  } catch (error) {
    console.log("Error en la ruta get/countries", error);
  }
});



module.exports = router;
