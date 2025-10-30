import * as Ear from './Sound.js'

  const bored = document.getElementById('soundGrid');
  const pgnView = document.getElementById('pgnView')
  export const pgnInput = document.getElementById('pgnFileInput')
  const toggleGuides = document.getElementById('toggleGuides')
  const switchGuides = document.getElementById('switchGuides')
  const rotateBored = document.getElementById('rotateBored')
  const map = document.getElementById('map')
  const start = document.getElementById('startButton')
  
  const settings = document.getElementById('btn-settings')
  const settingsEdit = document.getElementById('settings-edit')
  const settingsGIF = document.getElementById('settings-gif')
  const settingsResetColor = document.getElementById('settings-resetColor')
  const settingsRecord = document.getElementById('settings-record')

  const defaultcolor = () => {return hexToRgb(document.getElementById('settings-color').value)}
  const defaultcolor2 = () => {return hexToRgb(document.getElementById('settings-color2').value)}
  const settingsEdit_control = document.getElementById("edit-soundGrid")


  toggleGuides.value = 1;
  switchGuides.value = 0;
  rotateBored.value = 0;
  settings.value = 0;
  bored.editmode = false 

  const pgn_ids = (text) => {return text !== undefined ? pgnInput : FormatPGN(pgnView.innerText)}
  const squares = [] 
  const sounds = () => {return Ear.mappings?.[map.selectedOptions[0].label].map((x) => Ear.notes[x])}

export const retrieve = (square_ar, timelapse_ar, tmlpse = '0.5', duration_ar, drt = '0.5') => {
    const movements = square_ar !== undefined ? square_ar : pgn_ids().flat(2).map((x) => squares.find((y) => y.id === x)).filter((x) => x !== undefined)
    const b = timelapse_ar.length < movements.length ? timelapse_ar.concat(`${tmlpse + ' '}`.repeat(movements.length - timelapse_ar.length).split(' ').map((x) => Number(x))).flat(2) : timelapse_ar
    const c = duration_ar.length < movements.length ? duration_ar.concat(`${drt + ' '}`.repeat(movements.length - duration_ar.length).split(' ').map((x) => Number(x))).flat(2) : duration_ar


   return [movements, b, c]
  }



function toggle(value, a, b){
  return value === a? b : a
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${[parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(',')})`: null;
}

function ColorIncrement(color, endColor){
   const array_1 = color.replace('rgb(', '').replace(')', '').split(',').map((x) => Number(x))
   const array_2 = endColor.replace('rgb(', '').replace(')', '').split(',').map((x) => Number(x))

   const difference = array_1.map((x, i) => array_2[i] - x) 
  
   return `rgb(${array_1.map((x, i) =>  Number(x) + (Number(difference[i]) / 3 )).join(',')})`
  }

function squareClick(square, duration = 2){

   if (toggleGuides.value = 0){

    square.text = [square.soundname(), square.id][switchGuides.value]
  
  }


      console.log(square.style.backgroundColor, ColorIncrement(square.style.backgroundColor, defaultcolor2()))
      
      square.style.backgroundColor = (square.style.backgroundColor === 'black' || square.style.backgroundColor === '') ? defaultcolor() : ColorIncrement(square.style.backgroundColor, defaultcolor2())
      const a = square.sound()
      
      console.log(a)

      a.play()
      
      setTimeout(() => {
          
        a.pause();
          
        a.currentTime = 0; 
      }, duration * 1000);
     
}


function FormatPGN(text){
  return text.substring(text.indexOf('1.')).split(/\d+\.\s*/).filter(Boolean).map(x => x.trim().split(' ').map((y, i) => 
    y.toUpperCase().includes('O')? 
    (y === 'O-O' ? (i === 0 ? ['G1', 'F1']: ['G8', 'F8']) : 
    (i === 0 ? ['C8', 'D8']: ['C1', 'D1'])) :  Ear.squares_id.find((z) => y.toUpperCase().includes(z))))
    
}

async function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function StartMusic(square_ar, timelapse_ar, tmlpse = '0.5', duration_ar, drt = '0.5'){
    let a = retrieve(square_ar, timelapse_ar, tmlpse, duration_ar, drt)
    let movements = a[0] 
    let timelapses = a[1]
    let durations = a[2]

    for (let i = 0; i < movements.length; i++) {
        squareClick(movements[i], durations[i]);
        let wait = durations[i] + (timelapses[i] ?? 0); 

        await sleep(wait)
        console.log(i)
    }
}
 
for (let i = 0; i < 64; i++) {
    const square = document.createElement('div');
    const text = document.createElement('span');
    square.text = text
    square.className = 'square';
    square.id = Ear.squares_id[i]
    square.text.innerText = square.id
    square.soundname = () => `${sounds()[i].replace('PianoSBC/', '').replace('.mp3', '').replace('sharp', '#')}`;
    square.sound = () => new Audio(sounds()[i]);
    square.soundfile = () => sounds()[i]; 

    square.addEventListener('click', () => {
      squareClick(square)
    });
    
    bored.appendChild(square);
    square.appendChild(text)
    squares.push(square)
  }

switchGuides.addEventListener('click', () => {
  switchGuides.value = switchGuides.value === 0 ? 1 : switchGuides.value === 1 ? 0 : 2;

  switchGuides.className = (['switch off', 'switch on', switchGuides.className][switchGuides.value])
  squares.map((x) => {x.text.innerText = [x.id, x.soundname(), x.text.innerText][switchGuides.value]
    })
  }
)

map.addEventListener('change', () => {
    sounds()
    squares.map((x) => {x.sound(); x.soundname()})
    squares.map((x) => {x.text.innerText = [x.id, x.soundname(), x.text.innerText][switchGuides.value]
    })
  }
)

toggleGuides.addEventListener('click', () => {
  toggleGuides.value = toggleGuides.value === 0 ? 1 : 0;
  switchGuides.value = ([2, 0][toggleGuides.value])
  toggleGuides.className = (['switch off', 'switch on'][toggleGuides.value])
  squares.map((x) => {x.text.innerText = ['', [x.soundname(), x.id][switchGuides.value]][toggleGuides.value]})
 
  }
)

rotateBored.addEventListener('click', () => {
  rotateBored.value = rotateBored.value === 0 ? 1 : 0;
  
   bored.style.transform = (['rotate(0deg)', 'rotate(180deg)'][rotateBored.value])
   squares.map((x) => {x.text.style.transform = (['rotate(0deg)', 'rotate(-180deg)'][rotateBored.value])})
  }
  
)
      
pgnInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function(e) {
      const pgnText = e.target.result;
      pgnView.innerText = pgnText
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
        x.sound().pause()
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
      const newnote = Ear.notes.findIndex((x) => x.includes(squares[index - 1].innerText.toUpperCase().replace('#', 'sharp')))
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
  
  if(settingsRecord.lastElementChild.checked){
    
    startCapture()

  }
  StartMusic(undefined, [] , '0.5', [], '1.4')
}
)



async function startCapture() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    const [track] = stream.getVideoTracks();
    const restrictionTarget = await RestrictionTarget.fromElement(bored);
    await track.restrictTo(restrictionTarget);
    videoElem.srcObject = stream;
  } catch (err) {
    console.error(err);
  }
}