class Config{
    constructor(config){
        this.board_x = config.board_x;
        this.board_y = config.board_y;
        this.board_width = config.board_width;
        this.board_height = config.board_height;
        this.cell_size = config.cell_size;
        this.snake_start_length = config.snake_start_length;
        this.snake_x = config.snake_x;
        this.snake_y = config.snake_y;
        this.start_direction = config.start_direction;
    }
} 

class Cell{
    //Type - Snake's part or food
    //Size - width/height (same because it's square)
    constructor(type, size, x, y){
        this.size = size;
        this.type = type;
        this.x = x;
        this.y = y;
    }
    //Getters
    getType(){
        return this.type;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getSize(){
        return this.size;
    }
    //Setters
    setType(type){
        this.type = type;
    }
    setX(x){
        this.x = x;
    }
    setY(y){
        this.y = y;
    }
    setSize(size){
        this.size = size;
    }
}

class Snake{
    constructor(x, y, cell_size, start_length, direction){
        this.x = x;
        this.y = y;
        this.cell_size = cell_size;
        this.body_length = start_length;
        this.direction = direction;
        this.body = [];
        this.initBody();        
    }
    initBody(){
        for(let i = 0; i < this.body_length; i++){
            let current_cell = new Cell("Body", this.cell_size, this.x - i * this.cell_size,  this.y);
            this.body.push(current_cell);
        }
    }
    getBody(){
        return this.body;
    }
    getLength(){
        return this.body_length;
    }
    getHead(){
        return this.body[0];
    }
}


class Game extends Config{
    constructor(config){
        super(config);
        this.snake = new Snake(this.snake_x, this.snake_y, this.cell_size, this.snake_start_length, this.start_direction);
        this.drawSnake();        
    }
    drawSnake(){
        document.querySelector('.board').innerHTML = '';
        let cell, div;
        for(let i = 0; i < this.snake.getBody().length; i++){
            cell = this.snake.getBody()[i];
            div = document.createElement('div');
            div.className = 'cell';
            div.style.left = cell.x + "px";
            div.style.top = cell.y + "px";
            document.querySelector('.board').appendChild(div);
        }  
    }
    moveSnake(){
        //Move Part
        for(let i = this.snake.getLength() - 1; i > 0; i--){
            let current_cell = this.snake.getBody()[i];
            let next_cell = this.snake.getBody()[i - 1];
            current_cell.setX(next_cell.getX());
            current_cell.setY(next_cell.getY());
        }
        //Move Head
        this.moveHead(this.snake.getBody()[0]);
    }
    moveHead(head){
        if(this.snake.direction === 'Up'){
            head.y -= this.cell_size;
        } else if(this.snake.direction === 'Right'){
            head.x += this.cell_size;
        } else if(this.snake.direction === 'Down'){
            head.y += this.cell_size;
        } else if(this.snake.direction === 'Left'){
            head.x -= this.cell_size;
        }
    }
    checkBounds(){
        let head = this.snake.getHead();
        if(head.getY() < this.board_y){ //Top
            head.setY(this.board_y + this.board_height - head.getSize());
        } else if(head.getX() + head.getSize() > this.board_x + this.board_width){ //Right
            head.setX(this.board_x);
        } else if(head.getY() + head.getSize() > this.board_y + this.board_height){ //Bottom
            head.setY(this.board_y);
        } else if(head.getX() < this.board_x){ //Left
            head.setX(this.board_x + this.board_width - head.getSize());
        }
    }

    runGame(){
        this.moveSnake(); 
        this.checkBounds();
        this.drawSnake();
    }
}

let config = 
{
    board_x: document.querySelector('.board').offsetLeft,
    board_y: document.querySelector('.board').offsetTop,
    board_width: 500,
    board_height: 500,
    cell_size: 20, 
    snake_start_length: 4, 
    snake_x: document.querySelector('.board').offsetLeft + 3 * 20, 
    snake_y: document.querySelector('.board').offsetTop, 
    start_direction: 'Right' 
}

let game = new Game(config);
//Need bind, otherwise 'this' in runGame is 'window' instead of 'Game
setInterval(game.runGame.bind(game), 100);
