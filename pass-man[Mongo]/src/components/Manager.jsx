import React from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" });

    const [link, setLink] = useState("/eye.svg");

    const [passwordArray, setpasswordArray] = useState([]);

    const passwordRef = useRef();

    // const ref = useRef()
    // const showPassword=() => {
    //     if(ref.current.src.includes("/eyeslash.svg")){
    //         ref.current.src="/eye.svg"
    //     }else{
    //         ref.current.src="/eyeslash.svg"
    //     }
    // }

    const getPassords =async () => {
      let req = await fetch("http://localhost:3000/")
      let passwords=await req.json()
      setpasswordArray(passwords)
      console.log(passwords)
    }
    

    useEffect(() => {
        getPassords()
    }, []);

    const showPassword = () => {
        if (link === "/eye.svg") {
            setLink("/eyeslash.svg");
            passwordRef.current.type = "text";
        } else {
            setLink("/eye.svg");
            passwordRef.current.type = "password";
        }
    };

    const copyText = (text) => {
        toast("Text Copied", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);
    };

    const savePassword = async () => {
        if(form.site.length<5 && form.username.length<3 && form.password.length<3){
            toast("Password can`t be saved fields are not satisfying crieteria", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
        setpasswordArray([...passwordArray, {...form , id:uuidv4()}]);
         let res=await fetch("http://localhost:3000/", {method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify( {...form , id:uuidv4()})})
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form , id:uuidv4()}] ));
        console.log(form);
        console.log(passwordArray);
        setform({ site: "", username: "", password: "" });
        }
    };
    const editPassword = async(id) => {
        console.log("Editing password with id :",id)
        setform(passwordArray.filter(i=>i.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id));
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)[0] ));
        let res=await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type":"application/json"},body:JSON.stringify( {id})})

    };
    const deletePassword =async (id) => {
        let c=confirm("You sure about Delete 🚮")
        if(c){
        console.log("deleting password with id :",id)
        setpasswordArray(passwordArray.filter(item=>item.id!==id));
        // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id) ));
        let res=await fetch("http://localhost:3000/", {method:"DELETE", headers:{"Content-Type":"application/json"},body:JSON.stringify( { id})})
        toast("Password Deleted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });}
    };



    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            
                <div className="min-h-[91vh] w-screen">
                    <div className="mx-auto text-red-500 rounded-lg max-w-4xl myContainer  flex flex-col items-center justify-center ">
                        <div className="logo flex justify-center flex-col items-center pt-2 text-lg">
                            <img
                                src="/security-guard-svgrepo-com.svg"
                                alt="security-guard"
                                width="60px"
                            />
                            <h1 className="text-2xl font-bold">PASS-MAN</h1>
                            <span>Your own password manager..</span>
                        </div>

                        <div className="text-black flex flex-col pt-5 pb-5 gap-4 w-2/3">
                            <input
                                type="text"
                                placeholder="Site-name"
                                className="rounded-full  border-red-500 border-spacing-2  border p-1"
                                onChange={handleChange}
                                name="site"
                                value={form.site}
                            />
                            <div className="flex gap-3 justify-between relative sm:flex-row flex-col">
                                <input
                                    type="text"
                                    placeholder="User-name"
                                    className="rounded-full  border-red-500 border-spacing-2 border w-full p-1"
                                    onChange={handleChange}
                                    name="username"
                                    value={form.username}
                                />
                                <input
                                    type="password"
                                    ref={passwordRef}
                                    value={form.password}
                                    placeholder="Password"
                                    className="rounded-full  border-red-500 border-spacing-2 border w-full p-1 "
                                    onChange={handleChange}
                                    name="password"
                                />
                                <span>
                                    <img
                                        src={link}
                                        width="23px"
                                        className="absolute right-5 top-1"
                                        alt="eye"
                                        onClick={showPassword}
                                    />
                                </span>
                            </div>
                            <button
                                className="bg-white rounded-full flex gap-1 mx-auto border-2 border-red-500 h-10 p-1 justify-center items-center hover:bg-red-500"
                                onClick={savePassword}
                            >
                                <lord-icon
                                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                                    trigger="hover"
                                ></lord-icon>
                                Save Password
                            </button>
                        </div>
                    </div>

                    <div className="password mx-auto text-green-400 rounded-lg sm:max-w-[4xl] w-screen  flex flex-col items-center">
                        <h1 className="pb-4 text-xl font-semibold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-x text-transparent bg-clip-text ">
                            Your Passwords :{" "}
                        </h1>
                        {passwordArray.length === 0 && <div>No passwords to show</div>}
                        {passwordArray.length != 0 && (
                            <><span className="flex mt-0  bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient-x text-transparent bg-clip-text font-semibold items-center">
                            Click on{" "}
                            <lord-icon
                                src="https://cdn.lordicon.com/bmlkvhui.json"
                                trigger="hover"
                            ></lord-icon>
                            to copy the text
                        </span>
                                <div className="w-[90vw] sm:max-w-[1000px] sm:flex sm:justify-center overflow-x-auto px-5 ">
                                    
                                    <table className="w-[full] md:min-w-[800px] table-auto overflow-hidden rounded-md  mb-16">
                                        <thead className="border-2 bg-red-500 text-black border-red-500 ">
                                            <tr className="">
                                                <th className="w-2/5 text-center border border-black">
                                                    Site
                                                </th>
                                                <th className="w-1/5 text-center border border-black">
                                                    Username
                                                </th>
                                                <th className="w-1/5 text-center border border-black">Password</th>
                                                <th className="w-1/5 text-center border border-black">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="border-2 border-red-500 ">
                                            {passwordArray.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="text-center w-2/5 py-1 px-2 border border-white ">
                                                            <div className="w-full flex items-cent px-1 justify-center ">
                                                                <span className="">
                                                                    <a href={item.site} target="_blank">
                                                                        {item.site}
                                                                    </a>
                                                                </span>
                                                                <span
                                                                    className="  "
                                                                    onClick={() => {
                                                                        copyText(item.site);
                                                                    }}
                                                                >
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/bmlkvhui.json"
                                                                        trigger="click"
                                                                    ></lord-icon>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className=" w-1/5 py-1 px-2 border border-white">
                                                            <div className="w-full flex px-1 relative items-center justify-center">
                                                                <span className="">{item.username}</span>
                                                                <span
                                                                    className="  "
                                                                    onClick={() => {
                                                                        copyText(item.username);
                                                                    }}
                                                                >
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/bmlkvhui.json"
                                                                        trigger="click"
                                                                    ></lord-icon>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className=" w-1/5 py-1 px-2 border border-white">
                                                            <div className="w-full flex px-1 relative items-center justify-center">
                                                                <span className="">{item.password}</span>
                                                                <span
                                                                    className=""
                                                                    onClick={() => {
                                                                        copyText(item.password);
                                                                    }}
                                                                >
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/bmlkvhui.json"
                                                                        trigger="click"
                                                                    ></lord-icon>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className=" w-1/5 py-1 px-2 border border-white">
                                                            <div className="w-full flex px-1 relative items-center justify-center gap-2">
                                                                <span className="" onClick={()=>{editPassword(item.id)}} >
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/oqaajvyl.json"
                                                                        trigger="hover"
                                                                        state="hover-line">
                                                                    </lord-icon>
                                                                </span>
                                                                <span className="" onClick={()=>{deletePassword(item.id)}} >
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/vlnvqvew.json"
                                                                        trigger="hover">
                                                                    </lord-icon>
                                                                </span>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            
        </>
    );
};

export default Manager;
