window.addEventListener("load", function(){
	const canvas = document.getElementById("canvas1");
	const ctx = canvas.getContext("2d");
	canvas.width = 900;
	canvas.height = 600;
	
	// global variables
	const cellSize = 100;
	const cellGap = 3;
	const gameGrid = []; // Array to hold all cells in game grid
	const defenders = []; // Array to hold all defenders
	let numberOfResources = 300;
	
	
	// mouse info
	const mouse = {
		x: undefined,
		y: undefined,
		width: 0.1,
		height: 0.1,
	}
	let canvasPosition = canvas.getBoundingClientRect();
	canvas.addEventListener("mousemove", function(e){
		mouse.x = e.x - canvasPosition.left;
		mouse.y = e.y - canvasPosition.top;
	});
	canvas.addEventListener("mouseleave", function(){
		mouse.x = undefined;
		mouse.y = undefined;
	});
	
	// game board info
	const controlsBar = {
		width: canvas.width,
		height: cellSize,
	}
	class Cell {
		constructor(x,y){
			this.x = x;
			this.y = y;
			this.width = cellSize;
			this.height = cellSize;
		}
		draw(){
			if(mouse.x && mouse.y && collision(this, mouse)){
				ctx.strokeStyle = "black";
				ctx.strokeRect(this.x, this.y, this.width, this.height);
			}
			
		}
	}
	function createGrid(){
		for (let y = cellSize; y < canvas.height; y+= cellSize){
			for (let x = 0; x < canvas.width; x += cellSize){
				gameGrid.push(new Cell(x, y));
			}
		}
	}
	createGrid();
	function handleGameGrid(){
		for (let i = 0; i < gameGrid.length; i++){
			gameGrid[i].draw();
		}
	}
	
	// projectiles
	// defenders
	class Defender{
		constructor(x, y){
			this.x = x;
			this.y = y;
			this.width = cellSize;
			this.height = cellSize;
			this.shooting = false;
			this.health = 100;
			this.projectiles = [];
			this.timer = 0;
		}
		draw(){
			ctx.fillStyle = "blue";
			ctx.fillRect(this.x, this.y, this.width, this.height);
			ctx.fillStyle = "gold";
			ctx.font = "20px Arial";
			ctx.fillText(Math.floor(this.health), this.x, this.y);
		}
	}
	canvas.addEventListener("click", function(){
		const gridPositionX = mouse.x - (mouse.x % cellSize);
		const gridPositionY = mouse.y - (mouse.y % cellSize);
		if (gridPositionY < cellSize) return;
		let defenderCost = 100;
		if(numberOfResources >= defenderCost){
			defenders.push(new Defender(gridPositionX, gridPositionY));
			numberOfResources -= defenderCost;
		}
	});
	function handleDefenders(){
		for (let i = 0; i < defenders.length; i++){
			defenders[i].draw();
		}
	}
	
	// enemies
	// resources
	
	// utilities
	function handleGameStatus(){
		ctx.fillStyle = "gold";
		ctx.font = "30px Arial";
		ctx.fillText("Resources: " + numberOfResources, 20, 50);
		
	}
	function animate(){
		// Draw controls bar
		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.fillStyle = "blue";
		ctx.fillRect(0,0,controlsBar.width, controlsBar.height);
		handleDefenders();
		handleGameGrid();
		handleGameStatus();
		requestAnimationFrame(animate);
	}
	animate();
	
	function collision(first, second){
		if (	!(	first.x > second.x + second.width ||
					first.x + first.width < second.x ||
					first.y > second.y + second.height ||
					first.y + first.height < second.y)
		) {
			return true;
		};
	};
});
