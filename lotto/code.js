let selectedNumbersCount = 0;
let rollButton = document.querySelectorAll('.roll')[0];
let pickedNumbers = [];
let rolledNumbers = [];

document.querySelectorAll('.number').forEach((number) => {
    number.addEventListener('click', (clickedNumber) => {
        if (clickedNumber.target.hasAttribute('data-number-selected')) {
            clickedNumber.target.removeAttribute('data-number-selected');
            selectedNumbersCount--;
        } else if (selectedNumbersCount < 6) {
            clickedNumber.target.setAttribute('data-number-selected', '');
            selectedNumbersCount++;
        }

        if (selectedNumbersCount == 6) {
            rollButton.setAttribute('data-ready-to-roll', '');
            rollButton.textContent = 'Graj';
        } else {
            rollButton.removeAttribute('data-ready-to-roll');
            rollButton.textContent = 'Zaznacz 6 liczb';
        }
    });
});

rollButton.addEventListener('click', () => {
    if (rollButton.hasAttribute('data-ready-to-roll')) {
        rolledNumbers = lotto();
        document.querySelectorAll('div[data-number-selected]').forEach((selectedNumberDiv) => {
            pickedNumbers.push(parseInt(selectedNumberDiv.getAttribute('data-number')));
        })

        resultsKickIn();
    }
})

let lotto = () => {
    let rolledArray = [];
    let rolled = 0;
    for (let i = 0; i < 6; i++) {
        do {
            rolled = Math.floor(Math.random() * 49);
        } while (rolledArray.includes(rolled))
        rolledArray.push(rolled);
    }
    return rolledArray;
}

let resultsKickIn = () => {
    let result = 0;
    document.querySelectorAll('.game')[0].style.display = 'none';
    document.querySelectorAll('.results')[0].style.display = 'block';
    let balls = document.querySelectorAll('.ball');
    rolledNumbers.forEach((num, index) => {
        rollAnimation(document.querySelectorAll('.ball')[index], num, index);
        if (pickedNumbers.includes(num)) {
            result++;
        }
    });
    setTimeout(() => {
        document.querySelectorAll('.after-roll')[0].style.display = 'block';
    }, 6000);

    let resultMessage = document.querySelectorAll('.results-message')[0];
    switch (result) {
        case 0:
            resultMessage.textContent = 'Niestety tym razem nie trafiłeś żadnej liczby';
            break;
        case 1:
            resultMessage.textContent = 'Trafiłeś jedną z sześciu liczb!';
            break;
        case 2:
            resultMessage.textContent = 'Trafiłeś dwie z sześciu liczb, szansa na to wynosiła ~13,2%!';
            break;
        case 3:
            resultMessage.textContent = 'Gratulacje! Udało Ci się trafić trzy z szesciu liczb! Szansa na to wynosiła ~1,77%';
            break;
        case 4:
            resultMessage.textContent = 'Gratulacje!! Udało Ci się trafić cztery z szesciu liczb! Szansa na to wynosiła ~0,097%!!';
            break;
        case 5:
            resultMessage.textContent = ':ooo Trafiłeś PIĘĆ z sześciu liczb!!! szansa na to wynosiła ~1:54 201 (0,0018%)';
            break;
        case 6:
            resultMessage.textContent = 'TRAFIŁEŚ WSZYSTKIE LICZBY AAAAAAAAA 0,0000072% LEĆ I WYSYŁAJ KUPON W TYM MOMENCIE CZŁOWIEKU (1:13 983 816)';
            break;
    }

}

let rollAnimation = (ball, rolledNumber, index) => {
    let animationInterval = setInterval(() => {
        ball.textContent = Math.floor(Math.random() * 49) + 1;
    }, 20);

    setTimeout(() => {
        clearInterval(animationInterval);
        ball.textContent = rolledNumber;
        if (pickedNumbers.includes(rolledNumber)) {
            ball.setAttribute('data-correct-ball', '');
        } else {
            ball.setAttribute('data-wrong-ball', '');
        }
    }, 1000 + index * 1000)
}

let restart = () => {
    document.querySelectorAll('.after-roll')[0].style.display = 'none';
    document.querySelectorAll('.game')[0].style.display = 'block';
    document.querySelectorAll('.results')[0].style.display = 'none';
    document.querySelectorAll('.ball').forEach((ball) => {
        ball.removeAttribute('data-correct-ball');
        ball.removeAttribute('data-wrong-ball');
    });
    pickedNumbers = [];
}

document.querySelectorAll('.restart')[0].addEventListener('click', () => {
    restart();
});