//^ /* -------------------------------------------------------------------------- */
//^ /*                    Collisions de l'entité avec le monde                    */
//^ /* -------------------------------------------------------------------------- */
function handleCollisionMobs(
  agentX,
  agentY,
  agentWidth,
  agentHeight,
  agentDirection,
  objectX,
  objectY,
  objectWidth,
  objectHeight,
  velocityY,
  jumpCount,
  isJumping
) {

  let haveToJump = false;

  if (
    rectIsInRect(
      agentX,
      agentY,
      agentWidth,
      agentHeight,
      objectX,
      objectY,
      objectWidth,
      objectHeight
    )
  ) {


    //& Collisions dessus / dessous de l'objet
    if (
      agentX < objectX + objectWidth - objectWidth / 10 &&
      agentX + agentWidth > objectX + objectWidth / 10
    ) {
      //? collisions en dessous de l'objet
      if (agentY < objectY + objectHeight && agentY > objectY) {
        agentY = objectY + objectHeight;

        velocityY = 0;
      }
      //? collision au dessus de l'objet
      else if (agentY + agentHeight > objectY && agentY < objectY) {
        agentY = objectY - agentHeight;

        jumpCount = 0;
        isJumping = false;
        if (!isJumping) {
          velocityY = 0;
        }
      }
    }



    //& Collisions sur les côtés de l'objet
    if (
      agentY < objectY + objectHeight - objectHeight / 10 &&
      agentY + agentHeight > objectY + objectHeight / 10
    ) {
      //? collisions à droite de l'objet
      if (agentX + agentWidth > objectX && agentX > objectX) {
        agentX = objectX + objectWidth;

        //? collisions à gauche de l'objet
      } else if (agentX < objectX + objectWidth && agentX < objectX) {
        agentX = objectX - agentWidth;
      }


      haveToJump = true;

    }


  }
  // console.log(haveToJump)


  return [agentX, agentY, velocityY, jumpCount, isJumping, haveToJump];
}


//^ /* -------------------------------------------------------------------------- */
//^ /*                              Suivre le joueur                              */
//^ /* -------------------------------------------------------------------------- */
function followPlayer(Mobs) {

  //& Initialisation des variables

  Mobs.isFollowing = true;

  let distance = characterPositionX - Mobs.x;
  let followSpeed = Mobs.followSpeed;
  let MobsHaveToJump = Mobs.haveToJump;

  Mobs.movement = "walk";
  Mobs.direction = "right";

  //& Se diriger vers le perso
  if (distance < 0) {
    Mobs.direction = "left";
    followSpeed *= -1;
  }

  //& Si je dois sauter, ... . Sinon, marcher.
  if (MobsHaveToJump) {} else {
    Mobs.stepCount += followSpeed;
  }
}


//^ /* -------------------------------------------------------------------------- */
//^ /*                     Un mob se ballade / fait une ronde                     */
//^ /* -------------------------------------------------------------------------- */
function doRound(Mobs) {



  //& Initialisation des variables

  Mobs.movement = "walk";
  Mobs.isFollowing = false;

  let CurrentX = Mobs.x;
  let walkAmount = Mobs.stepCount;

  let MobEnd = Mobs.xEnd;
  let MobStart = Mobs.xStart;

  let haveToJump = Mobs.haveToJump;
  // console.log(haveToJump);

  //& FAIRE UNE RONDE
  if (CurrentX >= MobEnd) {
    Mobs.direction = "left";
  } else if (CurrentX <= MobStart) {
    Mobs.direction = "right";
  }


  //& Se déplacer
  //* Si je vais à droite
  if (Mobs.direction == "right") {

    //* Si je dois sauter, s'orienter dans l'autre sens
    if (haveToJump) {
      Mobs.direction = "left";
      haveToJump = false;
      walkAmount -= Mobs.speed



      //* Sinon, marcher
    } else {
      walkAmount += Mobs.speed;
    }


    //* Si je vais à gauche
  } else {

    //* Si je dois sauter, s'orienter dans l'autre sens
    if (haveToJump) {
      Mobs.direction = "right";
      haveToJump = false;
      walkAmount += Mobs.speed


      //* Sinon, marcher
    } else {
      walkAmount -= Mobs.speed;
    }
  }

  //& Retourner les variables
  Mobs.haveToJump = haveToJump;
  Mobs.stepCount = walkAmount;
  Mobs.xStart = MobStart;
  Mobs.xEnd = MobEnd;
}