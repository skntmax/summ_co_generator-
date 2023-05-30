
import React from 'react';
import Dropzone from 'react-dropzone';





import {useDropzone} from 'react-dropzone';


let  style={
    color:"white"
  }

export default function DropzoneWithoutClick(props) {
    
     const {getRootProps, acceptedFiles } = useDropzone();
    
     const files = acceptedFiles.map(file => <li style={style} key={file.path}>{file.path}</li>);
     
      
    return (
      <section className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          <p style={style} >Dropzone without click events</p>
        </div>
        <aside>
          <h4 style={style}>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
    );
  }
  
  <DropzoneWithoutClick />