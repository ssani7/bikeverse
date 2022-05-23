import React from 'react';

const Category = () => {
    const categories = [
        { name: 'Outdoor Hunks', img: 'https://i.ibb.co/s12jJNW/banner3.jpg' },
        { name: 'Kids Adventure', img: 'https://i.ibb.co/TRFVgp8/kids.jpg' },
        { name: 'For Flying Women', img: 'https://i.ibb.co/JsJVGpZ/female.jpg' },
        { name: 'Stylish Modification', img: 'https://i.ibb.co/3B3Jv4g/classic.jpg' },
    ]
    return (
        <div>
            <h2 className='text-3xl font-semibold text-center mt-16'>Popular Categories</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto w-2/3 my-12'>

                {
                    categories.map(category => <div class="card rounded-none bg-base-100 shadow-xl h-64 relative w-full text-white">
                        <div className='z-10'>
                            <h2 class="card-title mt-6 ml-6">{category.name}</h2>
                        </div>
                        <img src={category.img} alt="Shoes" className='w-full h-full object-cover absolute' />
                    </div>)
                }

            </div>
        </div>

    );
};

export default Category;