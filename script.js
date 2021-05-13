


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
    getY(){
        return this.y;
    }
    getSize(){
        return this.cell_size;
    }
    getColor(){
        return this.color;
    }
    
}

class Snake{
    constructor(snake_x, snake_y, cell_size, snake_start_length){
        
        this.snake_x = snake_x;
        this.snake_y = snake_y;
        this.cell_size = cell_size;
        this.list = [];
        this.snake_length = snake_start_length;
        this.initBody();
        
        
    }
    initBody(){
        //console.log('Constructor - Snake');
        //console.log(this.snake_length);
        for(let i = 0; i < this.snake_length; i++){
            let current_cell = new Cell("Body", this.cell_size, this.snake_x + i * this.cell_size,  this.snake_y,  'green');
            
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


class Game{
    constructor(start_direction){
        console.log('Constructor - Game');
        this.snake = new Snake(450, 100, 20, 4);
        this.direction = start_direction;
        this.draw_snake();
        
    }
    
    draw_snake(){
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
    move(){
        
        let top, left;
        top = document.querySelector('.cell').offsetTop;
        left = document.querySelector('.cell').offsetLeft;
        if(this.direction === 'Up'){
            top -= this.cell_size;
        } else if(this.direction === 'Right'){
            left += this.cell_size;
        } else if(this.direction === 'Down'){
            top += this.cell_size;
        } else if(this.direction === 'Left'){
            left -= this.cell_size;
        }
        document.querySelector('.cell').style.top = top.toString() + 'px';
        document.querySelector('.cell').style.left = left.toString() + 'px';
        console.log('Move');
    }
    run_game(){
        this.move();
    }

}


let game = new Game('Right');
// setInterval(game.move, 200);
