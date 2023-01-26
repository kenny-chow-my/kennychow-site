const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try{
    const latitude  = event.queryStringParameters.latitude;
    const longitude = event.queryStringParameters.longitude;

    const response = await fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${latitude},${longitude}`);
    const data     = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString()
    };
  }
};