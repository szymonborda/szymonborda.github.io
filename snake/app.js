class Snake {
    constructor() {
        this.parts = [
            {
                x: 11,
                y: 11
            }
        ]
        this.direction = {
            x: 0,
            y: -1
        }
        this.lastPartLastTick = {
            x: this.parts[this.parts.length - 1].x,
            y: this.parts[this.parts.length - 1].y
        }
    }

    move() {
        this.lastPartLastTick.x = this.parts[this.parts.length - 1].x
        this.lastPartLastTick.y = this.parts[this.parts.length - 1].y
        for (let i = this.parts.length - 1; i >= 0; i--) {
            if (i == 0) {
                this.parts[i].x += this.direction.x
                this.parts[i].y += this.direction.y
            } else {
                this.parts[i].x = this.parts[i - 1].x
                this.parts[i].y = this.parts[i - 1].y
            }
        }
    }

    grow() {
        this.parts.push({
            x: this.lastPartLastTick.x,
            y: this.lastPartLastTick.y
        })
    }

    changeDirection(lastClickedKey) {
        switch(lastClickedKey) {
            case 37:
            case 65:
                if(this.direction.x != 1) {
                    this.direction = {
                        x: -1,
                        y: 0
                    }
                }
                break;
            case 38:
            case 87:
                if(this.direction.y != 1) {
                    this.direction = {
                        x: 0,
                        y: -1
                    }
                }
                break;
            case 39:
            case 68:
                if(this.direction.x != -1) {
                    this.direction = {
                        x: 1,
                        y: 0
                    }
                }
                break;
            case 40:
            case 83:
                if(this.direction.y != -1) {
                    this.direction = {
                        x: 0,
                        y: 1
                    }
                }
                break;   
        }
    }

    isDead() {
        if ((this.parts[0].x > 21) || (this.parts[0].y > 21) || (this.parts[0].x < 1) || (this.parts[0].y < 1)) {
            console.log('ściana');
            return true
        }
    
        for (let i = 1; i < this.parts.length; i++) {
            if ((this.parts[i].x == this.parts[0].x) && (this.parts[i].y == this.parts[0].y)) {
                console.log('kanibal');
                return true
            }
        }
    
        return false
    }
}

class Apple {
    constructor(snake) {
        this.pos = {
            x: 1,
            y: 1
        }
        this.newPos(snake)
    }

    newPos(snake) {
        this.pos.x = Math.floor(Math.random() * 21) + 1
        this.pos.y = Math.floor(Math.random() * 21) + 1
        snake.parts.forEach(part => {
            if ((part.x == this.pos.x) && (part.y == this.pos.y)) {
                this.newPos(snake)
            }
        })
    }

    isEaten(snake) {
        if ((snake.parts[0].x == this.pos.x) && (snake.parts[0].y == this.pos.y)) {
            return true
        } else {
            return false
        }
    }
}

class Game {
    constructor(board) {
        this.board = board
        this.lastClickedKey = 0
        this.keyTriggers()
    }

    render(snake, apple) {
        //this.board.innerHTML = ''
        document.querySelectorAll('.snake').forEach((elem) => {
            elem.remove()
        })
        document.querySelectorAll('.apple').forEach((elem) => {
            elem.remove()
        })
        snake.parts.forEach((part) => {
            let snakeDiv = document.createElement('div')
            snakeDiv.style.gridColumnStart = part.x
            snakeDiv.style.gridRowStart = part.y
            snakeDiv.classList.add('snake')
            this.board.appendChild(snakeDiv)
        })

        let appleDiv = document.createElement('div')
        appleDiv.style.gridColumnStart = apple.pos.x
        appleDiv.style.gridRowStart = apple.pos.y
        appleDiv.classList.add('apple')
        this.board.appendChild(appleDiv)
    }

    keyTriggers() {
        document.addEventListener('keydown', (event) => {
            this.lastClickedKey = event.keyCode
        })

        document.getElementById('move-left').addEventListener('click', () => {
            this.lastClickedKey = 37
        })

        document.getElementById('move-up').addEventListener('click', () => {
            this.lastClickedKey = 38
        })

        document.getElementById('move-right').addEventListener('click', () => {
            this.lastClickedKey = 39
        })

        document.getElementById('move-down').addEventListener('click', () => {
            this.lastClickedKey = 40
        })
    }
}

let snake1 = new Snake()
let apple1 = new Apple(snake1)
let game = new Game(document.getElementById('game'))

let gameInterval = setInterval(() => {
    snake1.changeDirection(game.lastClickedKey)
    snake1.move()
    if (snake1.isDead()) {
        clearInterval(gameInterval)
        return
    }
    if (apple1.isEaten(snake1)) {
        snake1.grow()
        apple1.newPos(snake1)
    }
    game.render(snake1, apple1)
}, 200);
