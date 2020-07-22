const formElement = document.querySelector('form');
const endpointResponseElement = document.getElementById('endpointResponse');
const resetButtonElement = document.getElementById('resetButton');

const endpoint =
  'https://tidesandcurrents.noaa.gov/api/datagetter?begin_date=20120101%2015:00&end_date=20120104%2015:06&range=24&units=english&time_zone=gmt&application=ports_screen&format=json';

formElement.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(formElement);

  const url = new URL(endpoint);
  url.searchParams.set('station', formData.get('station'));
  url.searchParams.set('product', formData.get('product'));

  const response = fetch(url.toString()).then((c) => c.json());

  response.then((data) => {
    const json = JSON.stringify(data, null, 2);
    endpointResponseElement.textContent = json;
  });
});

resetButtonElement.addEventListener('click', () => {
  endpointResponseElement.textContent = '';
});
