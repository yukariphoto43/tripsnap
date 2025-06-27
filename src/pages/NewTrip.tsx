import React from "react";
import { useNavigate } from "react-router-dom";

export interface NewTripProps {
    addTrip: (title: string) => string;
}

const NewTrip: React.FC<NewTripProps> = ({ addTrip }) => {
    const navigate = useNavigate();
    const [title, setTitle] = React.useState("");

    const handleSubmit = () => {
        if (!title.trim()) return;
        const newTripId = addTrip(title);
        navigate(`/trip/${newTripId}`);
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">新しい旅を作成</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="旅のタイトル"
                autoComplete="off"
                className="w-full p-2 border rounded mb-4"
            />
            <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white py-2 rounded"
            >
                追加
            </button>
        </div>
    );
};

export default NewTrip;