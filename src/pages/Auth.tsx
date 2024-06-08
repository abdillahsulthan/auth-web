import React, { useState } from "react";
import Logo from "../assets/logo-ZOT.png";
import Google from "../assets/logo-google.png";
import Input from "../components/Input/Input";
import Label from "../components/Label/Label";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../services/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const [mode, setMode] = useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email
                });
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            alert("Login failed with error: " + error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailPasswordAuth = async () => {
        setIsLoading(true);
        try {
            if (mode === 'register') {
                await createUserWithEmailAndPassword(auth, email, password);
                if (auth.currentUser) {
                    await setDoc(doc(db, "users", auth.currentUser.uid), {
                        name,
                        email
                    });
                }
                alert("Registration successful");
                navigate("/login");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Login successful");
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            alert(`${mode === 'register' ? 'Registration' : 'Login'} failed with error: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <div className="flex h-screen">
            <div className="hidden lg:flex lg:w-3/4 bg-custom-teal flex-col justify-center items-center text-white p-8">
                <h1 className="text-5xl font-bold text-center mt-64 px-40 tracking-wide">
                    Your <span className="italic">Trusted</span> Digital Transformation Partner
                </h1>
                <p className="text-md italic text-center mt-auto">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
                </p>
                <p className="mt-2 text-sm">
                    John Doe, VP of A Great Company
                </p>
            </div>

            <div className="flex flex-col justify-center items-center p-8 lg:mt-36 md:w-1/2 w-full mt-0 mx-auto">
                <div className="item-start w-full max-w-xs md:max-w-sm">
                    <img src={Logo} alt="Logo" className="mb-6 w-28 h-auto" />
                    <h2 className="text-2xl font-medium mb-2 md:text-4xl">{mode === 'register' ? 'Create a new Account' : 'Login to your Account'}</h2>
                    <p className="text-sm text-gray-600 mb-6">See what is going on with your business</p>
                </div>

                <button className="bg-white text-gray-800 py-2 px-4 rounded shadow mb-4 flex justify-center items-center w-full max-w-xs md:max-w-sm" onClick={handleGoogleLogin}>
                    <img src={Google} alt="Google Logo" className="w-5 h-5 mr-2" />
                    Continue with Google
                </button>

                <div className="flex items-center w-full max-w-xs md:max-w-sm my-4">
                    <div className="border-t border-gray-300 flex-grow mr-3"></div>
                    <p className="text-gray-400 text-xs">{mode === 'register' ? 'or Sign up with Email' : 'or Sign in with Email'}</p>
                    <div className="border-t border-gray-300 flex-grow ml-3"></div>
                </div>

                <form className="w-full max-w-xs md:max-w-sm">
                    {mode === 'register' && (
                        <div className="mb-4">
                            <Label htmlFor="name" text="Name" />
                            <Input id="name" type="text" placeholder="Somebody" onChange={handleNameChange} />
                        </div>
                    )}
                    <div className="mb-4">
                        <Label htmlFor="email" text="Email" />
                        <Input id="email" type="email" placeholder="somebody@example.com" onChange={handleEmailChange} />
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password" text="Password" />
                        <Input id="password" type="password" placeholder="************" onChange={handlePasswordChange} />
                    </div>
                    {mode === 'login' && (
                        <div className="flex items-center justify-between mb-6">
                            <label className="block text-gray-700 text-sm font-bold">
                                <input className="mr-2 leading-tight" type="checkbox"/>
                                <span className="text-sm">Remember Me</span>
                            </label>
                            <a className="inline-block align-baseline font-bold text-sm text-custom-teal hover:text-teal-700" href="#">
                                Forgot Password?
                            </a>
                        </div>
                    )}
                    <button
                        className="bg-custom-teal hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button" onClick={handleEmailPasswordAuth}>
                        {mode === 'register' ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                <p className="text-gray-600 text-sm mt-auto">
                    {mode === 'register' ? 'Already have an Account?' : 'Not Registered Yet?'} <a href="#" className="text-custom-teal hover:text-teal-700" onClick={() => setMode(mode === 'register' ? 'login' : 'register')}>{mode === 'register' ? 'Login' : 'Create an account'}</a>
                </p>
            </div>

            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <ThreeDots color="#ffffff" height={80} width={80} />
                </div>
            )}
        </div>
    );
}