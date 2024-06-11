
import React, { useState } from "react"



const Allphotos = () => {
    const [showAll,setShowAll] = useState(false);

    const Photo = [
       
        {
            avatar: "/pic1.jpg",
            name: "Martiana dialan",
           
        },
        {
            avatar: "/pic1.jpg",
            name: "Martiana dialan",
            
        },
        {
            avatar: "/pic1.jpg",
            name: "Martiana dialan",
           
        },
        {
            avatar: "/pic1.jpg",
            name: "Martiana dialan",
            
        },
        {
            avatar: "/pic1.jpg",
            name: "Martiana dialan",
           
        },
        {
            avatar: "/pic1.jpg",
            name: "Martiana dialan",
           
        },
        {
            avatar: "/pic1.jpg",
            name: "Martiana dialan",
           
        },
        {
            avatar: "/pic1.jpg",
            name: "Micheal colorand",
           
        },
        {
            avatar: "/pic1.jpg",
            name: "Brown Luis",
            
        },
       
    ]
    const displayedPhoto = showAll ? Photo : Photo.slice(0,3);

    return (
        <section className="py-14">
             

            <div className="max-w-screen-xl mx-auto px-4 md:px-8  ">
                <div className="max-w-full text-center ">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl ">
                        Inside our studio
                    </h3>
                    <p className="text-gray-600 mt-3 ">
                        We are passionate about Yoga.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {
                            displayedPhoto.map((item, idx) => (
                                <li key={idx}>
                                    <div className="w-full h-90 sm:h-50 md:h-90">
                                        <img
                                            src={item.avatar}
                                            className="w-full h-full object-contain object-center shadow-md rounded-xl"
                                            
                                            alt=""
                                        />
                                         <h4 className="text-lg text-gray-700 font-semibold text-center">{item.name}</h4>
                                    </div>
                                    {/* <div className="mt-4 it">
                                        <h4 className="text-lg text-gray-700 font-semibold">{item.name}</h4>
                                    
                                        <div className="mt-3 flex gap-4 text-gray-400 ">
                                            <a href={item.twitter}>
                                                <svg className="w-5 h-5 duration-150 hover:text-gray-500" fill="currentColor" viewBox="0 0 48 48 "><g clip-path="url(#clip0_17_80)"><path fill="currentColor" d="M15.1 43.5c18.11 0 28.017-15.006 28.017-28.016 0-.422-.01-.853-.029-1.275A19.998 19.998 0 0048 9.11c-1.795.798-3.7 1.32-5.652 1.546a9.9 9.9 0 004.33-5.445 19.794 19.794 0 01-6.251 2.39 9.86 9.86 0 00-16.788 8.979A27.97 27.97 0 013.346 6.299 9.859 9.859 0 006.393 19.44a9.86 9.86 0 01-4.462-1.228v.122a9.844 9.844 0 007.901 9.656 9.788 9.788 0 01-4.442.169 9.867 9.867 0 009.195 6.843A19.75 19.75 0 010 39.078 27.937 27.937 0 0015.1 43.5z" /></g><defs><clipPath id="clip0_17_80"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                            </a>
                                            <a href="javascript:void()">
                                               <svg className="w-6 h-6 hover:text-gray-500 duration-150" fill="none" viewBox="0 0 48 48"><g clip-path="url(#a)"><path fill="currentColor" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24c0 11.979 8.776 21.908 20.25 23.708v-16.77h-6.094V24h6.094v-5.288c0-6.014 3.583-9.337 9.065-9.337 2.625 0 5.372.469 5.372.469v5.906h-3.026c-2.981 0-3.911 1.85-3.911 3.75V24h6.656l-1.064 6.938H27.75v16.77C39.224 45.908 48 35.978 48 24z" /></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                                  </a>
                                            
                                            <a href={item.linkedin}>
                                                <svg className="w-5 h-5 duration-150 hover:text-gray-500" fill="none" viewBox="0 0 48 48"><g clip-path="url(#clip0_17_68)"><path fill="currentColor" d="M44.447 0H3.544C1.584 0 0 1.547 0 3.46V44.53C0 46.444 1.584 48 3.544 48h40.903C46.407 48 48 46.444 48 44.54V3.46C48 1.546 46.406 0 44.447 0zM14.24 40.903H7.116V17.991h7.125v22.912zM10.678 14.87a4.127 4.127 0 01-4.134-4.125 4.127 4.127 0 014.134-4.125 4.125 4.125 0 010 8.25zm30.225 26.034h-7.115V29.766c0-2.653-.047-6.075-3.704-6.075-3.703 0-4.265 2.896-4.265 5.887v11.325h-7.107V17.991h6.826v3.13h.093c.947-1.8 3.272-3.702 6.731-3.702 7.21 0 8.541 4.744 8.541 10.912v12.572z" /></g><defs><clipPath id="clip0_17_68"><path fill="currentColor" d="M0 0h48v48H0z" /></clipPath></defs></svg>
                                            </a>
                                        </div>
                                    </div> */}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="flex justify-center mt-8">
        <button
          className="bg-[#779393] text-white px-6 py-2 rounded-full hover:bg-[#75b9b9] transition duration-300"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
        </section>
    )
}
export default Allphotos;