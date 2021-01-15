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
                break
            case 38:
            case 87:
                if(this.direction.y != 1) {
                    this.direction = {
                        x: 0,
                        y: -1
                    }
                }
                break
            case 39:
            case 68:
                if(this.direction.x != -1) {
                    this.direction = {
                        x: 1,
                        y: 0
                    }
                }
                break
            case 40:
            case 83:
                if(this.direction.y != -1) {
                    this.direction = {
                        x: 0,
                        y: 1
                    }
                }
                break  
        }
    }

    isDead(walls) {
        if ((this.parts[0].x > 21) || (this.parts[0].y > 21) || (this.parts[0].x < 1) || (this.parts[0].y < 1)) {
            console.log('ściana')
            return true
        }
    
        for (let i = 1; i < this.parts.length; i++) {
            if ((this.parts[i].x == this.parts[0].x) && (this.parts[i].y == this.parts[0].y)) {
                console.log('kanibal')
                return true
            }
        }
            for (let i = 0; i < walls.parts.length; i++) {
                if ((this.parts[0].x == walls.parts[i].x) && (this.parts[0].y == walls.parts[i].y)) {
                    return true
                }
            }
    
        return false
    }
}

class Apple {
    constructor(snake, walls) {
        this.pos = {
            x: 1,
            y: 1
        }
        this.newPos(snake, walls)
    }

    newPos(snake, walls) {
        this.pos.x = Math.floor(Math.random() * 21) + 1
        this.pos.y = Math.floor(Math.random() * 21) + 1
        snake.parts.forEach(part => {
            if ((part.x == this.pos.x) && (part.y == this.pos.y)) {
                this.newPos(snake, walls)
            }
        })

        walls.parts.forEach(part => {
            if ((part.x == this.pos.x) && (part.y == this.pos.y)) {
                this.newPos(snake, walls)
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

class Walls {
    constructor(difficulty) {
        if (difficulty == '4') {
            this.generate()
        } else {
            this.parts = []
        }
        console.log(this.parts)
    }

    generate() {
        let wallsCount = Math.floor(Math.random() * 3) + 3
        let wallDirection = 0
        let wallAddon = {}
        let wallLength = 0
        this.parts = []
        for (let i = 0; i < wallsCount; i++ ) {
            wallLength = Math.floor(Math.random() * 2) + 3
            wallDirection = Math.floor(Math.random() * 3) + 1
            switch (wallDirection) {
                case 1:
                    wallAddon = {
                        x: 1,
                        y: 0
                    }
                    break
                case 2:
                    wallAddon = {
                        x: 0,
                        y: 1
                    }
                    break
                case 3:
                    wallAddon = {
                        x: -1,
                        y: 0
                    }
                    break
                case 4:
                    wallAddon = {
                        x: 0,
                        y: -1
                    }
                    break
            }

            this.parts.push({x: Math.floor(Math.random() * 21) + 1, y: Math.floor(Math.random() * 21) + 1})
            for (let j = 0; j < wallLength-1; j++) {
                if ((this.parts[this.parts.length - 1].x + wallAddon.x > 21) || (this.parts[this.parts.length - 1].y + wallAddon.y > 21) || (this.parts[this.parts.length - 1].x + wallAddon.x < 1) || (this.parts[this.parts.length - 1].y + wallAddon.y < 1)) {
                    break
                }
                let doBreak = false
                this.parts.forEach((part) => {
                    if ((this.parts[this.parts.length - 1].x + wallAddon.x == part.x) && (this.parts[this.parts.length - 1].y + wallAddon.y == part.y)) {
                        doBreak = true
                    }
                })
                if(doBreak) {
                    break
                }
                this.parts.push({x: this.parts[this.parts.length - 1].x + wallAddon.x, y: this.parts[this.parts.length - 1].y + wallAddon.y})
            }
        }
    }
}

class Game {
    constructor(board) {
        this.board = board
        this.lastClickedKey = 0
        this.keyTriggers()
    }

    render(snake, apple, walls) {
        //this.board.innerHTML = ''
        document.querySelectorAll('.snake').forEach((elem) => {
            elem.remove()
        })
        document.querySelectorAll('.apple').forEach((elem) => {
            elem.remove()
        })
        document.querySelectorAll('.wall').forEach((elem) => {
            elem.remove()
        })
        snake.parts.forEach((part) => {
            let snakeDiv = document.createElement('div')
            snakeDiv.style.gridColumnStart = part.x
            snakeDiv.style.gridRowStart = part.y
            snakeDiv.classList.add('snake')
            this.board.appendChild(snakeDiv)
        })
        walls.parts.forEach((part) => {
            let wallDiv = document.createElement('div')
            wallDiv.style.gridColumnStart = part.x
            wallDiv.style.gridRowStart = part.y
            wallDiv.classList.add('wall')
            this.board.appendChild(wallDiv)
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

    startTrigger() {
        this.updateScore(0)
        document.getElementById('play-again').addEventListener('click', () => {
            let snake = new Snake()
            let walls = new Walls(this.getDifficulty())
            let apple = new Apple(snake, walls)
            this.startGame(this.getDifficulty(), snake, apple, walls)
        }) 
    }

    updateScore(snake) {
        if (snake == 0) {
            document.getElementById('highscore-span').innerHTML = this.getHighScore()
        } else {
            document.getElementById('score').innerHTML = 'score: ' + (snake.parts.length - 1)
            document.getElementById('score-span').innerHTML = (snake.parts.length - 1)
            document.getElementById('highscore-span').innerHTML = this.getHighScore()
        }
    }

    saveHighScore(snake) {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("snakeScore", (snake.parts.length - 1))
          }
    }

    getHighScore() {
        if (typeof(Storage) !== "undefined") {
            if (localStorage.getItem("snakeScore") != null) {
                return localStorage.getItem("snakeScore")
            } else {
                return 0
            }
            
        } else {
            return "No browser support!"
        }
    }



    getDifficulty() {
        return document.getElementById('difficulty').value
    }

    startGame(difficulty, snake, apple, walls) {
        console.log(difficulty)
        let interval = 0
        switch(difficulty) {
            case '1':
                interval = 200
                break
            case '2':
                interval = 150
                break
            case '3':
                interval = 100
                break
            case '4':
                interval = 150
                break
        }
        document.getElementById('menu').style.display = 'none'
        let gameInterval = setInterval(() => {
            snake.changeDirection(this.lastClickedKey)
            snake.move()
            if (snake.isDead(walls)) {
                if (this.getHighScore() < (snake.parts.length -1)) {
                    this.saveHighScore(snake);
                    this.updateScore(snake)
                }
                clearInterval(gameInterval)
                document.getElementById('score-div').style.display = 'block'
                document.getElementById('menu').style.display = 'block'
                return
            }
            if (apple.isEaten(snake)) {
                snake.grow()
                apple.newPos(snake, walls)
            }
            this.render(snake, apple, walls)
            this.updateScore(snake)
        }, interval)
    }
}
let game = new Game(document.getElementById('game'))
game.startTrigger()
