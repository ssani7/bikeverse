import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faUsers, faHandshake, faEarthAmericas, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

library.add(faUsers, faThumbsUp, faHandshake, faEarthAmericas)

const Summary = () => {
    const summaries = [
        { number: '302+', name: 'Happy Clients', icon: 'fa-users' },
        { number: '10,000+', name: 'Parts Sold Every Year', icon: 'fa-handshake' },
        { number: '1,002+', name: 'Positive Reviews', icon: 'fa-thumbs-up' },
        { number: '30+', name: 'Countries With Happy Clients', icon: 'fa-earth-americas' }
    ]
    return (
        <div className='my-32'>
            <h2 className='text-3xl font-semibold text-center'>Maintaining Quality Worldwide</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-5 mx-10 my-16 justify-center items-center cursor-pointer'>
                {
                    summaries.map(summary => <div class="card h-full bg-transparent text-neutral-focus border transition-all hover:-translate-y-10 hover:bg-neutral hover:text-neutral-content">
                        <div class="group card-body items-center">
                            <FontAwesomeIcon icon={summary.icon} className='h-16 my-2 text-secondary transition-all duration-500 group-hover:scale-125' />
                            <h2 class="card-title text-3xl">{summary.number}</h2>
                            <h2 class="text-2xl">{summary.name}</h2>
                        </div>
                    </div>)
                }
            </div>
        </div>

    );
};

export default Summary;