import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faUsers, faHandshake, faEarthAmericas, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

library.add(faUsers, faThumbsUp, faHandshake, faEarthAmericas)

const Summary = () => {
    const summaries = [
        { number: '302+', name: 'Happy Clients', icon: 'fa-users', more: 'Full time clients with over 10 years of happy business' },
        { number: '10,000+', name: 'Parts Sold Every Year', icon: 'fa-handshake', more: 'Selling top quality bike products for 25 years' },
        { number: '1,002+', name: 'Positive Reviews', icon: 'fa-thumbs-up', more: 'Loved all over the world in global ratings and reviews' },
        { number: '30+', name: 'Countries With Happy Clients', icon: 'fa-earth-americas', more: 'Providing the best product to 34 countries in the world' }
    ]
    return (
        <div className='my-32 lg:h-80'>
            <h2 className='text-3xl font-semibold text-center'>Maintaining Quality Worldwide</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-5 mx-10 my-16 justify-center items-center cursor-pointer h-full'>
                {
                    summaries.map((summary, i) => <div key={i} className="card h-fit bg-transparent static border transition-all hover:-translate-y-4 hover:bg-secondary ">
                        <div className="group card-body items-center">
                            <FontAwesomeIcon icon={summary.icon} className='h-16 my-2 text-primary transition-all duration-500 group-hover:scale-125 group-hover:text-white' />
                            <h2 className="card-title text-3xl group-hover:text-base-content">{summary.number}</h2>
                            <h2 className="text-2xl whitespace-nowrap">{summary.name}</h2>
                            <h2 className="text-xl text-center hidden group-hover:inline-block">{summary.more}</h2>
                        </div>
                    </div>)
                }
            </div>
        </div>

    );
};

export default Summary;