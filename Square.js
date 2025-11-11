import * as Ear from './Sound.js'
import {Notes} from './Notes.js'
  // Main HTML Elements
  const board = document.getElementById('board');
  const pgnView = document.getElementById('pgnView')
  export const pgnInput = document.getElementById('pgnFileInput')


  // Sound Control Buttons
  const map = document.getElementById('map')
  const mapTransposition = document.getElementById('map-Transposition')
  const soundBank = document.getElementById('soundBank')
  const soundBank_Length = document.getElementById('soundBank-Duration')
  const soundBank_Velocity = document.getElementById('soundBank-Velocity')

  // Board Control Buttons
  const toggleGuides = document.getElementById('toggleGuides')
  const selectGuides = document.getElementById('selectGuides')
  const rotateboard = document.getElementById('rotateboard')
  
  // Music Buttons
  const start = document.getElementById('startButton')

  // Settings
  const settings = document.getElementById('settings-btn')
  const settingsEdit = document.getElementById('settings-edit')
  const settingsGIF = document.getElementById('settings-gif')
  const settingsTimeControl = document.getElementById('settings-timeControl')
  const settingsResetColor = document.getElementById('settings-resetColor')
  const settingsEditColors = Array.prototype.filter.call(document.getElementById("editColors").children, (x) => x.tagName === 'LABEL')
  
  // Save Changes Checkboxes
  const saveBoard = document.getElementById("save-board")
  const saveTimeControl = document.getElementById("save-timeControl")

  // Time Control
  const timecontrol = document.getElementById('timeControl')
  const timecontrol1 = document.getElementById('timeControl-duration1')
  const timecontrol2 = document.getElementById('timeControl-duration2')
  const timecontrol3 = document.getElementById('timeControl-timelapse1')
  const timecontrol4 = document.getElementById('timeControl-timelapse2')
  
  const tcDuration_output_ms = document.getElementById('timeControl-duration-output-ms')
  const tcDuration_output_sec = document.getElementById('timeControl-duration-output-sec')
  const tcTL_output_ms = document.getElementById('timeControl-timelapse-output-ms')
  const tcTL_output_sec = document.getElementById('timeControl-timelapse-output-sec')

  const durationCarousel_btn = Array.prototype.filter.call(document.getElementById("timeControl-durationHolder").children, (x) => x.tagName === 'BUTTON')
  const lapseCarousel_btn = Array.prototype.filter.call(document.getElementById("timeControl-timelapseHolder").children, (x) => x.tagName === 'BUTTON')

// Colors

  const selectColors_btn = Array.prototype.filter.call(document.getElementById("selectColors").children, (x) => x.tagName === 'LABEL')
  const colorSlideIndicators = document.getElementById("Colors-Slide-indicators").children
  const colorsAll = document.getElementById('colors-All')
  const colorsWhite = document.getElementById('colors-White')
  const colorsBlack = document.getElementById('colors-Black')

  
  colorsAll.inputs = ['Color-All-1','Color-All-2', 'Color-All-3'].map((x) => document.getElementById(x))
  colorsWhite.inputs = ['Color-White-1','Color-White-2'].map((x) => document.getElementById(x))
  colorsBlack.inputs = ['Color-Black-1','Color-Black-2'].map((x) => document.getElementById(x))

  console.log(colorsAll.inputs, colorsBlack.inputs, colorsWhite.inputs)
  // Color Input Values
  const colorDefault = () => {return colorsAll.inputs.map((x) => hexToRgb(x.value))}
  const colorWhite = () => {return colorsWhite.inputs.map((x) => hexToRgb(x.value))}
  const colorBlack = () => {return colorsBlack.inputs.map((x) => hexToRgb(x.value))}
  

// Default Values

  toggleGuides.value = 1;
  selectGuides.value = 1;
  rotateboard.value = 0;
  settings.value = 0;
  
  tcDuration_output_ms.textContent = timecontrol1.value;
  tcTL_output_ms.textContent = timecontrol1.value;

  let currentDuration = tcDuration_output_ms.textContent ;
  let currentTimeLapse = tcTL_output_ms.textContent ;

  tcDuration_output_sec.textContent = Math.floor(Number(timecontrol1.value) / 1000);
  tcTL_output_sec.textContent = Math.floor(Number(timecontrol1.value) / 1000);

    // Board Modes
    board.edit = false;

  const PGN = () => FormatPGN(pgnView.innerText.toString())
  const squares = [] 
  const soundmap = () => {return Ear.Mappings?.[map.selectedOptions[0].label]?.[mapTransposition.value.toString()].map((x) => Notes?.[soundBank.selectedOptions[0].label]?.[soundBank_Length.selectedOptions[0].label][x])}
  const Music = {movements : [], sounds : [], durations : [], timelapses: []}
  const audioPool = new Set()

