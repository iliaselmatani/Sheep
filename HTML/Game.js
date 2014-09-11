/*

Ilias el Matani - Fontys Hogescholen ICT

1)
formule random = Math.floor(Math.random() * (max - min + 1)) + min;
Vrij bewerkt uit : http://stackoverflow.com/questions/3594177/random-number-between-10-and-10-in-javascript/3594189#3594189

2)
Spritesheet 
Vrij bewerkt uit : https://github.com/CreateJS/EaselJS/blob/master/examples/SpriteSheet.html & Fontys HC presentaties

3)
Array
Vrij bewerkt uit : http://hetisstilaandeoverkant.nl/javascript/sneeuw.html

*/

var stage;
stage = new Stage("sheepCatchCanvas");

startGame = false;
startMenu = true;
startTickerGame = false;

	wolkjesLinks = new Bitmap("wolkjesLinks.png");
	wolkjesLinks.x = 80;
	wolkjesLinks.y = 30;

	Knopjes = new Bitmap("knopjes.png");
	Knopjes.x = 280;
	Knopjes.y = 150;

			Start = stage.addChild(new Shape());
			Start.graphics.beginFill("white").drawRect(0,0,73,28);
			Start.x = 340;
			Start.y = 155;
				
				Start.onClick = function(e) {
					if (document.cookie.length >0)
					{
						
						// achterhalen van de naam van de speler ( gezet in funtie omdat deze nu 2x al gebruikt wordt)
						naampiesSpeler();
									
						
							alert("Welkom terug" + HeheNaamSpeler);
						
						
						// ----------------------------------- Extra ----------------------------
															
														/*	hiGeshtLevel();
													
													alert("Level: " + highScoreCookie);
														
															
												geslachteSchapen();	
														
														alert("Gevangen schapen: " + SchapJesHiCookie);
														
															if ( SchapJesHiCookie <= 5)
															{
																alert("Dat vangen kan dus BETER!!");
															}		
															
															if ( highScoreCookie >= 2 )
															{
																alert("Je hebt de volgende level bereikt, maar kan hoger!");
																
															}	*/
									
						//--------------------------------------Einde extra---------------------------------			
					}
					
					
					
				stage.removeAllChildren();
				stage.update();
					startMenu = false;
						startdeGame();
						startTickerGame = true;
						
				}
			
			highScores = stage.addChild(new Shape());
			highScores.graphics.beginFill("white").drawRect(0,0,173,28);
			highScores.x = 290;
			highScores.y = 210;
				
				highScores.onClick = function(e) {
					highScoreScherm();
				}
				
	wolkjesRechtsExtra = new Bitmap("wolkjesRechtsExtra.png");
	wolkjesRechtsExtra.x = 500;
	wolkjesRechtsExtra.y = 10;
	
	deZon = new Bitmap("zon.png");
	deZon.x = 690;
	deZon.y = 25;
	
	deGrond = new Bitmap("grond.png");
	deGrond.x = 0;
	deGrond.y = 490;
	
	landschapBergje = new Bitmap("landschapBergje.png");
	landschapBergje.x = 0;
	landschapBergje.y = 400;
	
	deBoom = new Bitmap("boom.png");
	deBoom.x = 650;
	deBoom.y = 350; 
	
	vanger = new Bitmap("vangerAlleen.png");
	vanger.x = 350;
	vanger.y = 380;
	
	if (navigator.cookieEnabled = true)
	{
		console.log("cookie settings OK");
	}
	else
	{
		alert("Fout! Cookies toestaan staat uit, nodig voor opslaan high score.");
	}
	
	stage.addChild(wolkjesLinks, Knopjes, wolkjesRechtsExtra, deZon, deGrond, landschapBergje, deBoom, vanger);
	stage.update();

down=false; 
up=false;
left=false;
right=false;
ESC=false;
spaceBar=false;

schapenGevangenCounter=0;
schapenScoreCounter=0;
schapenArrayYspeed=4;
//vangerSpeed=12;
level=1;
leven=100; // nog implementeren
//landschapBergjeXCor = landschapBergje.x + 15;

schapenArray = new Array();

vangerX = 350;
vangerY = 390;

vangerSS = new SpriteSheet({
				"frames": {
					"width": 90.2,
					"numFrames": 7,
					"regX": 2,
					"regY": 2,
					"height": 117
				},
				"animations": {"normal": [0], "left": [1,2,3,4], "right": [1,2,3,4,1,2,3,4], "catch": [5,6]},
				"images": ["vangersprite2.png"]
			});

