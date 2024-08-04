import React, { useState } from 'react';
import PokerHands from './Graph'; // Assuming Graph is the component for rendering the data

function FileUpload() {
  const [fileContents, setFileContents] = useState('');

  const handleFilesChange = (event) => {
    const files = Array.from(event.target.files);
    let processed = 0;
    let done = Array(files.length);

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        done[index] = e.target.result;
        processed += 1;
        if (processed === files.length) {
          setFileContents(done.join('\n'));
        }
      };
      reader.readAsText(file);
    });
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFilesChange} />
      <div>
        <PokerHands data={fileContents} />
      </div>
    </div>
  );
}

export default FileUpload;