import React from "react";
import { auth, db } from "../services/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Logo from "../assets/logo-ZOT.png";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [user, setUser] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();

    const fetchUser = async () => {
        setIsLoading(true);
        auth.onAuthStateChanged(async (user) => {
            console.log(user)
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setIsLoading(false);
                    setUser(docSnap.data());
                }
            }
            else {
                setIsLoading(false);
                navigate("/auth");
            }
        })
    };

    const onLogout = async () => {
        try {
            await auth.signOut();
            navigate("/auth");
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="flex h-screen">
            <div className="w-full bg-white flex flex-col justify-center items-center text-black p-8">
                <img src={Logo} alt="Logo" className="w-40 h-auto md:w-80" />

                <h1 className="text-3xl md:text-5xl font-bold text-center tracking-wide">
                    Hi, {user?.name}!
                </h1>
                <h1 className="text-3xl md:text-5xl font-semibold text-center mt-4 tracking-wide">
                    Welcome to Zero One Group
                </h1>

                <button
                    className="bg-gray-800 hover:bg-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-3/4 md:w-1/4 mt-10 text-white"
                    type="button" onClick={onLogout}>
                    Logout
                </button>

                <p className="text-sm md:text-md italic text-center mt-10 md:mt-auto">
                    "If you want to live a happy life, tie it to a goal, not to people or things."
                </p>
                <p className="mt-2 text-xs md:text-sm">
                    Albert Einstein
                </p>
            </div>

            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <ThreeDots color="#000000" height={80} width={80} />
                </div>
            )}
        </div>
    );
}