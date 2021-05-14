document.addEventListener("keydown", (e)=>{
    if(e.key === 'ArrowUp' && game.snake.direction != 'Down'){
        game.snake.direction = 'Up';
    } else if(e.key === 'ArrowRight' && game.snake.direction != 'Left'){
        game.snake.direction = 'Right';
    } else if(e.key === 'ArrowDown' && game.snake.direction != 'Up'){       
        game.snake.direction = 'Down';
    } else if(e.key === 'ArrowLeft' && game.snake.direction != 'Right'){
        game.snake.direction = 'Left';
    }   
});
