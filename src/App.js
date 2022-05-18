import { useEffect } from 'react';
import './App.css';

function App() {
  var colours = [];

  for (let i = 0; i < 4096; i++) {
    var colour = i.toString(16).padStart(3,'0'); // Convert to base 16 (hex) and if needed pad to a full 12 bit value with zeroes
    // Turn it into a 24 bit RGB value with a kind of dithering by splicing in values in between
    colours.push(colour.slice(0,1) + '0' + colour.slice(1,2) + '0' + colour.slice(2,3) + '0');
    colours.push(colour.slice(0,1) + '0' + colour.slice(1,2) + '0' + colour.slice(2,3) + '7');
    colours.push(colour.slice(0,1) + '7' + colour.slice(1,2) + '0' + colour.slice(2,3) + '0');
    colours.push(colour.slice(0,1) + '7' + colour.slice(1,2) + '0' + colour.slice(2,3) + '7');
    colours.push(colour.slice(0,1) + '0' + colour.slice(1,2) + '7' + colour.slice(2,3) + '0');
    colours.push(colour.slice(0,1) + '0' + colour.slice(1,2) + '7' + colour.slice(2,3) + '7');
    colours.push(colour.slice(0,1) + '7' + colour.slice(1,2) + '7' + colour.slice(2,3) + '0');
    colours.push(colour.slice(0,1) + '7' + colour.slice(1,2) + '7' + colour.slice(2,3) + '7');
  }

  useEffect(() => {
    const pixHeight = 1;
    const pixWidth = 1;
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d')
    canvas.width = pixWidth * 128;
		canvas.height = pixHeight * 256;

    var x = 0;
    var y = 0;
    
    for (let i = 0; i < colours.length; i++) {
      ctx.fillStyle = '#' + colours[i];
      ctx.fillRect(x, y, pixWidth, pixHeight);
      x = x + pixWidth; // Move the cursor position over
      if (x > 127) { // If x value greater than 264, increment Y value and reset
        y = y + pixHeight;
        x = 0;
      }
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <canvas id="canvas"/>
      </header>
    </div>
  );
}

export default App;
