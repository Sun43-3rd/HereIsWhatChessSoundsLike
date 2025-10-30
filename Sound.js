export const notes = [
  'PianoSBC/C1.mp3', 'PianoSBC/Csharp1.mp3',
  'PianoSBC/D1.mp3', 'PianoSBC/Dsharp1.mp3',
  'PianoSBC/E1.mp3',
  'PianoSBC/F1.mp3', 'PianoSBC/Fsharp1.mp3',
  'PianoSBC/G1.mp3', 'PianoSBC/Gsharp1.mp3',
  'PianoSBC/A1.mp3', 'PianoSBC/Asharp1.mp3',
  'PianoSBC/B1.mp3',
  'PianoSBC/C2.mp3', 'PianoSBC/Csharp2.mp3',
  'PianoSBC/D2.mp3', 'PianoSBC/Dsharp2.mp3',
  'PianoSBC/E2.mp3',
  'PianoSBC/F2.mp3', 'PianoSBC/Fsharp2.mp3',
  'PianoSBC/G2.mp3', 'PianoSBC/Gsharp2.mp3',
  'PianoSBC/A2.mp3', 'PianoSBC/Asharp2.mp3',
  'PianoSBC/B2.mp3',
  'PianoSBC/C3.mp3', 'PianoSBC/Csharp3.mp3',
  'PianoSBC/D3.mp3', 'PianoSBC/Dsharp3.mp3',
  'PianoSBC/E3.mp3',
  'PianoSBC/F3.mp3', 'PianoSBC/Fsharp3.mp3',
  'PianoSBC/G3.mp3', 'PianoSBC/Gsharp3.mp3',
  'PianoSBC/A3.mp3', 'PianoSBC/Asharp3.mp3',
  'PianoSBC/B3.mp3',
  'PianoSBC/C4.mp3', 'PianoSBC/Csharp4.mp3',
  'PianoSBC/D4.mp3', 'PianoSBC/Dsharp4.mp3',
  'PianoSBC/E4.mp3',
  'PianoSBC/F4.mp3', 'PianoSBC/Fsharp4.mp3',
  'PianoSBC/G4.mp3', 'PianoSBC/Gsharp4.mp3',
  'PianoSBC/A4.mp3', 'PianoSBC/Asharp4.mp3',
  'PianoSBC/B4.mp3',
  'PianoSBC/C5.mp3', 'PianoSBC/Csharp5.mp3',
  'PianoSBC/D5.mp3', 'PianoSBC/Dsharp5.mp3',
  'PianoSBC/E5.mp3',
  'PianoSBC/F5.mp3', 'PianoSBC/Fsharp5.mp3',
  'PianoSBC/G5.mp3', 'PianoSBC/Gsharp5.mp3',
  'PianoSBC/A5.mp3', 'PianoSBC/Asharp5.mp3',
  'PianoSBC/B5.mp3',
  'PianoSBC/C6.mp3', 'PianoSBC/Csharp6.mp3',
  'PianoSBC/D6.mp3', 'PianoSBC/Dsharp6.mp3',
  'PianoSBC/E6.mp3',
  'PianoSBC/F6.mp3', 'PianoSBC/Fsharp6.mp3',
  'PianoSBC/G6.mp3', 'PianoSBC/Gsharp6.mp3',
  'PianoSBC/A6.mp3', 'PianoSBC/Asharp6.mp3',
  'PianoSBC/B6.mp3',
  'PianoSBC/C7.mp3', 'PianoSBC/Csharp7.mp3',
  'PianoSBC/D7.mp3', 'PianoSBC/Dsharp7.mp3',
  'PianoSBC/E7.mp3',
  'PianoSBC/F7.mp3', 'PianoSBC/Fsharp7.mp3',
  'PianoSBC/G7.mp3', 'PianoSBC/Gsharp7.mp3',
  'PianoSBC/A7.mp3', 'PianoSBC/Asharp7.mp3',
  'PianoSBC/B7.mp3',
  'PianoSBC/C8.mp3'
];
  
 export const mappings =
  {
    'Default (C Major)': [
      36, 38, 40, 41, 43, 45, 47, 48,
      35, 37, 39, 40, 42, 44, 46, 47,
      33, 35, 37, 38, 40, 42, 44, 45,
      31, 33, 35, 36, 38, 40, 42, 43,
      29, 31, 33, 34, 36, 38, 40, 41,
      28, 30, 32, 33, 35, 37, 39, 40,
      26, 28, 30, 31, 33, 35, 37, 38,
      24, 26, 28, 29, 31, 33, 35, 36
    ],

    'Direct': [
      70, 71, 78, 79, 80, 81, 82, 83,
      81, 83, 72, 74, 76, 77, 79, 81,
      69, 71, 60, 62, 64, 65, 67, 69,
      57, 59, 48, 50, 52, 53, 55, 57,
      45, 47, 36, 38, 40, 41, 43, 45,
      33, 35, 24, 26, 28, 29, 31, 33,
      21, 23, 12, 14, 16, 17, 19, 21,
      9, 11, 0, 2, 4, 5, 7, 9
    ],

    'C Major (Middle)': [
      29, 31, 33, 34, 36, 38, 40, 41,
      28, 30, 32, 33, 35, 37, 39, 40,
      26, 28, 30, 31, 33, 35, 37, 38,
      24, 26, 28, 29, 31, 33, 35, 36,
      23, 25, 27, 28, 30, 32, 34, 35,
      21, 23, 25, 26, 28, 30, 32, 33,
      19, 21, 23, 24, 26, 28, 30, 31,
      17, 19, 21, 22, 24, 26, 28, 29
    ],
    'Circle of Fifths':[
      73, 75, 77, 78, 80, 82, 84, notes.length - 1,
      66, 68, 70, 71, 73, 75, 77, 78,
      59, 61, 63, 64, 66, 68, 70, 71,
      52, 54, 56, 57, 59, 61, 63, 64,
      45, 47, 49, 50, 52, 54, 56, 57,
      38, 40, 42, 43, 45, 47, 49, 50,
      31, 33, 35, 36, 38, 40, 42, 43,
      24, 26, 28, 29, 31, 33, 35, 36
    ],
  };

export const squares_id = [
  'A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8',
  'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7',
  'A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6',
  'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5',
  'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4',
  'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3',
  'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2',
  'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1'
];
