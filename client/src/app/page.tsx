"use client";

import { api } from "@/configuration/axios";
import { useEffect, useState } from "react";
import {useAppContext} from "@/components/providers/Provider";

export default function Home() {
    const { state, dispatch } = useAppContext();
    const [time, setTime] = useState(new Date());
    const [number, setNumber] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await api.post('fibonacci');
            dispatch({ type: 'SET_SERIES', payload: response.data.series });
        } catch (error) {
            console.error('Error fetching the Fibonacci series', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <header className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Fibonacci Series Generator</h1>
                <p className="text-xl font-mono mb-4 text-gray-600">{time.toLocaleTimeString()}</p>
                <button
                    onClick={handleSubmit}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    Generate Fibonacci Series
                </button>
                <div className="mt-6">
                    {state.series.length > 0 && (
                        <p className="text-lg text-gray-700">
                            Fibonacci Series: <span className="font-mono">{state.series.join(', ')}</span>
                        </p>
                    )}
                </div>
            </header>
        </div>
    );
}
