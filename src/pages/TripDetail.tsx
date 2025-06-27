import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Photo, Trip } from '../App';

interface TripDetailProps {
  photos: Photo[];
  trips: Trip[];
  deletePhoto: (photoId: number) => void;
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
}

const TripDetail: React.FC<TripDetailProps> = ({ photos, trips, deletePhoto, setPhotos }) => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const filtered = photos.filter((p) => p.tripId === tripId);
  const currentTrip = trips.find((trip) => trip.id === tripId);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editMemo, setEditMemo] = useState("");

  const handleDelete = (photoId: number) => {
    deletePhoto(photoId);
  };

  const startEdit = (id: number, currentMemo: string) => {
    setEditingId(id);
    setEditMemo(currentMemo);
  };

  const saveEdit = (id: number) => {
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, memo: editMemo } : p
      )
    );
    setEditingId(null);
    setEditMemo("");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {currentTrip?.title ?? '(タイトル未取得)'} の旅日記
      </h1>

      {/* 受け取った photos を表示 */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((photo) => (
          <div key={photo.id} className="
          bg-white
        rounded-xl
        shadow
        p-2
        hover:shadow-lg
        hover:scale-[1.01]
        transition">
            <img
              src={photo.imageUrl}
              alt="旅の写真"
              className="w-full h-48 object-cover rounded mb-2"
            />
            <p className="text-xs text-gray-600">{photo.date} {photo.time}</p>
            <p className="text-sm">{photo.memo}</p>
            <button
              onClick={() => handleDelete(photo.id)}
              className="text-red-600 hover:text-red-800 ml-2">
              塵箱
            </button>
            <button
              onClick={() => startEdit(photo.id, photo.memo)}
              className="text-blue-600 hover:text-blue-800 ml-2">
              ✏️
            </button>
            {editingId === photo.id ? (
              <div className="mt-2">
                <textarea
                  value={editMemo}
                  onChange={(e) => setEditMemo(e.target.value)}
                  className="w-full border rounded p-2"
                />
                <button
                  onClick={() => {
                    // photo.memo = editMemo; // 直接更新（実際はAPI経由で更新するのが理想）
                    saveEdit(photo.id);
                  }}
                  className="bg-green-500 text-white py-1 px-2 rounded mt-1">
                  保存
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-300 text-gray-800 py-1 px-2 rounded mt-1 ml-2">
                  キャンセル
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-1">{photo.memo}</p>
            )}
          </div>
        ))}
      </div>

      {/* 地図と追加 */}
      <button className="block w-full bg-blue-500 text-white py-2 rounded mb-4">
        🗺 地図を見る
      </button>

      <button
        onClick={() => navigate(`/trip/${tripId}/upload`)}
        className="block w-full bg-green-500 text-white py-2 rounded">
        📸 写真を追加
      </button>
    </div>
  );
};

export default TripDetail;