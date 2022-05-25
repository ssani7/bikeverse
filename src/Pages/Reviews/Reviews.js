import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
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
        <div className='flex flex-col justify-center items-center my-16'>
            <h2 className='text-center text-3xl my-6 font-semibold'>Customer Reviews</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-6 md:mx-12 my-24 justify-items-center gap-10'>
                {
                    reviews.map(r => <div class="card static transition-all bg-base-100 shadow-xl hover:bg-secondary hover:scale-110">
                        <div class="card-body">
                            <div class="card-title">
                                <div class="avatar m-4">
                                    <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 items-center">
                                        <img src={r.image} alt='' />
                                    </div>
                                </div>
                                <div class="ml-6">
                                    <h2 >{r.name}</h2>
                                    <div>{[...Array(r.ratings)].map((e, i) => <FontAwesomeIcon icon='star' className='text-yellow-200' />)}
                                        {[...Array(5 - r.ratings)].map((e, i) => <FontAwesomeIcon icon='star' />)}</div>
                                </div>
                            </div>

                            <p>{r.review}</p>
                        </div>
                    </div>)
                }
            </div>

        </div >
    );
};

export default Reviews;