document.addEventListener("keydown", (e)=>{
    if(e.key === 'ArrowUp' && game.snake.direction != 'Down'){
        game.clicked = 'Up';    
    } else if(e.key === 'ArrowRight' && game.snake.direction != 'Left'){
        game.clicked = 'Right';
    } else if(e.key === 'ArrowDown' && game.snake.direction != 'Up'){       
        game.clicked = 'Down';
    } else if(e.key === 'ArrowLeft' && game.snake.direction != 'Right'){
        game.clicked = 'Left';
    }   
});


