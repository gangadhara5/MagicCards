var filenames = ["king_of_clubs.png","queen_of_clubs.png","2_of_clubs.png","8_of_spades.png","6_of_spades.png","7_of_diamonds.png","king_of_diamonds.png","queen_of_spades.png","5_of_clubs.png","5_of_spades.png","ace_of_hearts.png","10_of_clubs.png","queen_of_hearts.png","3_of_hearts.png","2_of_diamonds.png","7_of_hearts.png","8_of_clubs.png","5_of_diamonds.png","10_of_diamonds.png","3_of_clubs.png","5_of_hearts.png","3_of_spades.png","9_of_diamonds.png","9_of_spades.png","9_of_hearts.png","8_of_hearts.png","4_of_spades.png","10_of_hearts.png","3_of_diamonds.png","4_of_diamonds.png","2_of_spades.png","6_of_clubs.png","6_of_hearts.png","8_of_diamonds.png","ace_of_spades.png","king_of_hearts.png","9_of_clubs.png","4_of_hearts.png","ace_of_clubs.png","4_of_clubs.png","jack_of_diamonds.png","7_of_spades.png","jack_of_spades.png","queen_of_diamonds.png","2_of_hearts.png","jack_of_clubs.png","6_of_diamonds.png","ace_of_diamonds.png","7_of_clubs.png","jack_of_hearts.png","10_of_spades.png","king_of_spades.png"];

var forward;
var backword ;
var default_src = "images/flip.jpg";
var map;
var mapIndex;
var mapIndexNumbers;
var mapSrcs;
var mapTypes;
var firstIndex;
var lastIndex;
var nextpointer;
var previouspointer;
var count;
var magic;
var selected;

function initialise() {
  forward = filenames;
  backword = [];

   map = new Object();
   mapIndex = new Object();
   mapIndexNumbers = new Object();
   mapSrcs = new Object();
   mapTypes = new Object();
   selected = new Object();
   firstIndex;
   lastIndex;
   nextpointer = 0;
   previouspointer = 0;
   count = 0;
}

