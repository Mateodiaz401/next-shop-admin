import React, { useState } from 'react';
import useFetch from '@hooks/useFetch';
import { Chart } from '@common/Chart';
import endPoints from '@services/api';
import Link from 'next/link';
import { usePagination } from '@hooks/usePagination';


import Paginator from '@components/Paginator';


import Image from 'next/image';

const PRODUCT_LIMIT = 6;
export default function Dashboard() {
    const [productOffset, setProductOffset] = useState(1);
    const totalItems = useFetch(endPoints.products.getProducts(0, 0));
    const pagination = usePagination(PRODUCT_LIMIT, totalItems.length, 3);
    const products = useFetch(endPoints.products.getProducts(PRODUCT_LIMIT, productOffset)).map((product) => {
        if (product.images.length > 0) {
            if (product.images[0].includes('http') == false) {
                product.images[0] = `http://custom.url/${product.images[0]}`;
            }
        }
        return product;
    });

    const handlePagination = (event) => {
        event.preventDefault();
        let current = event.target.getAttribute('data-page');
        if (current == null) {
            current = event.target.parentNode.getAttribute('data-page');
            if (current == null) {
                current = event.target.parentNode.parentNode.getAttribute('data-page');
            }
        }
        pagination.setCurrentPage(Number(current));
        setProductOffset((Number(current) - 1) * PRODUCT_LIMIT);
    };

    const categories = products?.map((product) => product.category);
    const categoryCount = categories?.map((category) => category.name);
    const countOcurrences = (array) => array.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});

    const data = {
        datasets: [
            {
                label: 'Categories',
                data: countOcurrences(categoryCount),
                borderWidth: 3,
                backgroundColor: ['#ffbb11', '#c0c0c0', '#50af95', '#2a71d0', '#aa3344'],
            },
        ],
    };
    return (
        <>
            <Chart className="mb-8 mt-2" chartData={data} />
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Catagoy
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Action</span>
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products?.map((product) => (
                                        <tr key={`Product-item-${product.id}`}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <Image className="h-10 w-10 rounded-full" src={product.images[0]} alt="" width={256} height={250} />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.category.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{`$ ${product.price}`}</span>
                                            </td>
                                            <td className="text-sm text-zinc-700 text-left">{product.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href="/login" className="text-indigo-600 hover:text-indigo-900">
                                                    <span className="text-indigo-600 hover:text-indigo-900">Edit</span>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href="/login">
                                                    <span className="text-indigo-600 hover:text-indigo-900"> Delete </span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {products.length > 0 ? <Paginator pagination={pagination} handleClick={handlePagination} /> : null}
                    </div>
                </div>
            </div>
        </>
    );
}
