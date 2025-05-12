const { Given, When, Then } = require("@cucumber/cucumber");
const axios = require('axios');
const assert = require('assert');

let response;


Given('I send a POST request to the user endpoint with the following payload:', async function (dataTable) {
  const payload = dataTable.rowsHash();
  response = await axios.post('https://jsonplaceholder.typicode.com/users', payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
});

When("the response status code should be 201", function () {
    const status = response.status; // response değişkenini kullanıyoruz
    if (status !== 201) {
        throw new Error(`Expected status code 201 but got ${status}`);
    }
});

Then('the response body should contain {string}', function (expectedString) {
  console.log('Response Data:', response.data); // Yanıt verisini konsola yazdır
  const [key, value] = expectedString.split(' ');
  assert(response.data[key] === value, `Expected response body to include a key '${key}' with value '${value}'`);
});