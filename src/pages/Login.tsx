import React from "react";
import Logo from "../assets/logo-ZOT.png";
import Google from "../assets/logo-google.png";
import Input from "../components/Input/Input";
import Label from "../components/Label/Label";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../services/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const navigate = useNavigate();

    const handleEmailhange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoading(false);
            console.log("Login successful");
            window.location.href = "/";
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            alert("Login failed with error: " + error);
        }
    }

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        signInWithPopup(auth, provider).then(async (result) => {
            if (result.user) {
                await setDoc(doc(db, "users", result.user.uid), {
                    name: result.user.displayName,
                    email: result.user.email
                });
                setIsLoading(false);
                navigate("/");
            }
            else {
                setIsLoading(false);
                alert("Login failed");
            }
        });
    }

    const fetchUser = async () => {
        setIsLoading(true);
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setIsLoading(false);
                    navigate("/");
                } else {
                    setIsLoading(false);
                    navigate("/login");
                }
            }
            else {
                setIsLoading(false);
                navigate("/login");
            }
        })
    };

    React.useEffect(() => {
        fetchUser();
    }, []);


    return (
        <div className="flex h-screen">
            <div className="w-3/4 bg-custom-teal flex flex-col justify-center items-center text-white p-8">
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

            <div className="w-1/2 flex flex-col justify-center items-center p-8 mt-36">
                <div className="item-start w-full max-w-sm">
                    <img src={Logo} alt="Logo" className="mb-6 w-28 h-auto" />
                    <h2 className="text-4xl font-medium mb-2">Login to your Account</h2>
                    <p className="text-sm text-gray-600 mb-6">See what is going on with your business</p>
                </div>

                <button className="bg-white text-gray-800 py-2 px-4 rounded shadow mb-4 flex justify-center items-center w-full max-w-sm" onClick={handleGoogleLogin}>
                        <img src={Google} alt="Google Logo" className="w-5 h-5 mr-2" />
                        Continue with Google
                </button>

                <div className="flex items-center w-full max-w-sm my-4">
                    <div className="border-t border-gray-300 flex-grow mr-3"></div>
                    <p className="text-gray-400 text-xs">or Sign in with Email</p>
                    <div className="border-t border-gray-300 flex-grow ml-3"></div>
                </div>

                <form className="w-full max-w-sm">
                    <div className="mb-4">
                        <Label htmlFor="email" text="Email" />
                        <Input id="email" type="email" placeholder="somebody@example.com" onChange={handleEmailhange}/>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password" text="Password" />
                        <Input id="password" type="password" placeholder="************" onChange={handlePasswordChange}/>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <label className="block text-gray-700 text-sm font-bold">
                            <input className="mr-2 leading-tight" type="checkbox" />
                            <span className="text-sm">Remember Me</span>
                        </label>
                        <a className="inline-block align-baseline font-bold text-sm text-custom-teal hover:text-teal-700" href="#">
                            Forgot Password?
                        </a>
                    </div>
                    <button
                        className="bg-custom-teal hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button" onClick={handleLogin}>
                        Login
                    </button>
                </form>
                <p className="text-gray-600 text-sm mt-auto">
                    Not Registered Yet? <a href="/register" className="text-custom-teal hover:text-teal-700">Create an account</a>
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