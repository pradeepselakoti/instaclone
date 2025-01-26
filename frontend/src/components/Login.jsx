import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('https://instaclone-143c.onrender.com/api/v1/user/login', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
                setInput({
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="relative flex items-center justify-center w-screen h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="animate-float w-40 h-40 bg-purple-300 rounded-full opacity-70 blur-lg absolute top-10 left-10"></div>
                <div className="animate-float w-32 h-32 bg-pink-300 rounded-full opacity-70 blur-lg absolute bottom-20 right-20"></div>
                <div className="animate-float w-36 h-36 bg-indigo-300 rounded-full opacity-70 blur-lg absolute top-32 right-32"></div>
            </div>

            {/* Login Box */}
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform hover:scale-105 transition-transform duration-300">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                        SnapGram
                    </h1>
                    <p className="text-gray-600 mt-2 text-base">
                        Join your friends and discover new moments.
                    </p>
                </div>
                <form onSubmit={signupHandler} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-lg font-semibold text-gray-700">Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none hover:translate-y-1 transition-transform duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-gray-700">Password</label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none hover:translate-y-1 transition-transform duration-200"
                        />
                    </div>
                    <div>
                        {loading ? (
                            <Button className="w-full bg-purple-500 text-white py-3 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-200">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Logging in...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transform hover:scale-110 transition-transform duration-200">
                                Login
                            </Button>
                        )}
                    </div>
                    <div className="text-center text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="text-purple-500 font-semibold hover:underline">
                            Signup
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
