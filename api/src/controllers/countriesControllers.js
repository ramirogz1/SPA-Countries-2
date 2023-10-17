const axios = require('axios')
const {Activity , Country} = require('../db')

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://restcountries.com/v3/all')
    const apiInfo = apiUrl.data.map(el => {
        return {
            name: el.name,
            
        }
    })
}