import * as Ear from './Sound.js'

  const bored = document.getElementById('soundGrid');
  const pgnView = document.getElementById('pgnView')
  export const pgnInput = document.getElementById('pgnFileInput')
  const toggleGuides = document.getElementById('toggleGuides')
  const switchGuides = document.getElementById('switchGuides')
  const rotateBored = document.getElementById('rotateBored')
  const map = document.getElementById('map')
  const soundBank = document.getElementById('soundBank')
  const soundlength = document.getElementById('soundBank-duration')
  const start = document.getElementById('startButton')
  
  const settings = document.getElementById('btn-settings')
  const settingsEdit = document.getElementById('settings-edit')
  const settingsGIF = document.getElementById('settings-gif')
  const settingsResetColor = document.getElementById('settings-resetColor')

  const defaultcolor = () => {return hexToRgb(document.getElementById('settings-color').value)}
  const defaultcolor2 = () => {return hexToRgb(document.getElementById('settings-color2').value)}
  const settingsEdit_control = document.getElementById("edit-soundGrid")
  

  toggleGuides.value = 1;
  switchGuides.value = 1;
  rotateBored.value = 0;
  settings.value = 0;
  bored.editmode = false 

  const PGN = () => FormatPGN(pgnView.innerText)
  const squares = [] 
  const soundmap = () => {return Ear.mappings?.[map.selectedOptions[0].label].map((x) => Ear.notes?.[soundBank.selectedOptions[0].label]?.[soundlength.selectedOptions[0].label][x])}

