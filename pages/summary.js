import React ,{useState } from 'react';
import FinalSummary from './../components/formalised'
import axios from 'axios';

function summary() {
  const [data, setData] = useState({
   candidateName:"" ,
   skills:[] ,
   experience:[] ,
   exp:0 ,
   selecte_file:undefined , 
  cv_data:null,
  word_count:0,
  list:[]
  });


   
const [res , setRes ] = useState("");
const [grammerly_data , setGrammerlyData ] = useState("");
  
  const handleSubmit = async (e) => {

   
       const {cv_data}  = data 
    let formData = new FormData()
   
    formData.append('name' , cv_data.name )
    formData.append('email' ,cv_data.email)
    formData.append('experience' ,cv_data.experience)
    formData.append('skills' ,cv_data.languages)
    formData.append('isSummary' ,"true" )
    formData.append('company' , "" )
    formData.append('position' , "" )
    formData.append('word_count' , data.word_count )
    
    let model = {}
    for(var [key , value ] of formData.entries()) {
   
      model[key] = value
    }
    //  console.log("model",model);
    
     try {
      const result = await fetch("/api/generate", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData:model,
        }),
      })
       
      if (!result.ok) {
        setError("Check your network and try again");
      }
  
      debugger
      // This data is a ReadableStream
      const data = result.body;
      if (!data) {
        return;
      }
  
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
         console.log("chunkValuechunkValue" , chunkValue );
         setRes((prev)=> prev+chunkValue)
      
      }
      

    } catch (err) {
    //   setError(err);
    }

  }


  
  function setCV(e){
   
    let file = e.target.files[0]
    console.log(file);
    setData({...data  , selecte_file:file })
    
  } 


  const getCVData =async ()=>{

    debugger
     
    if(data.cv_data==null) {

      let formData = new FormData()
      formData.append('cv' , data.selecte_file)
    //  let url = process.env.NEXT_APP_BASE_URL+"/root"
      let url = "http://localhost:2000/root" 
      let result = await axios.post(url ,formData)
      const {data:{parts}}  =result

      setData({...data , cv_data:parts})

      }
  

  }
  


  
  function renderData(model){

  if(model!=null){
    var { name, email , experience , languages , education , objectives , projects , skills , summary  }  = model 

   }


  
      return (
        <React.Fragment>
    <br/><br/>{name?"NAME:  "+name:""}<br/><br/><br/> {email?"EMAIL:  "+email:""} <br/><br/><br/> {experience?"Experience:  "+experience:""} <br/><br/><br/> {languages?"Skills:  "+languages:""} 
                <br/><br/><br/> { education?"Education:  "+education:""} <br/><br/><br/> {objectives?"Objectives:  "+objectives:""} <br/><br/><br/> {projects?"Projects:  "+projects:""} <br/><br/><br/> {skills?"skills:  "+skills:""} <br/><br/><br/> {summary?"Summary:  "+summary:""}

        </React.Fragment>
      )
  
  }
   
 


  async function getGrammerlyGeneratedData(para) {
     
 
     try{
      
      let model = {
        grammerly_generator:true ,
        grammerly_set_data:para  
        }
       
       

      // const {data:{original , paraphrased }}  = await  axios.post('https://api.apilayer.com/paraphraser' , {
      //   ['data-raw']: `
      //   Akhil Shukla is a Senior Software Developer at Societe Generale, Bangalore with vast experience in developing and deploying single page applications. He has expertise in various technologies such as Javascript, Python, SQL, HTML, CSS, React JS, VUE JS 3, Typescript, Django, Node JS, PostgreSQL, SQLite, MySQL, Firebase Realtime Database, Robot,Pytest, Jest, ddt, Firebase, Bitbucket, Github, Netlify, AWS ECS, EC2, Kubernetes (K8), Docker, Nginx, Apache, Jenkins and Git. He has previously worked for Flipkart Internet Pvt Ltd where he developed the Avenges Dashboard using Python Django and React JS and for Tibrox Tech Solutions, Bangalore where he developed the ERP for ecommerce store. Akhil's email address is akhil.shukla12@gmail.com. `
      // } ,
      //  { headers:{
      //   apikey:'qipokIaw94o1y1d9g5EnDT7hJEV2lqid'
      // }} )

       
      //  console.log("ai generated summary " ,  original  );
      //  console.log("ai generated summary " ,    paraphrased);
     
       
      const result = await fetch("/api/generate", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData:model,
        }),
      })
       
      if (!result.ok) {
        setError("Check your network and try again");
      }
  
      debugger
      // This data is a ReadableStream
      const data = result.body;
      if (!data) {
        return;
      }
  
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
         console.log("chunkValuechunkValue" , chunkValue );
         
         setGrammerlyData((prev)=> prev+chunkValue)
      
      }
      




     }catch(err) {

      console.error("err", err);
       
     }
    
    
    
  }




  return (
   
    <div>

    <div className="container"  >
  <div className="row">
  
    <div className="col">

          <input type='file' name="cv"  onChange={setCV}  onBlur={getCVData} />
                {data.cv_data!=null?
                renderData(data.cv_data)
               :""}
               
    </div>
    <div className="col">

    <input name="word_count" value={data.word_count} onChange={(e)=> setData({...data ,word_count:e.target.value })}  placeholder=' word count ' />
    <button vaule="getSummary" onClick={handleSubmit} > generate summary </button>     
                       
    <grammarly-editor-plugin> 
    
    <textarea className="form-control mt-5" id="exampleFormControlTextarea1" rows="5"
    value={res}
    onChange={(e)=>{
       setRes(e.target.value)
    }}>

    </textarea>

    </grammarly-editor-plugin>


         
    <div class="d-grid gap-2">
    <button className="btn btn-success mt-2" type="button" onClick={()=> getGrammerlyGeneratedData(res)  } > Generate using grammerly </button>
    </div>
     
     
       <FinalSummary   data ={grammerly_data} />


    
    <div class="d-grid gap-2">
  <button className="btn btn-primary mt-2" type="button" onClick={()=>{
    daebugger
    let updatedSummary = [ ...data.list , res ]
    setData({
      ...data , list:updatedSummary  
    }) 

    setRes("")

  }}> Save Profile summary</button>
</div>

    <div className="accordion" id="accordionExample">
  
  {data.list  ? data.list.map((ele , index)=>{
     
     return (
      <React.Fragment>

      <div key={index} className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
           
            {index+1}
            
        </button>
      </h2>
  
      <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
        <div className="accordion-body">
        
        <div className="badge bg-primary text-wrap" >
              {ele}
        </div>
        
        </div>
      </div>
    </div>
      </React.Fragment>
    
     )
  }):""  }
  

</div>


    </div>
    
    <div className="w-100"></div>

  
  </div>
</div>


       
  
    </div>
  );
}

 


export default summary;
