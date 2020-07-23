const formElement = document.querySelector('form');
const endpointResponseElement = document.getElementById('endpointResponse');
const resetButtonElement = document.getElementById('resetButton');
const tbodyElement = document.getElementById('dataValue');
const maxValueMonth = document.getElementById('data_1');
const minValueMonth = document.getElementById('data_2');
const averageValueMonth = document.getElementById('data_3');
const maxValuePrevMonth = document.getElementById('data_4');
const minValuePrevMonth = document.getElementById('data_5');
const averageValuePrevMonth = document.getElementById('data_6');

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
    for (const r of data.dailyAvgMonth) {
      const trElement = document.createElement('tr');
      const tdElement1 = document.createElement('td');
      const tdElement2 = document.createElement('td');
      tdElement1.textContent = r.t;
      tdElement2.textContent = r.v;
      trElement.appendChild(tdElement1);
      trElement.appendChild(tdElement2);
      tbodyElement.appendChild(trElement);
    }
    averageValueMonth.textContent = data.averageValueMonth;
    averageValuePrevMonth.textContent = data.averageValuePrevMonth;
    maxValueMonth.textContent = data.maxValueMonth;
    maxValuePrevMonth.textContent = data.maxValuePrevMonth;
    minValueMonth.textContent = data.minValueMonth;
    minValuePrevMonth.textContent = data.minValuePrevMonth;

  });
});

resetButtonElement.addEventListener('click', () => {
  endpointResponseElement.textContent = '';
});


