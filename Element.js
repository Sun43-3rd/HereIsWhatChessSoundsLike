 // Main HTML Elements
  export const Board = document.getElementById('board');


  // Sound Control Buttons
  export const SoundMap = document.getElementById('soundMap');
  export const SoundMap_Transposition = document.getElementById('soundMap-Transposition');
  export const SoundBank = document.getElementById('soundBank');
  export const SoundBank_Length = document.getElementById('soundBank-Duration');
  export const SoundBank_Velocity = document.getElementById('soundBank-Velocity');


  // Board Control Buttons
  export const ToggleGuides = document.getElementById('toggleGuides')
  export const SelectGuides = document.getElementById('selectGuides')
  export const SelectEnharmonic = document.getElementById('selectEnharmonic')
  export const Rotateboard = document.getElementById('rotateboard')
  


  // Music Buttons
  export const Start = document.getElementById('startButton')



  // Settings
  export const Settings = document.getElementById('settings-btn')
  export const SettingsEdit = document.getElementById('settings-edit')
  export const SettingsGIF = document.getElementById('settings-gif')
  export const SettingsTimeControl = document.getElementById('settings-timeControl')
  export const SettingsResetColor = document.getElementById('settings-resetColor')
  export const SettingsEditColors = Array.prototype.filter.call(document.getElementById("editColors").children, (x) => x.tagName === 'LABEL')
  


  // Save Changes Checkboxes
  export const SaveBoard = document.getElementById("save-board")
  export const SaveTimeControl = document.getElementById("save-timeControl")



  // Time Control
  export const Timecontrol = document.getElementById('timeControl')
  export const Timecontrol1 = document.getElementById('timeControl-duration1')
  export const Timecontrol2 = document.getElementById('timeControl-duration2')
  export const Timecontrol3 = document.getElementById('timeControl-timelapse1')
  export const Timecontrol4 = document.getElementById('timeControl-timelapse2')
  
  export const TcDuration_output_ms = document.getElementById('timeControl-duration-output-ms')
  export const TcDuration_output_sec = document.getElementById('timeControl-duration-output-sec')
  export const TcTL_output_ms = document.getElementById('timeControl-timelapse-output-ms')
  export const TcTL_output_sec = document.getElementById('timeControl-timelapse-output-sec')

  export const DurationCarousel_btn = Array.prototype.filter.call(document.getElementById("timeControl-durationHolder").children, (x) => x.tagName === 'BUTTON')
  export const LapseCarousel_btn = Array.prototype.filter.call(document.getElementById("timeControl-timelapseHolder").children, (x) => x.tagName === 'BUTTON')


// Colors

  export const SelectColors_btn = Array.prototype.filter.call(document.getElementById("selectColors").children, (x) => x.tagName === 'LABEL')
  export const ColorSlideIndicators = document.getElementById("Colors-Slide-indicators").children
  export const ColorsAll = document.getElementById('colors-All')
  export const ColorsWhite = document.getElementById('colors-White')
  export const ColorsBlack = document.getElementById('colors-Black')

  // Color Input
  ColorsAll.inputs = ['Color-All-1','Color-All-2', 'Color-All-3'].map((x) => document.getElementById(x))
  ColorsWhite.inputs = ['Color-White-1','Color-White-2'].map((x) => document.getElementById(x))
  ColorsBlack.inputs = ['Color-Black-1','Color-Black-2'].map((x) => document.getElementById(x))




// GAME NOTATION

    export const GnInput = document.getElementById('gnFileInput')
    export const GnSlideIndicators = document.getElementById('gnSlide-indicators')
    export const GnBTNs = Array.prototype.filter.call(document.getElementById("gnSlide-btns").children, (x) => x.tagName === 'LABEL')
    export const pgnView = document.getElementById('pgnView')
    export const fenView = document.getElementById('fenView')
    export const MusicView = document.getElementById('musicView')



// Create Elements 


// Squares

export const SQS = []

SQS.ids = [
  'A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8',
  'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7',
  'A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6',
  'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5',
  'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4',
  'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3',
  'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2',
  'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1'
];

for (let i = 0; i < 64; i++) {

  // Design
    const square = document.createElement('div');
    const textbox = document.createElement('span');
    square.textbox = textbox
    square.className = 'square'; 
    square.id = SQS.ids[i];
    square.textbox.innerText = square.id;
    
    Board.appendChild(square);
    square.appendChild(textbox)
    SQS.push(square)
  }