document.addEventListener("DOMContentLoaded", function() {
    initialise();
    var hide = document.getElementById('hide');
    var previous = document.getElementById('previous');
    var next = document.getElementById('next');
    magic = document.getElementById('imgcen');
    var reveal = document.getElementById('reveal');
    var reset = document.getElementById('reset');
    console.log('loaded');
    magic.addEventListener("click", function(){
      //console.log('click');
        if(count ==5) {
          alert('already selected 5 cards');
          return;
        }
        console.log(selected);
        if(selected[magic.src] != null) {
          alert('already selected');
          return;
        }
        selected[magic.src] = 'true';
        count++;
        document.getElementById('' + count).src = magic.src;
        nextOn();
    });

    reveal.addEventListener("click", function() {
        document.getElementById('5').src = mapSrcs[lastIndex];
    });

    reset.addEventListener("click", function(){
        initialise();
        for(var i=1;i<=5;i++){
          document.getElementById('' + i).src = default_src;
        }
        document.getElementById('').src = 'images/king_of_spades.png';
    });

    next.addEventListener("click", function(){

    //  console.log('click');
      nextOn();
    });

    previous.addEventListener("click", function(){
        if(previouspointer == 0)
          return;
        previouspointer--;
        magic.src = 'images/' + backword[previouspointer];
        backword.splice(previouspointer,1);
        forward.splice(0,0, backword[previouspointer]);

    });

    hide.addEventListener("click", function(){

      var repType;
      var repNum;
      var found = false;
      var diff;

      //var isFirstFlip;
      for(var i=1;i<=5;i++){
        var source = document.getElementById('' + i).src;
        var sourceMatch = source.match('images(.*)');
        mapSrcs[i] =  'images' + sourceMatch[1];
        //console.log(mapIndex[i]);
        var details = source.match('images/(.*?)_of_(.*?).png');
        var number;
        var type;
        if(details[1] == 'jack')
          number = 11;
        else if(details[1] == 'queen')
          number = 12;
        else if(details[1] == 'king')
          number = 13;
        else if(details[1] == 'ace')
          number = 1;
        else
          number = Number(details[1]);

        if(details[2] == 'clubs')
          type = 1;
        else if(details[2] == 'diamonds')
          type = 2;
        else if(details[2] == 'hearts')
          type = 3;
        else {
          type = 4;
        }
        console.log(type);
        mapTypes[i] = type;
        //console.log(details[1]);
        //console.log(number);
        var type = details[2];
        if(map[type] == null) {
          map[type] = number;
          mapIndex[type] = i;
          mapIndexNumbers[i] = number;
          //mapTypes[i] = type;
        } else if(!found){
          found = true;
          //mapIndex[type] = i;
            if(number > map[type]) {    //9, 2 : 8,9
              if(number <= (map[type] + 6)){    // 8, 9
                diff = number - map[type];
              //  isFirstFlip = false;
                firstIndex = mapIndex[type];
                lastIndex = i;
              } else{         //2, 9
                //isFirstFlip = true;
                diff =  map[type] - number + 15;
                firstIndex = i;
                lastIndex = mapIndex[type];
              }
          } else {
              if(map[type] <= (number + 6)){    // 9, 8
                diff =   map[type] - number;
              //  isFirstFlip = false;
                firstIndex = i;
                lastIndex = mapIndex[type];
              } else{         //9, 2
                //isFirstFlip = true;
                diff = number - map[type]  + 15;
                firstIndex = mapIndex[type];
                lastIndex = i;
              }
          }
          found = true;
        } else {
         mapIndex[type] = i;
          mapIndexNumbers[i] = number;
        }
      }
      //console.log(firstIndex);
      document.getElementById('1').src = document.getElementById('' + firstIndex).src;
      document.getElementById('5').src = "images/flip.jpg";
      console.log(firstIndex + ' ' + lastIndex);
      var S =0; var M=0; var L=0;
      var SI = 1; var MI = 1; var LI = 1;
      for(var i=1; i<=5; i++) {
        if(i != firstIndex && i != lastIndex) {
          console.log(i + ' ' +mapIndexNumbers[i]);
          if( mapIndexNumbers[i] > L || (mapIndexNumbers[i] == L && mapTypes[i] > mapTypes[LI]))
          {
            S = M;
            M = L;
            L = mapIndexNumbers[i];
            SI = MI;
            MI = LI;
            LI = i;
          }
          else if( mapIndexNumbers[i] > M || (mapIndexNumbers[i] == M && mapTypes[i] > mapTypes[MI])){
            console.log(mapIndexNumbers[i] + ' ' + M + ' ' + mapTypes[i] + ' ' + mapTypes[MI] + ' ' + i + ' ' + MI)
            SI = MI;
            S = M;
            M = mapIndexNumbers[i];
            MI = i;
          } else{
            S = mapIndexNumbers[i];
            SI = i;
          }
        }
      }
      console.log(SI + '  ' + MI + ' ' + LI);
      console.log(diff);
      switch (diff) {
        case 1:
          document.getElementById('2').src =mapSrcs[SI];
          document.getElementById('3').src = mapSrcs[MI];
          document.getElementById('4').src = mapSrcs[LI];
          break;
       case 2:
            document.getElementById('2').src =mapSrcs[SI];
            document.getElementById('3').src = mapSrcs[LI];
            document.getElementById('4').src = mapSrcs[MI];
            break;
      case 3:
        document.getElementById('2').src =mapSrcs[MI];
        document.getElementById('3').src = mapSrcs[SI];
        document.getElementById('4').src = mapSrcs[LI];
        break;
      case 4:
                document.getElementById('2').src =mapSrcs[MI];
                document.getElementById('3').src = mapSrcs[LI];
                document.getElementById('4').src = mapSrcs[SI];
                break;
      case 5:
            console.log('switch' + mapSrcs[LI]);
                  document.getElementById('2').src =mapSrcs[LI];
                  document.getElementById('3').src = mapSrcs[SI];
                  document.getElementById('4').src = mapSrcs[MI];
                  console.log('done' + document.getElementById('2').src);
                  break;
      case 6:
                    document.getElementById('2').src =mapSrcs[LI];
                    document.getElementById('3').src = mapSrcs[MI];
                    document.getElementById('4').src = mapSrcs[SI];
                    break;
        default:
          break;

      }

    });
});

function nextOn() {
  if(nextpointer == 52 )
    return ;
  backword[previouspointer] = forward[0];
  previouspointer++;
  nextpointer++;
  forward.splice(0,1);
//  console.log('images/' + forward[0]);
  magic.src = 'images/' + forward[0];
}