function toggle(value, a, b){
  return value === a? b : a
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${[parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(',')})`: '';
}

function ColorIncrement(color, endColor){
   const array_1 = color.replace('rgb(', '').replace(')', '').split(',').map((x) => Number(x))
   const array_2 = endColor.replace('rgb(', '').replace(')', '').split(',').map((x) => Number(x))

   const difference = array_1.map((x, i) => array_2[i] - x) 
  
   return `rgb(${array_1.map((x, i) =>  Number(x) + (Number(difference[i]) / 3 )).join(',')})`
  }

async function playSound(sound, duration){
  sound.load()

  sound.addEventListener('loadedmetadata', async () => {
    duration = duration === undefined ? sound.duration : duration ;
      return new Promise(resolve => {
    
        sound.pause();
        sound.currentTime = 0;

        const end = () => {
          sound.removeEventListener('ended', end);
          resolve();
        };

        sound.addEventListener('ended', end)

        sound.play()
        
        setTimeout(() => {
            
          sound.pause();
          sound.currentTime = 0;
        }, 
        duration * 1000);

      })
    }
  )
}

function FormatPGN(text){
const a = text.substring(text.indexOf('1.')).split(/\d+\.\s*/)
const b = a.filter(Boolean).map(x => x.trim().split(' '))
const c = b.map((x, i) => x.map((y) => 
    y.toUpperCase().includes('O') ? 
    (y === 'O-O' ? (i === 0 ? ['G1', 'F1']: ['G8', 'F8']) : (i === 0 ? ['C8', 'D8']: ['C1', 'D1'])) :  
    Ear.squares_id.find((z) => y.toUpperCase().includes(z)))
)

let d = {};

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
                  'White' : {  
                      'Pawn' : String.fromCodePoint('9817'),
                      'Knight' : String.fromCodePoint('9816'),
                      'Bishop' : String.fromCodePoint('9815'),
                      'Rook' : String.fromCodePoint('9814'),
                      'Queen' : String.fromCodePoint('9813'),
                      'King' : String.fromCodePoint('9812')
                  },
                  'Black' : {  
                      'Pawn' : String.fromCodePoint('9823'),
                      'Knight' : String.fromCodePoint('9822'),
                      'Bishop' : String.fromCodePoint('9821'),
                      'Rook' : String.fromCodePoint('9820'),
                      'Queen' : String.fromCodePoint('9819'),
                      'King' : String.fromCodePoint('9818')
                  }
                
                }
 
Chess_Unicode.initial = [
  Chess_Unicode.Black.Rook,   Chess_Unicode.Black.Knight, Chess_Unicode.Black.Bishop,
  Chess_Unicode.Black.Queen,  Chess_Unicode.Black.King,  Chess_Unicode.Black.Bishop,
  Chess_Unicode.Black.Knight, Chess_Unicode.Black.Rook,
  Chess_Unicode.Black.Pawn, Chess_Unicode.Black.Pawn, Chess_Unicode.Black.Pawn,
  Chess_Unicode.Black.Pawn, Chess_Unicode.Black.Pawn, Chess_Unicode.Black.Pawn,
  Chess_Unicode.Black.Pawn, Chess_Unicode.Black.Pawn,
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '',
  Chess_Unicode.White.Pawn, Chess_Unicode.White.Pawn, Chess_Unicode.White.Pawn,
  Chess_Unicode.White.Pawn, Chess_Unicode.White.Pawn, Chess_Unicode.White.Pawn,
  Chess_Unicode.White.Pawn, Chess_Unicode.White.Pawn,
  Chess_Unicode.White.Rook,   Chess_Unicode.White.Knight, Chess_Unicode.White.Bishop,
  Chess_Unicode.White.Queen,  Chess_Unicode.White.King,  Chess_Unicode.White.Bishop,
  Chess_Unicode.White.Knight, Chess_Unicode.White.Rook
];



async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function StartMusic(movements, durations, timelapses){
  

}

  

 
for (let i = 0; i < 64; i++) {
    const square = document.createElement('div');
    const text = document.createElement('span');
    square.textbox = text
    square.className = 'square';
    square.id = Ear.squares_id[i]
    square.textbox.innerText = square.id
    square.piece = Chess_Unicode.initial[i]; 
    square.soundname = () => `${soundmap()[i].replace(`PianoSBC/${soundBank.selectedOptions[0].label}${(soundlength.selectedOptions[0].label === 'Medium' ? '' : '_')}${(soundlength.selectedOptions[0].label === 'Medium' ? '' : soundlength.selectedOptions[0].label)} - `, '').replace('.wav', '').replace('sharp', '#')}`;
    square.getSound = () => {square.sound = new Audio(soundmap()[i])};

    square.getSound()

    square.sound.preload = 'metadata';

    square.soundfile = () => soundmap()[i]; 
    
    square.addEventListener('click', async () => {
      
      square.style.backgroundColor = (square.style.backgroundColor === 'black' || square.style.backgroundColor === '') ? defaultcolor() : ColorIncrement(square.style.backgroundColor, defaultcolor2())
      
      playSound(square.sound)

    })
    
    bored.appendChild(square);
    square.appendChild(text)
    squares.push(square)
  }

Array.prototype.filter.call(switchGuides.children, (x) => x.id !== '').map((x) => 
  x.addEventListener('click', () => {
  
  switchGuides.value = x.id.slice(x.id.length -1)
  switchGuide()
}))

function switchGuide(){
    if(toggleGuides.value === 1){
      squares.map((x) => {
        if(switchGuides.value == 3){x.textbox.style.fontSize = '32px'} else{x.textbox.style.fontSize = '16px'}
        
        x.textbox.innerText = ['', x.id, x.soundname(), x.piece][switchGuides.value]
        }
      )
    }
}

map.addEventListener('change', () => {
    soundmap()
    squares.map((x) => {x.getSound(), x.soundname()})
    switchGuide()
  }
)

toggleGuides.addEventListener('click', () => {
  toggleGuides.value = toggleGuides.value === 0 ? 1 : 0;
  toggleGuides.className = (['switch off', 'switch on'][toggleGuides.value]);
  [squares.map((x) => {x.textbox.innerText = ''}), switchGuide()][toggleGuides.value]
      
  }
)

rotateBored.addEventListener('click', () => {
  rotateBored.value = rotateBored.value === 0 ? 1 : 0;
  
   bored.style.transform = (['rotate(0deg)', 'rotate(180deg)'][rotateBored.value])
   squares.map((x) => {x.textbox.style.transform = (['rotate(0deg)', 'rotate(-180deg)'][rotateBored.value])})
  }
  
)
      
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

settings.addEventListener('click',  () => { 
  settings.className = toggle(settings.className, 'fa fa-gear fa-spin', 'fa fa-gear');
  settings.parentElement.lastElementChild.classList.toggle("show");
})

settingsEdit.addEventListener('click',  () => { 
  if (bored.editmode === false) {

      bored.editmode = true
      
      settingsEdit.innerText = 'Close Editor'
      switchGuides.click()
      settingsEdit_control.style.display = 'block';
      squares.map((x) => {
        x.sound.pause()
        x.style.backgroundColor =  defaultcolor();
        x.setAttribute('contenteditable', 'true')
        
  
      })

  

      const UserMap = document.createElement('option')
      UserMap.innerText = `User_${map.options.length - 3}`

      Ear.mappings[UserMap.innerText] = Ear.mappings?.[map.selectedOptions[0].label]
      map.appendChild(UserMap)
    

    window.addEventListener('keydown', (event) => {if(event.key === 'Enter'){
      event.preventDefault()
      const index = squares.findIndex((square) => document.activeElement === square) + 1
      squares.at((index > 63 ? 0 : index)).focus()
      const newnote = Ear.notes?.[soundBank.selectedOptions[0].label]?.[soundlength.selectedOptions[0].label].findIndex((x) => x.includes(squares[index - 1].innerText.toUpperCase().replace('#', 'sharp')))
      console.log(newnote)
      Ear.mappings[UserMap.innerText].splice(index - 1, 0, newnote)
      
      
    }})

  } else {
    if(!settingsEdit_control.lastElementChild.checked){
    map.remove(map.length - 1)
  }
    bored.editmode = false 
    settingsEdit.innerText = 'Edit'
    switchGuides.click()
    settingsEdit_control.style.display = 'none'
    
    squares.map((x) => {
      x.setAttribute('contenteditable', 'false')
      x.style.backgroundColor = 'black';
      
      
    })

    window.onkeydown = ''

  }

})

settingsGIF.addEventListener('click', () => {
  navigator.clipboard.writeText(pgnView.innerText);
  alert("Copied Current PGN " + pgnView.innerText);
})

settingsResetColor.addEventListener('click', () => {
  squares.map((x) => 
    { 
      x.style.backgroundColor = 'black';
  })
})

settingsEdit_control.lastElementChild.addEventListener('click', () => {
  if(settingsEdit_control.lastElementChild.checked){
    settingsEdit_control.style.display = 'none'
    
    settingsEdit.click()
    map.lastElementChild.selected = true
  }
}
)

window.onclick = function(event) {
  if (!event.target.matches('#btn-settings')) {
    var dropdowns = document.getElementsByClassName("settings-content");
    settings.className = 'fa fa-gear fa-spin';
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
        
      }
    }
  }
} 

start.addEventListener('click', async () => {
  const data = PGN()
  const movements = Object.values(data).map((x) => Object.values(x).map((y) => y.square)).filter((x) => x !== undefined)

 async function StartMusic(movements, durations, timelapses){
  
durations = durations !== undefined ? durations : '3,'.repeat(movements.length).split(',') ;
timelapses = timelapses !== undefined ? timelapses :'2000,'.repeat(movements.length).split(',');
timelapses = Array(timelapses).flat(2).map((x) => Number(x))
  
squares.map((x) => x.piece = '')
if(switchGuides.value == 3){
    
    switchGuide()
}

console.log(data)
  for (let idx = 1; idx < Object.keys(data).length; idx++){
    const turn = data[idx]
        for (let i = 0; i < Object.keys(data[idx]).length; i++) {
            const square = movements[idx - 1][i];
            console.log(turn, square)
            await sleep(timelapses[i])
            
            Array(movements[idx - 1][i]).flat(2).map((x) => x.click())
            
            if(switchGuides.value == 3){
              square.piece = Chess_Unicode[Object.values(turn)[i].player][Object.values(turn)[i].piece]
              square.textbox.innerText = square.piece

              square.style.color = Object.values(turn)[i].player
            }
        }
    }
} 

  await StartMusic(movements)
}
)

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

    const restrictionTarget = await RestrictionTarget.fromElement(bored);

    await vTrack.restrictTo(restrictionTarget);

    await aTrack.restrictTo(restrictionTarget);

    videoElem.srcObject = stream;

  } catch (err) {
    console.error(err);
  }
}