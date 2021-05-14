class Config{
    constructor(board_width, board_height, cell_size, snake_start_length, snake_x, snake_y, start_direction){
        this.board_width = board_width;
        this.board_height = board_height;
        this.cell_size = cell_size;
        this.snake_start_length = snake_start_length;
        this.snake_x = snake_x;
        this.snake_y = snake_y;
        this.start_direction = start_direction;
        
    }
} 

class Cell{
    //Type - Snake's part or food
    //Size - width/height (same because it's square)
    constructor(type, cell_size, x, y, color){
        //console.log('Constructor - Cell');
        this.cell_size = cell_size;
        this.type = type;
        this.x = x;
        this.y = y;
        this.color = color;

    }
    getType(){
        return this.type;
    }
    getX(){
        return this.x;
    }
    setX(x){
        this.x = x;
    }
    setY(y){
        this.y = y;
    }
    getY(){
        return this.y;
    }
    getSize(){
        return this.cell_size;
    }
    getColor(){
        return this.color;
    }
    getDirection(){
        return this.direction;
    }
    setDirection(direction){
        this.direction = direction;
    }
    
}

class Snake{
    constructor(snake_x, snake_y, cell_size, snake_start_length, direction){
        
        this.snake_x = snake_x;
        this.snake_y = snake_y;
        this.cell_size = cell_size;
        this.list = [];
        this.snake_length = snake_start_length;
        this.direction = direction;
        this.initBody();
        
        
    }
    initBody(){
        for(let i = 0; i < this.snake_length; i++){
            let current_cell = new Cell("Body", this.cell_size, this.snake_x - i * this.cell_size,  this.snake_y,  'green');
            this.list.push(current_cell);
            
        }
        //console.log(this.list);
    }
    getBody(){
        return this.list;
    }
    length(){
        return this.snake_length;
    }
    head(){

    }
}


class Game extends Config{
    constructor(){
        super(500, 500, 20, 4, 450, 200, 'Right');
        this.snake = new Snake(this.snake_x, this.snake_y, this.cell_size, this.snake_start_length, this.start_direction);
        this.new_direction = this.start_direction;
        this.drawSnake();
        this.changer_x = 0;
        this.changer_y = 0;
        
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
            //console.log(div.style.left);
            document.querySelector('.board').appendChild(div);
        }  
    }
    moveSnake(){
        //Move Part
        for(let i = this.snake.getBody().length - 1; i > 0; i--){
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
    runGame(){
        this.moveSnake(); //Movement of snake
        this.drawSnake();
    }
}

let game = new Game();
//Need bind, otherwise 'this' in runGame is 'window' instead of 'Game
setInterval(game.runGame.bind(game), 300);
