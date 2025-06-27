import React from 'react';
import { Link } from 'react-router-dom';

export interface TripCardProps {
    title: string;
    // photoCount: number;
    id: string; // Optional for compatibility with existing code
}

const TripCard: React.FC<TripCardProps> = ({ title, id }) => {
    return (
        <Link to={`/trip/${encodeURIComponent(id)}`}>
            <div className="  bg-white 
  rounded-xl 
  shadow-md 
  p-4 
  mb-4 
  hover:shadow-xl 
  hover:scale-[1.02]
  transition
  cursor-pointer
  border">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-500">投稿数：{0}</p>
            </div>
        </Link>
    );
};

export default TripCard;