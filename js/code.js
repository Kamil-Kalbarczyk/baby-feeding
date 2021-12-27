const breasts = document.querySelector('main');
const leftBreastButton = document.querySelector('main div.leftBreast');
const rightBreastButton = document.querySelector('main div.rightBreast');
const hisotryUl = document.querySelector('.history__list');
const hisotryList = document.querySelectorAll('.history__list li');
const dateInput = document.querySelector('input[type = date');
const timeInput = document.querySelector('input[type = time');


let a = new Date();
a.setSeconds(0,0);

// add current time to the inputs
dateInput.valueAsDate = new Date();
dateInput.setAttribute('max', `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`)

timeInput.value = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});


let lastLeftBreast = true;

let feedingHistory = [];

function choseLeftBreast(e) {
    leftBreastButton.classList.remove('nextBreast');
    leftBreastButton.classList.add('lastBreast');
    rightBreastButton.classList.add('nextBreast');
    rightBreastButton.classList.remove('lastBreast');
    lastLeftBreast = true;
    const newFeeding = {
        breast: 'lewa',
        date: `${dateInput.value} ${timeInput.value}`
    };
    feedingHistory.push(newFeeding);
    renderFeeds();
};

function choseRightBreast(e) {
    rightBreastButton.classList.remove('nextBreast');
    rightBreastButton.classList.add('lastBreast');
    leftBreastButton.classList.add('nextBreast');
    leftBreastButton.classList.remove('lastBreast');
    lastLeftBreast = false;
   const newFeeding = {
        breast: 'prawa',
        date: `${dateInput.value} ${timeInput.value}`
    };
    feedingHistory.push(newFeeding);
    renderFeeds();
}

const renderFeeds = () => {
    hisotryUl.innerHTML= '';

    function compare( a, b ) {
        if ( a.date < b.date ){
            return -1;
            }
        if ( a.date > b.date ){
            return 1;
         }
        return 0;
        };

        const feedingHistorySortByDate = feedingHistory.sort( compare ).reverse();
        const lastsFeedings = [...feedingHistorySortByDate];
        if(lastsFeedings.length >= 4) {
            lastsFeedings.length = 4
        }

        console.log(lastsFeedings)

        lastsFeedings.forEach((feed) => {
            const li = document.createElement('li');
            const pWithBreast = document.createElement('p');
            const pWithDate = document.createElement('p');
            li.innerHTML = `
             <div>
            <p class="history__breast">${feed.breast}</p>
            <p class="history__date">${feed.date}</p>
             </div>`;
            hisotryUl.appendChild(li);
        })
}

leftBreastButton.addEventListener('click', choseLeftBreast);
rightBreastButton.addEventListener('click', choseRightBreast);