let snake = [
    {
        x: 11,
        y: 11
    }
]

let apple = {
    x: 2,
    y: 8
}

let snakeDirection = {
    x: 0,
    y: -1
}

let lastClickedKey = 0

const game = document.getElementById('game')

let render = () => {
    game.innerHTML = ''
    snake.forEach((part) => {
        let snakeDiv = document.createElement('div')
        snakeDiv.style.gridRowStart = part.y
        snakeDiv.style.gridColumnStart = part.x
        snakeDiv.classList.add('snake')
        game.appendChild(snakeDiv)
    })

    let appleDiv = document.createElement('div')
    appleDiv.style.gridRowStart = apple.y
    appleDiv.style.gridColumnStart = apple.x
    appleDiv.classList.add('apple')
    game.appendChild(appleDiv)
}

let placeApple = () => {
    apple.x = Math.floor(Math.random() * 21) + 1
    apple.y = Math.floor(Math.random() * 21) + 1
    snake.forEach(part => {
        if ((part.x == apple.x) && (part.y == apple.y)) {
            placeApple()
        }
    })
}

let gameTick = () => {
    for (let i = snake.length - 1; i >= 0; i--) {
        if (i == 0) {
            snake[i].x += snakeDirection.x
            snake[i].y += snakeDirection.y
        } else {
            snake[i].x = snake[i - 1].x
            snake[i].y = snake[i - 1].y
        }
    }
}

let keyTriggers = () => {
    document.addEventListener('keydown', (event) => {
        lastClickedKey = event.keyCode
    })
}

let changeDirection = () => {
    switch(lastClickedKey) {
        case 37:
        case 65:
            if(snakeDirection.x != 1) {
                snakeDirection = {
                    x: -1,
                    y: 0
                }
            }
            break;
        case 38:
        case 87:
            if(snakeDirection.y != 1) {
                snakeDirection = {
                    x: 0,
                    y: -1
                }
            }
            break;
        case 39:
        case 68:
            if(snakeDirection.x != -1) {
                snakeDirection = {
                    x: 1,
                    y: 0
                }
            }
            break;
        case 40:
        case 83:
            if(snakeDirection.y != -1) {
                snakeDirection = {
                    x: 0,
                    y: 1
                }
            }
            break;   
    }
}

let isGameOver = () => {
    if ((snake[0].x > 21) || (snake[0].y > 21) || (snake[0].x < 1) || (snake[0].y < 1)) {
        console.log('ściana');
        return true
    }

    for (let i = 1; i < snake.length; i++) {
        if ((snake[i].x == snake[0].x) && (snake[i].y == snake[0].y)) {
            console.log('kanibal');
            return true
        }
    }

    return false
}

let isAppleEaten = () => {
    if ((snake[0].x == apple.x) && (snake[0].y == apple.y)) {
        if (snake.length > 1) {
            snake.push({
                x: snake[snake.length - 1].x - (snake[snake.length - 1].x - snake[snake.length - 2].x),
                y: snake[snake.length - 1].y - (snake[snake.length - 1].y - snake[snake.length - 2].y)
            })
        } else {
            snake.push({
                x: snake[snake.length - 1].x - snakeDirection.x,
                y: snake[snake.length - 1].y - snakeDirection.y
            })
        }
        
        placeApple()
    }
}

keyTriggers()
placeApple()

let gameInterval = setInterval(() => {
    changeDirection()
    gameTick()
    if (isGameOver()) {
        clearInterval(gameInterval)
        return
    }
    isAppleEaten()
    render()
}, 200);