// Tools
function toggle(value, a, b){
  return value === a? b : a
}

toggle.property = function(property, value, a, b){value[property] = toggle(value[property], a , b)};

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${[parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(', ')})`: '';
}

function ColorIncrement(color, endColor){
   const array_1 = color.replace('rgb(', '').replace(')', '').split(',').map((x) => Number(x))
   const array_2 = endColor.replace('rgb(', '').replace(')', '').split(',').map((x) => Number(x))

   const difference = array_1.map((x, i) => array_2[i] - x) 
  
   return `rgb(${array_1.map((x, i) =>  Number(x) + (Number(difference[i]) / 3 )).join(',')})`
}

function FormatPGN(text){
const a = text.substring(text.indexOf('1.')).split(/\d+\.\s*/)
const b = a.filter(Boolean).map(x => x.trim().split(' '))
const c = b.map((x) => x.map((y, i) => 
    y.toUpperCase().includes('O') ? 
    (y === 'O-O' ? (i === 0 ? ['G1', 'F1']: ['G8', 'F8']) : (i === 0 ? ['C8', 'D8']: ['C1', 'D1'])) :  
    Ear.squares_id.find((z) => y.toUpperCase().includes(z)))
)

let d = {};
console.log(b, c)
  for(let i = 1; i < a.length ; i++){

    const line_array = b[i - 1]

    Object.defineProperty(d, i.toString(), {
      value: {
                  [line_array[0]] : {
                    
                    player: 'White',
                    piece : PieceNotation(line_array[0]),
                    square : Array.isArray(c[i - 1][0]) ? c[i - 1][0].map((x) => squares.find((y) => y.id === x)) : squares.find((y) => y.id === c[i - 1][0]), 
                    
                  },
                  [line_array[1]] : {

                    player: 'Black',
                    piece : PieceNotation(line_array[1]),
                    square : Array.isArray(c[i - 1][1]) ? c[i - 1][1].map((x) => squares.find((y) => y.id === x)) : squares.find((y) => y.id === c[i - 1][1]), 

                  },  
            },

      enumerable : true,
      configurable : true,
      writable : true,

    })
    
  }

return d

}

function PieceNotation(move){
  const output = ['Pawn', 'Knight', 'Bishop', 'Rook', 'Queen', 'King', ['King', 'Rook'], ['King', 'Rook']]
  const search = ['', 'N', 'B', 'R', 'Q', 'K', 'O-O', 'O-O-O']
   return output.reverse()[search.reverse().findIndex((x) => move.includes(x))]
}

const Chess_Unicode = {
    Pawn: {
        White: [String.fromCodePoint(0x2659), 'white'], 
        Black: [String.fromCodePoint(0x265F), 'black'],
    },
    Knight: {
        White: [String.fromCodePoint(0x2658), 'white'], 
        Black: [String.fromCodePoint(0x265E), 'black'], 
    },
    Bishop: {
        White: [String.fromCodePoint(0x2657), 'white'],
        Black: [String.fromCodePoint(0x265D), 'black'], 
    },
    Rook: {
        White: [String.fromCodePoint(0x2656), 'white'],
        Black: [String.fromCodePoint(0x265C), 'black'], 
    },
    Queen: {
        White: [String.fromCodePoint(0x2655), 'white'], 
        Black: [String.fromCodePoint(0x265B), 'black'], 
    },
    King: {
        White: [String.fromCodePoint(0x2654), 'white'],
        Black: [String.fromCodePoint(0x265A), 'black'],
    }
};


Chess_Unicode.initial = [

    Chess_Unicode.Rook.Black,
    Chess_Unicode.Knight.Black,
    Chess_Unicode.Bishop.Black,
    Chess_Unicode.Queen.Black,
    Chess_Unicode.King.Black,
    Chess_Unicode.Bishop.Black,
    Chess_Unicode.Knight.Black,
    Chess_Unicode.Rook.Black,

    Chess_Unicode.Pawn.Black,
    Chess_Unicode.Pawn.Black,
    Chess_Unicode.Pawn.Black,
    Chess_Unicode.Pawn.Black,
    Chess_Unicode.Pawn.Black,
    Chess_Unicode.Pawn.Black,
    Chess_Unicode.Pawn.Black,
    Chess_Unicode.Pawn.Black,

    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',

    Chess_Unicode.Pawn.White,
    Chess_Unicode.Pawn.White,
    Chess_Unicode.Pawn.White,
    Chess_Unicode.Pawn.White,
    Chess_Unicode.Pawn.White,
    Chess_Unicode.Pawn.White,
    Chess_Unicode.Pawn.White,
    Chess_Unicode.Pawn.White,

    Chess_Unicode.Rook.White,
    Chess_Unicode.Knight.White,
    Chess_Unicode.Bishop.White,
    Chess_Unicode.Queen.White,
    Chess_Unicode.King.White,
    Chess_Unicode.Bishop.White,
    Chess_Unicode.Knight.White,
    Chess_Unicode.Rook.White
];

    // Pause any other sounds that are currently playing and remember them
async function playSound(sound, duration, timelapse = 0, pool = new Set()){

  if (sound.readyState < 2) {
        await new Promise(resolve => {
            sound.addEventListener('canplaythrough', resolve, { once: true });
            sound.load();
            duration = duration === undefined ? sound.duration : duration ;
        });
    }
      
  const previouslyPlaying = [...pool.values()]
  console.log(previouslyPlaying, previouslyPlaying.length,!previouslyPlaying.slice(-2)[0].paused)
    if (timelapse > 0 && previouslyPlaying.length !== 0 && !previouslyPlaying.slice(-2)[0].paused) {
          
          console.log('waiting...')
          await sleep(timelapse)
    } 

      pool.forEach(async other => {
        if (!other.paused) {
            other.pause();
            previouslyPlaying.push(other);
            
            
        }
    });  

    sound.currentTime = 0;
    sound.play()

    await Promise.race(
      [
        new Promise(res => sound.addEventListener('ended', res, { once: true })),
        sleep(duration)
      ]
    );

    sound.pause();
    sound.currentTime = 0;

    Music.push({'audio' : sound, 'duration' : duration, 'timelapse' : timelapse})
       
    }

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
 
// Squares

for (let i = 0; i < 64; i++) {
  // Design
    const square = document.createElement('div');
    const textbox = document.createElement('span');
    square.textbox = textbox
    square.className = 'square'; square.style.backgroundColor = colorDefault()[2];
    square.id = Ear.squares_id[i]
    square.textbox.innerText = square.id;
    
  //  Refernced Properties
    
    square.renderSound = () => {square.sound = new Audio(soundmap()[i])};
    square.renderSound(); square.sound.preload = 'metadata';
    // replace '#' with data from element controlling sharp or flat
    square.renderSoundName = () => {square.sound.name = Ear.ORDER['#'][soundmap()[i]]};
    
    square.soundfile = () => soundmap()[i]; 
    

    square.editable = () => {
      square.sound.pause()
      square.sound.currentTime = 0
      square.style.backgroundColor =  defaultcolor();
      square.setAttribute('contenteditable', 'true')
    }

    square.addEventListener('click', async () => {
      
      square.style.backgroundColor = [colorDefault()[2]].includes(square.style.backgroundColor ) ? colorDefault()[0] : ColorIncrement(square.style.backgroundColor, colorDefault()[1])
      
      audioPool.add(square.sound)
          await playSound(square.sound, Number(tcDuration_output_ms.textContent), square.timelapse, audioPool)
      
    })
    
    board.appendChild(square);
    square.appendChild(textbox)
    squares.push(square)
  }


// Handle Live Dropdown Changes 
map.addEventListener('change', () => {
    soundmap()
    squares.map((x) => {x.renderSound(), x.soundname()})
    switchGuide()
  }
)

function switchGuide(){
    if(toggleGuides.value === 1){
      squares.map((x, i) => {
        if(selectGuides.value == 3){chessmode()}
        else{x.textbox.innerText = ['', x.id, x.soundname()][selectGuides.value]}
        }
      )
    }
}

function chessmode(){
  squares.map((square) => {
      square.piece = Array(Chess_Unicode.initial[i]).flat(2)[0]; 
      square.piececolor = Chess_Unicode.initial[i][1];
    }
  )
}


// Bored Controls

soundBank.addEventListener('change', () => {
    soundmap()
    squares.map((x) => {x.renderSound(), x.soundname()})
  }
)

toggleGuides.addEventListener('click', () => {
  toggleGuides.value = toggleGuides.value === 0 ? 1 : 0;
  toggleGuides.className = (['switch off', 'switch on'][toggleGuides.value]);
  [squares.map((x) => {x.textbox.innerText = ''}), switchGuide()][toggleGuides.value]
      
  }
)

Array.prototype.filter.call(selectGuides.children, (x) => x.tagName === 'LABEL').map((x) => 
  
  x.addEventListener('click', (e) => {

  selectGuides.value = x.htmlFor.slice(x.id.length -1)
  switchGuide()
}))

rotateboard.addEventListener('click', () => {
  rotateboard.value = rotateboard.value === 0 ? 1 : 0;
  
   board.style.transform = (['rotate(0deg)', 'rotate(180deg)'][rotateboard.value])
   squares.map((x) => {x.textbox.style.transform = (['rotate(0deg)', 'rotate(-180deg)'][rotateboard.value])})
  }
  
)

selectColors_btn.map((x, i) => x.addEventListener('click', () => {
}))

// PGN
      
pgnInput.addEventListener('change', async function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function(e) {
      const pgnText = e.target.result;
      pgnView.innerText = pgnText
        PGN()
      };

  reader.readAsText(file);
  }
)


// Settings 

settings.addEventListener('click',  () => { 
  toggle.property('className', settings, 'fa fa-gear fa-spin', 'fa fa-gear');
  toggle.property('className', settings.parentElement.lastElementChild, 'settings-content invisible', 'settings-content visible');

 })

settingsEdit.addEventListener('click',  () => { 
 board.editMode()
})

settingsGIF.addEventListener('click', () => {
  navigator.clipboard.writeText(pgnView.innerText);
  alert("Copied Current PGN " + pgnView.innerText);
})

settingsEditColors.map((x, i) => x.addEventListener('click', () => {

    colorSlideIndicators[i].click()
}))

settingsResetColor.addEventListener('click', () => {
  squares.map((x) => 
    { 
      x.style.backgroundColor = 'black';
  })
})


// FIXXXX
settingsTimeControl.addEventListener('click', () => {
  timecontrol.style.display = toggle(timecontrol.style.display, "flex", '')
  settingsTimeControl.innerText = toggle(settingsTimeControl.innerText, 'x Advanced Time Controls', 'Advanced Time Controls')
  saveTimeControl.style.display = 'block'
})



// Window Handler // Off Screen Click

window.addEventListener('click', function(event) {
  // no off screen click
  if (!event.target.parentElement === settings.parentElement) {
    console.log(event.target.parentElement)
    toggle.property('className', settings.parentElement.lastElementChild, 'settings-content invisible', 'settings-content visible')
    toggle.property('className', settings, 'fa fa-gear fa-spin', 'fa fa-gear')
    
  }
}
)


// TimeControl 
const slidebtn = [durationCarousel_btn, lapseCarousel_btn];
slidebtn.map((x) => {
  
  x[1].addEventListener('click', () => {
      toggle.property('className', x[1], "carousel-control-next visible", "carousel-control-next invisible" );
      x[0].className = "carousel-control-prev visible";

      
  })
  x[0].addEventListener('click', () => {
      toggle.property('className', x[1], "carousel-control-prev visible", "carousel-control-prev invisible" );
      x[1].className = "carousel-control-next visible";
      
  })
  
})

  timecontrol1.addEventListener('input', function() {
    tcDuration_output_ms.textContent = this.value;
    tcDuration_output_sec.textContent = Math.floor(Number(this.value) / 1000);
  });

  timecontrol2.addEventListener('input', function() {
    tcDuration_output_ms.textContent = `[${this.value}]`;
    tcDuration_output_sec.textContent = `[${this.value.toString().split(',').map((x) => Math.floor(Number(x) / 1000))}]`;
  });

  timecontrol3.addEventListener('input', function() {
    tcTL_output_ms.textContent = this.value;
    tcTL_output_sec.textContent = Math.floor(Number(this.value) / 1000)
  });

  timecontrol4.addEventListener('input', function() {
    tcTL_output_ms.textContent = `[${this.value}]`;
  });



// Save Changes Checkboxes
saveTimeControl.lastElementChild.addEventListener('click', () => {
  if(saveTimeControl.lastElementChild.checked){
    saveTimeControl.style.display = 'none';
    settingsTimeControl.click()
    
    saveTimeControl.lastElementChild.checked = false
  }
})

saveBoard.lastElementChild.addEventListener('click', () => {
  if(saveBoard.lastElementChild.checked){
    saveBoard.style.display = 'none'
    
    settingsEdit.click()
    map.lastElementChild.selected = true
  }
}
)


// Start and Record

start.addEventListener('click', async () => {
  const data = PGN()
  const movements = Object.values(data).map((x) => Object.values(x).map((y) => y.square)).filter((x) => x !== undefined)

  await StartMusic(movements)
  }
)

async function StartMusic(movements, durations, timelapses){
  
durations = durations !== undefined ? Array.isArray(durations) ? durations :  `${durations},`.repeat(movements.length).split(',') : '3,'.repeat(movements.length).split(',') ;
timelapses = timelapses !== undefined ? Array.isArray(timelapses) ? timelapses : `${timelapses}`.repeat(movements.length).split(',') :'2000,'.repeat(movements.length).split(',');
timelapses = Array(timelapses).flat(2).map((x) => Number(x))
  
squares.map((x) => x.piece = '')
if(selectGuides.value == 3){
    
    switchGuide()
}

console.log(data)
  for (let idx = 1; idx < Object.keys(data).length; idx++){

    const turn = data[idx]

        for (let i = 0; i < Object.keys(data[idx]).length; i++) {

            const square = movements[idx - 1][i];
            console.log(turn, square)

            if(Array.isArray(square)){

              square.timelapse = timelapses[i]
              square.click
            }
            else{

              await sleep(timelapses[i])
              square.click()

            }
            
             
            if(selectGuides.value == 3){
              Array(square).flat(2).map((x) => {
              let piece = Chess_Unicode[Object.values(turn)[i].piece][Object.values(turn)[i].player][0]
              x.piece = piece[0]
              x.piececolor = piece[1]

              x.textbox.innerText = x.piece
              x.textbox.style.color = x.piececolor
              })
            }
        }
    }
} 

async function startCapture() {

  const displayMediaOptions = {

    video: {
      
      displaySurface: "window",

    },

    preferCurrentTab: true,

  };

  try {

    const stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

    const [vTrack] = stream.getVideoTracks();

    const [aTrack] = stream.getAudioTracks();

    const restrictionTarget = await RestrictionTarget.fromElement(board);

    await vTrack.restrictTo(restrictionTarget);

    await aTrack.restrictTo(restrictionTarget);

    videoElem.srcObject = stream;

  } catch (err) {
    console.error(err);
  }
}


// Board Modes

board.editMode = function(){
   if (board.edit === false) {

      board.edit = true
      
      settingsEdit.innerText = 'x Editor';

      selectGuides.click()
      toggle.property('className', saveBoard, 'saveChanges visibile', + 'saveChanges invisible')

      // Board Apperance 
      squares,map((x) => x.editable())
      


      // ADD Dropdown 
      const UserMap = document.createElement('option');
      const defaultname = `User_${map.options.length - 3}`;
      UserMap.innerText = defaultname;
      UserMap.setAttribute('contenteditable', 'true');

      // Copy Value From SelectedOptions
      Ear.Mappings[defaultname] = Ear.Mappings?.[map.selectedOptions[0].label]
      map.appendChild(UserMap)
      

      window.addEventListener('keydown', (event) => {if(event.key === 'Enter'){
        event.preventDefault()

        const index = squares.findIndex((square) => document.activeElement === square) + 1
        squares.at((index > 63 ? 0 : index)).focus()

        // Save on Save changes as well 
        const enharmonic = squares[index - 1].innerText.toString().match(/[#b]/) === null ? '#' : squares[index - 1].innerText.toString().match(/[#b]/) 
        const newindex = Ear.ORDER[enharmonic].findIndex((x) => x === squares[index - 1].innerText)
        // case senstive not

        console.log(newmap)

        Ear.Mappings[UserMap.innerText].splice(index - 1, 0, newindex)
        
        
      }})

    } else {

    if(!saveBoard.lastElementChild.checked){

      map.remove(map.length - 1)

    }
    
      board.editmode = false;
      settingsEdit.innerText = 'Edit';
      selectGuides.click();
      saveBoard.style.display = 'none';
      
      squares.map((x) => {
        x.setAttribute('contenteditable', 'false')
        x.style.backgroundColor = colorDefault()[2];
      })

      window.onkeydown = ''

    }
  }
