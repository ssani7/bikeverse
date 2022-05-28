import React from 'react';

const Blogs = () => {
    return (
        <div className='py-32 text-center text-lg'>
            <div className='mt-10'>
                <h2>Q.1 How will you improve the performance of a React Application?</h2>
                <h2>Using react hooks efficiency and writting less duplicate codes and using state variables. Using external component, hooks and functionality library react application can become more efficient</h2>
            </div>
            <div className='mt-10'>
                <h2>Q.2 What are the different ways to manage a state in a React application?</h2>
                <h2>Using state variables and components. Class can also be used but it has become outdated</h2>
            </div>
            <div className='mt-10'>
                <h2>Q.3 How does prototypical inheritance work?</h2>
                <h2>A method to inherit properties of another object</h2>
            </div>
            <div className='mt-10'>
                <h2>Q.4 Why you do not set the state directly in React?</h2>
                <h2>The useState hook returns a variable and a function that sets the state. Using this method react only changes the variable only when it it set for that the data is not repeated everytime the code is run</h2>
            </div>
            <div className='mt-10'>
                <h2>Q.5 You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h2>
                <h2>Using the filter method for array and using the name of each objects as parameter</h2>
            </div>
            <div className='mt-10'>
                <h2>Q.6 What is a unit test? Why should write unit tests?</h2>
                <h2>This is a method for testing small units of a program. This is important to make the application or program fluent and remove error before publishing</h2>
            </div>
        </div>
    );
};

export default Blogs;