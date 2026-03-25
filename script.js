document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    const amountInput = document.getElementById('amount');
    const expenseChart = document.getElementById('expense-chart');

    let selectedMonth;
    let selectedYear;
    let myChart;

    for (let year =2020; year <=2040; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent=year;
        yearSelect.appendChild(option);
    }

const expenses = {
  January: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
  February: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
  March: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
  April: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
  May: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
  June: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
  July: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
  August: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
  September: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
  October: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
  November: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 },
  December: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 }
};
function saveExpenseToLocalStorage(month,year){
     const key = `${month}-${year}`;
     localStorage.setItem(key, JSON.stringify(expenses[month]));
}
function getExpenseFromLocalStorage(month, year) {
    const key = `${month}-${year}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 };
}
//Get Selected Month & Year
function getSelectedMonthYear(){
    selectedMonth = monthSelect.value;
    selectedYear = yearSelect.value;

 if(!selectedMonth || !selectedYear){
    alert('Month or year not selected');
    return;
  }
  if(!expenses[selectedMonth]){
    expenses[selectedMonth] = {Housing: 0, Food: 0, Transportation: 0, Bills: 0, Miscellaneous: 0 };
  }

}
//Update chart
function updateChart(){
    getSelectedMonthYear();
    
const expenseData = getExpenseFromLocalStorage(selectedMonth,selectedYear);
Object.assign(expenses[selectedMonth],expenseData);

const ctx = expenseChart.getContext('2d')
 if(myChart){
    myChart.destroy();
 }
   myChart= new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(expenses[selectedMonth]),
      datasets: [{
        data: Object.values(expenses[selectedMonth]),
        backgroundColor:[
            '#FF6384',//Housing
            '#4CAF50',//Food
            '#FFCE56',//Transportation
            '#36A2EB',//Bills
            '#FF9F40' //Miscellaneous
        ]
      }]
    },
    options: {
      responsive:true,
      plugins:{
        legend: {
            display: true,
            position: 'top',

        },
        tooltip: {
            callbacks: {
                label: function(tooltipItem) {
                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
            }
        }
      }

    }
  });
}
//Handle From submission
function handleSubmit(event) {
    event.preventDefault();
    getSelectedMonthYear();



const category = event.target.category.value;
const amount = parseFloat(event.target.amount.value);
 const currentAmount = expenses[selectedMonth][category]|| 0;


  if (amount > 0) {
    expenses[selectedMonth][category]= currentAmount + amount;
  } else if (amount < 0 && currentAmount >= Math.abs(amount)){
    expenses[selectedMonth][category]= currentAmount + amount;
  } else {
    alert ('Invalid amount: Cannot reduce the category below zero')
  }
saveExpenseToLocalStorage(selectedMonth, selectedYear);
updateChart();
  amountInput.value ='';
}
expenseForm.addEventListener('submit', handleSubmit);
monthSelect.addEventListener('change',updateChart);
yearSelect.addEventListener('change',updateChart);

    function setDefaultMonthYear() {
        const now = new Date();
        const initialMonth = now.toLocaleString('default', { month: 'long'});
        const initialYear = now.getFullYear();
        monthSelect.value = initialMonth;
        yearSelect.value = initialYear;
    }
    
   setDefaultMonthYear();
   updateChart();

})