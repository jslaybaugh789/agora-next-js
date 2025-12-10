/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardText, CardTitle, ListGroupItem, Row } from "react-bootstrap";
import { GiGreekTemple } from "react-icons/gi";
import * as productClient from '../shop/[sid]/product/[pid]/client';

export default function Home() {
    const [products, setProducts] = useState<any>([]);
    const fetchProducts = async () => {
        const allProducts = await productClient.findAllProducts();
        setProducts(allProducts);
    }
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts();
    }, []);
    return (
        <div id="agora-home">
            <h1 className='text-primary'><GiGreekTemple className='me-3'/>Agora Home</h1><hr/>
            <div id="agora-products">
                <h3 className='text-primary'> All Products</h3>
                <Row xs={1} md={5} className="g-4">
                {products && products.map((product: any) => (
                    <ListGroupItem className="p-3 mb-5 me-3 fs-5 w-25 bg-dark text-primary" key={product._id}>
                        <Card className='p-2 bg-secondary text-primary'>
                            <CardBody>
                            <CardTitle className="agora-product-title text-wrap">
                                Product Name:  {product.name}
                            </CardTitle>
                            <CardText  className="agora-product-price text-wrap" >
                                Price: {product.price}</CardText>
                            <CardText  className="agora-product-description text-wrap text-black">
                                {product.description}
                            </CardText>
                            <Link href={`/shop/${product.shopId}`}>View Shop</Link>
                            </CardBody>
                        </Card>
                    </ListGroupItem>
                ))}
                </Row>
            </div>
        </div>
    )
}