import JSZIP from  'https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm'
import * as A from './Square.js';

 async function EWIG(timelapse = 1){
 
  const durationSec = timelapse;         
  const sampleRate  = 44100;      

  
  const ctx = new (window.AudioContext || window.webkitAudioContext)({sampleRate});
  const buffer = ctx.createBuffer(1, sampleRate * durationSec, sampleRate);
  
  function encodeWAV(buf) {
    const numChannels = buf.numberOfChannels;
    const samples = buf.length;
    const bytesPerSample = 2; 
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = samples * blockAlign;

    const wav = new ArrayBuffer(44 + dataSize);
    const view = new DataView(wav);

   
    function writeString(offset, str) {
      for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    }
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);   
    writeString(8, 'WAVE');

    
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);            
    view.setUint16(20, 1, true);             
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);            

    
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);

    
    const offset = 44;
    for (let i = 0; i < samples; i++) {
      
      view.setInt16(offset + i * bytesPerSample, 0, true);
    }

    return new Blob([wav], {type: 'audio/wav'});
  }

  const wavBlob = encodeWAV(buffer);

return wavBlob
};

async function create(){

    const data = A.retrieve(undefined, [], '0.2', [], '1.4')

    let files = []

      for(let i = 0; i < data[0].length ; i++){

          const note = data[0][i]

          const n_filename = note.soundname();

          const response = await fetch(note.soundfile())
        
          const n_arraybuffer = await response.arrayBuffer()

          const n_blob = new Blob([n_arraybuffer], {type : 'audio/mpeg'})

          const n_file = new File([n_blob], `${n_filename}.mp3`, { type: n_blob.type})

          const t_blob = await EWIG(1)

          const t_file = (new File([t_blob], `silence_${i}.wav`, {type: 'audio/wav' }))

          files.push(n_file, t_file)
      }
    

      console.log(files)

      const zip = new JSZIP()

      files.forEach((x, i) => {

          zip.file(`${i}_${x.name}`, x);
          
          }
    );

  const zipBlob = await zip.generateAsync({type: 'blob'});

  const link = document.createElement('a');
  link.href = URL.createObjectURL(zipBlob);
  link.download = `${A.pgnInput.value.toString().slice(12).replace('.pgn', '')}_audio`;
  document.body.appendChild(link);
  link.click();
  console.log(A.pgnInput)

  
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.remove();
  }, 150);
}

const download = document.getElementById('process');

download.addEventListener('click', async () => {create()})