vanger = new BitmapAnimation(vangerSS);
			vanger.x = vangerX;
			vanger.y = vangerY;
			
vanger.gotoAndPlay("normal")
		
function schaapVangenDetect(obj1, obj2) {          

	difx = obj2.x - obj1.x;          
	dify = obj2.y - obj1.y;                
	return Math.sqrt( (difx*difx) + (dify*dify) );  

}

function naampiesSpeler(){
	// al deze ellende is alleen voor de naam van de speler!!
						
						iNaampje = (document.cookie.indexOf("Naam:"));
						NaampjeInt = parseInt(iNaampje);
						NaampjeInt = NaampjeInt + 5;
						
						iVolgende = (document.cookie.indexOf("--"));
						VolgendeInt = parseInt(iVolgende);
						
							//console.log(NaampjeInt);
							//console.log(VolgendeInt);
							
								NieuweInt = VolgendeInt - NaampjeInt;
								//console.log(NieuweInt);
								
									HeheNaamSpeler = (document.cookie.substr(NaampjeInt,NieuweInt));
}

function hiGeshtLevel(){
	// hoogste level
								// debug (cookie): Naam: Jan -- Gevangen schaapjes: 4 -- Behaalde level: 1
							iLevel = (document.cookie.indexOf("level"));
							hoogsteLevelInt = parseInt(iLevel);
							iLevel = iLevel +7;
							
							highScoreCookie = (document.cookie.substr(iLevel,1));
}

function geslachteSchapen(){
	// schaapjes getal
								iAantalSchapJes = (document.cookie.indexOf("s:"));
								aantalSchaapjesInt = parseInt(iAantalSchapJes);
								aantalSchaapjesInt = aantalSchaapjesInt +2;
								 
								SchapJesHiCookie = (document.cookie.substr(aantalSchaapjesInt,3));
}

function leveneraf(){
	leven = leven -5 ;
}

function createSchapen()
			{
				schaap = new Bitmap("schaapLinks.png");
				
				minXSchaap = 50;
				maxXSchaap = 500;
					
   				schaap.x = Math.floor(Math.random() * (maxXSchaap - minXSchaap + 1)) + minXSchaap;
				
					if (schaap.x > 50 && schaap.x <130){
						schaap.y = 85;
					}
					
					else if (schaap.x > 130 && schaap.x <320){
						schaap.y = 140;
					}
					
					else if (schaap.x > 320 && schaap.x <=500){
						schaap.y = 95;
					}
				
				//schaap.y = 45;
    	
				schapenArray.push(schaap); 				
				stage.addChild(schaap);
				//console.log(schapenArray.length);
				
				// for schapenArray.lengt < 2 
				// createschapen();
			}			
			
function gameOver(){
				stage.removeAllChildren();
				
					gameOver = new Bitmap("gameover.png");
						gameOver.x = 200;
						gameOver.y = 150;
						
							// score opslaan, opnieuw proberen
							gameOverRect1 = new Shape();
								gameOverRect1.graphics.beginFill("white").drawRect(0,0,320,28);
								gameOverRect1.x = 215;
								gameOverRect1.y = 275;	
								
									gameOverRect1.onClick = function(e) {
										opslaanHighScore();
										window.top.location.reload();
									}
								
							// score niet opslaan, opnieuw proberen	
							gameOverRect2 = new Shape();
								gameOverRect2.graphics.beginFill("white").drawRect(0,0,385,28);
								gameOverRect2.x = 210;
								gameOverRect2.y = 335;	
									
									gameOverRect2.onClick = function(e) {
										window.top.location.reload();
									}
									
									if (/MSIE/.test(navigator.userAgent))
									{
										failMP3 = new Audio("fail.mp3");
										failMP3.play();
									}
									
									else 
									{
										failWAV = new Audio("fail.wav");
										failWAV.play();
									}
					
					stage.addChild(gameOverRect1, gameOverRect2, gameOver);
				
				stage.update();
}


