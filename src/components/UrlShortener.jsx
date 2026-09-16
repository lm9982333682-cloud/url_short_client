import React, { useEffect, useState } from "react";
import api from "../config/api";
import { toast } from "react-toastify";


const UrlShortener = () => {


    const [url, setUrl] = useState('');
    const [data, setData] = useState([]);

    const [shorten, setShorten] = useState([]);

    const [isCopy, setIsCopy] = useState(null);



    const submitUrl = async () => {
        if (!url) {
            toast.error("Url is Required");
            return;
        };

        if (!url.startsWith("https://")) {
            toast.error("Please Enter The Valid Url")
            return;
        };


        try {

            const res = await api.post('/api/url', { url });
            const data = res.data;

            if (data.success) {
                toast.success(data.message);
                setShorten([data.data, ...shorten]);

                getData();
                setUrl('');
            }





        } catch (err) {
            console.log(err);
        }
    };



    const deleteUrl = async (id) => {
        try {
            const res = await api.delete(`/api/url/${id}`);

            toast.success(res.data.message);
            getData();


        } catch (err) {
            console.log(err.response)
        }
    }






    const getData = async () => {
        try {
            const res = await api.get('/api/url');
            setData(res.data.data);


        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        getData();
    }, []);


    // data formate
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // copy short url
    const handleCopy = async (code) => {
        const shortUrl = `http://localhost:7000/${code}`;
        setIsCopy(code);

        await navigator.clipboard.writeText(shortUrl);

        setTimeout(() => {
            setIsCopy(null)
        }, 1500);


    };



    return (
        <div className="min-h-screen bg-[#F5F2EB] px-6 py-12">
            <div className="mx-auto max-w-4xl">

                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        Long links? Chhota kar do.
                    </h1>

                    <p className="mt-3 text-lg text-gray-500">
                        Paste a link, get a short one, see how many people clicked it.
                    </p>
                </div>

                {/* URL Input */}
                <div className="mt-8 flex gap-4 mb-4">
                    <input
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        type="text"
                        placeholder="Paste a long URL here..."
                        className="h-16 flex-1 rounded-md border border-gray-200 bg-white px-5 text-lg text-gray-700 outline-none shadow-sm placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    />

                    <button
                        onClick={submitUrl}
                        className="h-16 cursor-pointer rounded-md bg-black px-8 text-lg font-semibold text-white transition hover:bg-[#000000c2] "
                    >
                        Shorten
                    </button>
                </div>

                {
                    shorten.map(obj => <div key={obj._id} className="mt-2 flex items-center justify-between rounded-md border border-gray-200   px-4 py-3 shadow-sm">

                        <p className="font-mono text-lg font-semibold text-[#b76f57]">
                            http://localhost:3000/{obj.code}
                        </p>


                        <button onClick={() => handleCopy(obj.code)}
                            className={`rounded-md cursor-pointer border
                                  w-20 py-2 font-semibold
                             ${isCopy === obj.code ? "border-green-400 text-green-500 " : "border-gray-300"}
                             `}>
                            {isCopy === obj.code ? " Copied" : "Copy"}
                        </button> 



                    </div>)
                }

                {/* Your Links */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                        Your links ({data.length})
                    </h2>

                    {/* Link 1 */}

                    {
                        data.map(obj => <div key={obj._id} className="mt-2 flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3 shadow-sm">
                            <div className="flex items-center gap-8">
                                <p className="font-mono text-lg font-semibold text-[#b76f57]">
                                    http://localhost:3000/{obj.code}
                                </p>

                                <span className="text-gray-500">
                                    {obj.click} clicks
                                </span>

                                <span className="text-gray-500">
                                    {formatDate(obj.createdAt)}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                <button onClick={() => handleCopy(obj.code)}
                                    className={`rounded-md cursor-pointer w-20 py-3 border font-semibold 
                                    ${isCopy === obj.code ? " border-green-200 bg-green-100 text-green-500 " : "text-white hover:bg-gray-600  bg-gray-500"}
                                 
                                  `}>
                                    {isCopy === obj.code ? " Copied" : "Copy"}
                                </button>

                                <button onClick={() => deleteUrl(obj._id)} className="rounded-md cursor-pointer bg-[tomato] px-6 py-3 font-semibold text-white hover:bg-[#df7d5b]">
                                    Delete
                                </button>
                            </div>
                        </div>)
                    }






                </div>

            </div>
        </div>
    );
};

export default UrlShortener;