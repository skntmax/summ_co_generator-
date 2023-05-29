import React from 'react';
import styles from '../styles/TopSection.module.css';
import Link from 'next/link';
import Header from './Header';
import Button from './Button';


const TopSection = () => {
    return (
       
         <div className={styles.container} style={{
            width:"100vw",
            height:"100vh"
        }}>
             
            {/* <Header /> */}
          
            {/* <div className={styles.wrapper}>
                <div className={styles.header}>
                    <p>Supercharge your <span>job search</span> with AI</p>
                </div>
                <div className={styles.description}>
                    <p>Increase your chances of landing an interview by generating highly personalized and professional cover letter that are tailored to the specific job you are applying for.</p>
                </div> */ }
                  
                   
                   <div style={{
                    display:"flex" ,
                    justifyContent:"center" ,
                    alignItems:"center"
                   }}>
                <Link href="/generate">
                    <Button text={"generate Cover letter "} />
                </Link>
                     
                   </div>
                
                {/* <span>No Email. No Signup.</span> */}
            {/* </div> */}
        </div>
    )
}

export default TopSection