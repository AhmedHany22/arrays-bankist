'use strict';

///////////////////////////////////////////////// BANKIST APP /////////////////////////////////////////////////

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

///////////////////////////////////////////////// DOM Elements /////////////////////////////////////////////////
const createUsers = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(i => i[0])
      .join('');
  });
};
createUsers(accounts);

const displayMovments = transiactions => {
  containerMovements.innerHTML = '';

  transiactions.forEach((movment, i) => {
    let type = movment > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}udemy
        </div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${movment} EGP</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = moves => {
  const balance = moves.reduce((acc, cur, i, arr) => acc + cur, 0);
  labelBalance.textContent = `${balance} EGP`;
};

const displaySummary = ({ movements: movs, interestRate }) => {
  const incomes = movs
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = `${incomes} EGP`;

  const outcomes = movs
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumOut.textContent = `${Math.abs(outcomes)} EGP`;

  const interest = movs
    .filter(mov => mov > 0)
    .map(dep => (dep * interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumInterest.textContent = `${interest} EGP`;
};

let currentUser;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentUser = accounts.find(
    acc => acc.username === inputLoginUsername.value.toLowerCase()
  );

  if (currentUser?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${
      currentUser.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    displayMovments(currentUser.movements);
    displayBalance(currentUser.movements);
    displaySummary(currentUser);
  }
});

///////////////////////////////////////////////// LECTURES /////////////////////////////////////////////////
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposites = movements.filter(mov => mov > 0);
const withdrawal = movements.filter(mov => mov < 0);

const minValue = movements.reduce((acc, cur) => (acc < cur ? acc : cur));
const maxValue = movements.reduce((acc, cur) => (acc > cur ? acc : cur));

/////////////////////////////////////////////////

///////////////////////////////////////////////// Challange 2 /////////////////////////////////////////////////
const testData = [5, 2, 4, 1, 15, 8, 3];

const humanAge = testData
  .map(age => (age > 2 ? 16 + age * 4 : age * 2))
  .filter(age => age >= 18)
  .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// const oldDogs = humanAge.filter(age => age >= 18);

// const avrageAge = ages => ages.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// console.log('humanAge : ' + humanAge);