function highScoreScherm(){
				stage.removeAllChildren();
				
					highScoreScherm = new Bitmap("high score.png");
						highScoreScherm.x = 200;
						highScoreScherm.y = 150;	
						
						// Klik HIER om terug te keren naar het hoofdscherm	
							highScoreSchermRect = new Shape();
								highScoreSchermRect.graphics.beginFill("white").drawRect(0,0,280,15);
								highScoreSchermRect.x = 233;
								highScoreSchermRect.y = 345;
								
									highScoreSchermRect.onClick = function(e) {
										window.top.location.reload();
									}
									
									// de gegevens uit de cookie halen
									geslachteSchapen();
									
												// omdat vanuit functie niet werkt!
												iNaampje = (document.cookie.indexOf("Naam:"));
												NaampjeInt = parseInt(iNaampje);
												NaampjeInt = NaampjeInt + 5;
												
												iVolgende = (document.cookie.indexOf("--"));
												VolgendeInt = parseInt(iVolgende);
																									
														NieuweInt = VolgendeInt - NaampjeInt;
														
															NaamSpelerHigh = (document.cookie.substr(NaampjeInt,NieuweInt));
															
															// omdat deze ook niet werkt vanuit functie
															
															iLevel = (document.cookie.indexOf("level"));
															hoogsteLevelInt = parseInt(iLevel);
															iLevel = iLevel +7;
							
															highScoreCookie = (document.cookie.substr(iLevel,1));
																	
									tekEsT = new Text(NaamSpelerHigh, "12px brandish");
									tekEsT.x = 500;
									tekEsT.y = 240;
									
									tekEsT1 = new Text(SchapJesHiCookie, "12px brandish");
									tekEsT1.x = 500;
									tekEsT1.y = 252;
									
									tekEsT2 = new Text(highScoreCookie, "12px brandish");
									tekEsT2.x = 506;
									tekEsT2.y = 263;
									
									if (document.cookie.length >0)
									{
										console.log("everything ok");
										stage.addChild(highScoreSchermRect, highScoreScherm, tekEsT, tekEsT1, tekEsT2);
									}
									else
									{
										alert("Nog geen high score van jou bekend!");
										window.top.location.reload();
									}
									
						
				stage.update();
}
			
function writeCookie(){
	document.cookie = "Naam:" + " " + naamSpeler + " -- " + "Gevangen schaapjes:" + " " +schapenScoreCounter + " -- " + "Behaalde level:" +  " " +level
	}
			
function opslaanHighScore(){
	naamSpeler = prompt("Wat is uw naam:","");
	//console.log(naamSpeler + " je score is "  +  schapenScoreCounter + " " + "en level" + " " +level);
	
		// high level score
		iLevel = (document.cookie.indexOf("level"));
		hoogsteLevelInt = parseInt(iLevel);
		iLevel = iLevel +7;				
			highScoreCookie = (document.cookie.substr(iLevel,1));
							
								// schaapjes getal
								iAantalSchapJes = (document.cookie.indexOf("s:"));
								aantalSchaapjesInt = parseInt(iAantalSchapJes);
								aantalSchaapjesInt = aantalSchaapjesInt +2;
									SchapJesHiCookie = (document.cookie.substr(aantalSchaapjesInt,2));
	
			if (naamSpeler!=null && naamSpeler!="" && SchapJesHiCookie < schapenScoreCounter)
			{
				writeCookie(naamSpeler + " je score is "  +  schapenScoreCounter + " " + "en level" + " " +level);
				console.log("cookie bijgewerkt!");
				console.log("nieuwe cookie: " + document.cookie);
			}
			else
			{
				console.log("cookie NIET bijgewerkt!");
			}
}

function handleKeyDown(e) 
{	

switch (true)
	{
		
case ( e.keyCode == 38):
	   down=true;
	   break;
	   
case ( e.keyCode == 40):
	   up=true;
	   break;
	   
case ( e.keyCode == 37):
	   left=true;
	   break;
	   
case ( e.keyCode == 39):
	   right=true;
	   break;  
	   
case ( e.keyCode == 27):
	   ESC=true;
	   break;  
	   
case ( e.keyCode == 32):
		spaceBar=true;
		//console.log("true");
		break;  
	}
}

function handleKeyUp(e) 
{	

switch (true)
	{
	   
case ( e.keyCode == 38):
	   down=false;
	   break;
	   
case ( e.keyCode == 40):
	   up=false;
	   break;
	   
case ( e.keyCode == 37):
	   left=false;
	   vanger.gotoAndPlay("normal");
	   break;
	   
case ( e.keyCode == 39):
	   right=false;
	   vanger.gotoAndPlay("normal");
	   break;
	   
case ( e.keyCode == 27):
	   ESC=false;
	   break; 
	   
case ( e.keyCode == 32):
		spaceBar=false;
		vanger.gotoAndPlay("normal");
		break;
	}
}

wolkjesLinks = new Bitmap("wolkjesLinks.png");
wolkjesLinks.x = 80;
wolkjesLinks.y = 30;

wolkjesRechts = new Bitmap("wolkjesRechts.png");
wolkjesRechts.x = 280;
wolkjesRechts.y = 70;

