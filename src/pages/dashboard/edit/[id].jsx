import React, { useEffect, useState } from 'react';

import FormProduct from '@components/FormProduct';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';

export default function Edit() {
    const [product, setProduct] = useState({});
    const router = useRouter();

    useEffect(() => {
        const { id } = router.query;
        if (!router?.isReady) return;
        async function getProduct() {
            const response = await axios.get(endPoints.products.getProduct(id));
            setProduct(response.data);
        }
        getProduct();
    }, [router?.isReady, router.query]);

    return <FormProduct product={product} />;
}
