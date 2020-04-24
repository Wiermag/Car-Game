import "./game.scss";

class Car {
    constructor() {       
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    }
  }
class Cone  {
    constructor() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }
  }
 
class Game {
    constructor() {
        this.board = document.querySelectorAll("#board div")
        this.game = document.querySelector('.game')
        this.car = new Car(); 
        this.cone = new Cone(); 
        this.score = 0; 
    };
      
        index(x, y) {
            return x + (y * 10); 
        };
        hideVisibleCar() {
            for (let i = 0; i < this.board.length; i++) {
            this.board[i].classList.remove("car");
            }
        }
        showCar() { 
            this.hideVisibleCar();
            const carPos = this.index(this.car.x, this.car.y)
            this.board[carPos].classList.add("car")
    
        };
        showCone() {
            const conePos = this.index(this.cone.x , this.cone.y)
            this.board[conePos].classList.add("cone")
       };
        moveCar() {    
            if (this.car.direction === "right") {
                this.car.x = this.car.x + 1;
            } else if (this.car.direction === "left") {
                this.car.x = this.car.x - 1;
            } else if (this.car.direction === "up") {
                this.car.y = this.car.y + 1;
            } else if (this.car.direction === "down") {
                this.car.y = this.car.y - 1;
            };
         this.showCar();
         this.checkConeCollision();
       
         this.gameOver()
            
        };
        turnCar(event) {
            switch (event.which) {
                case 37:
                    this.car.direction="left";
                    break;
                case 38:
                   this.car.direction = "down";
                   break;
                case 39:
                   this.car.direction = "right";
                   break;
                case 40:
                    this.car.direction = "up";
                    break;
            }
        };
        checkConeCollision() {
            if (this.car.x === this.cone.x && this.car.y === this.cone.y){
  
                this.score+=1;
                let newScore = document.querySelector('span');
                newScore.innerText = this.score
                let result = document.querySelector(".result");
                result.innerText = this.score;
  
                let removeCone = document.querySelector('.cone');
                removeCone.classList.remove('cone');
  
                this.cone= new Cone();
                this.showCone();
            } 
        }
        startGame(){
            this.showCar();
            this.showCone();
            this.idSetInterval = setInterval(() => {
               this.moveCar();
            }, 250);
    }

        gameOver() {
            if ( this.car.x < 0 || this.car.x > 10|| this.car.y < 0|| this.car.y > 10){
                clearInterval(this.idSetInterval);
                const over = document.getElementById("game-over");
                this.game.style.display = "none";
                over.style.display = "block";   
            }
        }
     
      }


const startButton = document.getElementById("start-btn");
    startButton.addEventListener("click", function () {
        document.querySelector("#start").classList.add("invisible");
        document.querySelector(".game").classList.remove("invisible");
        const newGame = new Game();
        newGame.startGame()
        document.addEventListener('keydown', function(event){
            newGame.turnCar(event);
        });
    });
    
const tryAgainButton = document.querySelector("#try-again-btn");
    tryAgainButton.addEventListener("click", function () {
        window.location.reload(true)
    })


      
 
       
    