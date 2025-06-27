import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Photo, Trip } from '../App';

interface UploadProps {
    addPhoto: (photo: Photo) => void;
    trips: Trip[];
}

const Upload: React.FC<UploadProps> = ({ addPhoto, trips }) => {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState<File | null>(null);
    const [memo, setMemo] = useState('');
    const currentTrip = trips.find((trip) => trip.id === tripId);

    const handleSubmit = () => {
        const photo: Photo = {
            id: Date.now(), // 一意のIDを生成
            tripId: tripId ?? '',
            imageUrl: image ? URL.createObjectURL(image) : '',
            memo,
            date: '2025-06-21', // 仮
            time: '15:00', // 仮
        };

        addPhoto(photo);
        navigate(`/trip/${tripId}`);
    };

    return (

        <div className="max-w-md mx-auto p-6">
            <h1 className="text-xl font-bold mb-4">
                {currentTrip?.title ?? '（タイトル未取得）'} に写真を追加
            </h1>
            <form className="mb-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                />

                {image && (
                    <img src={URL.createObjectURL(image)} alt="preview" className='rounded' />
                )}

                <textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="ここにコメントを入力…"
                    className="w-full border rounded p-2"
                />

                <input type="datetime-local" className="w-full border rounded p-2 mt-2" />

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    保存する
                </button>
            </form>

            {/* <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="mb-4"
            />
            {image && (
                <img
                    src={URL.createObjectURL(image)}
                    alt="preview"
                    className='mb-4 rounded'
                />
            )}
            <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="ここにコメントを入力…"
                className="w-full p-2 border rounded mb-4"
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded">
                保存する
            </button> */}
        </div>
    );
};

export default Upload;