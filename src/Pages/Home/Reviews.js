import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';

library.add(faStar);

const Reviews = () => {
    const { length } = useParams();
    let { isLoading, data } = useQuery('reviews', () => fetch(`http://localhost:5000/reviews`)
        .then(res => res.json()))

    if (isLoading) {
        return <Loading></Loading>
    }

    let reviews = (length === 'all') ? data : data.slice(0, 6);

    return (
        <div className='my-32'>
            <h2 className='text-center text-3xl my-6 font-semibold'>Customer Reviews</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 mx-6 md:mx-12 my-24 justify-items-center gap-6'>
                {
                    reviews.map(r => <div class="card bg-base-100 shadow-xl">
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