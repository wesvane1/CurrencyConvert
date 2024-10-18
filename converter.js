const apiKey = 'f0256e6a3449b66fd5efe119';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;

async function loadCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.result === 'success') {
            const currencies = data.supported_codes;
            const fromCurrencyElement = document.getElementById('fromCurrency');
            const toCurrencyElement = document.getElementById('toCurrency');

            fromCurrencyElement.innerHTML = '';
            toCurrencyElement.innerHTML = '';

            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency[0];
                optionFrom.textContent = `${currency[0]} - ${currency[1]}`;
                fromCurrencyElement.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency[0];
                optionTo.textContent = `${currency[0]} - ${currency[1]}`;
                toCurrencyElement.appendChild(optionTo);
            });
        } else {
            console.error('Failed to load currencies.');
        }
    } catch (error) {
        console.error('Error loading currencies:', error);
    }
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultElement = document.getElementById('result');

    if (amount === '') {
        resultElement.textContent = 'Please enter an amount.';
        resultElement.style.display = 'block';
        return;
    }

    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === 'success') {
            const conversionResult = data.conversion_result;
            resultElement.style.display = 'block';
            resultElement.textContent = `${amount} ${fromCurrency} = ${conversionResult.toFixed(2)} ${toCurrency}`;
        } else {
            resultElement.style.display = 'block';
            resultElement.textContent = 'Error fetching conversion rate.';
        }
    } catch (error) {
        resultElement.textContent = 'Error connecting to API.';
        console.error(error);
    }
}

async function clearResult() {
    const resultElement = document.getElementById('result');
    resultElement.style.display = 'none';
}


function togglePlay() {
    var audio = document.getElementById("moneyTheme");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function swap(){
    var fromCurr = document.getElementById("fromCurrency")
    var toCurr = document.getElementById("toCurrency")

    var fromValueForSwitch = fromCurr.value;
    
    fromCurr.value = toCurr.value;
    toCurr.value = fromValueForSwitch;
}

window.onload = loadCurrencies;
