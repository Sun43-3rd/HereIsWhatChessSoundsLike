import * as EL from './Elements.js'
import * as BOX from './ToolBox.js'


// Processing Elements
    const Music = {
      movements : {
        '0' : [], 
        'clear' : () => {Music.movements[0] = []}
      }, 

      sounds : {
        '0' : new Set(),
        'clear' : () => {Music.sounds[0] = new Set()}
      },

      durations : {
        '0' : [], 
        'clear' : () => {Music.movements[0] = []}
      }, 

      timelapses: {
        '0' : [], 
        'clear' : () => {Music.timelapses[0] = []}
      }
    }
    

    const Sounds = {

      '0' : [],

      'map' : {
        '0' : [],
        'element' : EL.SoundMap,
        'value': EL.SoundMap.selectedOptions[0].label
      },

      'transposition' : {
        '0' : [],
        'element' : EL.SoundMap,
        'value': EL.SoundMap.selectedOptions[0].value
      },

      'bank' : {
        '0' : [],
        'element' : EL.SoundMap,
        'value': EL.SoundMap.selectedOptions[0].label
      },

      'bankDuration' : {
        '0' : [],
        'element' : EL.SoundMap,
        'value': EL.SoundMap.selectedOptions[0].label
      },

      'bankVelocity' : {
        '0' : [],
        'element' : EL.SoundMap,
        'value': EL.SoundMap.selectedOptions[0].label
      },

      'update' : () => {Sounds[0] = Ear.Mappings?.[map.selectedOptions[0].label]?.[mapTransposition.value.toString()].map((x) => Notes?.[soundBank.selectedOptions[0].label]?.[soundBank_Length.selectedOptions[0].label][x])}
      
    }


    // Colors

    const Colors = {

      'ALL' : {
        '0' : {},
        'element' : EL.ColorsAll,
        'update' : () => {EL.ColorsAll.inputs.map((x, i) => Colors.ALL[0][(['Start', 'End', 'Default'][i])] = hexToRgb(x.value))}
      },

      'White' : {
        '0' : [],
        'element' : EL.ColorsWhite,
        'update' : () => {EL.ColorsWhite.inputs.map((x, i) => Colors.ALL[0][(['Start', 'End'][i])] = hexToRgb(x.value))}
      },

      'Black' : {
        '0' : [],
        'element' : EL.ColorsBlack,
        'update' : () => {EL.ColorsBlack.inputs.map((x, i) => Colors.ALL[0][(['Start', 'End'][i])] = hexToRgb(x.value))}
      },

    }

    // Game Notation 
    const GN = {
      '0' : {},
      'update' : (file) => {
        
       if(PGN.is(file)){

         GN.PGN.update(file)
         GN[0] = BOX.FormatPGN(GN.PGN[0][0])

       }
       

      },

        'PGN' : {
          '0' : [], // ? all files ?? text
          'src' : '', // downlable translated file
          'element' : EL.PgnView,
          'update' : (file) => {
            const results = BOX.PGN(file);
            GN.PGN.element.innerText = results.text
            GN.PGN[0].push(results.text);
            GN.PGN.src.push(results); 
          }
        },

        'FEN' : {
          '0' : [],
          'src' : '',
          'element' : EL.FenView,
          'update' : (file) => {
            const results = BOX.FEN(file);
            GN.FEN.element.innerText = results.text
            GN.FEN[0].push(results.text);
            GN.FEN.src.push(results); 
          }
        },

        'SBCN' : {
          '0' : [],
          'src' : '',
          'element' : EL.SBCNView,
          'update' : (file) => {
            const results = BOX.SBCN(file);
            GN.SBCN.element.innerText = results.text
            GN.SBCN[0].push(results.text);
            GN.SBCN.src.push(results); 
          }
        },
      

    }

  // Squares 

    EL.SQS.map((square) =>  
      square.style.backgroundColor = Colors.ALL[0]['Default']
    )



// Handle Live Dropdown Changes 

  // 
    EL.SoundMap.addEventListener('change', () => {
        Sounds.update()
        EL.SQS.map((x) => {x.renderSound(), x.soundname()})
        switchGuide()
      }
    )

    EL.SoundMap_Transposition.addEventListener('change', () => {
        Sounds.update()
        EL.SQS.map((x) => {x.renderSound(), x.soundname()})
      }
    )

    EL.SoundBank.addEventListener('change', () => {
        Sounds.update()
        EL.SQS.map((x) => {x.renderSound(), x.soundname()})
      }
    )

    EL.SoundBank_Length.addEventListener('change', () => {
        Sounds.update()
        EL.SQS.map((x) => {x.renderSound(), x.soundname()})
      }
    )

    EL.SoundBank_Velocity.addEventListener('change', () => {
        Sounds.update()
        EL.SQS.map((x) => {x.renderSound(), x.soundname()})
      }
    )
    




// Handle Input Changes
    EL.GnInput.addEventListener('change', async function(event) {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = function(e) {
          const gnText = e.target.result;
          GN.update(e.target)
          };

      reader.readAsText(file);
      }
    )


// Square
    EL.SQS.map((square) => square.addEventListener('click', async () => {

      //  Refernced Properties
                  square.style.backgroundColor = ColorDefault()[2];
                  square.renderSound = () => {square.sound = new Audio(SoundMap[0][i])};
                  square.renderSound(); square.sound.preload = 'metadata';
                  // replace '#' with data from element controlling sharp or flat
                  square.renderSoundName = () => {square.sound.name = Ear.ORDER['#'][SoundMap[0][i]]};
                  
                  square.soundfile = () => SoundMap[0][i]; 
                  
              
                  square.editable = () => {
                    square.sound.pause()
                    square.sound.currentTime = 0
                    square.style.backgroundColor =  defaultcolor();
                    square.setAttribute('contenteditable', 'true')
                  }
          
          square.style.backgroundColor = [ColorDefault()[2]].includes(square.style.backgroundColor) ? ColorDefault()[0] : BColorIncrement(square.style.backgroundColor, ColorDefault()[1])
          
          audioPool.add(square.sound)
              await playSound(square.sound, Number(tcDuration_output_ms.textContent), square.timelapse, audioPool)
        
              
                  Board.appendChild(square);
                  square.appendChild(textbox)
                  Squares.push(square)
        })
    )


