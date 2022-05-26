import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Shared/Footer';
import Loading from '../Shared/Loading';

library.add(faStar);

const Reviews = () => {
    const { length } = useParams();

    let { isLoading, data } = useQuery('reviews', () => fetch(`https://bikeverse-assignment-12.herokuapp.com/reviews`)
        .then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    let reviews = (length === 'all') ? data : data.slice(0, 6);

    return (
        <div>
            <div className='flex flex-col justify-center items-center py-16'>
                <h2 className='text-center text-3xl my-6 font-semibold'>Customer Reviews</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-6 md:mx-12 my-24 justify-items-center gap-10'>
                    {
                        reviews.map((r, index) => <div key={index} className="card static transition-all bg-base-100 shadow-xl lg:hover:bg-secondary lg:hover:scale-110">
                            <div className="card-body">
                                <div className="card-title">
                                    <div className="avatar m-4">
                                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 items-center">
                                            <img src={r.image} alt='' />
                                        </div>
                                    </div>
                                    <div className="ml-6">
                                        <h2 >{r.name}</h2>
                                        <div>{[...Array(r.ratings)].map((e, i) => <FontAwesomeIcon key={i} icon='star' className='text-yellow-200' />)}
                                            {[...Array(5 - r.ratings)].map((e, i) => <FontAwesomeIcon key={i} icon='star' />)}</div>
                                    </div>
                                </div>

                                <p>{r.review}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div >
            {(length === 'all') && <Footer></Footer>}
        </div>

    );
};

export default Reviews;