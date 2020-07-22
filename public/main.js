const formElement = document.querySelector('form');
const endpointResponseElement = document.getElementById('endpointResponse');
const resetButtonElement = document.getElementById('resetButton');

const endpoint =
  'http://localhost:8081/amida/monthlyReport';

formElement.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(formElement);
  const data = { "station": formData.get('station'), "product": formData.get('product'), "dateOfService": formData.get('date') };

  const response = fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then((c) => c.json());

  response.then((data) => {
    const json = JSON.stringify(data, null, 2);
    endpointResponseElement.textContent = json;
  });
});

resetButtonElement.addEventListener('click', () => {
  endpointResponseElement.textContent = '';
});