wolkjesRechtsExtra = new Bitmap("wolkjesRechtsExtra.png");
wolkjesRechtsExtra.x = 500;
wolkjesRechtsExtra.y = 10;

deZon = new Bitmap("zon.png");
deZon.x = 690;
deZon.y = 25;

deGrond = new Bitmap("grond.png");
deGrond.x = 0;
deGrond.y = 490;

landschapBergje = new Bitmap("landschapBergje.png");
landschapBergje.x = 0;
landschapBergje.y = 400;

deBoom = new Bitmap("boom.png");
deBoom.x = 650;
deBoom.y = 350; 

Restart = new Text("Restart de game!", "20px Arial"); 

							Restart.x = 640;
							Restart.y = 210;
								
								ReStart = new Shape();
								ReStart.graphics.beginFill("white").drawRect(0,0,155,28);
								ReStart.x = 640;
								ReStart.y = 190;	
									
									ReStart.onClick = function(e) {
										leven = 100;
										level = 1;
										schapenGevangenCounter=0;
										schapenScoreCounter=0;
										schapenArrayYspeed=4;
										stage.removeChild(schaap);
									}
									
StopPen = new Text("Stop de game!", "20px Arial"); 

							StopPen.x = 640;
							StopPen.y = 180;
								
								StopPen1Rect = new Shape();
								StopPen1Rect.graphics.beginFill("white").drawRect(0,0,133,28);
								StopPen1Rect.x = 640;
								StopPen1Rect.y = 160;	
									
									StopPen1Rect.onClick = function(e) {
										stage.removeAllChildren();
										startTickerGame = false;
										stage.update();
										gameOver();
									}

Score = new Text("Aantal gevangen schapen:" + schapenScoreCounter, "12px Arial"); 

							Score.x = 640;
							Score.y = 250;
							
Speed = new Text("Level:" + schapenScoreCounter, "12px Arial"); 

							Speed.x = 640;
							Speed.y = 270;

Levens = new Text("Levens:" + leven, "12px Arial"); 

							Levens.x = 640;
							Levens.y = 290;

document.onkeyup = handleKeyUp;  
document.onkeydown = handleKeyDown;

	function startdeGame(){
	startTickerGame = true;
	createSchapen();
	
	/*aantalSchapen=2;
	
		for(var i = 0; i < aantalSchapen;i++ )
				{
					createSchapen();
				}*/ // troep!!
	
	stage.addChild(wolkjesLinks, wolkjesRechts, wolkjesRechtsExtra, deZon, deGrond, landschapBergje, vanger, deBoom, Score, 	Speed, Levens, ReStart, Restart, StopPen1Rect, StopPen );
stage.update();
	}

