import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Footer from '../Shared/Footer';
import Loading from '../Shared/Loading';
import Product from './Product';

const AllProducts = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [pageCount, setPageCount] = useState(0);

    const { data: count, isLoading: loadingCount } = useQuery('count', () => fetch('https://bikeverse-assignment-12.herokuapp.com/partscount').then(res => res.json()));

    useEffect(() => {
        const pages = Math.ceil(count?.count / size);
        setPageCount(pages);
    }, [count, size, pageCount])


    const { data: parts, isLoading: loadingParts } = useQuery(['parts', page, size], () => fetch(`https://bikeverse-assignment-12.herokuapp.com/parts?page=${page}&size=${size}`).then(res => res.json()));


    if (loadingCount || loadingParts) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className='py-32'>
                <h1 className='text-3xl font-bold text-center mb-14'>Get The Best Product For Your Adventure</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center mx-6 md:mx-16'>
                    {
                        parts?.map((product) => <Product key={product._id} product={product}></Product>)
                    }
                </div>

                <div className="btn-group mt-10 items-center justify-center">
                    {
                        pageCount && [...Array(pageCount)?.keys()].map((n, i) => <button key={i} className={`btn btn-md ${page === n ? 'btn-active' : ''}`} onClick={() => setPage(n)}>{n + 1}</button>)
                    }
                    <select onChange={e => setSize(e.target.value)} className="select select-bordered max-w-xs" defaultValue={size}>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                    </select>
                </div>

            </div >
            <Footer></Footer>
        </div>
    );
};

export default AllProducts;