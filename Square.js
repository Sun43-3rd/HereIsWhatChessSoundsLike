import * as Ear from './Sound.js'
import {Notes} from './Notes.js'
 import * as EL from './Elements.js'
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

  

// Tools


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