wolkjesLinksSnelheid = 4;
wolkjesRechtsSnelheid = 2;
wolkjesRechtsExtraSnelheid = 5;
deZonSnelheid = 1;
schaapLinksSnelheid = 1;

	new Ticker.setFPS(25);  
	
	Ticker.addListener(window);
	
	function tick() {
	
	if ( startTickerGame ){
		
			 
			
			//---------------------------------- Wolkjes in ticker --------------------------//
			
												 wolkjesLinks.x = wolkjesLinks.x + wolkjesLinksSnelheid;
		 wolkjesRechts.x = wolkjesRechts.x + wolkjesRechtsSnelheid;
		 wolkjesRechtsExtra.x = wolkjesRechtsExtra.x + wolkjesRechtsExtraSnelheid;
			
				switch (true){
				
				case ( wolkjesLinks.x > 130 ):
	   			wolkjesLinksSnelheid = -2;
  				break;
				
				case ( wolkjesLinks.x < 50 ):
				wolkjesLinksSnelheid = +2;
				break;
				
				case ( wolkjesRechts.x > 320 ):
				wolkjesRechtsSnelheid = -2;
				break;
				
				case ( wolkjesRechts.x < 250 ):
				wolkjesRechtsSnelheid = +2;
				break;
				
				case ( wolkjesRechtsExtra.x > 500 ):
				wolkjesRechtsExtraSnelheid = -2;
				break;
				
				case ( wolkjesRechtsExtra.x < 435 ):
				wolkjesRechtsExtraSnelheid = +2;
				break;
				
			}
					
			//---------------------------------- Einde Wolkjes in ticker ---------------------//
	 		
			deZon.x = deZon.x + deZonSnelheid;
			deZon.y = deZon.y + deZonSnelheid;
			
			switch (true){
				
				case ( deZon.x > 660 ):
	   			deZonSnelheid *= -1; 
  				break;	
				
				case ( deZon.x < 705 ):
				deZonSnelheid *= -1; 
				break;
				
				case ( deZon.y > 50 ):
				deZonSnelheid *= -1;
				break;
				
				case ( deZon.y < 24 ):
				deZonSnelheid *= -1;
				break;
				
			}
		 					
			switch (true){
				
				case ( up == true && vangerY < 430 ):
				vangerY = vangerY +4;
				vanger.y = vangerY;
  				break;
				
				case ( down == true && vangerY > 390 ):
				vangerY = vangerY -4;
				vanger.y = vangerY;
				break;
				
				case ( right == true && vangerX < 630 ):
				vanger.gotoAndPlay("right");
				vangerX = vangerX + 4;
				vanger.x = vangerX;
				break;
				
				case ( left == true && vangerX > 20 ):
				vanger.gotoAndPlay("left");
				vangerX = vangerX - 4;
				vanger.x = vangerX;
				break;
				
				case ( spaceBar == true ):
				vanger.gotoAndPlay("catch");
				break;
				
				
			}
			
			switch (true){
				
				case ( vangerX < 255 ):
				stage.removeChild(landschapBergje);
				break;
				
				case ( vangerX > 255 ):
				stage.addChild(landschapBergje);
				break;
			}
			
				for(var i = 0; i < schapenArray.length;i++ )
						{
							
							if(schaapVangenDetect(landschapBergje, schapenArray[i]) < 155){
							stage.removeChild(landschapBergje);
							}
							// niet nodig omdat deze automatisch na de hit detect weer toevoegd
							// setTimeout(function(){stage.addChild(landschapBergje);},900);
						}						
			
			switch (true){
				
				case ( vangerX < 562 ):
				stage.addChild(deBoom);
				break;
				
				case ( vangerX > 562 ):
				stage.removeChild(deBoom);
				break;			
		}
		
		if (schapenArray.length != 0)
			{
				for(var i = 0; i < schapenArray.length;i++ )
				{
    				schapenArray[i].y = schapenArray[i].y+schapenArrayYspeed;
    				if(schapenArray[i].y>600)
					{
						stage.removeChild(schapenArray[i]);
						schapenArray[i] = null;
						schapenArray.splice(i,1);
						createSchapen();
						leveneraf();
						
								if (/MSIE/.test(navigator.userAgent))
									{
										goodbyeMP3 = new Audio("goodbye.mp3");
										goodbyeMP3.play();
									}
									
									else 
									{
										goodbyeWAV = new Audio("goodbye.wav");
										goodbyeWAV.play();
									}
					}
					
							if(spaceBar && schaapVangenDetect(vanger, schapenArray[i]) < 55)  
						{        	        		
							stage.removeChild(schapenArray[i]);
							stage.removeChild(schaap);
							schaap == null;
							schapenArray[i] = null;
							schapenArray.splice(i,1);
							createSchapen();
								schapenScoreCounter++;
								schapenGevangenCounter++;
								
									if (/MSIE/.test(navigator.userAgent))
									{
										catchSheepMP3 = new Audio("schaapje.mp3");
										catchSheepMP3.play();
									}
									
									else 
									{
										catchSheepWAV = new Audio("schaapje.wav");
										catchSheepWAV.play();
									}


						}
					}
			}
			
			if ( schapenGevangenCounter > 5 ){
					schapenArrayYspeed = schapenArrayYspeed +3;
					schapenGevangenCounter=0;
					level++;
					//vangerSpeed = vangerSpeed -4;
					//console.log("schapen vallen vanaf NU sneller!");
				}
				
			Score.text = ("Aantal gevangen schapen:" + schapenScoreCounter);
			Speed.text = ("Level:" + level);
			Levens.text = ("Levens:" + leven); 
			
			if ( ESC )
			{
				stage.removeAllChildren();
				startTickerGame = false;
				stage.update();
					gameOver();
				//stopGame();
				//window.top.location.reload(); 
			}
				
			if ( leven <= 0 )
			{
				stage.removeAllChildren();
				startTickerGame = false;
				stage.update();
					gameOver();
				//stopGame();	
				//window.top.location.reload(); 
			}		
		 
	}
	
	// deze moet hier onder staan! anders krijg je bij een pagina niet meteen alles te zien!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// dit IS DE OORZAAK VAN BLANKO PAGES
	stage.update();
	
	// ------------------------------------ Extra schapen ----------------------------------------- //
	
											
											
											if ( level >= 2) {
												
												if( level > schapenArray.length )
															{
																createSchapen();
															}
											}
											
											
											
	// ------------------------------------ Einde extra schapen ----------------------------------- //
				
	
	
} // end startgame();	
