import React from 'react';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const naivgate = useNavigate();
    const categories = [
        { name: 'Outdoor Hunks', category: "outdoor", img: 'https://i.ibb.co/w6bYz0W/outdoor1.jpg' },
        { name: 'Kids Adventure', category: "kids", img: 'https://i.ibb.co/PcmH0f7/kids.jpg' },
        { name: 'For Flying Women', category: "women", img: 'https://i.ibb.co/72rwRs8/female.jpg' },
        { name: 'Made For Sports', category: "sports", img: 'https://i.ibb.co/FK7dShJ/sports.jpg' },
    ]
    return (
        <div className='my-32 py-16'>
            <h2 className='text-3xl font-semibold mb-16 text-center'>Popular Categories</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto w-2/3 my-12'>
                {
                    categories.map((category, index) => <div
                        key={index}
                        onClick={() => naivgate(`/shop/${category
                            .category}`)} className="card rounded-none group shadow-xl h-64 relative w-full text-white cursor-pointer">
                        <div className='z-10 h-full transform transition-all duration-300 group-hover:bg-gray-800 group-hover:bg-opacity-50'>
                            <h2 className="card-title flex justify-center items-center h-full lg:invisible transform transition-all group-hover:visible group-hover:scale-110 ">{category.name}</h2>
                        </div>
                        <img src={category.img} alt="Shoes" className='w-full h-full object-cover absolute' />
                    </div>)
                }

            </div>
        </div>

    );
};

export default Category;