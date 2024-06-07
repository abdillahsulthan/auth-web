import React from "react";
import Logo from "../assets/logo-ZOT.png";
import Google from "../assets/logo-google.png";
import Input from "../components/Input/Input";
import Label from "../components/Label/Label";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/FirebaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const navigate = useNavigate();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onRegister = async () => {
        setIsLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    name: name,
                    email: email,
                });
            }
            setIsLoading(false);
            alert("Registration successful");
            window.location.href = "/login";
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            alert("Registration failed with error: " + error);
        }
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
                    navigate("/register");
                }
            }
            else {
                setIsLoading(false);
                navigate("/register");
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

            <div className="w-1/2 flex flex-col justify-center items-center p-8 mt-32">
                <div className="item-start w-full max-w-sm">
                    <img src={Logo} alt="Logo" className="mb-6 w-28 h-auto" />
                    <h2 className="text-4xl font-medium mb-2">Create a new Account</h2>
                    <p className="text-sm text-gray-600 mb-6">See what is going on with your business</p>
                </div>

                <button className="bg-white text-gray-800 py-2 px-4 rounded shadow mb-4 flex justify-center items-center w-full max-w-sm">
                    <img src={Google} alt="Google Logo" className="w-5 h-5 mr-2" />
                    Continue with Google
                </button>

                <div className="flex items-center w-full max-w-sm my-4">
                    <div className="border-t border-gray-300 flex-grow mr-3"></div>
                    <p className="text-gray-400 text-xs">or Sign up with Email</p>
                    <div className="border-t border-gray-300 flex-grow ml-3"></div>
                </div>

                <form className="w-full max-w-sm">
                    <div className="mb-4">
                        <Label htmlFor="name" text="Name" />
                        <Input id="name" type="text" placeholder="Somebody" onChange={handleNameChange}/>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="email" text="Email" />
                        <Input id="email" type="email" placeholder="somebody@example.com" onChange={handleEmailChange}/>
                    </div>
                    <div className="mb-4">
                        <Label htmlFor="password" text="Password" />
                        <Input id="password" type="password" placeholder="************" onChange={handlePasswordChange}/>
                    </div>
                    <button
                        className="bg-custom-teal hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        type="button" onClick={onRegister}>
                        Sign Up
                    </button>
                </form>
                <p className="text-gray-600 text-sm mt-auto">
                    Already have an Account? <a href="/login" className="text-custom-teal hover:text-teal-700">Login</a>
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