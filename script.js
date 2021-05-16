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
        this.speed = config.speed;   
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
    getBack(){
        return this.body[this.body_length - 1];
    }
    getCell(index){
        return this.body[index];
    }
    grow(cell){
        this.body.push(cell);
        this.body_length += 1;
    }
}


class Game extends Config{
    constructor(config){
        super(config);
        this.snake = new Snake(this.snake_x, this.snake_y, this.cell_size, this.snake_start_length, this.start_direction);
        this.generateFood();
        this.drawFood();
        this.drawSnake();  
        this.ate = false;   //Keep track when snake eats food
        this.score = 0;
        this.clicked = this.start_direction;
    }
    //Draw snake on board according to each cell's coordinates array
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
    //Generate food correct coordinates. It shouldn't match to snake's any cell
    generateFood(){
        let end_x = this.board_width / this.cell_size;
        let end_y = this.board_height / this.cell_size;
        let x = this.board_x + (Math.floor(Math.random() * (end_x - 1)) + 1) * this.cell_size;
        let y = this.board_y + (Math.floor(Math.random() * (end_y - 1)) + 1) * this.cell_size;
        this.food = new Cell('Food', this.cell_size, x, y);
        while(!this.validFoodCoordinate()){
            this.generateFood();
        }
    }
    //Check whether food overlaps with snake
    validFoodCoordinate(){
        for(let i = 0; i < this.snake.body_length; i++){
            let cell = this.snake.getCell(i);
            if(cell.getX() === this.food.getX() && cell.getY() === this.food.getY()){
                return false;
            }
        }
        return true;
    }
    //Draw food according to its coordinates
    drawFood(){
        let div = document.createElement('div');
        div.className = 'food';
        div.style.left = this.food.getX() + "px";
        div.style.top = this.food.getY() + "px";
        document.querySelector('.container').appendChild(div);
    }
    //After snake eats food food coordinates shold be changed(Re-appear at new place)
    changeFoodCoordinate(){
        document.querySelector('.food').style.left = this.food.getX() + "px";
        document.querySelector('.food').style.top = this.food.getY() + "px";
    }
    //Snake movement
    moveSnake(){
        let last_cell_x = this.snake.getBack().getX();
        let last_cell_y = this.snake.getBack().getY();
        //Move Part - update current cell's coordinate accordin to its' front neighbour
        for(let i = this.snake.getLength() - 1; i > 0; i--){
            let current_cell = this.snake.getBody()[i];
            let next_cell = this.snake.getBody()[i - 1];
            current_cell.setX(next_cell.getX());
            current_cell.setY(next_cell.getY());
        }
        this.moveHead(this.snake.getBody()[0]);
        //Add cell at the end of body
        if(this.ate){
            let new_cell = new Cell("Body", this.cell_size, last_cell_x,  last_cell_y);
            this.snake.grow(new_cell);
            this.ate = false;
            this.score += 1;
        }
    }
    moveHead(head){
        /* 
            There could be multiple clicks in interval, that's why we keep only one of them.
        */
        this.snake.direction = this.clicked;
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
        this.checkWalls();
        this.checkCollision();
    }
    checkWalls(){
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
    //Check if head collides with body
    checkCollision(){
        let head = this.snake.getHead();
        let cell;
        for(let i = this.snake.getLength() - 1; i > 0; i--){
            cell = this.snake.getCell(i);
            if(head.getX() === cell.getX() && head.getY() === cell.getY()){
                this.finishRound(); 
                break;
            }
        }
    }   
    checkFoodEat(){
        let head = this.snake.getHead();
        if(head.getX() === this.food.getX() && head.getY() === this.food.getY()){
            this.ate = true;
            this.generateFood();
            this.changeFoodCoordinate();
        }
    }
    finishRound(){
        clearInterval(this.interval);
        alert('Your Score is: ' + this.score);
        this.reset();
        this.start();
    }
    reset(){
        document.querySelector('.food').remove();
        this.score = 0;
        this.snake = new Snake(this.snake_x, this.snake_y, this.cell_size, this.snake_start_length, this.start_direction);
        this.generateFood();
        this.drawFood();
        this.drawSnake();  
        this.ate = false;   //Keep track when snake eats food
    }
    start(){
        this.interval = setInterval(this.runRound.bind(this), this.speed);
    }
    runRound(){
        this.moveSnake(); 
        this.checkBounds();
        this.checkFoodEat();
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
    snake_start_length:4, 
    snake_x: document.querySelector('.board').offsetLeft + 3 * 20, 
    snake_y: 50, 
    start_direction: 'Right',
    speed: 100
}

let game = new Game(config);
game.start();



