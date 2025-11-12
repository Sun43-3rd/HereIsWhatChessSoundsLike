// export FUNCTIONAL TOOLS
    export function toggle(value, a, b){
        return value === a ? b : a
    }; // returns 'b' if 'value' is NOT equal to 'a', otherwise 'a' 

    toggle.property = function(property, value, a, b){
        value[property] = toggle(value[property], a , b)
    }; // binds 'a' or 'b' to the specfied property of the arguement 'value', based of 'toggle' see line 4 of 'ToolBox.js' (ANY)





// SPECIAL VALUE

    export function ColorIncrement(color, endColor){

        const array_1 = color.replace('rgb(', '').replace(')', '').split(',').map((x) => Number(x))
        const array_2 = endColor.replace('rgb(', '').replace(')', '').split(',').map((x) => Number(x))

        const difference = array_1.map((x, i) => array_2[i] - x) 
    
        return `rgb(${array_1.map((x, i) =>  Number(x) + (Number(difference[i]) / 3 )).join(',')})`
    } // returns a new, 'incremented', rgb formated color value. (STRING)

    export function FormatPGN(text, squares){
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

    } // returns a specially formatted object made for proccessing, see 'Processing.js'. (OBJECT)

    export function HexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `rgb(${[parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(', ')})`: '';
    } // returns an rgb formatted string from a hex value. (STRING)

    export function PieceNotation(move){
    const output = ['Pawn', 'Knight', 'Bishop', 'Rook', 'Queen', 'King', ['King', 'Rook'], ['King', 'Rook']]
    const search = ['', 'N', 'B', 'R', 'Q', 'K', 'O-O', 'O-O-O']
    return output.reverse()[search.reverse().findIndex((x) => move.includes(x))]
    }

    export function FEN(){

    } // returns an object that has a translated .FEN file, and text

    export function PGN(){

    } // returns translated .PGN file

    export function SBCN(){

    } // returns translated .SBCN file

// MUSIC TOOLS


    export async function playSound(sound, duration, timelapse = 0, pool = new Set()){

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

    export async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }