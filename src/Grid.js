
// Affichage d'une grille à la position x et y, de la taille N par M;
function displayGrid(grid, positionY, positionX, rectWidth, rectHeight){
  let gridWidth = 0
  let gridHeight = 0
  
  gridWidth = positionX + grid.length * rectWidth;
  gridHeight = positionY + grid[0].length * rectHeight;
  
  for (let x=0; x<grid.length; x++){
    for(let y=0; y<grid[x].length; y++){
      
      if(grid[x][y] === 0){
        // fill(color(255, 255, 255));
        image(sky, positionY+y*rectWidth, positionX+x*rectHeight, rectWidth, rectHeight)
      }else if (grid[x][y] === 1) {
        image(stoneBrick, positionY+y*rectWidth, positionX+x*rectHeight, rectWidth, rectHeight)
        // fill(color(255, 0, 0));
      }

      // rect(
      //   positionY+y*rectWidth,
      //   positionX+x*rectHeight,
      //   rectWidth,
      //   rectHeight
      // )
      
    }
  }
  return [positionX, positionY, gridWidth, gridHeight]
}


function drawGrid(){

  arrayMap = []

  let currentMap = findIndexOfPositionIn2dArray(characterPositionX, characterPositionY, World.worldsMap, rectWidth*Maps.numberOfRow, rectHeight*Maps.numberOfColumns)

  // Dessiner la map et les chunks autour
    
  // Milieu Milieu
  arrayMap.push(World.worldsMap[currentMap[1]][currentMap[0]])

  // Milieu Gauche 
  if (currentMap[0]-1 >= 0){
    arrayMap.push(World.worldsMap[currentMap[1]][currentMap[0]-1])
  }

  // Milieu Droite
  if (currentMap[0]+1 < World.worldsMap[0].length ){
    arrayMap.push(World.worldsMap[currentMap[1]][currentMap[0]+1])
  }

  // Milieu Bas
  if(currentMap[1]+1 < World.worldsMap.length){
    arrayMap.push(World.worldsMap[currentMap[1]+1][currentMap[0]])
  }

  // Milieu Haut
  if (currentMap[1]-1 >= 0){
    arrayMap.push(World.worldsMap[currentMap[1]-1][currentMap[0]])
  }

  // Milieu Haut Gauche
  if (currentMap[1]-1 >= 0 && currentMap[0]-1 >= 0){
    arrayMap.push(World.worldsMap[currentMap[1]-1][currentMap[0]-1])
  }

  // Milieu Haut Droite
  if (currentMap[1]-1 >= 0 && currentMap[0]+1 < World.worldsMap[0].length){
    arrayMap.push(World.worldsMap[currentMap[1]-1][currentMap[0]+1])
  }

  // Milieu Bas Droite
  if (currentMap[1]+1 < World.worldsMap.length && currentMap[0]+1 < World.worldsMap[0].length){
    arrayMap.push(World.worldsMap[currentMap[1]+1][currentMap[0]+1])
  }

  // Milieu Bas Gauche
  if (currentMap[1]+1 < World.worldsMap.length && currentMap[0]-1 >= 0){
    arrayMap.push(World.worldsMap[currentMap[1]+1][currentMap[0]-1])
  }





  background(220);
  stroke(0)

  // récupérer le maximum de cases possible dans le canvas
  // let [maxNumberCasesX, maxNumberCasesY] = getNumberOfCasesInRect(
  //   windowWidth,
  //   windowHeight,
  //   rectWidth,
  //   rectHeight
  // )

  
  fill(255)

  
  
  arrayMap.forEach(element => {
    

    let indexMap = findIndexValueIn2dArray(World.worldsMap, Maps[element].name)
    // console.log(indexMap)
    // indexMap : [y, x]
    let gridWidthPx = rectWidth*Maps.numberOfRow
    let gridHeightPx = rectHeight*Maps.numberOfColumns
    displayGrid(Maps[element].layers[1], xStartWorld+(gridWidthPx*indexMap[1]), yStartWorld+(gridHeightPx*indexMap[0]), rectWidth, rectHeight)
    
  
  });
  
  
  // let [gridY1, gridX1, gridX2, gridY2] = displayGrid(Maps.map1.layers[1], 0, 520, rectWidth, rectHeight)





  // return [currentMapPlayerPosition, gridX1, gridY1, gridX2, gridY2]
}

